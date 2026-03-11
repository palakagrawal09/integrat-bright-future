import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Train, GraduationCap, Factory, Building2, FlaskConical, Cog, Award, CheckCircle, Loader2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { usePageContent } from "@/hooks/use-page-content";

const fallbackIconMap: Record<string, React.ElementType> = { Shield, Train, GraduationCap, Factory, FlaskConical, Cog };

const ClientsPage = () => {
  const [clients, setClients] = useState<{ name: string; logo_url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const { get, getJSON } = usePageContent("clients");

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from("clients").select("*").eq("published", true).order("sort_order");
      if (data && data.length > 0) setClients(data);
      setLoading(false);
    };
    fetchClients();
  }, []);

  const heroTitle = get("hero", "title", "Trusted by Industry Leaders");
  const heroDesc = get("hero", "description", "For over 27 years, we've built lasting partnerships with defence organizations, government bodies, educational institutions, and manufacturing giants across India.");
  const fallbackClients = getJSON<any[]>("fallback", "items", [
    { name: "Indian Army", icon: "Shield", category: "Defence", highlight: true },
    { name: "Indian Railways", icon: "Train", category: "Government", highlight: true },
    { name: "Engineering Colleges", icon: "GraduationCap", category: "Education", highlight: false },
    { name: "Polytechnic Colleges", icon: "GraduationCap", category: "Education", highlight: false },
    { name: "Science Colleges", icon: "FlaskConical", category: "Education", highlight: false },
    { name: "Pipe Manufacturing Plants", icon: "Factory", category: "Manufacturing", highlight: false },
    { name: "Automobile Manufacturing Plants", icon: "Cog", category: "Manufacturing", highlight: false },
    { name: "Research Institutes", icon: "FlaskConical", category: "Research", highlight: false },
  ]);
  const testimonials = getJSON<{ text: string; source: string }[]>("testimonials", "items", [
    { text: "DIPL has been instrumental in providing reliable fire control systems for our operations.", source: "Defence Sector Client" },
    { text: "The data acquisition systems from Digital Integrator have significantly improved our research capabilities.", source: "Research Institute" },
  ]);
  const trustItems = getJSON<string[]>("trust", "items", ["27+ years of proven expertise", "ISO certified quality management", "Dedicated R&D team", "Pan-India support network", "Long-term government partnerships"]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Our Clients</span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">{heroTitle}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{heroDesc}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground flex items-center justify-center gap-3">
                <span className="w-8 h-0.5 bg-brass-gold" /> Our Valued Clientele <span className="w-8 h-0.5 bg-brass-gold" />
              </h2>
            </div>
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
            ) : clients.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {clients.map((client) => (
                  <div key={client.name} className="card-defence p-6 group">
                    <div className="w-12 h-12 bg-defence-green/10 flex items-center justify-center mb-4 group-hover:bg-brass-gold/15 transition-colors duration-300">
                      <Users className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground">{client.name}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {fallbackClients.map((client: any) => {
                  const Icon = fallbackIconMap[client.icon] || Users;
                  return (
                    <div key={client.name} className={`card-defence p-6 group ${client.highlight ? "border-defence-green/30 bg-defence-green/5" : ""}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-defence-green/10 flex items-center justify-center group-hover:bg-brass-gold/15 transition-colors duration-300">
                          <Icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                        </div>
                        {client.highlight && <span className="text-xs bg-defence-green text-white px-2 py-1">Key Client</span>}
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{client.category}</span>
                      <h3 className="text-lg font-display font-semibold text-foreground mt-1">{client.name}</h3>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2 mb-6">A Partner You Can Trust</h2>
                <ul className="space-y-4">
                  {trustItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-defence-green flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                {testimonials.map((t, i) => (
                  <div key={i} className="card-defence p-6">
                    <Award className="w-8 h-8 text-brass-gold mb-4" />
                    <p className="text-foreground italic mb-4 leading-relaxed">"{t.text}"</p>
                    <p className="text-muted-foreground text-sm">— {t.source}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-width">
            <div className="p-8 sm:p-12 text-center bg-defence-green">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">Join Our Growing Client Base</h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">Discover how our solutions can transform your operations.</p>
              <Link to="/contact" className="btn-accent inline-flex items-center gap-2">Get in Touch</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClientsPage;
