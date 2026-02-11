import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Fuel, Mountain, Train, FlaskConical, Cpu, Gauge, Thermometer, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import oilGasImg from "@/assets/oil-gas-automation.jpg";

const IndustrialAutomationPage = () => {
  const sectors = [
    {
      id: "oil-gas",
      name: "Oil & Gas",
      icon: Fuel,
      description: "Automation technology is proving to be a cost-saving investment for oil and gas industry. Automation is used to improve various processes from boiler diagnostics to actual drilling. Automated tech is also compatible with data analysis making the system work error free. Digital Integrator aspires to offer customized solutions for oil and gas industry.",
      capabilities: [
        "Boiler diagnostics automation",
        "Drilling process automation",
        "Data analysis compatible systems",
        "Customized solutions for oil & gas",
      ],
      image: oilGasImg,
    },
    {
      id: "mining",
      name: "Mining",
      icon: Mountain,
      description: "Automation in mining has a huge scope for increasing efficiency and efficacy; it assists human labour for better working and state of art safe and efficient working for quality end-to-end processes. We offer customized solutions and consultancy based on problem statements from prospects in the mining industry.",
      capabilities: [
        "Teleoperated mining equipment systems",
        "Robotic hardware & software for autonomous units",
        "Vehicle telemetry and positioning systems",
        "Safety automation for mine sites",
      ],
    },
    {
      id: "railways",
      name: "Railways",
      icon: Train,
      description: "Automation and control solutions for Indian Railways — signaling support systems, rolling stock monitoring, and station automation.",
      capabilities: [
        "Rolling stock monitoring systems",
        "Station automation controls",
        "Real-time data acquisition",
        "Embedded controllers for rail systems",
      ],
    },
    {
      id: "pharma",
      name: "Pharma & Process Automation",
      icon: FlaskConical,
      description: "Precision automation for pharmaceutical manufacturing — temperature-critical process controls, cleanroom monitoring, and batch processing systems.",
      capabilities: [
        "Temperature monitoring & control",
        "Cleanroom environmental systems",
        "Batch process automation",
        "Data logging for compliance",
      ],
    },
  ];

  const coreTechnologies = [
    { icon: Cpu, name: "Microcontroller-Based Automation" },
    { icon: Gauge, name: "Data Acquisition Systems" },
    { icon: Thermometer, name: "Temperature Monitoring & Control" },
    { icon: Settings, name: "FPGA-Based Control Systems" },
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
                  Industrial Automation
                </span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                Automation Across Industries
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Complete automation and control solutions for Oil & Gas, Mining, Railways, 
                and Pharmaceutical industries — built on decades of engineering expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Core Technologies */}
        <section className="py-12 bg-background">
          <div className="container-width">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {coreTechnologies.map((tech) => (
                <div key={tech.name} className="card-defence p-5 text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 bg-brass-gold/10 flex items-center justify-center group-hover:bg-defence-green/10 transition-colors duration-300">
                    <tech.icon className="w-6 h-6 text-brass-gold group-hover:text-defence-green transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{tech.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sector Sections */}
        {sectors.map((sector, index) => (
          <section
            key={sector.id}
            id={sector.id}
            className={`section-padding ${index % 2 === 0 ? "bg-sand-dark/30" : "bg-background"}`}
          >
            <div className="container-width">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-4">
                    <sector.icon className="w-4 h-4 text-defence-green" />
                    <span className="text-defence-green text-sm font-medium">{sector.name}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                    {sector.name} Automation
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{sector.description}</p>
                  {"image" in sector && sector.image && (
                    <img src={sector.image as string} alt={sector.name} className="w-full h-auto mt-4 border border-gunmetal/15" />
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-0.5 bg-brass-gold" />
                    Key Capabilities
                  </h3>
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
          </section>
        ))}

        {/* CTA */}
        <section className="section-padding">
          <div className="container-width">
            <div className="p-8 sm:p-12 text-center bg-defence-green">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Need a Custom Automation Solution?
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">
                Our engineering team designs and deploys bespoke automation systems tailored to your industry.
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

export default IndustrialAutomationPage;
