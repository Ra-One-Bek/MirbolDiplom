import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { IndustryDistributionItem } from '../../types/market.types';
import { formatNumber } from '../../utils/formatNumber';

interface IndustryPieChartProps {
  data: IndustryDistributionItem[];
}

const COLORS = ['#22d3ee', '#8b5cf6', '#10b981', '#f59e0b', '#f472b6', '#38bdf8'];

const IndustryPieChart = ({ data }: IndustryPieChartProps) => {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip
            contentStyle={{
              background: 'rgba(9, 14, 28, 0.92)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '18px',
            }}
            formatter={(value) => [formatNumber(Number(value ?? 0)), 'Компании']}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={78}
            outerRadius={112}
            paddingAngle={4}
            cornerRadius={10}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-3">
        {data.slice(0, 6).map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-slate-200">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-white">
              {formatNumber(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryPieChart;