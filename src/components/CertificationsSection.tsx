import { Award, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
    link: '/certificates/fullstack-developer-novitech.pdf',
  },
  {
    title: 'Cyber Simulation',
    issuer: 'Deloitte',
    date: '2024',
    link: '/certificates/cyber-simulation-deloitte.pdf',
  },
  {
    title: 'Computer Networks',
    issuer: 'Udemy',
    date: '2026',
    link: '/certificates/computer-networks-udemy.jpg',
  },
  {
    title: 'Introduction to Web Hacking',
    issuer: 'Udemy',
    date: '2024',
    link: '/certificates/web-hacking-udemy.pdf',
  },
  {
    title: 'UI & UX Design',
    issuer: 'Guvi & HCL',
    date: '2024',
    link: '', // Will be updated with PDF link
  },
];

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleViewCertificate = (cert: Certification) => {
    if (cert.link) {
      setSelectedCert(cert);
      setIsOpen(true);
    }
  };

  const isImage = (link: string) => {
    return link.endsWith('.jpg') || link.endsWith('.jpeg') || link.endsWith('.png') || link.endsWith('.webp');
  };

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
                  <button
                    onClick={() => handleViewCertificate(cert)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="View certificate"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
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

      {/* Certificate Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2 border-b border-border">
            <DialogTitle className="text-lg font-heading">
              {selectedCert?.title} - {selectedCert?.issuer}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full h-full overflow-auto p-4">
            {selectedCert?.link && (
              isImage(selectedCert.link) ? (
                <img
                  src={selectedCert.link}
                  alt={`${selectedCert.title} Certificate`}
                  className="w-full h-auto object-contain rounded-lg"
                />
              ) : (
                <iframe
                  src={selectedCert.link}
                  className="w-full h-full min-h-[70vh] rounded-lg"
                  title={`${selectedCert.title} Certificate`}
                />
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CertificationsSection;
