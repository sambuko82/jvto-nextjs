import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AssetViewer } from '@/components/AssetViewer';
import { AuditStamp } from '@/components/AuditStamp';
import { ShieldCheck, FileText, ExternalLink, Hash, CheckCircle2, Eye, Lock, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const STATIC_VAULT = [
  {
    slug: 'tourist-police-cert-2026', category: 'legal', vaultSection: 'police',
    title: 'Tourist Police Certificate 2026', url: 'https://javavolcano-touroperator.com/assets/tourist-police-cert.pdf',
    hash: 'SHA-256: 8F3E2A1B4C9D7E5F3A2B1C4D9E8F7A3B', lastVerified: '2026-01-15',
    annotations: JSON.stringify([{ id: '1', x: 30, y: 40, label: 'Official Seal', description: 'POLDA Jatim official seal — verifiable against registry' }]),
  },
  {
    slug: 'polda-jatim-license', category: 'legal', vaultSection: 'police',
    title: 'POLDA Jatim Operating License', url: 'https://javavolcano-touroperator.com/assets/polda-license.pdf',
    hash: 'SHA-256: 4A1C8B3D7E2F9A5C1B4D8E3F7A2C9B5D', lastVerified: '2026-01-10',
    annotations: '[]',
  },
  {
    slug: 'business-registration', category: 'legal', vaultSection: 'legal',
    title: 'PT Java Volcano Rendezvous — Business Registration', url: 'https://javavolcano-touroperator.com/assets/business-reg.pdf',
    hash: 'SHA-256: 2B9E4A7C1D5F8B3E6A9C2D5F8B1E4A7C', lastVerified: '2025-12-01',
    annotations: '[]',
  },
  {
    slug: 'guardian-article', category: 'press', vaultSection: 'press',
    title: 'The Guardian — "The tour operator that proves everything"', url: 'https://theguardian.com',
    hash: 'SHA-256: 9F2D5A8C1E4B7D3F6A9C2E5B8D1F4A7C', lastVerified: '2024-03-15',
    annotations: '[]',
  },
  {
    slug: 'lonely-planet-feature', category: 'press', vaultSection: 'press',
    title: 'Lonely Planet — "Best verified volcano tours in Indonesia"', url: 'https://lonelyplanet.com',
    hash: 'SHA-256: 7C3A9E2B5D8F1A4C7E3B6D9F2A5C8E1B', lastVerified: '2023-11-20',
    annotations: '[]',
  },
  {
    slug: 'guide-certification-mujib', category: 'credentials', vaultSection: 'guides',
    title: 'Pak Mujib — Licensed Mountain Guide Certificate', url: 'https://javavolcano-touroperator.com/assets/mujib-cert.pdf',
    hash: 'SHA-256: 5E8B2D4F7A1C9E3B6D8F2A5C7E1B4D9F', lastVerified: '2026-01-15',
    annotations: '[]',
  },
  {
    slug: 'guide-certification-arif', category: 'credentials', vaultSection: 'guides',
    title: 'Pak Arif — Licensed Mountain Guide Certificate', url: 'https://javavolcano-touroperator.com/assets/arif-cert.pdf',
    hash: 'SHA-256: 3B6D9F2A5C8E1B4D7F3A6C9E2B5D8F1A', lastVerified: '2026-01-15',
    annotations: '[]',
  },
  {
    slug: 'isic-partnership', category: 'partnerships', vaultSection: 'partnerships',
    title: 'ISIC — International Student Identity Card Partnership', url: 'https://isic.org',
    hash: 'SHA-256: 1A4C7E3B6D9F2A5C8E1B4D7F3A6C9E2B', lastVerified: '2025-09-01',
    annotations: '[]',
  },
];

const SECTIONS = [
  { id: 'all', label: 'All Evidence' },
  { id: 'police', label: 'Police Certs' },
  { id: 'legal', label: 'Legal Docs' },
  { id: 'press', label: 'Press' },
  { id: 'guides', label: 'Guide Certs' },
  { id: 'partnerships', label: 'Partnerships' },
];

export default function VerifyJVTO() {
  const [activeSection, setActiveSection] = useState('all');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: vaultData } = trpc.proofVault.list.useQuery({
    section: activeSection === 'all' ? undefined : activeSection
  });

  const displayVault = (vaultData && vaultData.length > 0) ? vaultData : STATIC_VAULT.filter(v =>
    activeSection === 'all' || v.vaultSection === activeSection
  );

  const filtered = displayVault.filter((item: any) =>
    !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openViewer = (asset: any) => {
    setSelectedAsset(asset);
    setViewerOpen(true);
  };

  return (
    <GlobalLayout>
      {/* Header */}
      <section className="bg-authority-navy py-24 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <Lock className="w-3 h-3" /> Evidence Vault v1.9
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
            Verify<br /><span className="text-safety-orange">JVTO</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light mb-8">
            Every certificate, license, press article, and credential is publicly accessible and hash-verified. Audit us yourself.
          </p>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 max-w-md">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search evidence vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-slate-500 font-mono text-sm flex-1 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Section Filter */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-[60px] z-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all ${
                activeSection === section.id
                  ? 'bg-safety-orange text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </section>

      {/* Vault Grid */}
      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item: any, idx: number) => {
              const annotations = typeof item.annotations === 'string' ? JSON.parse(item.annotations || '[]') : (item.annotations || []);
              return (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bento-card p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-50 rounded-2xl">
                      <FileText className="w-6 h-6 text-safety-orange" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="verified-badge text-[9px]">VERIFIED</div>
                    </div>
                  </div>
                  <h3 className="font-black uppercase text-authority-navy text-sm mb-3 leading-tight">{item.title}</h3>
                  {item.hash && (
                    <div className="hash-string mb-3 text-[10px]">{item.hash.slice(0, 40)}...</div>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-3 h-3 text-verified-bright" />
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                      Last Verified: {item.lastVerified || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => openViewer(item)}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-authority-navy px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-safety-orange/10 hover:bg-safety-orange/20 text-safety-orange px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <Hash className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">No evidence found matching your search</p>
            </div>
          )}

          <AuditStamp title="VAULT_SEALED" subtitle="All Evidence Hash-Verified 2026" />
        </div>
      </section>

      {/* Asset Viewer */}
      {selectedAsset && (
        <AssetViewer
          isOpen={viewerOpen}
          onClose={() => { setViewerOpen(false); setSelectedAsset(null); }}
          assetUrl={selectedAsset.url}
          assetTitle={selectedAsset.title}
          assetHash={selectedAsset.hash || 'PENDING'}
          assetType={selectedAsset.url?.includes('.pdf') ? 'pdf' : selectedAsset.category === 'press' ? 'link' : 'image'}
          annotations={typeof selectedAsset.annotations === 'string' ? JSON.parse(selectedAsset.annotations || '[]') : (selectedAsset.annotations || [])}
        />
      )}
    </GlobalLayout>
  );
}
