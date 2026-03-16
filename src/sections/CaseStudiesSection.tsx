import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ArrowRight, TrendingUp, Clock, DollarSign, Zap, Cpu, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    company: 'Tesla',
    industry: 'Electric Vehicles',
    icon: Zap,
    color: '#00d4ff',
    location: 'Gigafactory Nevada',
    title: 'Battery Pack Optimization',
    description:
      'Tesla implemented digital twin technology for battery pack design, enabling virtual testing of thermal management systems and structural integrity before physical prototyping.',
    results: [
      { icon: Clock, value: '50%', label: 'Development Time' },
      { icon: DollarSign, value: '$12M', label: 'Cost Savings' },
      { icon: TrendingUp, value: '15%', label: 'Efficiency Gain' },
    ],
    quote:
      'Digital twins have revolutionized our battery development process, allowing us to iterate designs in days rather than months.',
    quotee: 'Tesla Engineering Team',
    image: '/ev-battery.jpg',
  },
  {
    company: 'Boston Dynamics',
    industry: 'Robotics',
    icon: Cpu,
    color: '#7c3aed',
    location: 'Waltham, Massachusetts',
    title: 'Custom Actuator Components',
    description:
      'Boston Dynamics leveraged additive manufacturing to produce lightweight, high-strength actuator components for their Spot robot, enabling unprecedented mobility and agility.',
    results: [
      { icon: TrendingUp, value: '40%', label: 'Weight Reduction' },
      { icon: Clock, value: '70%', label: 'Iteration Speed' },
      { icon: DollarSign, value: '30%', label: 'Production Cost' },
    ],
    quote:
      '3D printing allows us to create geometries impossible with traditional manufacturing, pushing the boundaries of robotic performance.',
    quotee: 'Boston Dynamics R&D',
    image: '/robotics-component.jpg',
  },
  {
    company: 'Shell',
    industry: 'Oil & Gas',
    icon: Flame,
    color: '#f5a50d',
    location: 'Offshore Gulf of Mexico',
    title: 'ESP Impeller Manufacturing',
    description:
      'Shell deployed 3D-printed ESP impellers for offshore operations, reducing production time from 6 months to 40 days while improving pump efficiency.',
    results: [
      { icon: Clock, value: '85%', label: 'Time Reduction' },
      { icon: DollarSign, value: '$2.4M', label: 'Cost Savings' },
      { icon: TrendingUp, value: '12%', label: 'Efficiency Gain' },
    ],
    quote:
      'The actual printing, heat-treatment, and testing was completed within 40 days, approximately 85% less time than conventional methods.',
    quotee: 'Shell Engineering Team',
    image: '/oilgas-component.jpg',
  },
];

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
      id="case-studies"
      className="relative py-24 overflow-hidden bg-industrial-black"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-industrial-black via-industrial-dark/20 to-industrial-black" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Quote className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Success Stories
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Industry <span className="text-gradient">Case Studies</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Real-world implementations delivering measurable results across industries.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <div
                  key={study.company}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="group"
                >
                  <div className="glass h-full flex flex-col transition-all duration-500 group-hover:border-primary/50 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.company}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 opacity-40 mix-blend-overlay"
                        style={{ background: `linear-gradient(135deg, ${study.color}, transparent)` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-transparent to-transparent" />

                      {/* Industry Badge */}
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-2"
                        style={{
                          background: `${study.color}30`,
                          color: study.color,
                          border: `1px solid ${study.color}50`,
                        }}
                      >
                        <Icon className="w-3 h-3" />
                        {study.industry}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-display font-bold text-white">
                          {study.company}
                        </h3>
                        <span className="text-xs text-white/40">{study.location}</span>
                      </div>

                      <h4 className="text-lg mb-3" style={{ color: study.color }}>
                        {study.title}
                      </h4>

                      <p className="text-white/60 text-sm mb-6 flex-1">
                        {study.description}
                      </p>

                      {/* Results */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {study.results.map((result, i) => {
                          const ResultIcon = result.icon;
                          return (
                            <div key={i} className="text-center p-2 rounded-lg bg-white/5">
                              <ResultIcon className="w-4 h-4 mx-auto mb-1" style={{ color: study.color }} />
                              <div className="text-sm font-bold text-white">{result.value}</div>
                              <div className="text-xs text-white/50">{result.label}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-sm text-white/50 italic border-l-2 pl-3 mb-3" style={{ borderColor: study.color }}>
                        "{study.quote}"
                      </blockquote>
                      <cite className="text-xs text-white/30">— {study.quotee}</cite>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10">
                      <button
                        className="w-full py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all"
                        style={{
                          background: `${study.color}15`,
                          color: study.color,
                        }}
                      >
                        Read Full Case Study
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
