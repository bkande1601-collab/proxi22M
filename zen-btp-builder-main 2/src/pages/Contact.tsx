import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { addContactRequest, trackCalendlyClick } from "@/lib/site-insights";
import SEO from "@/components/SEO";

interface ContactPayload {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const sendContactEmail = async (
  payload: ContactPayload,
  recipientEmail: string,
) => {
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Nouvelle demande client - ${payload.firstName} ${payload.lastName}`.trim(),
          _template: "table",
          _captcha: "false",
          prenom: payload.firstName,
          nom: payload.lastName,
          entreprise: payload.company,
          email: payload.email,
          telephone: payload.phone,
          message: payload.message,
        }),
      },
    );

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as { success?: string | boolean };
    return result.success === true || result.success === "true";
  } catch {
    return false;
  }
};

const Contact = () => {
  const { toast } = useToast();
  const { settings } = useSiteSettings();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ContactPayload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const fullName = `${payload.firstName} ${payload.lastName}`.trim();

    const hasSavedInDashboard = addContactRequest({
      name: fullName,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
    });
    const hasMailSent = await sendContactEmail(payload, settings.contactEmail);

    setLoading(false);

    if (hasSavedInDashboard && hasMailSent) {
      toast({
        title: "Message envoye",
        description: "Votre demande est enregistree et un email a ete transmis.",
      });
      form.reset();
      return;
    }

    if (hasSavedInDashboard && !hasMailSent) {
      toast({
        title: "Demande enregistree",
        description:
          "La demande est visible dans le dashboard, mais l'envoi email a echoue. Verifiez la validation FormSubmit.",
        variant: "destructive",
      });
      form.reset();
      return;
    }

    if (!hasSavedInDashboard && hasMailSent) {
      toast({
        title: "Email envoye",
        description:
          "Le mail a ete transmis, mais la demande n'a pas pu etre stockee dans le dashboard local.",
        variant: "destructive",
      });
      form.reset();
      return;
    }

    toast({
      title: "Echec de l'envoi",
      description:
        "Impossible d'enregistrer la demande. Rechargez la page puis recommencez.",
      variant: "destructive",
    });
  };

  return (
    <Layout>
      <SEO pageId="contact" />
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contactez-nous
          </motion.h1>
          <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto">
            Un premier échange gratuit et sans engagement pour parler de vos besoins.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* FORM */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-card border rounded-xl p-8">
                <h2 className="text-xl font-heading font-bold mb-6">
                  Envoyez-nous un message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        maxLength={100}
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        maxLength={100}
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Entreprise *</Label>
                      <Input
                        id="company"
                        name="company"
                        required
                        maxLength={100}
                        placeholder="Nom de l'entreprise"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" required maxLength={255} placeholder="votre@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        maxLength={20}
                        placeholder="06 00 00 00 00"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      maxLength={1000}
                      rows={5}
                      placeholder="Décrivez votre besoin…"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Envoi en cours…" : "Envoyer le message"}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* INFO */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-heading font-bold mb-4">Informations</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="text-primary mt-1 shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-primary mt-1 shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-sm">Téléphone</p>
                      <a
                        href={settings.calendlyUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackCalendlyClick("contact-info")}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        demander un échange
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-primary mt-1 shrink-0" size={18} />
                    <div>
                      <p className="font-medium text-sm">Disponibilité</p>
                      <p className="text-sm text-muted-foreground">Lundi – Vendredi, 9h – 18h</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="font-heading font-bold mb-2 text-primary">
                  Réponse rapide garantie
                </h3>
                <p className="text-sm text-muted-foreground">
                  Nous nous engageons à vous répondre sous 24h ouvrées.
                  Votre premier échange est gratuit et sans engagement.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
