export interface SiteMetrics {
  totalPageViews: number;
  uniqueSessions: number;
  calendlyClicks: number;
  contactSubmissions: number;
  pageViewsByPath: Record<string, number>;
  calendlyClicksBySource: Record<string, number>;
  updatedAt: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface ContactRequestInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
}

const METRICS_STORAGE_KEY = "proxizen-site-metrics-v1";
const CONTACT_REQUESTS_STORAGE_KEY = "proxizen-contact-requests-v1";
const KNOWN_SESSIONS_STORAGE_KEY = "proxizen-known-sessions-v1";
const CURRENT_SESSION_STORAGE_KEY = "proxizen-current-session-v1";
const SITE_SETTINGS_STORAGE_KEY = "proxizen-site-settings-v1";
const CONTACT_REQUEST_ADDED_EVENT = "proxizen:contact-request-added";

const DEFAULT_SITE_METRICS: SiteMetrics = {
  totalPageViews: 0,
  uniqueSessions: 0,
  calendlyClicks: 0,
  contactSubmissions: 0,
  pageViewsByPath: {},
  calendlyClicksBySource: {},
  updatedAt: "",
};

const isBrowser = () => typeof window !== "undefined";

const safeJsonParse = <T>(value: string | null, fallback: T): T => {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const readStorage = <T>(key: string, fallback: T): T => {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    return safeJsonParse(window.localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
};

const writeStorage = <T>(key: string, value: T): boolean => {
  if (!isBrowser()) {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // If storage is full, remove heavy legacy content and retry once.
    try {
      window.localStorage.removeItem(SITE_SETTINGS_STORAGE_KEY);
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
};

const readMetrics = (): SiteMetrics => {
  const storedMetrics = readStorage<Partial<SiteMetrics>>(
    METRICS_STORAGE_KEY,
    DEFAULT_SITE_METRICS,
  );

  return {
    totalPageViews: Number(storedMetrics.totalPageViews ?? 0),
    uniqueSessions: Number(storedMetrics.uniqueSessions ?? 0),
    calendlyClicks: Number(storedMetrics.calendlyClicks ?? 0),
    contactSubmissions: Number(storedMetrics.contactSubmissions ?? 0),
    pageViewsByPath: storedMetrics.pageViewsByPath ?? {},
    calendlyClicksBySource: storedMetrics.calendlyClicksBySource ?? {},
    updatedAt: String(storedMetrics.updatedAt ?? ""),
  };
};

const writeMetrics = (metrics: SiteMetrics) => {
  writeStorage(METRICS_STORAGE_KEY, metrics);
};

const getCurrentSessionId = () => {
  if (!isBrowser()) {
    return "";
  }

  try {
    const existing = window.sessionStorage.getItem(CURRENT_SESSION_STORAGE_KEY);
    if (existing) {
      return existing;
    }

    const nextSessionId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `session-${Date.now()}`;
    window.sessionStorage.setItem(CURRENT_SESSION_STORAGE_KEY, nextSessionId);
    return nextSessionId;
  } catch {
    return `fallback-${Date.now()}`;
  }
};

const registerUniqueSession = (metrics: SiteMetrics) => {
  if (!isBrowser()) {
    return metrics;
  }

  const currentSessionId = getCurrentSessionId();
  const knownSessions = readStorage<string[]>(KNOWN_SESSIONS_STORAGE_KEY, []);

  if (knownSessions.includes(currentSessionId)) {
    return metrics;
  }

  const updatedSessions = [...knownSessions, currentSessionId].slice(-5000);
  writeStorage(KNOWN_SESSIONS_STORAGE_KEY, updatedSessions);

  return {
    ...metrics,
    uniqueSessions: updatedSessions.length,
  };
};

const sanitizeContactField = (value: string | undefined, maxLength: number) =>
  String(value ?? "").trim().slice(0, maxLength);

const createRequestId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `request-${Date.now()}`;

export const getSiteMetrics = (): SiteMetrics => readMetrics();

export const trackPageView = (path: string) => {
  if (!isBrowser()) {
    return;
  }

  const normalizedPath = path || "/";
  const baseMetrics = registerUniqueSession(readMetrics());

  const nextMetrics: SiteMetrics = {
    ...baseMetrics,
    totalPageViews: baseMetrics.totalPageViews + 1,
    pageViewsByPath: {
      ...baseMetrics.pageViewsByPath,
      [normalizedPath]: (baseMetrics.pageViewsByPath[normalizedPath] ?? 0) + 1,
    },
    updatedAt: new Date().toISOString(),
  };

  writeMetrics(nextMetrics);
};

export const trackCalendlyClick = (source: string) => {
  if (!isBrowser()) {
    return;
  }

  const normalizedSource = source.trim() || "unknown";
  const metrics = readMetrics();
  const nextMetrics: SiteMetrics = {
    ...metrics,
    calendlyClicks: metrics.calendlyClicks + 1,
    calendlyClicksBySource: {
      ...metrics.calendlyClicksBySource,
      [normalizedSource]: (metrics.calendlyClicksBySource[normalizedSource] ?? 0) + 1,
    },
    updatedAt: new Date().toISOString(),
  };

  writeMetrics(nextMetrics);
};

export const getContactRequests = (): ContactRequest[] =>
  readStorage<ContactRequest[]>(CONTACT_REQUESTS_STORAGE_KEY, []);

export const addContactRequest = (input: ContactRequestInput) => {
  if (!isBrowser()) {
    return false;
  }

  const nextRequest: ContactRequest = {
    id: createRequestId(),
    name: sanitizeContactField(input.name, 100),
    company: sanitizeContactField(input.company, 100),
    email: sanitizeContactField(input.email, 255),
    phone: sanitizeContactField(input.phone, 30),
    message: sanitizeContactField(input.message, 1500),
    createdAt: new Date().toISOString(),
  };

  const requests = getContactRequests();
  const updatedRequests = [nextRequest, ...requests].slice(0, 500);
  const hasSavedRequests = writeStorage(CONTACT_REQUESTS_STORAGE_KEY, updatedRequests);
  if (!hasSavedRequests) {
    return false;
  }

  const metrics = readMetrics();
  const nextMetrics: SiteMetrics = {
    ...metrics,
    contactSubmissions: metrics.contactSubmissions + 1,
    updatedAt: new Date().toISOString(),
  };
  writeMetrics(nextMetrics);

  window.dispatchEvent(new CustomEvent(CONTACT_REQUEST_ADDED_EVENT));
  return true;
};

export const clearContactRequests = () => {
  if (!isBrowser()) {
    return false;
  }

  try {
    window.localStorage.removeItem(CONTACT_REQUESTS_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};

export const CONTACT_REQUEST_ADDED_EVENT_NAME = CONTACT_REQUEST_ADDED_EVENT;
