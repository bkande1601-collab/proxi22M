export const siteConfig = {
  name: "ProxizenBTP",
  domain: "proxizenbtp.fr",
  url: "https://proxizenbtp.fr",
  defaultTitle: "ProxizenBTP - Accompagnement administratif BTP",
  defaultDescription:
    "Liberez-vous de l'administratif. ProxizenBTP structure votre gestion et simplifie votre relation avec votre cabinet comptable.",
  locale: "fr_FR",
  email: "contact@proxizenbtp.fr",
  author: "ProxizenBTP",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "ProxizenBTP",
    images: {
      default: "/og-default.png",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@proxizenbtp",
  },
} as const;

export interface SEOPageConfig {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export const pagesConfig = {
  home: {
    slug: "home",
    path: "/",
    title: "ProxizenBTP - Accompagnement administratif BTP",
    description:
      "Liberez-vous de l'administratif. ProxizenBTP structure votre gestion administrative et simplifie votre relation avec votre cabinet comptable.",
    keywords:
      "BTP, administratif, comptabilite, artisan, TPE, gestion, accompagnement",
    ogImage: "/og-home.png",
  },
  accompagnement: {
    slug: "accompagnement",
    path: "/accompagnement",
    title: "Accompagnement sur-mesure - ProxizenBTP",
    description:
      "Organisation administrative, devis & facturation, interface avec votre cabinet. Accompagnement personnalise pour artisans et TPE du BTP.",
    keywords:
      "accompagnement BTP, organisation administrative, devis facturation, pre-comptabilite",
    ogImage: "/og-accompagnement.png",
  },
  offres: {
    slug: "offres",
    path: "/offres",
    title: "Nos offres - ProxizenBTP",
    description:
      "Decouvrez les formules d'accompagnement administratif ProxizenBTP pour artisans, TPE et PME du batiment.",
    keywords:
      "offres administratif BTP, formules accompagnement, gestion entreprise batiment",
    ogImage: "/og-accompagnement.png",
  },
  apropos: {
    slug: "apropos",
    path: "/a-propos",
    title: "A propos - ProxizenBTP",
    description:
      "Decouvrez ProxizenBTP, votre partenaire pour simplifier l'administratif et la gestion de votre entreprise du BTP.",
    keywords: "ProxizenBTP, equipe, valeurs, expertise BTP",
    ogImage: "/og-apropos.png",
  },
  contact: {
    slug: "contact",
    path: "/contact",
    title: "Contactez-nous - ProxizenBTP",
    description:
      "Prenons rendez-vous pour echanger sur vos besoins administratifs. Premier echange telephonique gratuit et sans engagement.",
    keywords: "contact ProxizenBTP, rendez-vous, devis gratuit",
    ogImage: "/og-contact.png",
  },
  faq: {
    slug: "faq",
    path: "/faq",
    title: "FAQ - ProxizenBTP",
    description:
      "Consultez les questions frequentes sur l'accompagnement administratif ProxizenBTP pour les entreprises du BTP.",
    keywords: "faq ProxizenBTP, questions administratives BTP, accompagnement",
    ogImage: "/og-default.png",
  },
} satisfies Record<string, SEOPageConfig>;

export type SEOPageId = keyof typeof pagesConfig;
