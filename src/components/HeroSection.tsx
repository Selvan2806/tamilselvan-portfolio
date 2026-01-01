import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import profilePhoto from '@/assets/profile-photo.jpeg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gold ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-gold-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-gold-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Elegant Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsla(42, 65%, 58%, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsla(42, 65%, 58%, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Profile Picture with Luxury Frame */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer gold ring */}
            <div className="absolute -inset-3 rounded-full border border-primary/20" />
            <div className="absolute -inset-6 rounded-full border border-primary/10" />
            
            {/* Main image container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Gold gradient border */}
              <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-primary/60 via-primary/20 to-primary/60">
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <img 
                    src={profilePhoto} 
                    alt="TAMILSELVAN P - Full Stack Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Subtle glow behind */}
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl -z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left space-y-8 flex-1">
            {/* Status Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm text-muted-foreground tracking-wide uppercase">Available for opportunities</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-muted-foreground text-lg mb-2 tracking-wide">Hello, I'm</p>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-wide">
                <span className="gradient-text text-shadow-gold">TAMILSELVAN P</span>
              </h1>
            </motion.div>

            {/* Decorative line */}
            <motion.div 
              className="luxury-line max-w-xs mx-auto lg:mx-0"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />

            {/* Subtitle */}
            <motion.p 
              className="text-xl sm:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Full-Stack Developer & AI Enthusiast
            </motion.p>

            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Crafting elegant, intelligent web applications with precision and purpose. 
              Passionate about creating seamless experiences that leave lasting impressions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button variant="hero" size="xl" asChild className="group">
                <a href="#projects">
                  <span>View My Work</span>
                </a>
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl" 
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                className="group"
              >
                <span>Chat with Assistant</span>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center justify-center lg:justify-start gap-5 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href="https://github.com/Selvan2806"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full glass-card hover:border-primary/40 transition-all duration-500 group"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/tamilselvan-p-56134130a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full glass-card hover:border-primary/40 transition-all duration-500 group"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
              <a
                href="mailto:Selvanaptamil@gmail.com"
                className="p-3.5 rounded-full glass-card hover:border-primary/40 transition-all duration-500 group"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-light">Discover</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;