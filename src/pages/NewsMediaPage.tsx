import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NewsMediaPage = () => {
  const newsItems = [
    {
      date: "2024",
      title: "DIPL Expands Defence Electronics Portfolio",
      summary: "Digital Integrator adds new fire control and surveillance systems to its defence product line, strengthening capabilities for the Indian Armed Forces.",
      category: "Company Update",
    },
    {
      date: "2024",
      title: "GeM Registration & Product Listing Expansion",
      summary: "DIPL expands its product catalogue on the Government e-Marketplace, making more automation and defence products accessible for government procurement.",
      category: "Procurement",
    },
    {
      date: "2023",
      title: "ISO 9001:2015 Recertification",
      summary: "Successfully recertified under ISO 9001:2015 quality management standards, reaffirming commitment to excellence in defence and industrial automation.",
      category: "Certification",
    },
    {
      date: "2023",
      title: "Industrial Automation Projects in Railways",
      summary: "DIPL delivers automation and control solutions for Indian Railways, expanding the company's industrial footprint beyond defence electronics.",
      category: "Project Delivery",
    },
    {
      date: "2022",
      title: "25 Years of Defence Manufacturing Excellence",
      summary: "Digital Integrator celebrates 25 years of serving the Indian defence sector with fire control systems, simulators, and industrial automation.",
      category: "Milestone",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">
                  News & Media
                </span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                Latest Updates
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stay informed about DIPL's latest projects, certifications, and milestones 
                in defence electronics and industrial automation.
              </p>
            </div>
          </div>
        </section>

        {/* News List */}
        <section className="section-padding bg-background">
          <div className="container-width max-w-4xl">
            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <article key={index} className="card-defence p-6 group">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-defence-green/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-defence-green" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs bg-brass-gold/15 text-brass-gold px-2 py-1 font-medium">
                          {item.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-defence-green transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="p-8 sm:p-12 text-center bg-defence-green">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Have a Media Enquiry?
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">
                For press releases, media kits, and enquiries, reach out to our communications team.
              </p>
              <Link to="/contact" className="btn-accent inline-flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsMediaPage;
