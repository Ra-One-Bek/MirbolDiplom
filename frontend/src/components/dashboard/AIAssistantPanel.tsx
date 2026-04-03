import { motion } from 'framer-motion';
import Card from '../ui/Card';

interface AIAssistantPanelProps {
  summary: string[];
}

const QUICK_ACTIONS = [
  'Показать ключевые тренды',
  'Сравнить регионы',
  'Выделить лидирующую отрасль',
  'Сделать краткий прогноз',
];

const AIAssistantPanel = ({ summary }: AIAssistantPanelProps) => {
  return (
    <Card className="h-full">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-cyan-300">
          🤖
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI-ассистент</h2>
          <p className="text-sm text-slate-400">
            Аналитические выводы и быстрые сценарии
          </p>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-2">
        {QUICK_ACTIONS.map((item, index) => (
          <motion.button
            key={item}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * index }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-slate-900"
          >
            {item}
          </motion.button>
        ))}
      </div>

      <div className="space-y-3">
        {summary.map((item, index) => (
          <motion.div
            key={`${item}-${index}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * index }}
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-4 text-sm leading-6 text-slate-200"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default AIAssistantPanel;