import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';

const AboutSection = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Code2,
      title: t.about.highlights.cleanCode.title,
      description: t.about.highlights.cleanCode.description,
    },
    {
      icon: Lightbulb,
      title: t.about.highlights.problemSolver.title,
      description: t.about.highlights.problemSolver.description,
    },
    {
      icon: Rocket,
      title: t.about.highlights.fastLearner.title,
      description: t.about.highlights.fastLearner.description,
    },
    {
      icon: Users,
      title: t.about.highlights.teamPlayer.title,
      description: t.about.highlights.teamPlayer.description,
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t.about.label}</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-6">
            {t.about.title1}{' '}
            <span className="gradient-text">{t.about.title2}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.intro}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.aspiring}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.journey}
            </p>

            {/* Quick Stats */}
            <motion.div 
              className="flex flex-wrap gap-8 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <div className="text-4xl font-heading font-bold gradient-text">5+</div>
                <div className="text-sm text-muted-foreground mt-1">{t.about.projectsCompleted}</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold gradient-text">10+</div>
                <div className="text-sm text-muted-foreground mt-1">{t.about.technologies}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
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
