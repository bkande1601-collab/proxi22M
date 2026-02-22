import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sanitizeSiteSettings, SiteSettings } from "@/lib/site-settings";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

const SESSION_STORAGE_KEY = "proxizen-private-access-session";
const OWNER_EMAIL = "proxizenbtp@gmail.com";
const DEFAULT_PRIVATE_PASSWORD = "ProxizenBtp2026!";

const readImageAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Impossible de lire le fichier image."));
    reader.readAsDataURL(file);
  });

const AccesPrive = () => {
  const { toast } = useToast();
  const { settings, updateSettings, resetSettings } = useSiteSettings();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formValues, setFormValues] = useState<SiteSettings>(settings);

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
    setFormValues(settings);
  }, [settings]);

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
      description: "Bienvenue dans le back-office.",
    });
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleFieldChange =
    (field: keyof SiteSettings) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value,
      }));
    };

  const handleImageUpload =
    (field: "logoUrl" | "heroImageUrl") =>
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file) {
        return;
      }

      if (file.size > 2_500_000) {
        toast({
          title: "Image trop lourde",
          description: "Choisissez une image inferieure a 2.5 Mo.",
          variant: "destructive",
        });
        return;
      }

      try {
        const dataUrl = await readImageAsDataUrl(file);
        setFormValues((currentValues) => ({
          ...currentValues,
          [field]: dataUrl,
        }));
        toast({
          title: "Image chargee",
          description: "Cliquez sur Enregistrer les changements pour appliquer.",
        });
      } catch {
        toast({
          title: "Erreur image",
          description: "Le fichier n'a pas pu etre charge.",
          variant: "destructive",
        });
      }
    };

  const handleSaveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sanitized = sanitizeSiteSettings(formValues);
    updateSettings(sanitized);
    setFormValues(sanitized);

    toast({
      title: "Mise a jour effectuee",
      description: "Le contenu du site a bien ete enregistre.",
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
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Back-office prive
          </h1>
          <p className="text-muted-foreground mb-10">
            Acces reserve au proprietaire et au client pour modifier les textes,
            les images et les informations de contact du site.
          </p>

          {!isAuthenticated ? (
            <div className="bg-card border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-heading font-bold mb-6">Connexion</h2>
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
                  Ouvrir le back-office
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                Conseil: configurez VITE_PRIVATE_ACCESS_PASSWORD et
                VITE_CLIENT_ACCESS_EMAIL dans Vercel.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-card border rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-heading font-bold mb-6">
                  Modifier le contenu du site
                </h2>
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="border rounded-lg p-4 md:p-5 space-y-4">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground">
                      Contact et rendez-vous
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="site-email">Email public</Label>
                      <Input
                        id="site-email"
                        type="email"
                        required
                        value={formValues.contactEmail}
                        onChange={handleFieldChange("contactEmail")}
                        placeholder="proxizenbtp@gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="site-calendly">Lien Calendly</Label>
                      <Input
                        id="site-calendly"
                        type="url"
                        required
                        value={formValues.calendlyUrl}
                        onChange={handleFieldChange("calendlyUrl")}
                        placeholder="https://calendly.com/proxizenbtp/30min"
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 md:p-5 space-y-4">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground">
                      Contenu accueil
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="hero-badge">Badge hero</Label>
                      <Input
                        id="hero-badge"
                        value={formValues.heroBadgeText}
                        onChange={handleFieldChange("heroBadgeText")}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hero-line1">Titre ligne 1</Label>
                        <Input
                          id="hero-line1"
                          value={formValues.heroTitleLine1}
                          onChange={handleFieldChange("heroTitleLine1")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-line2">Titre ligne 2</Label>
                        <Input
                          id="hero-line2"
                          value={formValues.heroTitleLine2}
                          onChange={handleFieldChange("heroTitleLine2")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-line3">Titre ligne 3</Label>
                        <Input
                          id="hero-line3"
                          value={formValues.heroTitleLine3}
                          onChange={handleFieldChange("heroTitleLine3")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-description">Description hero</Label>
                      <Textarea
                        id="hero-description"
                        rows={4}
                        value={formValues.heroDescription}
                        onChange={handleFieldChange("heroDescription")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-button">Texte bouton hero</Label>
                      <Input
                        id="hero-button"
                        value={formValues.heroPrimaryButtonText}
                        onChange={handleFieldChange("heroPrimaryButtonText")}
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 md:p-5 space-y-4">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground">
                      CTA final
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="final-cta-title">Titre CTA final</Label>
                      <Input
                        id="final-cta-title"
                        value={formValues.finalCtaTitle}
                        onChange={handleFieldChange("finalCtaTitle")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="final-cta-button">Texte bouton CTA final</Label>
                      <Input
                        id="final-cta-button"
                        value={formValues.finalCtaButtonText}
                        onChange={handleFieldChange("finalCtaButtonText")}
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 md:p-5 space-y-4">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground">
                      Images
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="logo-url">Logo (URL ou import)</Label>
                        <Input
                          id="logo-url"
                          value={formValues.logoUrl}
                          onChange={handleFieldChange("logoUrl")}
                          placeholder="/proxizen-logo.svg"
                        />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload("logoUrl")}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="hero-image-url">Image hero (URL ou import)</Label>
                        <Input
                          id="hero-image-url"
                          value={formValues.heroImageUrl}
                          onChange={handleFieldChange("heroImageUrl")}
                          placeholder="https://..."
                        />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload("heroImageUrl")}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Pour garder de bonnes performances, utilisez des images
                      optimisees (moins de 2.5 Mo).
                    </p>
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

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
                <h3 className="font-heading font-bold text-primary">Apercu rapide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Logo actuel
                    </p>
                    <div className="bg-background border rounded-lg p-3">
                      <img
                        src={settings.logoUrl}
                        alt="Logo actuel"
                        className="h-10 w-auto"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Hero actuelle
                    </p>
                    <div className="bg-background border rounded-lg p-3">
                      <img
                        src={settings.heroImageUrl || "/placeholder.svg"}
                        alt="Hero actuelle"
                        className="h-16 w-full object-cover rounded"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Email public:{" "}
                  <a className="underline" href={`mailto:${settings.contactEmail}`}>
                    {settings.contactEmail}
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  Calendly:{" "}
                  <a className="underline" href={settings.calendlyUrl} target="_blank" rel="noreferrer">
                    {settings.calendlyUrl}
                  </a>
                </p>
                <p className="text-xs text-muted-foreground">
                  Ce back-office fonctionne comme un CMS leger: les changements
                  sont sauvegardes dans le navigateur connecte.
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
