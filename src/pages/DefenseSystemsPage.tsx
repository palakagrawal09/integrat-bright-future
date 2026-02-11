import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Crosshair, Target, Shield, Eye, Search, Radio } from "lucide-react";
import { Link } from "react-router-dom";

const DefenseSystemsPage = () => {
  const fireControlSystems = [
    {
      name: "AMFDC MK-II",
      description: "Advanced Mortar Fire Direction Computer Mk-II — next-generation ballistic computation system for mortar batteries with enhanced target tracking and fire mission processing.",
      icon: Crosshair,
    },
    {
      name: "AMFDC MK-III",
      description: "Third-generation Mortar Fire Direction Computer with improved accuracy, faster computation, and ruggedized design for extreme field conditions.",
      icon: Crosshair,
    },
    {
      name: "TEEVRA (FDC for CSWs)",
      description: "Fire Direction Computer for Crew Served Weapons including MMG, AGL, and AGS-30 platforms. Provides real-time ballistic solutions for multiple weapon types.",
      icon: Target,
    },
  ];

  const inspectionSystems = [
    {
      name: "Gun Barrel Inspection System (GBINP-17)",
      description: "Precision gun barrel inspection system for internal bore analysis, detecting cracks, pitting, and wear patterns in artillery barrels.",
      icon: Search,
    },
    {
      name: "LCGS / HMRVS",
      description: "Laser-based Combat Gun Sight and Hand-held Mine/Route Verification System for field safety and operational readiness.",
      icon: Eye,
    },
  ];

  const surveillanceSystems = [
    {
      name: "FSD Flexible",
      description: "Flexible Field Surveillance Device for counter-insurgency operations. Provides real-time area monitoring and threat detection in diverse terrain.",
      icon: Radio,
    },
    {
      name: "INVSS-16/19",
      description: "Integrated Night Vision Surveillance System — multi-spectral surveillance platform for border security and field intelligence operations.",
      icon: Eye,
    },
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
                  Defence Systems
                </span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                Mission-Critical Defence Electronics
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Precision-engineered fire control systems, inspection equipment, and field surveillance 
                platforms trusted by the Indian Armed Forces.
              </p>
            </div>
          </div>
        </section>

        {/* Fire Control Systems */}
        <section id="fire-control" className="section-padding bg-defence-green/5">
          <div className="container-width">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-defence-green" />
                <span className="text-defence-green text-sm font-medium">Fire Control Systems</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Fire Direction Computers & Weapon FCS
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                Advanced ballistic computation and targeting systems for mortar batteries and crew served weapons.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fireControlSystems.map((product) => (
                <div key={product.name} className="card-defence p-6 group">
                  <div className="w-12 h-12 bg-defence-green/10 flex items-center justify-center mb-4 group-hover:bg-brass-gold/15 transition-colors duration-300">
                    <product.icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspection & Safety */}
        <section id="inspection" className="section-padding bg-background">
          <div className="container-width">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-brass-gold/10 border border-brass-gold/20 px-4 py-2 mb-4">
                <Search className="w-4 h-4 text-brass-gold" />
                <span className="text-brass-gold text-sm font-medium">Inspection & Safety</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Inspection & Safety Systems
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                Equipment integrity and field safety systems for artillery maintenance and route verification.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {inspectionSystems.map((product) => (
                <div key={product.name} className="card-defence p-6 group">
                  <div className="w-12 h-12 bg-brass-gold/10 flex items-center justify-center mb-4 group-hover:bg-defence-green/10 transition-colors duration-300">
                    <product.icon className="w-6 h-6 text-brass-gold group-hover:text-defence-green transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Counter-Insurgency & Surveillance */}
        <section id="surveillance" className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-4">
                <Eye className="w-4 h-4 text-defence-green" />
                <span className="text-defence-green text-sm font-medium">Field Surveillance</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Counter-Insurgency & Field Surveillance
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                Surveillance and monitoring platforms for border security and counter-insurgency operations.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {surveillanceSystems.map((product) => (
                <div key={product.name} className="card-defence p-6 group">
                  <div className="w-12 h-12 bg-defence-green/10 flex items-center justify-center mb-4 group-hover:bg-brass-gold/15 transition-colors duration-300">
                    <product.icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-width">
            <div className="p-8 sm:p-12 text-center bg-defence-green">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Need a Defence-Grade Solution?
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">
                Our engineering team specializes in custom defence electronics tailored to operational requirements.
              </p>
              <Link to="/contact" className="btn-accent inline-flex items-center gap-2">
                Request Technical Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DefenseSystemsPage;
