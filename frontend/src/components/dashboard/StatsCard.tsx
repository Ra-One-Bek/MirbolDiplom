import { motion } from 'framer-motion';
import {
  BarChart3,
  BriefcaseBusiness,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import Card from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  accent?: 'cyan' | 'violet' | 'emerald' | 'amber';
  icon?: 'revenue' | 'companies' | 'growth' | 'employees';
}

const accentMap = {
  cyan: 'from-cyan-400/20 via-cyan-300/10 to-transparent',
  violet: 'from-violet-400/20 via-fuchsia-300/10 to-transparent',
  emerald: 'from-emerald-400/20 via-teal-300/10 to-transparent',
  amber: 'from-amber-300/20 via-orange-300/10 to-transparent',
};

const iconMap = {
  revenue: BarChart3,
  companies: BriefcaseBusiness,
  growth: TrendingUp,
  employees: Users,
};

const StatsCard = ({
  title,
  value,
  description,
  accent = 'cyan',
  icon = 'revenue',
}: StatsCardProps) => {
  const Icon = iconMap[icon];

  return (
    <Card className="min-h-[168px] p-5">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[accent]}`} />
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/8 blur-2xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-300">
            <Sparkles className="h-3.5 w-3.5" />
            Insight
          </div>

          <p className="text-sm text-slate-300">{title}</p>

          <motion.h3
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="text-3xl font-semibold tracking-tight text-white md:text-[2rem]"
          >
            {value}
          </motion.h3>

          {description ? (
            <p className="max-w-[22ch] text-sm leading-6 text-slate-400">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-100 shadow-inner shadow-white/5">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;