import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_SITE_SETTINGS,
  getStoredSiteSettings,
  resetStoredSiteSettings,
  sanitizeSiteSettings,
  SiteSettings,
  storeSiteSettings,
} from "@/lib/site-settings";

interface SiteSettingsContextValue {
  settings: SiteSettings;
  updateSettings: (nextValues: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    setSettings(getStoredSiteSettings());
  }, []);

  const updateSettings = useCallback((nextValues: Partial<SiteSettings>) => {
    setSettings((currentValues) => {
      const mergedValues = sanitizeSiteSettings({ ...currentValues, ...nextValues });
      storeSiteSettings(mergedValues);
      return mergedValues;
    });
  }, []);

  const resetSettings = useCallback(() => {
    resetStoredSiteSettings();
    setSettings(DEFAULT_SITE_SETTINGS);
  }, []);

  const value = useMemo(
    () => ({
      settings,
      updateSettings,
      resetSettings,
    }),
    [settings, updateSettings, resetSettings],
  );

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings doit etre utilise dans SiteSettingsProvider");
  }
  return context;
};
