import { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, MessageSquare, ArrowRight, Phone, Lock } from 'lucide-react';
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
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-20 md:bottom-6 left-0 right-0 z-[90] pointer-events-none flex justify-center px-4"
        >
          <div
            className="pointer-events-auto w-full max-w-3xl relative overflow-hidden"
            style={{
              background: 'rgba(15,23,42,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,53,0.1)',
            }}
          >
            {/* Scroll Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
              <motion.div
                className="h-full"
                style={{
                  width: `${scrollProgress}%`,
                  background: isReadyToBook
                    ? 'linear-gradient(90deg, #A3E635, #CCFF00)'
                    : '#FF6B35',
                  transition: 'width 0.4s ease, background 0.3s ease',
                }}
              />
            </div>

            {/* Orange glow when ready */}
            {isReadyToBook && (
              <div
                className="absolute inset-0 pointer-events-none rounded-[2rem]"
                style={{ boxShadow: 'inset 0 0 30px rgba(255,107,53,0.06)' }}
              />
            )}

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:px-6">
              {/* Left: Status */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.25)' }}
                  >
                    <ShieldCheck className="w-5 h-5 text-safety-orange" />
                  </div>
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
                    <span
                      className="inline-flex h-1.5 w-1.5 rounded-full"
                      style={{
                        background: isReadyToBook ? '#A3E635' : '#FF6B35',
                        boxShadow: isReadyToBook ? '0 0 6px #A3E635' : '0 0 6px #FF6B35',
                        animation: 'ping 1.5s ease-in-out infinite',
                      }}
                    />
                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.15em]">
                      {isReadyToBook ? 'Ready to Book · WhatsApp Response in Minutes' : '100% Private · No Strangers · Tourist Police-Led'}
                    </span>
                  </div>
                  <div className="text-white font-black text-sm uppercase tracking-tight leading-none">
                    {isReadyToBook ? 'Book Your Private Tour via WhatsApp' : 'Java Volcano Tour Operator'}
                  </div>
                </div>
              </div>

              {/* Right: CTAs */}
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-[0.1em] text-[12px] text-white transition-all group"
                  style={{
                    background: '#FF6B35',
                    boxShadow: '0 0 20px rgba(255,107,53,0.35)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(255,107,53,0.55)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,107,53,0.35)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Book via WhatsApp
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="hidden lg:flex flex-col items-end">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/40 uppercase tracking-[0.1em] mb-0.5">
                    <Lock className="w-3 h-3" />
                    Encrypted Channel
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/35">
                    <Phone className="w-3 h-3" />
                    +62 822-4478-8833
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
