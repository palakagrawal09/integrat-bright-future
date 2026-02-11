import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Defence manufacturing facility"
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
          {/* Badge - Subtle */}
          <div className="inline-flex items-center gap-2 bg-brass-gold/20 border border-brass-gold/40 px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-brass-gold rounded-full" />
            <span className="text-brass-gold text-sm font-semibold tracking-wide uppercase">
              Est. 1990 • ISO 9001:2015 Certified
            </span>
          </div>

          {/* Main Heading - Strong, Minimal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6 animate-slide-up">
            Engineering Defence-Grade
            <br />
            <span className="text-brass-gold">Systems for India</span>
          </h1>

          {/* Description - Concise */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Organisation dedicated to product development. Complete solutions for Defence, 
            Industrial Automation, Simulators & Training Systems since 1990.
          </p>

          {/* CTA Buttons - Clear Hierarchy */}
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link 
              to="/products" 
              className="btn-accent inline-flex items-center gap-2 group"
            >
              Explore Capabilities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="https://gem.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline text-white border-white/40 hover:border-brass-gold inline-flex items-center gap-2"
            >
              Products on GeM
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-brass-gold rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
