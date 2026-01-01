import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code with best practices',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solver',
    description: 'Tackling complex challenges with creative solutions',
  },
  {
    icon: Rocket,
    title: 'Fast Learner',
    description: 'Quickly adapting to new technologies and frameworks',
  },
  {
    icon: Users,
    title: 'Team Player',
    description: 'Collaborating effectively in agile environments',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-28 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="section-container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-xs font-medium uppercase tracking-[0.3em]">About Me</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mt-4 mb-6 tracking-wide">
            Passionate Developer &{' '}
            <span className="gradient-text">Visionary</span>
          </h2>
          <div className="luxury-line max-w-xs mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* About Text */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm <span className="text-primary font-medium">TAMILSELVAN P</span>, a passionate 
              full-stack developer with a deep interest in building intelligent web applications 
              that make a real impact.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in technology spans across various domains including web development, 
              artificial intelligence, and cloud computing. I thrive on creating seamless user 
              experiences backed by robust, scalable architectures.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or diving deep into the latest advancements in AI and 
              machine learning.
            </p>

            {/* Quick Stats */}
            <motion.div 
              className="flex flex-wrap gap-12 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <div className="text-5xl font-heading font-semibold gradient-text text-shadow-gold">5+</div>
                <div className="text-sm text-muted-foreground mt-2 tracking-wide">Projects Completed</div>
              </div>
              <div>
                <div className="text-5xl font-heading font-semibold gradient-text text-shadow-gold">10+</div>
                <div className="text-sm text-muted-foreground mt-2 tracking-wide">Technologies</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="glass-card p-7 transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300 border border-primary/20">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;