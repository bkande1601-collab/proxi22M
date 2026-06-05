import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeEuro,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Hammer,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import heroBtp from "@/assets/hero-btp.jpg";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { trackCalendlyClick } from "@/lib/site-insights";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const checkoutLinks = {
  kit1: {
    stripe: "",
    paypal: "",
  },
  kit2: {
    stripe: "",
    paypal: "",
  },
  kit3: {
    stripe: "",
    paypal: "",
  },
  pack: {
    stripe: "",
    paypal: "",
  },
};

const kits = [
  {
    id: "kit1",
    icon: FileSpreadsheet,
    title: "Kit Pilotage Administratif BTP",
    subtitle: "Pour reprendre le contrôle sur les devis, factures, paiements et marges chantier.",
    price: "149 EUR",
    badge: "Le plus complet",
    image: "/kits-assets/kit-1-dashboard.png",
    includes: [
      "Suivi devis, factures et paiements",
      "Relances clients et échéances",
      "Tableau de rentabilité chantier",
      "Suivi sous-traitants et documents",
      "Organisation administrative mensuelle",
    ],
    results: [
      "Une vision claire de ce qui est signé, encaissé et en attente",
      "Moins d’oublis dans les relances",
      "Une base solide si vous déléguez ensuite votre administratif",
    ],
  },
  {
    id: "kit2",
    icon: FileText,
    title: "Kit Préparation Facturation Électronique BTP",
    subtitle: "Pour anticiper la réforme et ranger vos informations clients, fournisseurs et documents.",
    price: "79 EUR",
    badge: "Réforme 2026",
    image: "/kits-assets/kit-2-dashboard.png",
    includes: [
      "Checklist migration",
      "Documents obligatoires à vérifier",
      "Organisation clients et fournisseurs",
      "Process administratif simple",
      "Guide clair de préparation",
    ],
    results: [
      "Une entreprise mieux préparée avant septembre 2026",
      "Des informations clients/fournisseurs centralisées",
      "Moins de panique au moment du changement",
    ],
  },
  {
    id: "kit3",
    icon: Hammer,
    title: "Kit Gestion Chantier / Suivi Entreprise",
    subtitle: "Pour organiser les chantiers, les tâches, les commandes matériaux, le SAV et le suivi client.",
    price: "129 EUR",
    badge: "Très terrain",
    image: "/kits-assets/kit-3-dashboard.png",
    includes: [
      "Suivi chantier",
      "Tâches équipe et priorités",
      "Commandes matériaux",
      "Planning chantier",
      "Suivi SAV et clients",
    ],
    results: [
      "Des chantiers plus lisibles semaine après semaine",
      "Une meilleure coordination équipe / client",
      "Un support simple pour suivre l’avancement",
    ],
  },
] as const;

const supportLevels = [
  "Mise en place de votre organisation administrative",
  "Suivi mensuel régulier des devis, factures, relances et documents",
  "Gestion complète de votre administratif selon le volume et le niveau de suivi souhaité",
];

const paymentProviders = [
  { key: "stripe", label: "Stripe", icon: CreditCard },
  { key: "paypal", label: "PayPal", icon: BadgeEuro },
] as const;

type CheckoutKey = keyof typeof checkoutLinks;

const getCheckoutHref = (itemId: CheckoutKey, provider: "stripe" | "paypal") =>
  checkoutLinks[itemId][provider] || "/contact";

const CheckoutButtons = ({ itemId }: { itemId: CheckoutKey }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {paymentProviders.map((provider) => {
      const href = getCheckoutHref(itemId, provider.key);
      const isLive = href !== "/contact";
      const Icon = provider.icon;

      return (
        <Button
          key={provider.key}
          asChild
          variant={provider.key === "stripe" ? "default" : "outline"}
          className="h-auto min-h-11 whitespace-normal px-4 py-3"
        >
          {isLive ? (
            <a href={href} target="_blank" rel="noreferrer">
              <Icon className="mr-2" size={17} />
              Payer avec {provider.label}
            </a>
          ) : (
            <Link to="/contact">
              <Icon className="mr-2" size={17} />
              Demander le lien {provider.label}
            </Link>
          )}
        </Button>
      );
    })}
  </div>
);

