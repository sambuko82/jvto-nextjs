import { ShieldCheck, Globe, Fingerprint, HelpCircle, MessageSquare, ChevronRight, Phone, MapPin, Mail } from 'lucide-react';
import { Link } from 'wouter';

const footerLinks = {
  Tours: [
    { label: 'All Private Tours', path: '/tours' },
    { label: 'Tours from Surabaya', path: '/tours?from=surabaya' },
    { label: 'Tours from Bali', path: '/tours?from=bali' },
    { label: 'ISIC Student Discount', path: '/isic' },
  ],
  Destinations: [
    { label: 'Mount Bromo', path: '/destinations/mount-bromo' },
    { label: 'Kawah Ijen', path: '/destinations/ijen-crater' },
    { label: 'Madakaripura Waterfall', path: '/destinations/madakaripura-waterfall' },
    { label: 'Tumpak Sewu', path: '/destinations/tumpak-sewu' },
  ],
  'Why JVTO': [
    { label: 'Why JVTO', path: '/why-jvto' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Our Crew', path: '/team' },
    { label: 'Verify JVTO', path: '/verify-jvto' },
  ],
  'Travel Info': [
    { label: 'Travel Guide', path: '/travel-guide' },
    { label: 'Health Screening (Ijen)', path: '/travel-guide/ijen-health-screening' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Booking Policy', path: '/booking-policy' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-authority-navy text-white pt-16 md:pt-24 pb-8 relative overflow-hidden">
      <div className="scanline" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top CTA Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-20 pb-16 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
              <ShieldCheck className="w-3 h-3" /> Plan First, Then Decide
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              Read the Rulebook<br />
              <span className="text-safety-orange">Before You Book.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-light mb-8">
              Every policy, every credential, every price — transparent before you commit.
              No pressure. No hidden fees. Just operational certainty.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/tours">
                <button className="group bg-safety-orange hover:bg-safety-orange/90 text-white px-7 py-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all shadow-xl shadow-safety-orange/20 flex items-center justify-center gap-2">
                  Browse All Tours <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/faq">
                <button className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white px-7 py-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2">
                  <HelpCircle className="w-4 h-4" /> Read the FAQ
                </button>
              </Link>
              <a
                href="https://wa.me/6282244788833"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white px-7 py-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bento-card bg-white/5 border-white/10 p-8 backdrop-blur-xl">
            <div className="scanline" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-safety-orange rounded-lg">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-black uppercase text-white text-sm">Java Volcano Tour Operator</div>
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">PT Java Volcano Rendezvous</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-safety-orange mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-mono text-[11px] text-slate-300">Bondowoso, East Java, Indonesia</div>
                  <div className="font-mono text-[10px] text-slate-500">Operating across East Java & Bali</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-safety-orange flex-shrink-0" />
                <a href="https://wa.me/6282244788833" className="font-mono text-[11px] text-slate-300 hover:text-safety-orange transition-colors">
                  +62 822-4478-8833 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-safety-orange flex-shrink-0" />
                <a href="mailto:info@javavolcano-touroperator.com" className="font-mono text-[11px] text-slate-300 hover:text-safety-orange transition-colors">
                  info@javavolcano-touroperator.com
                </a>
              </div>
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Business License</span>
                  <span className="font-mono text-[10px] text-verified-bright font-black">ACTIVE</span>
                </div>
                <div className="font-mono text-[10px] text-slate-400">NIB No. 1102230032918 · Verifiable at oss.go.id</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Tourist Police</span>
                <span className="font-mono text-[10px] text-verified-bright font-black">ACTIVE DUTY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Trustpilot</span>
                <span className="font-mono text-[10px] text-safety-orange font-black">4.7★ · 44+ Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.path}>
                    <Link href={link.path}>
                      <span className="font-mono text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer uppercase tracking-wide">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-slate-500" />
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">SHA-256 Verified Documents</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-500" />
              <a href="https://oss.go.id" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors">
                Verify at oss.go.id
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-1 italic">
              "Duty First, Business Second."
            </p>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.15em] mb-1">
              © 2015–2026 PT Java Volcano Rendezvous · NIB: 1102230032918
            </p>
            <div className="flex items-center justify-center md:justify-end gap-3 mt-2">
              <Link href="/booking-policy">
                <span className="font-mono text-[10px] text-slate-600 hover:text-slate-400 uppercase tracking-widest cursor-pointer transition-colors">Booking Policy</span>
              </Link>
              <span className="text-slate-700">·</span>
              <Link href="/privacy-policy">
                <span className="font-mono text-[10px] text-slate-600 hover:text-slate-400 uppercase tracking-widest cursor-pointer transition-colors">Privacy Policy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
