import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certs' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'github-stats', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

const ScrollProgressIndicator = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Determine active section
      const sectionElements = sections
        .map(({ id }) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id, top: rect.top, bottom: rect.bottom };
        })
        .filter(Boolean);

      const viewportCenter = window.innerHeight / 3;
      
      for (const section of sectionElements) {
        if (section && section.top <= viewportCenter && section.bottom > 0) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted/30 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Side navigation dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center justify-end"
            aria-label={`Navigate to ${label}`}
          >
            {/* Label tooltip */}
            <span className="absolute right-6 px-2 py-1 rounded bg-card/90 backdrop-blur-sm border border-border text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {label}
            </span>
            
            {/* Dot indicator */}
            <div className="relative">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSection === id
                    ? 'bg-primary scale-125 shadow-[0_0_10px_hsl(var(--primary))]'
                    : 'bg-muted-foreground/40 hover:bg-muted-foreground/70'
                }`}
              />
              {activeSection === id && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default ScrollProgressIndicator;
