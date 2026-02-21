import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
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

const offers = [
  {
    title: "Essentielle",
    desc: "L'accompagnement de base pour structurer votre administratif.",
    features: [
      "Organisation des documents",
      "Classement administratif",
      "Suivi administratif basique",
      "Transmission au cabinet comptable",
    ],
    highlight: false,
  },
  {
    title: "Confort",
    desc: "Une gestion administrative plus complète pour un quotidien serein.",
    features: [
      "Tout ce qui est dans Essentielle",
      "Suivi régulier personnalisé",
      "Gestion devis et facturation",
      "Relation comptable optimisée",
      "Pré-comptabilité",
    ],
    highlight: true,
  },
  {
    title: "Premium",
    desc: "L'accompagnement global pour une maîtrise totale de votre administratif.",
    features: [
      "Tout ce qui est dans Confort",
      "Suivi renforcé et proactif",
      "Optimisation administrative complète",
      "Coordination avancée avec le cabinet",
      "Reporting et tableaux de bord",
      "Support prioritaire",
    ],
    highlight: false,
  },
];

const comparison = [
  { feature: "Organisation documentaire", essentielle: true, confort: true, premium: true },
  { feature: "Classement administratif", essentielle: true, confort: true, premium: true },
  { feature: "Transmission comptable", essentielle: true, confort: true, premium: true },
  { feature: "Suivi régulier personnalisé", essentielle: false, confort: true, premium: true },
  { feature: "Devis et facturation", essentielle: false, confort: true, premium: true },
  { feature: "Pré-comptabilité", essentielle: false, confort: true, premium: true },
  { feature: "Optimisation complète", essentielle: false, confort: false, premium: true },
  { feature: "Reporting et tableaux de bord", essentielle: false, confort: false, premium: true },
  { feature: "Support prioritaire", essentielle: false, confort: false, premium: true },
];

const Offres = () => {
  return (
    <Layout>
      {/* HERO */}
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
              Nos formules
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-4 leading-tight">
              Nos offres d'accompagnement
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Des formules adaptées à chaque besoin, sans engagement.
              Choisissez l'accompagnement qui correspond à votre activité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CARDS */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {offers.map((o, i) => (
              <motion.div
                key={i}
                className={`relative p-8 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  o.highlight
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.03] border-2 border-primary"
                    : "bg-card border border-border/60 hover:shadow-lg hover:border-primary/30"
                }`}
                variants={fadeUp}
              >
                {o.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider">
                    <Star size={12} fill="currentColor" />
                    Populaire
                  </span>
                )}
                <h3 className={`text-2xl font-heading font-extrabold mb-2 ${o.highlight ? "" : "text-primary"}`}>
                  {o.title}
                </h3>
                <p className={`text-sm mb-6 leading-relaxed ${o.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {o.desc}
                </p>
                <ul className="space-y-3 flex-1 mb-8">
                  {o.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        o.highlight ? "bg-accent/30" : "bg-primary/10"
                      }`}>
                        <Check className={o.highlight ? "text-accent-foreground" : "text-primary"} size={12} />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={o.highlight ? "secondary" : "outline"}
                  className="w-full group"
                >
                  <Link to="/contact">
                    Demander un devis
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section-padding bg-card">
        <div className="container max-w-4xl">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              Comparaison
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Tableau comparatif
            </h2>
          </motion.div>
          <motion.div
            className="overflow-x-auto rounded-2xl border border-border/60 bg-background shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left p-5 font-heading font-bold">Prestation</th>
                  <th className="p-5 font-heading font-bold text-center">Essentielle</th>
                  <th className="p-5 font-heading font-bold text-center bg-primary/5 rounded-t-lg">Confort</th>
                  <th className="p-5 font-heading font-bold text-center">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.essentielle ? (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                          <Check className="text-primary" size={14} />
                        </div>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-primary/5">
                      {row.confort ? (
                        <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
                          <Check className="text-primary" size={14} />
                        </div>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.premium ? (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                          <Check className="text-primary" size={14} />
                        </div>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <SectionCTA buttonText="Demander un devis personnalisé" />
    </Layout>
  );
};

export default Offres;
