import { ExternalLink, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  image?: string;
}

const certifications: Certification[] = [
  {
    title: 'Ethical Hacking',
    issuer: 'NPTEL',
    date: '2024',
    link: '/certificates/ethical-hacking-nptel.pdf',
  },
  {
    title: 'Full Stack Developer',
    issuer: 'NOVITECH',
    date: '2024',
    link: '', // Will be updated with PDF link
  },
  {
    title: 'Cyber Simulation',
    issuer: 'Deloitte',
    date: '2024',
    link: '', // Will be updated with PDF link
  },
  {
    title: 'Computer Networks',
    issuer: 'Udemy',
    date: '2024',
    link: '', // Will be updated with PDF link
  },
  {
    title: 'Introduction to Web Hacking',
    issuer: 'Udemy',
    date: '2024',
    link: '', // Will be updated with PDF link
  },
  {
    title: 'UI & UX Design',
    issuer: 'Guvi & HCL',
    date: '2024',
    link: '', // Will be updated with PDF link
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 relative bg-secondary/20">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Achievements</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-6">
            My <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              className="glass-card neon-border p-6 hover:border-primary/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>

              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{cert.issuer}</span>
                <span>Issued: {cert.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
