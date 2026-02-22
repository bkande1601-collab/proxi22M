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
  Briefcase,
  HardHat,
  Building2,
  Wrench,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";
import SectionCTA from "@/components/SectionCTA";
import heroBtp from "@/assets/hero-btp.jpg";
import { useRef } from "react";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const problems = [
  "Facturation en retard",
  "Documents mal classés",
  "Communication compliquée avec le comptable",
  "Organisation administrative floue",
  "Stress lié à la gestion quotidienne",
];

const solutions = [
  { icon: FolderOpen, label: "Organisation administrative", desc: "Structuration et classement de vos documents" },
  { icon: Calculator, label: "Pré-comptabilité", desc: "Préparation des éléments pour votre comptable" },
  { icon: ClipboardList, label: "Suivi administratif", desc: "Gestion quotidienne de votre administratif" },
  { icon: Users, label: "Relation comptable", desc: "Coordination avec votre cabinet comptable" },
  { icon: FileText, label: "Devis & facturation", desc: "Création et suivi de vos devis et factures" },
];

const offers = [
  {
    title: "Essentielle",
    desc: "Accompagnement administratif de base pour structurer votre activité.",
    accent: false,
  },
  {
    title: "Confort",
    desc: "Gestion administrative complète avec suivi régulier et relation comptable optimisée.",
    accent: true,
  },
  {
    title: "Premium",
    desc: "Accompagnement global renforcé pour une optimisation administrative complète.",
    accent: false,
  },
];

const audiences = [
  { icon: HardHat, label: "Artisans BTP" },
  { icon: Wrench, label: "TPE bâtiment" },
  { icon: Building2, label: "PME construction" },
  { icon: Briefcase, label: "Entrepreneurs indépendants" },
];

const values = [
  { icon: Shield, label: "Spécialisation BTP", desc: "Expertise dédiée au secteur du bâtiment" },
  { icon: Heart, label: "Compréhension terrain", desc: "Connaissance réelle de votre quotidien" },
  { icon: ClipboardList, label: "Méthode structurée", desc: "Organisation claire et méthodique" },
  { icon: Users, label: "Accompagnement humain", desc: "Un interlocuteur dédié et disponible" },
];

const Index = () => {
  const heroRef = useRef(null);
  const { settings } = useSiteSettings();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Layout>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src={heroBtp}
            alt="Chantier BTP professionnel"
            className="w-full h-full object-cover scale-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/85 via-primary/75 to-primary/50" />
        </motion.div>
        <div className="container relative z-10 py-24 md:py-36">
          <motion.div
            className="max-w-2xl"
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
              Spécialiste BTP • Accompagnement sur-mesure
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-[1.1] mb-6">
              Simplifiez
              <br />
              <span className="text-secondary">l'administratif</span>
              <br />
              de votre entreprise
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-lg">
              ProxiZen BTP accompagne les artisans et entreprises du bâtiment
              dans leur organisation administrative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base px-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25">
                <a href={settings.calendlyUrl} target="_blank" rel="noreferrer">
                  Prendre rendez-vous
                  <ArrowRight className="ml-2" size={18} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-base px-8 text-primary-foreground hover:bg-primary-foreground/10 border border-primary-foreground/20"
              >
                <Link to="/accompagnement">Découvrir l'accompagnement</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L1440 80L1440 30C1440 30 1200 0 720 0C240 0 0 30 0 30L0 80Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* PROBLEMATIQUES */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Le constat
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-balance">
              Vous manquez de temps
              <br className="hidden md:block" /> pour l'administratif ?
            </h2>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto space-y-3 mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {problems.map((p, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60 hover:border-destructive/30 hover:shadow-md transition-all duration-300 group"
                variants={fadeUp}
              >
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0 group-hover:bg-destructive/15 transition-colors">
                  <Clock className="text-destructive" size={18} />
                </div>
                <span className="font-medium">{p}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-heading font-semibold text-lg">
              <ChevronRight size={20} />
              ProxiZen BTP vous aide à reprendre le contrôle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section-padding bg-card">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Nos services
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-balance">
              Ce que nous faisons pour vous
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                variants={scaleIn}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <s.icon className="text-primary" size={26} />
                </div>
                <span className="font-heading font-bold text-sm mb-2">
                  {s.label}
                </span>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {s.desc}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OFFRES APERCU */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Formules
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              Nos offres
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {offers.map((o, i) => (
              <motion.div
                key={i}
                className={`relative p-8 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  o.accent
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.03] border-2 border-primary"
                    : "bg-card border border-border/60 hover:shadow-lg hover:border-primary/30"
                }`}
                variants={fadeUp}
              >
                {o.accent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider">
                    Populaire
                  </span>
                )}
                <h3 className={`text-xl font-heading font-extrabold mb-3 ${o.accent ? "" : "text-primary"}`}>
                  {o.title}
                </h3>
                <p className={`text-sm mb-8 flex-1 leading-relaxed ${o.accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {o.desc}
                </p>
                <Button
                  asChild
                  variant={o.accent ? "secondary" : "outline"}
                  className="w-full group"
                >
                  <Link to="/offres">
                    Découvrir
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className="section-padding bg-card">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Notre cible
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              Pour qui ?
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {audiences.map((a, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center group"
                variants={scaleIn}
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <a.icon className="text-primary" size={32} />
                </div>
                <span className="font-heading font-bold text-sm">
                  {a.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Nos engagements
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              Pourquoi nous faire confiance ?
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                variants={scaleIn}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <v.icon className="text-primary" size={26} />
                </div>
                <span className="font-heading font-bold mb-2">{v.label}</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{v.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <SectionCTA />
    </Layout>
  );
};

export default Index;
