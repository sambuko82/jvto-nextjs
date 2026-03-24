import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { FileText, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const INCLUSIONS = [
  'Private transport (AC vehicle) from pickup point to destination and back',
  'Certified, licensed mountain guide throughout the expedition',
  'Gas masks for all guests (Ijen tours)',
  'All national park and destination entrance fees',
  'Hotel pickup and drop-off (Surabaya or Bali)',
  'Accommodation (multi-day packages only)',
  'Jeep transport at Mount Bromo (Bromo tours)',
  'Waterproof bags (Madakaripura and Tumpak Sewu tours)',
  'Emergency first aid kit and satellite communication device',
  'Real-time weather and volcanic activity monitoring',
];

const EXCLUSIONS = [
  'Meals and beverages (unless specified in package)',
  'Personal travel insurance',
  'Tips for guide and driver (appreciated but not required)',
  'Personal expenses and souvenirs',
  'Accommodation before or after the tour (day tours)',
  'Flights or ferry tickets (unless specified)',
  'Any activity not listed in the itinerary',
];

const CANCELLATION_POLICY = [
  { timeframe: '7+ days before', refund: '100% refund', color: 'text-verified-bright' },
  { timeframe: '48–72 hours before', refund: '75% refund', color: 'text-amber-500' },
  { timeframe: '24–48 hours before', refund: '50% refund', color: 'text-safety-orange' },
  { timeframe: 'Less than 24 hours', refund: 'No refund', color: 'text-red-500' },
  { timeframe: 'JVTO-initiated cancellation', refund: '100% refund', color: 'text-verified-bright' },
];

export default function BookingPolicy() {
  return (
    <GlobalLayout>
      <section className="bg-authority-navy py-20 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <FileText className="w-3 h-3" /> Legal Documentation
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Booking<br /><span className="text-safety-orange">Policy</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">
            Transparent terms. No hidden clauses. Everything you need to know before you book.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {/* Inclusions */}
          <div className="bento-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-verified-bright" />
              <h2 className="text-2xl font-black uppercase text-authority-navy">What's Included</h2>
            </div>
            <div className="space-y-3">
              {INCLUSIONS.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-verified-bright flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div className="bento-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-black uppercase text-authority-navy">What's Not Included</h2>
            </div>
            <div className="space-y-3">
              {EXCLUSIONS.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation */}
          <div className="bento-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-safety-orange" />
              <h2 className="text-2xl font-black uppercase text-authority-navy">Cancellation Policy</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left font-mono text-[11px] text-slate-400 uppercase tracking-widest py-3 pr-6">Cancellation Timeframe</th>
                    <th className="text-left font-mono text-[11px] text-slate-400 uppercase tracking-widest py-3">Refund</th>
                  </tr>
                </thead>
                <tbody>
                  {CANCELLATION_POLICY.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-50">
                      <td className="py-4 pr-6 text-authority-navy font-medium">{row.timeframe}</td>
                      <td className={`py-4 font-black uppercase ${row.color}`}>{row.refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bento-card p-8">
            <h2 className="text-2xl font-black uppercase text-authority-navy mb-6">Payment Terms</h2>
            <div className="space-y-4 text-slate-600 font-light leading-relaxed">
              <p><strong className="text-authority-navy">Deposit:</strong> A 30% deposit is required to confirm your booking. The remaining balance is due on the day of the tour before departure.</p>
              <p><strong className="text-authority-navy">Payment Methods:</strong> Bank transfer (BCA, Mandiri, BNI), PayPal, Wise, and cash (IDR). All prices are quoted in Indonesian Rupiah (IDR).</p>
              <p><strong className="text-authority-navy">Pricing:</strong> All prices are per person for private tours. Group discounts are available for parties of 4 or more — contact us for a custom quote.</p>
              <p><strong className="text-authority-navy">Currency:</strong> Prices are in IDR. For international guests, we recommend using Wise for the best exchange rates.</p>
            </div>
          </div>

          <AuditStamp title="POLICY_VERIFIED" subtitle="Terms Updated 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
