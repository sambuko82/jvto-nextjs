import { ShieldCheck, Globe, Fingerprint, HelpCircle, MessageSquare, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export const Footer = () => {
  return (
    <footer className="bg-authority-navy text-white py-16 md:py-24 relative overflow-hidden">
      <div className="scanline" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-16 md:mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety-orange/10 border border-safety-orange/30 text-safety-orange text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
              <ShieldCheck className="w-3 h-3" /> Ready for Operational Certainty?
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              Still Not Sure About <br />
              <span className="text-safety-orange">Operational Certainty?</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl leading-tight font-light mb-10 md:mb-12">
              Don't leave your safety to chance. Join the elite group of travelers who prioritize verification over marketing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tours">
                <button className="group bg-safety-orange hover:bg-safety-orange/90 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-black uppercase tracking-wider text-xs md:text-sm transition-all shadow-xl shadow-safety-orange/20 flex items-center justify-center gap-3">
                  Browse Private Tours <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/travel-guide/faq">
                <button className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-black uppercase tracking-wider text-xs md:text-sm transition-all flex items-center justify-center gap-3">
                  <HelpCircle className="w-5 h-5" /> Common Questions
                </button>
              </Link>
              <a
                href="https://wa.me/6281235061451"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-black uppercase tracking-wider text-xs md:text-sm transition-all flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-5 h-5" /> Message Us on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-sm lg:max-w-none">
            <div className="bento-card bg-white/5 border-white/10 p-8 md:p-10 backdrop-blur-xl shadow-2xl rotate-0 md:rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="scanline" />
              <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-verified-bright mb-6 md:mb-8" />
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-8">
                  <span className="font-mono text-[10px] md:text-[11px] text-slate-500 uppercase tracking-widest">Entity Status</span>
                  <div className="verified-badge text-[10px] md:text-[11px]">VERIFIED_2026</div>
                </div>
                <div className="flex items-center justify-between gap-8">
                  <span className="font-mono text-[10px] md:text-[11px] text-slate-500 uppercase tracking-widest">Security Level</span>
                  <span className="font-mono text-[10px] md:text-[11px] text-verified-bright uppercase font-black">HIGH_STAKES</span>
                </div>
                <div className="flex items-center justify-between gap-8">
                  <span className="font-mono text-[10px] md:text-[11px] text-slate-500 uppercase tracking-widest">Data Integrity</span>
                  <span className="font-mono text-[10px] md:text-[11px] text-verified-bright uppercase font-black">100%_AUDITED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-slate-500" />
              <span className="font-mono text-[10px] md:text-[11px] text-slate-500 uppercase tracking-widest">SHA-256: 8F3E...9A2B</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-500" />
              <span className="font-mono text-[10px] md:text-[11px] text-slate-500 uppercase tracking-widest">Schema.org Trust Graph Injected</span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="font-mono text-[10px] md:text-[11px] text-slate-300 uppercase tracking-[0.2em] mb-2 italic">
              "Private volcano tours, built on proof."
            </p>
            <p className="font-mono text-[10px] md:text-[11px] text-slate-500 uppercase tracking-[0.2em] mb-2">
              © 2015–2026 PT Java Volcano Rendezvous · Bondowoso, East Java · License No. 1102230032918
            </p>
            <p className="font-mono text-[10px] md:text-[11px] text-slate-500 uppercase tracking-widest">
              Verified Entity // Bureaucratic Chic v1.9
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
