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
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Products & Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                Defense & Industrial Solutions
              </h1>
              <p className="text-lg text-muted-foreground">
                From advanced fire control systems for the Indian Armed Forces to cutting-edge 
                industrial automation - we deliver precision-engineered solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Defense Products */}
        <section className="section-padding bg-primary/5">
          <div className="container-width">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Defense Electronics</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Military & Defense Products
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Trusted by the Indian Army for mission-critical fire control systems and training simulators.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {defenseProducts.map((product) => (
                <div
                  key={product.name}
                  className="card-industrial p-6 group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <product.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
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
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
                <Cpu className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm font-medium">Industrial Automation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Industrial Automation & Controls
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Complete solutions for industrial automation serving research institutes and manufacturing plants.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industrialProducts.map((product) => (
                <div
                  key={product.name}
                  className="card-industrial p-5 group hover:border-accent/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <product.icon className="w-5 h-5 text-accent" />
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
            <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ background: "var(--gradient-hero)" }}>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary-foreground mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
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
