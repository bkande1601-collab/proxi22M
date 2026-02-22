import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  getSeoPageBySlug,
  SEOPageData,
  updateSeoPage,
} from "@/lib/seo-storage";
import {
  closePrivateAccess,
  getPrivateAccessUserEmail,
  isPrivateAccessOpen,
  openPrivateAccess,
  validatePrivateAccessCredentials,
} from "@/lib/private-access";
import { siteConfig } from "@/lib/seo-config";

const emptyEditorState = {
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogImageAlt: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  robots_index: true,
  robots_follow: true,
  robots_noarchive: false,
  robots_nosnippet: false,
};

const toAbsoluteImage = (imagePath: string) => {
  const trimmed = imagePath.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.startsWith("data:image/")) {
    return trimmed;
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  const previewBaseUrl =
    typeof window !== "undefined" ? window.location.origin : siteConfig.url;
  try {
    return new URL(
      trimmed.startsWith("/") ? trimmed : `/${trimmed}`,
      previewBaseUrl,
    ).toString();
  } catch {
    return "";
  }
};

const AccesPriveSeoEditor = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const pageId = params.pageId || "";

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageData, setPageData] = useState<SEOPageData | null>(null);
  const [formData, setFormData] = useState(emptyEditorState);

  useEffect(() => {
    setIsAuthenticated(isPrivateAccessOpen());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const page = getSeoPageBySlug(pageId);
    if (!page) {
      setPageData(null);
      setIsLoading(false);
      return;
    }

    setPageData(page);
    setFormData({
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      keywords: page.keywords,
      canonicalUrl: page.canonicalUrl,
      ogTitle: page.ogTitle,
      ogDescription: page.ogDescription,
      ogImage: page.ogImage,
      ogImageAlt: page.ogImageAlt,
      twitterTitle: page.twitterTitle,
      twitterDescription: page.twitterDescription,
      twitterImage: page.twitterImage,
      robots_index: page.robots_index,
      robots_follow: page.robots_follow,
      robots_noarchive: page.robots_noarchive,
      robots_nosnippet: page.robots_nosnippet,
    });
    setIsLoading(false);
  }, [isAuthenticated, pageId]);

  const titleLength = formData.metaTitle.length;
  const descriptionLength = formData.metaDescription.length;

  const previewTitle = formData.ogTitle || formData.metaTitle || "Titre non defini";
  const previewDescription =
    formData.ogDescription || formData.metaDescription || "Description non definie";
  const previewImage = toAbsoluteImage(
    formData.ogImage || pageData?.ogImage || siteConfig.openGraph.images.default,
  );

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validatePrivateAccessCredentials(loginEmail, loginPassword)) {
      toast({
        title: "Acces refuse",
        description: "Email ou mot de passe incorrect.",
        variant: "destructive",
      });
      return;
    }

    openPrivateAccess(loginEmail);
    setIsAuthenticated(true);
    setLoginPassword("");
    setIsLoading(true);
    toast({
      title: "Connexion reussie",
      description: "Acces editeur SEO autorise.",
    });
  };

  const handleLogout = () => {
    closePrivateAccess();
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
    navigate("/acces-prive/seo");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pageData) {
      return;
    }

    setIsSaving(true);
    const updatedPage = updateSeoPage(
      pageData.slug,
      {
        ...formData,
        twitterTitle: formData.ogTitle || formData.metaTitle,
        twitterDescription: formData.ogDescription || formData.metaDescription,
        twitterImage: formData.ogImage,
      },
      getPrivateAccessUserEmail(),
    );
    setIsSaving(false);

    if (!updatedPage) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la configuration SEO.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "SEO mis a jour",
      description: "Les metadonnees ont bien ete enregistrees.",
    });
    navigate("/acces-prive/seo");
  };

  const seoPreview = useMemo(() => {
    if (!pageData) {
      return "https://proxizenbtp.fr/";
    }
    return formData.canonicalUrl || `${siteConfig.url}${pageData.path}`;
  }, [formData.canonicalUrl, pageData]);

  return (
    <Layout>
      <SEO title="Edition SEO - ProxiZen BTP" noindex />
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          {!isAuthenticated ? (
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle>Connexion securisee</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="private-seo-edit-email">Email autorise</Label>
                    <Input
                      id="private-seo-edit-email"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.target.value)}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="private-seo-edit-password">Mot de passe</Label>
                    <Input
                      id="private-seo-edit-password"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      placeholder="Mot de passe"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Ouvrir l'editeur SEO
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : isLoading ? (
            <p className="text-muted-foreground">Chargement...</p>
          ) : !pageData ? (
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-lg font-semibold">Page SEO introuvable.</p>
                <Button asChild>
                  <a href="/acces-prive/seo">Retour a la gestion SEO</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-heading font-bold">Edition SEO</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Page: {pageData.path}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => navigate("/acces-prive/seo")}>
                    Annuler
                  </Button>
                  <Button type="button" variant="ghost" onClick={handleLogout}>
                    Se deconnecter
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Enregistrement..." : "Sauvegarder"}
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="seo" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="seo">SEO de base</TabsTrigger>
                  <TabsTrigger value="social">Open Graph</TabsTrigger>
                  <TabsTrigger value="advanced">Parametres avances</TabsTrigger>
                  <TabsTrigger value="preview">Apercu</TabsTrigger>
                </TabsList>

                <TabsContent value="seo" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Metadonnees SEO</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="metaTitle">Titre SEO *</Label>
                        <Input
                          id="metaTitle"
                          maxLength={60}
                          required
                          value={formData.metaTitle}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              metaTitle: event.target.value,
                            }))
                          }
                        />
                        <p
                          className={`text-xs mt-1 ${
                            titleLength > 60
                              ? "text-destructive"
                              : titleLength >= 50
                                ? "text-green-600"
                                : "text-muted-foreground"
                          }`}
                        >
                          {titleLength}/60 caracteres
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="metaDescription">Meta description *</Label>
                        <Textarea
                          id="metaDescription"
                          rows={3}
                          maxLength={160}
                          required
                          value={formData.metaDescription}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              metaDescription: event.target.value,
                            }))
                          }
                        />
                        <p
                          className={`text-xs mt-1 ${
                            descriptionLength > 160
                              ? "text-destructive"
                              : descriptionLength >= 150
                                ? "text-green-600"
                                : "text-muted-foreground"
                          }`}
                        >
                          {descriptionLength}/160 caracteres
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="keywords">Mots-cles</Label>
                        <Input
                          id="keywords"
                          value={formData.keywords}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              keywords: event.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="canonicalUrl">URL canonique</Label>
                        <Input
                          id="canonicalUrl"
                          value={formData.canonicalUrl}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              canonicalUrl: event.target.value,
                            }))
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Open Graph</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="ogTitle">Titre Open Graph</Label>
                        <Input
                          id="ogTitle"
                          value={formData.ogTitle}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              ogTitle: event.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="ogDescription">Description Open Graph</Label>
                        <Textarea
                          id="ogDescription"
                          rows={3}
                          value={formData.ogDescription}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              ogDescription: event.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="ogImage">Image Open Graph (URL)</Label>
                        <Input
                          id="ogImage"
                          value={formData.ogImage}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              ogImage: event.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="ogImageAlt">Texte alternatif image OG</Label>
                        <Input
                          id="ogImageAlt"
                          value={formData.ogImageAlt}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              ogImageAlt: event.target.value,
                            }))
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Parametres d'indexation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <Label htmlFor="robots-index">Indexer cette page</Label>
                          <p className="text-xs text-muted-foreground">
                            Autoriser l'indexation Google
                          </p>
                        </div>
                        <Switch
                          id="robots-index"
                          checked={formData.robots_index}
                          onCheckedChange={(checked) =>
                            setFormData((current) => ({
                              ...current,
                              robots_index: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <Label htmlFor="robots-follow">Suivre les liens</Label>
                          <p className="text-xs text-muted-foreground">
                            Autoriser l'exploration des liens
                          </p>
                        </div>
                        <Switch
                          id="robots-follow"
                          checked={formData.robots_follow}
                          onCheckedChange={(checked) =>
                            setFormData((current) => ({
                              ...current,
                              robots_follow: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <Label htmlFor="robots-noarchive">Noarchive</Label>
                          <p className="text-xs text-muted-foreground">
                            Empacher le cache archive des moteurs
                          </p>
                        </div>
                        <Switch
                          id="robots-noarchive"
                          checked={formData.robots_noarchive}
                          onCheckedChange={(checked) =>
                            setFormData((current) => ({
                              ...current,
                              robots_noarchive: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <Label htmlFor="robots-nosnippet">Nosnippet</Label>
                          <p className="text-xs text-muted-foreground">
                            Cacher les extraits dans les resultats
                          </p>
                        </div>
                        <Switch
                          id="robots-nosnippet"
                          checked={formData.robots_nosnippet}
                          onCheckedChange={(checked) =>
                            setFormData((current) => ({
                              ...current,
                              robots_nosnippet: checked,
                            }))
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Apercu Google</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg p-4 bg-white text-black">
                        <p className="text-sm text-green-700">{seoPreview}</p>
                        <h3 className="text-xl text-blue-700">{previewTitle}</h3>
                        <p className="text-sm text-gray-700 mt-1">{previewDescription}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Apercu reseaux sociaux</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg overflow-hidden max-w-lg bg-white">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Apercu reseaux sociaux"
                            className="w-full h-60 object-cover"
                          />
                        ) : null}
                        <div className="p-4">
                          <p className="text-xs text-gray-500 uppercase">{siteConfig.domain}</p>
                          <h4 className="font-semibold text-gray-900 mt-1">{previewTitle}</h4>
                          <p className="text-sm text-gray-600 mt-1">{previewDescription}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AccesPriveSeoEditor;
