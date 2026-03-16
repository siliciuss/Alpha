import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { name: 'Shell', initials: 'SH' },
  { name: 'Baker Hughes', initials: 'BH' },
  { name: 'Schlumberger', initials: 'SL' },
  { name: 'Halliburton', initials: 'HL' },
  { name: 'BP', initials: 'BP' },
  { name: 'ExxonMobil', initials: 'EX' },
  { name: 'Chevron', initials: 'CV' },
  { name: 'TotalEnergies', initials: 'TE' },
];

const LogoEcosystem = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-industrial-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245, 165, 13, 0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-condensed font-bold text-white mb-4">
              Trusted by <span className="text-gradient">Industry Leaders</span>
            </h2>
            <p className="text-industrial-light/60 max-w-2xl mx-auto">
              Powering the digital transformation of the world's leading oil and gas
              companies
            </p>
          </div>

          {/* Orbital Ring Container */}
          <div className="relative h-64 sm:h-80 flex items-center justify-center">
            {/* Center Glow */}
            <div className="absolute w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

            {/* Orbital Ring */}
            <div
              ref={ringRef}
              className="relative w-full max-w-2xl h-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Orbit Path */}
              <div className="absolute inset-8 border border-industrial-medium/30 rounded-full" />
              <div className="absolute inset-16 border border-industrial-medium/20 rounded-full" />

              {/* Logo Items */}
              {logos.map((logo, index) => {
                const angle = (index / logos.length) * 360;
                const radius = 120;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const isHovered = hoveredLogo === logo.name;

                return (
                  <div
                    key={logo.name}
                    className="absolute left-1/2 top-1/2 transition-all duration-500"
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${isHovered ? 1.2 : 1})`,
                      animation: isPaused
                        ? 'none'
                        : `orbit 30s linear infinite`,
                      animationDelay: `${-index * (30 / logos.length)}s`,
                    }}
                    onMouseEnter={() => setHoveredLogo(logo.name)}
                    onMouseLeave={() => setHoveredLogo(null)}
                  >
                    <div
                      className={`
                        w-16 h-16 sm:w-20 sm:h-20 rounded-full
                        flex items-center justify-center
                        bg-industrial-dark border border-industrial-medium
                        transition-all duration-300 cursor-pointer
                        ${isHovered ? 'border-primary shadow-glow' : ''}
                      `}
                    >
                      <span
                        className={`
                          text-lg sm:text-xl font-condensed font-bold
                          ${isHovered ? 'text-primary' : 'text-industrial-light/60'}
                        `}
                      >
                        {logo.initials}
                      </span>
                    </div>

                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-sm text-primary font-condensed">
                          {logo.name}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
            {[
              { value: '83%', label: 'Companies Adopting AM' },
              { value: '$30B', label: 'Potential Savings' },
              { value: '70%', label: 'Consider DT Essential' },
              { value: '26%', label: 'Annual Growth Rate' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 industrial-card hover:border-primary/50 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-industrial-light/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default LogoEcosystem;
