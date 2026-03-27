import { useEffect, useMemo, useState } from 'react';
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
  const [error, setError] = useState<string>('');

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
      } catch (err) {
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
      {}
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
    return <div className="text-slate-600">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!stats) {
    return <div className="text-slate-600">Нет данных для отображения</div>;
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Количество предприятий"
          value={formatNumber(stats.totalCompanies)}
          description="Общее число активных субъектов МСБ"
        />
        <StatsCard
          title="Общая выручка"
          value={formatCurrency(stats.totalRevenue)}
          description="Суммарная выручка по рынку"
        />
        <StatsCard
          title="Количество сотрудников"
          value={formatNumber(stats.totalEmployees)}
          description="Общая численность работников"
        />
        <StatsCard
          title="Средний рост"
          value={`${stats.averageGrowth}%`}
          description="Средний темп роста"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Динамика количества предприятий по годам
          </h2>
          <RevenueLineChart data={yearlyTrendData} />
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Распределение по отраслям
          </h2>
          <IndustryPieChart data={industryDistributionData} />
        </Card>
      </section>

      <section>
        <Card>
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Сравнение регионов по количеству предприятий
          </h2>
          <RegionBarChart data={regionStatsData} />
        </Card>
      </section>
    </div>
  );
};

export default DashboardPage;