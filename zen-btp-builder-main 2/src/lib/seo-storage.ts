import { pagesConfig, SEOPageConfig, SEOPageId, siteConfig } from "@/lib/seo-config";

export interface SEOPageData {
  id: string;
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robots_index: boolean;
  robots_follow: boolean;
  robots_noarchive: boolean;
  robots_nosnippet: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface SEOHistoryEntry {
  id: string;
  pageSlug: string;
  field: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  changedAt: string;
}

const SEO_STORAGE_KEY = "proxizen-seo-pages-v1";
const SEO_HISTORY_STORAGE_KEY = "proxizen-seo-history-v1";
export const SEO_UPDATED_EVENT_NAME = "proxizen:seo-pages-updated";

const nowIso = () => new Date().toISOString();

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `seo-${Date.now()}-${Math.round(Math.random() * 1000)}`;

const canonicalUrlForPath = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
};

const defaultSeoFromPage = (page: SEOPageConfig): SEOPageData => {
  const currentDate = nowIso();
  return {
    id: createId(),
    slug: page.slug,
    path: page.path,
    metaTitle: page.title,
    metaDescription: page.description,
    keywords: page.keywords,
    canonicalUrl: canonicalUrlForPath(page.path),
    ogTitle: page.title,
    ogDescription: page.description,
    ogImage: page.ogImage,
    ogImageAlt: `Visuel social ${siteConfig.name}`,
    twitterTitle: page.title,
    twitterDescription: page.description,
    twitterImage: page.ogImage,
    robots_index: true,
    robots_follow: true,
    robots_noarchive: false,
    robots_nosnippet: false,
    isActive: true,
    createdAt: currentDate,
    updatedAt: currentDate,
    updatedBy: siteConfig.author,
  };
};

const getDefaultSeoPages = (): SEOPageData[] =>
  Object.values(pagesConfig).map(defaultSeoFromPage);

const readStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) {
      return fallback;
    }
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
};

const writeStorage = <T>(key: string, value: T): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

const dispatchSeoUpdated = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new CustomEvent(SEO_UPDATED_EVENT_NAME));
};

const sanitizeString = (value: unknown, fallback = "") =>
  String(value ?? fallback).trim();

const sanitizePage = (page: Partial<SEOPageData>, fallback: SEOPageData): SEOPageData => {
  const path = sanitizeString(page.path, fallback.path) || fallback.path;
  const canonicalUrl =
    sanitizeString(page.canonicalUrl, fallback.canonicalUrl) || canonicalUrlForPath(path);

  return {
    ...fallback,
    ...page,
    id: sanitizeString(page.id, fallback.id) || fallback.id,
    slug: sanitizeString(page.slug, fallback.slug) || fallback.slug,
    path,
    metaTitle: sanitizeString(page.metaTitle, fallback.metaTitle) || fallback.metaTitle,
    metaDescription:
      sanitizeString(page.metaDescription, fallback.metaDescription) ||
      fallback.metaDescription,
    keywords: sanitizeString(page.keywords, fallback.keywords),
    canonicalUrl,
    ogTitle: sanitizeString(page.ogTitle, fallback.ogTitle) || fallback.ogTitle,
    ogDescription:
      sanitizeString(page.ogDescription, fallback.ogDescription) ||
      fallback.ogDescription,
    ogImage: sanitizeString(page.ogImage, fallback.ogImage) || fallback.ogImage,
    ogImageAlt: sanitizeString(page.ogImageAlt, fallback.ogImageAlt) || fallback.ogImageAlt,
    twitterTitle:
      sanitizeString(page.twitterTitle, fallback.twitterTitle) || fallback.twitterTitle,
    twitterDescription:
      sanitizeString(page.twitterDescription, fallback.twitterDescription) ||
      fallback.twitterDescription,
    twitterImage:
      sanitizeString(page.twitterImage, fallback.twitterImage) || fallback.twitterImage,
    robots_index: Boolean(page.robots_index ?? fallback.robots_index),
    robots_follow: Boolean(page.robots_follow ?? fallback.robots_follow),
    robots_noarchive: Boolean(page.robots_noarchive ?? fallback.robots_noarchive),
    robots_nosnippet: Boolean(page.robots_nosnippet ?? fallback.robots_nosnippet),
    isActive: Boolean(page.isActive ?? fallback.isActive),
    createdAt: sanitizeString(page.createdAt, fallback.createdAt) || fallback.createdAt,
    updatedAt: sanitizeString(page.updatedAt, fallback.updatedAt) || fallback.updatedAt,
    updatedBy: sanitizeString(page.updatedBy, fallback.updatedBy) || fallback.updatedBy,
  };
};

