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
      {/* Header */}
      <section className="bg-authority-navy py-20 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <MapPin className="w-3 h-3" /> Expedition Registry v1.9
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Destination<br /><span className="text-safety-orange">Registry</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">
            Every route, altitude, and safety note is verified and publicly documented. No surprises — only evidence.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-[60px] z-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? 'bg-safety-orange text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map(diff => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all ${
                  activeDifficulty === diff
                    ? 'bg-authority-navy text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 bg-audit-white">
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
                  <div className="bento-card group cursor-pointer h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-authority-navy/80 to-transparent" />
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
