import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SectionCTAProps {
  title?: string;
  buttonText?: string;
  to?: string;
}

const SectionCTA = ({
  title = "Et si vous gagniez du temps sur votre administratif ?",
  buttonText = "Planifier un échange gratuit",
  to = "/contact",
}: SectionCTAProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground section-padding">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary-foreground/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
      </div>

      <div className="container relative z-10 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-heading font-extrabold mb-10 max-w-2xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="text-base px-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-primary/20 group"
          >
            <Link to={to}>
              {buttonText}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionCTA;
