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

interface RegionBarChartProps {
  data: RegionStatsItem[];
}

const COLORS = ['#22d3ee', '#38bdf8', '#818cf8', '#a78bfa', '#34d399', '#f59e0b'];

const RegionBarChart = ({ data }: RegionBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="region" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            color: '#fff',
          }}
        />
        <Bar dataKey="companies" radius={[10, 10, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RegionBarChart;