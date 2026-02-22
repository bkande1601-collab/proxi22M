export interface SiteSettings {
  contactEmail: string;
  calendlyUrl: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  contactEmail: "proxizenbtp@gmail.com",
  calendlyUrl: "https://calendly.com/proxizenbtp/30min",
};

const SITE_SETTINGS_STORAGE_KEY = "proxizen-site-settings-v1";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const normalizeCalendlyUrl = (value: string) => value.trim();

const isValidCalendlyUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.includes("calendly.com");
  } catch {
    return false;
  }
};

export const sanitizeSiteSettings = (value: Partial<SiteSettings>): SiteSettings => {
  const candidateEmail = normalizeEmail(value.contactEmail ?? DEFAULT_SITE_SETTINGS.contactEmail);
  const candidateCalendly = normalizeCalendlyUrl(value.calendlyUrl ?? DEFAULT_SITE_SETTINGS.calendlyUrl);

  return {
    contactEmail: EMAIL_PATTERN.test(candidateEmail)
      ? candidateEmail
      : DEFAULT_SITE_SETTINGS.contactEmail,
    calendlyUrl: isValidCalendlyUrl(candidateCalendly)
      ? candidateCalendly
      : DEFAULT_SITE_SETTINGS.calendlyUrl,
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
    return sanitizeSiteSettings(parsed);
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
};

export const storeSiteSettings = (settings: SiteSettings) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    SITE_SETTINGS_STORAGE_KEY,
    JSON.stringify(sanitizeSiteSettings(settings)),
  );
};

export const resetStoredSiteSettings = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SITE_SETTINGS_STORAGE_KEY);
};
