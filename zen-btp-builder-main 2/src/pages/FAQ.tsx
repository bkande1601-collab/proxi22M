import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/Layout";
import SectionCTA from "@/components/SectionCTA";

const faqs = [
  {
    q: "Pourquoi externaliser l'administratif ?",
    a: "Externaliser votre administratif vous permet de gagner du temps, de réduire le stress lié à la gestion quotidienne et de vous concentrer sur votre cœur de métier : vos chantiers. C'est aussi un moyen d'améliorer la qualité de votre organisation et d'éviter les erreurs coûteuses.",
  },
  {
    q: "Travaillez-vous avec tous les cabinets comptables ?",
    a: "Oui, ProxiZen BTP s'adapte aux outils et méthodes de votre cabinet comptable. Notre rôle est de faciliter la transmission des documents et la communication pour que tout soit fluide entre vous et votre expert-comptable.",
  },
  {
    q: "Comment démarrer ?",
    a: "C'est simple : contactez-nous pour un premier échange gratuit. Nous analyserons ensemble votre situation et vos besoins, puis nous vous proposerons un accompagnement personnalisé. Pas d'engagement, pas de surprise.",
  },
  {
    q: "Combien de temps dure l'accompagnement ?",
    a: "L'accompagnement est flexible et s'adapte à vos besoins. Vous pouvez le faire évoluer ou l'arrêter à tout moment. Notre objectif est de vous apporter une valeur durable dans votre organisation administrative.",
  },
  {
    q: "Puis-je modifier mon offre ?",
    a: "Absolument ! Vous pouvez passer d'une formule à l'autre selon l'évolution de vos besoins. Nous sommes là pour nous adapter à votre rythme et à la croissance de votre entreprise.",
  },
  {
    q: "Quels documents devrai-je fournir ?",
    a: "Nous nous adaptons à votre fonctionnement. Généralement, il s'agit de vos factures, devis, relevés bancaires et documents administratifs courants. Nous vous guiderons pas à pas dans la mise en place.",
  },
];

const FAQ = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Questions fréquentes
          </motion.h1>
          <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur notre accompagnement.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="bg-card border rounded-xl px-6"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      <SectionCTA title="Vous avez d'autres questions ?" buttonText="Contactez-nous" />
    </Layout>
  );
};

export default FAQ;
