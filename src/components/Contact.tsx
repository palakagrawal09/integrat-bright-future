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
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to discuss your electrical equipment needs? Reach out to our team 
            for expert consultation and solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="card-industrial p-6 hover:border-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
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
          <div className="card-industrial overflow-hidden h-80 lg:h-auto">
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
        <div className="mt-16 rounded-2xl p-8 sm:p-12 text-center" style={{ background: "var(--gradient-hero)" }}>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary-foreground mb-4">
            Ready to Power Your Next Project?
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Let's discuss how our electrical solutions can meet your industrial needs.
          </p>
          <a
            href="mailto:diplsales@diplindia.com"
            className="btn-accent inline-flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Email Us Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
