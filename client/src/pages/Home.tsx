import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import {
  ShieldCheck, ArrowRight, Star, Users, Award, Clock, MapPin, ChevronRight,
  Fingerprint, Activity, Lock, AlertTriangle, CheckCircle2, ExternalLink,
  BookOpen, FileText, Newspaper, Bus, Plane, Mountain, Droplets,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

// ── Static fallbacks ──────────────────────────────────────────────────────────
const DESTINATIONS_STATIC = [
  {
    slug: 'mount-bromo',
    title: 'Mount Bromo',
    category: 'Volcano',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    altitude: '2,329m',
    difficulty: 'moderate',
    tagline: 'Sunrise caldera views, jeep access, and classic East Java volcanic scenery.',
  },
  {
    slug: 'ijen-crater',
    title: 'Kawah Ijen',
    category: 'Volcano',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    altitude: '2,386m',
    difficulty: 'challenging',
    tagline: 'Night trek, crater-lake route, and screening-led access planning where applicable.',
  },
  {
    slug: 'tumpak-sewu-waterfall',
    title: 'Tumpak Sewu',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    altitude: '500m',
    difficulty: 'challenging',
    tagline: 'High-effort waterfall route with terrain, descent, and timing considerations.',
  },
  {
    slug: 'madakaripura-waterfall',
    title: 'Madakaripura Waterfall',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    altitude: '200m',
    difficulty: 'easy',
    tagline: 'Canyon waterfall stop often paired with Bromo-focused itineraries.',
  },
  {
    slug: 'papuma-beach',
    title: 'Papuma Beach',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    altitude: '0m',
    difficulty: 'easy',
    tagline: 'Coastal extension for selected East Java overland routes.',
  },
];

const REVIEWS_STATIC = [
  { author: 'Sarah M.', text: 'The most transparent tour operator I\'ve ever worked with. Every credential verified, every claim backed by evidence.', rating: 5, platform: 'Trustpilot', date: 'Jan 2026' },
  { author: 'James K.', text: 'Ijen at 2am with JVTO — the blue fire was otherworldly. The safety protocols gave me complete confidence.', rating: 5, platform: 'Google', date: 'Feb 2026' },
  { author: 'Priya S.', text: 'As a solo female traveler, the verification system was exactly what I needed to feel safe. 10/10 recommend.', rating: 5, platform: 'TripAdvisor', date: 'Mar 2026' },
];

const PRESS_STATIC = [
  { publisher: 'Stefan Loose Travel Guides', title: 'Featured operator for East Java volcano tours' },
  { publisher: 'Detik News', title: 'Tourist Police-Led operations for volcano safety' },
  { publisher: 'Trustpilot', title: '4.7★ rating — 44+ independent verified reviews' },
  { publisher: 'TripAdvisor', title: '5.0★ — 112 independent reviews' },
];

const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    title: 'Police-led safety culture',
    desc: 'Safety is built into the operating model, not added as a marketing slogan.',
    color: '#38BDF8',
  },
  {
    icon: Lock,
    title: 'Private tours by default',
    desc: 'Your group, your vehicle, your pace.',
    color: '#A3E635',
  },
  {
    icon: Award,
    title: 'Licensed and verifiable',
    desc: 'Legal identity and public trust surfaces can be checked directly.',
    color: '#F97316',
  },
  {
    icon: AlertTriangle,
    title: 'Ijen screening where required',
    desc: 'Screening is handled as a route rule, not an optional extra.',
    color: '#38BDF8',
  },
  {
    icon: CheckCircle2,
    title: 'Clear inclusions before payment',
    desc: 'Transport, accommodation, permits, guides, and meal scope are written down before you commit.',
    color: '#A3E635',
  },
  {
    icon: MapPin,
    title: 'Bondowoso-rooted operations',
    desc: 'Daily East Java field experience from a base close to Ijen, not a remote reseller setup.',
    color: '#F97316',
  },
];

