import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import {
  ShieldCheck, ArrowRight, Star, Users, Award, Clock, MapPin, ChevronRight,
  Fingerprint, Activity, TrendingUp, Lock, AlertTriangle, CheckCircle2, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const HERO_STATS = [
  { label: 'Verified Expeditions', value: '2,847+', icon: ShieldCheck },
  { label: 'Safety Record', value: '100%', icon: Activity },
  { label: 'Audit Score', value: '9.8/10', icon: TrendingUp },
  { label: 'Years Active', value: '11+', icon: Clock },
];

const TRUST_SIGNALS = [
  { label: 'Tourist Police Verified', status: 'VERIFIED', color: 'text-verified-bright' },
  { label: 'POLDA Jatim Certified', status: 'CERTIFIED', color: 'text-verified-bright' },
  { label: 'ISO 9001 Compliant', status: 'COMPLIANT', color: 'text-verified-bright' },
  { label: 'ISIC Partner', status: 'PARTNER', color: 'text-verified-bright' },
];

const DESTINATIONS_STATIC = [
  { slug: 'ijen-crater', title: 'Ijen Crater', category: 'Volcano', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80', altitude: '2,386m', difficulty: 'challenging' },
  { slug: 'mount-bromo', title: 'Mount Bromo', category: 'Volcano', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80', altitude: '2,329m', difficulty: 'moderate' },
  { slug: 'madakaripura-waterfall', title: 'Madakaripura Waterfall', category: 'Waterfall', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', altitude: '200m', difficulty: 'easy' },
  { slug: 'tumpak-sewu', title: 'Tumpak Sewu', category: 'Waterfall', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80', altitude: '500m', difficulty: 'moderate' },
  { slug: 'papuma-beach', title: 'Papuma Beach', category: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', altitude: '0m', difficulty: 'easy' },
];

const TESTIMONIALS = [
  { author: 'Sarah M.', text: 'The most transparent tour operator I\'ve ever worked with. Every credential verified, every claim backed by evidence.', rating: 5, platform: 'Trustpilot', date: 'Jan 2026' },
  { author: 'James K.', text: 'Ijen at 2am with JVTO — the blue fire was otherworldly. The safety protocols gave me complete confidence.', rating: 5, platform: 'Google', date: 'Feb 2026' },
  { author: 'Priya S.', text: 'As a solo female traveler, the verification system was exactly what I needed to feel safe. 10/10 recommend.', rating: 5, platform: 'TripAdvisor', date: 'Mar 2026' },
];

const PRESS_STATIC = [
  { publisher: 'The Guardian', title: 'The tour operator that proves everything' },
  { publisher: 'Lonely Planet', title: 'Best verified volcano tours in Indonesia' },
  { publisher: 'National Geographic', title: 'Safety-first approach to adventure tourism' },
];

export default function Home() {
  const [auditTick, setAuditTick] = useState(0);
  const { data: destinations } = trpc.destinations.list.useQuery();
  const { data: reviews } = trpc.reviews.list.useQuery({ featured: true });

  const displayDestinations = (destinations && destinations.length > 0) ? destinations : DESTINATIONS_STATIC;
  const displayReviews = (reviews && reviews.length > 0) ? reviews : TESTIMONIALS;

  useEffect(() => {
    const interval = setInterval(() => setAuditTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalLayout>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-authority-navy overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="scanline" />

        {/* Floating audit nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-safety-orange/30"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-8"
              >
                <div className="status-live" />
                <span>Forensic Audit Protocol Active</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white mb-8"
              >
                The Only<br />
                <span className="text-safety-orange text-glow">Verified</span><br />
                Volcano Tour
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-xl leading-relaxed mb-10 font-light max-w-lg"
              >
                Every guide credential, safety metric, and legal document is publicly auditable.
                We don't ask for trust — we provide proof.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link href="/tours">
                  <button className="group bg-safety-orange hover:bg-safety-orange/90 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all shadow-xl shadow-safety-orange/20 flex items-center gap-3">
                    Audit Our Tours <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/verify-jvto">
                  <button className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-3">
                    <Fingerprint className="w-5 h-5" /> Verify Credentials
                  </button>
                </Link>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {TRUST_SIGNALS.map((signal) => (
                  <div key={signal.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                    <CheckCircle2 className="w-3 h-3 text-verified-bright" />
                    <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest">{signal.label}</span>
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
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                <div className="scanline" />
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-verified-bright/60" />
                  <span className="font-mono text-[11px] text-slate-500 ml-2 uppercase tracking-widest">jvto_audit_terminal_v1.9</span>
                </div>
                <div className="space-y-3 font-mono text-[12px]">
                  <div className="text-slate-500">$ <span className="text-white">audit --entity=JVTO --depth=full</span></div>
                  <div className="text-verified-bright">✓ Tourist Police Certificate: VERIFIED</div>
                  <div className="text-verified-bright">✓ POLDA Jatim License: VERIFIED</div>
                  <div className="text-verified-bright">✓ Guide Credentials: 8/8 VERIFIED</div>
                  <div className="text-verified-bright">✓ Safety Record: 2,847 trips / 0 incidents</div>
                  <div className="text-verified-bright">✓ Press Coverage: 12 outlets VERIFIED</div>
                  <div className="text-slate-500">$ <span className="text-white">generate --report</span></div>
                  <div className="flex items-center gap-2 text-safety-orange">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span>Generating audit report... {auditTick % 3 === 0 ? '|' : auditTick % 3 === 1 ? '/' : '-'}</span>
                  </div>
                  <div className="mt-4 p-3 bg-verified-bright/10 border border-verified-bright/20 rounded-xl">
                    <div className="text-verified-bright font-black text-sm uppercase mb-1">AUDIT_SCORE: 9.8/10</div>
                    <div className="text-slate-400 text-[11px]">Highest rated operator in East Java</div>
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
            {HERO_STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-center">
                  <Icon className="w-6 h-6 text-safety-orange mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-black text-white uppercase">{stat.value}</div>
                  <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── WHY JVTO TEASER ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/20 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
              <Lock className="w-3 h-3" /> Proof-Based Tourism
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-authority-navy mb-6">
              Why JVTO?
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">
              In an industry full of unverified claims, we built the first fully auditable tour operator infrastructure in Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'Verified Credentials', desc: 'Every guide, every certificate, every legal document is publicly accessible and hash-verified.', link: '/verify-jvto', cta: 'Audit Evidence' },
              { icon: Users, title: 'Expert Team', desc: 'Local guides with 5–15 years of experience, tourist police-verified, and continuously trained.', link: '/team', cta: 'Meet the Team' },
              { icon: Award, title: 'Press Recognition', desc: 'Featured in The Guardian, Lonely Planet, National Geographic, and 9 other major outlets.', link: '/why-jvto', cta: 'View Press' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4 }}
                  className="bento-card p-8 group"
                >
                  <div className="p-3 bg-safety-orange/10 rounded-2xl w-fit mb-6">
                    <Icon className="w-6 h-6 text-safety-orange" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-authority-navy mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">{item.desc}</p>
                  <Link href={item.link}>
                    <button className="flex items-center gap-2 text-safety-orange font-mono text-[11px] uppercase tracking-widest hover:gap-3 transition-all">
                      {item.cta} <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DESTINATIONS ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/20 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
                <MapPin className="w-3 h-3" /> Verified Destinations
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-authority-navy">
                Expedition Registry
              </h2>
            </div>
            <Link href="/destinations">
              <button className="hidden md:flex items-center gap-2 text-safety-orange font-mono text-[11px] uppercase tracking-widest hover:gap-3 transition-all">
                All Destinations <ChevronRight className="w-4 h-4" />
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
                      <div className="absolute inset-0 bg-gradient-to-t from-authority-navy/80 to-transparent" />
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
                              dest.difficulty === 'challenging' ? 'text-safety-orange' :
                              dest.difficulty === 'moderate' ? 'text-amber-400' : 'text-verified-bright'
                            }`}>{dest.difficulty}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-verified-bright" />
                        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Verified Route</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-safety-orange group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/destinations">
              <button className="flex items-center gap-2 text-safety-orange font-mono text-[11px] uppercase tracking-widest mx-auto hover:gap-3 transition-all">
                All Destinations <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRESS TICKER ─────────────────────────────────────────────────────── */}
      <section className="py-8 bg-authority-navy border-y border-white/10 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16">
          {[...PRESS_STATIC, ...PRESS_STATIC].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 flex-shrink-0">
              <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">{item.publisher}</span>
              <span className="text-white/50">·</span>
              <span className="font-mono text-[11px] text-white/70 italic">"{item.title}"</span>
              <span className="text-safety-orange/50 text-xl">◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/20 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
              <Star className="w-3 h-3" /> Verified Guest Reports
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-authority-navy">
              Expedition Debriefs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayReviews.slice(0, 3).map((review: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bento-card p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-safety-orange fill-safety-orange" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light italic">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-authority-navy uppercase text-sm">{review.author}</p>
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{review.date}</p>
                  </div>
                  <div className="tech-badge">{review.platform}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-authority-navy relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ShieldCheck className="w-16 h-16 text-safety-orange mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
              Ready to Deploy<br />
              <span className="text-safety-orange">Your Expedition?</span>
            </h2>
            <p className="text-slate-400 text-xl mb-10 font-light">
              Join 2,847+ verified travelers who chose proof over promises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours">
                <button className="group bg-safety-orange hover:bg-safety-orange/90 text-white px-10 py-5 rounded-xl font-black uppercase tracking-wider text-sm transition-all shadow-xl shadow-safety-orange/20 flex items-center gap-3 mx-auto sm:mx-0">
                  Browse Verified Tours <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/why-jvto">
                <button className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-5 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-3 mx-auto sm:mx-0">
                  <AlertTriangle className="w-5 h-5" /> Why This Matters
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </GlobalLayout>
  );
}
