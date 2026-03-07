import { Shield, Crosshair, Cpu, Zap, Settings, Factory, PenTool, Wrench, HeadsetIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";

type Service = {
  id: string;
  title: string;
  description: string;
  sort_order: number;
  published: boolean;
};

const fallbackIcons: Record<string, React.ElementType> = {
  "Design & Development": PenTool,
  "Integration & Testing": Settings,
  "Repair & Maintenance": Wrench,
  "AMC & Field Support": HeadsetIcon,
};

const defaultCapabilities = [
  { icon: Shield, title: "Defence Manufacturing", description: "Precision electronics for defence applications and strategic systems." },
  { icon: Crosshair, title: "Simulators & Training", description: "Advanced training simulators for armed forces and industrial use." },
  { icon: Cpu, title: "Industrial Automation", description: "PLC-based automation systems for manufacturing excellence." },
  { icon: Zap, title: "Power & Energy Systems", description: "Custom power distribution and control panel solutions." },
  { icon: Settings, title: "Data Acquisition", description: "High-precision data acquisition and monitoring systems." },
  { icon: Factory, title: "Custom Electronics", description: "Bespoke electronic systems tailored to specific requirements." },
];

const Capabilities = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title, description, sort_order, published")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setServices(data);
      }
    };

    fetchServices();
  }, []);

  const capabilities = useMemo(() => {
    if (services.length === 0) return defaultCapabilities;

    return services.map((service) => ({
      icon: fallbackIcons[service.title] || Factory,
      title: service.title,
      description: service.description,
    }));
  }, [services]);

  return (
    <section id="capabilities" className="section-padding bg-background">
      <div className="container-width">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="section-divider" />
              <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Core Capabilities</span>
              <span className="section-divider" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">What We Manufacture</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Specializing in Defence Electronics and Industrial Automation,
              delivering precision-engineered solutions for critical applications.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <div className="card-defence p-8 group cursor-pointer h-full">
                <div className="w-14 h-14 bg-defence-green/10 flex items-center justify-center mb-6 group-hover:bg-brass-gold/15 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link to="/defence-systems" className="btn-primary inline-flex items-center gap-2">
              View All Products & Services
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Capabilities;