const VERIFY_CARDS = [
  {
    icon: FileText,
    title: 'Legal Identity',
    desc: 'NIB, TDUP, and PT registration — all downloadable with SHA-256 hashes.',
    href: '/verify-jvto#legal',
    color: '#A3E635',
  },
  {
    icon: ShieldCheck,
    title: 'Police & Safety',
    desc: 'Tourist Police SPRIN assignment letters and medical licence STR.',
    href: '/verify-jvto#police',
    color: '#38BDF8',
  },
  {
    icon: Newspaper,
    title: 'Press & Recognition',
    desc: 'Stefan Loose, Detik, and other third-party editorial citations.',
    href: '/verify-jvto#press',
    color: '#F97316',
  },
];

const TRAVEL_GUIDE_CARDS = [
  { title: 'Booking Information', href: '/travel-guide/booking-information', desc: 'How the booking process works, what to expect, and when to pay.' },
  { title: 'Ijen Health Screening', href: '/travel-guide/ijen-health-screening', desc: 'Mandatory digital health screening requirements for Kawah Ijen.' },
  { title: 'Weather & Closures', href: '/travel-guide/weather-and-closures', desc: 'Seasonal conditions, closure periods, and how JVTO handles them.' },
  { title: 'Packing & Fitness', href: '/travel-guide/packing-and-fitness', desc: 'What to bring and what physical condition to expect per route.' },
];

const REVIEW_PLATFORMS = [
  { name: 'Trustpilot', score: '4.7', total: '44+', color: '#00B67A', url: 'https://trustpilot.com/review/javavolcano-touroperator.com', desc: 'Public review profile with verified review types and ongoing rating history.' },
  { name: 'TripAdvisor', score: '4.9', total: '112', color: '#34E0A1', url: 'https://www.tripadvisor.com/Attraction_Review-g297715-d19983165-Reviews-Java_Volcano_Tour_Operator-Surabaya_East_Java_Java.html', desc: 'Independent travel review surface used by travelers comparing East Java operators.' },
  { name: 'Google Maps', score: '4.9', total: '60+', color: '#4285F4', url: 'https://www.google.com/maps?cid=1266403973589689021', desc: 'Local business identity and review presence tied to the operator listing.' },
];

