import { useState, useEffect } from 'react';
import { Menu, X, User, Code, Folder, Award, Briefcase, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExpandableTabs, TabItem } from '@/components/ui/expandable-tabs';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/hooks/use-language';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navTabs: TabItem[] = [
    { title: t.nav.about, icon: User, href: '#about' },
    { title: t.nav.skills, icon: Code, href: '#skills' },
    { title: t.nav.projects, icon: Folder, href: '#projects' },
    { title: t.nav.certifications, icon: Award, href: '#certifications' },
    { title: t.nav.experience, icon: Briefcase, href: '#experience' },
    { type: "separator" },
    { title: t.nav.contact, icon: Mail, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      const tab = navTabs[index];
      if (tab.type !== "separator") {
        const navTab = tab as { href?: string };
        if (navTab.href) {
          const element = document.querySelector(navTab.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-background/60 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_0_20px_rgba(0,242,255,0.15)]'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="section-container flex items-center justify-between">
        <a
          href="#"
          className="font-heading text-xl font-bold gradient-text drop-shadow-[0_0_10px_rgba(0,242,255,0.5)]"
        >
          TAMILSELVAN
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <ExpandableTabs
            tabs={navTabs}
            onChange={handleTabChange}
            className="border-primary/20 bg-background/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,242,255,0.1)]"
            activeColor="text-primary"
          />

          <LanguageSwitcher />
          <ThemeToggle />

          <Button variant="hero" size="sm" className="ml-2" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 py-4 animate-fade-in">
          <div className="section-container flex flex-col gap-2">
            {navTabs.map((tab, index) => {
              if (tab.type === "separator") return null;
              const navTab = tab as { title: string; icon: React.ComponentType<{ className?: string }>; href: string };
              return (
                <a
                  key={navTab.title}
                  href={navTab.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50 flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <navTab.icon className="w-5 h-5" />
                  {navTab.title}
                </a>
              );
            })}
            <div className="flex items-center gap-2 mt-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button variant="hero" className="flex-1" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>Download Resume</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
