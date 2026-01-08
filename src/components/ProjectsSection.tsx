import { motion } from 'framer-motion';
import vivaImage from '@/assets/project-vivas.png';
import logoImage from '@/assets/project-logo.png';
import mentalImage from '@/assets/project-mentals.png';
import { TextScramble } from '@/components/ui/text-scramble';
import ProjectCard from '@/components/ProjectCard';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured: boolean;
  image?: string;
}

const projects: Project[] = [
  {
    title: 'Viva Preparation Assistant',
    description: 'An AI-powered platform to practice oral examinations with intelligent feedback. Build confidence, master your subject, and prepare effectively for viva voce exams with personalized practice sessions and real-time evaluation.',
    technologies: ['React', 'TypeScript', 'AI/ML', 'Tailwind CSS', 'Supabase'],
    live: 'https://viva-preparation-site.lovable.app',
    featured: true,
    image: vivaImage,
  },
  {
    title: 'Logo Maker',
    description: 'An intelligent design engine powered by advanced RAG models that transforms your vision into unique, professional logos. Generate stunning brand identities tailored to your business in seconds with AI-powered creativity.',
    technologies: ['React', 'TypeScript', 'RAG Models', 'AI Image Generation', 'Tailwind CSS'],
    live: 'https://preview--dzp68o7yc4kb.trickle.host',
    featured: true,
    image: logoImage,
  },
  {
    title: 'Mental Health Assistant',
    description: 'A compassionate AI companion providing 24/7 confidential support for mental wellness. Listen, support, and guide users through life\'s challenges with empathetic conversations and evidence-based coping strategies.',
    technologies: ['React', 'TypeScript', 'AI/NLP', 'Supabase', 'Tailwind CSS'],
    live: 'https://hug-mind-guide.lovable.app',
    featured: true,
    image: mentalImage,
  },
];

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Projects</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <TextScramble text="Featured" />{' '}
            <span className="gradient-text"><TextScramble text="Work" scrambleDuration={1200} /></span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
