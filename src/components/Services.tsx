import { Cpu, Zap, Settings, ShieldCheck, Wrench, Factory } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Cpu,
      title: "Control Panels",
      description: "Custom-designed electrical control panels for industrial automation and process control.",
    },
    {
      icon: Zap,
      title: "Power Distribution",
      description: "Complete power distribution solutions including switchgear and distribution boards.",
    },
    {
      icon: Settings,
      title: "Automation Systems",
      description: "PLC-based automation systems for manufacturing and industrial applications.",
    },
    {
      icon: ShieldCheck,
      title: "Safety Systems",
      description: "Electrical safety equipment and protection systems for critical infrastructure.",
    },
    {
      icon: Wrench,
      title: "Maintenance Services",
      description: "Comprehensive maintenance and repair services for electrical installations.",
    },
    {
      icon: Factory,
      title: "Custom Manufacturing",
      description: "Bespoke electrical equipment manufacturing to meet specific industry requirements.",
    },
  ];

  return (
    <section id="services" className="section-padding bg-secondary/50">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            What We Manufacture
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Specializing in electrical equipment manufacturing (NIC 3190), we deliver 
            high-quality solutions across diverse industrial sectors.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card-industrial p-6 group hover:border-accent/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Discuss Your Requirements
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
