import { useParallax, useScrollProgress } from '@/hooks/use-parallax';

const ParallaxBackground = () => {
  const offset1 = useParallax(0.15);
  const offset2 = useParallax(0.25);
  const offset3 = useParallax(0.1);
  const progress = useScrollProgress();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary floating orb - top right */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] transition-transform duration-100 ease-out"
        style={{
          top: `${-100 + offset1}px`,
          right: '-150px',
          transform: `rotate(${progress * 45}deg)`,
        }}
      />

      {/* Secondary floating orb - bottom left */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/15 blur-[100px] transition-transform duration-100 ease-out"
        style={{
          bottom: `${-200 + offset2}px`,
          left: '-100px',
          transform: `rotate(${-progress * 30}deg)`,
        }}
      />

      {/* Accent orb - center right */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[80px] transition-transform duration-100 ease-out"
        style={{
          top: `${300 - offset3}px`,
          right: '10%',
          opacity: 0.6,
        }}
      />

      {/* Small floating particles */}
      <div
        className="absolute w-4 h-4 rounded-full bg-primary/40"
        style={{
          top: `${200 + offset1 * 2}px`,
          left: '15%',
        }}
      />
      <div
        className="absolute w-3 h-3 rounded-full bg-accent/50"
        style={{
          top: `${400 - offset2 * 1.5}px`,
          right: '20%',
        }}
      />
      <div
        className="absolute w-2 h-2 rounded-full bg-primary/60"
        style={{
          top: `${600 + offset3 * 2}px`,
          left: '25%',
        }}
      />
      <div
        className="absolute w-5 h-5 rounded-full bg-secondary/30"
        style={{
          top: `${800 - offset1}px`,
          right: '30%',
        }}
      />
      <div
        className="absolute w-3 h-3 rounded-full bg-accent/40"
        style={{
          top: `${1000 + offset2}px`,
          left: '10%',
        }}
      />

      {/* Animated gradient lines */}
      <div
        className="absolute w-[2px] h-[300px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        style={{
          top: `${100 + offset1 * 0.5}px`,
          left: '5%',
          transform: `scaleY(${1 + progress * 0.5})`,
        }}
      />
      <div
        className="absolute w-[2px] h-[400px] bg-gradient-to-b from-transparent via-accent/15 to-transparent"
        style={{
          top: `${500 - offset2 * 0.3}px`,
          right: '8%',
          transform: `scaleY(${1 + progress * 0.3})`,
        }}
      />

      {/* Geometric shapes */}
      <div
        className="absolute w-20 h-20 border border-primary/10 rotate-45 transition-transform duration-300"
        style={{
          top: `${350 + offset3}px`,
          left: '8%',
          transform: `rotate(${45 + progress * 90}deg)`,
        }}
      />
      <div
        className="absolute w-16 h-16 border border-accent/10 transition-transform duration-300"
        style={{
          top: `${750 - offset1}px`,
          right: '12%',
          transform: `rotate(${progress * 180}deg)`,
        }}
      />
      <div
        className="absolute w-12 h-12 border border-secondary/15 rotate-12 transition-transform duration-300"
        style={{
          top: `${1200 + offset2 * 0.5}px`,
          left: '20%',
          transform: `rotate(${12 + progress * 120}deg)`,
        }}
      />

      {/* Grid overlay with parallax */}
      <div
        className="absolute inset-0 cyber-grid opacity-50"
        style={{
          transform: `translateY(${offset1 * 0.1}px)`,
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
