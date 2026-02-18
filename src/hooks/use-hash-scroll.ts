import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useHashScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const scrollToHash = () => {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 100;
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    // Small delay to let the page render fully before scrolling
    const timer = setTimeout(scrollToHash, 100);
    return () => clearTimeout(timer);
  }, [hash, pathname]);
};

export default useHashScroll;
