import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PenTool, Wrench, Settings, HeadsetIcon, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const fallbackIcons: Record<string, React.ElementType> = {
  "Design & Development": PenTool,
  "Integration & Testing": Settings,
  "Repair & Maintenance": Wrench,
  "AMC & Field Support": HeadsetIcon,
};

const ServicesPage = () => {
  const [services, setServices] = useState<{ title: string; description: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("sort_order");
      if (data && data.length > 0) {
        setServices(data);
      } else {
        // Fallback hardcoded
        setServices([
          { title: "Design & Development", description: "End-to-end design and development of custom electronics, embedded systems, and automation solutions." },
          { title: "Integration & Testing", description: "Comprehensive system integration and rigorous testing to ensure all components operate seamlessly." },
          { title: "Repair & Maintenance", description: "Expert repair and maintenance services to keep your defence and industrial systems operating at peak performance." },
          { title: "AMC & Field Support", description: "Annual Maintenance Contracts and dedicated field support teams for continuous operational readiness." },
        ]);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">
                  Services & Lifecycle Support
                </span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                Full Lifecycle Support
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From design and development through integration, testing, repair, and long-term 
                field support — we stand behind every system we deliver.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding bg-background">
          <div className="container-width">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-8">
                {services.map((service, index) => {
                  const IconComponent = fallbackIcons[service.title] || Settings;
                  return (
                    <div
                      key={service.title}
                      className={`card-defence p-8 grid lg:grid-cols-2 gap-8 items-start ${
                        index % 2 === 1 ? "lg:direction-rtl" : ""
                      }`}
                    >
                      <div>
                        <div className="w-14 h-14 bg-defence-green/10 flex items-center justify-center mb-6">
                          <IconComponent className="w-7 h-7 text-defence-green" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="p-8 sm:p-12 text-center bg-defence-green">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Need Lifecycle Support?
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">
                Whether it's a new build, system upgrade, or annual maintenance — our team is ready.
              </p>
              <Link to="/contact" className="btn-accent inline-flex items-center gap-2">
                Contact Our Service Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
