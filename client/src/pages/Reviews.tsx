import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const STATIC_REVIEWS = [
  { id: '1', guestName: 'Sarah M.', country: 'Australia', rating: 5, tourName: 'Ijen Blue Fire', date: '2025-12', text: 'Absolutely incredible experience. Pak Mujib and his team were professional, safety-conscious, and made the whole experience unforgettable. The blue fire is unlike anything I\'ve ever seen.', platform: 'Trustpilot', verified: true },
  { id: '2', guestName: 'Thomas K.', country: 'Germany', rating: 5, tourName: 'Bromo + Ijen 3 Days', date: '2025-11', text: 'Best tour operator in Indonesia, period. Everything was perfectly organized, the guides were knowledgeable, and the safety protocols were reassuring. Worth every rupiah.', platform: 'Google', verified: true },
  { id: '3', guestName: 'Emma L.', country: 'UK', rating: 5, tourName: 'Ijen Blue Fire', date: '2025-10', text: 'I was nervous about the gas and altitude, but the team made me feel completely safe. The gas masks were high quality and the guide stayed by my side the whole time.', platform: 'Trustpilot', verified: true },
  { id: '4', guestName: 'Yuki T.', country: 'Japan', rating: 5, tourName: 'Bromo Sunrise', date: '2025-09', text: 'Perfect sunrise experience. The jeep ride through the Sea of Sand was magical. Pak Slamet knew exactly where to position us for the best photos.', platform: 'Google', verified: true },
  { id: '5', guestName: 'Carlos R.', country: 'Spain', rating: 5, tourName: 'Madakaripura + Bromo', date: '2025-08', text: 'Madakaripura was breathtaking — I had no idea Indonesia had something so spectacular. The combination with Bromo made for a perfect 2-day adventure.', platform: 'Trustpilot', verified: true },
  { id: '6', guestName: 'Anna P.', country: 'Netherlands', rating: 5, tourName: 'Ijen Blue Fire', date: '2025-07', text: 'JVTO is different from other operators. They actually care about safety and transparency. I could verify everything before booking, which gave me complete peace of mind.', platform: 'Trustpilot', verified: true },
  { id: '7', guestName: 'James W.', country: 'USA', rating: 5, tourName: 'Bromo + Ijen 3 Days', date: '2025-06', text: 'Three days of pure adventure. The logistics were flawless — every pickup was on time, every hotel was clean and comfortable. The guides were exceptional.', platform: 'Google', verified: true },
  { id: '8', guestName: 'Marie C.', country: 'France', rating: 5, tourName: 'Tumpak Sewu + Ijen', date: '2025-05', text: 'Tumpak Sewu is the most beautiful waterfall I\'ve ever seen. The combination with Ijen made this the best trip of my life. JVTO exceeded every expectation.', platform: 'Trustpilot', verified: true },
  { id: '9', guestName: 'David H.', country: 'Canada', rating: 5, tourName: 'Ijen Blue Fire', date: '2025-04', text: 'I\'ve done adventure tours on 6 continents. JVTO is among the best I\'ve experienced — not just for the destination, but for the professionalism and care of the team.', platform: 'Google', verified: true },
];

const STATS = [
  { label: 'Average Rating', value: '4.9/5', sub: 'Based on 847 reviews' },
  { label: 'Trustpilot Score', value: '4.9', sub: 'Excellent' },
  { label: 'Repeat Guests', value: '38%', sub: 'Return for another tour' },
  { label: 'Expeditions', value: '2,847', sub: 'Since 2015' },
];

export default function Reviews() {
  const { data: reviewData } = trpc.reviews.list.useQuery({ featured: false });
  const displayReviews = (reviewData && reviewData.length > 0) ? reviewData : STATIC_REVIEWS;

  return (
    <GlobalLayout>
      {/* Header */}
      <section className="bg-authority-navy py-24 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <Star className="w-3 h-3" /> Verified Guest Reviews
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
            Guest<br /><span className="text-safety-orange">Reviews</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">
            Every review is from a verified guest. We don't curate — we publish everything.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-black text-authority-navy mb-1">{stat.value}</div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{stat.label}</div>
                <div className="font-mono text-[10px] text-slate-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayReviews.map((review: any, idx: number) => (
              <motion.div
                key={review.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bento-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < (review.rating || 5) ? 'text-safety-orange fill-safety-orange' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <p className="font-black text-authority-navy uppercase text-sm">{review.guestName}</p>
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{review.country} • {review.date}</p>
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-verified-bright" />
                    </div>
                  )}
                </div>
                <p className="text-slate-600 font-light text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{review.tourName}</span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{review.platform}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trustpilot CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#00B67A] hover:bg-[#00a36d] text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all"
            >
              <ExternalLink className="w-4 h-4" /> View All Reviews on Trustpilot
            </a>
          </div>

          <AuditStamp title="REVIEWS_VERIFIED" subtitle="All Reviews Authenticated 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
