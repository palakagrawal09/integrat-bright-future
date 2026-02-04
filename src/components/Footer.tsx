import { Phone } from "lucide-react";
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
    <footer className="bg-primary text-primary-foreground">
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
            <p className="text-primary-foreground/70 text-sm mb-4">
              Complete solutions for Industrial Automation & Defense Electronics since 1997.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-accent" />
              <a href="tel:08044566679" className="text-accent hover:underline">
                08044566679
              </a>
              <span className="text-primary-foreground/50">Ext: 9370</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product}>
                  <span className="text-primary-foreground/70 text-sm">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <address className="not-italic space-y-2 text-sm text-primary-foreground/70">
              <p>46-A, Electronic Complex</p>
              <p>Pardeshipura, Indore</p>
              <p>Madhya Pradesh - 452001</p>
              <a
                href="mailto:diplsales@diplindia.com"
                className="block mt-3 text-accent hover:underline"
              >
                diplsales@diplindia.com
              </a>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} Digital Integrator Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-primary-foreground/50 text-xs">
            <span>CIN: U31909MP1997PTC012011</span>
            <span>GST: 23AAACD9928P1Z5</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
