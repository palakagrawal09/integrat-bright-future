import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const highlights = [
    "Established 1997",
    "Defense & Industrial",
    "Pan-India Presence",
  ];
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Industrial electrical equipment manufacturing facility"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: "var(--gradient-overlay)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-width section-padding w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-accent text-sm font-medium">
              27+ Years of Excellence
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Powering India's{" "}
            <span className="text-gradient">Electrical Future</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Digital Integrator Private Limited is a leading manufacturer of electrical equipment, 
            delivering innovative solutions since 1997. Trusted by industries across India.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-4 mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-primary-foreground/90"
              >
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/products" className="btn-accent inline-flex items-center gap-2 group">
              Explore Our Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="btn-outline text-primary-foreground">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
