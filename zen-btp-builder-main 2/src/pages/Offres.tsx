import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  ClipboardCheck,
  Crown,
  Info,
  Star,
} from "lucide-react";
import Layout from "@/components/Layout";
import SectionCTA from "@/components/SectionCTA";
import SEO from "@/components/SEO";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const offers = [
  {
    title: "Essentiel",
    subtitle: "L’essentiel pour une gestion administrative efficace",
    price: "600 €",
    services: [
      "Création et suivi des devis",
      "Émission des factures",
      "Classement et archivage des documents",
      "Préparation comptable : transmission et préparation des pièces pour votre comptable",
      "Suivi administratif de base (clients, fournisseurs)",
    ],
    benefit:
      "Idéal pour démarrer et gagner du temps sur votre administratif quotidien.",
    highlight: false,
    icon: ClipboardCheck,
  },
  {
    title: "Confort",
    subtitle: "Pour une gestion complète et un meilleur suivi",
    price: "750 €",
    services: [
      "Tout le forfait Essentiel",
      "Suivi des règlements et relances clients",
      "Tableau de suivi des devis et factures",
      "Relances devis (en attente / refusés)",
      "Suivi des échéances et acomptes",
      "Gestion des cartes BTP",
      "Dossiers de sous-traitance",
      "Rédaction et suivi des PPSPS",
    ],
    benefit:
      "Le juste milieu pour une gestion sereine et professionnelle de votre entreprise.",
    highlight: true,
    icon: ChartNoAxesCombined,
  },
  {
    title: "Premium",
    subtitle: "L’accompagnement premium pour une gestion déléguée à 100 %",
    price: "850 €",
    services: [
      "Tout le forfait Confort",
      "Prise en charge complète de la plateforme de facturation électronique (abonnement et gestion inclus)",
      "Veille et conformité réglementaire (facturation électronique, obligations…)",
      "Gestion administrative avancée (contrats, documents chantier, etc.)",
      "Reporting mensuel personnalisé (chiffre d’affaires, encours, relances…)",
      "Priorité et disponibilité renforcée",
    ],
    benefit:
      "La tranquillité d’esprit totale : nous gérons votre administratif comme si c’était le nôtre.",
    highlight: false,
    icon: Crown,
  },
];

const Offres = () => {
  return (
    <Layout>
      <SEO pageId="offres" />
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground section-padding">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary-foreground/20 blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-sm font-medium mb-6 border border-primary-foreground/20">
              NOS OFFRES
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-4 leading-tight">
              Des offres adaptées à votre organisation administrative
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/85 max-w-3xl mx-auto leading-relaxed">
              Trois niveaux d’accompagnement pensés pour les entreprises du BTP,
              du soutien essentiel à une gestion administrative entièrement
              déléguée.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 max-w-7xl mx-auto items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {offers.map((offer, index) => {
              const Icon = offer.icon;

              return (
                <motion.article
                  key={offer.title}
                  className={`group relative overflow-hidden p-6 lg:p-7 rounded-[1.75rem] flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${
                    offer.highlight
                      ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 border-2 border-primary md:-translate-y-3"
                      : "bg-card border border-border/70 shadow-sm hover:shadow-xl hover:border-primary/30"
                  }`}
                  variants={fadeUp}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${
                      offer.highlight ? "bg-secondary" : "bg-primary/70"
                    }`}
                  />

                  {offer.highlight ? (
                    <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <Star size={11} fill="currentColor" />
                      Recommandée
                    </span>
                  ) : null}

                  <div className="flex items-center justify-between mb-6 pr-24">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                        offer.highlight
                          ? "bg-primary-foreground/12 border border-primary-foreground/15"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon size={24} strokeWidth={1.8} />
                    </div>
                    <span
                      className={`font-heading text-xs font-bold tracking-[0.2em] ${
                        offer.highlight
                          ? "text-primary-foreground/45"
                          : "text-muted-foreground/55"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] font-bold uppercase tracking-[0.18em] mb-1.5 ${
                      offer.highlight
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Forfait
                  </p>
                  <h2
                    className={`text-2xl lg:text-3xl font-heading font-extrabold mb-3 ${
                      offer.highlight ? "" : "text-primary"
                    }`}
                  >
                    {offer.title}
                  </h2>
                  <p
                    className={`text-sm min-h-[3.5rem] leading-relaxed ${
                      offer.highlight
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {offer.subtitle}
                  </p>

                  <div
                    className={`my-6 py-5 border-y ${
                      offer.highlight
                        ? "border-primary-foreground/15"
                        : "border-border/70"
                    }`}
                  >
                    <p
                      className={`text-xs font-medium mb-1 ${
                        offer.highlight
                          ? "text-primary-foreground/65"
                          : "text-muted-foreground"
                      }`}
                    >
                      À partir de
                    </p>
                    <div className="flex items-end gap-2">
                      <span
                        className={`font-heading text-4xl lg:text-5xl font-extrabold leading-none ${
                          offer.highlight ? "text-secondary" : "text-foreground"
                        }`}
                      >
                        {offer.price}
                      </span>
                      <span
                        className={`text-sm pb-1 ${
                          offer.highlight
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        / mois
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6" aria-label={`Services du forfait ${offer.title}`}>
                    {offer.services.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs lg:text-sm leading-relaxed"
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            offer.highlight
                              ? "bg-primary-foreground/15"
                              : "bg-primary/10"
                          }`}
                        >
                          <Check
                            className={
                              offer.highlight ? "text-secondary" : "text-primary"
                            }
                            size={12}
                            strokeWidth={3}
                          />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-auto rounded-2xl p-4 text-xs lg:text-sm leading-relaxed ${
                      offer.highlight
                        ? "bg-primary-foreground/10 border border-primary-foreground/10"
                        : "bg-secondary/45 border border-border/40"
                    }`}
                  >
                    <p className="font-medium">{offer.benefit}</p>
                  </div>

                  <div className="pt-5">
                    <Button
                      asChild
                      variant={offer.highlight ? "secondary" : "outline"}
                      className="w-full h-11 group/button"
                    >
                      <Link to="/contact">
                        Découvrir le forfait {offer.title}
                        <ArrowRight
                          size={16}
                          className="ml-2 transition-transform group-hover/button:translate-x-1"
                        />
                      </Link>
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-10 max-w-5xl mx-auto flex items-start gap-3.5 p-4 md:p-5 rounded-2xl bg-secondary/45 border border-border/60"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="w-9 h-9 rounded-full bg-card text-primary flex items-center justify-center shrink-0 shadow-sm">
              <Info size={18} />
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed pt-1.5">
              Tarifs indicatifs. Le prix définitif dépend du volume de devis,
              factures et tâches administratives à traiter.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 p-7 rounded-2xl bg-card border border-border/60 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-xl font-heading font-bold mb-3">
              Mission à la carte
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tri, classement et mise à jour d’une comptabilité en retard
              (plusieurs mois).
            </p>
            <p className="text-sm font-medium mt-3">
              Avantage : une intervention ponctuelle pour repartir sur des bases
              saines.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionCTA
        title="Parlons de votre organisation administrative"
        buttonText="Demander un devis personnalisé"
      />
    </Layout>
  );
};

export default Offres;
