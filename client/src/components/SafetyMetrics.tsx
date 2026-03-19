import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: number;
  history: number[];
}

interface SafetyMetricsProps {
  metrics: Metric[];
  compact?: boolean;
}

export const SafetyMetrics = ({ metrics, compact = false }: SafetyMetricsProps) => {
  return (
    <div className={`space-y-4 ${compact ? 'space-y-2' : ''}`}>
      {metrics.map((metric, idx) => (
        <div key={idx} className={`${compact ? 'p-3' : 'p-6'} bg-slate-50 rounded-2xl border border-slate-100`}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">{metric.label}</span>
            <span className="font-mono text-[11px] text-safety-orange font-black">{metric.value}%</span>
          </div>
          <div className="flex items-end gap-3">
            <div className="flex-1 h-10 relative overflow-hidden rounded-lg bg-white border border-slate-100">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF6321" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#FF6321" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: idx * 0.2 }}
                  d={`M 0 40 ${metric.history.map((val, i) =>
                    `L ${(i / (metric.history.length - 1)) * 100} ${40 - (val / 100) * 35}`
                  ).join(' ')} L 100 40 Z`}
                  fill={`url(#grad-${idx})`}
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: idx * 0.2 }}
                  d={`M 0 ${40 - (metric.history[0] / 100) * 35} ${metric.history.map((val, i) =>
                    `L ${(i / (metric.history.length - 1)) * 100} ${40 - (val / 100) * 35}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#FF6321"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {metric.history.map((val, i) => (
                  <motion.circle
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 + (i * 0.1) }}
                    cx={(i / (metric.history.length - 1)) * 100}
                    cy={40 - (val / 100) * 35}
                    r="1.5"
                    fill="#FF6321"
                  />
                ))}
              </svg>
            </div>
            {!compact && (
              <div className="w-12 h-12 relative flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                  <motion.circle
                    initial={{ strokeDasharray: "0 126" }}
                    animate={{ strokeDasharray: `${(metric.value / 100) * 126} 126` }}
                    transition={{ duration: 2, delay: idx * 0.3 }}
                    cx="24" cy="24" r="20"
                    fill="none" stroke="#FF6321" strokeWidth="3" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="w-3 h-3 text-safety-orange opacity-50" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
