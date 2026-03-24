import { useState, useEffect, useRef } from 'react';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import {
  ShieldCheck, Download, Copy, Check, ExternalLink,
  FileText, Award, Newspaper, Clock, Users, Star, BookOpen,
} from 'lucide-react';
import { JsonLd, JVTO_ORGANIZATION_SCHEMA, FOUNDER_SCHEMA, MEDICAL_OFFICER_SCHEMA, buildBreadcrumbSchema, buildItemListSchema } from '@/components/JsonLd';

// Build schemas for Verify JVTO page
const credentialRegistrySchema = buildItemListSchema(
  'JVTO Credential Evidence Locker',
  'Complete registry of Java Volcano Tour Operator licenses, certifications, and press citations with SHA-256 cryptographic verification.',
  [
    { position: 1, name: 'NIB Business License — 1102230032918' },
    { position: 2, name: 'TDUP Tourism Business License' },
    { position: 3, name: 'HPWKI Membership Approval' },
    { position: 4, name: 'Tourist Police ID — Bripka Agung Sambuko NRP 87040755' },
    { position: 5, name: 'Ijen Climbing Permit — BBKSDA Jawa Timur' },
    { position: 6, name: 'Medical Officer STR — dr. Ahmad Irwandanu QN00001073380217' }
  ]
);

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://javavolcano-touroperator.com' },
  { name: 'Verify JVTO', url: 'https://javavolcano-touroperator.com/verify-jvto' }
]);