export const getSeoPages = (): SEOPageData[] => {
  const defaults = getDefaultSeoPages();
  const defaultBySlug = new Map(defaults.map((page) => [page.slug, page]));
  const storedPages = readStorage<SEOPageData[]>(SEO_STORAGE_KEY, []);

  const mergedPages = defaults.map((defaultPage) => {
    const storedMatch = storedPages.find((storedPage) => storedPage.slug === defaultPage.slug);
    if (!storedMatch) {
      return defaultPage;
    }
    return sanitizePage(storedMatch, defaultPage);
  });

  for (const storedPage of storedPages) {
    const slug = sanitizeString(storedPage.slug);
    if (!slug || defaultBySlug.has(slug)) {
      continue;
    }
    mergedPages.push(sanitizePage(storedPage, defaultSeoFromPage({
      slug,
      path: sanitizeString(storedPage.path, "/"),
      title: sanitizeString(storedPage.metaTitle, siteConfig.defaultTitle),
      description: sanitizeString(
        storedPage.metaDescription,
        siteConfig.defaultDescription,
      ),
      keywords: sanitizeString(storedPage.keywords, ""),
      ogImage: sanitizeString(storedPage.ogImage, siteConfig.openGraph.images.default),
    })));
  }

  writeStorage(SEO_STORAGE_KEY, mergedPages);
  return mergedPages.sort((a, b) => a.path.localeCompare(b.path));
};

export const getSeoPageBySlug = (slug: string): SEOPageData | null =>
  getSeoPages().find((page) => page.slug === slug) ?? null;

export const getSeoPageByPath = (path: string): SEOPageData | null =>
  getSeoPages().find((page) => page.path === path) ?? null;

export const getSeoHistory = (): SEOHistoryEntry[] =>
  readStorage<SEOHistoryEntry[]>(SEO_HISTORY_STORAGE_KEY, []).sort((a, b) =>
    b.changedAt.localeCompare(a.changedAt),
  );

export const updateSeoPage = (
  slug: string,
  patch: Partial<SEOPageData>,
  changedBy: string,
) => {
  const pages = getSeoPages();
  const targetIndex = pages.findIndex((page) => page.slug === slug);
  if (targetIndex === -1) {
    return null;
  }

  const currentPage = pages[targetIndex];
  const updatedPage = sanitizePage(
    {
      ...currentPage,
      ...patch,
      updatedAt: nowIso(),
      updatedBy: changedBy,
    },
    currentPage,
  );
  pages[targetIndex] = updatedPage;

  const historyEntries = getSeoHistory();
  const fieldsToTrack: Array<keyof SEOPageData> = [
    "metaTitle",
    "metaDescription",
    "keywords",
    "canonicalUrl",
    "ogTitle",
    "ogDescription",
    "ogImage",
    "ogImageAlt",
    "twitterTitle",
    "twitterDescription",
    "twitterImage",
    "robots_index",
    "robots_follow",
    "robots_noarchive",
    "robots_nosnippet",
  ];

  for (const field of fieldsToTrack) {
    const previousValue = String(currentPage[field] ?? "");
    const nextValue = String(updatedPage[field] ?? "");
    if (previousValue === nextValue) {
      continue;
    }
    historyEntries.unshift({
      id: createId(),
      pageSlug: slug,
      field,
      oldValue: previousValue,
      newValue: nextValue,
      changedBy,
      changedAt: nowIso(),
    });
  }

  writeStorage(SEO_STORAGE_KEY, pages);
  writeStorage(SEO_HISTORY_STORAGE_KEY, historyEntries.slice(0, 300));
  dispatchSeoUpdated();
  return updatedPage;
};

export const resetSeoPagesToDefault = () => {
  const defaults = getDefaultSeoPages();
  writeStorage(SEO_STORAGE_KEY, defaults);
  dispatchSeoUpdated();
  return defaults;
};

export const ensureSeoDefaultsForApp = () => {
  getSeoPages();
};

export const getSeoPageIdList = (): SEOPageId[] => Object.keys(pagesConfig) as SEOPageId[];
