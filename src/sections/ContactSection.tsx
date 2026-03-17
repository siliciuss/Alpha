import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Phone, Mail, Globe, CheckCircle, Zap, Cpu, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { id: 'ev', label: 'Electric Vehicles', icon: Zap },
  { id: 'robotics', label: 'Robotics', icon: Cpu },
  { id: 'oilgas', label: 'Oil & Gas', icon: Flame },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 overflow-hidden bg-industrial-black"
    >
      {/* Background World Map Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
          {[...Array(100)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 1000}
              cy={Math.random() * 500}
              r={Math.random() * 3 + 1}
              fill="rgba(0, 212, 255, 0.5)"
            />
          ))}
          <path
            d="M200 250 Q 400 200 500 250 T 800 250"
            fill="none"
            stroke="rgba(0, 212, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
        </svg>
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Send className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Start Your{' '}
              <span className="text-gradient">Transformation</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Ready to revolutionize your manufacturing process? Let's discuss how our
              digital twin and additive manufacturing solutions can help.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 glass rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-white font-medium">R&D Office</div>
                      <div className="text-sm text-white/60">
                        100 6 Ave SW
                        <br />
                        Calgary, AB T2P 0P5, Canada
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 glass rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Phone</div>
                      <div className="text-sm text-white/60">+1 (403) 919-0123</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 glass rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Email</div>
                      <div className="text-sm text-white/60">info@sharpley.ca</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 glass rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Golbal R&D Offices</div>
                      <div className="text-sm text-white/60">
                        Calgary | London | Dresden | Prague | Bogota | Boston
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass p-6 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">24/7</div>
                    <div className="text-xs text-white/60">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">48h</div>
                    <div className="text-xs text-white/60">Response</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className={`glass p-8 rounded-2xl transition-all duration-500 ${
                  focusedField ? 'border-primary/50 shadow-glow' : ''
                }`}
              >
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-white/60">We'll get back to you within 48 hours.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">First Name</label>
                        <input
                          type="text"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-primary focus:outline-none transition-colors"
                          placeholder="John"
                          onFocus={() => setFocusedField('firstName')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Last Name</label>
                        <input
                          type="text"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-primary focus:outline-none transition-colors"
                          placeholder="Doe"
                          onFocus={() => setFocusedField('lastName')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Email</label>
                        <input
                          type="email"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-primary focus:outline-none transition-colors"
                          placeholder="john@company.com"
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Company</label>
                        <input
                          type="text"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-primary focus:outline-none transition-colors"
                          placeholder="Your Company"
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                    </div>

                    {/* Industry Selection */}
                    <div className="mb-6">
                      <label className="block text-sm text-white/60 mb-3">Industry</label>
                      <div className="grid grid-cols-3 gap-3">
                        {industries.map((industry) => {
                          const Icon = industry.icon;
                          const isSelected = selectedIndustry === industry.id;
                          return (
                            <button
                              key={industry.id}
                              type="button"
                              onClick={() => setSelectedIndustry(industry.id)}
                              className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                                isSelected
                                  ? 'border-primary bg-primary/10'
                                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-white/50'}`} />
                              <span className={`text-xs ${isSelected ? 'text-white' : 'text-white/50'}`}>
                                {industry.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm text-white/60 mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-primary focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your project..."
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary flex items-center justify-center gap-2 group"
                    >
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
