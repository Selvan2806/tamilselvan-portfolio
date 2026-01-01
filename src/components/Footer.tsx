const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-primary/10">
      {/* Top decorative line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl font-semibold gradient-text tracking-wide">TAMILSELVAN P</span>
          </div>
          <p className="text-sm text-muted-foreground tracking-wide">
            © {currentYear} All rights reserved. Crafted with precision.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;