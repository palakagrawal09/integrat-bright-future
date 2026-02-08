import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Calendar, Users, IndianRupee, Shield, MapPin } from "lucide-react";
import teamPhoto from "@/assets/team-photo.png";

const AboutPage = () => {
  const companyStats = [
    { icon: Calendar, value: "1997", label: "Established" },
    { icon: Building2, value: "₹1.5 Cr", label: "Authorized Capital" },
    { icon: IndianRupee, value: "₹1.1 Cr", label: "Paid-up Capital" },
    { icon: Users, value: "26-50", label: "Employees" },
  ];

  const directors = [
    {
      name: "Sunil Vasantrao Vyas",
      designation: "Director & CEO",
      din: "00246643",
      appointmentDate: "19-6-1997",
      initials: "SV",
    },
    {
      name: "Hemant Verma",
      designation: "Director",
      din: "01836055",
      appointmentDate: "19-6-1997",
      initials: "HV",
    },
  ];

  const expertise = [
    "PC based data acquisition, monitoring and controls",
    "Microprocessor/Microcontroller based automation including monitoring and controls",
    "Real Time and Embedded controllers",
    "Data loggers for different uses",
    "Temperature monitoring and Controls",
    "Length measurement and controls",
    "Signal conditioning",
    "FPGA-Based control and Acquisitions",
  ];

  const companyInfo = [
    { label: "CIN", value: "U31909MP1997PTC012011" },
    { label: "GST No.", value: "23AAACD9928P1Z5" },
    { label: "Company Type", value: "Unlisted Private Limited" },
    { label: "Annual Turnover", value: "₹40L - 1.5 Cr" },
    { label: "GST Registration", value: "01-07-2017" },
    { label: "RoC", value: "Registrar of Companies, Gwalior" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">
                  About Us
                </span>
                <span className="section-divider" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                27+ Years of Innovation
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                DIPL is providing complete solutions for Industrial Automation & Controls on various stages. 
                Our products and services have been used by numerous Industries and Research Institutes across India.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {companyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="card-defence p-6 text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-defence-green/10 flex items-center justify-center group-hover:bg-brass-gold/15 transition-colors duration-300">
                    <stat.icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Description */}
        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-brass-gold" />
                  Company Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Digital Integrator Private Limited (CIN: U31909MP1997PTC012011) is a Private company 
                  incorporated on 19 Dec 1997. It is classified as a Non-government company and is 
                  registered at Registrar of Companies, Gwalior.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  As per the NIC code 3190, the company is involved in the Manufacture of other 
                  electrical equipment n.e.c., with a special focus on defence electronics and 
                  industrial automation systems.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {companyInfo.map((info) => (
                    <div key={info.label} className="space-y-1 bg-card p-3 border border-gunmetal/15">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{info.label}</p>
                      <p className="text-sm font-medium text-foreground">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-defence-green" />
                  Our Expertise
                </h3>
                <ul className="space-y-3">
                  {expertise.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-defence-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-defence-green">{index + 1}</span>
                      </span>
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">
                  Leadership
                </span>
                <span className="section-divider" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2">
                Board of Directors
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {directors.map((director) => (
                <div
                  key={director.din}
                  className="card-defence p-6 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-defence-green/10 flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-defence-green">
                      {director.initials}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground">
                    {director.name}
                  </h3>
                  <p className="text-brass-gold font-medium text-sm mt-1">{director.designation}</p>
                  <div className="mt-4 pt-4 border-t border-gunmetal/15 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      DIN: <span className="text-foreground">{director.din}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Since: <span className="text-foreground">{director.appointmentDate}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-sand-dark/30">
          <div className="container-width">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="section-divider" />
                <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">
                  Our Team
                </span>
                <span className="section-divider" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2">
                The People Behind DIPL
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
                Our dedicated team of engineers and professionals brings decades of combined experience in defence electronics and industrial automation.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="card-defence overflow-hidden">
                <img 
                  src={teamPhoto} 
                  alt="DIPL Team at Electronic Complex, Indore" 
                  className="w-full h-auto"
                />
                <div className="p-6 text-center bg-card">
                  <p className="text-muted-foreground text-sm">
                    The DIPL team at our facility in Electronic Complex, Pardeshipura, Indore
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Addresses */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-foreground flex items-center justify-center gap-3">
                <span className="w-8 h-0.5 bg-brass-gold" />
                Our Locations
                <span className="w-8 h-0.5 bg-brass-gold" />
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
                <address className="not-italic text-muted-foreground text-sm leading-relaxed">
                  46-A, Electronic Complex<br />
                  Pardeshipura, Indore<br />
                  Madhya Pradesh - 452001, India
                </address>
              </div>
              <div className="card-defence p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brass-gold/15 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brass-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground">Corporate Office</h3>
                </div>
                <address className="not-italic text-muted-foreground text-sm leading-relaxed">
                  26, Legal Tower, IIIrd Floor<br />
                  Behind M.G. Road, Gurudwara<br />
                  Kothari Market Area, Indore - 452007
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
