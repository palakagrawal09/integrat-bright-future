import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Target, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import atgmMissile from "@/assets/atgm-missile.jpg";
import atgmScope from "@/assets/atgm-simulator-scope.jpg";

const SimulatorsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="section-divider" />
                  <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">
                    Simulators & Training
                  </span>
                  <span className="section-divider" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                  Training Systems for Combat Readiness
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Advanced simulation platforms for ATGM and weapon training — 
                  enabling realistic, cost-effective combat preparation for the Indian Armed Forces.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ATGM Simulator */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-2">
                    <Target className="w-4 h-4 text-defence-green" />
                    <span className="text-defence-green text-sm font-medium">ATGM (SV21) Simulator</span>
                  </div>
                  <h2 className="text-3xl font-display font-bold text-foreground">
                    ATGM Crew Training Simulator
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The ATGM (SV21) Simulator is an indigenously developed ATGM Crew Training Simulator system 
                    designed 100% indigenously. The simulator system is designed specifically for the training 
                    of missile launcher crew.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    The system has a comprehensive database of 3D CGI scenarios that takes into account 
                    realistic missile dynamics. It facilitates the introduction of technical faults on missiles 
                    and has features that offer different targets.
                  </p>
                  <h4 className="font-semibold text-foreground text-sm pt-2">Key Capabilities</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-defence-green mt-0.5 flex-shrink-0" />
                      Comprehensive 3D CGI scenario database with realistic missile dynamics
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-defence-green mt-0.5 flex-shrink-0" />
                      Environmental effects: rain, fog, visibility, cloud cover, temperature, wind
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-defence-green mt-0.5 flex-shrink-0" />
                      Technical fault simulation on missiles
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-defence-green mt-0.5 flex-shrink-0" />
                      Realistic sounds and night training provisions
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-defence-green mt-0.5 flex-shrink-0" />
                      Multiple target types and engagement scenarios
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                    <img src={atgmMissile} alt="ATGM Missile Launch" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                    <img src={atgmScope} alt="ATGM Simulator Scope View" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Why Simulation */}
        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-8 h-0.5 bg-brass-gold" />
                    Why Simulation Training?
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "100% indigenously developed system",
                      "Cost-effective alternative to live-fire training",
                      "Weather-independent indoor operation",
                      "Comprehensive performance tracking and scoring",
                      "Realistic weapon dynamics and recoil simulation",
                      "Customizable scenarios for mission-specific preparation",
                    ].map((feature, i) => (
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
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">Custom Simulators</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We design and build custom training simulators tailored to specific weapon systems 
                    and operational requirements.
                  </p>
                  <Link to="/enquiry" className="btn-primary inline-flex items-center gap-2">
                    Discuss Requirements
                  </Link>
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
