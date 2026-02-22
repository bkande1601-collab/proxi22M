export const siteConfig = {
  name: "ProxiZen BTP",
  domain: "proxizenbtp.fr",
  url: "https://proxizenbtp.fr",
  defaultTitle: "ProxiZen BTP - Assistance administrative BTP",
  defaultDescription:
    "Liberez-vous de l'administratif. ProxiZen BTP structure votre gestion et simplifie votre relation avec votre cabinet comptable.",
  locale: "fr_FR",
  email: "contact@proxizenbtp.fr",
  author: "ProxiZen BTP",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "ProxiZen BTP",
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
    title: "ProxiZen BTP - Assistance administrative BTP",
    description:
      "Liberez-vous de l'administratif. ProxiZen BTP structure votre gestion administrative et simplifie votre relation avec votre cabinet comptable.",
    keywords:
      "ProxiZen BTP, proxizen btp, proxizenbtp, assistance administrative BTP, administratif, comptabilite, artisan, TPE, gestion, accompagnement",
    ogImage: "/og-home.png",
  },
  accompagnement: {
    slug: "accompagnement",
    path: "/accompagnement",
    title: "Accompagnement sur-mesure - ProxiZen BTP",
    description:
      "Organisation administrative, devis & facturation, interface avec votre cabinet. Accompagnement personnalise pour artisans et TPE du BTP avec ProxiZen BTP.",
    keywords:
      "ProxiZen BTP, accompagnement BTP, organisation administrative, devis facturation, pre-comptabilite",
    ogImage: "/og-accompagnement.png",
  },
  offres: {
    slug: "offres",
    path: "/offres",
    title: "Nos offres - ProxiZen BTP",
    description:
      "Decouvrez les formules d'accompagnement administratif ProxiZen BTP pour artisans, TPE et PME du batiment.",
    keywords:
      "ProxiZen BTP, offres administratif BTP, formules accompagnement, gestion entreprise batiment",
    ogImage: "/og-accompagnement.png",
  },
  apropos: {
    slug: "apropos",
    path: "/a-propos",
    title: "A propos - ProxiZen BTP",
    description:
      "Decouvrez ProxiZen BTP, votre partenaire pour simplifier l'administratif et la gestion de votre entreprise du BTP.",
    keywords: "ProxiZen BTP, proxizen btp, equipe, valeurs, expertise BTP",
    ogImage: "/og-apropos.png",
  },
  contact: {
    slug: "contact",
    path: "/contact",
    title: "Contactez-nous - ProxiZen BTP",
    description:
      "Prenons rendez-vous pour echanger sur vos besoins administratifs. Premier echange telephonique gratuit et sans engagement.",
    keywords: "contact ProxiZen BTP, proxizen btp, rendez-vous, devis gratuit",
    ogImage: "/og-contact.png",
  },
  faq: {
    slug: "faq",
    path: "/faq",
    title: "FAQ - ProxiZen BTP",
    description:
      "Consultez les questions frequentes sur l'accompagnement administratif ProxiZen BTP pour les entreprises du BTP.",
    keywords: "faq ProxiZen BTP, proxizen btp, questions administratives BTP, accompagnement",
    ogImage: "/og-default.png",
  },
} satisfies Record<string, SEOPageConfig>;

export type SEOPageId = keyof typeof pagesConfig;
