import { ExternalLink, Github, Folder } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    title: 'AI-Powered Task Manager',
    description: 'A smart task management application with AI-driven prioritization and natural language processing for task creation. Features include automated scheduling, smart reminders, and productivity analytics.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'OpenAI', 'PostgreSQL'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management, secure payment processing, and an admin dashboard for analytics and order management.',
    technologies: ['Next.js', 'Node.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'Real-time Chat Application',
    description: 'A scalable chat application supporting real-time messaging, file sharing, and video calls. Built with WebSocket technology for instant communication.',
    technologies: ['React', 'Socket.io', 'Express', 'Redis', 'WebRTC'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'Machine Learning Dashboard',
    description: 'Interactive dashboard for visualizing and managing ML model performance, training metrics, and deployment status.',
    technologies: ['Python', 'Streamlit', 'TensorFlow', 'Plotly'],
    github: '#',
    featured: false,
  },
  {
    title: 'Portfolio CMS',
    description: 'Headless CMS for managing portfolio content with markdown support, image optimization, and SEO management.',
    technologies: ['Next.js', 'Sanity', 'TypeScript', 'Vercel'],
    github: '#',
    featured: false,
  },
  {
    title: 'Weather Analytics App',
    description: 'Weather application with historical data analysis, forecast visualization, and location-based alerts.',
    technologies: ['React', 'D3.js', 'OpenWeather API', 'Node.js'],
    github: '#',
    featured: false,
  },
];

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

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
            Featured{' '}
            <span className="gradient-text">Work</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`glass-card p-6 lg:p-8 hover:border-primary/30 transition-all duration-300 ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                {/* Project Visual Placeholder */}
                <motion.div 
                  className="lg:w-1/2 aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center p-8">
                    <Folder className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                    <span className="text-muted-foreground text-sm">Project Preview</span>
                  </div>
                </motion.div>

                {/* Project Info */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <span className="text-primary text-sm font-medium mb-2">Featured Project</span>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5 text-foreground" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-5 h-5 text-foreground" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-2xl font-bold text-center mb-8">Other Noteworthy Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="glass-card p-6 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Folder className="w-10 h-10 text-primary" />
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
