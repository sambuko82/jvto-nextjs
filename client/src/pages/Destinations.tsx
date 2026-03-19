import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { MapPin, Filter, ArrowRight, CheckCircle2, Clock, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const STATIC_DESTINATIONS = [
  { slug: 'ijen-crater', title: 'Ijen Crater', category: 'Volcano', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80', shortDesc: 'Witness the legendary blue fire phenomenon at 2,386m altitude in the world\'s largest acidic crater lake.', altitude: '2,386m', difficulty: 'challenging', duration: '3–4 hours hike', bestTime: 'May–October' },
  { slug: 'mount-bromo', title: 'Mount Bromo', category: 'Volcano', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80', shortDesc: 'Iconic active volcano in the Tengger Massif — sunrise views over the Sea of Sand are unmatched.', altitude: '2,329m', difficulty: 'moderate', duration: '2–3 hours', bestTime: 'April–October' },
  { slug: 'madakaripura-waterfall', title: 'Madakaripura Waterfall', category: 'Waterfall', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', shortDesc: 'Indonesia\'s tallest waterfall at 200m, hidden in a sacred canyon — the last meditation site of Gajah Mada.', altitude: '200m', difficulty: 'easy', duration: '2 hours', bestTime: 'Year-round' },
  { slug: 'tumpak-sewu', title: 'Tumpak Sewu Waterfall', category: 'Waterfall', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80', shortDesc: 'The "Niagara of Java" — a curtain waterfall 120m wide, surrounded by jungle and mist.', altitude: '500m', difficulty: 'moderate', duration: '3–4 hours', bestTime: 'May–September' },
  { slug: 'papuma-beach', title: 'Papuma Beach', category: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', shortDesc: 'Pristine white sand beach with dramatic rock formations, accessible only via private tour.', altitude: '0m', difficulty: 'easy', duration: '1 hour drive', bestTime: 'April–October' },
];

const CATEGORIES = ['All', 'Volcano', 'Waterfall', 'Beach'];
const DIFFICULTIES = ['All', 'easy', 'moderate', 'challenging', 'extreme'];

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const { data: destinations } = trpc.destinations.list.useQuery();

  const displayDests = (destinations && destinations.length > 0) ? destinations : STATIC_DESTINATIONS;

  const filtered = displayDests.filter((d: any) => {
    const catMatch = activeCategory === 'All' || d.category === activeCategory;
    const diffMatch = activeDifficulty === 'All' || d.difficulty === activeDifficulty;
    return catMatch && diffMatch;
  });

  return (
    <GlobalLayout>
      {/* Header — Forensic dark */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(140deg, #0F172A 0%, #0A1628 100%)' }}>
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="kicker kicker-dark mb-6">
            <MapPin className="w-3 h-3" /> Expedition Registry v1.9
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6" style={{ letterSpacing: '-0.03em', lineHeight: '0.9' }}>
            Destination<br /><span className="text-safety-orange text-glow">Registry</span>
          </h1>
          <p className="text-white/45 text-xl max-w-2xl font-light">
            Every route, altitude, and safety note is verified and publicly documented. No surprises — only evidence.
          </p>
        </div>
      </section>

      {/* Filters — sticky forensic bar */}
      <section className="py-3 sticky top-[56px] z-50" style={{ background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-3 h-3 text-white/30" />
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em]">Type:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-lg transition-all"
                style={activeCategory === cat
                  ? { background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)', color: '#FF6B35' }
                  : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map(diff => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className="font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-lg transition-all"
                style={activeDifficulty === diff
                  ? { background: 'rgba(163,230,53,0.12)', border: '1px solid rgba(163,230,53,0.35)', color: '#A3E635' }
                  : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid — light surface for card contrast */}
      <section className="py-16 md:py-24" style={{ background: '#F4F6F8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest: any, idx: number) => (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/destinations/${dest.slug}`}>
                  <div className="group cursor-pointer h-full flex flex-col rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 2px 12px rgba(15,23,42,0.06)', transition: 'box-shadow 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(15,23,42,0.14)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(15,23,42,0.06)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  >
                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)' }} />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="tech-badge">{dest.category}</span>
                        <span className={`font-mono text-[10px] px-2 py-1 rounded-[0.5rem] uppercase font-black ${
                          dest.difficulty === 'extreme' ? 'bg-red-500/80 text-white' :
                          dest.difficulty === 'challenging' ? 'bg-safety-orange/80 text-white' :
                          dest.difficulty === 'moderate' ? 'bg-amber-500/80 text-white' : 'bg-verified-bright/80 text-authority-navy'
                        }`}>{dest.difficulty}</span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-black uppercase text-xl leading-tight">{dest.title}</h3>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 font-light flex-1">
                        {dest.shortDesc}
                      </p>
                      <div className="flex items-center gap-4 mb-4 text-slate-400">
                        {dest.altitude && (
                          <div className="flex items-center gap-1">
                            <Mountain className="w-3 h-3" />
                            <span className="font-mono text-[10px] uppercase">{dest.altitude}</span>
                          </div>
                        )}
                        {dest.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="font-mono text-[10px] uppercase">{dest.duration}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-verified-bright" />
                          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Verified Route</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-safety-orange group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">No destinations match your filters</p>
            </div>
          )}

          <AuditStamp title="REGISTRY_COMPLETE" subtitle="All Routes Verified 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
