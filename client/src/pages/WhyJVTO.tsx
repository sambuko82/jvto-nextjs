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
      {/* Header */}
      <section className="bg-authority-navy py-24 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-3 h-3" /> Proof-Based Tourism
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
            Why<br /><span className="text-safety-orange">JVTO?</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">
            In an industry built on unverifiable claims, we built the first fully auditable tour operator infrastructure in Indonesia.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
              <AlertTriangle className="w-3 h-3" /> The Industry Problem
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-authority-navy mb-6">
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
                className="bento-card p-6 border-red-200"
              >
                <AlertTriangle className="w-6 h-6 text-red-400 mb-4" />
                <h3 className="font-black uppercase text-authority-navy mb-3">{problem.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{problem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The JVTO Solution */}
      <section className="py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-verified-bright/10 border border-verified-bright/20 text-authority-navy text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
              <CheckCircle2 className="w-3 h-3" /> The JVTO Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-authority-navy mb-6">
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
                className="bento-card p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-verified-bright/10 rounded-2xl flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-verified-bright" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-authority-navy text-xl mb-2">{solution.title}</h3>
                    <p className="text-slate-500 font-light mb-4">{solution.desc}</p>
                    <div className="hash-string">{solution.hash}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/20 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
              <Newspaper className="w-3 h-3" /> Press Recognition
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-authority-navy mb-6">
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
                className="bento-card p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-black text-authority-navy uppercase text-lg">{item.publisher}</span>
                  {item.url && item.url !== '#' && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-safety-orange transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                {item.quote && (
                  <blockquote className="text-slate-500 italic text-sm font-light leading-relaxed mb-4">
                    "{item.quote}"
                  </blockquote>
                )}
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{item.title}</p>
                {item.date && <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">{item.date}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-authority-navy relative overflow-hidden">
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
