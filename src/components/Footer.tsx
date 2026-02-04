import { Phone, Mail, MapPin, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products & Services" },
    { href: "/clients", label: "Our Clients" },
    { href: "/contact", label: "Contact" },
  ];

  const products = [
    "Fire Control Systems",
    "Training Simulators",
    "Data Acquisition",
    "Industrial Automation",
  ];

  return (
    <footer className="bg-navy-blue text-white">
      {/* Orange accent line at top */}
      <div className="h-1 bg-precision-orange" />
      
      <div className="container-width section-padding !py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="mb-4 inline-block">
              <img 
                src={logo} 
                alt="DIPL - Digital Integrator Pvt. Ltd." 
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm mb-4">
              Complete solutions for Industrial Automation & Defense Electronics since 1997.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <a 
                href="https://www.linkedin.com/company/digital-integrator-pvt-ltd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-precision-orange px-3 py-2 rounded-sm transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-precision-orange" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-precision-orange text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-precision-orange" />
              Products
            </h4>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product}>
                  <span className="text-white/70 text-sm">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-precision-orange" />
              Contact
            </h4>
            <address className="not-italic space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-precision-orange flex-shrink-0" />
                <div>
                  <p>46-A, Electronic Complex</p>
                  <p>Pardeshipura, Indore</p>
                  <p>Madhya Pradesh - 452001</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-precision-orange" />
                <a href="tel:08044566679" className="hover:text-precision-orange transition-colors">
                  08044566679 (Ext: 9370)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-precision-orange" />
                <a
                  href="mailto:diplsales@diplindia.com"
                  className="hover:text-precision-orange transition-colors"
                >
                  diplsales@diplindia.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} Digital Integrator Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-white/50 text-xs">
            <span>CIN: U31909MP1997PTC012011</span>
            <span>GST: 23AAACD9928P1Z5</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
