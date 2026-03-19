import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { GraduationCap, CheckCircle2, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ISIC_PACKAGES = [
  {
    name: 'Ijen Blue Fire — Student Rate',
    originalPrice: 750000,
    studentPrice: 600000,
    discount: '20% off',
    duration: '1 Day / 1 Night',
    departure: 'Surabaya',
    highlights: ['Blue fire phenomenon', 'Gas mask provided', 'Private guide', 'Hotel pickup'],
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=80',
  },
  {
    name: 'Bromo Sunrise — Student Rate',
    originalPrice: 650000,
    studentPrice: 520000,
    discount: '20% off',
    duration: '1 Day',
    departure: 'Surabaya',
    highlights: ['Penanjakan sunrise', 'Sea of Sand jeep', 'Private guide', 'Hotel pickup'],
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80',
  },
  {
    name: 'Bromo + Ijen Combo — Student Rate',
    originalPrice: 1800000,
    studentPrice: 1440000,
    discount: '20% off',
    duration: '3 Days / 2 Nights',
    departure: 'Surabaya',
    highlights: ['Bromo sunrise', 'Ijen blue fire', 'All accommodations', 'Private guide'],
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80',
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

export default function ISIC() {
  return (
    <GlobalLayout>
      {/* Header */}
      <section className="bg-authority-navy py-24 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <GraduationCap className="w-3 h-3" /> ISIC Partner
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
            Student<br /><span className="text-safety-orange">Packages</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light mb-8">
            JVTO is an official ISIC (International Student Identity Card) partner. Present your valid ISIC card and receive 20% off all tours.
          </p>
          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl max-w-md">
            <div className="p-3 bg-safety-orange/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-safety-orange" />
            </div>
            <div>
              <p className="font-black text-white uppercase text-sm">Official ISIC Partner</p>
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Verified Partnership — See Proof Vault</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black uppercase text-authority-navy mb-10 text-center">How to Claim Your Discount</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Get Your ISIC Card', desc: 'Obtain an International Student Identity Card from your university or isic.org. It must be valid at the time of your tour.' },
              { step: '02', title: 'Book Your Tour', desc: 'Contact us via WhatsApp and mention you have an ISIC card. We\'ll apply the 20% student discount to your booking.' },
              { step: '03', title: 'Show Your Card', desc: 'Present your physical ISIC card at the start of your tour. Digital cards are also accepted.' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bento-card p-8"
              >
                <div className="text-6xl font-black text-slate-100 mb-4">{step.step}</div>
                <h3 className="font-black uppercase text-authority-navy text-xl mb-3">{step.title}</h3>
                <p className="text-slate-500 font-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black uppercase text-authority-navy mb-10 text-center">Student-Priced Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ISIC_PACKAGES.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bento-card overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-authority-navy/80 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-safety-orange text-white font-black text-sm px-3 py-1 rounded-full">{pkg.discount}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-black uppercase text-authority-navy text-lg mb-4">{pkg.name}</h3>
                  <div className="space-y-2 mb-6">
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-verified-bright flex-shrink-0" />
                        <span className="text-slate-600 text-sm font-light">{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                    <div>
                      <div className="font-mono text-[10px] text-slate-400 uppercase line-through">{formatPrice(pkg.originalPrice)}</div>
                      <div className="font-black text-authority-navy text-2xl">{formatPrice(pkg.studentPrice)}</div>
                      <div className="font-mono text-[10px] text-safety-orange uppercase tracking-widest">ISIC Price / person</div>
                    </div>
                    <a
                      href={`https://wa.me/6281235061451?text=${encodeURIComponent(`I have an ISIC card and would like to book: ${pkg.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 bg-safety-orange hover:bg-safety-orange/90 text-white px-4 py-2 rounded-xl font-black uppercase text-sm transition-all"
                    >
                      Book <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terms */}
          <div className="mt-12 bento-card p-8">
            <h3 className="font-black uppercase text-authority-navy text-xl mb-4">Terms & Conditions</h3>
            <div className="space-y-2">
              {[
                'Valid ISIC card must be presented at the start of the tour.',
                'Discount applies to the tour price only, not to additional services.',
                'Cannot be combined with other discounts or promotions.',
                'One discount per ISIC card per booking.',
                'ISIC card must be valid on the date of the tour.',
                'JVTO reserves the right to verify ISIC card authenticity.',
              ].map((term, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 font-light text-sm">{term}</span>
                </div>
              ))}
            </div>
          </div>

          <AuditStamp title="ISIC_VERIFIED" subtitle="Partnership Active 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
