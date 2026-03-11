import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Search, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/use-page-content";
import amfdcDevice from "@/assets/amfdc-device.jpg";
import mortarFiring from "@/assets/mortar-firing.jpg";
import mortarCrew from "@/assets/mortar-crew.jpg";
import gbinpProbe from "@/assets/gbinp-probe.jpg";
import gunBarrelFiring from "@/assets/gun-barrel-firing.jpg";
import fsdFlexible from "@/assets/fsd-flexible.jpg";
import teevraScreen from "@/assets/teevra-screen.png";
import lcgbSystem from "@/assets/lcgb-system.jpg";
import artilleryFiring from "@/assets/artillery-firing.jpg";

const DefenseSystemsPage = () => {
  const { get, getJSON } = usePageContent("defence");

  const heroTitle = get("hero", "title", "Mission-Critical Defence Electronics");
  const heroDesc = get("hero", "description", "Precision-engineered fire control systems, inspection equipment, and field surveillance platforms trusted by the Indian Armed Forces.");
  const amfdcSectionTitle = get("amfdc", "section_title", "Automatic Mortar Fire Data Controller");
  const amfdcSectionDesc = get("amfdc", "section_description", "A small hand-held wonder, developed indigenously by DIPL, which gives immediate calculations and data to MFC for firing mortar. A long-standing requirement of Infantry fulfilled.");
  
  const mk2Title = get("amfdc_mk2", "title", "AMFDC MK-II");
  const mk2Functions = getJSON<string[]>("amfdc_mk2", "functions", [
    "Capacity to store Mortar positions MP Grid reference",
    "Capacity to store Target positions IM Grid reference",
    "Pre-stored safe zones (2 points & 3 points both methods)",
    "Pre-stored crest (1 point & 2 points both method)",
    "Environmental temperature using external temperature probe",
  ]);
  const mk2Ammo = get("amfdc_mk2", "ammo_support", "HE fire / High Explosive MK-II, ILL fire / Illuminating MK-II, HE Smoke");
  const mk2Accuracy = get("amfdc_mk2", "accuracy", "5 Meters in range, 5 minutes in angle. 10 Meters in coordinates.");
  
  const mk3Title = get("amfdc_mk3", "title", "AMFDC MK-III");
  const mk3Desc = get("amfdc_mk3", "description", "MK-III is an advance state of art Handheld Device built with more user-friendly features. Supports two modes of operation: Standard AMFDC & Plotter mode.");
  const mk3Features = getJSON<string[]>("amfdc_mk3", "features", ["Plotter mode for visualisation of fall of shots in battlefield","GPS interface for exact OWN location / GR","Zoom-in to Target area to see corrections","Store 100 Nos. MP, IM Grid references, safe zones, crests"]);
  const mk3Specs = getJSON<string[]>("amfdc_mk3", "specs", ["High brightness sunlight readable LCD display","Dimensions: 105 x 185 x 60mm","Battery: 3.7V 5000mAh Li-Poly, 8+ Hrs operation","Shock/Vibration: MIL-STD-810F compliant","Drop: MIL-STD-810F Method 516.5, 4ft"]);
  
  const teevraTitle = get("teevra", "title", "TEEVRA — FDC for Company Support Weapons");
  const teevraDesc = get("teevra", "description", "Teevra calculates firing data accurately for MMG, AGL and AGS-30 during operations. Calculations are automatic, without manually referring to range tables, increasing the efficiency of company support weapons.");
  const teevraAdvantages = getJSON<string[]>("teevra", "advantages", ["No need to refer range tables — fast reaction time","Human errors in lengthy calculations eliminated","Quick availability of accurate firing data","Integrated GPS for own location","No wastage of ammunition — saves cost & space"]);
  
  const gbinpSectionTitle = get("gbinp", "section_title", "Gun Barrel Inspection Systems");
  const gbinp17Title = get("gbinp17", "title", "GBInP-17 Universal");
  const gbinp17Desc = get("gbinp17", "description", "Universally designed for inspecting barrels of Field Guns (FGs) of various ID — 105mm, 120mm, 125mm, 130mm & 155mm. Integration of electronics, optic sensors and mechanical design. Detects Cracks, Pits, etc. to prevent fatal accidents.");
  const lcgbTitle = get("lcgb", "title", "LCGB-HMRSV-21-XG");
  const lcgbDesc = get("lcgb", "description", "Designed for inspecting Barrels of FGs (105mm–155mm). Integration of Electronics with IGCP Industrial Grade Computing Platform, Optic sensors and ergonomic design. State of Art indigenously developed product.");
  const lcgbFeatures = getJSON<string[]>("lcgb", "features", ["Compatible for 105mm, 120mm, 125mm, 130mm, 155mm & ATAGS","Real-time images with Angular & Linear Data","User-selected snapshots and video recording","Image Analysis tools for defect measurement","AI & ML algo integration for pre & post fire scanning comparison"]);
  
  const fsdSectionTitle = get("fsd", "section_title", "FSD Flexible / INVSS-16/19");
  const fsdDesc = get("fsd", "description", "INVSS-16/19 is used in CI ops of enemy hideouts & difficult to reach locations. Also used as NDT system for inspection of Gun Barrels for Cracks/Pitting, Aircraft engines etc.");
  const fsdSpecs = getJSON<string[][]>("fsd", "specs", [["Display","3.5/4.3\""],["Resolution","640 x 480"],["OS","Real-time OS"],["Power","7.4V rechargeable"],["Probe Ø","9mm"],["Working length","3M"]]);
  
  const ctaTitle = get("cta", "title", "Need a Defence-Grade Solution?");
  const ctaDesc = get("cta", "description", "Our engineering team specializes in custom defence electronics tailored to operational requirements.");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="section-divider" />
                  <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Defence Systems</span>
                  <span className="section-divider" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">{heroTitle}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{heroDesc}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* AMFDC Section */}
        <section id="fire-control" className="section-padding bg-defence-green/5">
          <div className="container-width">
            <ScrollReveal>
              <div className="mb-10 border-b border-gunmetal/10 pb-8">
                <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-4">
                  <Shield className="w-4 h-4 text-defence-green" />
                  <span className="text-defence-green text-sm font-medium">Fire Control Systems</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{amfdcSectionTitle}</h2>
                <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">{amfdcSectionDesc}</p>
              </div>
            </ScrollReveal>

            {/* AMFDC MK-II */}
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-10 mb-12 items-start">
                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-4">{mk2Title}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                      <img src={amfdcDevice} alt="AMFDC MK-II Device" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                      <img src={mortarFiring} alt="Mortar Firing in Field" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-0 lg:pt-14">
                  <h4 className="font-semibold text-foreground">Main Functions</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {mk2Functions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0 rounded-none" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-card border border-gunmetal/15 p-4 space-y-2">
                    <h4 className="font-semibold text-foreground text-sm">Ammunition Support</h4>
                    <p className="text-muted-foreground text-sm">{mk2Ammo}</p>
                    <h4 className="font-semibold text-foreground text-sm mt-3">Accuracy</h4>
                    <p className="text-muted-foreground text-sm">{mk2Accuracy}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="border-t border-gunmetal/10 mb-12" />

            {/* AMFDC MK-III */}
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-10 mb-12 items-start">
                <div className="order-2 lg:order-1 space-y-4 pt-0 lg:pt-0">
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-3">{mk3Title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{mk3Desc}</p>
                  <h4 className="font-semibold text-foreground text-sm">Key Features</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {mk3Features.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-card border border-gunmetal/15 p-4 space-y-1.5">
                    <h4 className="font-semibold text-foreground text-sm mb-2">Specifications</h4>
                    {mk3Specs.map((spec, i) => (
                      <p key={i} className="text-muted-foreground text-xs flex items-start gap-2">
                        <span className="w-1 h-1 bg-gunmetal/40 mt-1.5 flex-shrink-0" />
                        {spec}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                    <img src={mortarCrew} alt="Indian Army Mortar Crew" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="border-t border-gunmetal/10 mb-12" />

            {/* TEEVRA */}
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-card">
                  <img src={teevraScreen} alt="TEEVRA FDC for CSWs" className="w-full h-full object-contain p-4" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-semibold text-foreground">{teevraTitle}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{teevraDesc}</p>
                  <h4 className="font-semibold text-foreground text-sm">Advantages</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {teevraAdvantages.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Gun Barrel Inspection */}
        <section id="inspection" className="section-padding bg-background">
          <div className="container-width">
            <ScrollReveal>
              <div className="mb-10 border-b border-gunmetal/10 pb-8">
                <div className="inline-flex items-center gap-2 bg-brass-gold/10 border border-brass-gold/20 px-4 py-2 mb-4">
                  <Search className="w-4 h-4 text-brass-gold" />
                  <span className="text-brass-gold text-sm font-medium">Inspection & Safety</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{gbinpSectionTitle}</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-semibold text-foreground">{gbinp17Title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{gbinp17Desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                      <img src={gunBarrelFiring} alt="Artillery Firing" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                      <img src={gbinpProbe} alt="GBInP-17 Universal Probe" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-semibold text-foreground">{lcgbTitle}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{lcgbDesc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                      <img src={lcgbSystem} alt="LCGB IGCP System" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                      <img src={artilleryFiring} alt="Artillery System" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">Features</h4>
                  <ul className="space-y-1.5 text-muted-foreground text-xs">
                    {lcgbFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-brass-gold mt-1 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FSD / Surveillance */}
        <section id="surveillance" className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <ScrollReveal>
              <div className="mb-10 border-b border-gunmetal/10 pb-8">
                <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-4">
                  <Eye className="w-4 h-4 text-defence-green" />
                  <span className="text-defence-green text-sm font-medium">Field Surveillance</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{fsdSectionTitle}</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15 bg-sand-dark/20">
                  <img src={fsdFlexible} alt="FSD Flexible Surveillance Device" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-5">
                  <p className="text-muted-foreground leading-relaxed text-sm">{fsdDesc}</p>
                  <div className="bg-card border border-gunmetal/15 p-5">
                    <h4 className="font-semibold text-foreground text-sm mb-4">Operating Unit Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {fsdSpecs.map(([label, value]) => (
                        <div key={label} className="bg-sand-dark/30 p-2.5 flex justify-between items-center">
                          <span className="text-muted-foreground">{label}:</span>
                          <span className="text-foreground font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-width">
            <ScrollReveal>
              <div className="p-8 sm:p-12 text-center bg-defence-green">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">{ctaTitle}</h3>
                <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">{ctaDesc}</p>
                <Link to="/enquiry" className="btn-accent inline-flex items-center gap-2">Request Technical Consultation</Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DefenseSystemsPage;
