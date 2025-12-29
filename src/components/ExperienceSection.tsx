import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineItem {
  type: 'work' | 'education' | 'achievement';
  title: string;
  organization: string;
  period: string;
  description: string;
  skills?: string[];
}

const timeline: TimelineItem[] = [
  {
    type: 'work',
    title: 'Full-Stack Developer',
    organization: 'Tech Company',
    period: '2023 - Present',
    description: 'Leading development of web applications using React, Node.js, and cloud technologies. Implementing AI features and optimizing performance for scalable solutions.',
    skills: ['React', 'Node.js', 'AWS', 'AI Integration'],
  },
  {
    type: 'work',
    title: 'Software Developer Intern',
    organization: 'Startup Inc',
    period: '2022 - 2023',
    description: 'Developed and maintained web applications, collaborated with cross-functional teams, and participated in agile development processes.',
    skills: ['Python', 'Django', 'PostgreSQL', 'Git'],
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science',
    organization: 'University Name',
    period: '2019 - 2023',
    description: 'Specialized in software engineering and artificial intelligence. Completed coursework in algorithms, data structures, machine learning, and web technologies.',
  },
  {
    type: 'achievement',
    title: 'Hackathon Winner',
    organization: 'National Level Competition',
    period: '2022',
    description: 'First place in a 48-hour hackathon for developing an innovative AI-powered solution for healthcare diagnostics.',
  },
];

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return Briefcase;
    case 'education':
      return GraduationCap;
    case 'achievement':
      return Award;
    default:
      return Briefcase;
  }
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative bg-secondary/20">
      <div className="section-container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Experience</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Career{' '}
            <span className="gradient-text">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <motion.div 
            className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Timeline Items */}
          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = getIcon(item.type);
              return (
                <motion.div
                  key={index}
                  className="relative pl-20 group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.15 * index }}
                >
                  {/* Icon */}
                  <motion.div 
                    className="absolute left-0 w-16 h-16 rounded-full glass-card flex items-center justify-center border-2 border-primary/30 group-hover:border-primary transition-colors bg-background"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <div className="glass-card p-6 hover:border-primary/30 transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {item.period}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-3">
                      {item.organization}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                    {item.skills && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Resume Download */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 glass-card hover:border-primary/50 transition-all duration-300 text-foreground font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
