import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  FileSearch,
  Cpu,
  Cloud,
  Settings,
  Shield,
  BarChart3,
  TrendingUp,
  Clock,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const aiFeatures = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Continuous analysis of machine signals with instant anomaly detection and alerts.',
    color: '#00d4ff',
  },
  {
    icon: FileSearch,
    title: 'GenAI Document Analysis',
    description: 'Generative AI analyzes maintenance documents and manuals for contextual insights.',
    color: '#7c3aed',
  },
  {
    icon: Cpu,
    title: 'Custom AI Models',
    description: 'Bespoke machine learning models tailored to your specific equipment requirements.',
    color: '#f5a50d',
  },
  {
    icon: Cloud,
    title: 'Cloud Integration',
    description: 'Seamless connection between on-premise machinery and cloud analytics.',
    color: '#10b981',
  },
  {
    icon: Settings,
    title: 'Automated Workflows',
    description: 'AI automatically generates and prioritizes work orders when failures are detected.',
    color: '#ec4899',
  },
  {
    icon: Shield,
    title: 'Predictive Maintenance',
    description: 'Accurate failure prediction enabling preemptive maintenance to reduce downtime.',
    color: '#00d4ff',
  },
];

const aiStats = [
  { value: 99.7, suffix: '%', label: 'Prediction Accuracy', icon: TrendingUp },
  { value: 75, suffix: '%', label: 'Downtime Reduction', icon: Clock },
  { value: 40, suffix: '%', label: 'Cost Savings', icon: BarChart3 },
  { value: 24, suffix: '/7', label: 'Monitoring', icon: Activity },
];

const AIaaSSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(aiStats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          aiStats.forEach((stat, index) => {
            gsap.to(
              { value: 0 },
              {
                value: stat.value,
                duration: 2,
                ease: 'power2.out',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ai-services"
      className="relative py-24 overflow-hidden bg-industrial-black"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/ai-neural-network.jpg"
          alt="AI Neural Network"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-industrial-black via-industrial-black/95 to-industrial-black" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 58, 237, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium tracking-wider uppercase">
                AI as a Service
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Intelligence at{' '}
              <span className="text-gradient">Scale</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Machine learning algorithms that predict failures, optimize operations,
              and transform raw data into actionable insights.
            </p>
          </div>

          {/* Stats Row */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {aiStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="relative glass p-6 text-center group hover:border-primary/50 transition-colors"
                >
                  {/* HUD Ring Effect */}
                  <div className="absolute inset-0 rounded-xl border border-primary/20 group-hover:border-primary/50 transition-colors" />
                  <div className="absolute -inset-1 rounded-xl bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-4xl font-bold text-gradient mb-1 font-display">
                      {counters[index]}
                      <span className="text-2xl">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="group relative"
                >
                  <div className="glass p-6 h-full transition-all duration-500 group-hover:border-primary/50">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-display font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover Indicator */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: feature.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alert Banner */}
          <div className="mt-12 p-6 glass rounded-xl border border-amber-500/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-display font-bold mb-1">
                  Proactive vs. Reactive Maintenance
                </h4>
                <p className="text-white/60 text-sm">
                  Our AI models detect anomalies up to 72 hours before failure,
                  giving you time to schedule maintenance and avoid costly downtime.
                  Traditional reactive approaches cost 3-5x more than predictive maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIaaSSection;
