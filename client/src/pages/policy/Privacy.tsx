import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <GlobalLayout>
      <section className="bg-authority-navy py-20 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <Lock className="w-3 h-3" /> Legal Documentation
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Privacy<br /><span className="text-safety-orange">Policy</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bento-card p-8 md:p-12 space-y-10">
            {[
              {
                title: '1. Information We Collect',
                content: 'We collect information you provide directly to us when booking a tour, including your name, email address, phone number, nationality, and any health information relevant to your participation in our expeditions. We also collect information about your device and how you interact with our website.',
              },
              {
                title: '2. How We Use Your Information',
                content: 'We use the information we collect to process your booking, communicate with you about your tour, ensure your safety during the expedition, comply with legal obligations, and improve our services. We do not sell your personal information to third parties.',
              },
              {
                title: '3. Information Sharing',
                content: 'We may share your information with our certified guides and drivers for the purpose of conducting your tour, with government authorities as required by Indonesian law (including tourist police registration), and with payment processors to complete your transaction.',
              },
              {
                title: '4. Data Retention',
                content: 'We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Booking records are retained for 7 years in accordance with Indonesian tax law. You may request deletion of your personal data at any time by contacting us.',
              },
              {
                title: '5. Security',
                content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
              },
              {
                title: '6. Your Rights',
                content: 'You have the right to access, correct, or delete your personal information. You may also object to the processing of your data or request that we restrict processing. To exercise these rights, contact us at privacy@javavolcano-touroperator.com.',
              },
              {
                title: '7. Contact Us',
                content: 'If you have questions about this Privacy Policy or our data practices, contact us at: PT Java Volcano Rendezvous, Jl. Raya Banyuwangi, East Java, Indonesia. Email: privacy@javavolcano-touroperator.com. WhatsApp: +62 812-3506-1451.',
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h2 className="text-xl font-black uppercase text-authority-navy mb-4">{section.title}</h2>
                <p className="text-slate-600 font-light leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
          <AuditStamp title="POLICY_VERIFIED" subtitle="Privacy Policy Updated 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
