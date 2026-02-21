import { motion } from "framer-motion";
import { Shield, Eye, Heart, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SectionCTA from "@/components/SectionCTA";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const valeurs = [
  { icon: Shield, title: "Organisation", desc: "Une structure administrative claire et efficace pour votre entreprise." },
  { icon: Eye, title: "Clarté", desc: "Des processus transparents et compréhensibles pour tous." },
  { icon: Heart, title: "Fiabilité", desc: "Un suivi rigoureux sur lequel vous pouvez compter." },
  { icon: Users, title: "Proximité humaine", desc: "Un accompagnement personnalisé, à l'écoute de vos besoins." },
];

const APropos = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            À propos de ProxiZen BTP
          </motion.h1>
          <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto">
            Une mission simple : aider les artisans et entreprises du BTP à se concentrer sur leur métier.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-foreground">
              Notre histoire
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ProxiZen BTP est né d'un constat simple : de nombreux artisans et chefs d'entreprise
                du bâtiment passent un temps considérable sur des tâches administratives au détriment
                de leur cœur de métier.
              </p>
              <p>
                Factures en retard, documents éparpillés, communication difficile avec le cabinet
                comptable… Ces problèmes du quotidien créent du stress et font perdre de l'énergie
                à des professionnels qui devraient pouvoir se concentrer sur leurs chantiers.
              </p>
              <p>
                C'est pourquoi ProxiZen BTP propose un accompagnement administratif sur mesure,
                spécialement conçu pour les réalités du secteur du BTP. Notre approche allie
                expertise administrative et compréhension du terrain, pour une collaboration
                efficace et humaine.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VISION */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              Notre vision
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Nous croyons que chaque artisan mérite un accompagnement administratif de qualité,
              adapté à son rythme et ses besoins. Notre objectif est de devenir le partenaire
              de confiance qui libère du temps et de la sérénité pour que vous puissiez vous
              concentrer sur ce que vous faites de mieux : bâtir.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {valeurs.map((v, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-background border"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA title="Envie de nous connaître davantage ?" buttonText="Prendre contact" />
    </Layout>
  );
};

export default APropos;
