import { Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-width section-padding !py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-lg">
                  Digital Integrator
                </span>
                <span className="text-primary-foreground/70 text-xs block">
                  Private Limited
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-md mb-4">
              A leading manufacturer of electrical equipment since 1997. 
              Delivering quality, innovation, and reliability across India.
            </p>
            <p className="text-primary-foreground/50 text-xs">
              CIN: U31909MP1997PTC012011
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
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
            © {currentYear} Digital Integrator Private Limited. All rights reserved.
          </p>
          <p className="text-primary-foreground/50 text-xs">
            Registered at RoC Gwalior | Active Status
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
