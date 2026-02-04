import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Shield, Train, GraduationCap, Factory, Building2, 
  FlaskConical, Cog, Award, CheckCircle 
} from "lucide-react";
import { Link } from "react-router-dom";

const ClientsPage = () => {
  const clients = [
    {
      name: "Indian Army",
      description: "Trusted partner for defense electronics, fire control systems, and military training simulators.",
      icon: Shield,
      category: "Defense",
      highlight: true,
    },
    {
      name: "Indian Railways",
      description: "Providing automation and control solutions for railway infrastructure and operations.",
      icon: Train,
      category: "Government",
      highlight: true,
    },
    {
      name: "Engineering Colleges",
      description: "Supplying educational equipment and lab instruments for engineering institutions.",
      icon: GraduationCap,
      category: "Education",
    },
    {
      name: "Polytechnic Colleges",
      description: "Technical training equipment and automation systems for vocational education.",
      icon: GraduationCap,
      category: "Education",
    },
    {
      name: "Science Colleges",
      description: "Data acquisition and measurement systems for scientific research and education.",
      icon: FlaskConical,
      category: "Education",
    },
    {
      name: "Pipe Manufacturing Plants",
      description: "Industrial automation solutions for pipe manufacturing and quality control.",
      icon: Factory,
      category: "Manufacturing",
    },
    {
      name: "Automobile Manufacturing Plants",
      description: "Control systems and automation equipment for automotive manufacturing processes.",
      icon: Cog,
      category: "Manufacturing",
    },
    {
      name: "Research Institutes",
      description: "Custom data acquisition and embedded systems for research applications.",
      icon: FlaskConical,
      category: "Research",
    },
  ];

  const sectors = [
    { name: "Defense", count: 2, icon: Shield },
    { name: "Education", count: 3, icon: GraduationCap },
    { name: "Manufacturing", count: 2, icon: Factory },
    { name: "Research", count: 1, icon: FlaskConical },
  ];

  const testimonials = [
    {
      text: "DIPL has been instrumental in providing reliable fire control systems for our operations. Their commitment to quality and precision is exceptional.",
      source: "Defense Sector Client",
    },
    {
      text: "The data acquisition systems from Digital Integrator have significantly improved our research capabilities. Excellent technical support.",
      source: "Research Institute",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-secondary/30">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="section-divider" />
                <span className="text-teal-green font-semibold text-sm uppercase tracking-wider">
                  Our Clients
                </span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                Trusted by Industry Leaders
              </h1>
              <p className="text-lg text-muted-foreground">
                For over 27 years, we've built lasting partnerships with defense organizations, 
                government bodies, educational institutions, and manufacturing giants across India.
              </p>
            </div>
          </div>
        </section>

        {/* Sectors Overview */}
        <section className="py-12 bg-background">
          <div className="container-width">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {sectors.map((sector) => (
                <div key={sector.name} className="card-gov p-5 text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-sm bg-teal-green/10 flex items-center justify-center group-hover:bg-precision-orange/10 transition-colors">
                    <sector.icon className="w-6 h-6 text-teal-green group-hover:text-precision-orange transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground">{sector.name}</h3>
                  <p className="text-muted-foreground text-sm">{sector.count}+ clients</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="section-padding bg-secondary/30">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground flex items-center justify-center gap-3">
                <span className="w-8 h-0.5 bg-precision-orange" />
                Our Valued Clientele
                <span className="w-8 h-0.5 bg-precision-orange" />
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className={`card-gov p-6 group transition-all duration-300 ${
                    client.highlight 
                      ? "border-teal-green/30 bg-teal-green/5" 
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-sm flex items-center justify-center transition-colors ${
                      client.highlight 
                        ? "bg-teal-green/20 group-hover:bg-precision-orange/20" 
                        : "bg-teal-green/10 group-hover:bg-precision-orange/10"
                    }`}>
                      <client.icon className={`w-6 h-6 transition-colors ${
                        client.highlight ? "text-teal-green group-hover:text-precision-orange" : "text-teal-green group-hover:text-precision-orange"
                      }`} />
                    </div>
                    {client.highlight && (
                      <span className="text-xs bg-teal-green text-white px-2 py-1 rounded-sm">
                        Key Client
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {client.category}
                  </span>
                  <h3 className="text-lg font-display font-semibold text-foreground mt-1 mb-2">
                    {client.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {client.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="section-divider" />
                  <span className="text-teal-green font-semibold text-sm uppercase tracking-wider">
                    Why Choose Us
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                  A Partner You Can Trust
                </h2>
                <ul className="space-y-4">
                  {[
                    "27+ years of proven expertise in defense and industrial electronics",
                    "ISO certified quality management systems",
                    "Dedicated R&D team for custom solutions",
                    "Pan-India service and support network",
                    "Long-term partnerships with government organizations",
                    "Continuous innovation and technology upgrades",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-green flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="card-gov p-6">
                    <Award className="w-8 h-8 text-precision-orange mb-4" />
                    <p className="text-foreground italic mb-4">"{testimonial.text}"</p>
                    <p className="text-muted-foreground text-sm">— {testimonial.source}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-width">
            <div className="rounded-sm p-8 sm:p-12 text-center bg-navy-blue">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Join Our Growing Client Base
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Discover how our solutions can transform your operations. 
                Let's discuss your requirements.
              </p>
              <Link to="/contact" className="btn-accent inline-flex items-center gap-2 rounded-sm">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClientsPage;
