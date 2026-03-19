import { useParams } from 'wouter';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { ShieldCheck, Mountain, Clock, Sun, ArrowLeft, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const STATIC_DETAILS: Record<string, any> = {
  'ijen-crater': {
    slug: 'ijen-crater', title: 'Ijen Crater', category: 'Volcano',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
    description: 'The Ijen Crater (Kawah Ijen) is one of the most spectacular volcanic phenomena on Earth. Located in East Java, Indonesia, it features the world\'s largest acidic crater lake and the legendary blue fire — a rare sulfuric gas combustion visible only at night. Our certified guides have led thousands of expeditions here since 2015.',
    altitude: '2,386m', difficulty: 'challenging', duration: '3–4 hours hike', bestTime: 'May–October',
    highlights: ['Blue fire phenomenon (2am–4am)', 'World\'s largest acidic crater lake', 'Sulfur miners at work', 'Sunrise over the caldera', 'Panoramic East Java views'],
    safetyNotes: ['Gas masks provided for all guests', 'Guided at all times', 'Weather-dependent — closures enforced', 'Physical fitness required', 'Tourist police registered route'],
  },
  'mount-bromo': {
    slug: 'mount-bromo', title: 'Mount Bromo', category: 'Volcano',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80',
    description: 'Mount Bromo is one of the most iconic volcanoes in Indonesia, rising from the Tengger Massif in East Java. The sunrise view from Penanjakan viewpoint over the Sea of Sand is considered one of the world\'s great natural spectacles. Our tours depart from Surabaya and Bali.',
    altitude: '2,329m', difficulty: 'moderate', duration: '2–3 hours', bestTime: 'April–October',
    highlights: ['Penanjakan sunrise viewpoint', 'Sea of Sand jeep ride', 'Crater rim walk', 'Tengger caldera panorama', 'Hindu Yadnya Kasada ceremony (seasonal)'],
    safetyNotes: ['Jeep transport provided', 'Warm clothing essential (0–5°C at night)', 'Activity-level: moderate', 'Volcanic activity monitored daily', 'BNPB alert system integrated'],
  },
  'madakaripura-waterfall': {
    slug: 'madakaripura-waterfall', title: 'Madakaripura Waterfall', category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    description: 'Madakaripura is Indonesia\'s tallest waterfall at approximately 200 meters, hidden within a narrow canyon in Probolinggo Regency. According to Javanese legend, this was the final meditation site of Gajah Mada, the legendary prime minister of the Majapahit Empire.',
    altitude: '200m', difficulty: 'easy', duration: '2 hours', bestTime: 'Year-round',
    highlights: ['200m waterfall — Indonesia\'s tallest', 'Sacred Javanese historical site', 'Narrow canyon swimming', 'Jungle trekking', 'Combined with Bromo tours'],
    safetyNotes: ['Waterproof bags provided', 'Wet shoes/sandals required', 'Flash flood monitoring active', 'Local guide mandatory', 'No solo entry permitted'],
  },
  'tumpak-sewu': {
    slug: 'tumpak-sewu', title: 'Tumpak Sewu Waterfall', category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
    description: 'Tumpak Sewu, meaning "a thousand waterfalls," is a curtain waterfall 120 meters wide and 120 meters tall in Lumajang Regency. Often called the "Niagara of Java," it is one of the most photogenic natural sites in Indonesia, surrounded by dense jungle and perpetual mist.',
    altitude: '500m', difficulty: 'moderate', duration: '3–4 hours', bestTime: 'May–September',
    highlights: ['120m wide curtain waterfall', 'Jungle descent trail', 'Cave behind the falls', 'Coban Kembar twin falls nearby', 'Semeru volcano backdrop'],
    safetyNotes: ['Steep descent — guide mandatory', 'Rope-assisted sections', 'Wet season closures enforced', 'Helmet and harness provided', 'Emergency extraction plan active'],
  },
  'papuma-beach': {
    slug: 'papuma-beach', title: 'Papuma Beach', category: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    description: 'Papuma Beach (Tanjung Papuma) is a pristine white sand beach in Jember Regency, East Java, known for its dramatic rock formations, crystal-clear water, and relative seclusion. It is accessible primarily via private tour and offers an authentic East Javanese coastal experience.',
    altitude: '0m', difficulty: 'easy', duration: '1 hour drive from Jember', bestTime: 'April–October',
    highlights: ['Pristine white sand beach', 'Dramatic rock formations', 'Snorkeling opportunities', 'Sunset viewpoint', 'Authentic local fishing village'],
    safetyNotes: ['Swimming in designated zones only', 'Lifeguard on duty (seasonal)', 'Strong current warnings posted', 'Sun protection essential', 'Private access — no crowds'],
  },
};

export default function DestinationDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || '';
  const { data: dest } = trpc.destinations.getBySlug.useQuery({ slug });

  const displayDest = dest || STATIC_DETAILS[slug];

  if (!displayDest) {
    return (
      <GlobalLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Mountain className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-authority-navy uppercase mb-4">Destination Not Found</h2>
            <Link href="/destinations">
              <button className="flex items-center gap-2 text-safety-orange font-mono text-[11px] uppercase tracking-widest mx-auto hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" /> Back to Registry
              </button>
            </Link>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  const highlights = Array.isArray(displayDest.highlights) ? displayDest.highlights :
    (typeof displayDest.highlights === 'string' ? JSON.parse(displayDest.highlights || '[]') : []);
  const safetyNotes = Array.isArray(displayDest.safetyNotes) ? displayDest.safetyNotes :
    (typeof displayDest.safetyNotes === 'string' ? JSON.parse(displayDest.safetyNotes || '[]') : []);

  return (
    <GlobalLayout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={displayDest.image || displayDest.heroImage}
          alt={displayDest.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-authority-navy via-authority-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link href="/destinations">
              <button className="flex items-center gap-2 text-white/60 font-mono text-[11px] uppercase tracking-widest mb-4 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Destination Registry
              </button>
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="tech-badge">{displayDest.category}</span>
              <span className={`font-mono text-[10px] px-2 py-1 rounded-[0.5rem] uppercase font-black ${
                displayDest.difficulty === 'extreme' ? 'bg-red-500/80 text-white' :
                displayDest.difficulty === 'challenging' ? 'bg-safety-orange/80 text-white' :
                displayDest.difficulty === 'moderate' ? 'bg-amber-500/80 text-white' : 'bg-verified-bright/80 text-authority-navy'
              }`}>{displayDest.difficulty}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              {displayDest.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Mountain, label: 'Altitude', value: displayDest.altitude || 'N/A' },
                  { icon: Clock, label: 'Duration', value: displayDest.duration || 'N/A' },
                  { icon: Sun, label: 'Best Time', value: displayDest.bestTime || 'Year-round' },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bento-card p-4 md:p-6 text-center">
                      <Icon className="w-5 h-5 text-safety-orange mx-auto mb-2" />
                      <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                      <div className="font-black text-authority-navy uppercase text-sm">{stat.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              <div className="bento-card p-8">
                <h2 className="text-2xl font-black uppercase tracking-tight text-authority-navy mb-4">Overview</h2>
                <p className="text-slate-600 leading-relaxed font-light">{displayDest.description}</p>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="bento-card p-8">
                  <h2 className="text-2xl font-black uppercase tracking-tight text-authority-navy mb-6">Expedition Highlights</h2>
                  <div className="space-y-3">
                    {highlights.map((h: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-verified-bright flex-shrink-0" />
                        <span className="text-slate-600 font-light">{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Safety Notes */}
              {safetyNotes.length > 0 && (
                <div className="bento-card p-6 border-safety-orange/20 border">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-safety-orange" />
                    <h3 className="font-black uppercase text-authority-navy">Safety Protocol</h3>
                  </div>
                  <div className="space-y-3">
                    {safetyNotes.map((note: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm font-light">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Book CTA */}
              <div className="bento-card p-6 bg-authority-navy text-white">
                <div className="scanline" />
                <ShieldCheck className="w-8 h-8 text-safety-orange mb-4" />
                <h3 className="font-black uppercase text-lg mb-2">Book This Expedition</h3>
                <p className="text-slate-400 text-sm font-light mb-6">
                  Private tours available from Surabaya and Bali. All-inclusive pricing.
                </p>
                <a
                  href={`https://wa.me/6281235061451?text=${encodeURIComponent(`I'd like to book a private tour to ${displayDest.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-safety-orange hover:bg-safety-orange/90 text-white px-6 py-3 rounded-xl font-black uppercase tracking-wider text-sm transition-all w-full"
                >
                  Book via WhatsApp <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link href="/tours">
                  <button className="mt-3 flex items-center justify-center gap-2 text-slate-400 hover:text-white font-mono text-[11px] uppercase tracking-widest transition-colors w-full">
                    Browse All Tours <ChevronRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <AuditStamp title="ROUTE_VERIFIED" subtitle="Safety Protocol Active 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
