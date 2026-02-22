import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { trackCalendlyClick } from "@/lib/site-insights";

interface SectionCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  to?: string;
  href?: string;
  hideButton?: boolean;
}

const SectionCTA = ({
  title,
  description,
  buttonText,
  to = "/contact",
  href,
  hideButton = false,
}: SectionCTAProps) => {
  const { settings } = useSiteSettings();
  const resolvedTitle = title ?? settings.finalCtaTitle;
  const resolvedButtonText = buttonText ?? settings.finalCtaButtonText;
  const shouldTrackCalendly = Boolean(href && href.includes("calendly.com"));
  const shouldOpenInNewTab = Boolean(
    href && (href.startsWith("http://") || href.startsWith("https://")),
  );

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
          {resolvedTitle}
        </motion.h2>
        {description ? (
          <motion.p
            className="text-base md:text-lg text-primary-foreground/85 max-w-3xl mx-auto mb-10 leading-relaxed whitespace-pre-line"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            {description}
          </motion.p>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {hideButton ? null : (
            <Button
              asChild
              size="lg"
              className="text-base px-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-primary/20 group"
            >
              {href ? (
                <a
                  href={href}
                  target={shouldOpenInNewTab ? "_blank" : undefined}
                  rel={shouldOpenInNewTab ? "noreferrer" : undefined}
                  onClick={() => {
                    if (shouldTrackCalendly) {
                      trackCalendlyClick("section-cta");
                    }
                  }}
                >
                  {resolvedButtonText}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              ) : (
                <Link to={to}>
                  {resolvedButtonText}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              )}
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionCTA;
