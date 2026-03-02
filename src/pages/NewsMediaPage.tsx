import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const NewsMediaPage = () => {
  const [newsItems, setNewsItems] = useState<{ title: string; content: string; published_at: string | null; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news_articles")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });
      if (data && data.length > 0) {
        setNewsItems(data);
      } else {
        setNewsItems([
          { title: "DIPL Expands Defence Electronics Portfolio", content: "Digital Integrator adds new fire control and surveillance systems to its defence product line.", published_at: "2024-01-01", created_at: "2024-01-01" },
          { title: "ISO 9001:2015 Recertification", content: "Successfully recertified under ISO 9001:2015 quality management standards.", published_at: "2023-06-01", created_at: "2023-06-01" },
        ]);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

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
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-6">
                {newsItems.map((item, index) => {
                  const dateStr = item.published_at || item.created_at;
                  const year = dateStr ? new Date(dateStr).getFullYear().toString() : "";
                  return (
                    <article key={index} className="card-defence p-6 group">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-defence-green/10 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-defence-green" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs text-muted-foreground">{year}</span>
                          </div>
                          <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-defence-green transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
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
