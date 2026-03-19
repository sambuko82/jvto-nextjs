import { GlobalLayout } from '@/components/GlobalLayout';
import { ShieldCheck, MapPin, Calendar, Award, Users, ChevronRight, CheckCircle2, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const timeline = [
  {
    year: '2010',
    title: 'The Family Guesthouse',
    body: 'Bripka Agung Sambuko\'s family ran a small guesthouse in Bondowoso, East Java — a natural stop for travelers heading to Kawah Ijen. Agung, then a young police officer, watched foreign tourists arrive with no guide, no health screening, and no understanding of the volcanic risks. Several were turned back at the crater. Some were not.',
  },
  {
    year: '2015',
    title: 'JVTO Founded',
    body: 'After years of watching unqualified operators put tourists in danger, Agung founded Java Volcano Tour Operator with a single principle: Duty First, Business Second. The first tours were small — a handful of guests per month, all private, all personally guided by Agung. No shared vehicles. No strangers in the same car.',
  },
  {
    year: '2017',
    title: 'Tourist Police Assignment',
    body: 'Agung received his formal assignment to Ditpamobvit — the Tourist Police division of East Java Regional Police (POLDA Jatim). His SPRIN (Surat Perintah) is on file in JVTO\'s Proof Library. This is not a marketing title. It is a verifiable government assignment that can be confirmed through the East Java Regional Police.',
  },
  {
    year: '2019',
    title: 'Mandatory Health Screening Introduced',
    body: 'Following a series of medical incidents at Kawah Ijen involving other operators\' guests, JVTO introduced mandatory pre-ascent health screening for all Ijen tours — before Indonesian law required it. JVTO partnered with licensed physician dr. Ahmad Irwandanu (STR: QN00001073380217) to conduct SpO₂ and blood pressure checks at the Paltuding basecamp.',
  },
  {
    year: '2021',
    title: 'PT Java Volcano Rendezvous Registered',
    body: 'JVTO formalized as PT Java Volcano Rendezvous under Indonesia\'s OSS business registration system. NIB No. 1102230032918 is publicly verifiable at oss.go.id. The Tourism Business License (TDUP) was issued in the same year. This was not a response to a problem — it was a proactive step to make JVTO\'s legitimacy verifiable by anyone.',
  },
  {
    year: '2022',
    title: 'ISIC Partnership & INDECON Membership',
    body: 'JVTO became an official ISIC (International Student Identity Card) partner, offering student discounts on select tour packages. JVTO also joined INDECON — the Indonesian Ecotourism Network — in recognition of responsible tourism practices in East Java.',
  },
  {
    year: '2023',
    title: 'Proof Library & SHA-256 Verification',
    body: 'JVTO launched its public Proof Library — a repository of all key credentials, licenses, and certifications with SHA-256 hashes for tamper verification. The goal: make it impossible to fake JVTO\'s credentials without detection. Every document in the library is independently verifiable through the issuing authority.',
  },
  {
    year: '2024–2026',
    title: 'Stefan Loose & Detik Coverage',
    body: 'JVTO was featured in Stefan Loose Travel Guides (Germany\'s leading travel guidebook series) as a recommended operator for East Java volcano tours. Detik News — Indonesia\'s largest digital news platform — published a feature on JVTO\'s Tourist Police-led model. 44+ independent Trustpilot reviews. 5.0★ on TripAdvisor. The record speaks for itself.',
  },
];

const principles = [
  {
    title: 'Private Only — Always',
    body: 'JVTO has never offered shared tours and never will. Every booking is 100% private — your group gets its own vehicle, driver, and guide. This is not a premium upgrade. It is the only way JVTO operates.',
  },
  {
    title: 'Mandatory Health Screening — Non-Negotiable',
    body: 'The health screening at Kawah Ijen is not a formality. Guests who do not meet the medical thresholds will not be cleared for the crater floor descent. This is a non-negotiable safety rule, regardless of how far you have traveled.',
  },
  {
    title: 'Realistic Driving Days — No Heroics',
    body: 'JVTO plans itineraries around realistic driving times. The Bromo-to-Banyuwangi leg is 5–6 hours. JVTO does not compress this into 3 hours to make the itinerary look better. Tired drivers cause accidents.',
  },
  {
    title: 'Weather Closures — Enforced, Not Negotiated',
    body: 'If a destination is closed by Indonesian authorities or conditions are unsafe, JVTO will cancel. There is no negotiation. 100% JVTO Travel Credit is issued for all JVTO-initiated cancellations.',
  },
  {
    title: 'Verifiable, Not Just Claimed',
    body: 'Every JVTO credential is publicly verifiable through the issuing authority. NIB at oss.go.id. Tourist Police SPRIN through POLDA Jatim. Medical license STR through KKI. Guide licenses through HPWKI. SHA-256 hashes in the Proof Library.',
  },
];

export default function OurStory() {
  return (
    <GlobalLayout>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-authority-navy overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="scanline" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-8"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Founded 2015 · Bondowoso, East Java</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-8"
          >
            How JVTO<br />
            <span className="text-safety-orange">Was Built.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl leading-relaxed font-light max-w-2xl"
          >
            Java Volcano Tour Operator (JVTO) was founded by active Tourist Police officer Bripka Agung Sambuko in 2015 — not because the market needed another tour operator, but because the market needed one that prioritized safety over sales. This is that story.
          </motion.p>
        </div>
      </section>

      {/* ─── ENTITY ANCHOR ────────────────────────────────────────────────────── */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Founded', value: '2015', icon: Calendar },
              { label: 'Registered Entity', value: 'PT Java Volcano Rendezvous', icon: Award },
              { label: 'Business License', value: 'NIB: 1102230032918', icon: Fingerprint },
              { label: 'Base', value: 'Bondowoso, East Java', icon: MapPin },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bento-card p-4 text-center">
                  <Icon className="w-5 h-5 text-safety-orange mx-auto mb-2" />
                  <div className="font-black text-authority-navy text-sm uppercase leading-tight">{item.value}</div>
                  <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-1">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FOUNDER QUOTE ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-audit-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bento-card p-10 md:p-14 relative overflow-hidden">
            <div className="scanline" />
            <div className="text-6xl text-safety-orange/20 font-black leading-none mb-4">"</div>
            <blockquote className="text-2xl md:text-3xl font-black uppercase tracking-tight text-authority-navy leading-tight mb-8">
              Most tour operators are sales-first. JVTO was built by a police officer who watched tourists get hurt by operators who prioritized revenue over safety. That's why every JVTO policy exists to protect you — not to make the sale easier.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-safety-orange rounded-xl">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-black text-authority-navy uppercase">Bripka Agung Sambuko</div>
                <div className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">Founder · Active Tourist Police Officer · Ditpamobvit East Java</div>
              </div>
              <div className="ml-auto">
                <div className="verified-badge">ACTIVE DUTY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/20 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
              <Calendar className="w-3 h-3" /> Operational History
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-authority-navy">
              The JVTO Timeline
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-4 top-3 w-8 h-8 bg-safety-orange rounded-full flex items-center justify-center text-white font-black text-[10px] z-10 shadow-lg shadow-safety-orange/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="bento-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[11px] text-safety-orange font-black uppercase tracking-widest bg-safety-orange/10 px-2 py-0.5 rounded">{item.year}</span>
                      <h3 className="font-black text-authority-navy uppercase text-base">{item.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-authority-navy relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
              <ShieldCheck className="w-3 h-3" /> Non-Negotiable Principles
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              The JVTO Rulebook
            </h2>
            <p className="text-slate-400 text-lg mt-4 font-light">
              These are not marketing promises. They are operational rules that JVTO enforces regardless of commercial pressure.
            </p>
          </div>

          <div className="space-y-4">
            {principles.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4"
              >
                <CheckCircle2 className="w-5 h-5 text-verified-bright flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-black text-white uppercase text-sm mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-audit-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Users className="w-12 h-12 text-safety-orange mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-authority-navy mb-4">
            Meet the Crew Behind the Rulebook
          </h2>
          <p className="text-slate-500 text-lg font-light mb-8">
            Every JVTO policy is enforced by real people with verifiable credentials. Meet the founder, the physician, and the drivers who make it operational.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/team">
              <button className="group bg-safety-orange hover:bg-safety-orange/90 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all shadow-xl shadow-safety-orange/20 flex items-center gap-3 mx-auto sm:mx-0">
                Meet the Crew <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/verify-jvto">
              <button className="group bg-white border border-slate-200 hover:border-safety-orange text-authority-navy px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-3 mx-auto sm:mx-0">
                <Fingerprint className="w-5 h-5" /> Open Proof Library
              </button>
            </Link>
          </div>
        </div>
      </section>
    </GlobalLayout>
  );
}
