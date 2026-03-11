import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Fuel, Mountain, Train, FlaskConical, Cpu, Gauge, Thermometer, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/use-page-content";
import oilGasImg from "@/assets/oil-gas-automation.jpg";

const sectorIconMap: Record<string, React.ElementType> = { Fuel, Mountain, Train, FlaskConical };
const techIconMap: Record<string, React.ElementType> = { Cpu, Gauge, Thermometer, Settings };
const sectorImageMap: Record<string, string> = { "oil-gas": oilGasImg };

const IndustrialAutomationPage = () => {
  const { get, getJSON } = usePageContent("industrial");

  const heroTitle = get("hero", "title", "Automation Across Industries");
  const heroDesc = get("hero", "description", "Complete automation and control solutions for Oil & Gas, Mining, Railways, and Pharmaceutical industries — built on decades of engineering expertise.");
  const coreTech = getJSON<{ icon: string; name: string }[]>("core_tech", "items", [
    { icon: "Cpu", name: "Microcontroller-Based Automation" },
    { icon: "Gauge", name: "Data Acquisition Systems" },
    { icon: "Thermometer", name: "Temperature Monitoring & Control" },
    { icon: "Settings", name: "FPGA-Based Control Systems" },
  ]);
  const sectors = getJSON<{ id: string; name: string; icon: string; description: string; capabilities: string[] }[]>("sectors", "items", []);
  const ctaTitle = get("cta", "title", "Need a Custom Automation Solution?");
  const ctaDesc = get("cta", "description", "Our engineering team designs and deploys bespoke automation systems tailored to your industry.");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Industrial Automation</span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">{heroTitle}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{heroDesc}</p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background border-b border-gunmetal/10">
          <div className="container-width px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {coreTech.map((tech) => {
                const Icon = techIconMap[tech.icon] || Cpu;
                return (
                  <div key={tech.name} className="card-defence p-5 text-center group">
                    <div className="w-12 h-12 mx-auto mb-3 bg-brass-gold/10 flex items-center justify-center group-hover:bg-defence-green/10 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-brass-gold group-hover:text-defence-green transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{tech.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {sectors.map((sector, index) => {
          const SectorIcon = sectorIconMap[sector.icon] || Fuel;
          const sectorImage = sectorImageMap[sector.id];
          return (
            <section key={sector.id} id={sector.id} className={`section-padding ${index % 2 === 0 ? "bg-sand-dark/30" : "bg-background"}`}>
              <div className="container-width px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-4">
                      <SectorIcon className="w-4 h-4 text-defence-green" />
                      <span className="text-defence-green text-sm font-medium">{sector.name}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">{sector.name} Automation</h2>
                    <p className="text-muted-foreground leading-relaxed">{sector.description}</p>
                    {sectorImage && (
                      <div className="mt-5 aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20 lg:hidden">
                        <img src={sectorImage} alt={sector.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    {sectorImage && (
                      <div className="hidden lg:block aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                        <img src={sectorImage} alt={sector.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-3">
                        <span className="w-8 h-0.5 bg-brass-gold flex-shrink-0" />
                        Key Capabilities
                      </h3>
                      <div className="space-y-2">
                        {sector.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center gap-3 bg-card border border-gunmetal/10 px-4 py-3">
                            <span className="w-6 h-6 bg-defence-green/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-defence-green">{i + 1}</span>
                            </span>
                            <span className="text-muted-foreground text-sm">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section className="section-padding">
          <div className="container-width px-4">
            <div className="p-8 sm:p-12 text-center bg-defence-green">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">{ctaTitle}</h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">{ctaDesc}</p>
              <Link to="/contact" className="btn-accent inline-flex items-center gap-2">Request a Quote</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndustrialAutomationPage;
