import { useEffect, useState } from 'react';
import { Database, Sparkles } from 'lucide-react';
import Table, { type Column } from '../components/ui/Table';
import Card from '../components/ui/Card';
import { marketService } from '../services/api/market.service';
import type { MarketDataItem } from '../types/market.types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatNumber } from '../utils/formatNumber';

const DataPage = () => {
  const [data, setData] = useState<MarketDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await marketService.getAllMarketData();
        setData(response);
      } catch {
        setError('Не удалось загрузить таблицу данных');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

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

  if (isLoading) {
    return <div className="p-6 text-slate-300">Загрузка таблицы...</div>;
  }

  if (error) {
    return <div className="p-6 text-rose-300">{error}</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card className="p-6 md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Data Space
            </div>
            <h1 className="text-2xl font-semibold text-white md:text-3xl">
              Таблица данных рынка МСБ
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Полный список данных по регионам, отраслям и ключевым бизнес-показателям.
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/8 text-cyan-200">
            <Database className="h-6 w-6" />
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-5" hover={false}>
        <Table data={data} columns={columns} fileName="market-data" />
      </Card>
    </div>
  );
};

export default DataPage;