import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Clock, DollarSign, Target, Zap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 90,
    suffix: '%',
    label: 'Lead Time Reduction',
    description: 'From months to days',
    icon: Clock,
    color: '#00d4ff',
  },
  {
    value: 50,
    suffix: '%',
    label: 'Cost Savings',
    description: 'Reduced production costs',
    icon: DollarSign,
    color: '#10b981',
  },
  {
    value: 99.7,
    suffix: '%',
    label: 'AI Prediction Accuracy',
    description: 'Failure detection rate',
    icon: Target,
    color: '#7c3aed',
  },
  {
    value: 73.5,
    prefix: '$',
    suffix: 'B',
    label: 'Market by 2027',
    description: 'Automotive digital twin',
    icon: TrendingUp,
    color: '#f5a50d',
  },
];

const achievements = [
  { icon: Zap, label: '24/7', desc: 'Real-time Monitoring' },
  { icon: Award, label: 'API 20S', desc: 'Certified Production' },
  { icon: Target, label: '±0.1mm', desc: 'Precision Tolerance' },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePos({ x, y });
      }
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          stats.forEach((stat, index) => {
            gsap.to(
              { value: 0 },
              {
                value: stat.value,
                duration: 2.5,
                ease: 'power2.out',
                delay: index * 0.2,
                onUpdate: function () {
                  setCounters((prev) => {
                    const newCounters = [...prev];
                    newCounters[index] = Math.round(this.targets()[0].value * 10) / 10;
                    return newCounters;
                  });
                },
              }
            );
          });
        },
        once: true,
      });

      // Stats cards entrance
      statsRef.current.forEach((stat, index) => {
        gsap.from(stat, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-industrial-black"
      style={{ perspective: '1000px' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Proven Impact
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Results That{' '}
              <span className="text-gradient">Matter</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Real-world impact across Electric Vehicles, Robotics, and Oil & Gas industries.
            </p>
          </div>

          {/* Stats Grid - HUD Style */}
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{
              transform: `rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) statsRef.current[index] = el;
                  }}
                  className="group relative"
                >
                  <div className="relative glass p-6 text-center overflow-hidden">
                    {/* Progress Ring SVG */}
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="6"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke={stat.color}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          strokeDashoffset={`${2 * Math.PI * 42 * (1 - counters[index] / 100)}`}
                          className="transition-all duration-1000"
                          style={{ filter: `drop-shadow(0 0 4px ${stat.color})` }}
                        />
                      </svg>

                      {/* Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-8 h-8" style={{ color: stat.color }} />
                      </div>
                    </div>

                    {/* Value */}
                    <div className="text-3xl font-bold text-white font-display mb-1">
                      {stat.prefix}
                      {counters[index]}
                      <span className="text-xl">{stat.suffix}</span>
                    </div>

                    {/* Label */}
                    <h3 className="text-white font-medium mb-1">{stat.label}</h3>
                    <p className="text-sm text-white/50">{stat.description}</p>

                    {/* Corner Decorations */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 opacity-30" style={{ borderColor: stat.color }} />
                    <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 opacity-30" style={{ borderColor: stat.color }} />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 opacity-30" style={{ borderColor: stat.color }} />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 opacity-30" style={{ borderColor: stat.color }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements Row */}
          <div className="mt-12 flex justify-center gap-8">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3 glass px-6 py-3 rounded-xl">
                  <Icon className="w-6 h-6 text-primary" />
                  <div>
                    <div className="text-lg font-bold text-white">{item.label}</div>
                    <div className="text-xs text-white/50">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quote */}
          <div className="mt-16 text-center">
            <blockquote className="text-xl text-white/70 italic max-w-3xl mx-auto">
              "The global digital twin market in automotive is predicted to reach{' '}
              <span className="text-primary font-bold">$73.5 billion by 2027</span>,
              with additive manufacturing playing a critical role in production optimization."
            </blockquote>
            <cite className="block mt-4 text-sm text-white/40">
              — McKinsey Industry Report
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
