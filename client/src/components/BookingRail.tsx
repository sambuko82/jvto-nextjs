import { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, MessageSquare, ArrowRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BookingRail = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsVisible(scrollY > 400);
      const progress = Math.min(100, Math.round((scrollY / (documentHeight - windowHeight)) * 100));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hi JVTO, I'd like to book a private volcano tour. Please send me the available dates and pricing."
  );
  const whatsappUrl = `https://wa.me/6282244788833?text=${whatsappMessage}`;

  const isReadyToBook = scrollProgress > 60;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 md:bottom-8 left-0 right-0 z-[90] pointer-events-none flex justify-center px-4 md:px-6"
        >
          <div className="pointer-events-auto w-full max-w-4xl bg-authority-navy/97 backdrop-blur-xl border border-white/10 p-4 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
            {/* Progress Bar */}
            <div
              className="absolute top-0 left-0 h-[2px] bg-verified-bright transition-all duration-500"
              style={{ width: `${scrollProgress}%` }}
            />

            {/* Left: Status */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="hidden sm:flex p-3 bg-safety-orange/10 rounded-full text-safety-orange relative">
                <ShieldCheck className="w-5 h-5" />
                {isReadyToBook && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <CheckCircle2 className="w-4 h-4 text-verified-bright" />
                  </motion.div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`flex h-2 w-2 rounded-full ${isReadyToBook ? 'bg-verified-bright' : 'bg-safety-orange'} animate-pulse`} />
                  <span className="font-mono text-[10px] text-white/60 font-bold uppercase tracking-widest">
                    {!isReadyToBook ? '100% Private Tours — No Strangers' : 'Ready to Book — WhatsApp Response in Minutes'}
                  </span>
                </div>
                <h4 className="text-white font-black text-sm md:text-base uppercase leading-none">
                  {!isReadyToBook ? 'Java Volcano Tour Operator' : 'Book Your Private Tour via WhatsApp'}
                </h4>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-2xl md:rounded-full font-black uppercase tracking-tight transition-all group shadow-lg text-sm bg-safety-orange hover:bg-safety-orange/90 text-white shadow-safety-orange/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book via WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="hidden lg:flex flex-col items-end mr-2">
                <div className="flex items-center gap-1.5 text-white/50 font-mono text-[10px] uppercase tracking-widest mb-0.5">
                  <Phone className="w-3 h-3" /> +62 822-4478-8833
                </div>
                <span className="text-white/40 font-mono text-[10px]">NIB: 1102230032918</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
