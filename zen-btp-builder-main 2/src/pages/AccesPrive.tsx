import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  CONTACT_REQUEST_ADDED_EVENT_NAME,
  clearContactRequests,
  ContactRequest,
  getContactRequests,
  getSiteMetrics,
  SiteMetrics,
} from "@/lib/site-insights";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

const SESSION_STORAGE_KEY = "proxizen-private-access-session";
const OWNER_EMAIL = "proxizenbtp@gmail.com";
const DEFAULT_PRIVATE_PASSWORD = "ProxizenBtp2026!";
const CALENDLY_DASHBOARD_URL = "https://calendly.com/app/scheduled_events";

const formatDate = (isoDate: string) => {
  try {
    return new Date(isoDate).toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return isoDate;
  }
};

const escapeCsvCell = (value: string) => `"${value.replace(/"/g, "\"\"")}"`;

const looksLikeLinkedinUrl = (value: string) =>
  /^https?:\/\/(www\.)?(linkedin\.com|lnkd\.in)\//i.test(value);

const AccesPrive = () => {
  const { toast } = useToast();
  const { settings, updateSettings } = useSiteSettings();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [metrics, setMetrics] = useState<SiteMetrics>(() => getSiteMetrics());
  const [requests, setRequests] = useState<ContactRequest[]>(() =>
    getContactRequests(),
  );
  const [linkedinDraft, setLinkedinDraft] = useState(settings.linkedinUrl);

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

  const refreshDashboard = () => {
    setMetrics(getSiteMetrics());
    setRequests(getContactRequests());
  };

  useEffect(() => {
    const hasAccess = window.sessionStorage.getItem(SESSION_STORAGE_KEY) === "ok";
    if (hasAccess) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    setLinkedinDraft(settings.linkedinUrl);
  }, [settings.linkedinUrl]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    refreshDashboard();
    const timer = window.setInterval(refreshDashboard, 15000);
    const onStorage = () => refreshDashboard();
    const onContactAdded = () => refreshDashboard();

    window.addEventListener("storage", onStorage);
    window.addEventListener(CONTACT_REQUEST_ADDED_EVENT_NAME, onContactAdded);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CONTACT_REQUEST_ADDED_EVENT_NAME, onContactAdded);
    };
  }, [isAuthenticated]);

  const topPages = useMemo(
    () =>
      Object.entries(metrics.pageViewsByPath)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6),
    [metrics.pageViewsByPath],
  );

  const calendlySources = useMemo(
    () =>
      Object.entries(metrics.calendlyClicksBySource)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6),
    [metrics.calendlyClicksBySource],
  );

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
      description: "Bienvenue dans votre tableau de bord.",
    });
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleClearRequests = () => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer toutes les demandes clients enregistrees ?",
    );
    if (!confirmed) {
      return;
    }

    clearContactRequests();
    refreshDashboard();
    toast({
      title: "Demandes supprimees",
      description: "La liste des demandes clients a ete videe.",
    });
  };

  const handleExportRequests = () => {
    if (requests.length === 0) {
      toast({
        title: "Aucune demande",
        description: "Aucune demande client a exporter pour le moment.",
      });
      return;
    }

    const header = [
      "Date",
      "Nom",
      "Entreprise",
      "Email",
      "Telephone",
      "Message",
    ];
    const rows = requests.map((request) => [
      request.createdAt,
      request.name,
      request.company,
      request.email,
      request.phone,
      request.message,
    ]);
    const csvContent = [
      header.map(escapeCsvCell).join(","),
      ...rows.map((row) => row.map((cell) => escapeCsvCell(String(cell))).join(",")),
    ].join("\n");

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `demandes-clients-proxizen-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  const handleSaveLinkedin = () => {
    const trimmedValue = linkedinDraft.trim();
    if (trimmedValue && !looksLikeLinkedinUrl(trimmedValue)) {
      toast({
        title: "Lien LinkedIn invalide",
        description:
          "Utilisez un lien LinkedIn complet (linkedin.com ou lnkd.in).",
        variant: "destructive",
      });
      return;
    }
    updateSettings({ linkedinUrl: trimmedValue });
    toast({
      title: "Lien LinkedIn enregistre",
      description: trimmedValue
        ? "Le lien LinkedIn est pret pour l'ajout futur."
        : "Le lien LinkedIn a ete vide.",
    });
  };

  return (
    <Layout>
      <SEO
        title="Dashboard prive - ProxizenBTP"
        description="Suivi prive des demandes clients et statistiques."
        noindex
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Tableau de bord prive
          </h1>
          <p className="text-muted-foreground mb-10">
            Suivi des rendez-vous, demandes clients et statistiques du site.
          </p>

          {!isAuthenticated ? (
            <div className="bg-card border rounded-xl p-6 md:p-8 max-w-xl">
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
                  Ouvrir le tableau de bord
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <Button type="button" variant="outline" onClick={refreshDashboard}>
                  Actualiser les donnees
                </Button>
                <Button type="button" variant="ghost" onClick={handleLogout}>
                  Se deconnecter
                </Button>
                <Button asChild className="sm:ml-auto">
                  <Link to="/acces-prive/seo">Gestion SEO</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border rounded-xl p-5">
                  <p className="text-sm text-muted-foreground">Vues total site</p>
                  <p className="text-3xl font-heading font-bold mt-2">
                    {metrics.totalPageViews}
                  </p>
                </div>
                <div className="bg-card border rounded-xl p-5">
                  <p className="text-sm text-muted-foreground">Sessions uniques</p>
                  <p className="text-3xl font-heading font-bold mt-2">
                    {metrics.uniqueSessions}
                  </p>
                </div>
                <div className="bg-card border rounded-xl p-5">
                  <p className="text-sm text-muted-foreground">Clics Calendly</p>
                  <p className="text-3xl font-heading font-bold mt-2">
                    {metrics.calendlyClicks}
                  </p>
                </div>
                <div className="bg-card border rounded-xl p-5">
                  <p className="text-sm text-muted-foreground">Demandes recues</p>
                  <p className="text-3xl font-heading font-bold mt-2">
                    {metrics.contactSubmissions}
                  </p>
                </div>
              </div>

              <div className="bg-card border rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-heading font-bold">Prises de rendez-vous</h2>
                <p className="text-sm text-muted-foreground">
                  Pour voir le detail des rendez-vous confirmes, ouvrez votre
                  dashboard Calendly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild>
                    <a href={CALENDLY_DASHBOARD_URL} target="_blank" rel="noreferrer">
                      Voir mes rendez-vous Calendly
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={settings.calendlyUrl} target="_blank" rel="noreferrer">
                      Ouvrir la page publique de prise de rendez-vous
                    </a>
                  </Button>
                </div>
                <div className="rounded-lg border border-border/60 bg-background p-4 space-y-3">
                  <p className="text-sm font-medium">
                    Lien LinkedIn (ajout futur)
                  </p>
                  <Input
                    type="url"
                    value={linkedinDraft}
                    onChange={(event) => setLinkedinDraft(event.target.value)}
                    placeholder="https://www.linkedin.com/in/..."
                  />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="button" variant="outline" onClick={handleSaveLinkedin}>
                      Enregistrer le lien LinkedIn
                    </Button>
                    {settings.linkedinUrl ? (
                      <Button asChild type="button" variant="ghost">
                        <a href={settings.linkedinUrl} target="_blank" rel="noreferrer">
                          Ouvrir LinkedIn actuel
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-heading font-bold mb-4">Pages les plus vues</h3>
                  {topPages.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Aucune visite enregistree pour le moment.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {topPages.map(([path, count]) => (
                        <li key={path} className="flex justify-between gap-4 text-sm">
                          <span className="truncate">{path}</span>
                          <span className="font-semibold">{count}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-heading font-bold mb-4">
                    Sources des clics Calendly
                  </h3>
                  {calendlySources.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Aucun clic Calendly enregistre pour le moment.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {calendlySources.map(([source, count]) => (
                        <li key={source} className="flex justify-between gap-4 text-sm">
                          <span className="truncate">{source}</span>
                          <span className="font-semibold">{count}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="bg-card border rounded-xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <h2 className="text-xl font-heading font-bold">Demandes clients</h2>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={handleExportRequests}>
                      Export CSV
                    </Button>
                    <Button type="button" variant="ghost" onClick={handleClearRequests}>
                      Vider
                    </Button>
                  </div>
                </div>

                {requests.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Aucune demande recue via le formulaire pour le moment.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {requests.map((request) => (
                      <article
                        key={request.id}
                        className="border rounded-lg p-4 bg-background/50"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold">{request.name || "Sans nom"}</h3>
                            <p className="text-xs text-muted-foreground">
                              {request.company || "Entreprise non renseignee"}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(request.createdAt)}
                          </p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                          <a className="underline" href={`mailto:${request.email}`}>
                            {request.email}
                          </a>
                          {request.phone ? (
                            <a className="underline" href={`tel:${request.phone}`}>
                              {request.phone}
                            </a>
                          ) : null}
                        </div>
                        <p className="mt-3 text-sm whitespace-pre-wrap leading-relaxed">
                          {request.message || "Aucun message"}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Note: ces statistiques sont locales au site et au navigateur.
                Pour des statistiques globales avancees, ajoutez aussi Vercel
                Analytics ou GA4.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AccesPrive;
