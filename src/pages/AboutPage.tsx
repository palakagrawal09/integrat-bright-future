import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Calendar, Users, IndianRupee, Shield, MapPin, Award, FileCheck, CheckCircle, Eye, Target } from "lucide-react";
import { usePageContent } from "@/hooks/use-page-content";
import teamPhoto from "@/assets/team-photo.png";
import msmeAward from "@/assets/msme-award.jpg";
import sunilVyas from "@/assets/director-sunil-vyas.jpg";
import hemantVerma from "@/assets/director-hemant-verma.jpg";
import satyevirYadav from "@/assets/advisor-satyevir-yadav.jpg";
import walivadekar from "@/assets/advisor-walivadekar.jpg";
import preetJain from "@/assets/advisor-preet-jain.jpg";

const statIconMap: Record<string, React.ElementType> = { Calendar, Building2, Users, IndianRupee };
const certIconMap: Record<string, React.ElementType> = { Shield, Award, FileCheck, CheckCircle };
const photoMap: Record<string, string> = {
  "director-sunil-vyas.jpg": sunilVyas,
  "director-hemant-verma.jpg": hemantVerma,
  "advisor-satyevir-yadav.jpg": satyevirYadav,
  "advisor-walivadekar.jpg": walivadekar,
  "advisor-preet-jain.jpg": preetJain,
};

const AboutPage = () => {
  const { get, getJSON } = usePageContent("about");

  const heroTitle = get("hero", "title", "30+ Years of Innovation");
  const heroDesc = get("hero", "description", "An ISO 9001:2015 Company established in 1990-91 by IT Industry professionals — providing complete solutions for Defence, Industrial Automation & Controls.");
  const companyStats = getJSON("stats", "items", [
    { icon: "Calendar", value: "1990", label: "Established" },
    { icon: "Building2", value: "6000 Sq.Ft", label: "Facility Area" },
    { icon: "Users", value: "200+", label: "Happy Clients" },
    { icon: "IndianRupee", value: "30+", label: "Team of Experts" },
  ]);
  const overview1 = get("overview", "paragraph_1", "Digital Integrator Private Limited (CIN: U31909MP1997PTC012011) was started in 1990 as Dynalog Microcomputer Services and converted to a Private Limited Company in 1997. Located in central India's commercial capital Indore with about 6000 Sq. Ft. facility.");
  const overview2 = get("overview", "paragraph_2", "We are a one-stop system integration and automation house with capabilities in Simulation for Defence, Fire Control Systems, customized application & system development based on Embedded, Microcontrollers & Industrial/MIL-Grade PCs, Scientific-Engineering & tailor-made solutions.");
  const vision = get("overview", "vision", "Innovate to make our products recognised for Technology, Quality, Ease of Working, Value for Money and Development of Import substitute solutions in demand with clients.");
  const mission = get("overview", "mission", "To design, develop & provide vital & sustainable systems to our Defence, Para Military & other customers.");
  const directors = getJSON<any[]>("directors", "items", []);
  const advisors = getJSON<any[]>("advisors", "items", []);
  const certifications = getJSON<any[]>("certifications", "items", []);
  const registeredAddr = get("locations", "registered", "46-A, Electronic Complex\nPardeshipura, Indore\nMadhya Pradesh - 452001, India");
  const corporateAddr = get("locations", "corporate", "26, Legal Tower, IIIrd Floor\nBehind M.G. Road, Gurudwara\nKothari Market Area, Indore - 452007");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">About DIPL</span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">{heroTitle}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{heroDesc}</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {companyStats.map((stat: any) => {
                const Icon = statIconMap[stat.icon] || Calendar;
                return (
                  <div key={stat.label} className="card-defence p-6 text-center group">
                    <div className="w-12 h-12 mx-auto mb-4 bg-defence-green/10 flex items-center justify-center group-hover:bg-brass-gold/15 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-brass-gold" /> Company Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">{overview1}</p>
                <p className="text-muted-foreground leading-relaxed">{overview2}</p>
                <div className="bg-card border border-gunmetal/15 p-5">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-brass-gold" /> Our Vision
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{vision}</p>
                </div>
                <div className="bg-card border border-gunmetal/15 p-5">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-brass-gold" /> Our Mission
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{mission}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="card-defence overflow-hidden">
                  <img src={teamPhoto} alt="DIPL Team at Electronic Complex, Indore" className="w-full h-auto" />
                  <div className="p-4 text-center bg-card">
                    <p className="text-muted-foreground text-sm">The DIPL team at our facility in Electronic Complex, Pardeshipura, Indore</p>
                  </div>
                </div>
                <div className="card-defence overflow-hidden">
                  <img src={msmeAward} alt="India 5000 Best MSME Award 2019" className="w-full h-auto" />
                  <div className="p-4 text-center bg-card">
                    <p className="text-muted-foreground text-sm">Nominated for India 5000 Best MSME Award 2019 for Quality Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="leadership" className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Leadership</span>
                <span className="section-divider" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2">Our Directors</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {directors.map((director: any) => (
                <div key={director.name} className="card-defence p-6">
                  <div className="flex items-start gap-5 mb-4">
                    <img src={photoMap[director.photo] || director.photo} alt={director.name} className="w-24 h-28 object-cover object-top border-2 border-gunmetal/15 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-display font-semibold text-foreground">{director.name}</h3>
                      <p className="text-brass-gold font-medium text-sm mt-1">{director.designation}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{director.bio}</p>
                  {director.achievements && (
                    <div className="pt-4 border-t border-gunmetal/15">
                      <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Key Highlights</p>
                      <ul className="space-y-1">
                        {director.achievements.map((a: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-defence-green mt-0.5 flex-shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Advisors</span>
                <span className="section-divider" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2">Advisory Board</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {advisors.map((advisor: any) => (
                <div key={advisor.name} className="card-defence p-6 text-center">
                  <img src={photoMap[advisor.photo] || advisor.photo} alt={advisor.name} className="w-24 h-28 object-cover object-top mx-auto mb-4 border-2 border-gunmetal/15" />
                  <h3 className="text-base font-display font-semibold text-foreground">{advisor.name}</h3>
                  <p className="text-brass-gold font-medium text-xs mt-1 mb-3">{advisor.designation}</p>
                  {advisor.decorations && <p className="text-xs text-defence-green font-semibold mb-2">{advisor.decorations}</p>}
                  <p className="text-muted-foreground text-xs leading-relaxed">{advisor.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Quality & Compliance</span>
                <span className="section-divider" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2">Certifications & Compliance</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert: any) => {
                const CertIcon = certIconMap[cert.icon] || Shield;
                return (
                  <div key={cert.title} className="card-defence p-6 text-center group">
                    <div className="w-14 h-14 mx-auto mb-4 bg-defence-green/10 flex items-center justify-center group-hover:bg-brass-gold/15 transition-colors duration-300">
                      <CertIcon className="w-7 h-7 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">{cert.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground flex items-center justify-center gap-3">
                <span className="w-8 h-0.5 bg-brass-gold" /> Our Locations <span className="w-8 h-0.5 bg-brass-gold" />
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="card-defence p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-defence-green/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-defence-green" />
                  </div>
                  <h3 className="font-semibold text-foreground">Registered Office</h3>
                </div>
                <address className="not-italic text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {registeredAddr}
                </address>
              </div>
              <div className="card-defence p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brass-gold/15 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brass-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground">Corporate Office</h3>
                </div>
                <address className="not-italic text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {corporateAddr}
                </address>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
