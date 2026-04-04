import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import RevenueLineChart from '../components/dashboard/RevenueLineChart';
import IndustryPieChart from '../components/dashboard/IndustryPieChart';
import RegionBarChart from '../components/dashboard/RegionBarChart';
import Card from '../components/ui/Card';
import { marketService } from '../services/api/market.service';
import HeroScene3D from '../components/dashboard/HeroScene3D';
import AIAssistantPanel from '../components/dashboard/AIAssistantPanel';
import RegionMapMock from '../components/dashboard/RegionMapMock';
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

  const [selectedRegion, setSelectedRegion] = useState('Все регионы');
  const [selectedIndustry, setSelectedIndustry] = useState('Все отрасли');
  const [selectedYear, setSelectedYear] = useState('Все годы');

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

  const regions = useMemo(() => {
    return ['Все регионы', ...new Set(marketData.map((item) => item.region))];
  }, [marketData]);

  const industries = useMemo(() => {
    return ['Все отрасли', ...new Set(marketData.map((item) => item.industry))];
  }, [marketData]);

  const years = useMemo(() => {
    return ['Все годы', ...new Set(marketData.map((item) => String(item.year)))];
  }, [marketData]);

  const filteredData = useMemo(() => {
    return marketData.filter((item) => {
      const regionMatch =
        selectedRegion === 'Все регионы' || item.region === selectedRegion;
      const industryMatch =
        selectedIndustry === 'Все отрасли' || item.industry === selectedIndustry;
      const yearMatch =
        selectedYear === 'Все годы' || String(item.year) === selectedYear;

      return regionMatch && industryMatch && yearMatch;
    });
  }, [marketData, selectedIndustry, selectedRegion, selectedYear]);

  const yearlyTrendData: YearlyTrendItem[] = useMemo(() => {
    const groupedByYear = filteredData.reduce<Record<number, YearlyTrendItem>>(
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
  }, [filteredData]);

  const industryDistributionData: IndustryDistributionItem[] = useMemo(() => {
    const groupedByIndustry = filteredData.reduce<Record<string, number>>(
      (acc, item) => {
        acc[item.industry] = (acc[item.industry] ?? 0) + item.companyCount;
        return acc;
      },
      {}
    );

    return Object.entries(groupedByIndustry)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  const regionStatsData: RegionStatsItem[] = useMemo(() => {
    const groupedByRegion = filteredData.reduce<Record<string, number>>(
      (acc, item) => {
        acc[item.region] = (acc[item.region] ?? 0) + item.companyCount;
        return acc;
      },
      {}
    );

    return Object.entries(groupedByRegion)
      .map(([region, companies]) => ({ region, companies }))
      .sort((a, b) => b.companies - a.companies);
  }, [filteredData]);

  const derivedMetrics = useMemo(() => {
    const totalCompanies = filteredData.reduce(
      (sum, item) => sum + item.companyCount,
      0
    );
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    const totalEmployees = filteredData.reduce(
      (sum, item) => sum + item.employeeCount,
      0
    );
    const topRegionCompanies =
     regionStatsData.length > 0 ? regionStatsData[0].companies : 0;

    const averageGrowth =
      filteredData.length > 0
        ? filteredData.reduce((sum, item) => sum + item.growthRate, 0) /
          filteredData.length
        : 0;

    const topRegion =
      regionStatsData.length > 0 ? regionStatsData[0].region : 'Нет данных';

    const topIndustry =
      industryDistributionData.length > 0
        ? industryDistributionData[0].name
        : 'Нет данных';

    return {
      totalCompanies,
      totalRevenue,
      totalEmployees,
      averageGrowth,
      topRegion,
      topIndustry,
      topRegionCompanies,
    };
  }, [filteredData, industryDistributionData, regionStatsData]);

  const forecastData = useMemo(() => {
    if (yearlyTrendData.length === 0) return [];

    const last = yearlyTrendData[yearlyTrendData.length - 1];
    const previous =
      yearlyTrendData.length > 1 ? yearlyTrendData[yearlyTrendData.length - 2] : null;

    const companiesGrowthRate = previous
      ? (last.companies - previous.companies) / Math.max(previous.companies, 1)
      : 0.07;

    const revenueGrowthRate = previous
      ? (last.revenue - previous.revenue) / Math.max(previous.revenue, 1)
      : 0.09;

    return [
      ...yearlyTrendData,
      {
        year: last.year + 1,
        companies: Math.round(last.companies * (1 + companiesGrowthRate)),
        revenue: Math.round(last.revenue * (1 + revenueGrowthRate)),
      },
    ];
  }, [yearlyTrendData]);

  const aiSummary = useMemo(() => {
    return [
      `Наибольшая деловая активность сосредоточена в регионе ${derivedMetrics.topRegion}, где зафиксировано ${formatNumber(
        derivedMetrics.topRegionCompanies
      )} предприятий.`,
      `Ведущей отраслью в текущей выборке является "${derivedMetrics.topIndustry}", что указывает на её высокую концентрацию в структуре МСБ.`,
      `Средний темп роста составляет ${derivedMetrics.averageGrowth.toFixed(
        2
      )}%, что позволяет оценивать рынок как устойчиво развивающийся.`,
      `Совокупная выручка по выбранным фильтрам достигла ${formatCurrency(
        derivedMetrics.totalRevenue
      )}, а занятость — ${formatNumber(derivedMetrics.totalEmployees)} человек.`,
    ];
  }, [derivedMetrics]);

  const resetFilters = () => {
    setSelectedRegion('Все регионы');
    setSelectedIndustry('Все отрасли');
    setSelectedYear('Все годы');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-slate-300">
        Загрузка данных...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 md:px-6 xl:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-cyan-600 via-sky-600 to-violet-700 p-8 shadow-2xl"
        >
          <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-28 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-center">
            <div className="max-w-4xl">
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/70">
                Smart MSME Dashboard
              </p>
              <h1 className="text-3xl font-black leading-tight md:text-5xl">
                Анализ и визуализация данных рынка малого и среднего бизнеса
              </h1>
              <p className="mt-4 max-w-3xl text-base text-white/85 md:text-lg">
                Интерактивная аналитическая панель с крупными графиками,
                сравнением регионов, структурой отраслей, прогнозом и
                AI-выводами на основе текущих данных.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-2xl border border-white/15 bg-slate-950/20 px-4 py-3">
                  <p className="text-xs text-white/70">Регионов</p>
                  <p className="mt-1 text-xl font-bold">{regions.length - 1}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-slate-950/20 px-4 py-3">
                  <p className="text-xs text-white/70">Отраслей</p>
                  <p className="mt-1 text-xl font-bold">{industries.length - 1}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-slate-950/20 px-4 py-3">
                  <p className="text-xs text-white/70">Записей</p>
                  <p className="mt-1 text-xl font-bold">{formatNumber(filteredData.length)}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-slate-950/20 px-4 py-3">
                  <p className="text-xs text-white/70">Период</p>
                  <p className="mt-1 text-xl font-bold">
                    {selectedYear === 'Все годы' ? 'Все' : selectedYear}
                  </p>
                </div>
              </div>
            </div>

            <HeroScene3D />
          </div>
        </motion.section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
          <StatsCard
            title="Количество предприятий"
            value={formatNumber(derivedMetrics.totalCompanies)}
            description="Суммарное количество субъектов МСБ по выбранным фильтрам"
            accent="cyan"
            icon="🏢"
          />
          <StatsCard
            title="Общая выручка"
            value={formatCurrency(derivedMetrics.totalRevenue)}
            description="Финансовый объём рынка по выбранной выборке"
            accent="violet"
            icon="💰"
          />
          <StatsCard
            title="Количество занятых"
            value={formatNumber(derivedMetrics.totalEmployees)}
            description="Совокупная занятость в секторе малого и среднего бизнеса"
            accent="emerald"
            icon="👥"
          />
          <StatsCard
            title="Средний рост"
            value={`${derivedMetrics.averageGrowth.toFixed(2)}%`}
            description="Средний темп роста по всем отфильтрованным данным"
            accent="amber"
            icon="📈"
          />
        </section>

        <Card>
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Фильтры данных</h2>
              <p className="text-sm text-slate-400">
                Выберите регион, отрасль и период для динамического обновления
                всей панели.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
            >
              Сбросить фильтры
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </Card>

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
          <Card className="2xl:col-span-2">
            <div className="mb-5">
              <h2 className="text-2xl font-bold">Динамика рынка по годам</h2>
              <p className="text-sm text-slate-400">
                Крупная визуализация изменения количества предприятий и выручки
                в разрезе лет.
              </p>
            </div>
            <RevenueLineChart data={yearlyTrendData} />
          </Card>

          <Card>
            <div className="mb-5">
              <h2 className="text-2xl font-bold">Структура по отраслям</h2>
              <p className="text-sm text-slate-400">
                Распределение количества предприятий по направлениям бизнеса.
              </p>
            </div>
            <IndustryPieChart data={industryDistributionData} />
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
          <Card className="2xl:col-span-2">
            <div className="mb-5">
              <h2 className="text-2xl font-bold">Сравнение регионов</h2>
              <p className="text-sm text-slate-400">
                Сопоставление регионов по числу предприятий малого и среднего бизнеса.
              </p>
            </div>
            <RegionBarChart data={regionStatsData} />
          </Card>

          <AIAssistantPanel summary={aiSummary} />
        </section>

        <section className="grid grid-cols-1 gap-6">
          <RegionMapMock data={regionStatsData} />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <div className="mb-5">
              <h2 className="text-2xl font-bold">AI-аналитик</h2>
              <p className="text-sm text-slate-400">
                Блок для интеллектуального вывода на основе текущих фильтров.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-400/15 px-3 py-2 text-cyan-300">
                  🤖
                </div>
                <div>
                  <p className="font-semibold">AI Assistant</p>
                  <p className="text-sm text-slate-400">
                    Подготовка краткого аналитического резюме
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-7 text-slate-200">
                <p>
                  По текущей выборке суммарное количество предприятий составляет{' '}
                  <span className="font-semibold text-white">
                    {formatNumber(derivedMetrics.totalCompanies)}
                  </span>
                  , а совокупная занятость достигает{' '}
                  <span className="font-semibold text-white">
                    {formatNumber(derivedMetrics.totalEmployees)}
                  </span>
                  .
                </p>
                <p>
                  Наиболее выраженная активность отмечена в регионе{' '}
                  <span className="font-semibold text-cyan-300">
                    {derivedMetrics.topRegion}
                  </span>
                  , при этом ведущая отрасль —{' '}
                  <span className="font-semibold text-violet-300">
                    {derivedMetrics.topIndustry}
                  </span>
                  .
                </p>
                <p>
                  Средний темп роста по доступным данным равен{' '}
                  <span className="font-semibold text-emerald-300">
                    {derivedMetrics.averageGrowth.toFixed(2)}%
                  </span>
                  , что позволяет оценивать рынок как динамично развивающийся.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="mb-5">
              <h2 className="text-2xl font-bold">Быстрые показатели</h2>
              <p className="text-sm text-slate-400">
                Компактный аналитический свод.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-4">
                <span className="text-slate-400">Выручка</span>
                <span className="font-semibold text-white">
                  {formatCurrency(derivedMetrics.totalRevenue)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-4">
                <span className="text-slate-400">Регионов в выборке</span>
                <span className="font-semibold text-white">
                  {regionStatsData.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-4">
                <span className="text-slate-400">Отраслей в выборке</span>
                <span className="font-semibold text-white">
                  {industryDistributionData.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 p-4">
                <span className="text-slate-400">Годы наблюдений</span>
                <span className="font-semibold text-white">
                  {yearlyTrendData.length}
                </span>
              </div>
            </div>
          </Card>
        </section>

        <Card>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">Таблица показателей</h2>
            <p className="text-sm text-slate-400">
              Детальный просмотр данных по рынку малого и среднего бизнеса.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="px-3 py-3">Регион</th>
                  <th className="px-3 py-3">Отрасль</th>
                  <th className="px-3 py-3">Год</th>
                  <th className="px-3 py-3">Компании</th>
                  <th className="px-3 py-3">Выручка</th>
                  <th className="px-3 py-3">Сотрудники</th>
                  <th className="px-3 py-3">Рост</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 12).map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 transition hover:bg-white/5"
                  >
                    <td className="px-3 py-3 text-white">{item.region}</td>
                    <td className="px-3 py-3 text-slate-300">{item.industry}</td>
                    <td className="px-3 py-3 text-slate-300">{item.year}</td>
                    <td className="px-3 py-3 text-slate-300">
                      {formatNumber(item.companyCount)}
                    </td>
                    <td className="px-3 py-3 text-slate-300">
                      {formatCurrency(item.revenue)}
                    </td>
                    <td className="px-3 py-3 text-slate-300">
                      {formatNumber(item.employeeCount)}
                    </td>
                    <td className="px-3 py-3 font-medium text-emerald-300">
                      {item.growthRate.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">Прогноз развития</h2>
            <p className="text-sm text-slate-400">
              Упрощённый прогноз следующего периода на основе последних доступных
              значений.
            </p>
          </div>
          <RevenueLineChart data={forecastData} />
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;