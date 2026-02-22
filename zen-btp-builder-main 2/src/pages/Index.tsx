import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileText,
  FolderOpen,
  Calculator,
  Users,
  ClipboardList,
  Clock,
  Shield,
  Heart,
  HardHat,
  Building2,
  Wrench,
  ArrowRight,
  ChevronRight,
  Handshake,
  Star,
} from "lucide-react";
import Layout from "@/components/Layout";
import SectionCTA from "@/components/SectionCTA";
import heroBtp from "@/assets/hero-btp.jpg";
import { useRef } from "react";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { trackCalendlyClick } from "@/lib/site-insights";
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

const problemPoints = [
  "Vous êtes artisan ou dirigeant dans le BTP.",
  "Votre priorité, ce sont les chantiers, les clients et les délais.",
  "Pourtant, l’administratif s’accumule : devis en retard, factures à suivre, documents à classer, échanges à gérer.",
  "Résultat : charge mentale, perte de temps et stress inutile.",
];

const solutionHighlights = [
  "Vous gardez le contrôle.",
  "Je m’occupe du suivi.",
  "Un cadre fiable, sans pression, pensé pour votre réalité terrain.",
];

const services = [
  { icon: FileText, label: "Devis et facturation" },
  { icon: ClipboardList, label: "Suivi administratif régulier" },
  { icon: FolderOpen, label: "Organisation et classement des documents" },
  { icon: Users, label: "Relances clients" },
  { icon: Calculator, label: "Interface avec le cabinet comptable" },
];

const offersPreview = [
  {
    title: "Essentielle",
    desc: "Pour artisans et petites structures BTP",
    accent: false,
  },
  {
    title: "Confort",
    desc: "Offre recommandée pour un suivi fluide avec le cabinet comptable",
    accent: true,
  },
  {
    title: "Premium",
    desc: "Pour les TPE/PME du BTP ayant un volume administratif important",
    accent: false,
  },
];

const audiences = [
  {
    icon: HardHat,
    label:
      "Artisans du BTP (peinture, plomberie, électricité, second œuvre…)",
  },
  { icon: Building2, label: "TPE et PME du bâtiment" },
  {
    icon: Wrench,
    label:
      "Cabinets comptables recherchant un partenaire administratif fiable pour leurs clients",
  },
];

const values = [
  { icon: Shield, label: "Spécialisation BTP" },
  { icon: Heart, label: "Compréhension concrète du terrain" },
  { icon: ClipboardList, label: "Méthode structurée et fiable" },
  { icon: Users, label: "Accompagnement personnalisé" },
  { icon: Handshake, label: "Relation de confiance" },
];

const Index = () => {
  const heroRef = useRef(null);
  const { settings } = useSiteSettings();
  const heroImageSrc = settings.heroImageUrl || heroBtp;
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>
      <SEO pageId="home" />
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[90vh] flex items-center"
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src={heroImageSrc}
            alt="Chantier BTP professionnel"
            className="w-full h-full object-cover scale-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/85 via-primary/75 to-primary/50" />
        </motion.div>
        <div className="container relative z-10 py-24 md:py-36">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity: heroOpacity }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6 border border-accent/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Pour artisans, TPE/PME et cabinets comptables
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-[1.1] mb-4">
              Assistante administrative spécialisée BTP
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-heading font-bold mb-4">
              Moins de stress. Plus de clarté.
            </p>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-2xl">
              Votre métier est sur le terrain. L’administratif ne doit plus être
              un frein.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-base px-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25"
              >
                <a
                  href={settings.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackCalendlyClick("hero-primary")}
                >
                  Parlons de votre situation
                  <ArrowRight className="ml-2" size={18} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-base px-8 text-primary-foreground hover:bg-primary-foreground/10 border border-primary-foreground/20"
              >
                <Link to="/accompagnement">
                  Contactez-moi pour en discuter simplement.
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 80L1440 80L1440 30C1440 30 1200 0 720 0C240 0 0 30 0 30L0 80Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-balance">
              Vous êtes artisan ou dirigeant dans le BTP.
            </h2>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-3 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {problemPoints.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60 hover:border-destructive/30 hover:shadow-md transition-all duration-300 group"
                variants={fadeUp}
              >
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 group-hover:bg-destructive/15 transition-colors">
                  <Clock className="text-destructive" size={18} />
                </div>
                <span className="font-medium">{item}</span>
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
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-balance">
              La solution ProxyZen BTP
            </h2>
          </motion.div>

          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div
              className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-7 md:p-9 shadow-sm"
              variants={fadeUp}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-primary/15 text-primary mb-5">
                <Star size={14} />
                Accompagnement clair
              </span>
              <p className="text-base md:text-lg leading-relaxed text-foreground">
                ProxyZen BTP vous accompagne dans la gestion de votre
                administratif de façon claire, structurée et régulière.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={stagger}
            >
              {solutionHighlights.map((line, i) => (
                <motion.div
                  key={line}
                  className={`rounded-2xl border border-border/60 bg-background p-5 shadow-sm ${
                    i === 2 ? "sm:col-span-2" : ""
                  }`}
                  variants={scaleIn}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <ChevronRight size={16} />
                    </div>
                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              Ce que je prends en charge
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {services.map((service) => (
              <motion.div
                key={service.label}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                variants={scaleIn}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-primary" size={26} />
                </div>
                <span className="font-heading font-bold text-sm leading-relaxed">
                  {service.label}
                </span>
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
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Formules
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Nos offres
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Chaque entreprise ayant des besoins différents, nos
              accompagnements sont personnalisés, sans forfait unique imposé.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {offersPreview.map((offer) => (
              <motion.div
                key={offer.title}
                className={`relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  offer.accent
                    ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/20"
                    : "bg-background border-border/60 hover:border-primary/30 hover:shadow-md"
                }`}
                variants={scaleIn}
              >
                {offer.accent ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider">
                    Recommandée
                  </span>
                ) : null}
                <h3
                  className={`text-xl font-heading font-extrabold mb-3 ${
                    offer.accent ? "" : "text-primary"
                  }`}
                >
                  {offer.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-7 ${
                    offer.accent
                      ? "text-primary-foreground/85"
                      : "text-muted-foreground"
                  }`}
                >
                  {offer.desc}
                </p>
                <Button
                  asChild
                  variant={offer.accent ? "secondary" : "outline"}
                  className="w-full"
                >
                  <Link to="/offres">
                    Voir les offres
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              À qui s’adresse ProxyZen BTP ?
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {audiences.map((audience) => (
              <motion.div
                key={audience.label}
                className="flex flex-col items-center text-center group p-7 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                variants={scaleIn}
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <audience.icon className="text-primary" size={32} />
                </div>
                <span className="font-heading font-bold text-sm leading-relaxed">
                  {audience.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              Pourquoi choisir ProxyZen BTP ?
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {values.map((value) => (
              <motion.div
                key={value.label}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                variants={scaleIn}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="text-primary" size={26} />
                </div>
                <span className="font-heading font-bold text-sm leading-relaxed">
                  {value.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionCTA
        title="Parlons de votre situation"
        description={`Chaque entreprise est différente.
Un échange permet de comprendre vos besoins et de vous proposer une solution adaptée.`}
        buttonText="Contactez-moi pour en discuter simplement."
        href={settings.calendlyUrl}
      />
    </Layout>
  );
};

export default Index;