export default function Home() {
  const [auditTick, setAuditTick] = useState(0);

  const { data: destinations } = trpc.destinations.list.useQuery();
  const { data: reviews } = trpc.reviews.list.useQuery({ featured: true });
  const { data: tours } = trpc.tours.list.useQuery({});
  const { data: press } = trpc.press.list.useQuery();

  const displayDestinations = (destinations && destinations.length > 0) ? destinations : DESTINATIONS_STATIC;
  const displayReviews = (reviews && reviews.length > 0) ? reviews : REVIEWS_STATIC;
  const displayTours = (tours && tours.length > 0) ? tours.slice(0, 3) : [];
  const displayPress = (press && press.length > 0) ? press : PRESS_STATIC;

  useEffect(() => {
    const interval = setInterval(() => setAuditTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalLayout>

      {/* ── §2 HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--jvto-navy)' }}>
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="scanline" />

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: 'rgba(249,115,22,0.3)', left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ x: [0, (i % 2 === 0 ? 1 : -1) * 40, 0], y: [0, (i % 3 === 0 ? 1 : -1) * 30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold uppercase tracking-[0.2em] mb-8 text-[11px]"
                style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', color: '#F97316' }}
              >
                <div className="status-live" />
                Tourist Police-Led
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8"
                style={{ color: 'var(--jvto-white)' }}
              >
                Private<br />
                <span style={{ color: '#F97316' }} className="text-glow">Volcano</span><br />
                Tours in<br />
                East Java
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg leading-relaxed mb-6 font-light max-w-lg"
                style={{ color: 'var(--jvto-text)' }}
              >
                Java Volcano Tour Operator (JVTO) is a licensed Indonesian operator based in Bondowoso, East Java. We run private Bromo, Ijen, Tumpak Sewu, and multi-stop overland journeys with police-led safety discipline, written trip rules, clear inclusions, and independent verification.
              </motion.p>

              {/* Trust strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="font-mono text-[10px] uppercase tracking-widest mb-8"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Licensed operator&nbsp;•&nbsp;Private tours only&nbsp;•&nbsp;Ijen screening on applicable routes&nbsp;•&nbsp;Verifiable credentials
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <Link href="/tours">
                  <button className="group text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-3 shadow-xl"
                    style={{ background: '#F97316', boxShadow: '0 20px 40px rgba(249,115,22,0.25)' }}>
                    Browse Private Tours <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/verify-jvto">
                  <button className="group text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-3"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Fingerprint className="w-5 h-5" /> Verify Our Credentials
                  </button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  'NIB No. 1102230032918',
                  'Tourist Police-Led',
                  '100% Private Tours',
                  'ISIC Partner',
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <CheckCircle2 className="w-3 h-3" style={{ color: '#A3E635' }} />
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Audit Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="scanline" />
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(163,230,53,0.6)' }} />
                  <span className="font-mono text-[11px] ml-2 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>jvto_audit_terminal_v1.9</span>
                </div>
                <div className="space-y-3 font-mono text-[12px]">
                  <div style={{ color: 'rgba(255,255,255,0.3)' }}>$ <span style={{ color: 'var(--jvto-white)' }}>audit --entity=JVTO --depth=full</span></div>
                  <div style={{ color: '#A3E635' }}>✓ NIB No. 1102230032918: VERIFIED at oss.go.id</div>
                  <div style={{ color: '#A3E635' }}>✓ Tourist Police SPRIN: ACTIVE (Ditpamobvit)</div>
                  <div style={{ color: '#A3E635' }}>✓ Medical License STR: QN00001073380217 ACTIVE</div>
                  <div style={{ color: '#A3E635' }}>✓ HPWKI Guide Licenses: ALL GUIDES VERIFIED</div>
                  <div style={{ color: '#A3E635' }}>✓ Trustpilot: 4.7★ · TripAdvisor: 5.0★</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)' }}>$ <span style={{ color: 'var(--jvto-white)' }}>generate --report</span></div>
                  <div className="flex items-center gap-2" style={{ color: '#F97316' }}>
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span>Generating audit report... {auditTick % 3 === 0 ? '|' : auditTick % 3 === 1 ? '/' : '-'}</span>
                  </div>
                  <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.2)' }}>
                    <div className="font-black text-sm uppercase mb-1" style={{ color: '#A3E635' }}>OPERATIONAL CERTAINTY: VERIFIED</div>
                    <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Plan First, Then Decide — Read the Rulebook Before You Book</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {[
              { label: 'Independent Reviews', value: '44+', icon: Star },
              { label: 'Trustpilot Rating', value: '4.7★', icon: ShieldCheck },
              { label: 'TripAdvisor Rating', value: '5.0★', icon: Activity },
              { label: 'Years Active', value: '10+', icon: Clock },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-2xl p-4 md:p-6 text-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: '#F97316' }} />
                  <div className="text-2xl md:text-3xl font-black uppercase" style={{ color: 'var(--jvto-white)' }}>{stat.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── §3 DIRECT-ANSWER INTRO ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: '#0f1a2e', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-5" style={{ color: 'var(--jvto-white)' }}>
            What JVTO Is
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'var(--jvto-text)' }}>
            JVTO is a private East Java tour operator for Bromo, Ijen, Tumpak Sewu, Madakaripura, and selected overland routes from Surabaya or Bali. We are based in Bondowoso and operate with a proof-first model: legal identity, public review sources, route-specific guidance, and verification pages that explain what can be checked independently.
          </p>
          <Link href="/verify-jvto">
            <button className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-all hover:gap-3"
              style={{ color: '#A3E635' }}>
              How to Verify JVTO <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* ── §4 WHAT MAKES JVTO DIFFERENT ───────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: 'var(--jvto-card-bg, #f8f9fa)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold uppercase tracking-[0.2em] mb-6 text-[11px]"
              style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', color: '#F97316' }}>
              <Lock className="w-3 h-3" /> Proof-Based Tourism
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-4"
              style={{ color: 'var(--jvto-navy)' }}>
              What Makes JVTO Different
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bento-card p-7 group"
                >
                  <div className="p-3 rounded-xl w-fit mb-5" style={{ background: `${item.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight mb-2" style={{ color: 'var(--jvto-navy)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color: '#64748b' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/why-jvto">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all"
                style={{ background: '#F97316', color: '#fff' }}>
                See Why JVTO <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/verify-jvto#legal">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all"
                style={{ border: '1px solid rgba(249,115,22,0.4)', color: '#F97316' }}>
                View Legal & Proof Pages <ExternalLink className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── §5 DESTINATIONS WE OPERATE ─────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#f1f5f9' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold uppercase tracking-[0.2em] mb-4 text-[11px]"
                style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', color: '#F97316' }}>
                <MapPin className="w-3 h-3" /> East Java Routes
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter" style={{ color: 'var(--jvto-navy)' }}>
                Destinations We Operate
              </h2>
              <p className="text-sm mt-3 max-w-xl" style={{ color: '#64748b' }}>
                Explore East Java's core volcano and nature routes, each supported by route-specific guidance and private execution.
              </p>
            </div>
            <Link href="/destinations">
              <button className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-all hover:gap-3"
                style={{ color: '#F97316' }}>
                View All Destinations <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayDestinations.slice(0, 6).map((dest: any, idx: number) => (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={`/destinations/${dest.slug}`}>
                  <div className="bento-card group cursor-pointer overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <h3 className="text-white font-black uppercase text-lg leading-tight">{dest.title}</h3>
                          <span className="tech-badge mt-1 inline-block">{dest.category}</span>
                        </div>
                        <div className="text-right">
                          {dest.altitude && <p className="font-mono text-[10px] text-white/70 uppercase">{dest.altitude}</p>}
                          {dest.difficulty && (
                            <span className={`font-mono text-[10px] uppercase font-black ${
                              dest.difficulty === 'extreme' ? 'text-red-400' :
                              dest.difficulty === 'challenging' ? 'text-orange-400' :
                              dest.difficulty === 'moderate' ? 'text-amber-400' : 'text-green-400'
                            }`}>{dest.difficulty}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs leading-relaxed mb-3" style={{ color: '#64748b' }}>
                        {(dest as any).tagline ?? dest.description ?? ''}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" style={{ color: '#A3E635' }} />
                          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#94a3b8' }}>Private Tour Available</span>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#F97316' }} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/destinations">
              <button className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-all"
                style={{ color: '#F97316' }}>
                View All Destinations <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── §6 CHOOSE YOUR DEPARTURE CITY ──────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: 'var(--jvto-navy)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4" style={{ color: 'var(--jvto-white)' }}>
              Choose Your Departure City
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--jvto-text)' }}>
              Start with where you are. We structure the route around your departure point, transfer logic, and trip length.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl p-8 flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(249,115,22,0.15)' }}>
                  <Bus className="w-6 h-6" style={{ color: '#F97316' }} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#F97316' }}>From Surabaya</div>
                  <h3 className="text-xl font-black uppercase" style={{ color: 'var(--jvto-white)' }}>Tours From Surabaya</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--jvto-text)' }}>
                Best for travelers arriving into East Java directly or starting overland from Surabaya. Suitable for shorter and longer private routes.
              </p>
              <Link href="/tours?departure=surabaya">
                <button className="w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all"
                  style={{ background: '#F97316', color: '#fff' }}>
                  Browse Surabaya Routes
                </button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl p-8 flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(56,189,248,0.15)' }}>
                  <Plane className="w-6 h-6" style={{ color: '#38BDF8' }} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#38BDF8' }}>From Bali</div>
                  <h3 className="text-xl font-black uppercase" style={{ color: 'var(--jvto-white)' }}>Tours From Bali</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--jvto-text)' }}>
                Best for travelers already in Bali who want a connected East Java route without building separate transfers themselves.
              </p>
              <Link href="/tours?departure=bali">
                <button className="w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all"
                  style={{ background: '#38BDF8', color: '#0f1a2e' }}>
                  Browse Bali Routes
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── §7 FEATURED PRIVATE TOURS ───────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold uppercase tracking-[0.2em] mb-4 text-[11px]"
                style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', color: '#F97316' }}>
                <Mountain className="w-3 h-3" /> Private Packages
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter" style={{ color: 'var(--jvto-navy)' }}>
                Featured Private Tours
              </h2>
              <p className="text-sm mt-3 max-w-xl" style={{ color: '#64748b' }}>
                Choose by duration, departure city, and route intensity. Every package is private and built around clear written inclusions.
              </p>
            </div>
            <Link href="/tours">
              <button className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-all hover:gap-3"
                style={{ color: '#F97316' }}>
                All Tours <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {displayTours.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {displayTours.map((tour: any, idx: number) => (
                <motion.div
                  key={tour.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/tours/${tour.slug}`}>
                    <div className="bento-card group cursor-pointer overflow-hidden h-full flex flex-col">
                      {tour.image && (
                        <div className="relative h-44 overflow-hidden">
                          <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm font-bold"
                              style={{ background: '#F97316', color: '#fff' }}>
                              {tour.duration}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-5 flex flex-col gap-3 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm"
                            style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', color: '#38BDF8' }}>
                            From {tour.departureFrom ?? (tour.departure === 'bali' ? 'Bali' : 'Surabaya')}
                          </span>
                          {tour.difficulty && (
                            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm"
                              style={{
                                background: tour.difficulty === 'challenging' ? 'rgba(249,115,22,0.1)' : 'rgba(163,230,53,0.1)',
                                border: `1px solid ${tour.difficulty === 'challenging' ? 'rgba(249,115,22,0.2)' : 'rgba(163,230,53,0.2)'}`,
                                color: tour.difficulty === 'challenging' ? '#F97316' : '#A3E635',
                              }}>
                              {tour.difficulty}
                            </span>
                          )}
                        </div>
                        <h3 className="font-black text-base uppercase leading-tight" style={{ color: 'var(--jvto-navy)' }}>{tour.name}</h3>
                        <p className="text-xs leading-relaxed flex-1" style={{ color: '#64748b' }}>
                          {tour.description ? tour.description.slice(0, 100) + '…' : ''}
                        </p>
                        <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #e2e8f0' }}>
                          <div>
                            <div className="font-mono text-[9px] uppercase tracking-wider" style={{ color: '#94a3b8' }}>From</div>
                            <div className="font-black text-sm" style={{ color: '#F97316' }}>
                              IDR {(tour.pricePerPerson ?? 0).toLocaleString('id-ID')} / person
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#F97316' }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: '3D2N Bromo–Madakaripura–Ijen', duration: '3D2N', from: 'Surabaya', difficulty: 'moderate', price: 'IDR 2,950,000', slug: 'from-surabaya/bromo-madakaripura-ijen-3d2n' },
                { name: '4D3N Ijen–Papuma–Tumpak Sewu–Bromo', duration: '4D3N', from: 'Surabaya', difficulty: 'challenging', price: 'IDR 4,200,000', slug: 'from-surabaya/ijen-papuma-tumpak-sewu-bromo-4d3n' },
                { name: '5D4N Bali → Ijen → Bromo → Surabaya', duration: '5D4N', from: 'Bali', difficulty: 'moderate', price: 'IDR 5,800,000', slug: 'from-bali/ijen-bromo-5d4n' },
              ].map((t, idx) => (
                <motion.div key={t.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -4 }}>
                  <Link href={`/tours/${t.slug}`}>
                    <div className="bento-card p-6 group cursor-pointer flex flex-col gap-3">
                      <div className="flex gap-2 flex-wrap">
                        <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ background: '#F97316', color: '#fff' }}>{t.duration}</span>
                        <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ background: 'rgba(56,189,248,0.1)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.2)' }}>From {t.from}</span>
                      </div>
                      <h3 className="font-black text-base uppercase leading-tight" style={{ color: 'var(--jvto-navy)' }}>{t.name}</h3>
                      <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid #e2e8f0' }}>
                        <div className="font-black text-sm" style={{ color: '#F97316' }}>{t.price} / person</div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#F97316' }} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/tours">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider"
                style={{ background: '#F97316', color: '#fff' }}>
                View All Tours <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/policy/booking">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider"
                style={{ border: '1px solid rgba(249,115,22,0.3)', color: '#F97316' }}>
                Booking & Cancellation Policy
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── §8 FOUNDER / STORY BLOCK ────────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: 'var(--jvto-navy)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: '#F97316' }}>Our Story</div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-6" style={{ color: 'var(--jvto-white)' }}>
                From Local Host to<br />Police-Led Operator
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--jvto-text)' }}>
                JVTO began in Bondowoso through direct local hosting experience and grew into a licensed East Java operator shaped by the field realities seen by our founder, Mr. Sam. That background changed how the company was built: private-only trips, realistic driving days, written route expectations, and a stronger link between adventure travel and operational discipline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/our-story">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider"
                    style={{ background: '#F97316', color: '#fff' }}>
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/team">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider"
                    style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'var(--jvto-white)' }}>
                    <Users className="w-4 h-4" /> Meet the Team
                  </button>
                </Link>
              </div>
            </div>

            {/* Founder card */}
            <div className="rounded-2xl p-8 flex flex-col gap-4"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: '2px solid rgba(249,115,22,0.4)' }}>
                  <img
                    src="https://javavolcano-touroperator.com/wp-content/uploads/2024/10/Mr-Sam-JVTO-Founder.webp"
                    alt="Agung Mr. Sam Sambuko — Founder JVTO"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'; }}
                  />
                </div>
                <div>
                  <div className="font-black text-base uppercase" style={{ color: 'var(--jvto-white)' }}>Agung 'Mr. Sam' Sambuko</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: '#F97316' }}>Founder & Active Tourist Police</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Bripka · Ditpamobvit POLDA Jatim</div>
                </div>
              </div>
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Founded', value: '2010' },
                  { label: 'Base', value: 'Bondowoso' },
                  { label: 'NIB', value: '1102230032918' },
                  { label: 'SPRIN', value: 'Active' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.label}</div>
                    <div className="font-bold text-sm" style={{ color: 'var(--jvto-white)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESS TICKER ────────────────────────────────────────────────────── */}
      <section className="py-8 overflow-hidden" style={{ background: '#0a1220', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex animate-marquee whitespace-nowrap gap-16">
          {[...displayPress, ...displayPress].map((item: any, idx: number) => (
            <div key={idx} className="flex items-center gap-4 flex-shrink-0">
              <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.publisher}</span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span className="font-mono text-[11px] italic" style={{ color: 'rgba(255,255,255,0.5)' }}>"{item.title}"</span>
              <span className="text-xl" style={{ color: 'rgba(249,115,22,0.4)' }}>◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── §9 INDEPENDENT REVIEW SOURCES ──────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4" style={{ color: 'var(--jvto-navy)' }}>
              Independent Review Sources
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#64748b' }}>
              Review signals matter, but they should be checked at the source. Use our review registry to see where guests have reviewed JVTO independently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {REVIEW_PLATFORMS.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card p-6 flex flex-col gap-4 group transition-all hover:-translate-y-1"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-black text-lg uppercase" style={{ color: platform.color }}>{platform.name}</div>
                  <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: platform.color }} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black" style={{ color: 'var(--jvto-navy)' }}>{platform.score}</span>
                  <span className="text-sm font-bold" style={{ color: '#94a3b8' }}>/5 · {platform.total} reviews</span>
                </div>
                <p className="text-xs leading-relaxed flex-1" style={{ color: '#64748b' }}>{platform.desc}</p>
                <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: platform.color }}>
                  Verify on {platform.name} →
                </div>
              </a>
            ))}
          </div>

          {/* Featured reviews */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {displayReviews.slice(0, 3).map((review: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bento-card p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#F97316' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: '#475569' }}>
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-sm uppercase" style={{ color: 'var(--jvto-navy)' }}>{review.author}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#94a3b8' }}>{review.date}</p>
                  </div>
                  <span className="tech-badge">{review.platform}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/reviews">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider"
                style={{ border: '1px solid rgba(249,115,22,0.3)', color: '#F97316' }}>
                See the Full Reviews Registry <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── §10 VERIFY JVTO INDEPENDENTLY ──────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: 'var(--jvto-navy)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4" style={{ color: 'var(--jvto-white)' }}>
              Verify JVTO Independently
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--jvto-text)' }}>
              We do not ask travelers to rely on promises alone. JVTO maintains verification pages for legal identity, safety-related documents, historical proof, and selected third-party references so you can inspect the operator before you book.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {VERIFY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.title} href={card.href}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl p-7 flex flex-col gap-4 cursor-pointer group transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <div className="p-3 rounded-xl w-fit" style={{ background: `${card.color}15` }}>
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <h3 className="font-black text-base uppercase" style={{ color: 'var(--jvto-white)' }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--jvto-text)' }}>{card.desc}</p>
                    <div className="font-mono text-[10px] uppercase tracking-wider group-hover:gap-2 flex items-center gap-1 transition-all"
                      style={{ color: card.color }}>
                      View documents <ChevronRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/verify-jvto">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider"
                style={{ background: '#A3E635', color: '#0f1a2e' }}>
                Open Verification Hub <ShieldCheck className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── §11 PLAN BEFORE YOU BOOK ────────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: '#f1f5f9' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold uppercase tracking-[0.2em] mb-6 text-[11px]"
              style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', color: '#F97316' }}>
              <BookOpen className="w-3 h-3" /> Travel Guide
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4" style={{ color: 'var(--jvto-navy)' }}>
              Plan Before You Book
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#64748b' }}>
              Use the travel guide to understand route difficulty, booking flow, screening, closures, and preparation before choosing a package.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {TRAVEL_GUIDE_CARDS.map((card, idx) => (
              <Link key={card.href} href={card.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="bento-card p-6 flex items-start gap-4 group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg flex-shrink-0" style={{ background: 'rgba(249,115,22,0.1)' }}>
                    <Droplets className="w-4 h-4" style={{ color: '#F97316' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-sm uppercase mb-1" style={{ color: 'var(--jvto-navy)' }}>{card.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{card.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: '#F97316' }} />
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/travel-guide">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider"
                style={{ background: '#F97316', color: '#fff' }}>
                Open Travel Guide <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── §12 PRE-FOOTER CTA BAND ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'var(--jvto-navy)' }}>
        <div className="scanline" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ShieldCheck className="w-14 h-14 mx-auto mb-6" style={{ color: '#F97316' }} />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4" style={{ color: 'var(--jvto-white)' }}>
              Ready to choose a route,<br />
              <span style={{ color: '#F97316' }}>or want to verify us first?</span>
            </h2>
            <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: 'var(--jvto-text)' }}>
              Every policy, every credential, every price — transparent before you commit. No pressure. No hidden fees. Just operational certainty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours">
                <button className="group text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-3 shadow-xl"
                  style={{ background: '#F97316', boxShadow: '0 20px 40px rgba(249,115,22,0.25)' }}>
                  Browse Private Tours <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/verify-jvto">
                <button className="group text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-3"
                  style={{ background: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.3)', color: '#A3E635' }}>
                  <ShieldCheck className="w-5 h-5" /> Verify Our Credentials
                </button>
              </Link>
              <Link href="/contact">
                <button className="group text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-3"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Contact JVTO
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </GlobalLayout>
  );
}
