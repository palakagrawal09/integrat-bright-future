import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Search, Eye } from "lucide-react";
import { Link } from "react-router-dom";
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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="section-divider" />
                  <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">
                    Defence Systems
                  </span>
                  <span className="section-divider" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                  Mission-Critical Defence Electronics
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Precision-engineered fire control systems, inspection equipment, and field surveillance 
                  platforms trusted by the Indian Armed Forces.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* AMFDC Section */}
        <section id="fire-control" className="section-padding bg-defence-green/5">
          <div className="container-width">
            <ScrollReveal>
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-4">
                  <Shield className="w-4 h-4 text-defence-green" />
                  <span className="text-defence-green text-sm font-medium">Fire Control Systems</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                  Automatic Mortar Fire Data Controller
                </h2>
                <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">
                  A small hand-held wonder, developed indigenously by DIPL, which gives immediate calculations 
                  and data to MFC for firing mortar. A long-standing requirement of Infantry fulfilled.
                </p>
              </div>
            </ScrollReveal>

            {/* AMFDC MK-II */}
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-8 mb-12 items-start">
                <div>
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-4">AMFDC MK-II</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                      <img src={amfdcDevice} alt="AMFDC MK-II Device" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                      <img src={mortarFiring} alt="Mortar Firing in Field" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Main Functions</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Capacity to store Mortar positions MP Grid reference
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Capacity to store Target positions IM Grid reference
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Pre-stored safe zones (2 points & 3 points both methods)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Pre-stored crest (1 point & 2 points both method)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Environmental temperature using external temperature probe
                    </li>
                  </ul>
                  <div className="bg-card border border-gunmetal/15 p-4 space-y-2">
                    <h4 className="font-semibold text-foreground text-sm">Ammunition Support</h4>
                    <p className="text-muted-foreground text-sm">HE fire / High Explosive MK-II, ILL fire / Illuminating MK-II, HE Smoke</p>
                    <h4 className="font-semibold text-foreground text-sm mt-3">Accuracy</h4>
                    <p className="text-muted-foreground text-sm">5 Meters in range, 5 minutes in angle. 10 Meters in coordinates.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* AMFDC MK-III */}
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-8 mb-12 items-start">
                <div className="order-2 lg:order-1 space-y-4">
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-4">AMFDC MK-III</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    MK-III is an advance state of art Handheld Device built with more user-friendly features. 
                    Supports two modes of operation: Standard AMFDC & Plotter mode.
                  </p>
                  <h4 className="font-semibold text-foreground text-sm">Key Features</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Plotter mode for visualisation of fall of shots in battlefield
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      GPS interface for exact OWN location / GR
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Zoom-in to Target area to see corrections
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Store 100 Nos. MP, IM Grid references, safe zones, crests
                    </li>
                  </ul>
                  <div className="bg-card border border-gunmetal/15 p-4 space-y-2">
                    <h4 className="font-semibold text-foreground text-sm">Specifications</h4>
                    <p className="text-muted-foreground text-xs">High brightness sunlight readable LCD display</p>
                    <p className="text-muted-foreground text-xs">Dimensions: 105 x 185 x 60mm</p>
                    <p className="text-muted-foreground text-xs">Battery: 3.7V 5000mAh Li-Poly, 8+ Hrs operation</p>
                    <p className="text-muted-foreground text-xs">Shock/Vibration: MIL-STD-810F compliant</p>
                    <p className="text-muted-foreground text-xs">Drop: MIL-STD-810F Method 516.5, 4ft</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                    <img src={mortarCrew} alt="Indian Army Mortar Crew" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* TEEVRA */}
            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-xs aspect-[3/5] overflow-hidden border border-gunmetal/15 mx-auto">
                    <img src={teevraScreen} alt="TEEVRA FDC for CSWs" className="w-full h-full object-contain bg-card" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-semibold text-foreground">TEEVRA — FDC for Company Support Weapons</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Teevra calculates firing data accurately for MMG, AGL and AGS-30 during operations. 
                    Calculations are automatic, without manually referring to range tables, 
                    increasing the efficiency of company support weapons.
                  </p>
                  <h4 className="font-semibold text-foreground text-sm">Advantages</h4>
                  <ul className="space-y-1.5 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      No need to refer range tables — fast reaction time
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Human errors in lengthy calculations eliminated
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Quick availability of accurate firing data
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      Integrated GPS for own location
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-brass-gold mt-2 flex-shrink-0" />
                      No wastage of ammunition — saves cost & space
                    </li>
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
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 bg-brass-gold/10 border border-brass-gold/20 px-4 py-2 mb-4">
                  <Search className="w-4 h-4 text-brass-gold" />
                  <span className="text-brass-gold text-sm font-medium">Inspection & Safety</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                  Gun Barrel Inspection Systems
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-semibold text-foreground">GBInP-17 Universal</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Universally designed for inspecting barrels of Field Guns (FGs) of various ID — 
                    105mm, 120mm, 125mm, 130mm & 155mm. Integration of electronics, optic sensors and 
                    mechanical design. Detects Cracks, Pits, etc. to prevent fatal accidents.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                      <img src={gunBarrelFiring} alt="Artillery Firing" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                      <img src={gbinpProbe} alt="GBInP-17 Universal Probe" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-display font-semibold text-foreground">LCGB-HMRSV-21-XG</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Designed for inspecting Barrels of FGs (105mm–155mm). Integration of Electronics with 
                    IGCP Industrial Grade Computing Platform, Optic sensors and ergonomic design. 
                    State of Art indigenously developed product.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                      <img src={lcgbSystem} alt="LCGB IGCP System" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                      <img src={artilleryFiring} alt="Artillery System" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">Features</h4>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Compatible for 105mm, 120mm, 125mm, 130mm, 155mm & ATAGS</li>
                    <li>• Real-time images with Angular & Linear Data</li>
                    <li>• User-selected snapshots and video recording</li>
                    <li>• Image Analysis tools for defect measurement</li>
                    <li>• AI & ML algo integration for pre & post fire scanning comparison</li>
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
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 bg-defence-green/10 border border-defence-green/20 px-4 py-2 mb-4">
                  <Eye className="w-4 h-4 text-defence-green" />
                  <span className="text-defence-green text-sm font-medium">Field Surveillance</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                  FSD Flexible / INVSS-16/19
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="aspect-[4/3] overflow-hidden border border-gunmetal/15">
                  <img src={fsdFlexible} alt="FSD Flexible Surveillance Device" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    INVSS-16/19 is used in CI ops of enemy hideouts & difficult to reach locations. 
                    Also used as NDT system for inspection of Gun Barrels for Cracks/Pitting, Aircraft engines etc.
                  </p>
                  <div className="bg-card border border-gunmetal/15 p-4">
                    <h4 className="font-semibold text-foreground text-sm mb-3">Operating Unit Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-sand-dark/30 p-2"><span className="text-muted-foreground">Display:</span> <span className="text-foreground">3.5/4.3"</span></div>
                      <div className="bg-sand-dark/30 p-2"><span className="text-muted-foreground">Resolution:</span> <span className="text-foreground">640 x 480</span></div>
                      <div className="bg-sand-dark/30 p-2"><span className="text-muted-foreground">OS:</span> <span className="text-foreground">Real-time OS</span></div>
                      <div className="bg-sand-dark/30 p-2"><span className="text-muted-foreground">Power:</span> <span className="text-foreground">7.4V rechargeable</span></div>
                      <div className="bg-sand-dark/30 p-2"><span className="text-muted-foreground">Probe Ø:</span> <span className="text-foreground">9mm</span></div>
                      <div className="bg-sand-dark/30 p-2"><span className="text-muted-foreground">Working length:</span> <span className="text-foreground">3M</span></div>
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
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                  Need a Defence-Grade Solution?
                </h3>
                <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">
                  Our engineering team specializes in custom defence electronics tailored to operational requirements.
                </p>
                <Link to="/enquiry" className="btn-accent inline-flex items-center gap-2">
                  Request Technical Consultation
                </Link>
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
