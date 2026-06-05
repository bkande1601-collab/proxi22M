export interface SiteSettings {
  contactEmail: string;
  calendlyUrl: string;
  linkedinUrl: string;
  logoUrl: string;
  heroImageUrl: string;
  heroBadgeText: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleLine3: string;
  heroDescription: string;
  heroPrimaryButtonText: string;
  finalCtaTitle: string;
  finalCtaButtonText: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  contactEmail: "proxizenbtp@gmail.com",
  calendlyUrl: "https://calendly.com/proxizenbtp/30min",
  linkedinUrl: "",
  logoUrl: "/proxizen-logo.svg",
  heroImageUrl: "",
  heroBadgeText: "Specialiste BTP • Accompagnement sur-mesure",
  heroTitleLine1: "Simplifiez",
  heroTitleLine2: "l'administratif",
  heroTitleLine3: "de votre entreprise",
  heroDescription:
    "ProxiZen BTP accompagne les artisans et entreprises du batiment dans leur organisation administrative.",
  heroPrimaryButtonText: "Prendre RDV",
  finalCtaTitle: "Et si vous gagniez du temps sur votre administratif ?",
  finalCtaButtonText: "Planifier un echange gratuit",
};

const SITE_SETTINGS_STORAGE_KEY = "proxizen-site-settings-v1";
const MAX_INLINE_IMAGE_LENGTH = 180_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const normalizeCalendlyUrl = (value: string) => value.trim();
const normalizeLinkedinUrl = (value: string) => value.trim();

const sanitizeText = (value: string | undefined, fallback: string, maxLength = 400) => {
  const normalizedValue = (value ?? "").trim();
  if (!normalizedValue) {
    return fallback;
  }
  return normalizedValue.slice(0, maxLength);
};

const isValidCalendlyUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.includes("calendly.com");
  } catch {
    return false;
  }
};

const isValidLinkedinUrl = (value: string) => {
  if (!value) {
    return true;
  }
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      (url.hostname.includes("linkedin.com") || url.hostname.includes("lnkd.in"))
    );
  } catch {
    return false;
  }
};

const sanitizeImageSource = (value: string | undefined, fallback: string) => {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    return fallback;
  }

  if (normalizedValue.startsWith("data:image/")) {
    if (normalizedValue.length > MAX_INLINE_IMAGE_LENGTH) {
      return fallback;
    }
    return normalizedValue;
  }

  if (normalizedValue.startsWith("/")) {
    return normalizedValue;
  }

  try {
    const url = new URL(normalizedValue);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return normalizedValue;
    }
  } catch {
    return fallback;
  }

  return fallback;
};

export const sanitizeSiteSettings = (value: Partial<SiteSettings>): SiteSettings => {
  const candidateEmail = normalizeEmail(value.contactEmail ?? DEFAULT_SITE_SETTINGS.contactEmail);
  const candidateCalendly = normalizeCalendlyUrl(value.calendlyUrl ?? DEFAULT_SITE_SETTINGS.calendlyUrl);
  const candidateLinkedin = normalizeLinkedinUrl(value.linkedinUrl ?? DEFAULT_SITE_SETTINGS.linkedinUrl);

  return {
    contactEmail: EMAIL_PATTERN.test(candidateEmail)
      ? candidateEmail
      : DEFAULT_SITE_SETTINGS.contactEmail,
    calendlyUrl: isValidCalendlyUrl(candidateCalendly)
      ? candidateCalendly
      : DEFAULT_SITE_SETTINGS.calendlyUrl,
    linkedinUrl: isValidLinkedinUrl(candidateLinkedin)
      ? candidateLinkedin
      : DEFAULT_SITE_SETTINGS.linkedinUrl,
    logoUrl: sanitizeImageSource(value.logoUrl, DEFAULT_SITE_SETTINGS.logoUrl),
    heroImageUrl: sanitizeImageSource(value.heroImageUrl, DEFAULT_SITE_SETTINGS.heroImageUrl),
    heroBadgeText: sanitizeText(value.heroBadgeText, DEFAULT_SITE_SETTINGS.heroBadgeText, 120),
    heroTitleLine1: sanitizeText(value.heroTitleLine1, DEFAULT_SITE_SETTINGS.heroTitleLine1, 80),
    heroTitleLine2: sanitizeText(value.heroTitleLine2, DEFAULT_SITE_SETTINGS.heroTitleLine2, 80),
    heroTitleLine3: sanitizeText(value.heroTitleLine3, DEFAULT_SITE_SETTINGS.heroTitleLine3, 80),
    heroDescription: sanitizeText(value.heroDescription, DEFAULT_SITE_SETTINGS.heroDescription, 360),
    heroPrimaryButtonText: sanitizeText(
      value.heroPrimaryButtonText,
      DEFAULT_SITE_SETTINGS.heroPrimaryButtonText,
      60,
    ),
    finalCtaTitle: sanitizeText(value.finalCtaTitle, DEFAULT_SITE_SETTINGS.finalCtaTitle, 160),
    finalCtaButtonText: sanitizeText(
      value.finalCtaButtonText,
      DEFAULT_SITE_SETTINGS.finalCtaButtonText,
      80,
    ),
  };
};

export const getStoredSiteSettings = (): SiteSettings => {
  if (typeof window === "undefined") {
    return DEFAULT_SITE_SETTINGS;
  }

  try {
    const raw = window.localStorage.getItem(SITE_SETTINGS_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_SITE_SETTINGS;
    }

    const parsed = JSON.parse(raw) as Partial<SiteSettings>;
    const sanitized = sanitizeSiteSettings(parsed);
    const parsedAsString = JSON.stringify(parsed);
    const sanitizedAsString = JSON.stringify(sanitized);
    if (parsedAsString !== sanitizedAsString) {
      storeSiteSettings(sanitized);
    }
    return sanitized;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
};

export const storeSiteSettings = (settings: SiteSettings) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      SITE_SETTINGS_STORAGE_KEY,
      JSON.stringify(sanitizeSiteSettings(settings)),
    );
  } catch {
    // Ignore localStorage quota errors and keep current in-memory settings.
  }
};

export const resetStoredSiteSettings = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SITE_SETTINGS_STORAGE_KEY);
};
