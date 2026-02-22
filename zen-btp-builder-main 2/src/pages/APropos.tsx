import { motion } from "framer-motion";
import { Shield, Eye, Heart, Users, Handshake, Bolt } from "lucide-react";
import Layout from "@/components/Layout";
import SectionCTA from "@/components/SectionCTA";
import SEO from "@/components/SEO";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const apports = [
  {
    icon: Eye,
    text: "Une gestion administrative claire et structurée",
  },
  {
    icon: Shield,
    text: "Un suivi régulier, sans jugement ni pression",
  },
  {
    icon: Handshake,
    text: "Une vraie relation de confiance",
  },
  {
    icon: Users,
    text: "Une communication simple, humaine et transparente",
  },
];

const confiance = [
  { icon: Shield, text: "Spécialisation BTP" },
  { icon: Eye, text: "Vision terrain + vision administrative" },
  { icon: Heart, text: "Accompagnement personnalisé" },
  { icon: Bolt, text: "Discrétion, fiabilité et réactivité" },
];

const APropos = () => {
  return (
    <Layout>
      <SEO pageId="apropos" />

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-heading font-bold mb-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            L’administration du BTP, en plus simple, plus claire, plus sereine.
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
            <p>
              ProxyZen BTP est né d’un constat simple : dans le BTP, le temps est
              précieux et l’administratif devient vite une charge lourde,
              stressante et chronophage pour les artisans et dirigeants de
              petites structures.
            </p>
            <p>
              Devis, factures, relances, dossiers, échanges avec les organismes…
              Pendant que vous êtes sur vos chantiers, l’administratif
              s’accumule.
            </p>
            <p>
              Ma mission est simple : vous libérer l’esprit pour que vous
              puissiez vous concentrer sur votre cœur de métier.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              Qui suis-je ?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Je suis assistante administrative indépendante, spécialisée dans
                le secteur du BTP. J’ai travaillé plusieurs années au sein
                d’entreprises du bâtiment, au plus près du terrain, notamment
                dans la peinture, ce qui m’a permis de comprendre les réalités
                concrètes des artisans.
              </p>
              <p>
                ProxyZen BTP n’est pas une assistance administrative généraliste.
                C’est un accompagnement pensé pour le BTP, avec ses contraintes,
                son rythme et ses priorités.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            Ce que je vous apporte
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {apports.map((item, i) => (
              <motion.div
                key={item.text}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl bg-card border border-border/60"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-5">
              Une approche zen… mais efficace
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Le nom ProxyZen n’est pas un hasard. Je crois fermement qu’une
              entreprise fonctionne mieux quand l’esprit est clair.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Pas de jargon inutile. Pas de complexité artificielle. Pas de
              pression.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Juste une gestion administrative rigoureuse, fluide et apaisée, au
              service de votre activité.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            Pourquoi me faire confiance ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {confiance.map((item, i) => (
              <motion.div
                key={item.text}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <p className="text-sm font-medium">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        title="Envie d’en parler ?"
        description="Chaque entreprise est différente. C’est pourquoi je privilégie le contact direct pour comprendre vos besoins réels et vous proposer une solution adaptée."
        hideButton
      />
    </Layout>
  );
};

export default APropos;
