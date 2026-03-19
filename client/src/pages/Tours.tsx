import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { ShieldCheck, Clock, Users, Star, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const STATIC_TOURS = [
  {
    slug: 'ijen-blue-fire-surabaya-1d', name: 'Ijen Blue Fire — 1 Day', departure: 'surabaya',
    duration: '1 Day / 1 Night', durationDays: 1, pricePerPerson: 750000, difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    description: 'The classic Ijen blue fire experience from Surabaya. Depart at midnight, witness the legendary phenomenon, return by noon.',
    rating: 4.9, reviewCount: 312,
    highlights: ['Blue fire phenomenon', 'Gas mask provided', 'Private guide', 'Hotel pickup Surabaya'],
  },
  {
    slug: 'ijen-blue-fire-bali-2d', name: 'Ijen Blue Fire — 2 Days from Bali', departure: 'bali',
    duration: '2 Days / 1 Night', durationDays: 2, pricePerPerson: 1200000, difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    description: 'The complete Ijen experience from Bali, including overnight stay near the crater and sunrise views.',
    rating: 4.9, reviewCount: 198,
    highlights: ['Blue fire + sunrise', 'Overnight near crater', 'Ferry crossing included', 'Hotel pickup Bali'],
  },
  {
    slug: 'bromo-ijen-3d-surabaya', name: 'Bromo + Ijen — 3 Days', departure: 'surabaya',
    duration: '3 Days / 2 Nights', durationDays: 3, pricePerPerson: 1800000, difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    description: 'The ultimate East Java combo — Bromo sunrise and Ijen blue fire in one seamless private expedition.',
    rating: 5.0, reviewCount: 156,
    highlights: ['Bromo sunrise', 'Sea of Sand jeep', 'Ijen blue fire', 'All accommodations included'],
  },
  {
    slug: 'bromo-ijen-4d-bali', name: 'Bromo + Ijen — 4 Days from Bali', departure: 'bali',
    duration: '4 Days / 3 Nights', durationDays: 4, pricePerPerson: 2400000, difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    description: 'The flagship JVTO expedition — Bromo, Ijen, and Madakaripura from Bali with all logistics handled.',
    rating: 5.0, reviewCount: 89,
    highlights: ['Bromo + Ijen + Madakaripura', 'All ferry + transport', 'Premium accommodations', 'Full-time private guide'],
  },
  {
    slug: 'madakaripura-bromo-2d', name: 'Madakaripura + Bromo — 2 Days', departure: 'surabaya',
    duration: '2 Days / 1 Night', durationDays: 2, pricePerPerson: 1100000, difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Combine Indonesia\'s tallest waterfall with the iconic Bromo sunrise in a 2-day private tour.',
    rating: 4.8, reviewCount: 74,
    highlights: ['Madakaripura waterfall', 'Bromo sunrise', 'Jeep ride', 'Hotel included'],
  },
  {
    slug: 'tumpak-sewu-ijen-3d', name: 'Tumpak Sewu + Ijen — 3 Days', departure: 'surabaya',
    duration: '3 Days / 2 Nights', durationDays: 3, pricePerPerson: 1650000, difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    description: 'The Niagara of Java meets the blue fire of Ijen — two of East Java\'s most spectacular natural wonders.',
    rating: 4.9, reviewCount: 61,
    highlights: ['Tumpak Sewu waterfall', 'Ijen blue fire', 'Jungle trekking', 'All accommodations'],
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

export default function Tours() {
  const [activeDeparture, setActiveDeparture] = useState<'all' | 'surabaya' | 'bali'>('all');
  const { data: tours } = trpc.tours.list.useQuery({
    departure: activeDeparture === 'all' ? undefined : activeDeparture as 'surabaya' | 'bali'
  });

  const displayTours = (tours && tours.length > 0) ? tours : STATIC_TOURS.filter(t =>
    activeDeparture === 'all' || t.departure === activeDeparture
  );

  return (
    <GlobalLayout>
      {/* Header */}
      <section className="bg-authority-navy py-20 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-3 h-3" /> Verified Tour Packages
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Tour<br /><span className="text-safety-orange">Packages</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">
            Private expeditions with verified guides, transparent pricing in IDR, and zero hidden costs.
          </p>
        </div>
      </section>

      {/* Departure Filter */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-[60px] z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">Departure:</span>
          {(['all', 'surabaya', 'bali'] as const).map(dep => (
            <button
              key={dep}
              onClick={() => setActiveDeparture(dep)}
              className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all ${
                activeDeparture === dep
                  ? 'bg-safety-orange text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {dep === 'all' ? 'All Departures' : `From ${dep.charAt(0).toUpperCase() + dep.slice(1)}`}
            </button>
          ))}
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTours.map((tour: any, idx: number) => {
              const highlights = Array.isArray(tour.highlights) ? tour.highlights :
                (typeof tour.highlights === 'string' ? JSON.parse(tour.highlights || '[]') : []);
              return (
                <motion.div
                  key={tour.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/tours/${tour.slug}`}>
                    <div className="bento-card group cursor-pointer h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        {tour.image && (
                          <img
                            src={tour.image}
                            alt={tour.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-authority-navy/80 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="tech-badge capitalize">{tour.departure}</span>
                          <span className={`font-mono text-[10px] px-2 py-1 rounded-[0.5rem] uppercase font-black ${
                            tour.difficulty === 'challenging' ? 'bg-safety-orange/80 text-white' :
                            tour.difficulty === 'moderate' ? 'bg-amber-500/80 text-white' : 'bg-verified-bright/80 text-authority-navy'
                          }`}>{tour.difficulty}</span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(tour.rating || 5) ? 'text-safety-orange fill-safety-orange' : 'text-slate-400'}`} />
                            ))}
                            <span className="font-mono text-[10px] text-white/70 ml-1">({tour.reviewCount || 0})</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-black uppercase tracking-tight text-authority-navy mb-2">{tour.name}</h3>
                        <p className="text-slate-500 text-sm font-light mb-4 flex-1">{tour.description}</p>
                        <div className="flex items-center gap-4 mb-4 text-slate-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="font-mono text-[10px] uppercase">{tour.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span className="font-mono text-[10px] uppercase">Private</span>
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
                          <ArrowRight className="w-5 h-5 text-safety-orange group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <AuditStamp title="TOURS_VERIFIED" subtitle="All Packages Audited 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
