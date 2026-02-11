import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/dipl-logo.jpg";

interface NavItem {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks: NavItem[] = [
    { href: "/", label: "Home" },
    {
      label: "About DIPL",
      children: [
        { href: "/about", label: "Company Overview" },
        { href: "/about#leadership", label: "Leadership & Advisory Board" },
        { href: "/about#certifications", label: "Certifications & Compliance" },
        { href: "/clients", label: "Clients & Strategic Partners" },
      ],
    },
    {
      label: "Defence Systems",
      children: [
        { href: "/defence-systems#fire-control", label: "Fire Control Systems" },
        { href: "/defence-systems#inspection", label: "Inspection & Safety Systems" },
        { href: "/defence-systems#surveillance", label: "Counter-Insurgency & Surveillance" },
      ],
    },
    {
      label: "Simulators & Training",
      href: "/simulators",
    },
    {
      label: "Industrial Automation",
      children: [
        { href: "/industrial-automation#oil-gas", label: "Oil & Gas" },
        { href: "/industrial-automation#mining", label: "Mining" },
        { href: "/industrial-automation#railways", label: "Railways" },
        { href: "/industrial-automation#pharma", label: "Pharma & Process" },
      ],
    },
    {
      label: "Services",
      href: "/services",
    },
    { href: "/gem-products", label: "Products on GeM" },
    { href: "/news", label: "News & Media" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path?: string) => path && location.pathname === path;

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-defence-green backdrop-blur-sm border-b border-white/10">
      <div className="h-1 bg-brass-gold" />

      <div className="container-width section-padding !py-0">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <img
              src={logo}
              alt="DIPL - Digital Integrator Pvt. Ltd."
              className="h-10 sm:h-12 w-auto group-hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 font-medium text-xs uppercase tracking-wide transition-colors ${
                      openDropdown === link.label
                        ? "text-brass-gold"
                        : "text-white/80 hover:text-brass-gold"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>

                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-0 min-w-[240px] bg-white border border-gunmetal/15 shadow-lg z-50">
                      <div className="py-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-defence-green/10 hover:text-defence-green transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href!}
                  className={`px-3 py-2 font-medium text-xs uppercase tracking-wide transition-colors ${
                    isActive(link.href)
                      ? "text-brass-gold"
                      : "text-white/80 hover:text-brass-gold"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              to="/contact"
              className="btn-accent text-xs !py-2 !px-4 ml-2"
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-defence-green border-t border-white/10 max-h-[80vh] overflow-y-auto">
          <nav className="container-width section-padding !py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    className="w-full flex items-center justify-between py-3 uppercase tracking-wide text-sm text-white/80 hover:text-brass-gold font-medium"
                    onClick={() =>
                      setOpenMobileDropdown(
                        openMobileDropdown === link.label ? null : link.label
                      )
                    }
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openMobileDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMobileDropdown === link.label && (
                    <div className="pl-4 pb-2 space-y-1 border-l-2 border-brass-gold/30 ml-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block py-2 text-sm text-white/60 hover:text-brass-gold transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href!}
                  className={`font-medium py-3 uppercase tracking-wide text-sm ${
                    isActive(link.href)
                      ? "text-brass-gold"
                      : "text-white/80 hover:text-brass-gold"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              to="/contact"
              className="btn-accent text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