const SECTIONS = [
  { id: 'legal',       label: 'Legal',       icon: FileText,    color: '#A3E635' },
  { id: 'police',      label: 'Police',      icon: ShieldCheck, color: '#38BDF8' },
  { id: 'history',     label: 'History',     icon: Clock,       color: '#F97316' },
  { id: 'credentials', label: 'Credentials', icon: Award,       color: '#A3E635' },
  { id: 'press',       label: 'Press',       icon: Newspaper,   color: '#F97316' },
  { id: 'partners',    label: 'Partners',    icon: Users,       color: '#38BDF8' },
  { id: 'reputation',  label: 'Reputation',  icon: Star,        color: '#F97316' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      title="Copy hash"
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm font-mono text-[9px] transition-all hover:opacity-80"
      style={{
        background: copied ? 'rgba(163,230,53,0.15)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${copied ? 'rgba(163,230,53,0.4)' : 'rgba(255,255,255,0.1)'}`,
        color: copied ? '#A3E635' : 'var(--jvto-text-dim)',
      }}
    >
      {copied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function VaultCard({ item }: { item: any }) {
  const accentMap: Record<string, string> = {
    legal: '#A3E635', police: '#38BDF8', history: '#F97316', credentials: '#A3E635',
  };
  const accent = accentMap[item.category] ?? '#A3E635';

  return (
    <div
      className="rounded-lg overflow-hidden border flex flex-col"
      style={{ background: 'var(--jvto-card)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div className="h-[3px]" style={{ background: accent }} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        {item.type && (
          <div className="font-mono text-[9px] uppercase tracking-wider" style={{ color: accent }}>
            {item.type}
          </div>
        )}
        <h3 className="text-sm font-bold leading-snug" style={{ color: 'var(--jvto-white)' }}>
          {item.title}
        </h3>
        {item.caption && (
          <div className="font-mono text-[10px]" style={{ color: 'var(--jvto-text-dim)' }}>
            {item.caption}
          </div>
        )}
        {item.description && (
          <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--jvto-text-dim)' }}>
            {item.description}
          </p>
        )}
        {item.sha256 && (
          <div
            className="p-2 rounded-sm"
            style={{ background: '#0a1220', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--jvto-text-dim)' }}>
                SHA-256
              </span>
              <CopyButton text={item.sha256} />
            </div>
            <div
              className="font-mono text-[9px] break-all leading-relaxed"
              style={{ color: '#A3E635', wordBreak: 'break-all' }}
            >
              {item.sha256}
            </div>
          </div>
        )}
        {item.verifiedDate && (
          <div className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Last verified: {item.verifiedDate}
          </div>
        )}
        <div className="flex gap-2 flex-wrap pt-1">
          {item.downloadUrl && (
            <a
              href={item.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider transition-all hover:opacity-80"
              style={{
                background: `${accent}14`,
                border: `1px solid ${accent}40`,
                color: accent,
              }}
            >
              <Download className="w-3 h-3" />
              Download
            </a>
          )}
          {item.url && item.url !== item.downloadUrl && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-mono transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--jvto-text-dim)' }}
            >
              <ExternalLink className="w-3 h-3" />
              View
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function PartnerCard({ partner }: { partner: any }) {
  const tierColor: Record<string, string> = {
    'Professional Association': '#A3E635',
    'NGO · Ecotourism': '#A3E635',
    'Global Verification': '#38BDF8',
    'Review Platform': '#00B67A',
    'OTA Platform': '#F97316',
    'Search Platform': '#4285F4',
  };
  const color = tierColor[partner.tier] ?? '#A3E635';

  return (
    <div
      className="rounded-lg border p-5 flex flex-col gap-3"
      style={{ background: 'var(--jvto-card)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-bold text-sm" style={{ color: 'var(--jvto-white)' }}>{partner.name}</div>
          <div className="font-mono text-[9px] uppercase tracking-wider mt-0.5" style={{ color }}>
            {partner.status}
          </div>
        </div>
        {partner.tier && (
          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded-sm flex-shrink-0"
            style={{ background: `${color}12`, border: `1px solid ${color}30`, color }}
          >
            {partner.tier}
          </span>
        )}
      </div>
      {partner.description && (
        <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--jvto-text-dim)' }}>
          {partner.description}
        </p>
      )}
      {partner.partnerId && (
        <div className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          {partner.partnerId}
        </div>
      )}
      {partner.verifyUrl && (
        <a
          href={partner.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] font-mono transition-all hover:opacity-80"
          style={{ color }}
        >
          <ExternalLink className="w-3 h-3" />
          {partner.verifyLabel ?? 'Verify'}
        </a>
      )}
    </div>
  );
}

function PressCard({ item }: { item: any }) {
  return (
    <div
      className="rounded-lg border p-5 flex flex-col gap-3"
      style={{ background: 'var(--jvto-card)', borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div>
        <div className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: '#F97316' }}>
          {item.publisher} · {item.date}
        </div>
        <h3 className="text-sm font-bold leading-snug" style={{ color: 'var(--jvto-white)' }}>
          {item.title}
        </h3>
        {item.translatedTitle && (
          <div className="text-xs italic mt-1" style={{ color: 'var(--jvto-text-dim)' }}>
            {item.translatedTitle}
          </div>
        )}
      </div>
      {item.quote && (
        <p className="text-xs leading-relaxed" style={{ color: 'var(--jvto-text-dim)' }}>
          {item.quote}
        </p>
      )}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] font-mono transition-all hover:opacity-80"
          style={{ color: '#F97316' }}
        >
          <ExternalLink className="w-3 h-3" />
          Read article
        </a>
      )}
    </div>
  );
}

export default function VerifyJVTO() {
  const [activeSection, setActiveSection] = useState('legal');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const { data: vaultData } = trpc.proofVault.list.useQuery({});
  const { data: partnersData } = trpc.partners.list.useQuery();
  const { data: pressData } = trpc.press.list.useQuery();

  const vault = vaultData ?? [];
  const partners = partnersData ?? [];
  const press = pressData ?? [];

  // Scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const vaultBySection = (section: string) =>
    vault.filter((v: any) => v.category === section.toLowerCase());

  return (
    <GlobalLayout>
      <JsonLd data={JVTO_ORGANIZATION_SCHEMA} />
      <JsonLd data={FOUNDER_SCHEMA} />
      <JsonLd data={MEDICAL_OFFICER_SCHEMA} />
      <JsonLd data={credentialRegistrySchema} />
      <JsonLd data={breadcrumbSchema} />
      <div style={{ background: 'var(--jvto-navy)', minHeight: '100vh' }}>
        {/* Breadcrumb */}
        <div
          className="font-mono text-[11px] px-4 md:px-8 py-3"
          style={{ color: 'var(--jvto-text-dim)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span>javavolcano-touroperator.com</span>
          {' / '}
          <span style={{ color: '#A3E635' }}>verify-jvto</span>
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
            <ShieldCheck className="w-3 h-3" />
            Proof Library · Independently Verifiable
          </div>
          <h1
            className="text-3xl md:text-4xl font-black mb-4 leading-tight"
            style={{ color: 'var(--jvto-white)', letterSpacing: '-0.02em' }}
          >
            Verify JVTO —{' '}
            <em className="not-italic" style={{ color: '#A3E635' }}>Every Claim Has Evidence</em>
          </h1>
          <p className="text-base mb-6 max-w-xl" style={{ color: 'var(--jvto-text)' }}>
            Every document below is downloadable. SHA-256 hashes allow you to verify file integrity independently. No claim on this page is unsubstantiated.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { v: vault.length || '13+', l: 'Verifiable Documents' },
              { v: '5', l: 'Active Licences' },
              { v: press.length || '4', l: 'Press Citations' },
              { v: '7', l: 'Platform Listings' },
            ].map((s) => (
              <div
                key={s.l}
                className="px-4 py-2 rounded-sm font-mono"
                style={{ background: 'var(--jvto-card)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="text-xl font-black" style={{ color: '#A3E635' }}>{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--jvto-text-dim)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex max-w-6xl mx-auto">
          {/* Sticky anchor nav */}
          <nav
            className="hidden md:flex flex-col gap-1 w-44 flex-shrink-0 px-4 py-8 sticky top-16 self-start h-fit"
            style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}
          >
            {SECTIONS.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="flex items-center gap-2 px-3 py-2 rounded-sm text-left font-mono text-[11px] uppercase tracking-wider transition-all"
                style={{
                  background: activeSection === id ? `${color}12` : 'transparent',
                  border: activeSection === id ? `1px solid ${color}30` : '1px solid transparent',
                  color: activeSection === id ? color : 'var(--jvto-text-dim)',
                }}
              >
                <Icon className="w-3 h-3 flex-shrink-0" />
                {label}
              </button>
            ))}
          </nav>

          {/* Main content */}
          <main className="flex-1 px-4 md:px-8 pb-20 min-w-0">

            {/* LEGAL */}
            <section
              id="legal"
              ref={(el) => { sectionRefs.current['legal'] = el; }}
              className="py-10"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-5 h-5" style={{ color: '#A3E635' }} />
                <h2 className="text-xl font-black" style={{ color: 'var(--jvto-white)' }}>Legal</h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ background: 'rgba(163,230,53,0.1)', color: '#A3E635' }}>
                  {vaultBySection('legal').length} documents
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--jvto-text-dim)' }}>
                PT Java Volcano Rendezvous is a legally registered Indonesian company. NIB (Business Identification Number) and TDUP (Tourism Business Licence) are issued by the government OSS system and publicly verifiable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vaultBySection('legal').map((item: any) => <VaultCard key={item.id} item={item} />)}
              </div>
            </section>

            {/* POLICE */}
            <section
              id="police"
              ref={(el) => { sectionRefs.current['police'] = el; }}
              className="py-10"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5" style={{ color: '#38BDF8' }} />
                <h2 className="text-xl font-black" style={{ color: 'var(--jvto-white)' }}>Police</h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ background: 'rgba(56,189,248,0.1)', color: '#38BDF8' }}>
                  {vaultBySection('police').length} documents
                </span>
              </div>
              <div
                className="mb-6 p-4 rounded-sm text-sm leading-relaxed"
                style={{
                  background: 'rgba(56,189,248,0.05)',
                  border: '1px solid rgba(56,189,248,0.15)',
                  borderLeft: '3px solid #38BDF8',
                  color: 'var(--jvto-text-dim)',
                }}
              >
                <strong style={{ color: 'var(--jvto-white)' }}>What Tourist Police means:</strong> Founder Agung Sambuko (Bripka / Mr. Sam) holds an active commission in Ditpamobvit — the Tourist Police unit of the East Java Regional Police (POLDA Jatim). This is a sworn law enforcement role, not a marketing title. The SPRIN documents below are official police assignment letters.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vaultBySection('police').map((item: any) => <VaultCard key={item.id} item={item} />)}
              </div>
            </section>

            {/* HISTORY */}
            <section
              id="history"
              ref={(el) => { sectionRefs.current['history'] = el; }}
              className="py-10"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5" style={{ color: '#F97316' }} />
                <h2 className="text-xl font-black" style={{ color: 'var(--jvto-white)' }}>History</h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ background: 'rgba(249,115,22,0.1)', color: '#F97316' }}>
                  {vaultBySection('history').length} artefacts
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--jvto-text-dim)' }}>
                Third-party artefacts establishing operational history prior to PT incorporation. These are not marketing materials — they are independently published records.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vaultBySection('history').map((item: any) => <VaultCard key={item.id} item={item} />)}
              </div>
            </section>

            {/* CREDENTIALS */}
            <section
              id="credentials"
              ref={(el) => { sectionRefs.current['credentials'] = el; }}
              className="py-10"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-5 h-5" style={{ color: '#A3E635' }} />
                <h2 className="text-xl font-black" style={{ color: 'var(--jvto-white)' }}>Credentials</h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ background: 'rgba(163,230,53,0.1)', color: '#A3E635' }}>
                  {vaultBySection('credentials').length} licences
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--jvto-text-dim)' }}>
                Individual KTA (Kartu Tanda Anggota) licences issued by HPWKI to each certified guide. These cards are the legal requirement for operating at Kawah Ijen.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vaultBySection('credentials').map((item: any) => <VaultCard key={item.id} item={item} />)}
              </div>
            </section>

            {/* PRESS */}
            <section
              id="press"
              ref={(el) => { sectionRefs.current['press'] = el; }}
              className="py-10"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Newspaper className="w-5 h-5" style={{ color: '#F97316' }} />
                <h2 className="text-xl font-black" style={{ color: 'var(--jvto-white)' }}>Press</h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ background: 'rgba(249,115,22,0.1)', color: '#F97316' }}>
                  {press.length} citations
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--jvto-text-dim)' }}>
                Third-party editorial coverage. JVTO had no editorial control over any of these publications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {press.map((item: any) => <PressCard key={item.id} item={item} />)}
              </div>
            </section>

            {/* PARTNERS */}
            <section
              id="partners"
              ref={(el) => { sectionRefs.current['partners'] = el; }}
              className="py-10"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5" style={{ color: '#38BDF8' }} />
                <h2 className="text-xl font-black" style={{ color: 'var(--jvto-white)' }}>Partners</h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ background: 'rgba(56,189,248,0.1)', color: '#38BDF8' }}>
                  {partners.length} verified
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--jvto-text-dim)' }}>
                Each listing below can be verified directly on the partner's platform.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partners.map((p: any) => <PartnerCard key={p.id} partner={p} />)}
              </div>
            </section>

            {/* REPUTATION */}
            <section
              id="reputation"
              ref={(el) => { sectionRefs.current['reputation'] = el; }}
              className="py-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-5 h-5" style={{ color: '#F97316' }} />
                <h2 className="text-xl font-black" style={{ color: 'var(--jvto-white)' }}>Reputation</h2>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--jvto-text-dim)' }}>
                Aggregate scores across all platforms. These are live scores — click to verify. JVTO cannot edit or suppress reviews on any of these platforms.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Trustpilot', score: '4.7', total: '44+', color: '#00B67A', url: 'https://trustpilot.com/review/javavolcano-touroperator.com' },
                  { name: 'TripAdvisor', score: '4.9', total: '112', color: '#34E0A1', url: 'https://www.tripadvisor.com/Attraction_Review-g297715-d19983165-Reviews-Java_Volcano_Tour_Operator-Surabaya_East_Java_Java.html' },
                  { name: 'Google', score: '4.9', total: '60+', color: '#4285F4', url: 'https://www.google.com/maps?cid=1266403973589689021' },
                  { name: 'GetYourGuide', score: '4.9', total: '30+', color: '#FF5533', url: 'https://www.getyourguide.com/java-volcano-tour-operator-s260697/' },
                ].map((r) => (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-2 p-4 rounded-lg transition-all hover:opacity-80"
                    style={{ background: 'var(--jvto-card)', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold" style={{ color: r.color }}>{r.name}</span>
                      <ExternalLink className="w-3 h-3" style={{ color: 'var(--jvto-text-dim)' }} />
                    </div>
                    <div className="text-2xl font-black" style={{ color: 'var(--jvto-white)' }}>
                      {r.score}<span className="text-sm font-normal ml-1" style={{ color: 'var(--jvto-text-dim)' }}>/5</span>
                    </div>
                    <div className="font-mono text-[9px]" style={{ color: 'var(--jvto-text-dim)' }}>
                      {r.total} reviews
                    </div>
                  </a>
                ))}
              </div>

              <div
                className="mt-10 p-6 rounded-lg text-center"
                style={{ background: 'var(--jvto-card)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <BookOpen className="w-8 h-8 mx-auto mb-3" style={{ color: '#A3E635' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--jvto-white)' }}>
                  Satisfied with what you've verified?
                </h3>
                <p className="text-sm mb-5" style={{ color: 'var(--jvto-text-dim)' }}>
                  Every document checks out. Now plan your tour — private, verified, and led by a Tourist Police officer.
                </p>
                <a
                  href="/tours"
                  className="inline-block px-8 py-3 rounded font-bold text-sm text-white"
                  style={{ background: '#F97316' }}
                >
                  Browse our tours
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </GlobalLayout>
  );
}
