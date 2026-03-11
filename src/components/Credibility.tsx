import { Shield, Users, Calendar, Award } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { usePageContent } from "@/hooks/use-page-content";

const iconMap: Record<string, React.ElementType> = { Shield, Users, Calendar, Award };

const defaultStats = [
  { icon: "Shield", value: "ISO 9001:2015", label: "Certified Quality Management" },
  { icon: "Users", value: "200+", label: "Happy Clients" },
  { icon: "Calendar", value: "30+", label: "Years of Excellence" },
  { icon: "Award", value: "CII MSME", label: "Member & GeM Registered" },
];

const Credibility = () => {
  const { getJSON } = usePageContent("home");
  const stats = getJSON<{ icon: string; value: string; label: string }[]>("credibility", "stats", defaultStats);

  return (
    <section className="trust-strip py-12">
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Shield;
            return (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 bg-defence-green/10 flex items-center justify-center mb-4 group-hover:bg-brass-gold/15 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-defence-green group-hover:text-brass-gold transition-colors duration-300" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-1">{stat.value}</span>
                  <span className="text-sm text-muted-foreground leading-tight">{stat.label}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Credibility;
