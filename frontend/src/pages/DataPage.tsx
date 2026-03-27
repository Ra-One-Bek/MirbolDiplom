import { useEffect, useState } from 'react';
import Table, { type Column } from '../components/ui/Table';
import { marketService } from '../services/api/market.service';
import type { MarketDataItem } from '../types/market.types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatNumber } from '../utils/formatNumber';

const DataPage = () => {
  const [data, setData] = useState<MarketDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await marketService.getAllMarketData();
        setData(response);
      } catch (err) {
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
    return <div className="text-slate-600">Загрузка таблицы...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-300">
          Таблица данных рынка МСБ
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Полный список данных по регионам, отраслям и показателям бизнеса
        </p>
      </div>

      <Table data={data} columns={columns} />
    </div>
  );
};

export default DataPage;