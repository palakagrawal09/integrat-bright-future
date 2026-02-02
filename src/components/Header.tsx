import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container-width section-padding !py-0">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="text-primary-foreground font-display font-bold text-lg">
                DIPL
              </span>
              <span className="text-primary-foreground/70 text-xs block -mt-1">
                Digital Integrator
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-foreground/80 hover:text-primary-foreground font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-accent text-sm !py-2 !px-4"
            >
              Get in Touch
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10">
          <nav className="container-width section-padding !py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-foreground/80 hover:text-primary-foreground font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-accent text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
