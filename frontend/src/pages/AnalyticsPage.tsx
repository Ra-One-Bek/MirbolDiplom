import { useEffect, useMemo, useState } from 'react';
import FilterPanel from '../components/analytics/FilterPanel';
import StatsCard from '../components/dashboard/StatsCard';
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
      } catch (err) {
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
      } catch (err) {
        setError('Не удалось загрузить аналитические данные');
      } finally {
        setIsLoadingData(false);
      }
    };

    void fetchAnalytics();
  }, [selectedRegion, selectedIndustry, selectedYear]);

  const totalCompanies = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.companyCount, 0),
    [filteredData]
  );

  const totalRevenue = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.revenue, 0),
    [filteredData]
  );

  const totalEmployees = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.employeeCount, 0),
    [filteredData]
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
    return <div className="text-slate-600">Загрузка фильтров...</div>;
  }

  return (
    <div className="space-y-6">
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

      {error ? <div className="text-red-500">{error}</div> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Компании"
          value={formatNumber(totalCompanies)}
          description="Количество предприятий по фильтру"
        />
        <StatsCard
          title="Выручка"
          value={formatCurrency(totalRevenue)}
          description="Суммарная выручка по фильтру"
        />
        <StatsCard
          title="Сотрудники"
          value={formatNumber(totalEmployees)}
          description="Общее число сотрудников"
        />
        <StatsCard
          title="Средний рост"
          value={`${averageGrowth}%`}
          description="Средний темп роста"
        />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Результаты аналитики
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Ниже показаны данные, соответствующие выбранным параметрам
          </p>
        </div>

        {isLoadingData ? (
          <div className="text-slate-600">Загрузка аналитики...</div>
        ) : (
          <Table data={filteredData} columns={columns} />
        )}
      </section>
    </div>
  );
};

export default AnalyticsPage;