import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATIC_FAQS = [
  { id: '1', category: 'booking', question: 'How do I book a tour?', answer: 'Contact us via WhatsApp at +62 812-3506-1451 or use the booking form on our website. We respond within 2 hours during business hours (7am–9pm WIB).' },
  { id: '2', category: 'booking', question: 'What is the minimum group size?', answer: 'We offer private tours for individuals and groups of any size. There is no minimum group size — we specialize in private, personalized expeditions.' },
  { id: '3', category: 'booking', question: 'How far in advance should I book?', answer: 'We recommend booking at least 3–7 days in advance, especially during peak season (June–August). Last-minute bookings are sometimes possible — contact us to check availability.' },
  { id: '4', category: 'payment', question: 'What payment methods do you accept?', answer: 'We accept bank transfer (BCA, Mandiri, BNI), PayPal, Wise, and cash (IDR). A 30% deposit is required to confirm your booking, with the balance due on the day of the tour.' },
  { id: '5', category: 'payment', question: 'What is your cancellation policy?', answer: 'Free cancellation up to 48 hours before departure. 50% refund for cancellations 24–48 hours before. No refund for cancellations less than 24 hours before departure. Full refund if we cancel due to weather or safety conditions.' },
  { id: '6', category: 'safety', question: 'Is the Ijen blue fire safe to see?', answer: 'Yes, when done with a certified guide and proper equipment. We provide gas masks for all guests. The blue fire is only visible at night (2am–4am), and we monitor volcanic activity before every expedition. If conditions are unsafe, we cancel and refund.' },
  { id: '7', category: 'safety', question: 'What happens if the volcano is closed?', answer: 'We monitor PVMBG (Indonesian Volcanology Agency) alerts daily. If a destination is closed due to volcanic activity, we offer a full refund or reschedule at no extra cost.' },
  { id: '8', category: 'safety', question: 'Are your guides certified?', answer: 'Yes. Every guide is certified by the Indonesian Mountain Guide Association and registered with the East Java Tourist Police (POLDA Jatim). You can verify their credentials in our public audit trail.' },
  { id: '9', category: 'logistics', question: 'What is included in the tour price?', answer: 'Private transport, certified guide, gas masks (for Ijen), entrance fees, and hotel pickup/drop-off from Surabaya or Bali. Accommodation is included in multi-day packages. Meals are not included unless specified.' },
  { id: '10', category: 'logistics', question: 'Can I get picked up from my hotel in Bali?', answer: 'Yes. We offer hotel pickup from anywhere in Bali for our Bali-departure tours. The pickup time depends on the destination — typically 10pm–midnight for Ijen blue fire tours.' },
  { id: '11', category: 'logistics', question: 'What should I wear?', answer: 'Warm layers (0–10°C at crater level), comfortable hiking shoes, long pants, and a windproof jacket. We provide gas masks. See our full packing list for destination-specific recommendations.' },
  { id: '12', category: 'health', question: 'Are there health requirements for the Ijen tour?', answer: 'Yes. Guests with respiratory conditions, heart disease, severe asthma, or who are pregnant should not participate in the Ijen expedition due to sulfuric gas exposure. See our Health Screening page for the full list.' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'booking', label: 'Booking' },
  { id: 'payment', label: 'Payment' },
  { id: 'safety', label: 'Safety' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'health', label: 'Health' },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: faqData } = trpc.faq.list.useQuery();

  const displayFaqs = (faqData && faqData.length > 0) ? faqData : STATIC_FAQS.filter(f =>
    activeCategory === 'all' || f.category === activeCategory
  );

  const filtered = displayFaqs.filter((faq: any) =>
    !searchQuery ||
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <GlobalLayout>
      {/* Header */}
      <section className="bg-authority-navy py-24 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <HelpCircle className="w-3 h-3" /> Intelligence Database
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Frequently<br /><span className="text-safety-orange">Asked</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light mb-8">
            Answers to the most common questions from 11 years of running private volcano tours.
          </p>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 max-w-md">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-slate-500 font-mono text-sm flex-1 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-[60px] z-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all ${
                activeCategory === cat.id
                  ? 'bg-safety-orange text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-3">
            {filtered.map((faq: any, idx: number) => (
              <motion.div
                key={faq.id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="bento-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === (faq.id || String(idx)) ? null : (faq.id || String(idx)))}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-widest flex-shrink-0 ${
                      faq.category === 'safety' ? 'bg-safety-orange/10 text-safety-orange' :
                      faq.category === 'health' ? 'bg-red-500/10 text-red-500' :
                      faq.category === 'booking' ? 'bg-verified-bright/10 text-authority-navy' :
                      'bg-slate-100 text-slate-500'
                    }`}>{faq.category}</span>
                    <span className="font-bold text-authority-navy">{faq.question}</span>
                  </div>
                  {openId === (faq.id || String(idx)) ? (
                    <ChevronUp className="w-5 h-5 text-safety-orange flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                <AnimatePresence>
                  {openId === (faq.id || String(idx)) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-slate-100 pt-4">
                        <p className="text-slate-600 font-light leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">No questions match your search</p>
            </div>
          )}

          <AuditStamp title="FAQ_VERIFIED" subtitle="All Answers Reviewed 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
