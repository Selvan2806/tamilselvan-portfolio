import { useState } from 'react';
import { motion } from 'framer-motion';

type SkillCategory = 'all' | 'languages' | 'frontend' | 'backend' | 'tools' | 'ai';

interface Skill {
  name: string;
  category: SkillCategory[];
  level: number;
}

const skills: Skill[] = [
  { name: 'Python', category: ['languages', 'ai', 'backend'], level: 90 },
  { name: 'JavaScript', category: ['languages', 'frontend'], level: 92 },
  { name: 'TypeScript', category: ['languages', 'frontend'], level: 88 },
  { name: 'Java', category: ['languages', 'backend'], level: 80 },
  { name: 'SQL', category: ['languages', 'backend'], level: 85 },
  { name: 'React', category: ['frontend'], level: 90 },
  { name: 'Next.js', category: ['frontend'], level: 85 },
  { name: 'Tailwind CSS', category: ['frontend'], level: 92 },
  { name: 'Node.js', category: ['backend'], level: 88 },
  { name: 'Express.js', category: ['backend'], level: 85 },
  { name: 'FastAPI', category: ['backend', 'ai'], level: 82 },
  { name: 'PostgreSQL', category: ['backend'], level: 85 },
  { name: 'MongoDB', category: ['backend'], level: 80 },
  { name: 'TensorFlow', category: ['ai'], level: 75 },
  { name: 'PyTorch', category: ['ai'], level: 78 },
  { name: 'LangChain', category: ['ai'], level: 80 },
  { name: 'Docker', category: ['tools'], level: 82 },
  { name: 'Git', category: ['tools'], level: 90 },
  { name: 'AWS', category: ['tools'], level: 75 },
  { name: 'Linux', category: ['tools'], level: 80 },
];

const categories = [
  { id: 'all', label: 'All Skills' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'tools', label: 'Tools' },
];

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
            <motion.div
              key={skill.name}
              className="glass-card p-5 hover:border-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
                />
              </div>
            </motion.div>
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
                Expertise in building modern, responsive web applications using React, Next.js, 
                and TypeScript. Strong focus on user experience, accessibility, and performance 
                optimization with Tailwind CSS and modern CSS frameworks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Backend Development</h4>
              <p className="leading-relaxed">
                Proficient in developing scalable APIs and microservices using Node.js, Python, 
                and FastAPI. Experience with both SQL and NoSQL databases, implementing efficient 
                data architectures and RESTful services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">AI & Machine Learning</h4>
              <p className="leading-relaxed">
                Hands-on experience with AI/ML frameworks including TensorFlow and PyTorch. 
                Specialized in building RAG applications, integrating LLMs, and implementing 
                intelligent chatbots using LangChain and vector databases.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">DevOps & Cloud</h4>
              <p className="leading-relaxed">
                Familiar with containerization using Docker, CI/CD pipelines, and cloud 
                platforms like AWS. Strong command of Git version control and Linux 
                environments for development and deployment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
