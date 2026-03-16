import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Brain, Printer, Cloud, Check, Layers, Activity, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techLayers = [
  {
    id: 'digital-twin',
    icon: Box,
    title: 'Digital Twin Core',
    subtitle: 'Virtual Replication',
    description: 'Create precise virtual replicas of physical assets with real-time synchronization, enabling comprehensive monitoring and simulation.',
    features: ['3D Modeling', 'Real-time Sync', 'Sensor Integration', 'Physics Simulation'],
    color: '#00d4ff',
    image: '/3d-part-hero.png',
  },
  {
    id: 'ai-engine',
    icon: Brain,
    title: 'AI Engine',
    subtitle: 'Intelligent Analytics',
    description: 'Machine learning algorithms analyze operational data to predict failures, optimize performance, and recommend actions.',
    features: ['Predictive Analytics', 'Anomaly Detection', 'Optimization', 'Pattern Recognition'],
    color: '#7c3aed',
    image: '/ai-neural-network.jpg',
  },
  {
    id: 'additive-manufacturing',
    icon: Printer,
    title: 'Additive Manufacturing',
    subtitle: 'On-Demand Production',
    description: 'Metal 3D printing capabilities for complex geometries, reducing lead times from months to days.',
    features: ['Metal 3D Printing', 'Complex Geometries', 'Rapid Production', 'Quality Assurance'],
    color: '#f5a50d',
    image: '/oilgas-component.jpg',
  },
  {
    id: 'integration-hub',
    icon: Cloud,
    title: 'Integration Hub',
    subtitle: 'Seamless Connectivity',
    description: 'Cloud-based APIs and connectors integrate with existing systems for unified data flow and control.',
    features: ['Cloud APIs', 'IoT Connectivity', 'Data Pipeline', 'Security'],
    color: '#10b981',
    image: '/cobot-human.jpg',
  },
];

const TechnologySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress bar animation
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );

      // Layer animations
      layersRef.current.forEach((layer, index) => {
        const isEven = index % 2 === 0;

        gsap.from(layer, {
          opacity: 0,
          x: isEven ? -100 : 100,
          duration: 1,
          scrollTrigger: {
            trigger: layer,
            start: 'top 75%',
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
      id="technology"
      className="relative py-24 overflow-hidden bg-industrial-black"
    >
      {/* Progress Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-accent to-secondary origin-top"
          style={{ height: '100%', transform: 'scaleY(0)' }}
        />
      </div>

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-industrial-black via-industrial-dark/50 to-industrial-black" />
      </div>

      <div className="relative z-10 section-padding pl-12 lg:pl-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Technology Stack
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Integrated <span className="text-gradient">Platform</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              A comprehensive technology stack that seamlessly connects digital twins,
              AI analytics, and additive manufacturing.
            </p>
          </div>

          {/* Tech Layers */}
          <div className="space-y-24">
            {techLayers.map((layer, index) => {
              const Icon = layer.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={layer.id}
                  ref={(el) => {
                    if (el) layersRef.current[index] = el;
                  }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    {/* Layer Number */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${layer.color}30, ${layer.color}10)`,
                          boxShadow: `0 0 20px ${layer.color}30`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: layer.color }} />
                      </div>
                      <div
                        className="text-5xl font-display font-bold opacity-20"
                        style={{ color: layer.color }}
                      >
                        0{index + 1}
                      </div>
                    </div>

                    <div className="text-sm font-medium mb-2" style={{ color: layer.color }}>
                      {layer.subtitle}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                      {layer.title}
                    </h3>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">
                      {layer.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {layer.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-3 rounded-lg bg-white/5"
                        >
                          <Check className="w-4 h-4 flex-shrink-0" style={{ color: layer.color }} />
                          <span className="text-sm text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`relative group ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={layer.image}
                        alt={layer.title}
                        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 opacity-30 mix-blend-overlay"
                        style={{
                          background: `linear-gradient(135deg, ${layer.color}, transparent)`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-transparent to-transparent" />
                    </div>

                    {/* Decorative Elements */}
                    <div
                      className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10 opacity-50"
                      style={{
                        background: `linear-gradient(135deg, ${layer.color}20, transparent)`,
                      }}
                    />
                    <div
                      className="absolute -top-4 -left-4 w-20 h-20 rounded-xl -z-10 opacity-30"
                      style={{
                        background: `linear-gradient(135deg, ${layer.color}30, transparent)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-4 p-6 glass rounded-2xl">
              <Activity className="w-10 h-10 text-primary" />
              <div className="text-left">
                <h4 className="text-white font-display font-bold">
                  Ready to integrate our platform?
                </h4>
                <p className="text-sm text-white/60">
                  Get a customized solution for your industry
                </p>
              </div>
              <button className="btn-primary ml-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
