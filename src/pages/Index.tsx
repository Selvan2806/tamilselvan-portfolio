import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ExperienceSection from '@/components/ExperienceSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import GitHubStats from '@/components/GitHubStats';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingChatbot from '@/components/FloatingChatbot';
import ParallaxBackground from '@/components/ParallaxBackground';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TAMILSELVAN P | Software Engineer & Full Stack Developer</title>
        <meta
          name="description"
          content="Motivated Java Full Stack Developer with a foundation in Java, Spring Boot, HTML, CSS, JavaScript, and SQL. Skilled in developing responsive web applications."
        />
        <meta name="keywords" content="TAMILSELVAN P, Full Stack Developer, React, Node.js, Python, AI, Machine Learning, Web Developer, Portfolio" />
        <meta property="og:title" content="TAMILSELVAN P | Full-Stack Developer & AI Enthusiast" />
        <meta property="og:description" content="Building intelligent, scalable web applications with modern technologies." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <ParallaxBackground />
        <ScrollProgressIndicator />
        <Navigation />
        <main>
          <section id="hero">
            <HeroSection />
          </section>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificationsSection />
          <ExperienceSection />
          <TestimonialsSection />
          <GitHubStats />
          <ContactSection />
        </main>
        <Footer />
        <FloatingChatbot />
      </div>
    </>
  );
};

export default Index;
