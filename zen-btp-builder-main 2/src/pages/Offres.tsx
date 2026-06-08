import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
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
    title: "ESSENTIELLE",
    subtitle: "Pour artisans et petites structures BTP",
    price: "À partir de 550 EUR / mois",
    services: [
      "Devis et facturation",
      "Organisation et classement administratif",
      "Transmission des pièces au cabinet comptable",
      "Relances clients simples",
      "Pré-comptabilité",
      "Préparation des informations utiles à la facturation électronique",
    ],
    benefit: "Avantage: Un dossier carré chaque mois sans y passer vos soirées",
    highlight: false,
    cta: "Voir l’offre Essentielle",
  },
  {
    title: "CONFORT (Recommandée)",
    subtitle:
      "Offre recommandée pour un suivi fluide avec le cabinet comptable",
    price: "À partir de 650 EUR / mois",
    services: [
      "Offre Essentielle incluse",
      "Centralisation complète des pièces comptables",
      "Interface administrative avec le cabinet comptable",
      "Rappels d’échéances administratives",
      "Tableaux de suivi administratif",
      "Organisation clients/fournisseurs pour anticiper la facturation électronique",
    ],
    benefit: "Avantage: Un fonctionnement fluide avec votre cabinet comptable",
    highlight: true,
    cta: "Voir l’offre Confort",
  },
  {
    title: "PREMIUM",
    subtitle:
      "Cette offre s’adresse aux TPE/PME du BTP ayant un volume administratif important ou qui souhaite un suivi renforcé.",
    price: "À partir de 950 EUR / mois",
    services: [
      "Offre Confort incluse",
      "Suivi administratif renforcé",
      "Coordination administrative avancée",
      "Transmission prioritaire des documents",
      "Forte réactivité",
    ],
    benefit:
      "Avantages : Optimisez votre croissance et déléguez tout le « poids » administratif pour vous concentrer sur vos chantiers.",
    highlight: false,
    cta: "Voir l’offre Premium",
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
              Chaque entreprise ayant des besoins différents, nos
              accompagnements sont personnalisés, avec une offre mensuelle à
              partir de 550 EUR selon le niveau de suivi souhaité.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {offers.map((offer) => (
              <motion.div
                key={offer.title}
                className={`relative p-6 rounded-2xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${
                  offer.highlight
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 border-2 border-primary"
                    : "bg-card border border-border/60 hover:shadow-lg hover:border-primary/30"
                }`}
                variants={fadeUp}
              >
                {offer.highlight ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider">
                    <Star size={12} fill="currentColor" />
                    Recommandée
                  </span>
                ) : null}
                <h3
                  className={`text-xl font-heading font-extrabold mb-2 ${
                    offer.highlight ? "" : "text-primary"
                  }`}
                >
                  {offer.title}
                </h3>
                <p
                  className={`text-xs md:text-sm mb-4 leading-relaxed ${
                    offer.highlight
                      ? "text-primary-foreground/85"
                      : "text-muted-foreground"
                  }`}
                >
                  {offer.subtitle}
                </p>
                <p
                  className={`font-heading font-extrabold text-lg mb-5 ${
                    offer.highlight ? "text-secondary" : "text-foreground"
                  }`}
                >
                  {offer.price}
                </p>
                <ul className="space-y-2 mb-4">
                  {offer.services.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs md:text-sm"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          offer.highlight ? "bg-accent/30" : "bg-primary/10"
                        }`}
                      >
                        <Check
                          className={
                            offer.highlight
                              ? "text-accent-foreground"
                              : "text-primary"
                          }
                          size={12}
                        />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className={`text-xs md:text-sm leading-relaxed ${
                    offer.highlight
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {offer.benefit}
                </p>

                <div className="mt-auto pt-5">
                  <Button
                    asChild
                    variant={offer.highlight ? "secondary" : "outline"}
                    className="w-full h-auto min-h-10 whitespace-normal text-center leading-snug px-3 py-2"
                  >
                    <Link to="/contact">
                      {offer.cta}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 p-7 rounded-2xl bg-card border border-border/60 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-xl font-heading font-bold mb-3">
              Mission à la carte
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tri, classement et mise à jour d'une comptabilité en retard
              (plusieurs mois).
            </p>
            <p className="text-sm font-medium mt-3">
              Avantage : Une intervention ponctuelle pour repartir sur des bases
              saines
            </p>
          </motion.div>

          <motion.div
            className="mt-8 p-5 md:p-6 rounded-2xl bg-background border border-border/60 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="font-heading font-bold text-foreground mb-3">
              Note tarifaire :
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Les accompagnements mensuels démarrent à 550 EUR / mois pour
              l’offre Essentielle et sont ajustés selon le volume de factures,
              la taille de l’entreprise, les relances, la préparation à la
              facturation électronique et la complexité administrative.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              L’offre Confort démarre à 650 EUR / mois. Une gestion
              administrative plus complète peut être proposée à partir de 950
              EUR / mois selon le niveau de suivi souhaité. Un devis
              personnalisé est établi après un premier échange.
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
