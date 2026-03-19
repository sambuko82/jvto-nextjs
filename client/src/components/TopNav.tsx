import { ShieldCheck } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation } from 'wouter';

const navItems = [
  { label: 'Audit Hub', path: '/' },
  { label: 'Evidence', path: '/verify-jvto' },
  { label: 'Safety', path: '/travel-guide/ijen-health-screening' },
  { label: 'Support', path: '/why-jvto' },
];

export const TopNav = () => {
  const [location] = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-safety-orange origin-left z-[102]"
        style={{ scaleX }}
      />
      <nav className="fixed top-0 left-0 right-0 z-[101] bg-authority-navy/95 backdrop-blur-xl border-b border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="p-2 bg-safety-orange rounded-lg text-white group-hover:scale-105 transition-transform shadow-lg shadow-safety-orange/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black uppercase tracking-tighter leading-none text-white text-base">JVTO</h1>
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Protocol v1.9</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`font-mono text-[11px] uppercase tracking-widest transition-colors relative py-2 ${
                      isActive ? 'text-white font-bold' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-safety-orange"
                      />
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
