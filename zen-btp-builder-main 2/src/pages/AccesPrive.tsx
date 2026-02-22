import { FormEvent, useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sanitizeSiteSettings } from "@/lib/site-settings";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

const SESSION_STORAGE_KEY = "proxizen-private-access-session";
const OWNER_EMAIL = "proxizenbtp@gmail.com";
const DEFAULT_PRIVATE_PASSWORD = "ProxizenBtp2026!";

const AccesPrive = () => {
  const { toast } = useToast();
  const { settings, updateSettings, resetSettings } = useSiteSettings();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formEmail, setFormEmail] = useState(settings.contactEmail);
  const [formCalendly, setFormCalendly] = useState(settings.calendlyUrl);

  const expectedPassword =
    import.meta.env.VITE_PRIVATE_ACCESS_PASSWORD?.trim() || DEFAULT_PRIVATE_PASSWORD;
  const allowedEmails = useMemo(() => {
    const emails = [OWNER_EMAIL];
    const clientEmail = import.meta.env.VITE_CLIENT_ACCESS_EMAIL?.trim().toLowerCase();
    if (clientEmail) {
      emails.push(clientEmail);
    }
    return emails;
  }, []);

  useEffect(() => {
    setFormEmail(settings.contactEmail);
    setFormCalendly(settings.calendlyUrl);
  }, [settings.contactEmail, settings.calendlyUrl]);

  useEffect(() => {
    const hasAccess = window.sessionStorage.getItem(SESSION_STORAGE_KEY) === "ok";
    if (hasAccess) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = loginEmail.trim().toLowerCase();
    const isAuthorizedEmail = allowedEmails.includes(normalizedEmail);
    const isValidPassword = loginPassword === expectedPassword;

    if (!isAuthorizedEmail || !isValidPassword) {
      toast({
        title: "Acces refuse",
        description: "Email ou mot de passe incorrect.",
        variant: "destructive",
      });
      return;
    }

    window.sessionStorage.setItem(SESSION_STORAGE_KEY, "ok");
    setIsAuthenticated(true);
    setLoginPassword("");
    toast({
      title: "Connexion reussie",
      description: "Bienvenue dans l'espace prive.",
    });
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleSaveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sanitized = sanitizeSiteSettings({
      contactEmail: formEmail,
      calendlyUrl: formCalendly,
    });

    updateSettings(sanitized);
    setFormEmail(sanitized.contactEmail);
    setFormCalendly(sanitized.calendlyUrl);

    toast({
      title: "Informations mises a jour",
      description: "Le mail et le lien Calendly ont ete enregistres.",
    });
  };

  const handleResetDefaults = () => {
    resetSettings();
    toast({
      title: "Valeurs par defaut restaurees",
      description: "Les informations d'origine ont ete reappliquees.",
    });
  };

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Espace prive
          </h1>
          <p className="text-muted-foreground mb-10">
            Acces reserve au proprietaire et au client pour modifier les
            informations de contact du site.
          </p>

          {!isAuthenticated ? (
            <div className="bg-card border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-heading font-bold mb-6">
                Connexion
              </h2>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="private-email">Email autorise</Label>
                  <Input
                    id="private-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                    placeholder="votre@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="private-password">Mot de passe</Label>
                  <Input
                    id="private-password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    placeholder="Mot de passe"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Ouvrir l'espace prive
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                Conseil: configurez VITE_PRIVATE_ACCESS_PASSWORD dans Vercel
                pour remplacer le mot de passe par defaut.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-card border rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-heading font-bold mb-6">
                  Modifier les informations du site
                </h2>
                <form onSubmit={handleSaveSettings} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="site-email">Email public</Label>
                    <Input
                      id="site-email"
                      type="email"
                      required
                      value={formEmail}
                      onChange={(event) => setFormEmail(event.target.value)}
                      placeholder="proxizenbtp@gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-calendly">Lien Calendly</Label>
                    <Input
                      id="site-calendly"
                      type="url"
                      required
                      value={formCalendly}
                      onChange={(event) => setFormCalendly(event.target.value)}
                      placeholder="https://calendly.com/proxizenbtp/30min"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" className="sm:w-auto">
                      Enregistrer les changements
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResetDefaults}
                    >
                      Restaurer les valeurs par defaut
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="sm:ml-auto"
                      onClick={handleLogout}
                    >
                      Se deconnecter
                    </Button>
                  </div>
                </form>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="font-heading font-bold mb-2 text-primary">
                  Valeurs actuellement utilisees
                </h3>
                <p className="text-sm text-muted-foreground">
                  Email:{" "}
                  <a className="underline" href={`mailto:${settings.contactEmail}`}>
                    {settings.contactEmail}
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  Calendly:{" "}
                  <a
                    className="underline"
                    href={settings.calendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {settings.calendlyUrl}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AccesPrive;
