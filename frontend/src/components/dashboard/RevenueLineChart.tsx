import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { YearlyTrendItem } from '../../types/market.types';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatNumber } from '../../utils/formatNumber';

interface RevenueLineChartProps {
  data: YearlyTrendItem[];
}

const RevenueLineChart = ({ data }: RevenueLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <ComposedChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
            <stop offset="70%" stopColor="#22d3ee" stopOpacity={0.08} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="left"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatCurrency(Number(value)).replace('₸', '')}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fill: '#64748b', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatNumber(Number(value))}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(9, 14, 28, 0.92)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
          }}
          formatter={(value, name) => {
            const numericValue = Number(value ?? 0);

            return [
              name === 'revenue'
                ? formatCurrency(numericValue)
                : formatNumber(numericValue),
              name === 'revenue' ? 'Выручка' : 'Компании',
            ];
          }}
          labelFormatter={(label) => `Год: ${label}`}
        />

        <Area
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          fill="url(#revenueFill)"
          stroke="none"
        />

        <Line
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          stroke="#22d3ee"
          strokeWidth={4}
          dot={{ r: 0 }}
          activeDot={{
            r: 7,
            strokeWidth: 0,
            fill: '#67e8f9',
          }}
        />

        <Line
          yAxisId="right"
          type="monotone"
          dataKey="companies"
          stroke="#a78bfa"
          strokeWidth={2.5}
          strokeDasharray="5 5"
          dot={{ r: 0 }}
          activeDot={{
            r: 6,
            strokeWidth: 0,
            fill: '#c4b5fd',
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default RevenueLineChart;