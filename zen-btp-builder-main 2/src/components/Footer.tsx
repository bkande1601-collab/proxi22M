import { Link } from "react-router-dom";

const Footer = () => {
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
              bâtiment. Simplifiez votre gestion, concentrez-vous sur votre
              métier.
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
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Planifier un échange gratuit →
            </Link>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-xs text-background/40">
          © {new Date().getFullYear()} ProxiZen BTP. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
