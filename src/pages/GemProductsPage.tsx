import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Award, CheckCircle } from "lucide-react";
import { usePageContent } from "@/hooks/use-page-content";

const GemProductsPage = () => {
  const { get } = usePageContent("gem");

  const heroTitle = get("hero", "title", "Products on GeM");
  const heroDesc = get("hero", "description", "DIPL is a registered seller on the Government e-Marketplace (GeM).");

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
      </main>
      <Footer />
    </div>
  );
};

export default GemProductsPage;
