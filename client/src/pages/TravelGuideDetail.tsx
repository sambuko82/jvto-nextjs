import { useParams, Link } from 'wouter';
import { GlobalLayout } from '@/components/GlobalLayout';
import { AuditStamp } from '@/components/AuditStamp';
import { Heart, ShieldCheck, Package, Cloud, Dumbbell, BookOpen, ArrowLeft, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const GUIDE_CONTENT: Record<string, any> = {
  'ijen-health-screening': {
    icon: Heart,
    title: 'Ijen Health Screening',
    badge: 'MANDATORY',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/20',
    intro: 'The Ijen Crater involves exposure to sulfuric gas at high altitude. Certain medical conditions make participation dangerous. Please read this carefully before booking.',
    sections: [
      {
        title: 'Conditions That PREVENT Participation',
        type: 'danger',
        items: [
          'Respiratory conditions: asthma, COPD, emphysema, chronic bronchitis',
          'Cardiovascular conditions: heart disease, recent heart attack, uncontrolled hypertension',
          'Pregnancy (any trimester)',
          'Severe claustrophobia or anxiety disorders',
          'Recent surgery (within 6 weeks)',
          'Epilepsy or seizure disorders',
          'Severe anemia',
        ],
      },
      {
        title: 'Conditions Requiring Medical Clearance',
        type: 'warning',
        items: [
          'Mild asthma (well-controlled)',
          'Diabetes (insulin-dependent)',
          'High blood pressure (controlled by medication)',
          'History of altitude sickness',
          'Recent illness or infection',
        ],
      },
      {
        title: 'Physical Requirements',
        type: 'info',
        items: [
          'Ability to walk 3–4 hours on steep, uneven terrain',
          'Comfortable with heights and exposed ridgelines',
          'Minimum age: 12 years (under 18 requires parent/guardian)',
          'No maximum age — fitness level is the key factor',
        ],
      },
    ],
  },
  'safety-protocols': {
    icon: ShieldCheck,
    title: 'Safety Protocols',
    badge: 'VERIFIED',
    badgeColor: 'bg-verified-bright/10 text-authority-navy border-verified-bright/20',
    intro: 'Our safety framework is built on 11 years of expeditions and zero incidents. Every protocol is documented and publicly verifiable.',
    sections: [
      {
        title: 'Gas Safety (Ijen)',
        type: 'info',
        items: [
          'Gas masks provided for all guests — mandatory to wear at crater',
          'SO2 levels monitored before and during descent',
          'Immediate evacuation protocol if gas levels exceed safe threshold',
          'Guides carry emergency oxygen',
          'No descent into crater if wind direction is unfavorable',
        ],
      },
      {
        title: 'Emergency Procedures',
        type: 'info',
        items: [
          'Satellite communication device carried on all expeditions',
          'First aid kit with AED (automated defibrillator)',
          'Emergency evacuation plan filed with local SAR team',
          'Tourist police emergency contact active throughout tour',
          'Hospital route pre-planned for every destination',
        ],
      },
      {
        title: 'Weather Monitoring',
        type: 'info',
        items: [
          'BMKG (Indonesian Meteorology Agency) alerts checked daily',
          'PVMBG (Volcanology Agency) volcanic activity alerts integrated',
          'Tours cancelled if weather forecast is unsafe — full refund',
          'Real-time weather monitoring during expedition',
        ],
      },
    ],
  },
  'packing-list': {
    icon: Package,
    title: 'Packing List',
    badge: 'OPTIMIZED',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    intro: 'What to bring and what to leave behind. Verified by 2,847 expeditions.',
    sections: [
      {
        title: 'Essential — All Destinations',
        type: 'info',
        items: [
          'Valid passport or ID',
          'Cash (IDR) for personal expenses',
          'Comfortable hiking shoes (closed-toe, ankle support)',
          'Warm jacket or fleece (0–10°C at crater level)',
          'Waterproof layer / rain jacket',
          'Headlamp with fresh batteries',
          'Water bottle (2L minimum)',
          'Sunscreen and sunglasses',
          'Personal medications',
          'Small backpack (20–30L)',
        ],
      },
      {
        title: 'Ijen-Specific',
        type: 'info',
        items: [
          'Warm gloves (temperatures drop to 0°C at crater)',
          'Thermal base layer',
          'Thick socks (2 pairs)',
          'Balaclava or neck gaiter',
          'Gas mask provided — no need to bring your own',
        ],
      },
      {
        title: 'Do NOT Bring',
        type: 'danger',
        items: [
          'Large suitcases or heavy luggage (leave at hotel)',
          'Drones (prohibited in national parks)',
          'Alcohol or drugs',
          'Valuables that cannot be secured',
          'High heels or sandals for hiking',
        ],
      },
    ],
  },
  'fitness-requirements': {
    icon: Dumbbell,
    title: 'Fitness Requirements',
    badge: 'HONEST',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    intro: 'We believe in honest fitness assessments. Here\'s exactly what each destination demands.',
    sections: [
      {
        title: 'Ijen Crater — Challenging',
        type: 'warning',
        items: [
          '6km round trip hike with 500m elevation gain',
          '45-degree slopes in sections',
          'Loose volcanic gravel — unstable footing',
          'Completed in darkness (2am–6am)',
          'Gas mask adds breathing resistance',
          'Preparation: 4–6 weeks of regular cardio recommended',
        ],
      },
      {
        title: 'Mount Bromo — Moderate',
        type: 'info',
        items: [
          'Jeep to viewpoint — short walk to crater rim',
          'Stairs to crater rim (250 steps)',
          'Altitude: 2,329m — mild altitude effects possible',
          'Preparation: Basic fitness sufficient',
        ],
      },
      {
        title: 'Madakaripura Waterfall — Easy',
        type: 'info',
        items: [
          '1km walk through canyon',
          'Wading through shallow water',
          'Slippery rocks — careful footing required',
          'Preparation: No special fitness required',
        ],
      },
      {
        title: 'Tumpak Sewu — Moderate',
        type: 'warning',
        items: [
          'Steep descent on rope-assisted trail',
          'Return climb is physically demanding',
          'Wet and slippery conditions',
          'Preparation: Moderate fitness recommended',
        ],
      },
    ],
  },
  'booking-info': {
    icon: BookOpen,
    title: 'Booking Information',
    badge: 'REQUIRED',
    badgeColor: 'bg-safety-orange/10 text-safety-orange border-safety-orange/20',
    intro: 'How to book, what to expect, and everything you need to know before your expedition.',
    sections: [
      {
        title: 'How to Book',
        type: 'info',
        items: [
          'Contact us via WhatsApp: +62 812-3506-1451',
          'Provide your preferred dates and departure city (Surabaya or Bali)',
          'Specify number of people and any special requirements',
          'We respond within 2 hours (7am–9pm WIB)',
          'Confirm with 30% deposit via bank transfer, PayPal, or Wise',
        ],
      },
      {
        title: 'After Booking',
        type: 'info',
        items: [
          'Confirmation email with full itinerary within 24 hours',
          'Pickup time and location confirmed 48 hours before tour',
          'WhatsApp group created with guide and driver',
          'Weather update sent the evening before departure',
          'Emergency contact numbers provided',
        ],
      },
      {
        title: 'What to Expect on the Day',
        type: 'info',
        items: [
          'Guide and driver will contact you 1 hour before pickup',
          'All equipment provided at trailhead',
          'Safety briefing before every expedition',
          'Guide stays with you throughout — no solo sections',
          'Flexible pace — we go at your speed',
        ],
      },
    ],
  },
  'weather-closures': {
    icon: Cloud,
    title: 'Weather & Closures',
    badge: 'LIVE_DATA',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    intro: 'We monitor conditions in real-time and enforce closures without hesitation. Your safety is non-negotiable.',
    sections: [
      {
        title: 'Closure Triggers',
        type: 'danger',
        items: [
          'Volcanic activity alert Level 2+ (PVMBG)',
          'Heavy rain forecast (>50mm/24h)',
          'Wind speed >40km/h at crater level',
          'Visibility <100m',
          'Flash flood warning in canyon areas',
          'Government-mandated closures',
        ],
      },
      {
        title: 'Seasonal Conditions',
        type: 'info',
        items: [
          'Best season: May–October (dry season)',
          'Rainy season: November–April (some closures)',
          'Peak season: June–August (book 2–4 weeks ahead)',
          'Ijen blue fire: Year-round but best visibility in dry season',
          'Bromo: Year-round but avoid rainy season for best views',
        ],
      },
      {
        title: 'Cancellation Due to Weather',
        type: 'info',
        items: [
          'Full refund if JVTO cancels due to weather or safety',
          'Free reschedule to next available date',
          'We notify you as early as possible — usually 24–48 hours',
          'If cancelled on the day, refund processed within 3 business days',
        ],
      },
    ],
  },
};

export default function TravelGuideDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || '';
  const content = GUIDE_CONTENT[slug];

  if (!content) {
    return (
      <GlobalLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-black text-authority-navy uppercase mb-4">Guide Section Not Found</h2>
            <Link href="/travel-guide">
              <button className="flex items-center gap-2 text-safety-orange font-mono text-[11px] uppercase tracking-widest mx-auto">
                <ArrowLeft className="w-4 h-4" /> Back to Travel Guide
              </button>
            </Link>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  const Icon = content.icon;

  return (
    <GlobalLayout>
      <section className="bg-authority-navy py-20 relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link href="/travel-guide">
            <button className="flex items-center gap-2 text-white/60 font-mono text-[11px] uppercase tracking-widest mb-8 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Travel Guide
            </button>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-safety-orange/10 rounded-2xl">
              <Icon className="w-8 h-8 text-safety-orange" />
            </div>
            <span className={`font-mono text-[10px] px-3 py-1 rounded-full border uppercase tracking-widest font-bold ${content.badgeColor}`}>
              {content.badge}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">{content.title}</h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">{content.intro}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-audit-white">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {content.sections.map((section: any, idx: number) => (
            <div key={idx} className={`bento-card p-8 ${
              section.type === 'danger' ? 'border-red-200' :
              section.type === 'warning' ? 'border-amber-200' : ''
            }`}>
              <div className="flex items-center gap-3 mb-6">
                {section.type === 'danger' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                {section.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {section.type === 'info' && <CheckCircle2 className="w-5 h-5 text-verified-bright" />}
                <h2 className="text-xl font-black uppercase text-authority-navy">{section.title}</h2>
              </div>
              <div className="space-y-3">
                {section.items.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    {section.type === 'danger' ? (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : section.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-verified-bright flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-slate-600 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <AuditStamp title="GUIDE_VERIFIED" subtitle="Information Reviewed 2026" />
        </div>
      </section>
    </GlobalLayout>
  );
}
