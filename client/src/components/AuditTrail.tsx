import { X, ShieldCheck, Clock, User, FileText, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuditLog {
  timestamp: string;
  action: string;
  actor: string;
  status: 'verified' | 'pending' | 'flagged';
  details?: string;
}

interface AuditTrailProps {
  entityId: string;
  entityName: string;
  logs: AuditLog[];
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  verified: { color: 'text-verified-bright', bg: 'bg-verified-bright/10', icon: ShieldCheck },
  pending: { color: 'text-amber-400', bg: 'bg-amber-400/10', icon: Clock },
  flagged: { color: 'text-red-400', bg: 'bg-red-400/10', icon: AlertTriangle },
};

export const AuditTrail = ({ entityId, entityName, logs, isOpen, onClose }: AuditTrailProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-authority-navy z-[201] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-safety-orange" />
                    <span className="font-mono text-[11px] text-safety-orange uppercase tracking-widest">Audit Trail</span>
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase">{entityName}</h2>
                  <p className="font-mono text-[11px] text-slate-500 uppercase tracking-widest mt-1">ID: {entityId}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {logs.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">No audit logs available</p>
                  </div>
                ) : (
                  logs.map((log, idx) => {
                    const config = statusConfig[log.status];
                    const Icon = config.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-4 bg-white/5 rounded-2xl border border-white/10"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${config.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-mono text-[11px] text-white font-bold uppercase tracking-widest truncate">
                                {log.action}
                              </span>
                              <span className={`font-mono text-[10px] uppercase tracking-widest flex-shrink-0 ${config.color}`}>
                                {log.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span className="font-mono text-[10px]">{log.actor}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span className="font-mono text-[10px]">{log.timestamp}</span>
                              </div>
                            </div>
                            {log.details && (
                              <p className="mt-2 font-mono text-[10px] text-slate-400 leading-relaxed">{log.details}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
