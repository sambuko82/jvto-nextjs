import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { ExternalLink, CheckCircle, Users, Shield } from 'lucide-react';

type CrewMember = {
  id: number;
  slug: string;
  name: string;
  role: string;
  image: string;
  quote?: string | null;
  reviewer?: string | null;
  selfQuote?: string | null;
  ktaUrl?: string | null;
  memberId?: string | null;
  tags?: string | null;
  archetype?: string | null;
  credentialName?: string | null;
  credentialIssuer?: string | null;
  credentialStatus?: string | null;
};

function parseTags(tags: string | null | undefined): string[] {
  if (!tags) return [];
  try { return JSON.parse(tags); } catch { return []; }
}

function CrewCard({ member }: { member: CrewMember }) {
  const tags = parseTags(member.tags);
  const isGuide = member.role === 'Guide';
  const isDriver = member.role === 'Driver';
  const initial = member.name.charAt(0).toUpperCase();
  const accentColor = isGuide ? '#A3E635' : isDriver ? '#38BDF8' : '#F97316';

  return (
    <div
      className="relative flex flex-col rounded-lg overflow-hidden border transition-all duration-200 hover:-translate-y-1"
      style={{ background: 'var(--jvto-card)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      {/* Accent bar */}
      <div className="h-[3px] w-full" style={{ background: accentColor }} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header: photo + name */}
        <div className="flex gap-4 items-start">
          {member.image ? (
            <img
              src={member.image}
              alt={`${member.name} — JVTO ${member.role}`}
              loading="lazy"
              className="w-[60px] h-[60px] rounded-full object-cover flex-shrink-0 border-2"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                t.style.display = 'none';
                const fb = t.nextElementSibling as HTMLElement;
                if (fb) fb.style.display = 'flex';
              }}
            />
          ) : null}
          {/* Fallback initial */}
          <div
            className="w-[60px] h-[60px] rounded-full flex-shrink-0 items-center justify-center text-xl font-black"
            style={{
              display: member.image ? 'none' : 'flex',
              background: 'linear-gradient(135deg,#1E293B,#334155)',
              border: `2px solid ${accentColor}33`,
              color: accentColor,
            }}
          >
            {initial}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-base font-bold" style={{ color: 'var(--jvto-white)' }}>
              {member.name}
            </div>
            <div
              className="text-[10px] font-mono uppercase tracking-wider mt-0.5"
              style={{ color: accentColor }}
            >
              {member.role}{isGuide ? ' · HPWKI Member' : ''}
            </div>
            {member.memberId && (
              <div className="font-mono text-[9px] mt-0.5" style={{ color: 'var(--jvto-text-dim)' }}>
                {member.memberId}
              </div>
            )}
            {/* KTA Badge */}
            {member.ktaUrl && (
              <a
                href={member.ktaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold uppercase tracking-wider transition-all hover:opacity-80"
                style={{
                  background: 'rgba(163,230,53,0.08)',
                  border: '1px solid rgba(163,230,53,0.25)',
                  color: '#A3E635',
                }}
              >
                <CheckCircle className="w-2.5 h-2.5" />
                View KTA Licence
                <ExternalLink className="w-2 h-2" />
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'var(--jvto-text-dim)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Guest review quote */}
        {member.quote && (
          <div
            className="text-xs italic leading-relaxed px-3 py-2.5 rounded-r-sm"
            style={{
              background: '#0a1220',
              borderLeft: '2px solid #F97316',
              color: 'var(--jvto-text)',
            }}
          >
            "{member.quote}"
            {member.reviewer && (
              <div className="mt-1 not-italic font-mono text-[10px]" style={{ color: 'var(--jvto-text-dim)' }}>
                — {member.reviewer}
              </div>
            )}
          </div>
        )}

        {/* Self-quote */}
        {member.selfQuote && (
          <div className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: 'var(--jvto-text-dim)' }}>
              In his own words
            </div>
            <div className="text-xs leading-relaxed" style={{ color: 'var(--jvto-text-dim)' }}>
              "{member.selfQuote}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  count, label, sub, color, borderColor,
}: {
  count: number; label: string; sub: string; color: string; borderColor: string;
}) {
  return (
    <div className="flex items-center gap-3 py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <span
        className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm"
        style={{ background: `${color}18`, border: `1px solid ${color}4D`, color }}
      >
        {label} · {count}
      </span>
      <div className="text-lg font-bold" style={{ color: 'var(--jvto-white)' }}>
        {label === 'Guides' ? 'English-speaking Certified Guides' : 'Professional Drivers'}
      </div>
      <span className="ml-auto font-mono text-[11px]" style={{ color: 'var(--jvto-text-dim)' }}>
        {sub}
      </span>
    </div>
  );
}

export default function Team() {
  const { data: allCrew, isLoading } = trpc.crew.list.useQuery();

  const guides = (allCrew ?? []).filter((c: any) => c.role === 'Guide');
  const drivers = (allCrew ?? []).filter((c: any) => c.role === 'Driver');

  return (
    <GlobalLayout>
      <div style={{ background: 'var(--jvto-navy)', minHeight: '100vh' }}>
        {/* Breadcrumb */}
        <div
          className="font-mono text-[11px] px-4 md:px-8 py-3"
          style={{ color: 'var(--jvto-text-dim)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span>javavolcano-touroperator.com</span>
          {' / '}
          <span>why-jvto</span>
          {' / '}
          <span style={{ color: '#A3E635' }}>our-team</span>
        </div>

        {/* Hero */}
        <section
          className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm font-mono text-[10px] font-bold uppercase tracking-wider mb-5"
            style={{
              background: 'rgba(163,230,53,0.08)',
              border: '1px solid rgba(163,230,53,0.3)',
              color: '#A3E635',
            }}
          >
            <Users className="w-3 h-3" />
            Hybrid · Trust + Human
          </div>
          <h1
            className="text-3xl md:text-4xl font-black mb-4 leading-tight"
            style={{ color: 'var(--jvto-white)', letterSpacing: '-0.02em' }}
          >
            The People Behind{' '}
            <em className="not-italic" style={{ color: '#A3E635' }}>Every JVTO Tour</em>
          </h1>
          <p className="text-base mb-6 max-w-xl" style={{ color: 'var(--jvto-text)' }}>
            14 Bondowoso-based team members. Certified guides with HPWKI Ijen climbing licences. Drivers who have navigated these roads for years. Real review quotes — not written by us.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { dot: '#A3E635', label: '7 Certified Guides' },
              { dot: '#38BDF8', label: '7 Professional Drivers' },
              { dot: '#A3E635', label: 'KTA / HPWKI Licensed' },
              { dot: '#A3E635', label: 'Based in Bondowoso since 2015' },
            ].map((chip) => (
              <div
                key={chip.label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-mono text-[10px]"
                style={{
                  background: 'var(--jvto-card)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'var(--jvto-text-dim)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: chip.dot }} />
                {chip.label}
              </div>
            ))}
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-lg animate-pulse" style={{ background: 'var(--jvto-card)' }} />
              ))}
            </div>
          ) : (
            <>
              {/* GUIDES */}
              <SectionHeader
                count={guides.length}
                label="Guides"
                sub="HPWKI KTA licence · Ijen climbing certified"
                color="#A3E635"
                borderColor="#A3E635"
              />
              <div
                className="mb-6 p-4 rounded-sm text-sm leading-relaxed"
                style={{
                  background: 'var(--jvto-card)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: '3px solid #A3E635',
                  color: 'var(--jvto-text-dim)',
                }}
              >
                <strong style={{ color: 'var(--jvto-white)' }}>What KTA means:</strong> Kartu Tanda Anggota (KTA) is the HPWKI membership card certifying that a guide has met the association's safety and competency requirements for Ijen crater operations. Guides without KTA cannot legally operate at Kawah Ijen under HPWKI governance. Where available, the licence card is linked below each profile.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                {guides.map((m: any) => <CrewCard key={m.id} member={m} />)}
              </div>

              {/* DRIVERS */}
              <SectionHeader
                count={drivers.length}
                label="Drivers"
                sub="Bondowoso-based · Local route expertise"
                color="#38BDF8"
                borderColor="#38BDF8"
              />
              <div
                className="mb-6 p-4 rounded-sm text-sm leading-relaxed"
                style={{
                  background: 'var(--jvto-card)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: '3px solid #38BDF8',
                  color: 'var(--jvto-text-dim)',
                }}
              >
                <strong style={{ color: 'var(--jvto-white)' }}>Why drivers matter on volcano tours:</strong> Route timing to Bromo and Ijen requires precise departure management — typically 23:00–02:00 for sunrise positioning. JVTO drivers know these roads in the dark and coordinate directly with guides on safety thresholds and contingency routes.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                {drivers.map((m: any) => <CrewCard key={m.id} member={m} />)}
              </div>

              {/* Footer CTA */}
              <div
                className="text-center p-8 rounded-lg"
                style={{ background: 'var(--jvto-card)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <Shield className="w-8 h-8 mx-auto mb-3" style={{ color: '#A3E635' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--jvto-white)' }}>
                  Want to meet the team in person?
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--jvto-text-dim)' }}>
                  Every JVTO booking assigns a dedicated guide and driver — not a random allocation. Ask via WhatsApp who's available for your dates.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a
                    href="/tours"
                    className="px-6 py-2.5 rounded text-sm font-bold text-white"
                    style={{ background: '#F97316' }}
                  >
                    View our tours
                  </a>
                  <a
                    href="/verify-jvto"
                    className="px-6 py-2.5 rounded text-sm font-semibold"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--jvto-text)' }}
                  >
                    Verify our credentials
                  </a>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </GlobalLayout>
  );
}
