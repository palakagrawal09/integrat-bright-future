import { MapPin, Mail, Phone, Building2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "46-A, Electronic Complex Pardeshipura, Indore, Madhya Pradesh, India - 452001",
    },
    {
      icon: Mail,
      title: "Email",
      content: "diplsales@diplindia.com",
      href: "mailto:diplsales@diplindia.com",
    },
    {
      icon: Building2,
      title: "Company Registration",
      content: "CIN: U31909MP1997PTC012011",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon - Sat: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="section-divider" />
            <span className="text-teal-green font-semibold text-sm uppercase tracking-wider">
              Contact Us
            </span>
            <span className="section-divider" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to discuss your defense or industrial automation requirements? 
            Reach out to our engineering team for expert consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="card-gov p-6"
              >
                <div className="w-10 h-10 rounded-sm bg-teal-green/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-teal-green" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-muted-foreground text-sm hover:text-precision-orange transition-colors"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-muted-foreground text-sm">{item.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Map Embed */}
          <div className="card-gov overflow-hidden h-80 lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.5376485799384!2d75.8559!3d22.7300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b0a0a0a0a%3A0x0!2sElectronic%20Complex%2C%20Pardeshipura%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Digital Integrator Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 rounded-sm p-8 sm:p-12 text-center bg-navy-blue">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            Ready to Partner with Us?
          </h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Let's discuss how our defense-grade solutions can meet your mission-critical needs.
          </p>
          <a
            href="mailto:diplsales@diplindia.com"
            className="btn-accent inline-flex items-center gap-2 rounded-sm"
          >
            <Mail className="w-5 h-5" />
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
