import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Target, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/use-page-content";
import atgmMissile from "@/assets/atgm-missile.jpg";
import atgmScope from "@/assets/atgm-simulator-scope.jpg";

const SimulatorsPage = () => {
  const { get, getJSON } = usePageContent("simulators");

  const heroTitle = get("hero", "title", "Training Systems for Combat Readiness");
  const heroDesc = get("hero", "description", "Advanced simulation platforms for ATGM and weapon training — enabling realistic, cost-effective combat preparation for the Indian Armed Forces.");
  const atgmTitle = get("atgm", "title", "ATGM Crew Training Simulator");
  const atgmDesc = get("atgm", "description", "The ATGM (SV21) Simulator is an indigenously developed ATGM Crew Training Simulator system designed 100% indigenously. The simulator system is designed specifically for the training of missile launcher crew.");
  const atgmDesc2 = get("atgm", "description_2", "The system has a comprehensive database of 3D CGI scenarios that takes into account realistic missile dynamics. It facilitates the introduction of technical faults on missiles and has features that offer different targets.");
  const atgmCapabilities = getJSON<string[]>("atgm", "capabilities", ["Comprehensive 3D CGI scenario database with realistic missile dynamics","Environmental effects: rain, fog, visibility, cloud cover, temperature, wind","Technical fault simulation on missiles","Realistic sounds and night training provisions","Multiple target types and engagement scenarios"]);
  const whyTitle = get("why", "title", "Why Simulation Training?");
  const whyFeatures = getJSON<string[]>("why", "features", ["100% indigenously developed system","Cost-effective alternative to live-fire training","Weather-independent indoor operation","Comprehensive performance tracking and scoring","Realistic weapon dynamics and recoil simulation","Customizable scenarios for mission-specific preparation"]);
  const customTitle = get("custom", "title", "Custom Simulators");
  const customDesc = get("custom", "description", "We design and build custom training simulators tailored to specific weapon systems and operational requirements.");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="section-divider" />
                  <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Simulators & Training</span>
                  <span className="section-divider" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">{heroTitle}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{heroDesc}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-width">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-2">
                    <Target className="w-4 h-4 text-defence-green" />
                    <span className="text-defence-green text-sm font-medium">ATGM (SV21) Simulator</span>
                  </div>
                  <h2 className="text-3xl font-display font-bold text-foreground">{atgmTitle}</h2>
                  <p className="text-muted-foreground leading-relaxed">{atgmDesc}</p>
                  <p className="text-muted-foreground leading-relaxed text-sm">{atgmDesc2}</p>
                  <h4 className="font-semibold text-foreground text-sm pt-2">Key Capabilities</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {atgmCapabilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-defence-green mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                    <img src={atgmMissile} alt="ATGM Missile Launch" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                    <img src={atgmScope} alt="ATGM Simulator Scope View" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-8 h-0.5 bg-brass-gold" />
                    {whyTitle}
                  </h2>
                  <ul className="space-y-4">
                    {whyFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-defence-green flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-defence p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-defence-green/10 flex items-center justify-center">
                    <Target className="w-10 h-10 text-defence-green" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">{customTitle}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{customDesc}</p>
                  <Link to="/enquiry" className="btn-primary inline-flex items-center gap-2">Discuss Requirements</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SimulatorsPage;
