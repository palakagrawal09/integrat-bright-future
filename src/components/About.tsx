import { Calendar, Users, Heart, Lightbulb, Eye, Target, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import msmeAward from "@/assets/msme-award.jpg";

type AboutEntry = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  sort_order: number;
};

const About = () => {
  const [entries, setEntries] = useState<AboutEntry[]>([]);

  useEffect(() => {
    const fetchAboutEntries = async () => {
      const { data, error } = await supabase
        .from("about_entries")
        .select("id, title, content, published, sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setEntries(data);
      }
    };

    fetchAboutEntries();
  }, []);

  const stats = [
    { icon: Calendar, value: "30+", label: "Years in Business" },
    { icon: Users, value: "200+", label: "Happy Clients" },
    { icon: Heart, value: "30+", label: "Team of Experts" },
    { icon: Lightbulb, value: "ISO 9001", label: "Certified Quality" },
  ];

  const values = [
    { icon: Users, text: "Agile to Customer Needs" },
    { icon: Heart, text: "Perfect Team Work" },
    { icon: Target, text: "Focused Quality Improvements" },
    { icon: Compass, text: "Sustained Innovation & Engineering" },
  ];

  return (
    <section id="about" className="section-padding bg-sand-dark/30">
      <div className="container-width">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="section-divider" />
              <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">About Us</span>
              <span className="section-divider" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">A Legacy of Excellence</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              {entries[0]?.content || (
                <>
                  An ISO 9001:2015 Company established in 1990-91 by IT Industry professionals.
                  In a span of 30+ years, we have designed and developed solutions for Defence,
                  Indian Railways, BHEL, GAIL and CAT/BARC.
                </>
              )}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ScrollReveal direction="left">
            <div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="card-defence p-6 text-center group">
                    <div className="w-12 h-12 mx-auto mb-4 bg-defence-green/10 flex items-center justify-center group-hover:bg-brass-gold/15 transition-colors duration-300">
                      <stat.icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="card-defence overflow-hidden">
                <img src={msmeAward} alt="India 5000 Best MSME Award 2019 - Digital Integrator Pvt. Ltd." className="w-full h-auto" />
                <div className="p-3 text-center bg-card">
                  <p className="text-muted-foreground text-xs">Nominated for India 5000 Best MSME Award 2019</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-6">
              {entries.length > 0 ? (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div key={entry.id} className="bg-card border border-gunmetal/15 p-5">
                      <h3 className="text-xl font-display font-semibold text-foreground mb-2">{entry.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{entry.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-semibold text-foreground">One-Stop System Integration & Automation House</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We have strong representation in In-Process Automation, Industrial/MIL grade computers,
                    Product customization, Data Acquisition, Controls & Monitoring, Network Management Systems.
                    Our solutions span Simulation for Defence, Fire Control Systems, customized application &
                    system development based on embedded Microcontrollers & Industrial/MIL-Grade PCs.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Located in central India's commercial capital Indore, with about 6000 Sq. Ft. facility.
                    Company is CII MSME Member for more than a decade.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gunmetal/20">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-brass-gold" /> Our Values
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {values.map((v) => (
                    <div key={v.text} className="flex items-center gap-2 bg-defence-green/5 border border-gunmetal/10 px-3 py-2.5">
                      <v.icon className="w-4 h-4 text-defence-green flex-shrink-0" />
                      <span className="text-sm text-foreground">{v.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-gunmetal/15 p-5">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-brass-gold" /> Our Vision
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Determination to find solutions for Advance & State of Art Technology with technical skill sets
                  on System Integration, R&D / D&D skills, and Design & Development of Embedded Systems,
                  Sensor Integrations, and Solutions for Niche problem statements.
                </p>
              </div>
              <div className="bg-card border border-gunmetal/15 p-5">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-brass-gold" /> Our Mission
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To design, develop & provide vital & sustainable systems to our Defence,
                  Para Military & other customers.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
