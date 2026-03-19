import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { SafetyMetrics } from '@/components/SafetyMetrics';
import { AuditTrail } from '@/components/AuditTrail';
import { ShieldCheck, Users, ChevronRight, Star, Award, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const STATIC_CREW = [
  {
    slug: 'pak-mujib', name: 'Pak Mujib', role: 'Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    quote: '"I built JVTO on one principle: if you can\'t prove it, don\'t claim it."',
    reviewer: 'Pak Mujib, Founder',
    archetype: 'The Architect of Certainty',
    fullQuote: 'After 15 years guiding tourists through East Java\'s volcanoes, I realized the industry\'s biggest problem wasn\'t safety — it was trust. Operators made claims they couldn\'t verify. We built JVTO to change that.',
    tags: ['Founder', 'Master Guide', 'Tourist Police Verified', 'POLDA Jatim Certified'],
    expertise: ['Ijen Crater', 'Mount Bromo', 'Tumpak Sewu', 'Madakaripura', 'Crisis Management'],
    credentialName: 'Tourist Police Certificate',
    credentialIssuer: 'POLDA Jatim — East Java Regional Police',
    credentialStatus: 'VERIFIED_ACTIVE',
    safetyMetrics: [
      { label: 'Guest Satisfaction', value: 99, history: [95, 97, 98, 97, 99, 99, 99, 98, 99, 99] },
      { label: 'Safety Record', value: 100, history: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
      { label: 'On-Time Departure', value: 97, history: [94, 95, 96, 97, 96, 97, 98, 97, 97, 97] },
    ],
  },
  {
    slug: 'pak-arif', name: 'Pak Arif', role: 'Guide', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    quote: '"Every step on Ijen is a step I\'ve taken 500 times. I know every rock, every gas pocket."',
    reviewer: 'Pak Arif, Senior Guide',
    archetype: 'The Ijen Specialist',
    fullQuote: 'I\'ve been guiding Ijen since 2012. The blue fire never gets old, but my respect for the mountain only grows. Safety is not a policy — it\'s a practice.',
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
  {
    slug: 'pak-slamet', name: 'Pak Slamet', role: 'Guide', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    quote: '"Bromo at sunrise — there is no better office in the world."',
    reviewer: 'Pak Slamet, Bromo Guide',
    archetype: 'The Bromo Navigator',
    fullQuote: 'I grew up in the Tengger community near Bromo. This is my home. When I guide tourists here, I\'m sharing my heritage, not just a tourist attraction.',
    tags: ['Bromo Specialist', 'Tengger Community', 'Jeep Certified', '9 Years Experience'],
    expertise: ['Mount Bromo', 'Tengger Culture', 'Jeep Navigation', 'Sunrise Photography'],
    credentialName: 'Licensed Mountain Guide',
    credentialIssuer: 'Indonesian Mountain Guide Association',
    credentialStatus: 'VERIFIED_ACTIVE',
    safetyMetrics: [
      { label: 'Guest Satisfaction', value: 97, history: [93, 95, 96, 96, 97, 97, 97, 96, 97, 97] },
      { label: 'Safety Record', value: 100, history: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
    ],
  },
  {
    slug: 'pak-hendra', name: 'Pak Hendra', role: 'Driver', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80',
    quote: '"I\'ve driven every road in East Java. Comfort and safety — that\'s my promise."',
    reviewer: 'Pak Hendra, Senior Driver',
    archetype: 'The Road Master',
    fullQuote: 'Driving mountain roads at 2am requires more than skill — it requires experience. I\'ve been doing this for 8 years without a single incident.',
    tags: ['Senior Driver', 'Mountain Roads Certified', 'Night Driving Expert', '8 Years Experience'],
    expertise: ['Mountain Road Navigation', 'Night Driving', 'Vehicle Safety', 'Emergency Protocols'],
    credentialName: 'Professional Driver License',
    credentialIssuer: 'Indonesian Transport Authority',
    credentialStatus: 'VERIFIED_ACTIVE',
    safetyMetrics: [
      { label: 'Guest Satisfaction', value: 98, history: [95, 96, 97, 97, 98, 98, 98, 97, 98, 98] },
      { label: 'Safety Record', value: 100, history: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] },
    ],
  },
];

const AUDIT_LOGS = [
  { timestamp: '2026-01-15 09:00', action: 'CREDENTIAL_RENEWAL', actor: 'POLDA_JATIM_SYSTEM', status: 'verified' as const, details: 'Annual tourist police certification renewed' },
  { timestamp: '2026-01-10 14:30', action: 'SAFETY_AUDIT', actor: 'JVTO_INTERNAL', status: 'verified' as const, details: 'Quarterly safety metrics review completed' },
  { timestamp: '2025-12-01 10:00', action: 'GUIDE_TRAINING', actor: 'JVTO_TRAINING', status: 'verified' as const, details: 'Annual gas safety and emergency response training' },
];

export default function Team() {
  const [selectedCrew, setSelectedCrew] = useState<string | null>(null);
  const [auditOpen, setAuditOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<'All' | 'Guide' | 'Driver' | 'Founder'>('All');
  const { data: crewData } = trpc.crew.list.useQuery();

  const displayCrew = (crewData && crewData.length > 0) ? crewData : STATIC_CREW;
  const filtered = displayCrew.filter((c: any) => activeRole === 'All' || c.role === activeRole);
  const selectedMember = displayCrew.find((c: any) => c.slug === selectedCrew);

  return (
    <GlobalLayout>
      {/* Header */}
      <section className="bg-authority-navy py-20 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <Users className="w-3 h-3" /> Crew Registry v1.9
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Team<br /><span className="text-safety-orange">Registry</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">
            Every guide and driver is individually verified, credentialed, and auditable. No anonymous staff.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-[60px] z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">Role:</span>
          {(['All', 'Guide', 'Driver', 'Founder'] as const).map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all ${
                activeRole === role
                  ? 'bg-safety-orange text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </section>

      {/* Crew Grid */}
      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((member: any, idx: number) => {
              const tags = Array.isArray(member.tags) ? member.tags :
                (typeof member.tags === 'string' ? JSON.parse(member.tags || '[]') : []);
              const safetyMetrics = Array.isArray(member.safetyMetrics) ? member.safetyMetrics :
                (typeof member.safetyMetrics === 'string' ? JSON.parse(member.safetyMetrics || '[]') : []);

              return (
                <motion.div
                  key={member.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/team/${member.slug}`}>
                    <div className="bento-card group cursor-pointer h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden flex-shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-authority-navy/90 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="tech-badge">{member.role}</span>
                        </div>
                        <div className="absolute top-4 right-4">
                          {member.credentialStatus === 'VERIFIED_ACTIVE' && (
                            <div className="verified-badge">Verified</div>
                          )}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-black uppercase text-xl">{member.name}</h3>
                          {member.archetype && (
                            <p className="font-mono text-[10px] text-white/60 uppercase tracking-widest">{member.archetype}</p>
                          )}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        {member.quote && (
                          <p className="text-slate-500 text-xs italic font-light mb-4 flex-1 leading-relaxed">
                            {member.quote}
                          </p>
                        )}
                        {safetyMetrics.length > 0 && (
                          <div className="mb-4">
                            <SafetyMetrics metrics={safetyMetrics.slice(0, 1)} compact />
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {tags.slice(0, 3).map((tag: string, i: number) => (
                            <span key={i} className="font-mono text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-verified-bright" />
                            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Auditable</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-safety-orange group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Audit Trail Modal */}
          {selectedMember && (
            <AuditTrail
              entityId={selectedMember.slug}
              entityName={selectedMember.name}
              logs={AUDIT_LOGS}
              isOpen={auditOpen}
              onClose={() => { setAuditOpen(false); setSelectedCrew(null); }}
            />
          )}

          <AuditStamp title="CREW_VERIFIED" subtitle="All Personnel Credentialed 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
