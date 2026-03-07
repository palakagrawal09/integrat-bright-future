import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";

type HomepageSection = {
  id: string;
  title: string;
  content: string;
  sort_order: number;
  published: boolean;
};

const Hero = () => {
  const [sections, setSections] = useState<HomepageSection[]>([]);

  useEffect(() => {
    const fetchHomepageSections = async () => {
      const { data, error } = await supabase
        .from("homepage_sections")
        .select("id, title, content, sort_order, published")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setSections(data);
      }
    };

    fetchHomepageSections();
  }, []);

  const heroHeadline = useMemo(() => {
    const hero = sections.find((section) => section.title.toLowerCase().includes("hero"));
    return hero?.content?.trim() || "Engineering Defence-Grade Systems for India";
  }, [sections]);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Defence manufacturing facility"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-overlay)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-width section-padding w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brass-gold/20 border border-brass-gold/40 px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-brass-gold rounded-full" />
            <span className="text-brass-gold text-sm font-semibold tracking-wide uppercase">
              Est. 1990 • ISO 9001:2015 Certified
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
          >
            {heroHeadline}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed"
          >
            Organisation dedicated to product development. Complete solutions for Defence,
            Industrial Automation, Simulators & Training Systems since 1990.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/defence-systems"
              className="btn-accent inline-flex items-center gap-2 group"
            >
              Explore Capabilities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/enquiry"
              className="btn-outline text-white border-white/40 hover:border-brass-gold inline-flex items-center gap-2"
            >
              Get a Quote
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-brass-gold rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
