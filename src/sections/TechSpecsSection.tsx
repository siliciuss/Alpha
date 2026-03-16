import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Layers, Ruler, Thermometer, Weight, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const specifications = [
  {
    category: 'Materials',
    icon: Layers,
    items: [
      { label: 'Super Duplex 2507', value: 'UNS S32750', status: 'certified' },
      { label: 'Inconel 718', value: 'UNS N07718', status: 'certified' },
      { label: 'Stainless Steel 316L', value: 'UNS S31603', status: 'certified' },
      { label: 'Titanium Ti-6Al-4V', value: 'Grade 5', status: 'certified' },
    ],
  },
  {
    category: 'Precision',
    icon: Ruler,
    items: [
      { label: 'Dimensional Accuracy', value: '±0.1mm', status: 'standard' },
      { label: 'Surface Roughness', value: 'Ra 3.2-6.3 μm', status: 'standard' },
      { label: 'Minimum Feature Size', value: '0.3mm', status: 'standard' },
      { label: 'Layer Thickness', value: '20-100 μm', status: 'standard' },
    ],
  },
  {
    category: 'Capabilities',
    icon: Box,
    items: [
      { label: 'Build Volume', value: '400 x 400 x 500 mm', status: 'standard' },
      { label: 'Max Part Weight', value: '50 kg', status: 'standard' },
      { label: 'Density', value: '>99.5%', status: 'standard' },
      { label: 'Heat Treatment', value: 'HIP, Solution Anneal', status: 'standard' },
    ],
  },
  {
    category: 'Standards',
    icon: Check,
    items: [
      { label: 'API Standard', value: 'API 20S Compliant', status: 'certified' },
      { label: 'DNV Certification', value: 'DNV-ST-B203', status: 'certified' },
      { label: 'Quality Assurance', value: 'CT Scanning', status: 'certified' },
      { label: 'NDT Methods', value: 'UT, MT, PT, RT', status: 'certified' },
    ],
  },
];

const TechSpecsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Cards explosion effect
      cardsRef.current.forEach((card, index) => {
        const angle = (index / cardsRef.current.length) * 360;
        const distance = 100;
        const startX = Math.cos((angle * Math.PI) / 180) * distance;
        const startY = Math.sin((angle * Math.PI) / 180) * distance;

        gsap.from(card, {
          opacity: 0,
          x: startX,
          y: startY,
          scale: 0.8,
          duration: 0.8,
          delay: 0.3 + index * 0.1,
          ease: 'power3.out',
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
      className="relative py-24 overflow-hidden bg-industrial-black"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-industrial-black via-industrial-dark/30 to-industrial-black" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <Thermometer className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-condensed tracking-wider uppercase">
                Technical Specifications
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-condensed font-bold text-white mb-4">
              Engineering <span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-industrial-light/60 max-w-2xl mx-auto text-lg">
              Certified additive manufacturing meeting rigorous oil and gas industry
              standards
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: 3D Printed Part Image */}
            <div ref={imageRef} className="relative">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/3d-printed-part.jpg"
                  alt="3D Printed Metal Part"
                  className="w-full h-auto object-cover"
                />

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-industrial-black to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Weight className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-white font-condensed font-bold">
                        Super Duplex 2507
                      </div>
                      <div className="text-sm text-industrial-light/60">
                        Corrosion-resistant alloy
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/20 rounded-xl -z-10" />
            </div>

            {/* Right: Specifications Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {specifications.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.category}
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el;
                    }}
                    className="group"
                  >
                    <div className="industrial-card p-5 h-full transition-all duration-300 group-hover:border-primary/50">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-white font-condensed font-bold">
                          {spec.category}
                        </h3>
                      </div>

                      {/* Items */}
                      <ul className="space-y-2">
                        {spec.items.map((item) => (
                          <li
                            key={item.label}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-industrial-light/60">
                              {item.label}
                            </span>
                            <span
                              className={`font-mono ${
                                item.status === 'certified'
                                  ? 'text-primary'
                                  : 'text-industrial-light/80'
                              }`}
                            >
                              {item.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certification Banner */}
          <div className="mt-16 p-6 industrial-card">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-condensed font-bold text-lg mb-2">
                  Industry Certified
                </h4>
                <p className="text-sm text-industrial-light/60">
                  All parts meet API 20S and DNV-ST-B203 standards for
                  additively manufactured metallic components
                </p>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                  <span className="text-primary font-condensed font-bold">
                    API 20S
                  </span>
                </div>
                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                  <span className="text-primary font-condensed font-bold">
                    DNV-ST-B203
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecsSection;
