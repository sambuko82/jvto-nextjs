import { useParams, Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { JsonLd, buildTourSchema } from '@/components/JsonLd';
import { ShieldCheck, Clock, Users, Star, ArrowLeft, CheckCircle2, XCircle, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const STATIC_TOURS: Record<string, any> = {
  'ijen-blue-fire-surabaya-1d': {
    slug: 'ijen-blue-fire-surabaya-1d', name: 'Ijen Blue Fire — 1 Day from Surabaya',
    departure: 'surabaya', duration: '1 Day / 1 Night', durationDays: 1,
    pricePerPerson: 750000, difficulty: 'challenging',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
    description: 'The classic Ijen blue fire experience from Surabaya. Depart at midnight, witness the legendary phenomenon, return by noon.',
    rating: 4.9, reviewCount: 312,
    highlights: ['Blue fire phenomenon (2am–4am)', 'Gas mask provided', 'Private certified guide', 'Hotel pickup Surabaya', 'All entrance fees included'],
    inclusions: ['Private AC transport', 'Certified guide', 'Gas masks', 'Entrance fees', 'Hotel pickup/drop-off Surabaya'],
    exclusions: ['Meals', 'Personal insurance', 'Tips', 'Personal expenses'],
    itinerary: [
      { time: '22:00', activity: 'Hotel pickup in Surabaya' },
      { time: '02:00', activity: 'Arrive at Ijen trailhead — begin ascent' },
      { time: '03:30', activity: 'Reach crater rim — blue fire viewing begins' },
      { time: '05:30', activity: 'Sunrise over the crater lake' },
      { time: '07:00', activity: 'Descend from crater' },
      { time: '09:00', activity: 'Return journey to Surabaya' },
      { time: '12:00', activity: 'Hotel drop-off in Surabaya' },
    ],
  },
  'bromo-ijen-3d-surabaya': {
    slug: 'bromo-ijen-3d-surabaya', name: 'Bromo + Ijen — 3 Days from Surabaya',
    departure: 'surabaya', duration: '3 Days / 2 Nights', durationDays: 3,
    pricePerPerson: 1800000, difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80',
    description: 'The ultimate East Java combo — Bromo sunrise and Ijen blue fire in one seamless private expedition.',
    rating: 5.0, reviewCount: 156,
    highlights: ['Bromo sunrise at Penanjakan', 'Sea of Sand jeep ride', 'Ijen blue fire', 'All accommodations included', 'Private guide throughout'],
    inclusions: ['Private AC transport', 'Certified guide', 'Gas masks', 'Entrance fees', 'Hotel pickup/drop-off', '2 nights accommodation', 'Jeep at Bromo'],
    exclusions: ['Meals', 'Personal insurance', 'Tips', 'Personal expenses'],
    itinerary: [
      { time: 'Day 1 — 14:00', activity: 'Hotel pickup in Surabaya — drive to Bromo area' },
      { time: 'Day 1 — 19:00', activity: 'Check in to hotel near Bromo' },
      { time: 'Day 2 — 03:00', activity: 'Depart for Penanjakan viewpoint' },
      { time: 'Day 2 — 05:00', activity: 'Bromo sunrise — Sea of Sand jeep ride' },
      { time: 'Day 2 — 10:00', activity: 'Drive to Ijen area — check in to hotel' },
      { time: 'Day 2 — 22:00', activity: 'Depart for Ijen trailhead' },
      { time: 'Day 3 — 02:00', activity: 'Ijen blue fire viewing' },
      { time: 'Day 3 — 07:00', activity: 'Descend — return to Surabaya' },
      { time: 'Day 3 — 14:00', activity: 'Hotel drop-off in Surabaya' },
    ],
  },
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

export default function TourDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || '';
  const { data: tour } = trpc.tours.getBySlug.useQuery({ slug });

  const displayTour = tour || STATIC_TOURS[slug];

  if (!displayTour) {
    return (
      <GlobalLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-black text-authority-navy uppercase mb-4">Tour Not Found</h2>
            <Link href="/tours">
              <button className="flex items-center gap-2 text-safety-orange font-mono text-[11px] uppercase tracking-widest mx-auto">
                <ArrowLeft className="w-4 h-4" /> Back to Tours
              </button>
            </Link>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  const highlights = Array.isArray(displayTour.highlights) ? displayTour.highlights :
    (typeof displayTour.highlights === 'string' ? JSON.parse(displayTour.highlights || '[]') : []);
  const inclusions = Array.isArray(displayTour.inclusions) ? displayTour.inclusions :
    (typeof displayTour.inclusions === 'string' ? JSON.parse(displayTour.inclusions || '[]') : []);
  const exclusions = Array.isArray(displayTour.exclusions) ? displayTour.exclusions :
    (typeof displayTour.exclusions === 'string' ? JSON.parse(displayTour.exclusions || '[]') : []);
  const itinerary = Array.isArray(displayTour.itinerary) ? displayTour.itinerary :
    (typeof displayTour.itinerary === 'string' ? JSON.parse(displayTour.itinerary || '[]') : []);

  const tourSchema = buildTourSchema(displayTour);

  return (
    <GlobalLayout>
      <JsonLd data={tourSchema} />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {displayTour.image && (
          <img src={displayTour.image} alt={displayTour.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-authority-navy via-authority-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link href="/tours">
              <button className="flex items-center gap-2 text-white/60 font-mono text-[11px] uppercase tracking-widest mb-4 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Tour Packages
              </button>
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="tech-badge capitalize">{displayTour.departure}</span>
              <span className={`font-mono text-[10px] px-2 py-1 rounded-[0.5rem] uppercase font-black ${
                displayTour.difficulty === 'challenging' ? 'bg-safety-orange/80 text-white' :
                displayTour.difficulty === 'moderate' ? 'bg-amber-500/80 text-white' : 'bg-verified-bright/80 text-authority-navy'
              }`}>{displayTour.difficulty}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">{displayTour.name}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Duration', value: displayTour.duration },
                  { label: 'Group Type', value: 'Private' },
                  { label: 'Difficulty', value: displayTour.difficulty },
                ].map((stat) => (
                  <div key={stat.label} className="bento-card p-4 md:p-6 text-center">
                    <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className="font-black text-authority-navy uppercase text-sm capitalize">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bento-card p-8">
                <h2 className="text-2xl font-black uppercase text-authority-navy mb-4">Overview</h2>
                <p className="text-slate-600 leading-relaxed font-light">{displayTour.description}</p>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="bento-card p-8">
                  <h2 className="text-2xl font-black uppercase text-authority-navy mb-6">Tour Highlights</h2>
                  <div className="space-y-3">
                    {highlights.map((h: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-verified-bright flex-shrink-0" />
                        <span className="text-slate-600 font-light">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {itinerary.length > 0 && (
                <div className="bento-card p-8">
                  <h2 className="text-2xl font-black uppercase text-authority-navy mb-6">Itinerary</h2>
                  <div className="space-y-4">
                    {itinerary.map((item: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-4"
                      >
                        <div className="flex-shrink-0 w-24 font-mono text-[11px] text-safety-orange uppercase tracking-widest pt-0.5">{item.time}</div>
                        <div className="flex-1 pb-4 border-b border-slate-100 last:border-0">
                          <p className="text-authority-navy font-medium">{item.activity}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions / Exclusions */}
              <div className="grid sm:grid-cols-2 gap-6">
                {inclusions.length > 0 && (
                  <div className="bento-card p-6">
                    <h3 className="font-black uppercase text-authority-navy mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-verified-bright" /> Included
                    </h3>
                    <div className="space-y-2">
                      {inclusions.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-verified-bright flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 text-sm font-light">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {exclusions.length > 0 && (
                  <div className="bento-card p-6">
                    <h3 className="font-black uppercase text-authority-navy mb-4 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400" /> Not Included
                    </h3>
                    <div className="space-y-2">
                      {exclusions.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <XCircle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 text-sm font-light">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              {/* Rating */}
              {displayTour.rating && (
                <div className="bento-card p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(displayTour.rating) ? 'text-safety-orange fill-safety-orange' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <div className="font-black text-authority-navy text-3xl">{displayTour.rating}</div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{displayTour.reviewCount} verified reviews</div>
                </div>
              )}

              {/* Price & Book */}
              <div className="bento-card p-6 bg-authority-navy text-white">
                <div className="scanline" />
                <div className="mb-6">
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Price per person</div>
                  <div className="font-black text-4xl text-white">{formatPrice(displayTour.pricePerPerson)}</div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">IDR • Private Tour</div>
                </div>
                <a
                  href={`https://wa.me/6281235061451?text=${encodeURIComponent(`I'd like to book: ${displayTour.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-safety-orange hover:bg-safety-orange/90 text-white px-6 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all w-full shadow-xl shadow-safety-orange/20"
                >
                  Book via WhatsApp <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-slate-400 text-xs font-light text-center mt-4">30% deposit to confirm. Balance on day of tour.</p>
              </div>

              {/* Departure Info */}
              <div className="bento-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-safety-orange" />
                  <h3 className="font-black uppercase text-authority-navy">Departure</h3>
                </div>
                <p className="text-slate-600 text-sm font-light">
                  Hotel pickup from <strong className="text-authority-navy capitalize">{displayTour.departure}</strong>. Exact pickup time confirmed upon booking.
                </p>
              </div>
            </div>
          </div>

          <AuditStamp title="TOUR_VERIFIED" subtitle="Package Audited 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
