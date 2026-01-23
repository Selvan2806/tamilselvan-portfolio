import { useParallax, useScrollProgress } from '@/hooks/use-parallax';

const ParallaxBackground = () => {
  const offset1 = useParallax(0.12);
  const offset2 = useParallax(0.2);
  const offset3 = useParallax(0.08);
  const progress = useScrollProgress();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated mesh gradient background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 70%, hsl(var(--accent) / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 50% 50%, hsl(var(--secondary) / 0.08) 0%, transparent 60%)
          `,
          transform: `translateY(${offset1 * 0.3}px)`,
        }}
      />

      {/* Glowing aurora effect - top */}
      <div
        className="absolute w-full h-[500px] blur-[100px] opacity-30"
        style={{
          top: `${-100 + offset1}px`,
          background: `linear-gradient(135deg, 
            hsl(var(--primary) / 0.4) 0%, 
            hsl(280 80% 50% / 0.3) 50%, 
            hsl(var(--accent) / 0.2) 100%)`,
          transform: `rotate(${progress * 15}deg) scaleX(1.5)`,
        }}
      />

      {/* Glowing aurora effect - bottom */}
      <div
        className="absolute w-full h-[400px] blur-[120px] opacity-25"
        style={{
          bottom: `${-150 + offset2}px`,
          background: `linear-gradient(-135deg, 
            hsl(var(--accent) / 0.3) 0%, 
            hsl(var(--primary) / 0.4) 50%, 
            hsl(200 100% 50% / 0.2) 100%)`,
          transform: `rotate(${-progress * 10}deg) scaleX(1.3)`,
        }}
      />

      {/* Floating orbs with glow */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          top: `${150 + offset1}px`,
          right: '10%',
          background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)`,
          boxShadow: `0 0 80px 40px hsl(var(--primary) / 0.1)`,
          filter: 'blur(1px)',
        }}
      />
      
      <div
        className="absolute w-[250px] h-[250px] rounded-full"
        style={{
          top: `${500 - offset2}px`,
          left: '5%',
          background: `radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)`,
          boxShadow: `0 0 60px 30px hsl(var(--accent) / 0.08)`,
          filter: 'blur(1px)',
        }}
      />

      <div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{
          top: `${900 + offset3}px`,
          right: '20%',
          background: `radial-gradient(circle, hsl(280 80% 50% / 0.12) 0%, transparent 70%)`,
          boxShadow: `0 0 50px 25px hsl(280 80% 50% / 0.06)`,
          filter: 'blur(1px)',
        }}
      />

      {/* Animated light streaks */}
      <div
        className="absolute w-[2px] h-[200px] opacity-40"
        style={{
          top: `${80 + offset1 * 0.5}px`,
          left: '8%',
          background: `linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.6), transparent)`,
          transform: `scaleY(${1 + progress * 0.8}) rotate(15deg)`,
        }}
      />
      
      <div
        className="absolute w-[2px] h-[250px] opacity-30"
        style={{
          top: `${400 - offset2 * 0.4}px`,
          right: '12%',
          background: `linear-gradient(to bottom, transparent, hsl(var(--accent) / 0.5), transparent)`,
          transform: `scaleY(${1 + progress * 0.6}) rotate(-10deg)`,
        }}
      />

      <div
        className="absolute w-[1px] h-[180px] opacity-35"
        style={{
          top: `${700 + offset3 * 0.3}px`,
          left: '25%',
          background: `linear-gradient(to bottom, transparent, hsl(280 80% 50% / 0.5), transparent)`,
          transform: `scaleY(${1 + progress * 0.5}) rotate(8deg)`,
        }}
      />

      {/* Floating particles with subtle glow */}
      {[
        { size: 6, top: 180, left: '12%', color: 'primary', offsetMult: 2.5 },
        { size: 4, top: 350, right: '18%', color: 'accent', offsetMult: -2 },
        { size: 5, top: 550, left: '22%', color: 'primary', offsetMult: 1.8 },
        { size: 3, top: 720, right: '28%', color: 'accent', offsetMult: -1.5 },
        { size: 4, top: 900, left: '15%', color: 'primary', offsetMult: 2 },
        { size: 5, top: 1100, right: '22%', color: 'accent', offsetMult: -2.2 },
        { size: 3, top: 280, right: '8%', color: 'primary', offsetMult: 1.5 },
        { size: 4, top: 620, left: '6%', color: 'accent', offsetMult: -1.8 },
      ].map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            top: `${particle.top + (i % 2 === 0 ? offset1 : offset2) * particle.offsetMult}px`,
            left: particle.left,
            right: particle.right,
            background: `hsl(var(--${particle.color}))`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.size}px hsl(var(--${particle.color}) / 0.4)`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Subtle geometric accents */}
      <div
        className="absolute w-24 h-24 border border-primary/10 rounded-lg"
        style={{
          top: `${300 + offset3}px`,
          left: '6%',
          transform: `rotate(${45 + progress * 60}deg)`,
          boxShadow: `inset 0 0 20px hsl(var(--primary) / 0.05)`,
        }}
      />
      
      <div
        className="absolute w-16 h-16 border border-accent/10 rounded-full"
        style={{
          top: `${650 - offset1}px`,
          right: '10%',
          transform: `scale(${1 + progress * 0.3})`,
          boxShadow: `inset 0 0 15px hsl(var(--accent) / 0.05)`,
        }}
      />

      <div
        className="absolute w-20 h-20 border border-primary/8"
        style={{
          top: `${1000 + offset2 * 0.5}px`,
          left: '18%',
          transform: `rotate(${progress * 90}deg)`,
          boxShadow: `inset 0 0 18px hsl(var(--primary) / 0.04)`,
        }}
      />

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient vignette for focus */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, hsl(var(--background)) 100%)`,
          opacity: 0.4,
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
