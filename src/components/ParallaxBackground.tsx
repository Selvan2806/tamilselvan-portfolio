import { useMemo } from 'react';
import { useParallax, useScrollProgress } from '@/hooks/use-parallax';

// Deterministic pseudo-random so star/particle layout is stable across renders.
const seeded = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ParallaxBackground = () => {
  const offset1 = useParallax(0.12);
  const offset2 = useParallax(0.2);
  const offset3 = useParallax(0.08);
  const progress = useScrollProgress();

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const s = (n: number) => seeded(i * 99.13 + n);
        return {
          top: `${(s(1) * 100).toFixed(2)}%`,
          left: `${(s(2) * 100).toFixed(2)}%`,
          size: (s(3) * 2.4 + 1).toFixed(2),
          delay: `${(s(4) * 6).toFixed(2)}s`,
          duration: `${(s(5) * 4 + 3).toFixed(2)}s`,
          tone: s(6) > 0.66 ? 'accent' : 'primary',
        };
      }),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep base wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 18% 22%, hsl(var(--primary) / 0.18) 0%, transparent 55%),
            radial-gradient(ellipse 70% 90% at 82% 78%, hsl(var(--accent) / 0.16) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at 50% 50%, hsl(var(--secondary) / 0.12) 0%, transparent 60%)
          `,
          transform: `translateY(${offset1 * 0.25}px)`,
        }}
      />

      {/* Aurora ribbon — top */}
      <div
        className="absolute left-1/2 top-[-10%] w-[160%] h-[480px] -translate-x-1/2 rounded-[50%] blur-[90px]"
        style={{
          background: `linear-gradient(115deg,
            hsl(var(--primary) / 0.55) 0%,
            hsl(265 80% 55% / 0.45) 45%,
            hsl(var(--accent) / 0.40) 100%)`,
          animation: 'aurora-drift 22s ease-in-out infinite',
          transformOrigin: 'center',
          opacity: 0.7,
        }}
      />

      {/* Aurora ribbon — bottom */}
      <div
        className="absolute left-1/2 bottom-[-12%] w-[150%] h-[420px] -translate-x-1/2 rounded-[50%] blur-[100px]"
        style={{
          background: `linear-gradient(-115deg,
            hsl(var(--accent) / 0.45) 0%,
            hsl(var(--primary) / 0.50) 50%,
            hsl(200 100% 55% / 0.35) 100%)`,
          animation: 'aurora-drift-alt 26s ease-in-out infinite',
          transformOrigin: 'center',
          opacity: 0.6,
        }}
      />

      {/* Drifting glow orbs */}
      <div
        className="absolute w-[360px] h-[360px] rounded-full"
        style={{
          top: `${140 + offset1}px`,
          right: '8%',
          background: `radial-gradient(circle, hsl(var(--primary) / 0.28) 0%, transparent 70%)`,
          boxShadow: `0 0 100px 50px hsl(var(--primary) / 0.14)`,
          filter: 'blur(2px)',
          animation: 'orb-drift-1 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[280px] h-[280px] rounded-full"
        style={{
          top: `${520 - offset2}px`,
          left: '4%',
          background: `radial-gradient(circle, hsl(var(--accent) / 0.22) 0%, transparent 70%)`,
          boxShadow: `0 0 80px 40px hsl(var(--accent) / 0.12)`,
          filter: 'blur(2px)',
          animation: 'orb-drift-2 21s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[220px] h-[220px] rounded-full"
        style={{
          top: `${920 + offset3}px`,
          right: '22%',
          background: `radial-gradient(circle, hsl(280 80% 55% / 0.20) 0%, transparent 70%)`,
          boxShadow: `0 0 70px 30px hsl(280 80% 55% / 0.10)`,
          filter: 'blur(2px)',
          animation: 'orb-drift-3 24s ease-in-out infinite',
        }}
      />

      {/* Twinkling starfield */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background:
              star.tone === 'accent'
                ? 'hsl(var(--accent))'
                : 'hsl(var(--primary))',
            boxShadow: `0 0 ${Number(star.size) * 3}px ${Number(star.size) / 2}px ${
              star.tone === 'accent'
                ? 'hsl(var(--accent) / 0.6)'
                : 'hsl(var(--primary) / 0.6)'
            }`,
            animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}

      {/* Perspective grid floor — fades into distance */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[45vh] opacity-[0.35]"
        style={{
          background: `
            linear-gradient(to right, hsl(var(--primary) / 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'linear-gradient(to top, black 5%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top, black 5%, transparent 80%)',
          transform: `perspective(420px) rotateX(68deg) translateY(${offset2 * 0.15}px)`,
          transformOrigin: 'bottom center',
          animation: 'grid-pan 6s linear infinite',
        }}
      />

      {/* Falling light streaks */}
      {[
        { left: '12%', delay: '0s', dur: '9s', color: 'primary', w: 2 },
        { left: '38%', delay: '3s', dur: '11s', color: 'accent', w: 1 },
        { left: '63%', delay: '1.5s', dur: '10s', color: 'primary', w: 2 },
        { left: '85%', delay: '5s', dur: '13s', color: 'accent', w: 1 },
      ].map((streak, i) => (
        <div
          key={i}
          className="absolute top-0 h-[220px] rounded-full"
          style={{
            left: streak.left,
            width: `${streak.w}px`,
            background: `linear-gradient(to bottom, transparent, ${
              streak.color === 'accent'
                ? 'hsl(var(--accent) / 0.7)'
                : 'hsl(var(--primary) / 0.8)'
            }, transparent)`,
            filter: 'blur(0.5px)',
            animation: `streak-fall ${streak.dur} linear ${streak.delay} infinite`,
          }}
        />
      ))}

      {/* Floating geometric accents */}
      <div
        className="absolute w-24 h-24 border border-primary/10 rounded-lg"
        style={{
          top: `${300 + offset3}px`,
          left: '6%',
          transform: `rotate(${45 + progress * 60}deg)`,
          boxShadow: `inset 0 0 20px hsl(var(--primary) / 0.06)`,
        }}
      />
      <div
        className="absolute w-16 h-16 border border-accent/10 rounded-full"
        style={{
          top: `${650 - offset1}px`,
          right: '10%',
          transform: `scale(${1 + progress * 0.3})`,
          boxShadow: `inset 0 0 15px hsl(var(--accent) / 0.06)`,
        }}
      />
      <div
        className="absolute w-20 h-20 border border-primary/10"
        style={{
          top: `${1000 + offset2 * 0.5}px`,
          left: '18%',
          transform: `rotate(${progress * 90}deg)`,
          boxShadow: `inset 0 0 18px hsl(var(--primary) / 0.05)`,
        }}
      />

      {/* Grain overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette to keep focus centered */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 75% 75% at 50% 50%, transparent 0%, hsl(var(--background) / 0.9) 100%)`,
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
