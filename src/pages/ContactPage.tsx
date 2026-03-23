import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Mail, Phone, Building2, Clock, FileText } from "lucide-react";
import { usePageContent } from "@/hooks/use-page-content";

const iconMap: Record<string, React.ElementType> = { Phone, Mail, Clock };

const ContactPage = () => {
  const { get, getJSON } = usePageContent("contact");

  const heroTitle = get("hero", "title", "Get in Touch");
  const heroDesc = get("hero", "description", "Ready to discuss your automation or defence electronics requirements? Our team is here to help you find the perfect solution.");
  const contactDetails = getJSON<any[]>("details", "items", [
    { icon: "Phone", title: "Phone", content: "0731-4042133", href: "tel:07314042133" },
    { icon: "Mail", title: "Email", content: "sales@diplindia.com", href: "mailto:sales@diplindia.com" },
    { icon: "Clock", title: "Business Hours", content: "Mon - Sat: 9:30 AM - 5:30 PM" },
  ]);
  const companyInfo = getJSON<{ label: string; value: string }[]>("company_info", "items", [
    { label: "CIN", value: "U31909MP1997PTC012011" },
    { label: "GST No.", value: "23AAACD9928P1Z5" },
    { label: "Registration No.", value: "12011" },
    { label: "RoC", value: "Gwalior" },
  ]);
  const ctaTitle = get("cta", "title", "Ready to Start Your Project?");
  const ctaDesc = get("cta", "description", "Email us your requirements and our team will get back to you within 24 hours.");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Contact & Enquiries</span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">{heroTitle}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{heroDesc}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {contactDetails.map((item: any) => {
                const Icon = iconMap[item.icon] || Phone;
                return (
                  <div key={item.title} className="card-defence p-6 group">
                    <div className="w-12 h-12 bg-defence-green/10 flex items-center justify-center mb-4 group-hover:bg-brass-gold/15 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-defence-green hover:text-brass-gold transition-colors block">{item.content}</a>
                    ) : (
                      <p className="text-foreground">{item.content}</p>
                    )}
                    {item.subtext && <p className="text-muted-foreground text-sm mt-1">{item.subtext}</p>}
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="card-defence p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-defence-green/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-defence-green" />
                    </div>
                    <h3 className="font-semibold text-foreground">Registered Office</h3>
                  </div>
                  <address className="not-italic text-muted-foreground leading-relaxed">
                    46 Electronic Complex<br />Pardeshipura, Indore<br />Madhya Pradesh - 452010, India
                  </address>
                </div>
                <div className="card-defence p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brass-gold/15 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-brass-gold" />
                    </div>
                    <h3 className="font-semibold text-foreground">Corporate Office</h3>
                  </div>
                  <address className="not-italic text-muted-foreground leading-relaxed">
                    46 Electronic Complex<br />Pardeshipura, Indore<br />Madhya Pradesh - 452010, India
                  </address>
                </div>
                <div className="card-defence p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                      <FileText className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">Statutory Information</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {companyInfo.map((info) => (
                      <div key={info.label} className="bg-sand-dark/50 p-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{info.label}</p>
                        <p className="text-sm font-medium text-foreground mt-1">{info.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-defence overflow-hidden h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.5376485799384!2d75.8559!3d22.7300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b0a0a0a0a%3A0x0!2sElectronic%20Complex%2C%20Pardeshipura%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%" height="100%" style={{ border: 0, minHeight: "400px" }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Digital Integrator Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="p-8 sm:p-12 text-center bg-defence-green">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">{ctaTitle}</h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">{ctaDesc}</p>
              <a href="mailto:sales@diplindia.com" className="btn-accent inline-flex items-center gap-2">
                <Mail className="w-5 h-5" /> Send Us an Email
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
