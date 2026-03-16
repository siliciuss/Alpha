import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Brain, Printer, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    icon: Box,
    title: 'Digital Twin Creation',
    description:
      'Create precise virtual replicas of physical assets using real-time sensor data, CAD models, and IoT integration for comprehensive monitoring.',
    features: ['3D Modeling', 'Sensor Integration', 'Real-time Sync'],
  },
  {
    icon: Brain,
    title: 'AI Analysis & Prediction',
    description:
      'Machine learning algorithms analyze operational data to predict failures, optimize performance, and recommend maintenance schedules.',
    features: ['Predictive Analytics', 'Anomaly Detection', 'Optimization'],
  },
  {
    icon: Printer,
    title: 'Additive Manufacturing',
    description:
      'On-demand 3D printing of metal components with complex geometries, reducing lead times from months to days.',
    features: ['Metal 3D Printing', 'Complex Geometries', 'Rapid Production'],
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Path drawing animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1,
          },
        });
      }

      // Cards entrance animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.95,
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
      className="relative py-24 overflow-hidden bg-industrial-black"
    >
      {/* Circuit Board Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10h30v30h30v30"
                fill="none"
                stroke="rgba(245, 165, 13, 0.3)"
                strokeWidth="1"
              />
              <circle cx="10" cy="10" r="2" fill="rgba(245, 165, 13, 0.5)" />
              <circle cx="40" cy="40" r="2" fill="rgba(245, 165, 13, 0.5)" />
              <circle cx="70" cy="70" r="2" fill="rgba(245, 165, 13, 0.5)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary text-sm font-condensed tracking-wider uppercase">
                Our Process
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-condensed font-bold text-white mb-4">
              The <span className="text-gradient">Intelligent</span> Process
            </h2>
            <p className="text-industrial-light/60 max-w-2xl mx-auto text-lg">
              From digital twin creation to AI-powered analysis and additive
              manufacturing execution
            </p>
          </div>

          {/* Connected Cards */}
          <div className="relative">
            {/* Connection Path (Desktop) */}
            <svg
              className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden lg:block"
              preserveAspectRatio="none"
            >
              <path
                ref={pathRef}
                d="M 100 8 Q 300 8 400 8 Q 500 8 600 8 Q 700 8 900 8"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f5a50d" />
                  <stop offset="50%" stopColor="#f8c53a" />
                  <stop offset="100%" stopColor="#f5a50d" />
                </linearGradient>
              </defs>
            </svg>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el;
                    }}
                    className="group relative"
                  >
                    {/* Card */}
                    <div className="industrial-card p-8 h-full transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-glow">
                      {/* Step Number */}
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-industrial-black font-bold text-lg">
                        {index + 1}
                      </div>

                      {/* Icon */}
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-condensed font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-industrial-light/60 mb-6 text-sm leading-relaxed">
                        {step.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {step.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-industrial-medium/50 rounded-full text-xs text-industrial-light/80"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Arrow (not on last card) */}
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                          <ArrowRight className="w-8 h-8 text-primary/50" />
                        </div>
                      )}
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-industrial-light/60 mb-6">
              Ready to transform your manufacturing process?
            </p>
            <button className="btn-primary">Schedule a Consultation</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
