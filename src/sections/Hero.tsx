import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Zap, Cpu, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    name: 'Electric Vehicles',
    icon: Zap,
    color: 'from-cyan-500 to-blue-500',
    image: '/hero-ev.jpg',
    description: 'Battery optimization & lightweight components',
  },
  {
    name: 'Robotics',
    icon: Cpu,
    color: 'from-purple-500 to-pink-500',
    image: '/hero-robotics.jpg',
    description: 'Custom end-effectors & rapid iteration',
  },
  {
    name: 'Oil & Gas',
    icon: Flame,
    color: 'from-orange-500 to-amber-500',
    image: '/hero-oilgas.jpg',
    description: 'Downhole tools & predictive maintenance',
  },
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      panelsRef.current.forEach((panel, i) => {
        gsap.set(panel, {
          x: i === 0 ? '-100%' : i === 2 ? '100%' : 0,
          opacity: i === 1 ? 0 : 1,
          scale: i === 1 ? 0.8 : 1,
        });
      });
      gsap.set(contentRef.current, { opacity: 0, y: 50 });

      // Entrance animation
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(panelsRef.current[0], {
        x: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
        .to(
          panelsRef.current[2],
          {
            x: 0,
            duration: 1.2,
            ease: 'power4.out',
          },
          '<'
        )
        .to(
          panelsRef.current[1],
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
          },
          '<0.2'
        )
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        );

      // Scroll animation - panels converge
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=500',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          panelsRef.current.forEach((panel, i) => {
            if (i !== 1) {
              gsap.to(panel, {
                width: `${33 - progress * 33}%`,
                duration: 0.1,
              });
            } else {
              gsap.to(panel, {
                width: `${33 + progress * 67}%`,
                duration: 0.1,
              });
            }
          });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-industrial-black"
    >
      {/* Three Panel Layout */}
      <div className="absolute inset-0 flex">
        {industries.map((industry, index) => {
          const Icon = industry.icon;
          return (
            <div
              key={industry.name}
              ref={(el) => {
                if (el) panelsRef.current[index] = el;
              }}
              className="relative h-full overflow-hidden cursor-pointer group"
              style={{ width: '33.33%' }}
              onMouseEnter={() => setActivePanel(index)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 transition-transform duration-700"
                style={{
                  transform: `scale(${activePanel === index ? 1.1 : 1}) translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
                }}
              >
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${industry.color} opacity-30 mix-blend-overlay`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-black via-transparent to-transparent" />
              </div>

              {/* Panel Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 pb-24">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                    activePanel === index ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${index === 0 ? '#00d4ff' : index === 1 ? '#7c3aed' : '#f5a50d'}40, ${index === 0 ? '#00d4ff' : index === 1 ? '#7c3aed' : '#f5a50d'}20)`,
                    boxShadow: activePanel === index ? `0 0 30px ${index === 0 ? '#00d4ff' : index === 1 ? '#7c3aed' : '#f5a50d'}60` : 'none',
                  }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{
                      color: index === 0 ? '#00d4ff' : index === 1 ? '#7c3aed' : '#f5a50d',
                    }}
                  />
                </div>
                <h3
                  className={`text-xl font-display font-bold text-white mb-2 transition-all duration-500 ${
                    activePanel === index ? 'scale-110' : 'scale-100'
                  }`}
                >
                  {industry.name}
                </h3>
                <p
                  className={`text-sm text-white/70 text-center max-w-xs transition-all duration-500 ${
                    activePanel === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {industry.description}
                </p>
              </div>

              {/* Border */}
              <div
                className={`absolute inset-y-0 ${index === 0 ? 'right-0' : index === 2 ? 'left-0' : 'left-0'} w-px bg-gradient-to-b from-transparent via-white/20 to-transparent`}
              />
            </div>
          );
        })}
      </div>

      {/* Central Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center max-w-4xl px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 pointer-events-auto">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              AI as a Service
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Digital Twin
            <br />
            <span className="text-gradient">Additive Manufacturing</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Powering the future of Electric Vehicles, Robotics, and Oil & Gas with
            intelligent digital twins and on-demand additive manufacturing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
            <button className="btn-primary flex items-center justify-center gap-2 group">
              Explore Solutions
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-outline">Schedule Demo</button>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 pointer-events-auto">
        {[
          { value: '90%', label: 'Lead Time Reduction' },
          { value: '50%', label: 'Cost Savings' },
          { value: '99.7%', label: 'AI Accuracy' },
        ].map((stat, index) => (
          <div
            key={index}
            className="glass px-6 py-3 rounded-xl text-center animate-float"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <div className="text-2xl font-bold text-gradient">{stat.value}</div>
            <div className="text-xs text-white/60">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-industrial-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
