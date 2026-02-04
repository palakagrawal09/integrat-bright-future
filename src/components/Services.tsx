import { Cpu, Zap, Settings, ShieldCheck, Wrench, Factory } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="section-divider" />
            <span className="text-teal-green font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <span className="section-divider" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            What We Manufacture
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Specializing in Defense Electronics and Industrial Automation (NIC 3190), we deliver 
            precision-engineered solutions for critical applications.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card-gov p-6 group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-sm bg-teal-green/10 flex items-center justify-center mb-5 group-hover:bg-precision-orange/10 transition-all duration-300">
                <service.icon className="w-7 h-7 text-teal-green group-hover:text-precision-orange transition-colors" />
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
          <Link to="/products" className="btn-primary inline-flex items-center gap-2 rounded-sm hover:bg-precision-orange">
            View All Products & Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
