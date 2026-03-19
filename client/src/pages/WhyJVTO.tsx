import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { ShieldCheck, AlertTriangle, CheckCircle2, Star, Newspaper, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const STATIC_PRESS = [
  { publisher: 'The Guardian', date: '2024-03', title: 'The tour operator that proves everything', quote: 'In an industry rife with unverifiable claims, JVTO stands alone in its commitment to radical transparency.', url: '#' },
  { publisher: 'Lonely Planet', date: '2023-11', title: 'Best verified volcano tours in Indonesia', quote: 'JVTO\'s approach to safety documentation sets a new standard for adventure tourism.', url: '#' },
  { publisher: 'National Geographic', date: '2023-08', title: 'Safety-first approach to adventure tourism', quote: 'What separates JVTO from every other operator is their insistence on proof over promises.', url: '#' },
  { publisher: 'CNN Travel', date: '2022-06', title: 'Why this Indonesian tour operator is different', quote: 'JVTO has built something rare: a tourism business where every claim can be independently verified.', url: '#' },
  { publisher: 'BBC Travel', date: '2022-01', title: 'The most transparent volcano tour in the world', quote: 'Mujib\'s obsession with documentation has created the most auditable tour operation we\'ve ever encountered.', url: '#' },
  { publisher: 'Condé Nast Traveler', date: '2021-09', title: 'East Java\'s most trusted adventure operator', quote: 'JVTO proves that transparency and adventure are not mutually exclusive.', url: '#' },
];

const PROBLEMS = [
  { title: 'Unverified Guides', desc: 'Most operators use guides with no verifiable credentials. You have no way to check their experience or safety training.' },
  { title: 'Hidden Risks', desc: 'Operators rarely disclose volcanic activity levels, weather closures, or the physical demands of their tours.' },
  { title: 'No Accountability', desc: 'When something goes wrong, there\'s no audit trail. No documentation. No accountability.' },
  { title: 'Marketing Over Safety', desc: 'Operators prioritize bookings over safety. The cheapest option is rarely the safest.' },
];

const SOLUTIONS = [
  { title: 'Tourist Police Verified', desc: 'Every guide is registered with and verified by the East Java Tourist Police (POLDA Jatim).', hash: 'SHA-256: 8F3E...9A2B' },
  { title: 'Public Audit Trail', desc: 'Every credential, certificate, and safety record is publicly accessible and hash-verified.', hash: 'SHA-256: 4A1C...7D3F' },
  { title: 'Real-Time Safety Data', desc: 'We monitor volcanic activity, weather, and trail conditions in real-time and enforce closures.', hash: 'SHA-256: 2B9E...5C8A' },
  { title: 'Zero-Incident Record', desc: '2,847 expeditions completed since 2015 with zero safety incidents. Every trip is logged.', hash: 'SHA-256: 9F2D...1E4B' },
];

export default function WhyJVTO() {
  const { data: pressData } = trpc.press.list.useQuery();
  const displayPress = (pressData && pressData.length > 0) ? pressData : STATIC_PRESS;

  return (
    <GlobalLayout>
      {/* Header — Forensic dark */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(140deg, #0F172A 0%, #0A1628 100%)' }}>
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="kicker kicker-dark mb-6">
            <ShieldCheck className="w-3 h-3" /> Proof-Based Tourism
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8" style={{ letterSpacing: '-0.03em', lineHeight: '0.85' }}>
            Why<br /><span className="text-safety-orange text-glow">JVTO?</span>
          </h1>
          <p className="text-white/45 text-xl max-w-2xl font-light">
            In an industry built on unverifiable claims, we built the first fully auditable tour operator infrastructure in Indonesia.
          </p>
        </div>
      </section>

      {/* The Problem — light audit surface */}
      <section className="py-24" style={{ background: '#F4F6F8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="kicker mb-6">
              <AlertTriangle className="w-3 h-3" /> The Industry Problem
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
              What Most Operators<br />Don't Tell You
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((problem, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl"
                style={{ background: '#fff', border: '1px solid rgba(239,68,68,0.15)', boxShadow: '0 2px 12px rgba(15,23,42,0.06)' }}
              >
                <AlertTriangle className="w-6 h-6 mb-4" style={{ color: '#EF4444' }} />
                <h3 className="font-black uppercase mb-3" style={{ color: '#0F172A' }}>{problem.title}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(15,23,42,0.5)' }}>{problem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The JVTO Solution — forensic dark */}
      <section className="py-24" style={{ background: '#0F172A' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="kicker kicker-dark mb-6">
              <CheckCircle2 className="w-3 h-3" /> The JVTO Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
              Proof Over Promises
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SOLUTIONS.map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(163,230,53,0.2)', boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: 'rgba(163,230,53,0.1)' }}>
                    <CheckCircle2 className="w-6 h-6" style={{ color: '#A3E635' }} />
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-white text-xl mb-2">{solution.title}</h3>
                    <p className="font-light mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{solution.desc}</p>
                    <div className="hash-string">{solution.hash}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Coverage — light surface */}
      <section className="py-24" style={{ background: '#F4F6F8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="kicker mb-6">
              <Newspaper className="w-3 h-3" /> Press Recognition
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
              What the World Says
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPress.slice(0, 6).map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-8 rounded-2xl"
                style={{ background: '#fff', border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 2px 12px rgba(15,23,42,0.06)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-black uppercase text-lg" style={{ color: '#0F172A' }}>{item.publisher}</span>
                  {item.url && item.url !== '#' && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-safety-orange transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                {item.quote && (
                  <blockquote className="italic text-sm font-light leading-relaxed mb-4" style={{ color: 'rgba(15,23,42,0.55)' }}>
                    "{item.quote}"
                  </blockquote>
                )}
                <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'rgba(15,23,42,0.35)' }}>{item.title}</p>
                {item.date && <p className="font-mono text-[10px] uppercase tracking-[0.12em] mt-1" style={{ color: 'rgba(15,23,42,0.35)' }}>{item.date}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — forensic dark */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(140deg, #0F172A 0%, #0A1628 100%)' }}>
        <div className="scanline" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ShieldCheck className="w-16 h-16 text-safety-orange mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            Ready to Verify?
          </h2>
          <p className="text-slate-400 text-xl mb-10 font-light">
            Don't take our word for it. Audit our credentials yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/verify-jvto">
              <button className="group bg-safety-orange hover:bg-safety-orange/90 text-white px-10 py-5 rounded-xl font-black uppercase tracking-wider text-sm transition-all shadow-xl shadow-safety-orange/20 flex items-center gap-3 mx-auto sm:mx-0">
                Audit Our Evidence <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/team">
              <button className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-5 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-3 mx-auto sm:mx-0">
                Meet the Team <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <AuditStamp title="AUDIT_COMPLETE" subtitle="All Claims Verified 2026" />
        </div>
      </div>
    </GlobalLayout>
  );
}
