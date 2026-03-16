import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Battery, Settings, Droplets, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const solutionsData = [
  {
    id: 'ev',
    name: 'Electric Vehicles',
    icon: Battery,
    color: '#00d4ff',
    image: '/autonomous-vehicle.jpg',
    solutions: [
      {
        title: 'Battery Digital Twins',
        description: 'Virtual replicas of battery packs for real-time monitoring, thermal management, and predictive maintenance.',
        benefits: ['State of Health (SoH) prediction', 'Thermal runaway prevention', 'Charging optimization'],
      },
      {
        title: 'Lightweight Structural Components',
        description: 'Topology-optimized parts that reduce vehicle weight while maintaining structural integrity.',
        benefits: ['40% weight reduction', 'Improved range', 'Enhanced performance'],
      },
      {
        title: 'Autonomous Vehicle Sensors',
        description: 'Custom sensor housings and mounts designed for optimal positioning and protection.',
        benefits: ['Precision positioning', 'Weather resistance', 'Vibration damping'],
      },
    ],
  },
  {
    id: 'robotics',
    name: 'Robotics',
    icon: Settings,
    color: '#7c3aed',
    image: '/cobot-human.jpg',
    solutions: [
      {
        title: 'Custom End-Effectors',
        description: 'Application-specific gripper designs optimized for your exact handling requirements.',
        benefits: ['Application-specific design', 'Rapid iteration', 'Complex geometries'],
      },
      {
        title: 'Actuator Components',
        description: 'Precision-manufactured gears, housings, and linkages for robotic joints.',
        benefits: ['High precision', 'Low backlash', 'Custom ratios'],
      },
      {
        title: 'Collaborative Robot Covers',
        description: 'Soft, flexible covers for cobots ensuring safety in human-robot collaboration.',
        benefits: ['Safety compliance', 'Easy maintenance', 'Custom branding'],
      },
    ],
  },
  {
    id: 'oilgas',
    name: 'Oil & Gas',
    icon: Droplets,
    color: '#f5a50d',
    image: '/hero-oilgas.jpg',
    solutions: [
      {
        title: 'Downhole Tools',
        description: 'Corrosion-resistant drilling components manufactured from Super Duplex and Inconel.',
        benefits: ['API 20S certified', 'High pressure rating', 'Extended lifespan'],
      },
      {
        title: 'Valve Components',
        description: 'Rapid repair solutions for critical valve systems using DED cladding.',
        benefits: ['On-demand production', 'Reduced downtime', 'Cost savings'],
      },
      {
        title: 'Pump Impellers',
        description: 'Performance-optimized impellers with complex internal geometries.',
        benefits: ['15% efficiency gain', 'Custom designs', 'Rapid delivery'],
      },
    ],
  },
];

const SolutionsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const activeIndustry = solutionsData[activeTab];

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative py-24 overflow-hidden bg-industrial-black"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-industrial-black via-industrial-dark/30 to-industrial-black" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Solutions
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Industry-Specific{' '}
              <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Tailored solutions designed to address the unique challenges of each industry.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {solutionsData.map((industry, index) => {
              const Icon = industry.icon;
              const isActive = activeTab === index;

              return (
                <button
                  key={industry.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'glass border-opacity-100'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  style={{
                    borderColor: isActive ? industry.color : 'transparent',
                    borderWidth: '1px',
                    boxShadow: isActive ? `0 0 30px ${industry.color}30` : 'none',
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: isActive ? industry.color : 'rgba(255,255,255,0.5)' }}
                  />
                  <span
                    className={`font-medium ${
                      isActive ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {industry.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div ref={contentRef} className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl h-96">
                <img
                  src={activeIndustry.image}
                  alt={activeIndustry.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    background: `linear-gradient(135deg, ${activeIndustry.color}, transparent)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-transparent to-transparent" />
              </div>

              {/* Industry Badge */}
              <div
                className="absolute top-4 left-4 px-4 py-2 rounded-lg font-medium text-sm"
                style={{
                  background: `${activeIndustry.color}20`,
                  color: activeIndustry.color,
                  border: `1px solid ${activeIndustry.color}40`,
                }}
              >
                {activeIndustry.name}
              </div>
            </div>

            {/* Solutions List */}
            <div className="space-y-6">
              {activeIndustry.solutions.map((solution, index) => (
                <div
                  key={index}
                  className="glass p-6 rounded-xl hover:border-primary/30 transition-colors"
                >
                  <h3
                    className="text-xl font-display font-bold mb-2"
                    style={{ color: activeIndustry.color }}
                  >
                    {solution.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{solution.description}</p>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2">
                    {solution.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs"
                        style={{
                          background: `${activeIndustry.color}15`,
                          color: activeIndustry.color,
                        }}
                      >
                        <Check className="w-3 h-3" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* CTA */}
              <button
                className="w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${activeIndustry.color}30, ${activeIndustry.color}10)`,
                  color: activeIndustry.color,
                  border: `1px solid ${activeIndustry.color}50`,
                }}
              >
                View All {activeIndustry.name} Solutions
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
