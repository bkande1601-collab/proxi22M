import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { SEOPageId, siteConfig } from "@/lib/seo-config";
import {
  getSeoPageBySlug,
  SEO_UPDATED_EVENT_NAME,
  SEOPageData,
} from "@/lib/seo-storage";

interface SEOProps {
  pageId?: SEOPageId;
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string;
  noindex?: boolean;
  canonicalUrl?: string;
}

const toAbsoluteUrl = (url: string) => {
  if (!url) {
    return siteConfig.url;
  }
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return `${siteConfig.url}${url.startsWith("/") ? url : `/${url}`}`;
};

const upsertMetaTag = ({
  attribute,
  value,
  content,
}: {
  attribute: "name" | "property";
  value: string;
  content: string;
}) => {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${value}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertLinkTag = ({
  rel,
  href,
  sizes,
  type,
}: {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
}) => {
  const selector = sizes
    ? `link[rel="${rel}"][sizes="${sizes}"]`
    : `link[rel="${rel}"]`;
  let tag = document.head.querySelector<HTMLLinkElement>(selector);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    if (sizes) {
      tag.setAttribute("sizes", sizes);
    }
    document.head.appendChild(tag);
  }

  if (type) {
    tag.setAttribute("type", type);
  }
  tag.setAttribute("href", href);
};

const SEO = ({
  pageId,
  title,
  description,
  image,
  article = false,
  keywords,
  noindex = false,
  canonicalUrl,
}: SEOProps) => {
  const location = useLocation();
  const [storedPage, setStoredPage] = useState<SEOPageData | null>(() =>
    pageId ? getSeoPageBySlug(pageId) : null,
  );

  useEffect(() => {
    if (!pageId) {
      setStoredPage(null);
      return;
    }

    const syncFromStorage = () => {
      setStoredPage(getSeoPageBySlug(pageId));
    };

    syncFromStorage();
    window.addEventListener(SEO_UPDATED_EVENT_NAME, syncFromStorage);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener(SEO_UPDATED_EVENT_NAME, syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, [pageId]);

  const seoValues = useMemo(() => {
    const fallbackPath = location.pathname || "/";
    const path = storedPage?.path || fallbackPath;
    const resolvedTitle = title || storedPage?.metaTitle || siteConfig.defaultTitle;
    const resolvedDescription =
      description || storedPage?.metaDescription || siteConfig.defaultDescription;
    const resolvedKeywords = keywords || storedPage?.keywords || "";
    const resolvedCanonical =
      canonicalUrl || storedPage?.canonicalUrl || `${siteConfig.url}${path}`;
    const resolvedImage = toAbsoluteUrl(
      image || storedPage?.ogImage || siteConfig.openGraph.images.default,
    );
    const resolvedOgTitle = storedPage?.ogTitle || resolvedTitle;
    const resolvedOgDescription = storedPage?.ogDescription || resolvedDescription;
    const resolvedTwitterTitle = storedPage?.twitterTitle || resolvedTitle;
    const resolvedTwitterDescription =
      storedPage?.twitterDescription || resolvedDescription;
    const resolvedTwitterImage = toAbsoluteUrl(
      storedPage?.twitterImage || image || storedPage?.ogImage || siteConfig.openGraph.images.default,
    );

    let robotsValue = "index,follow";
    if (noindex) {
      robotsValue = "noindex,nofollow";
    } else if (storedPage) {
      const robotsParts = [
        storedPage.robots_index ? "index" : "noindex",
        storedPage.robots_follow ? "follow" : "nofollow",
      ];
      if (storedPage.robots_noarchive) {
        robotsParts.push("noarchive");
      }
      if (storedPage.robots_nosnippet) {
        robotsParts.push("nosnippet");
      }
      robotsValue = robotsParts.join(",");
    }

    return {
      resolvedTitle,
      resolvedDescription,
      resolvedKeywords,
      resolvedCanonical,
      resolvedImage,
      resolvedOgTitle,
      resolvedOgDescription,
      resolvedTwitterTitle,
      resolvedTwitterDescription,
      resolvedTwitterImage,
      robotsValue,
    };
  }, [
    canonicalUrl,
    description,
    image,
    keywords,
    location.pathname,
    noindex,
    storedPage,
    title,
  ]);

  useEffect(() => {
    document.title = seoValues.resolvedTitle;

    upsertMetaTag({
      attribute: "name",
      value: "description",
      content: seoValues.resolvedDescription,
    });
    if (seoValues.resolvedKeywords) {
      upsertMetaTag({
        attribute: "name",
        value: "keywords",
        content: seoValues.resolvedKeywords,
      });
    }
    upsertMetaTag({
      attribute: "name",
      value: "robots",
      content: seoValues.robotsValue,
    });
    upsertMetaTag({
      attribute: "name",
      value: "author",
      content: siteConfig.author,
    });
    upsertMetaTag({
      attribute: "property",
      value: "og:type",
      content: article ? "article" : siteConfig.openGraph.type,
    });
    upsertMetaTag({
      attribute: "property",
      value: "og:url",
      content: seoValues.resolvedCanonical,
    });
    upsertMetaTag({
      attribute: "property",
      value: "og:site_name",
      content: siteConfig.openGraph.siteName,
    });
    upsertMetaTag({
      attribute: "property",
      value: "og:title",
      content: seoValues.resolvedOgTitle,
    });
    upsertMetaTag({
      attribute: "property",
      value: "og:description",
      content: seoValues.resolvedOgDescription,
    });
    upsertMetaTag({
      attribute: "property",
      value: "og:image",
      content: seoValues.resolvedImage,
    });
    upsertMetaTag({
      attribute: "property",
      value: "og:image:width",
      content: String(siteConfig.openGraph.images.width),
    });
    upsertMetaTag({
      attribute: "property",
      value: "og:image:height",
      content: String(siteConfig.openGraph.images.height),
    });
    upsertMetaTag({
      attribute: "property",
      value: "og:locale",
      content: siteConfig.locale,
    });
    upsertMetaTag({
      attribute: "name",
      value: "twitter:card",
      content: siteConfig.twitter.card,
    });
    upsertMetaTag({
      attribute: "name",
      value: "twitter:title",
      content: seoValues.resolvedTwitterTitle,
    });
    upsertMetaTag({
      attribute: "name",
      value: "twitter:description",
      content: seoValues.resolvedTwitterDescription,
    });
    upsertMetaTag({
      attribute: "name",
      value: "twitter:image",
      content: seoValues.resolvedTwitterImage,
    });
    if (siteConfig.twitter.site) {
      upsertMetaTag({
        attribute: "name",
        value: "twitter:site",
        content: siteConfig.twitter.site,
      });
    }

    upsertLinkTag({
      rel: "canonical",
      href: seoValues.resolvedCanonical,
    });
    upsertLinkTag({
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    });
    upsertLinkTag({
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    });
    upsertLinkTag({
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    });
    upsertLinkTag({
      rel: "manifest",
      href: "/site.webmanifest",
    });
  }, [article, seoValues]);

  return null;
};

export default SEO;
