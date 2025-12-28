import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';

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
    <section id="about" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Me</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Passionate Developer &{' '}
            <span className="gradient-text">Tech Enthusiast</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm <span className="text-foreground font-semibold">TAMILSELVAN P</span>, a passionate 
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
            <div className="flex flex-wrap gap-8 pt-6">
              <div>
                <div className="text-4xl font-heading font-bold gradient-text">3+</div>
                <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold gradient-text">15+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold gradient-text">10+</div>
                <div className="text-sm text-muted-foreground mt-1">Technologies</div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
