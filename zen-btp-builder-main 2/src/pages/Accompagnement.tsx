import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Calculator,
  ClipboardList,
  Users,
  FileText,
  BarChart3,
  Phone,
  Search,
  Settings,
  ArrowRight,
  Shield,
  Heart,
  MessageSquare,
  Handshake,
  CheckCircle2,
} from "lucide-react";
import Layout from "@/components/Layout";
import SectionCTA from "@/components/SectionCTA";

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

const services = [
  { icon: FolderOpen, label: "Organisation administrative", desc: "Structuration complète de vos documents" },
  { icon: FileText, label: "Devis et facturation", desc: "Création et suivi de bout en bout" },
  { icon: ClipboardList, label: "Classement documentaire", desc: "Transmission optimisée au comptable" },
  { icon: Users, label: "Interface comptable", desc: "Coordination fluide avec votre cabinet" },
  { icon: BarChart3, label: "Suivi quotidien", desc: "Gestion administrative au jour le jour" },
  { icon: Calculator, label: "Pré-comptabilité", desc: "Préparation de tous vos éléments" },
];

const steps = [
  { icon: Phone, title: "Premier échange gratuit", desc: "Un appel pour comprendre vos besoins." },
  { icon: Search, title: "Analyse de l'organisation", desc: "Diagnostic de votre situation actuelle." },
  { icon: Settings, title: "Proposition personnalisée", desc: "Une offre adaptée à votre activité." },
  { icon: ArrowRight, title: "Mise en place et suivi", desc: "Accompagnement régulier et ajustements." },
];

const targetList = [
  "Vous êtes artisan, TPE ou PME du BTP",
  "Vous travaillez seul ou avec une petite équipe",
  "Vous manquez de temps pour l'administratif",
  "Vous voulez une organisation fiable",
  "Vous travaillez avec un cabinet comptable ou souhaitez en avoir un",
];

const diffPoints = [
  { icon: Shield, label: "Spécialisation BTP", desc: "Expertise dédiée au secteur du bâtiment" },
  { icon: Heart, label: "Compréhension terrain", desc: "Connaissance réelle de vos contraintes" },
  { icon: MessageSquare, label: "Communication simple", desc: "Échanges clairs et sans jargon" },
  { icon: Handshake, label: "Coordination comptable", desc: "Travail en synergie avec votre cabinet" },
  { icon: Users, label: "Approche humaine", desc: "Un accompagnement structuré et bienveillant" },
];

const Accompagnement = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground section-padding">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-sm font-medium mb-6 border border-primary-foreground/20">
              Notre accompagnement
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
              Un accompagnement pensé pour les pros du BTP
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Vous êtes artisan ou dirigeant d'une entreprise du BTP et l'administratif
              vous fait perdre du temps ? ProxiZen BTP vous aide à tout structurer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className="section-padding">
        <div className="container max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Pour qui ?
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Cet accompagnement est fait pour vous si :
            </h2>
          </motion.div>
          <motion.div
            className="space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {targetList.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                variants={fadeUp}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-primary" size={20} />
                </div>
                <span className="font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MON ROLE */}
      <section className="section-padding bg-card">
        <div className="container">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Services
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Mon rôle
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                className="group p-7 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                variants={scaleIn}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <s.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-bold mb-2">{s.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Processus
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Comment ça se passe ?
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-5 p-7 rounded-2xl bg-card border border-border/60 hover:shadow-md transition-all duration-300"
                variants={fadeUp}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 text-primary-foreground font-heading font-extrabold text-lg shadow-lg shadow-primary/20">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-1.5">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DIFFERENCIATION */}
      <section className="section-padding bg-card">
        <div className="container">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Nos atouts
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Pourquoi choisir ProxiZen BTP ?
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {diffPoints.map((d, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                variants={scaleIn}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <d.icon className="text-primary" size={22} />
                </div>
                <span className="font-heading font-bold text-sm mb-1.5">{d.label}</span>
                <span className="text-xs text-muted-foreground leading-relaxed">{d.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionCTA />
    </Layout>
  );
};

export default Accompagnement;
