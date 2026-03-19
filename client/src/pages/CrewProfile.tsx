import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { SafetyMetrics } from '@/components/SafetyMetrics';
import { AuditTrail } from '@/components/AuditTrail';
import { AuditStamp } from '@/components/AuditStamp';
import { ShieldCheck, ArrowLeft, Award, Star, ChevronRight, Activity, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const STATIC_CREW: Record<string, any> = {
  'pak-mujib': {
    slug: 'pak-mujib', name: 'Pak Mujib', role: 'Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    quote: '"I built JVTO on one principle: if you can\'t prove it, don\'t claim it."',
    reviewer: 'Pak Mujib, Founder',
    archetype: 'The Architect of Certainty',
    fullQuote: 'After 15 years guiding tourists through East Java\'s volcanoes, I realized the industry\'s biggest problem wasn\'t safety — it was trust. Operators made claims they couldn\'t verify. We built JVTO to change that. Every certificate on our wall has a hash. Every guide has a public audit trail. This is not bureaucracy — this is respect for the people who trust us with their lives.',
    tags: ['Founder', 'Master Guide', 'Tourist Police Verified', 'POLDA Jatim Certified'],
    expertise: ['Ijen Crater', 'Mount Bromo', 'Tumpak Sewu', 'Madakaripura', 'Crisis Management'],
    credentialName: 'Tourist Police Certificate',
    credentialIssuer: 'POLDA Jatim — East Java Regional Police',
    credentialStatus: 'VERIFIED_ACTIVE',
    credentialCardImage: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80',
    safetyMetrics: [
      { label: 'Guest Satisfaction', value: 99, history: [95, 97, 98, 97, 99, 99, 99, 98, 99, 99] },
      { label: 'Safety Record', value: 100, history: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
      { label: 'On-Time Departure', value: 97, history: [94, 95, 96, 97, 96, 97, 98, 97, 97, 97] },
    ],
  },
  'pak-arif': {
    slug: 'pak-arif', name: 'Pak Arif', role: 'Guide',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    quote: '"Every step on Ijen is a step I\'ve taken 500 times. I know every rock, every gas pocket."',
    reviewer: 'Pak Arif, Senior Guide',
    archetype: 'The Ijen Specialist',
    fullQuote: 'I\'ve been guiding Ijen since 2012. The blue fire never gets old, but my respect for the mountain only grows. Safety is not a policy — it\'s a practice. I know when to turn back, and I\'ve never hesitated to do so.',
    tags: ['Senior Guide', 'Ijen Specialist', 'Gas Safety Certified', '12 Years Experience'],
    expertise: ['Ijen Crater', 'Blue Fire Protocol', 'Gas Mask Training', 'Emergency Evacuation'],
    credentialName: 'Licensed Mountain Guide',
    credentialIssuer: 'Indonesian Mountain Guide Association',
    credentialStatus: 'VERIFIED_ACTIVE',
    safetyMetrics: [
      { label: 'Guest Satisfaction', value: 98, history: [94, 96, 97, 97, 98, 98, 98, 97, 98, 98] },
      { label: 'Safety Record', value: 100, history: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
    ],
  },
};

const AUDIT_LOGS = [
  { timestamp: '2026-01-15 09:00', action: 'CREDENTIAL_RENEWAL', actor: 'POLDA_JATIM_SYSTEM', status: 'verified' as const, details: 'Annual tourist police certification renewed and hash-verified' },
  { timestamp: '2026-01-10 14:30', action: 'SAFETY_AUDIT', actor: 'JVTO_INTERNAL', status: 'verified' as const, details: 'Quarterly safety metrics review — all metrics within acceptable range' },
  { timestamp: '2025-12-01 10:00', action: 'GUIDE_TRAINING', actor: 'JVTO_TRAINING', status: 'verified' as const, details: 'Annual gas safety and emergency response training completed' },
  { timestamp: '2025-09-15 08:00', action: 'BACKGROUND_CHECK', actor: 'POLDA_JATIM', status: 'verified' as const, details: 'Annual background verification — no incidents on record' },
];

export default function CrewProfile() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || '';
  const [auditOpen, setAuditOpen] = useState(false);
  const { data: crewMember } = trpc.crew.getBySlug.useQuery({ slug });

  const displayMember = crewMember || STATIC_CREW[slug];

  if (!displayMember) {
    return (
      <GlobalLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-black text-authority-navy uppercase mb-4">Crew Member Not Found</h2>
            <Link href="/team">
              <button className="flex items-center gap-2 text-safety-orange font-mono text-[11px] uppercase tracking-widest mx-auto">
                <ArrowLeft className="w-4 h-4" /> Back to Team Registry
              </button>
            </Link>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  const tags = Array.isArray(displayMember.tags) ? displayMember.tags :
    (typeof displayMember.tags === 'string' ? JSON.parse(displayMember.tags || '[]') : []);
  const expertise = Array.isArray(displayMember.expertise) ? displayMember.expertise :
    (typeof displayMember.expertise === 'string' ? JSON.parse(displayMember.expertise || '[]') : []);
  const safetyMetrics = Array.isArray(displayMember.safetyMetrics) ? displayMember.safetyMetrics :
    (typeof displayMember.safetyMetrics === 'string' ? JSON.parse(displayMember.safetyMetrics || '[]') : []);

  return (
    <GlobalLayout>
      <section className="bg-authority-navy py-20 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link href="/team">
            <button className="flex items-center gap-2 text-white/60 font-mono text-[11px] uppercase tracking-widest mb-8 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Team Registry
            </button>
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="tech-badge">{displayMember.role}</span>
                {displayMember.credentialStatus === 'VERIFIED_ACTIVE' && (
                  <div className="verified-badge">Verified Active</div>
                )}
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
                {displayMember.name}
              </h1>
              {displayMember.archetype && (
                <p className="font-mono text-[11px] text-safety-orange uppercase tracking-[0.2em] mb-6">{displayMember.archetype}</p>
              )}
              {displayMember.fullQuote && (
                <blockquote className="text-slate-400 text-lg italic font-light leading-relaxed border-l-4 border-safety-orange pl-6 mb-8">
                  "{displayMember.fullQuote}"
                </blockquote>
              )}
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag: string, i: number) => (
                  <span key={i} className="font-mono text-[10px] bg-white/5 border border-white/10 text-white/70 px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <button
                onClick={() => setAuditOpen(true)}
                className="flex items-center gap-3 bg-safety-orange hover:bg-safety-orange/90 text-white px-6 py-3 rounded-xl font-black uppercase tracking-wider text-sm transition-all"
              >
                <Activity className="w-4 h-4" /> View Full Audit Trail
              </button>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={displayMember.image}
                  alt={displayMember.name}
                  className="w-full h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-authority-navy/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Credential Card */}
              {displayMember.credentialName && (
                <div className="bento-card p-8 border-safety-orange/20 border">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-6 h-6 text-safety-orange" />
                    <h2 className="text-2xl font-black uppercase text-authority-navy">Credential</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Certificate Name</p>
                      <p className="font-black text-authority-navy uppercase">{displayMember.credentialName}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Issuing Authority</p>
                      <p className="font-black text-authority-navy uppercase">{displayMember.credentialIssuer}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <div className="verified-badge inline-block">{displayMember.credentialStatus}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Expertise */}
              {expertise.length > 0 && (
                <div className="bento-card p-8">
                  <h2 className="text-2xl font-black uppercase text-authority-navy mb-6">Areas of Expertise</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {expertise.map((item: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                      >
                        <Award className="w-4 h-4 text-safety-orange flex-shrink-0" />
                        <span className="text-authority-navy font-bold uppercase text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Safety Metrics Sidebar */}
            <div className="space-y-6">
              {safetyMetrics.length > 0 && (
                <div className="bento-card p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-5 h-5 text-safety-orange" />
                    <h3 className="font-black uppercase text-authority-navy">Performance Metrics</h3>
                  </div>
                  <SafetyMetrics metrics={safetyMetrics} />
                </div>
              )}

              <div className="bento-card p-6 bg-authority-navy text-white">
                <div className="scanline" />
                <Fingerprint className="w-8 h-8 text-safety-orange mb-4" />
                <h3 className="font-black uppercase text-lg mb-2">Audit This Profile</h3>
                <p className="text-slate-400 text-sm font-light mb-6">
                  All credentials are publicly verifiable. Click to view the complete audit trail.
                </p>
                <button
                  onClick={() => setAuditOpen(true)}
                  className="group flex items-center justify-center gap-3 bg-safety-orange hover:bg-safety-orange/90 text-white px-6 py-3 rounded-xl font-black uppercase tracking-wider text-sm transition-all w-full"
                >
                  Open Audit Trail <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <AuditStamp title="PROFILE_VERIFIED" subtitle="Credentials Active 2026" />
        </div>
      </section>

      <AuditTrail
        entityId={displayMember.slug}
        entityName={displayMember.name}
        logs={AUDIT_LOGS}
        isOpen={auditOpen}
        onClose={() => setAuditOpen(false)}
      />
    </GlobalLayout>
  );
}
