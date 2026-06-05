import { Link } from "react-router-dom";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { trackCalendlyClick } from "@/lib/site-insights";

const Footer = () => {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-heading font-extrabold mb-4">
              ProxiZen <span className="text-accent">BTP</span>
            </h3>
            <p className="text-background/60 text-sm leading-relaxed max-w-xs">
              Accompagnement administratif dédié aux artisans et entreprises du
              bâtiment : devis, factures, relances, kits Excel BTP et
              préparation à la facturation électronique.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-5 text-sm uppercase tracking-widest text-background/50">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Accueil", path: "/" },
                { label: "Accompagnement", path: "/accompagnement" },
                { label: "Offres", path: "/offres" },
                { label: "Kits BTP", path: "/kits" },
                { label: "À propos", path: "/a-propos" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-background/50 hover:text-background transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-5 text-sm uppercase tracking-widest text-background/50">
              Contact
            </h4>
            <p className="text-sm text-background/60 mb-4">
              Besoin d'un accompagnement administratif ?
            </p>
            <a
              href={settings.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackCalendlyClick("footer")}
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Prendre RDV →
            </a>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-xs text-background/40 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span>© {new Date().getFullYear()} ProxiZen BTP. Tous droits réservés.</span>
          <span>Created by Becc&apos;s Studio</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
