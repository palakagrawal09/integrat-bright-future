import { Building2, Calendar, Users, IndianRupee } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: Calendar,
      value: "1997",
      label: "Established",
    },
    {
      icon: Building2,
      value: "₹1.5 Cr",
      label: "Authorized Capital",
    },
    {
      icon: IndianRupee,
      value: "₹1.1 Cr",
      label: "Paid-up Capital",
    },
    {
      icon: Users,
      value: "27+",
      label: "Years Experience",
    },
  ];

  return (
    <section id="about" className="section-padding bg-sand-dark/30">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">
              About Us
            </span>
            <span className="section-divider" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            A Legacy of Excellence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            For over two decades, Digital Integrator has been a trusted partner in Defence Electronics 
            and Industrial Automation across India.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card-defence p-6 text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-defence-green/10 flex items-center justify-center group-hover:bg-brass-gold/15 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Right - Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-semibold text-foreground">
                Trusted by Defence & Industry Since 1997
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Digital Integrator Private Limited (CIN: U31909MP1997PTC012011) is a 
                distinguished private company incorporated on December 19, 1997. 
                Registered with the Registrar of Companies, Gwalior, we specialize in 
                Defence Electronics, Training Simulators, and Industrial Automation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With our state-of-the-art facility located in the Electronic Complex, 
                Pardeshipura, Indore, we have built a reputation for quality, reliability, 
                and precision engineering — serving the Indian Armed Forces and major industries.
              </p>
            </div>

            {/* Leadership */}
            <div className="pt-4 border-t border-gunmetal/20">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-brass-gold" />
                Leadership
              </h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-defence-green/5 border border-gunmetal/10 px-4 py-3">
                  <div className="w-10 h-10 bg-defence-green/15 flex items-center justify-center">
                    <span className="text-defence-green font-semibold text-sm">SV</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Sunil Vasantrao Vyas</p>
                    <p className="text-muted-foreground text-xs">Director</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-defence-green/5 border border-gunmetal/10 px-4 py-3">
                  <div className="w-10 h-10 bg-defence-green/15 flex items-center justify-center">
                    <span className="text-defence-green font-semibold text-sm">HV</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Hemant Verma</p>
                    <p className="text-muted-foreground text-xs">Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
