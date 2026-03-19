import { useEffect } from 'react';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';
import { BookingRail } from './BookingRail';
import { Footer } from './Footer';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export const GlobalLayout = ({ children, showFooter = true }: GlobalLayoutProps) => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-audit-white">
      <TopNav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex-1 pt-[60px] pb-32 md:pb-24"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {showFooter && <Footer />}
      <BottomNav />
      <BookingRail />
    </div>
  );
};
