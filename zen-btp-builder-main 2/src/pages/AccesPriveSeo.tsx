import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  getSeoPages,
  SEO_UPDATED_EVENT_NAME,
  SEOPageData,
} from "@/lib/seo-storage";
import {
  closePrivateAccess,
  isPrivateAccessOpen,
  openPrivateAccess,
  validatePrivateAccessCredentials,
} from "@/lib/private-access";

const AccesPriveSeo = () => {
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pages, setPages] = useState<SEOPageData[]>([]);

  const refreshPages = () => {
    setPages(getSeoPages());
  };

  useEffect(() => {
    setIsAuthenticated(isPrivateAccessOpen());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    refreshPages();
    const syncPages = () => refreshPages();
    window.addEventListener(SEO_UPDATED_EVENT_NAME, syncPages);
    window.addEventListener("storage", syncPages);
    return () => {
      window.removeEventListener(SEO_UPDATED_EVENT_NAME, syncPages);
      window.removeEventListener("storage", syncPages);
    };
  }, [isAuthenticated]);

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
    toast({
      title: "Connexion reussie",
      description: "Bienvenue dans la gestion SEO.",
    });
  };

  const handleLogout = () => {
    closePrivateAccess();
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <Layout>
      <SEO
        title="Gestion SEO - ProxizenBTP"
        description="Administration SEO privee de ProxizenBTP."
        noindex
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Gestion SEO
          </h1>
          <p className="text-muted-foreground mb-10">
            Gerez les metadonnees Google et Open Graph de chaque page.
          </p>

          {!isAuthenticated ? (
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle>Connexion securisee</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="private-seo-email">Email autorise</Label>
                    <Input
                      id="private-seo-email"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.target.value)}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="private-seo-password">Mot de passe</Label>
                    <Input
                      id="private-seo-password"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      placeholder="Mot de passe"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Ouvrir la gestion SEO
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="ghost" onClick={handleLogout}>
                  Se deconnecter
                </Button>
                <Button asChild className="ml-auto">
                  <Link to="/acces-prive">Retour au dashboard prive</Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {pages.map((page) => (
                  <Card key={page.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex flex-col md:flex-row gap-4 md:items-start md:justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{page.metaTitle}</h3>
                          {!page.robots_index ? (
                            <Badge variant="destructive">Non indexee</Badge>
                          ) : null}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">URL:</span> {page.path}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Derniere modif:</span>{" "}
                          {new Date(page.updatedAt).toLocaleDateString("fr-FR")} par{" "}
                          {page.updatedBy || "inconnu"}
                        </p>
                      </div>
                      <Button asChild variant="outline">
                        <Link to={`/acces-prive/seo/${page.slug}`}>Editer</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AccesPriveSeo;
