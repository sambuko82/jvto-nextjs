import { useState } from 'react';
import { ShieldCheck, Menu, X, ChevronDown, Phone } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';

const navItems = [
  {
    label: 'Tours',
    path: '/tours',
    children: [
      { label: 'All Tours', path: '/tours', desc: 'Browse all private packages' },
      { label: 'From Surabaya', path: '/tours?from=surabaya', desc: 'Departing Surabaya' },
      { label: 'From Bali', path: '/tours?from=bali', desc: 'Departing Bali' },
    ],
  },
  {
    label: 'Destinations',
    path: '/destinations',
    children: [
      { label: 'Mount Bromo', path: '/destinations/mount-bromo', desc: '2,329m · Moderate' },
      { label: 'Kawah Ijen', path: '/destinations/ijen-crater', desc: '2,386m · Challenging' },
      { label: 'Madakaripura', path: '/destinations/madakaripura-waterfall', desc: '200m waterfall · Easy' },
      { label: 'Tumpak Sewu', path: '/destinations/tumpak-sewu', desc: 'Canyon waterfall · Moderate' },
      { label: 'Papuma Beach', path: '/destinations/papuma-beach', desc: 'Indian Ocean · Easy' },
    ],
  },
  {
    label: 'Why JVTO',
    path: '/why-jvto',
    children: [
      { label: 'Why JVTO', path: '/why-jvto', desc: 'Duty First, Business Second' },
      { label: 'Our Story', path: '/our-story', desc: 'How JVTO was built' },
      { label: 'Our Crew', path: '/team', desc: 'Verified guides & staff' },
      { label: 'Verify JVTO', path: '/verify-jvto', desc: 'Proof Library & licenses' },
    ],
  },
  {
    label: 'Travel Info',
    path: '/travel-guide',
    children: [
      { label: 'Travel Guide', path: '/travel-guide', desc: 'Health, safety & packing' },
      { label: 'Health Screening', path: '/travel-guide/ijen-health-screening', desc: 'Mandatory for Ijen' },
      { label: 'Safety Protocols', path: '/travel-guide/safety-protocols', desc: 'What JVTO enforces' },
      { label: 'Packing List', path: '/travel-guide/packing-list', desc: 'What to bring' },
      { label: 'FAQ', path: '/faq', desc: 'Common questions' },
    ],
  },
];

export const TopNav = () => {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-safety-orange origin-left z-[102]"
        style={{ scaleX }}
      />
      <nav className="fixed top-0 left-0 right-0 z-[101] bg-authority-navy/97 backdrop-blur-xl border-b border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="p-2 bg-safety-orange rounded-lg text-white group-hover:scale-105 transition-transform shadow-lg shadow-safety-orange/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black uppercase tracking-tighter leading-none text-white text-base">JVTO</h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Java Volcano Tour Operator</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = location.startsWith(item.path) && item.path !== '/';
              const hasChildren = item.children && item.children.length > 0;
              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={item.path}>
                    <button
                      className={`flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest transition-colors relative px-3 py-2 rounded-lg ${
                        isActive
                          ? 'text-white bg-white/10 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                      {hasChildren && <ChevronDown className="w-3 h-3 opacity-50" />}
                    </button>
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {hasChildren && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-authority-navy border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        {item.children.map(child => (
                          <Link key={child.path} href={child.path}>
                            <div className="px-4 py-3 hover:bg-white/5 cursor-pointer group border-b border-white/5 last:border-0">
                              <div className="font-mono text-[11px] uppercase tracking-widest text-white group-hover:text-safety-orange transition-colors">{child.label}</div>
                              <div className="font-mono text-[10px] text-slate-500 mt-0.5">{child.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6282244788833"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-safety-orange hover:bg-safety-orange/90 text-white px-4 py-2 rounded-xl font-black uppercase text-[11px] tracking-widest transition-all shadow-lg shadow-safety-orange/20"
            >
              <Phone className="w-3.5 h-3.5" />
              Book via WhatsApp
            </a>
            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-authority-navy overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map(item => (
                  <div key={item.path}>
                    <Link href={item.path}>
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="w-full text-left font-mono text-[12px] uppercase tracking-widest text-slate-300 hover:text-white py-3 border-b border-white/5 flex items-center justify-between"
                      >
                        {item.label}
                      </button>
                    </Link>
                    {item.children && (
                      <div className="pl-4 space-y-1 py-1">
                        {item.children.slice(1).map(child => (
                          <Link key={child.path} href={child.path}>
                            <button
                              onClick={() => setMobileOpen(false)}
                              className="w-full text-left font-mono text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-300 py-2"
                            >
                              {child.label}
                            </button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <a
                  href="https://wa.me/6282244788833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-safety-orange text-white px-4 py-3 rounded-xl font-black uppercase text-[11px] tracking-widest mt-4 justify-center"
                >
                  <Phone className="w-4 h-4" />
                  Book via WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
