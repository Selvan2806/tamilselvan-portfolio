import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

type SkillCategory = 'all' | 'languages' | 'frontend' | 'backend' | 'tools' | 'ai';

interface Skill {
  name: string;
  category: SkillCategory[];
  level: number; // 1-5 stars
}

const skills: Skill[] = [
  { name: 'Python', category: ['languages', 'ai', 'backend'], level: 5 },
  { name: 'JavaScript', category: ['languages', 'frontend'], level: 5 },
  { name: 'TypeScript', category: ['languages', 'frontend'], level: 4 },
  { name: 'Java', category: ['languages', 'backend'], level: 4 },
  { name: 'SQL', category: ['languages', 'backend'], level: 4 },
  { name: 'React', category: ['frontend'], level: 5 },
  { name: 'Next.js', category: ['frontend'], level: 4 },
  { name: 'Tailwind CSS', category: ['frontend'], level: 5 },
  { name: 'Node.js', category: ['backend'], level: 4 },
  { name: 'Express.js', category: ['backend'], level: 4 },
  { name: 'FastAPI', category: ['backend', 'ai'], level: 4 },
  { name: 'PostgreSQL', category: ['backend'], level: 4 },
  { name: 'MongoDB', category: ['backend'], level: 4 },
  { name: 'TensorFlow', category: ['ai'], level: 4 },
  { name: 'PyTorch', category: ['ai'], level: 4 },
  { name: 'LangChain', category: ['ai'], level: 4 },
  { name: 'Docker', category: ['tools'], level: 4 },
  { name: 'Git', category: ['tools'], level: 5 },
  { name: 'AWS', category: ['tools'], level: 4 },
  { name: 'Linux', category: ['tools'], level: 4 },
];

const categories = [
  { id: 'all', label: 'All Skills' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'tools', label: 'Tools' },
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
    <section id="skills" className="py-28 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-xs font-medium uppercase tracking-[0.3em]">Expertise</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold mt-4 mb-6 tracking-wide">
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
          <div className="luxury-line max-w-xs mx-auto" />
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as SkillCategory)}
              className={`px-6 py-2.5 rounded-md text-xs font-medium uppercase tracking-widest transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-[0_4px_20px_hsla(42,65%,58%,0.25)]'
                  : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-primary/20'
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
          className="mt-20 glass-card p-10 lg:p-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-10">
            <h3 className="font-heading text-2xl lg:text-3xl font-semibold gradient-text tracking-wide">Technical Expertise</h3>
            <div className="luxury-line max-w-[100px] mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-3 tracking-wide">Frontend Development</h4>
              <p className="leading-relaxed text-sm">
                Expertise in building modern, responsive web applications using React, Next.js, 
                and TypeScript. Strong focus on user experience, accessibility, and performance 
                optimization with Tailwind CSS and modern CSS frameworks.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3 tracking-wide">Backend Development</h4>
              <p className="leading-relaxed text-sm">
                Proficient in developing scalable APIs and microservices using Node.js, Python, 
                and FastAPI. Experience with both SQL and NoSQL databases, implementing efficient 
                data architectures and RESTful services.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3 tracking-wide">AI & Machine Learning</h4>
              <p className="leading-relaxed text-sm">
                Hands-on experience with AI/ML frameworks including TensorFlow and PyTorch. 
                Specialized in building RAG applications, integrating LLMs, and implementing 
                intelligent chatbots using LangChain and vector databases.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3 tracking-wide">DevOps & Cloud</h4>
              <p className="leading-relaxed text-sm">
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
