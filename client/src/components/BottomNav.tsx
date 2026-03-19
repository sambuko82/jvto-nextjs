import { ShieldCheck, MapPin, Users, BookOpen, Search } from 'lucide-react';
import { Link, useLocation } from 'wouter';

const navItems = [
  { label: 'Hub', path: '/', icon: ShieldCheck },
  { label: 'Destinations', path: '/destinations', icon: MapPin },
  { label: 'Team', path: '/team', icon: Users },
  { label: 'Guide', path: '/travel-guide', icon: BookOpen },
  { label: 'Verify', path: '/verify-jvto', icon: Search },
];

export const BottomNav = () => {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-authority-navy/95 backdrop-blur-xl border-t border-white/10">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(item => {
          const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <button className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all">
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-safety-orange' : 'text-slate-500'}`} />
                <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${isActive ? 'text-safety-orange font-bold' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
