import { useState, useRef } from 'react';
import { ShieldCheck, Menu, X, ChevronDown, Phone, Mountain, Waves, Users, FileCheck, BookOpen, HelpCircle, Star, MapPin } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';

const navItems = [
  {
    label: 'Tours',
    path: '/tours',
    children: [
      { label: 'All Private Tours', path: '/tours', desc: 'Browse all 16 packages', icon: Mountain },
      { label: 'From Surabaya', path: '/tours?departure=surabaya', desc: 'Direct East Java routes', icon: MapPin },
      { label: 'From Bali', path: '/tours?departure=bali', desc: 'Connected overland routes', icon: MapPin },
      { label: 'ISIC Student Discount', path: '/isic', desc: '10% off for students', icon: Star },
    ],
  },
  {
    label: 'Destinations',
    path: '/destinations',
    children: [
      { label: 'Mount Bromo', path: '/destinations/mount-bromo', desc: 'Active volcano, 2,329m', icon: Mountain },
      { label: 'Kawah Ijen', path: '/destinations/ijen-crater', desc: 'Blue fire crater, 2,769m', icon: Mountain },
      { label: 'Madakaripura', path: '/destinations/madakaripura-waterfall', desc: 'Sacred 200m canyon', icon: Waves },
      { label: 'Tumpak Sewu', path: '/destinations/tumpak-sewu-waterfall', desc: 'Thousand waterfalls', icon: Waves },
      { label: 'Papuma Beach', path: '/destinations/papuma-beach', desc: 'Pristine crescent bay', icon: Waves },
    ],
  },
  {
    label: 'Why JVTO',
    path: '/why-jvto',
    children: [
      { label: 'Why JVTO', path: '/why-jvto', desc: 'Proof-based tourism model', icon: ShieldCheck },
      { label: 'Our Story', path: '/our-story', desc: 'Founded 2010, Bondowoso', icon: BookOpen },
      { label: 'Our Team', path: '/team', desc: '14 verified crew members', icon: Users },
      { label: 'Reviews', path: '/reviews', desc: '4.7★ Trustpilot · 5.0★ TripAdvisor', icon: Star },
      { label: 'Verify JVTO', path: '/verify-jvto', desc: 'Legal, police & press proof', icon: FileCheck },
    ],
  },
  {
    label: 'Travel Info',
    path: '/travel-guide',
    children: [
      { label: 'Travel Guide', path: '/travel-guide', desc: 'Plan before you book', icon: BookOpen },
      { label: 'Ijen Health Screening', path: '/travel-guide/ijen-health-screening', desc: 'Mandatory for Ijen routes', icon: ShieldCheck },
      { label: 'Safety on Tours', path: '/travel-guide/safety-on-tours', desc: 'Police-led protocols', icon: ShieldCheck },
      { label: 'Booking Information', path: '/travel-guide/booking-information', desc: 'How the process works', icon: BookOpen },
      { label: 'FAQ', path: '/faq', desc: 'Common questions answered', icon: HelpCircle },
    ],
  },
];

export const TopNav = () => {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-safety-orange origin-left z-[102]"
        style={{ scaleX }}
      />

      <nav className="fixed top-[2px] left-0 right-0 z-[101] bg-authority-navy/98 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-14">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 bg-safety-orange rounded-lg flex items-center justify-center shadow-orange group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-none">
              <div className="text-white font-black text-sm tracking-tight uppercase leading-none">JVTO</div>
              <div className="text-white/35 font-mono text-[9px] uppercase tracking-[0.14em] leading-none mt-0.5">Java Volcano Tour Operator</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map(item => {
              const isActive = location.startsWith(item.path) && item.path !== '/';
              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={item.path}>
                    <button className={`flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-all px-3 py-2 rounded-lg ${
                      isActive
                        ? 'text-safety-orange bg-safety-orange/10 font-bold'
                        : 'text-white/60 hover:text-white hover:bg-white/6 font-semibold'
                    }`}>
                      {item.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180 text-safety-orange' : 'opacity-40'}`} />
                    </button>
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.13 }}
                        className="absolute top-full left-0 mt-1.5 w-64 bg-[#0d1829] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.children.map((child, i) => {
                          const Icon = child.icon;
                          return (
                            <Link key={child.path} href={child.path}>
                              <div
                                className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group cursor-pointer"
                                style={{ borderBottom: i < item.children.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                              >
                                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-safety-orange/15 transition-colors">
                                  <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-safety-orange transition-colors" />
                                </div>
                                <div>
                                  <div className="text-white text-[11px] font-bold uppercase tracking-wide leading-none group-hover:text-safety-orange transition-colors">{child.label}</div>
                                  <div className="text-white/35 text-[10px] font-mono mt-0.5 leading-none">{child.desc}</div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/verify-jvto">
              <button className="flex items-center gap-1.5 text-white/50 hover:text-verified-lime font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-2 rounded-lg hover:bg-verified-lime/8 transition-all">
                <FileCheck className="w-3.5 h-3.5" />
                Verify JVTO
              </button>
            </Link>
            <a
              href="https://wa.me/6282244788833?text=Hi%20JVTO%2C%20I%27d%20like%20to%20inquire%20about%20a%20private%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-safety-orange hover:bg-safety-orange/90 text-white font-black text-[11px] uppercase tracking-[0.12em] px-4 py-2 rounded-lg transition-all shadow-orange hover:shadow-orange-lg hover:-translate-y-px"
            >
              <Phone className="w-3.5 h-3.5" />
              Book via WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/8 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-white/8 bg-authority-navy overflow-hidden"
            >
              <div className="px-5 py-4 space-y-0.5">
                {navItems.map(item => (
                  <div key={item.path}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-3 text-white/60 hover:text-white font-mono text-[11px] uppercase tracking-[0.12em] rounded-lg hover:bg-white/5 transition-colors"
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileExpanded === item.label ? 'rotate-180 text-safety-orange' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-3 space-y-0.5 overflow-hidden"
                        >
                          {item.children.map(child => {
                            const Icon = child.icon;
                            return (
                              <Link key={child.path} href={child.path}>
                                <button
                                  onClick={() => setMobileOpen(false)}
                                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-white/45 hover:text-white font-mono text-[10px] uppercase tracking-wider rounded-lg hover:bg-white/5 transition-colors"
                                >
                                  <Icon className="w-3 h-3 flex-shrink-0" />
                                  {child.label}
                                </button>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/8 space-y-2">
                  <a
                    href="https://wa.me/6282244788833?text=Hi%20JVTO%2C%20I%27d%20like%20to%20inquire%20about%20a%20private%20tour."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-safety-orange text-white font-black text-[11px] uppercase tracking-[0.12em] px-4 py-3 rounded-lg shadow-orange"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
};
