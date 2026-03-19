import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { BookOpen, Heart, ShieldCheck, Package, Cloud, Dumbbell, HelpCircle, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const GUIDE_SECTIONS = [
  {
    slug: 'ijen-health-screening',
    icon: Heart,
    title: 'Ijen Health Screening',
    desc: 'Medical requirements, fitness standards, and health conditions that may prevent participation in the Ijen expedition.',
    badge: 'MANDATORY',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/20',
    link: '/travel-guide/ijen-health-screening',
  },
  {
    slug: 'booking-info',
    icon: BookOpen,
    title: 'Booking Information',
    desc: 'How to book, payment methods, deposit requirements, and what to expect after confirming your expedition.',
    badge: 'REQUIRED',
    badgeColor: 'bg-safety-orange/10 text-safety-orange border-safety-orange/20',
    link: '/travel-guide/booking-info',
  },
  {
    slug: 'safety-protocols',
    icon: ShieldCheck,
    title: 'Safety Protocols',
    desc: 'Our comprehensive safety framework: gas mask usage, emergency procedures, weather monitoring, and evacuation plans.',
    badge: 'VERIFIED',
    badgeColor: 'bg-verified-bright/10 text-authority-navy border-verified-bright/20',
    link: '/travel-guide/safety-protocols',
  },
  {
    slug: 'weather-closures',
    icon: Cloud,
    title: 'Weather & Closures',
    desc: 'Real-time closure policies, seasonal conditions, volcanic activity monitoring, and how we handle cancellations.',
    badge: 'LIVE_DATA',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    link: '/travel-guide/weather-closures',
  },
  {
    slug: 'packing-list',
    icon: Package,
    title: 'Packing List',
    desc: 'Exactly what to bring and what not to bring for each destination. Verified by 2,847 expeditions.',
    badge: 'OPTIMIZED',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    link: '/travel-guide/packing-list',
  },
  {
    slug: 'fitness-requirements',
    icon: Dumbbell,
    title: 'Fitness Requirements',
    desc: 'Honest assessment of the physical demands of each route, with preparation recommendations.',
    badge: 'HONEST',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    link: '/travel-guide/fitness-requirements',
  },
  {
    slug: 'faq',
    icon: HelpCircle,
    title: 'FAQ',
    desc: 'Answers to the most common questions from 11 years of running private volcano tours.',
    badge: 'COMPREHENSIVE',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    link: '/travel-guide/faq',
  },
];

export default function TravelGuide() {
  return (
    <GlobalLayout>
      {/* Header — Forensic dark */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(140deg, #0F172A 0%, #0A1628 100%)' }}>
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="kicker kicker-dark mb-6">
            <BookOpen className="w-3 h-3" /> Expedition Intelligence
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8" style={{ letterSpacing: '-0.03em', lineHeight: '0.85' }}>
            Travel<br /><span className="text-safety-orange text-glow">Guide</span>
          </h1>
          <p className="text-white/45 text-xl max-w-2xl font-light">
            Everything you need to know before, during, and after your expedition. No surprises — only intelligence.
          </p>
        </div>
      </section>

      {/* Safety Alert — warning band */}
      <section className="py-5" style={{ background: 'rgba(239,68,68,0.06)', borderBottom: '1px solid rgba(239,68,68,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#EF4444' }} />
          <p className="text-sm font-medium" style={{ color: '#B91C1C' }}>
            <strong>Important:</strong> Read the Health Screening requirements before booking. Certain medical conditions prevent participation in the Ijen expedition.
          </p>
          <Link href="/travel-guide/ijen-health-screening">
            <button className="ml-auto flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] flex items-center gap-1 transition-colors" style={{ color: '#EF4444' }}>
              Read Now <ChevronRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </section>

      {/* Guide Sections — light audit surface */}
      <section className="py-16 md:py-24" style={{ background: '#F4F6F8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDE_SECTIONS.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={section.link}>
                    <div className="p-8 group cursor-pointer h-full flex flex-col rounded-2xl" style={{ background: '#fff', border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 2px 12px rgba(15,23,42,0.06)', transition: 'box-shadow 0.2s, transform 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(15,23,42,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(15,23,42,0.06)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-3 rounded-2xl transition-colors" style={{ background: 'rgba(255,107,53,0.08)' }}>
                          <Icon className="w-6 h-6" style={{ color: '#FF6B35' }} />
                        </div>
                        <span className={`font-mono text-[10px] px-2 py-1 rounded-full border uppercase tracking-widest font-bold ${section.badgeColor}`}>
                          {section.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight mb-3" style={{ color: '#0F172A', letterSpacing: '-0.01em' }}>{section.title}</h3>
                      <p className="text-sm font-light leading-relaxed flex-1" style={{ color: 'rgba(15,23,42,0.5)' }}>{section.desc}</p>
                      <div className="flex items-center gap-2 mt-6 pt-4" style={{ borderTop: '1px solid rgba(15,23,42,0.08)' }}>
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: '#FF6B35' }}>Read Guide</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#FF6B35' }} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <AuditStamp title="GUIDE_VERIFIED" subtitle="All Information Audited 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
