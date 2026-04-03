import { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, Sparkles } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import RevenueLineChart from '../components/dashboard/RevenueLineChart';
import IndustryPieChart from '../components/dashboard/IndustryPieChart';
import RegionBarChart from '../components/dashboard/RegionBarChart';
import Card from '../components/ui/Card';
import { marketService } from '../services/api/market.service';
import type {
  DashboardStats,
  IndustryDistributionItem,
  MarketDataItem,
  RegionStatsItem,
  YearlyTrendItem,
} from '../types/market.types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatNumber } from '../utils/formatNumber';

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [marketData, setMarketData] = useState<MarketDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError('');
        const [statsResponse, marketResponse] = await Promise.all([
          marketService.getDashboardStats(),
          marketService.getAllMarketData(),
        ]);
        setStats(statsResponse);
        setMarketData(marketResponse);
      } catch {
        setError('Не удалось загрузить данные дашборда');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchDashboardData();
  }, []);

  const yearlyTrendData: YearlyTrendItem[] = useMemo(() => {
    const groupedByYear = marketData.reduce<Record<number, YearlyTrendItem>>(
      (acc, item) => {
        if (!acc[item.year]) {
          acc[item.year] = {
            year: item.year,
            companies: 0,
            revenue: 0,
          };
        }

        acc[item.year].companies += item.companyCount;
        acc[item.year].revenue += item.revenue;
        return acc;
      },
      {},
    );

    return Object.values(groupedByYear).sort((a, b) => a.year - b.year);
  }, [marketData]);

  const industryDistributionData: IndustryDistributionItem[] = useMemo(() => {
    const groupedByIndustry = marketData.reduce<Record<string, number>>((acc, item) => {
      acc[item.industry] = (acc[item.industry] ?? 0) + item.companyCount;
      return acc;
    }, {});

    return Object.entries(groupedByIndustry).map(([name, value]) => ({
      name,
      value,
    }));
  }, [marketData]);

  const regionStatsData: RegionStatsItem[] = useMemo(() => {
    const groupedByRegion = marketData.reduce<Record<string, number>>((acc, item) => {
      acc[item.region] = (acc[item.region] ?? 0) + item.companyCount;
      return acc;
    }, {});

    return Object.entries(groupedByRegion).map(([region, companies]) => ({
      region,
      companies,
    }));
  }, [marketData]);

  if (isLoading) {
    return <div className="p-6 text-slate-300">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="p-6 text-rose-300">{error}</div>;
  }

  if (!stats) {
    return <div className="p-6 text-slate-300">Нет данных для отображения</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card className="p-6 md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Neo Analytics
            </div>
            <h1 className="text-2xl font-semibold text-white md:text-4xl">
              Dashboard рынка МСБ
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Более живой, cinematic и удобный обзор ключевых показателей.
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/8 text-cyan-200">
            <LayoutDashboard className="h-6 w-6" />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Всего компаний"
          value={formatNumber(stats.totalCompanies)}
          description="Текущее количество предприятий в системе"
          accent="cyan"
          icon="companies"
        />
        <StatsCard
          title="Суммарная выручка"
          value={formatCurrency(stats.totalRevenue)}
          description="Общий финансовый объем по рынку"
          accent="violet"
          icon="revenue"
        />
        <StatsCard
          title="Всего сотрудников"
          value={formatNumber(stats.totalEmployees)}
          description="Общее количество занятых сотрудников"
          accent="emerald"
          icon="employees"
        />
        <StatsCard
          title="Средний рост"
          value={`${stats.averageGrowth}%`}
          description="Средняя динамика развития сегмента"
          accent="amber"
          icon="growth"
        />
      </div>

      <Card className="p-5 md:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-white">
            Динамика количества предприятий и выручки
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Главный тренд по годам с двойной осью и мягким glow-эффектом.
          </p>
        </div>
        <RevenueLineChart data={yearlyTrendData} />
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-5 md:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              Распределение по отраслям
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Donut-визуализация с более мягким и современным видом.
            </p>
          </div>
          <IndustryPieChart data={industryDistributionData} />
        </Card>

        <Card className="p-5 md:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              Топ регионов по количеству предприятий
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Обновленный bar chart с более объемным визуальным акцентом.
            </p>
          </div>
          <RegionBarChart data={regionStatsData} />
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;