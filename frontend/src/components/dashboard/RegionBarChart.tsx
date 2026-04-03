import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { RegionStatsItem } from '../../types/market.types';
import { formatNumber } from '../../utils/formatNumber';

interface RegionBarChartProps {
  data: RegionStatsItem[];
}

const RegionBarChart = ({ data }: RegionBarChartProps) => {
  const topData = [...data]
    .sort((a, b) => b.companies - a.companies)
    .slice(0, 8);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={topData} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="barGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.95} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis
          dataKey="region"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatNumber(Number(value))}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(9, 14, 28, 0.92)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px',
          }}
          formatter={(value) => [formatNumber(Number(value ?? 0)), 'Компании']}
        />
        <Bar dataKey="companies" radius={[14, 14, 6, 6]} barSize={34}>
          {topData.map((item) => (
            <Cell key={item.region} fill="url(#barGlow)" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RegionBarChart;