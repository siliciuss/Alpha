import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Cpu, Flame, ArrowRight, Battery, Settings, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industryData = [
  {
    id: 'ev',
    name: 'Electric & Autonomous Vehicles',
    icon: Zap,
    color: '#00d4ff',
    gradient: 'from-cyan-500 to-blue-600',
    image: '/ev-battery.jpg',
    description: 'Revolutionizing EV manufacturing with digital twins for battery optimization, lightweight structural components, and rapid prototyping.',
    applications: [
      { icon: Battery, title: 'Battery Digital Twins', desc: 'Real-time monitoring & predictive analytics' },
      { icon: Settings, title: 'Lightweight Structures', desc: 'Topology-optimized components' },
      { icon: Zap, title: 'Thermal Management', desc: 'Advanced cooling systems' },
    ],
    stats: [
      { value: '40%', label: 'Weight Reduction' },
      { value: '60%', label: 'Faster Prototyping' },
      { value: '25%', label: 'Cost Savings' },
    ],
  },
  {
    id: 'robotics',
    name: 'Robotics & Automation',
    icon: Cpu,
    color: '#7c3aed',
    gradient: 'from-purple-500 to-pink-600',
    image: '/robotics-component.jpg',
    description: 'Enabling next-generation robotics with custom end-effectors, actuator components, and rapid design iteration capabilities.',
    applications: [
      { icon: Settings, title: 'Custom Grippers', desc: 'Application-specific designs' },
      { icon: Cpu, title: 'Actuator Housings', desc: 'Precision-manufactured parts' },
      { icon: Zap, title: 'Sensor Mounts', desc: 'Integrated positioning systems' },
    ],
    stats: [
      { value: '70%', label: 'Design Iteration Speed' },
      { value: '50%', label: 'Assembly Time Reduction' },
      { value: '90%', label: 'Customization Flexibility' },
    ],
  },
  {
    id: 'oilgas',
    name: 'Oil & Gas',
    icon: Flame,
    color: '#f5a50d',
    gradient: 'from-orange-500 to-amber-600',
    image: '/oilgas-component.jpg',
    description: 'Transforming oil and gas operations with digital twins for downhole tools, valve components, and predictive maintenance solutions.',
    applications: [
      { icon: Droplets, title: 'Downhole Tools', desc: 'Corrosion-resistant alloys' },
      { icon: Settings, title: 'Valve Components', desc: 'Rapid repair solutions' },
      { icon: Flame, title: 'Pump Impellers', desc: 'Performance-optimized designs' },
    ],
    stats: [
      { value: '90%', label: 'Lead Time Reduction' },
      { value: '50%', label: 'Inventory Savings' },
      { value: '$30B', label: 'Market Potential' },
    ],
  },
];

const IndustriesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 0.8,
          delay: index * 0.2,
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
      id="industries"
      className="relative py-24 overflow-hidden bg-industrial-black"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.5) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Industries We Serve
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Solutions Across{' '}
              <span className="text-gradient">Industries</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Tailored digital twin and additive manufacturing solutions designed
              for the unique challenges of each sector.
            </p>
          </div>

          {/* Industry Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {industryData.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.id}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="group relative"
                >
                  <div className="industrial-card overflow-hidden h-full transition-all duration-500 group-hover:border-opacity-100">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${industry.gradient} opacity-30 mix-blend-overlay`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-transparent to-transparent" />

                      {/* Icon Badge */}
                      <div
                        className="absolute top-4 left-4 w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${industry.color}40, ${industry.color}20)`,
                          boxShadow: `0 0 20px ${industry.color}40`,
                        }}
                      >
                        <Icon className="w-7 h-7" style={{ color: industry.color }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-gradient transition-all">
                        {industry.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-6 leading-relaxed">
                        {industry.description}
                      </p>

                      {/* Applications */}
                      <div className="space-y-3 mb-6">
                        {industry.applications.map((app, i) => {
                          const AppIcon = app.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                            >
                              <AppIcon
                                className="w-5 h-5 mt-0.5 flex-shrink-0"
                                style={{ color: industry.color }}
                              />
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {app.title}
                                </div>
                                <div className="text-xs text-white/50">{app.desc}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                        {industry.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div
                              className="text-lg font-bold"
                              style={{ color: industry.color }}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs text-white/50">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        className="w-full mt-6 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${industry.color}20, ${industry.color}10)`,
                          color: industry.color,
                          border: `1px solid ${industry.color}40`,
                        }}
                      >
                        Explore Solutions
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div
                    className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl"
                    style={{ background: `linear-gradient(135deg, ${industry.color}30, transparent)` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
