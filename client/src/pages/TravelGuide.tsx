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
      {/* Header */}
      <section className="bg-authority-navy py-24 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
            <BookOpen className="w-3 h-3" /> Expedition Intelligence
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]">
            Travel<br /><span className="text-safety-orange">Guide</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">
            Everything you need to know before, during, and after your expedition. No surprises — only intelligence.
          </p>
        </div>
      </section>

      {/* Safety Alert */}
      <section className="py-6 bg-red-50 border-b border-red-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm font-medium">
            <strong>Important:</strong> Read the Health Screening requirements before booking. Certain medical conditions prevent participation in the Ijen expedition.
          </p>
          <Link href="/travel-guide/ijen-health-screening">
            <button className="ml-auto flex-shrink-0 text-red-500 font-mono text-[11px] uppercase tracking-widest hover:text-red-700 transition-colors flex items-center gap-1">
              Read Now <ChevronRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="py-16 md:py-24 bg-audit-white">
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
                    <div className="bento-card p-8 group cursor-pointer h-full flex flex-col">
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-safety-orange/10 transition-colors">
                          <Icon className="w-6 h-6 text-safety-orange" />
                        </div>
                        <span className={`font-mono text-[10px] px-2 py-1 rounded-full border uppercase tracking-widest font-bold ${section.badgeColor}`}>
                          {section.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-authority-navy mb-3">{section.title}</h3>
                      <p className="text-slate-500 text-sm font-light leading-relaxed flex-1">{section.desc}</p>
                      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
                        <span className="font-mono text-[11px] text-safety-orange uppercase tracking-widest">Read Guide</span>
                        <ChevronRight className="w-4 h-4 text-safety-orange group-hover:translate-x-1 transition-transform" />
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
