import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingChatbot from '@/components/FloatingChatbot';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TAMILSELVAN P | Full-Stack Developer & AI Enthusiast</title>
        <meta 
          name="description" 
          content="TAMILSELVAN P - Full-Stack Developer specializing in React, Node.js, Python, and AI/ML. Building intelligent web applications with modern technologies." 
        />
        <meta name="keywords" content="TAMILSELVAN P, Full Stack Developer, React, Node.js, Python, AI, Machine Learning, Web Developer, Portfolio" />
        <meta property="og:title" content="TAMILSELVAN P | Full-Stack Developer & AI Enthusiast" />
        <meta property="og:description" content="Building intelligent, scalable web applications with modern technologies." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingChatbot />
      </div>
    </>
  );
};

export default Index;
