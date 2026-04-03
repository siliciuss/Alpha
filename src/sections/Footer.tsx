import { useState, useEffect } from 'react';
import { Linkedin, Twitter, Youtube, Github, ChevronRight, Mail, Zap, Cpu, Flame } from 'lucide-react';

const footerLinks = {
  solutions: [
    { label: 'Digital Twin Platform', href: '#' },
    { label: 'Additive Manufacturing', href: '#' },
    { label: 'AI Predictive Maintenance', href: '#' },
    { label: 'Asset Management', href: '#' },
  ],
  industries: [
    { label: 'Electric Vehicles', href: '#' },
    { label: 'Robotics & Automation', href: '#' },
    { label: 'Oil & Gas & Energy', href: '#' },
    { label: 'Aerospace', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'News & Insights', href: '#' },
    { label: 'Partners', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'White Papers', href: '#' },
    { label: 'API Reference', href: '#' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Github, href: '#', label: 'GitHub' },
];

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-industrial-dark border-t border-white/5">
      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
                    <span className="text-white font-display font-bold text-lg">Ai</span>
                  </div>
                  <div>
                    <span className="text-white font-display font-bold text-lg">Sharpley</span>
                    <span className="text-primary font-display font-bold text-lg ml-1">Energy Inc.</span>
                  </div>
                </div>
                <p className="text-sm text-white/60">
                  AI-powered digital twins and additive manufacturing for Electric Vehicles,
                  Robotics, Oil & Gas & Energy industries.
                </p>
              </div>

              {/* Industry Tags */}
              <div className="flex gap-2 mb-6">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs text-cyan-400">EV</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
                  <Cpu className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-purple-400">Robotics</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-amber-400">Oil & Gas & Energy</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-white text-sm placeholder-white/30 focus:border-primary focus:outline-none"
                  />
                  <button className="bg-primary text-industrial-black px-4 py-2 rounded-r-lg hover:bg-cyan-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 hover:bg-primary hover:text-industrial-black transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-white font-display font-bold mb-4">Solutions</h4>
              <ul className="space-y-2">
                {footerLinks.solutions.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="text-white font-display font-bold mb-4">Industries</h4>
              <ul className="space-y-2">
                {footerLinks.industries.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-display font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-display font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="section-padding py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/50">
              © {currentYear} Sharpley Energy Inc. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-white/50 hover:text-primary transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
