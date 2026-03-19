import { trpc } from '@/lib/trpc';
import { GlobalLayout } from '@/components/GlobalLayout';
import { Star, ExternalLink, ShieldCheck, MessageCircle } from 'lucide-react';

const PLATFORMS = [
  {
    name: 'Trustpilot',
    score: '4.7',
    label: 'Excellent',
    total: '44+',
    color: '#00B67A',
    url: 'https://trustpilot.com/review/javavolcano-touroperator.com',
    note: 'Reviews cannot be edited or deleted by JVTO',
  },
  {
    name: 'TripAdvisor',
    score: '4.9',
    label: 'Excellent',
    total: '112',
    color: '#34E0A1',
    url: 'https://www.tripadvisor.com/Attraction_Review-g297715-d19983165-Reviews-Java_Volcano_Tour_Operator-Surabaya_East_Java_Java.html',
    note: 'Listing d19983165 · independently verified',
  },
  {
    name: 'Google Maps',
    score: '4.9',
    label: 'Excellent',
    total: '60+',
    color: '#4285F4',
    url: 'https://www.google.com/maps?cid=1266403973589689021',
    note: 'CID 1266403973589689021 · Google-verified',
  },
  {
    name: 'GetYourGuide',
    score: '4.9',
    label: 'Excellent',
    total: '30+',
    color: '#FF5533',
    url: 'https://www.getyourguide.com/java-volcano-tour-operator-s260697/',
    note: 'Supplier s260697 · OTA-verified',
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          style={{ color: i <= rating ? '#F97316' : 'rgba(255,255,255,0.15)', fill: i <= rating ? '#F97316' : 'none' }}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { data: reviewData, isLoading } = trpc.reviews.list.useQuery({ featured: false });
  const reviews = reviewData ?? [];

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
          <span style={{ color: '#A3E635' }}>reviews</span>
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
            Verified · Unedited · Independent
          </div>
          <h1
            className="text-3xl md:text-4xl font-black mb-4 leading-tight"
            style={{ color: 'var(--jvto-white)', letterSpacing: '-0.02em' }}
          >
            Guest Reviews —{' '}
            <em className="not-italic" style={{ color: '#A3E635' }}>Real Names, Real Platforms</em>
          </h1>
          <p className="text-base mb-6 max-w-xl" style={{ color: 'var(--jvto-text)' }}>
            JVTO cannot edit, delete, or suppress reviews on any platform below. Every score is independently maintained. Click any platform to verify directly.
          </p>

          {/* Platform rating cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 p-4 rounded-lg transition-all hover:opacity-80"
                style={{
                  background: 'var(--jvto-card)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  textDecoration: 'none',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase" style={{ color: p.color }}>
                    {p.name}
                  </span>
                  <ExternalLink className="w-3 h-3" style={{ color: 'var(--jvto-text-dim)' }} />
                </div>
                <div className="text-2xl font-black" style={{ color: 'var(--jvto-white)' }}>
                  {p.score}
                  <span className="text-sm font-normal ml-1" style={{ color: 'var(--jvto-text-dim)' }}>/5</span>
                </div>
                <div className="font-mono text-[9px]" style={{ color: 'var(--jvto-text-dim)' }}>
                  {p.total} reviews · {p.label}
                </div>
                <div className="font-mono text-[8px] leading-tight" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {p.note}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Response Policy */}
        <div
          className="max-w-6xl mx-auto px-4 md:px-8 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div
            className="p-4 rounded-sm text-sm leading-relaxed flex gap-3 items-start"
            style={{
              background: 'var(--jvto-card)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderLeft: '3px solid #F97316',
            }}
          >
            <MessageCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#F97316' }} />
            <div>
              <strong style={{ color: 'var(--jvto-white)' }}>Response Policy:</strong>{' '}
              <span style={{ color: 'var(--jvto-text-dim)' }}>
                JVTO responds to all reviews within 48 hours. Negative feedback is investigated internally. We do not offer incentives for positive reviews and do not request review removal from any platform.
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 pb-20">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 rounded-lg animate-pulse" style={{ background: 'var(--jvto-card)' }} />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20" style={{ color: 'var(--jvto-text-dim)' }}>
              No reviews found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((review: any) => {
                const guideNames: string[] = (() => {
                  try { return JSON.parse(review.guideNames || '[]'); } catch { return []; }
                })();

                return (
                  <div
                    key={review.id}
                    className="flex flex-col rounded-lg overflow-hidden border"
                    style={{
                      background: 'var(--jvto-card)',
                      borderColor: 'rgba(255,255,255,0.07)',
                    }}
                  >
                    {/* Crew mention strip */}
                    {review.crewMentionName && review.crewMentionPhoto && (
                      <div
                        className="flex items-center gap-3 px-4 py-3"
                        style={{
                          background: 'rgba(163,230,53,0.05)',
                          borderBottom: '1px solid rgba(163,230,53,0.12)',
                        }}
                      >
                        <img
                          src={review.crewMentionPhoto}
                          alt={review.crewMentionName}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          style={{ border: '1px solid rgba(163,230,53,0.3)' }}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div>
                          <div className="font-mono text-[9px] uppercase tracking-wider" style={{ color: '#A3E635' }}>
                            Guide mentioned
                          </div>
                          <div className="text-xs font-semibold" style={{ color: 'var(--jvto-white)' }}>
                            {review.crewMentionName}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-5 flex flex-col gap-3 flex-1">
                      {/* Rating + author */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <StarRow rating={review.rating ?? 5} />
                          <div className="font-bold text-sm mt-1" style={{ color: 'var(--jvto-white)' }}>
                            {review.author}
                          </div>
                          <div className="font-mono text-[10px]" style={{ color: 'var(--jvto-text-dim)' }}>
                            {review.platform} · {review.date}
                          </div>
                        </div>
                        <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#A3E635' }} />
                      </div>

                      {/* Review text */}
                      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--jvto-text)' }}>
                        "{review.text}"
                      </p>

                      {/* Guide names */}
                      {guideNames.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                          {guideNames.map((g: string) => (
                            <span
                              key={g}
                              className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                              style={{
                                background: 'rgba(163,230,53,0.08)',
                                border: '1px solid rgba(163,230,53,0.2)',
                                color: '#A3E635',
                              }}
                            >
                              Guide: {g}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <a
              href="https://trustpilot.com/review/javavolcano-touroperator.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#00B67A' }}
            >
              <ExternalLink className="w-4 h-4" />
              View all on Trustpilot
            </a>
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g297715-d19983165-Reviews-Java_Volcano_Tour_Operator-Surabaya_East_Java_Java.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-all hover:opacity-90"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--jvto-text)',
              }}
            >
              <ExternalLink className="w-4 h-4" />
              View all on TripAdvisor
            </a>
          </div>
        </main>
      </div>
    </GlobalLayout>
  );
}
