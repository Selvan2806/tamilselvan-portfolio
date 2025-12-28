import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Picture */}
          <div className="relative animate-fade-in">
            <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl relative z-10">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-7xl sm:text-8xl font-heading font-bold gradient-text">TP</span>
              </div>
            </div>
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-4 rounded-full border border-primary/10" />
            <div className="absolute -inset-8 rounded-full border border-primary/5" />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl -z-10" />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left space-y-6 flex-1">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm text-muted-foreground">Available for opportunities</span>
            </div>

            {/* Main Heading */}
            <h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="gradient-text block sm:inline">TAMILSELVAN P</span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Full-Stack Developer & AI Enthusiast
            </p>

            {/* Description */}
            <p 
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Building intelligent, scalable web applications with modern technologies. 
              Passionate about creating seamless user experiences powered by AI.
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <Button variant="hero" size="xl" asChild>
                <a href="#projects">View My Work</a>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>

            {/* Social Links */}
            <div 
              className="flex items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="mailto:Selvanaptamil@gmail.com"
                className="p-3 rounded-full glass-card hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
