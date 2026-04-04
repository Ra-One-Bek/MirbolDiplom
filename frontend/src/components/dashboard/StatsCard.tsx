import { motion } from 'framer-motion';
import Card from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  accent?: 'cyan' | 'emerald' | 'violet' | 'amber';
  icon?: string;
}

const accentMap: Record<NonNullable<StatsCardProps['accent']>, string> = {
  cyan: 'from-cyan-500/20 to-sky-500/5 text-cyan-300',
  emerald: 'from-emerald-500/20 to-green-500/5 text-emerald-300',
  violet: 'from-violet-500/20 to-fuchsia-500/5 text-violet-300',
  amber: 'from-amber-500/20 to-orange-500/5 text-amber-300',
};

const StatsCard = ({
  title,
  value,
  description,
  accent = 'cyan',
  icon = '📊',
}: StatsCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accentMap[accent]} opacity-70`}
        />
        <div className="relative z-10">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-300">{title}</p>
              <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xl">
              {icon}
            </div>
          </div>

          {description ? (
            <p className="text-sm text-slate-300">{description}</p>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;