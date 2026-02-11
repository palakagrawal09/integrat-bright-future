import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Radar, Target, Crosshair, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const SimulatorsPage = () => {
  const simulators = [
    {
      name: "ATGM Simulator",
      description: "Indoor Anti-Tank Guided Missile simulator for operator training and skill development. Provides realistic engagement scenarios with comprehensive performance tracking and scoring.",
      icon: Target,
      category: "Missile Training",
    },
    {
      name: "81 Mm Mortar Firing Simulator Mk-II",
      description: "Advanced mortar firing training simulator with realistic recoil simulation, ballistic computation training, and multi-scenario combat environments.",
      icon: Radar,
      category: "Artillery Training",
    },
    {
      name: "81 Mm Mortar Firing Simulator Mk-I",
      description: "First-generation mortar firing simulator providing effective crew training capabilities with field-accurate simulation parameters.",
      icon: Radar,
      category: "Artillery Training",
    },
    {
      name: "Weapon Training Simulators",
      description: "Comprehensive weapon handling and firing simulators for various infantry weapons. Cost-effective training with realistic weapon dynamics and scenario-based exercises.",
      icon: Crosshair,
      category: "Infantry Training",
    },
  ];

  const features = [
    "Realistic weapon dynamics and recoil simulation",
    "Multi-scenario combat training environments",
    "Performance tracking and scoring systems",
    "Cost-effective alternative to live-fire training",
    "Indoor operation — weather-independent training",
    "Customizable scenarios for mission-specific preparation",
  ];

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
                  Simulators & Training
                </span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                Training Systems for Combat Readiness
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Advanced simulation platforms for ATGM, mortar, and weapon training — 
                enabling realistic, cost-effective combat preparation for the Indian Armed Forces.
              </p>
            </div>
          </div>
        </section>

        {/* Simulators Grid */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid sm:grid-cols-2 gap-6">
              {simulators.map((sim) => (
                <div key={sim.name} className="card-defence p-6 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-defence-green/10 flex items-center justify-center group-hover:bg-brass-gold/15 transition-colors duration-300">
                      <sim.icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                    </div>
                    <span className="text-xs bg-defence-green/10 text-defence-green px-2 py-1">
                      {sim.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">{sim.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{sim.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-brass-gold" />
                  Why Simulation Training?
                </h2>
                <ul className="space-y-4">
                  {features.map((feature, i) => (
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
                  We design and build custom training simulators tailored to specific weapon systems and operational requirements.
                </p>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Discuss Requirements
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SimulatorsPage;
