import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { IndustryDistributionItem } from '../../types/market.types';

interface IndustryPieChartProps {
  data: IndustryDistributionItem[];
}

const COLORS = [
  '#22d3ee',
  '#a78bfa',
  '#34d399',
  '#f59e0b',
  '#fb7185',
  '#60a5fa',
  '#f472b6',
  '#818cf8',
];

const IndustryPieChart = ({ data }: IndustryPieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <PieChart>
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            color: '#fff',
          }}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={130}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default IndustryPieChart;