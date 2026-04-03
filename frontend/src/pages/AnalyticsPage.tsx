import { useEffect, useMemo, useState } from 'react';
import { Activity, Filter, Sparkles } from 'lucide-react';
import FilterPanel from '../components/analytics/FilterPanel';
import StatsCard from '../components/dashboard/StatsCard';
import Card from '../components/ui/Card';
import Table, { type Column } from '../components/ui/Table';
import { marketService } from '../services/api/market.service';
import type { FilterOptions, MarketDataItem } from '../types/market.types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatNumber } from '../utils/formatNumber';

const AnalyticsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    regions: [],
    industries: [],
    years: [],
  });
  const [filteredData, setFilteredData] = useState<MarketDataItem[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setIsLoadingFilters(true);
        const response = await marketService.getAvailableFilters();
        setFilterOptions(response);
      } catch {
        setError('Не удалось загрузить фильтры');
      } finally {
        setIsLoadingFilters(false);
      }
    };

    void fetchFilters();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoadingData(true);
        setError('');
        const response = await marketService.getAnalytics({
          region: selectedRegion || undefined,
          industry: selectedIndustry || undefined,
          year: selectedYear ? Number(selectedYear) : undefined,
        });
        setFilteredData(response);
      } catch {
        setError('Не удалось загрузить аналитические данные');
      } finally {
        setIsLoadingData(false);
      }
    };

    void fetchAnalytics();
  }, [selectedRegion, selectedIndustry, selectedYear]);

  const totalCompanies = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.companyCount, 0),
    [filteredData],
  );

  const totalRevenue = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.revenue, 0),
    [filteredData],
  );

  const totalEmployees = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.employeeCount, 0),
    [filteredData],
  );

  const averageGrowth = useMemo(() => {
    if (filteredData.length === 0) return '0.0';
    const totalGrowth = filteredData.reduce((sum, item) => sum + item.growthRate, 0);
    return (totalGrowth / filteredData.length).toFixed(1);
  }, [filteredData]);

  const handleReset = () => {
    setSelectedRegion('');
    setSelectedIndustry('');
    setSelectedYear('');
  };

  const columns: Column<MarketDataItem>[] = [
    { key: 'region', title: 'Регион' },
    { key: 'industry', title: 'Отрасль' },
    { key: 'year', title: 'Год' },
    {
      key: 'companyCount',
      title: 'Компании',
      render: (value) => formatNumber(value as number),
    },
    {
      key: 'revenue',
      title: 'Выручка',
      render: (value) => formatCurrency(value as number),
    },
    {
      key: 'employeeCount',
      title: 'Сотрудники',
      render: (value) => formatNumber(value as number),
    },
    {
      key: 'growthRate',
      title: 'Рост (%)',
      render: (value) => `${value}%`,
    },
  ];

  if (isLoadingFilters) {
    return <div className="p-6 text-slate-300">Загрузка фильтров...</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card className="p-6 md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-violet-200">
              <Sparkles className="h-3.5 w-3.5" />
              Analytics Lab
            </div>
            <h1 className="text-2xl font-semibold text-white md:text-3xl">
              Аналитика данных
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Живая выборка по рынку МСБ с фильтрами, метриками и экспортом.
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/8 text-violet-200">
            <Activity className="h-6 w-6" />
          </div>
        </div>
      </Card>

      <FilterPanel
        regions={filterOptions.regions}
        industries={filterOptions.industries}
        years={filterOptions.years}
        selectedRegion={selectedRegion}
        selectedIndustry={selectedIndustry}
        selectedYear={selectedYear}
        onRegionChange={setSelectedRegion}
        onIndustryChange={setSelectedIndustry}
        onYearChange={setSelectedYear}
        onReset={handleReset}
      />

      {error ? <div className="px-1 text-rose-300">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Компании"
          value={formatNumber(totalCompanies)}
          description="Общий объем компаний по выбранным фильтрам"
          accent="cyan"
          icon="companies"
        />
        <StatsCard
          title="Выручка"
          value={formatCurrency(totalRevenue)}
          description="Совокупная выручка по текущей выборке"
          accent="violet"
          icon="revenue"
        />
        <StatsCard
          title="Сотрудники"
          value={formatNumber(totalEmployees)}
          description="Суммарная занятость в выборке"
          accent="emerald"
          icon="employees"
        />
        <StatsCard
          title="Средний рост"
          value={`${averageGrowth}%`}
          description="Средний темп роста по найденным записям"
          accent="amber"
          icon="growth"
        />
      </div>

      <Card className="p-4 md:p-5" hover={false}>
        <div className="mb-4 flex items-center gap-2 text-slate-300">
          <Filter className="h-4 w-4" />
          <span className="text-sm">Результаты аналитики</span>
        </div>

        {isLoadingData ? (
          <div className="py-10 text-center text-slate-400">Загрузка аналитики...</div>
        ) : (
          <Table data={filteredData} columns={columns} fileName="analytics-data" />
        )}
      </Card>
    </div>
  );
};

export default AnalyticsPage;