import { ShieldCheck, Globe, Fingerprint, HelpCircle, MessageSquare, ChevronRight, Phone, MapPin, Mail, FileCheck } from 'lucide-react';
import { Link } from 'wouter';

const footerLinks = {
  Tours: [
    { label: 'All Private Tours', path: '/tours' },
    { label: 'From Surabaya', path: '/tours?departure=surabaya' },
    { label: 'From Bali', path: '/tours?departure=bali' },
    { label: 'ISIC Student Discount', path: '/isic' },
  ],
  Destinations: [
    { label: 'Mount Bromo', path: '/destinations/mount-bromo' },
    { label: 'Kawah Ijen', path: '/destinations/ijen-crater' },
    { label: 'Madakaripura Waterfall', path: '/destinations/madakaripura-waterfall' },
    { label: 'Tumpak Sewu', path: '/destinations/tumpak-sewu-waterfall' },
    { label: 'Papuma Beach', path: '/destinations/papuma-beach' },
  ],
  'Why JVTO': [
    { label: 'Why JVTO', path: '/why-jvto' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Our Team', path: '/team' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Verify JVTO', path: '/verify-jvto' },
  ],
  'Travel Info': [
    { label: 'Travel Guide', path: '/travel-guide' },
    { label: 'Ijen Health Screening', path: '/travel-guide/ijen-health-screening' },
    { label: 'Safety on Tours', path: '/travel-guide/safety-on-tours' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Booking Policy', path: '/booking-policy' },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(140deg, #0F172A 0%, #0D1B12 100%)' }}>
      {/* Forensic dot texture */}
      <div className="absolute inset-0 grid-pattern-light pointer-events-none" />
      <div className="scanline" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-16 pb-8">

        {/* Top CTA Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 pb-16 border-b border-white/8">
          <div>
            <div className="kicker kicker-dark mb-6">
              <ShieldCheck className="w-3 h-3" />
              Plan First, Then Decide
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.92] text-white mb-5">
              Read the Rulebook<br />
              <span className="text-safety-orange text-glow">Before You Book.</span>
            </h2>
            <p className="text-white/45 text-base leading-relaxed font-light mb-8 max-w-md">
              Every policy, every credential, every price — transparent before you commit.
              No pressure. No hidden fees. Just operational certainty.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/tours">
                <button className="btn-primary group">
                  Browse All Tours
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/faq">
                <button className="btn-outline-dark">
                  <HelpCircle className="w-4 h-4" />
                  Read the FAQ
                </button>
              </Link>
              <a
                href="https://wa.me/6282244788833?text=Hi%20JVTO%2C%20I%27d%20like%20to%20inquire%20about%20a%20private%20tour."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Card */}
          <div className="forensic-card relative overflow-hidden">
            <div className="scanline" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-safety-orange rounded-lg flex items-center justify-center shadow-orange flex-shrink-0">
                <ShieldCheck className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <div className="font-black uppercase text-white text-sm tracking-tight">Java Volcano Tour Operator</div>
                <div className="font-mono text-[10px] text-white/35 uppercase tracking-[0.12em]">PT Java Volcano Rendezvous</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-safety-orange mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-mono text-[11px] text-white/70">Bondowoso, East Java, Indonesia</div>
                  <div className="font-mono text-[10px] text-white/35">Operating across East Java & Bali</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-safety-orange flex-shrink-0" />
                <a href="https://wa.me/6282244788833" className="font-mono text-[11px] text-white/70 hover:text-safety-orange transition-colors">
                  +62 822-4478-8833 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-safety-orange flex-shrink-0" />
                <a href="mailto:info@javavolcano-touroperator.com" className="font-mono text-[11px] text-white/70 hover:text-safety-orange transition-colors">
                  info@javavolcano-touroperator.com
                </a>
              </div>
              <div className="pt-3 border-t border-white/8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/35 uppercase tracking-[0.12em]">Business License</span>
                  <span className="verified-badge">✓ Active</span>
                </div>
                <div className="font-mono text-[10px] text-white/40">NIB No. 1102230032918 · Verifiable at oss.go.id</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/35 uppercase tracking-[0.12em]">Tourist Police</span>
                  <span className="verified-badge">✓ Active Duty</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/35 uppercase tracking-[0.12em]">Trustpilot</span>
                  <span className="font-mono text-[10px] text-safety-orange font-bold">4.7★ · 44+ Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">{category}</div>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.path}>
                    <Link href={link.path}>
                      <span className="font-mono text-[11px] text-white/45 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.08em]">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Verify Cluster */}
        <div className="flex flex-wrap gap-3 mb-10 pb-8 border-b border-white/8">
          <Link href="/verify-jvto">
            <div className="chip hover:border-safety-orange/40 hover:text-safety-orange cursor-pointer transition-colors">
              <FileCheck className="w-3 h-3" />
              Verify JVTO
            </div>
          </Link>
          <a href="https://oss.go.id" target="_blank" rel="noopener noreferrer" className="chip hover:border-verified-lime/40 hover:text-verified-lime cursor-pointer transition-colors">
            <Globe className="w-3 h-3" />
            oss.go.id
          </a>
          <Link href="/verify-jvto/legal">
            <div className="chip hover:border-white/35 hover:text-white cursor-pointer transition-colors">
              <Fingerprint className="w-3 h-3" />
              SHA-256 Documents
            </div>
          </Link>
          <Link href="/verify-jvto/police-safety">
            <div className="chip hover:border-white/35 hover:text-white cursor-pointer transition-colors">
              <ShieldCheck className="w-3 h-3" />
              Police Safety Cert
            </div>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-safety-orange rounded flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em] italic">
              "Duty First, Business Second." — Anjas Asmara, Founder
            </span>
          </div>
          <div className="text-center md:text-right">
            <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1">
              © 2015–2026 PT Java Volcano Rendezvous · NIB: 1102230032918
            </p>
            <div className="flex items-center justify-center md:justify-end gap-3">
              <Link href="/booking-policy">
                <span className="font-mono text-[10px] text-white/25 hover:text-white/60 uppercase tracking-[0.1em] cursor-pointer transition-colors">Booking Policy</span>
              </Link>
              <span className="text-white/15">·</span>
              <Link href="/privacy-policy">
                <span className="font-mono text-[10px] text-white/25 hover:text-white/60 uppercase tracking-[0.1em] cursor-pointer transition-colors">Privacy Policy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
