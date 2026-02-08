import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Crosshair, Radar, Cpu, Thermometer, Ruler, Radio, 
  Gauge, Monitor, Settings, Zap, Shield, Target 
} from "lucide-react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const defenseProducts = [
    {
      name: "Teevra Mk-II",
      description: "Fire Direction Computer (FDC) for Crew Served Weapons (CSWs). Advanced ballistic computation and target tracking system.",
      category: "Fire Control Systems",
      icon: Crosshair,
    },
    {
      name: "Weapon Fire Control System",
      description: "Integrated weapon fire control solution for precision targeting and engagement in military operations.",
      category: "Fire Control Systems",
      icon: Target,
    },
    {
      name: "81 Mm Mortar Firing Simulator Mk-II",
      description: "Advanced mortar firing training simulator for realistic combat training scenarios.",
      category: "Training Simulators",
      icon: Radar,
    },
    {
      name: "81 Mm Mortar Firing Simulator Mk-I",
      description: "First generation mortar firing simulator providing effective crew training capabilities.",
      category: "Training Simulators",
      icon: Radar,
    },
    {
      name: "MMG-AGL-AGS-30 Fire Control System",
      description: "Multi-weapon fire control system supporting MMG, AGL, and AGS-30 platforms (Teevra Mk-II).",
      category: "Fire Control Systems",
      icon: Shield,
    },
    {
      name: "ATGM Simulator",
      description: "Indoor Anti-Tank Guided Missile simulator for operator training and skill development.",
      category: "Training Simulators",
      icon: Target,
    },
  ];

  const industrialProducts = [
    {
      name: "PC Based Data Acquisition Systems",
      description: "Complete PC-based solutions for data acquisition, monitoring and controls across industrial applications.",
      icon: Monitor,
    },
    {
      name: "Microprocessor/Microcontroller Automation",
      description: "Advanced automation systems using microprocessor and microcontroller technology for monitoring and control.",
      icon: Cpu,
    },
    {
      name: "Real Time & Embedded Controllers",
      description: "High-performance real-time and embedded controller solutions for critical industrial processes.",
      icon: Settings,
    },
    {
      name: "Data Loggers",
      description: "Versatile data logging solutions for various industrial and research applications.",
      icon: Gauge,
    },
    {
      name: "Temperature Monitoring & Controls",
      description: "Precision temperature monitoring and control systems for industrial processes.",
      icon: Thermometer,
    },
    {
      name: "Length Measurement & Controls",
      description: "Accurate length measurement and control systems for manufacturing applications.",
      icon: Ruler,
    },
    {
      name: "Signal Conditioning",
      description: "High-quality signal conditioning equipment for accurate data acquisition.",
      icon: Radio,
    },
    {
      name: "FPGA-Based Control & Acquisitions",
      description: "Advanced FPGA-based solutions for high-speed control and data acquisition.",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">
                  Products & Services
                </span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                Defence & Industrial Solutions
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From advanced fire control systems for the Indian Armed Forces to cutting-edge 
                industrial automation - we deliver precision-engineered solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Defense Products */}
        <section className="section-padding bg-defence-green/5">
          <div className="container-width">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-defence-green" />
                <span className="text-defence-green text-sm font-medium">Defence Electronics</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Military & Defence Products
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                Trusted by the Indian Army for mission-critical fire control systems and training simulators.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {defenseProducts.map((product) => (
                <div
                  key={product.name}
                  className="card-defence p-6 group transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-defence-green/10 flex items-center justify-center group-hover:bg-brass-gold/15 transition-colors duration-300">
                      <product.icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                    </div>
                    <span className="text-xs bg-defence-green/10 text-defence-green px-2 py-1">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industrial Products */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-brass-gold/10 border border-brass-gold/20 px-4 py-2 mb-4">
                <Cpu className="w-4 h-4 text-brass-gold" />
                <span className="text-brass-gold text-sm font-medium">Industrial Automation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Industrial Automation & Controls
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                Complete solutions for industrial automation serving research institutes and manufacturing plants.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industrialProducts.map((product) => (
                <div
                  key={product.name}
                  className="card-defence p-5 group"
                >
                  <div className="w-11 h-11 bg-brass-gold/10 flex items-center justify-center mb-4 group-hover:bg-defence-green/10 transition-colors duration-300">
                    <product.icon className="w-5 h-5 text-brass-gold group-hover:text-defence-green transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-display font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-width">
            <div className="p-8 sm:p-12 text-center bg-defence-green">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">
                Our engineering team can design and manufacture bespoke automation and control systems 
                tailored to your specific requirements.
              </p>
              <Link to="/contact" className="btn-accent inline-flex items-center gap-2">
                Request a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
