import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { ShieldCheck, Clock, Users, Star, ArrowRight, CheckCircle2, MapPin, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

const getDifficultyColor = (physicality: string) => {
  if (physicality === 'challenging') return 'bg-safety-orange/80 text-white';
  if (physicality === 'moderate') return 'bg-amber-500/80 text-white';
  return 'bg-verified-bright/80 text-authority-navy';
};

export default function Tours() {
  const [activeDeparture, setActiveDeparture] = useState<'all' | 'Surabaya' | 'Bali'>('all');
  const [activeDays, setActiveDays] = useState<'all' | '1' | '2' | '3' | '4' | '5+'>('all');

  const { data: tours, isLoading } = trpc.tours.list.useQuery({});

  const displayTours = (tours || []).filter((t: any) => {
    const depMatch = activeDeparture === 'all' || (t.departureFrom || t.departure || '') === activeDeparture;
    const daysMatch = activeDays === 'all' ||
      (activeDays === '5+' ? t.durationDays >= 5 : String(t.durationDays) === activeDays);
    return depMatch && daysMatch;
  });

  return (
    <GlobalLayout>
      {/* Header */}
      <section className="bg-authority-navy py-20 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-3 h-3" /> 16 Verified Tour Packages
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Tour<br /><span className="text-safety-orange">Packages</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">
            Private expeditions with Tourist Police-led safety, transparent IDR pricing, and zero hidden costs. From Surabaya or Bali.
          </p>
          <div className="flex gap-6 mt-8">
            {[
              { label: '16 Packages', sub: 'Surabaya & Bali' },
              { label: '100% Private', sub: 'No shared groups' },
              { label: 'IDR Pricing', sub: 'No hidden costs' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-black text-white text-xl">{s.label}</div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 bg-white border-b border-slate-100 sticky top-[60px] z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-3 h-3 text-slate-400" />
            <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">Departure:</span>
          </div>
          {(['all', 'Surabaya', 'Bali'] as const).map(dep => (
            <button
              key={dep}
              onClick={() => setActiveDeparture(dep)}
              className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all ${
                activeDeparture === dep
                  ? 'bg-authority-navy text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {dep === 'all' ? 'All' : `From ${dep}`}
            </button>
          ))}
          <div className="w-px h-5 bg-slate-200 mx-1" />
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">Duration:</span>
          {(['all', '1', '2', '3', '4', '5+'] as const).map(d => (
            <button
              key={d}
              onClick={() => setActiveDays(d)}
              className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all ${
                activeDays === d
                  ? 'bg-safety-orange text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {d === 'all' ? 'All' : d === '5+' ? '5+ Days' : `${d}D`}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] text-slate-400 uppercase">
            {displayTours.length} package{displayTours.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bento-card animate-pulse">
                  <div className="h-48 bg-slate-200 rounded-t-[1rem]" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayTours.length === 0 ? (
            <div className="text-center py-20">
              <div className="font-mono text-[11px] text-slate-400 uppercase tracking-widest mb-3">No packages found</div>
              <button onClick={() => { setActiveDeparture('all'); setActiveDays('all'); }} className="text-safety-orange font-mono text-sm underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTours.map((tour: any, idx: number) => {
                const highlights = Array.isArray(tour.highlights)
                  ? tour.highlights
                  : (typeof tour.highlights === 'string' ? JSON.parse(tour.highlights || '[]') : []);
                const depFrom = tour.departureFrom || tour.departure || 'Surabaya';
                const physicality = tour.physicality || tour.difficulty || 'moderate';

                return (
                  <motion.div
                    key={tour.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link href={`/tours/${tour.slug}`}>
                      <div className="bento-card group cursor-pointer h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden flex-shrink-0 bg-slate-800 rounded-t-[1rem]">
                          {tour.image ? (
                            <img
                              src={tour.image}
                              alt={tour.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <MapPin className="w-12 h-12 text-slate-600" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-authority-navy/80 to-transparent" />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="tech-badge capitalize">From {depFrom}</span>
                            <span className={`font-mono text-[10px] px-2 py-1 rounded-[0.5rem] uppercase font-black ${getDifficultyColor(physicality)}`}>
                              {physicality}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-safety-orange fill-safety-orange" />
                              ))}
                              <span className="font-mono text-[10px] text-white/70 ml-1">4.9 ★</span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-base font-black uppercase tracking-tight text-authority-navy mb-2 leading-tight">
                            {tour.name}
                          </h3>
                          <p className="text-slate-500 text-sm font-light mb-4 flex-1 line-clamp-2">
                            {tour.description}
                          </p>
                          <div className="flex items-center gap-4 mb-4 text-slate-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span className="font-mono text-[10px] uppercase">{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span className="font-mono text-[10px] uppercase">Private Only</span>
                            </div>
                          </div>
                          {highlights.slice(0, 3).map((h: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 mb-1">
                              <CheckCircle2 className="w-3 h-3 text-verified-bright flex-shrink-0" />
                              <span className="text-slate-500 text-xs font-light">{h}</span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                            <div>
                              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">From</div>
                              <div className="font-black text-authority-navy text-lg">{formatPrice(tour.pricePerPerson)}</div>
                              <div className="font-mono text-[10px] text-slate-400 uppercase">/person</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-safety-orange uppercase">View Tour</span>
                              <ArrowRight className="w-5 h-5 text-safety-orange group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
          <AuditStamp title="TOURS_VERIFIED" subtitle="All 16 Packages — SSOT v4.0 — 2026" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-authority-navy relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="font-mono text-[11px] text-safety-orange uppercase tracking-[0.2em] mb-4">
            Not sure which tour to choose?
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">
            Plan First,<br />Then Decide
          </h2>
          <p className="text-slate-400 mb-8 font-light max-w-xl mx-auto">
            Send us your travel dates, group size, and departure point. We'll recommend the right package — no commitment required.
          </p>
          <a
            href="https://wa.me/6282244788833?text=Hi%20JVTO%2C%20I%27d%20like%20to%20plan%20a%20tour%20to%20East%20Java."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-safety-orange text-white font-black uppercase tracking-widest text-sm px-8 py-4 rounded-[1rem] hover:bg-safety-orange/90 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            Plan My Tour via WhatsApp
          </a>
        </div>
      </section>
    </GlobalLayout>
  );
}
