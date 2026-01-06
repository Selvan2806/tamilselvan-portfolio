import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const GITHUB_USERNAME = 'Selvan2806';

const GitHubStats = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Theme parameters for github-readme-stats
  const themeParam = isDark ? 'tokyonight' : 'default';
  const bgColor = isDark ? '0d1117' : 'ffffff';
  const borderColor = isDark ? '30363d' : 'e1e4e8';

  return (
    <section id="github" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Github className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Open Source</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">GitHub</span> Activity
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My contributions and coding activity on GitHub
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* GitHub Stats Card */}
          <motion.div
            className="glass-card p-4 rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=${themeParam}&hide_border=true&bg_color=${bgColor}&count_private=true&include_all_commits=true`}
              alt="GitHub Stats"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Top Languages Card */}
          <motion.div
            className="glass-card p-4 rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=${themeParam}&hide_border=true&bg_color=${bgColor}&langs_count=8`}
              alt="Top Languages"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Streak Stats */}
        <motion.div
          className="mt-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="glass-card p-4 rounded-xl overflow-hidden">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=${isDark ? 'tokyonight' : 'default'}&hide_border=true&background=${bgColor}`}
              alt="GitHub Streak"
              className="w-full h-auto max-w-2xl mx-auto"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* View Profile Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 text-muted-foreground hover:text-primary"
          >
            <Github className="h-5 w-5" />
            <span>View Full Profile</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
