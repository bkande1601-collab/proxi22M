import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const needsArtisan = [
  "Devis et factures clairs et conformes",
  "Administratif structuré et organisé",
  "Moins de stress et moins d’oublis",
  "Gain de temps sur les chantiers",
  "Meilleure relation avec votre cabinet comptable",
];

const needsCabinet = [
  "Dossiers clients organisés",
  "Pièces transmises à temps",
  "Moins de relances et d’allers-retours",
  "Aucun empiètement sur vos missions comptables, fiscales ou sociales",
  "Un partenaire administratif fiable pour vos clients BTP",
];

const processSteps = [
  "Premier échange téléphonique (gratuit)",
  "Analyse de votre organisation et de vos besoins",
  "Proposition d’un accompagnement adapté",
  "Mise en place et suivi régulier",
];

const simplifiedFlow = [
  "Artisan / Entreprise BTP",
  "ProxizenBTP – Assistance administrative",
  "Cabinet comptable – Comptabilité, fiscalité, social",
];

const offers = [
  {
    title: "ESSENTIELLE",
    subtitle: "Pour artisans et petites structures BTP",
    services: [
      "Devis et facturation",
      "Organisation et classement administratif",
      "Transmission des pièces au cabinet comptable",
      "Relances clients simples",
      "Pré-comptabilité",
    ],
    benefit: "Avantage: Un dossier carré chaque mois sans y passer vos soirées",
    cta: "Voir l’offre Essentielle",
  },
  {
    title: "CONFORT (Recommandée)",
    subtitle:
      "Offre recommandée pour un suivi fluide avec le cabinet comptable",
    services: [
      "Offre Essentielle incluse",
      "Centralisation complète des pièces comptables",
      "Interface administrative avec le cabinet comptable",
      "Rappels d’échéances administratives",
      "Tableaux de suivi administratif",
    ],
    benefit: "Avantage: Un fonctionnement fluide avec votre cabinet comptable",
    cta: "Voir l’offre Confort",
  },
  {
    title: "PREMIUM",
    subtitle:
      "Cette offre s’adresse aux TPE/PME du BTP ayant un volume administratif important ou qui souhaite un suivi renforcé.",
    services: [
      "Offre Confort incluse",
      "Suivi administratif renforcé",
      "Coordination administrative avancée",
      "Transmission prioritaire des documents",
      "Forte réactivité",
    ],
    benefit:
      "Avantages : Optimisez votre croissance et déléguez tout le « poids » administratif pour vous concentrer sur vos chantiers.",
    cta: "Voir l’offre Premium",
  },
];

const Accompagnement = () => {
  return (
    <Layout>
      <SEO pageId="accompagnement" />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground section-padding">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-4 leading-tight">
              Assistance administrative indépendante spécialisée BTP
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-secondary font-heading font-bold mb-6">
              Île-de-France
            </p>
            <p className="text-base sm:text-lg text-primary-foreground/85 leading-relaxed max-w-3xl mx-auto">
              Artisans du BTP, dirigeants de TPE/PME,
            </p>
            <p className="text-base sm:text-lg text-primary-foreground/85 leading-relaxed max-w-3xl mx-auto mt-3">
              L’administratif vous prend trop de temps et complique la relation
              avec votre cabinet comptable ? ProxizenBTP vous accompagne dans
              l’organisation et la gestion administrative de votre entreprise,
              afin de vous permettre de vous concentrer sur votre cœur de métier,
              en toute sérénité.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold">
              UNE SOLUTION POUR DEUX BESOINS
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              className="p-7 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              variants={scaleIn}
            >
              <h3 className="text-xl font-heading font-bold mb-4">
                Vous êtes artisan ou dirigeant BTP
              </h3>
              <ul className="space-y-3">
                {needsArtisan.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2
                      className="text-primary mt-0.5 shrink-0"
                      size={18}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="p-7 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              variants={scaleIn}
            >
              <h3 className="text-xl font-heading font-bold mb-4">
                Vous êtes cabinet comptable
              </h3>
              <ul className="space-y-3">
                {needsCabinet.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2
                      className="text-primary mt-0.5 shrink-0"
                      size={18}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold">
              FONCTIONNEMENT SIMPLIFIÉ
            </h2>
          </motion.div>
          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-2">
              {simplifiedFlow.map((line, index) => (
                <div
                  key={line}
                  className="flex flex-col md:flex-row items-center md:flex-1 md:min-w-0 gap-2"
                >
                  <motion.div
                    className="w-full p-4 sm:p-5 rounded-2xl bg-background border border-border/60 font-medium text-sm sm:text-base text-center shadow-sm hover:shadow-md transition-shadow"
                    variants={scaleIn}
                  >
                    {line}
                  </motion.div>
                  {index < simplifiedFlow.length - 1 ? (
                    <>
                      <ArrowRight
                        className="hidden md:block text-primary shrink-0"
                        size={18}
                      />
                      <ArrowDown
                        className="md:hidden text-primary shrink-0 mx-auto"
                        size={18}
                      />
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold">
              Comment se déroule l’accompagnement ?
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={step}
                className="flex items-start gap-4 sm:gap-5 p-5 sm:p-7 rounded-2xl bg-card border border-border/60 hover:shadow-md transition-all duration-300"
                variants={fadeUp}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 text-primary-foreground font-heading font-extrabold text-lg shadow-lg shadow-primary/20">
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold">
              NOS OFFRES
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed text-sm">
              Chaque entreprise ayant des besoins différents, nos accompagnements
              sont personnalisés, sans forfait unique imposé.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col h-full ${
                  index === 1
                    ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/20"
                    : "bg-background border-border/60 hover:border-primary/30 hover:shadow-md"
                }`}
                variants={scaleIn}
              >
                <h3
                  className={`text-lg font-heading font-extrabold mb-2 ${
                    index === 1 ? "" : "text-primary"
                  }`}
                >
                  {offer.title}
                </h3>
                <p
                  className={`text-xs md:text-sm leading-relaxed mb-4 ${
                    index === 1
                      ? "text-primary-foreground/85"
                      : "text-muted-foreground"
                  }`}
                >
                  {offer.subtitle}
                </p>
                <ul className="space-y-2 mb-4">
                  {offer.services.map((item) => (
                    <li
                      key={item}
                      className={`text-xs md:text-sm flex items-start gap-2 ${
                        index === 1
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      <span className="mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className={`text-xs md:text-sm leading-relaxed ${
                    index === 1
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {offer.benefit}
                </p>
                <div className="mt-auto pt-5">
                  <Button
                    asChild
                    className="w-full h-auto min-h-10 whitespace-normal text-center leading-snug text-xs sm:text-sm px-3 py-2"
                    variant={index === 1 ? "secondary" : "default"}
                  >
                    <Link to="/offres">
                      {offer.cta}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-6 p-7 rounded-2xl bg-background border border-border/60"
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
              Les tarifs sont ajustables selon le volume de factures, la taille
              de l’entreprise et la complexité administrative.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Un devis personnalisé est établi après un premier échange.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <motion.div
            className="p-8 md:p-10 rounded-3xl bg-card border border-border/60"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">
              Cadre d’intervention
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              ProxizenBTP intervient exclusivement en assistance administrative.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Les missions comptables, fiscales et sociales sont réalisées par le
              cabinet comptable.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Accompagnement;
