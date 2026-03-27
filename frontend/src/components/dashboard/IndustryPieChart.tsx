import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { IndustryDistributionItem } from '../../types/market.types';

interface IndustryPieChartProps {
  data: IndustryDistributionItem[];
}

const COLORS = ['#0f172a', '#334155', '#475569', '#64748b', '#94a3b8'];

const IndustryPieChart = ({ data }: IndustryPieChartProps) => {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndustryPieChart;