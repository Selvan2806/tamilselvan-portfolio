import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import vivaImage from '@/assets/project-vivas.png';
import logoImage from '@/assets/project-logo.png';
import mentalImage from '@/assets/project-mentals.png';

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
    <section id="projects" className="py-28 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-xs font-medium uppercase tracking-[0.3em]">Portfolio</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mt-4 mb-6 tracking-wide">
            Featured{' '}
            <span className="gradient-text">Work</span>
          </h2>
          <div className="luxury-line max-w-xs mx-auto" />
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-10 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glass-card p-8 lg:p-10 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Project Image */}
                <motion.div 
                  className="lg:w-1/2 aspect-video rounded-lg overflow-hidden border border-primary/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Project Info */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <span className="text-primary text-xs font-medium uppercase tracking-[0.2em] mb-3">Featured Project</span>
                  <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-4 tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-secondary/80 text-secondary-foreground rounded-md text-xs font-medium tracking-wide border border-primary/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.live && (
                      <a
                        href={project.live}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:shadow-[0_4px_20px_hsla(42,65%,58%,0.25)] transition-all duration-300 text-sm font-medium tracking-wide uppercase"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;