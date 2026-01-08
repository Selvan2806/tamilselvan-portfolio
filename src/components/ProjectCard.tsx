import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTilt } from '@/hooks/use-tilt';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured: boolean;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { ref, style, isHovering } = useTilt({ max: 8, scale: 1.01 });

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -10,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }
    }
  };

  const glowVariants = {
    rest: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const techVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15 + 0.3 + i * 0.05,
        duration: 0.3,
      }
    })
  };

  return (
    <motion.div
      ref={ref}
      style={style}
      className="glass-card p-6 lg:p-8 transition-all duration-300 group relative overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Animated glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 pointer-events-none"
        variants={glowVariants}
        initial="rest"
        animate={isHovering ? "hover" : "rest"}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
          transform: isHovering ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.6s ease-in-out',
        }}
      />

      <div className={`flex flex-col lg:flex-row gap-6 lg:gap-10 relative z-10 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
        {/* Project Image */}
        <motion.div 
          className="lg:w-1/2 aspect-video rounded-lg overflow-hidden relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-400"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
          {/* Image overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Project Info */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.span 
            className="text-primary text-sm font-medium mb-2 inline-flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.1, duration: 0.4 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Featured Project
          </motion.span>
          
          <motion.h3 
            className="font-heading text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.15, duration: 0.4 }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
          >
            {project.description}
          </motion.p>

          {/* Technologies with staggered animation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                custom={techIndex}
                variants={techVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
          >
            {project.live && (
              <a
                href={project.live}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-medium group/btn hover:gap-3 hover:shadow-lg hover:shadow-primary/25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
