import { Briefcase, GraduationCap, Award, Book } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineItem {
  type: 'work' | 'education' | 'achievement' | 'Learning' ;
  title: string;
  organization: string;
  period: string;
  description: string;
  skills?: string[];
}

const timeline: TimelineItem[] = [
  {
    type: 'Learning',
    title: 'Bachelor of Engineering in Computer Science',
    organization: 'Annai Mira College of Engineering and Technology',
    period: '2023 - Present',
    description: 'Currently pursuing my third year of studies, building hands-on experience through real-world projects and continuous learning.',
    skills: ['Python', 'React', 'Linux', 'AI Integration'],
  }
];

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return Briefcase;
    case 'education':
      return GraduationCap;
    case 'achievement':
      return Award;
    case 'Learning':
      return Book
    default:
      return Briefcase;
  }
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-28 relative">
      {/* Background accent */}
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
          <span className="text-primary text-xs font-medium uppercase tracking-[0.3em]">Experience</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mt-4 mb-6 tracking-wide">
            Career{' '}
            <span className="gradient-text">Journey</span>
          </h2>
          <div className="luxury-line max-w-xs mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <motion.div 
            className="absolute left-8 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, hsl(42 65% 58%) 0%, hsl(15 45% 65%) 50%, transparent 100%)'
            }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Timeline Items */}
          <div className="space-y-10">
            {timeline.map((item, index) => {
              const Icon = getIcon(item.type);
              return (
                <motion.div
                  key={index}
                  className="relative pl-24 group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.15 * index }}
                >
                  {/* Icon */}
                  <motion.div 
                    className="absolute left-0 w-16 h-16 rounded-md glass-card flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-all duration-300 bg-background"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <div className="glass-card p-8 transition-all duration-500">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-md text-xs font-medium tracking-wide border border-primary/20">
                        {item.period}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize tracking-wide">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl lg:text-2xl font-semibold text-foreground mb-2 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-4 tracking-wide">
                      {item.organization}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                    {item.skills && (
                      <div className="flex flex-wrap gap-2 mt-5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-secondary/80 text-secondary-foreground rounded-md text-xs tracking-wide border border-primary/10"
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
          <button
            onClick={() => {
              window.open('/resume.pdf', '_blank');
            }}
            className="inline-flex items-center gap-3 px-8 py-4 glass-card hover:border-primary/40 transition-all duration-300 text-foreground font-medium cursor-pointer tracking-wide uppercase text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;