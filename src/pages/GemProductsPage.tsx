import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink, Shield, Award, CheckCircle, Package } from "lucide-react";
import { usePageContent } from "@/hooks/use-page-content";

const GemProductsPage = () => {
  const { get, getJSON } = usePageContent("gem");

  const heroTitle = get("hero", "title", "Products on GeM");
  const heroDesc = get("hero", "description", "DIPL is a registered seller on the Government e-Marketplace (GeM). Browse our listed products available for direct procurement by government organizations.");
  const products = getJSON<{ name: string; description: string; category: string }[]>("products", "items", [
    { name: "Lithium Battery Packs", description: "High-performance lithium battery packs for defence and industrial applications.", category: "Power Systems" },
    { name: "Control Units & Panels", description: "Custom control units and automation panels for industrial and defence-grade operations.", category: "Control Systems" },
    { name: "Power Modules", description: "Rugged power distribution and regulation modules designed for field and factory environments.", category: "Power Systems" },
    { name: "Data Acquisition Systems", description: "PC-based and embedded data acquisition systems for monitoring and recording industrial parameters.", category: "Instrumentation" },
    { name: "Signal Conditioning Equipment", description: "Precision signal conditioning modules for accurate sensor data processing.", category: "Instrumentation" },
    { name: "Temperature Controllers", description: "Industrial temperature monitoring and control units with high accuracy and reliability.", category: "Control Systems" },
  ]);
  const ctaTitle = get("cta", "title", "Procure Through GeM");
  const ctaDesc = get("cta", "description", "Visit our seller profile on the Government e-Marketplace for direct procurement and transparent pricing.");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">GeM Marketplace</span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">{heroTitle}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{heroDesc}</p>
            </div>
          </div>
        </section>

        <section className="py-10 bg-background">
          <div className="container-width">
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: Shield, label: "GeM Registered Seller" },
                { icon: Award, label: "ISO 9001:2015 Certified" },
                { icon: CheckCircle, label: "Government Compliant" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-muted-foreground">
                  <badge.icon className="w-5 h-5 text-defence-green" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Available Products</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">Listed on GeM for transparent and efficient government procurement.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.name} className="card-defence p-6 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-defence-green/10 flex items-center justify-center group-hover:bg-brass-gold/15 transition-colors duration-300">
                      <Package className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                    </div>
                    <span className="text-xs bg-defence-green/10 text-defence-green px-2 py-1">{product.category}</span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{product.description}</p>
                  <div className="flex items-center gap-1 text-xs text-defence-green">
                    <CheckCircle className="w-3 h-3" />
                    <span>Available on GeM</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="p-8 sm:p-12 text-center bg-defence-green">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">{ctaTitle}</h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">{ctaDesc}</p>
              <a href="https://gem.gov.in" target="_blank" rel="noopener noreferrer" className="btn-accent inline-flex items-center gap-2">
                Visit GeM Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GemProductsPage;
