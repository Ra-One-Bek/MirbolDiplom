import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { YearlyTrendItem } from '../../types/market.types';

interface RevenueLineChartProps {
  data: YearlyTrendItem[];
}

const RevenueLineChart = ({ data }: RevenueLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="companiesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="year" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            color: '#fff',
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="companies"
          name="Количество предприятий"
          stroke="#22d3ee"
          strokeWidth={3}
          fill="url(#companiesGradient)"
        />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Выручка"
          stroke="#a78bfa"
          strokeWidth={3}
          fill="url(#revenueGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueLineChart;