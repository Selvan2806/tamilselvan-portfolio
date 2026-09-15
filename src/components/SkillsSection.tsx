import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

type SkillCategory = 'all' | 'languages' | 'corejava' | 'backend' | 'frontend' | 'database' | 'web';

interface Skill {
  name: string;
  category: SkillCategory[];
  level: number; // 1-5 stars
}

const skills: Skill[] = [
  // Programming Languages
  { name: 'Java', category: ['languages'], level: 4 },
  { name: 'Python', category: ['languages'], level: 4 },
  { name: 'SQL', category: ['languages'], level: 4 },
  // Core Java
  { name: 'OOP', category: ['corejava'], level: 4 },
  { name: 'Collections', category: ['corejava'], level: 4 },
  { name: 'Exception Handling', category: ['corejava'], level: 4 },
  { name: 'File Handling', category: ['corejava'], level: 4 },
  // Backend
  { name: 'Spring Boot', category: ['backend'], level: 4 },
  { name: 'FastAPI', category: ['backend'], level: 3 },
  // Frontend
  { name: 'HTML5', category: ['frontend'], level: 5 },
  { name: 'CSS3', category: ['frontend'], level: 4 },
  { name: 'JavaScript', category: ['frontend'], level: 4 },
  // Database
  { name: 'MySQL', category: ['database'], level: 4 },
  { name: 'MongoDB', category: ['database'], level: 4 },
  // Web Technologies
  { name: 'RESTful Web Services', category: ['web'], level: 4 },
  { name: 'JSON', category: ['web'], level: 4 },
  { name: 'HTTP', category: ['web'], level: 4 },
];

const categories = [
  { id: 'all', label: 'All Skills' },
  { id: 'languages', label: 'Languages' },
  { id: 'corejava', label: 'Core Java' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'database', label: 'Database' },
  { id: 'web', label: 'Web Technologies' },
];

const StarRating = ({ level, index, isHovered }: { level: number; index: number; isHovered: boolean }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 * index + 0.1 * star }}
          animate={isHovered && star <= level ? { scale: [1, 1.2, 1] } : {}}
        >
          <Star
            className={`w-4 h-4 transition-all duration-300 ${
              star <= level
                ? `fill-primary text-primary ${isHovered ? 'drop-shadow-[0_0_6px_hsl(var(--primary))]' : ''}`
                : 'fill-transparent text-muted-foreground/30'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="glass-card p-5 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {skill.name}
        </h3>
        <StarRating level={skill.level} index={index} isHovered={isHovered} />
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const filteredSkills = skills.filter(
    (skill) => activeCategory === 'all' || skill.category.includes(activeCategory)
  );

  return (
    <section id="skills" className="py-24 relative bg-secondary/20">
      <div className="section-container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Skills</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Technologies &{' '}
            <span className="gradient-text">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as SkillCategory)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Tech Background Summary */}
        <motion.div 
          className="mt-16 glass-card p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-heading text-2xl font-bold mb-6 gradient-text">Technological Background</h3>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Frontend Development</h4>
              <p className="leading-relaxed">
                Skilled in building responsive and interactive web interfaces using HTML5, CSS3,
                and JavaScript. Focused on clean UI design, performance, and great user experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Backend Development</h4>
              <p className="leading-relaxed">
                Backend developer experienced in building RESTful web services and secure APIs with
                Spring Boot and FastAPI, and managing MySQL and MongoDB databases, backed by strong
                Core Java fundamentals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">AI & Machine Learning</h4>
              <p className="leading-relaxed">
                AI & Machine Learning Developer with experience in NLP, RAG-based models, and AI-powered web applications.
                Passionate about building intelligent systems that solve real-world problems.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Penetration Testing</h4>
              <p className="leading-relaxed">
                Aspiring Penetration Tester with hands-on knowledge of reconnaissance, vulnerability assessment, and basic 
                exploitation techniques, focused on improving system and application security.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
