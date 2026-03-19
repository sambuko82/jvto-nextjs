import { X, Download, ExternalLink, ShieldCheck, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Annotation {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
}

interface AssetViewerProps {
  isOpen: boolean;
  onClose: () => void;
  assetUrl: string;
  assetTitle: string;
  assetHash: string;
  assetType?: 'image' | 'pdf' | 'link';
  annotations?: Annotation[];
}

export const AssetViewer = ({
  isOpen, onClose, assetUrl, assetTitle, assetHash, assetType = 'image', annotations = []
}: AssetViewerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[300]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-8 z-[301] bg-authority-navy rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-safety-orange" />
                  <span className="font-mono text-[11px] text-safety-orange uppercase tracking-widest">Evidence Viewer</span>
                </div>
                <h3 className="text-xl font-black text-white uppercase">{assetTitle}</h3>
                {assetHash && assetHash !== 'PENDING' && (
                  <div className="flex items-center gap-2 mt-1">
                    <Hash className="w-3 h-3 text-slate-500" />
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest truncate max-w-xs">
                      {assetHash.slice(0, 32)}...
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={assetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href={assetUrl}
                  download
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
              {assetType === 'pdf' ? (
                <iframe
                  src={assetUrl}
                  className="w-full h-full rounded-2xl border border-white/10"
                  title={assetTitle}
                />
              ) : assetType === 'link' ? (
                <div className="text-center">
                  <ExternalLink className="w-16 h-16 text-safety-orange mx-auto mb-6" />
                  <h4 className="text-2xl font-black text-white uppercase mb-4">{assetTitle}</h4>
                  <a
                    href={assetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-safety-orange text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-safety-orange/90 transition-all"
                  >
                    Open External Link <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <div className="relative max-w-4xl w-full">
                  <img
                    src={assetUrl}
                    alt={assetTitle}
                    className="w-full h-auto rounded-2xl border border-white/10 object-contain max-h-[70vh]"
                    referrerPolicy="no-referrer"
                  />
                  {annotations.map((ann) => (
                    <div
                      key={ann.id}
                      className="absolute group"
                      style={{ left: `${ann.x}%`, top: `${ann.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className="w-6 h-6 rounded-full bg-safety-orange border-2 border-white shadow-lg cursor-pointer flex items-center justify-center">
                        <span className="text-white text-[10px] font-black">!</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                        <div className="bg-authority-navy border border-safety-orange/30 rounded-xl p-3 min-w-48 shadow-2xl">
                          <p className="font-mono text-[10px] text-safety-orange uppercase tracking-widest mb-1">{ann.label}</p>
                          <p className="font-mono text-[10px] text-slate-400">{ann.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verification Footer */}
            <div className="p-4 border-t border-white/10 flex items-center gap-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-verified-bright animate-pulse" />
                <span className="font-mono text-[11px] text-verified-bright uppercase tracking-widest">Integrity Verified</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">JVTO Evidence Registry v1.9</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