const Kits = () => {
  const { settings } = useSiteSettings();

  return (
    <Layout>
      <SEO pageId="kits" />

      <section className="relative min-h-[86vh] overflow-hidden flex items-center">
        <img
          src={heroBtp}
          alt="Artisan du BTP préparant le suivi administratif de ses chantiers"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="container relative z-10 py-28 md:py-36">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground mb-6">
              <PackageCheck size={16} />
              Kits Excel + guides PDF pour entreprises du BTP
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary-foreground leading-tight mb-6">
              Des kits prêts à l’emploi pour structurer votre administratif BTP
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed max-w-3xl mb-8">
              Devis, factures, paiements, relances, rentabilité chantier,
              documents, facturation électronique et suivi de chantier : chaque
              kit vous donne une méthode simple pour reprendre de la visibilité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="#acheter">
                  Voir les kits
                  <ArrowRight className="ml-2" size={18} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-primary-foreground border border-primary-foreground/25 hover:bg-primary-foreground/10"
              >
                <a
                  href={settings.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackCalendlyClick("kits-hero")}
                >
                  Être accompagné chaque mois
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="text-sm font-semibold text-primary mb-3 block">
              POUR ARTISANS, TPE ET PME DU BÂTIMENT
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-5">
              Ce que vous achetez vraiment
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Vous n’achetez pas seulement des tableaux Excel. Vous achetez une
              organisation plus claire, des suivis prêts à remplir et une base
              de travail qui peut ensuite être utilisée avec ProxiZen BTP, votre
              cabinet comptable ou votre équipe.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: ClipboardList, title: "Suivre", text: "Vos devis, factures, paiements, tâches et documents sont regroupés dans un cadre lisible." },
              { icon: ShieldCheck, title: "Anticiper", text: "Vous préparez la facturation électronique et les échéances importantes sans attendre le dernier moment." },
              { icon: BadgeEuro, title: "Piloter", text: "Vous visualisez les retards, les priorités et les chantiers qui demandent une action." },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="bg-card border border-border/60 rounded-2xl p-7"
                variants={fadeUp}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <item.icon size={22} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="acheter" className="section-padding bg-card">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-5">
              Choisissez votre kit
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Chaque kit contient un fichier Excel structuré et un guide PDF
              d’utilisation. Les aperçus montrent l’esprit du tableau sans
              dévoiler le contenu complet.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {kits.map((kit) => {
              const Icon = kit.icon;

              return (
                <motion.article
                  key={kit.id}
                  className="bg-background border border-border/70 rounded-2xl overflow-hidden flex flex-col"
                  variants={fadeUp}
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={kit.image}
                      alt={`Aperçu du ${kit.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                        {kit.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-primary mb-3">
                      {kit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {kit.subtitle}
                    </p>
                    <p className="text-3xl font-heading font-extrabold mb-5">
                      {kit.price}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm font-heading font-bold mb-3">
                          Inclus dans le kit
                        </p>
                        <ul className="space-y-2">
                          {kit.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm">
                              <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={16} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-heading font-bold mb-3">
                          Résultat attendu
                        </p>
                        <ul className="space-y-2">
                          {kit.results.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <Sparkles className="text-accent mt-0.5 shrink-0" size={16} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <CheckoutButtons itemId={kit.id} />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <motion.div
            className="max-w-5xl mx-auto bg-primary text-primary-foreground rounded-2xl p-7 md:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-semibold mb-5">
                  <PackageCheck size={16} />
                  Pack recommandé
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-5">
                  Pack 3 kits BTP
                </h2>
                <p className="text-primary-foreground/85 leading-relaxed mb-5">
                  Une base complète pour organiser l’administratif, préparer la
                  facturation électronique et suivre les chantiers au quotidien.
                </p>
                <ul className="space-y-2 text-sm text-primary-foreground/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    Kit Pilotage Administratif BTP
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    Kit Préparation Facturation Électronique BTP
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    Kit Gestion Chantier / Suivi Entreprise
                  </li>
                </ul>
              </div>
              <div className="bg-background text-foreground rounded-2xl p-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Prix du pack
                </p>
                <p className="text-4xl font-heading font-extrabold mb-2">
                  249 EUR
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Au lieu de 357 EUR si les kits sont achetés séparément.
                </p>
                <CheckoutButtons itemId="pack" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container">
          <motion.div
            className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="text-sm font-semibold text-primary mb-3 block">
                BESOIN DE DÉLÉGUER ?
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">
                Je peux aussi gérer votre administratif avec vous
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Vous souhaitez gagner du temps ou déléguer votre administratif ?
                Je propose également un accompagnement mensuel à partir de 650
                EUR / mois, adapté à votre niveau de suivi : mise en place,
                pilotage régulier ou gestion complète de votre administratif.
              </p>
            </motion.div>
            <motion.div
              className="bg-background border border-border/60 rounded-2xl p-7"
              variants={fadeUp}
            >
              <p className="font-heading font-bold mb-4">
                L’accompagnement peut inclure :
              </p>
              <ul className="space-y-3 mb-6">
                {supportLevels.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Pour une gestion plus complète, une offre à 950 EUR / mois peut
                être proposée selon le volume de factures, les relances, les
                documents à traiter et le niveau de réactivité attendu.
              </p>
              <Button asChild size="lg" className="w-full">
                <a
                  href={settings.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackCalendlyClick("kits-accompagnement")}
                >
                  Parler de mon administratif
                  <ArrowRight className="ml-2" size={18} />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-background border border-border/60 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <FolderOpen className="text-primary shrink-0 mt-1" size={22} />
              <div>
                <h2 className="text-xl font-heading font-bold mb-2">
                  Note sur la facturation électronique
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Le calendrier officiel prévoit l’obligation de réception des
                  factures électroniques pour toutes les entreprises à partir du
                  1er septembre 2026, puis l’obligation d’émission pour les PME,
                  TPE et micro-entreprises à partir du 1er septembre 2027.
                  Sources :{" "}
                  <a
                    className="text-primary underline underline-offset-4"
                    href="https://www.economie.gouv.fr/tout-savoir-sur-la-facturation-electronique-pour-les-entreprises"
                    target="_blank"
                    rel="noreferrer"
                  >
                    economie.gouv.fr
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kits;
