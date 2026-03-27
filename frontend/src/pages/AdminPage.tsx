import { useEffect, useState } from 'react';
import Table, { type Column } from '../components/ui/Table';
import {
  marketService,
  type CreateMarketPayload,
} from '../services/api/market.service';
import type { MarketDataItem } from '../types/market.types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatNumber } from '../utils/formatNumber';

const initialFormState: CreateMarketPayload = {
  region: '',
  industry: '',
  year: 2024,
  companyCount: 0,
  revenue: 0,
  employeeCount: 0,
  growthRate: 0,
};

const AdminPage = () => {
  const [data, setData] = useState<MarketDataItem[]>([]);
  const [formData, setFormData] = useState<CreateMarketPayload>(initialFormState);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await marketService.getAllMarketData();
      setData(response);
    } catch {
      setError('Не удалось загрузить данные для админ панели');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchMarketData();
  }, []);

  const handleChange = (field: keyof CreateMarketPayload, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        field === 'region' || field === 'industry'
          ? value
          : Number(value),
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
  };

  const handleEdit = (item: MarketDataItem) => {
    setEditingId(item.id);
    setFormData({
      region: item.region,
      industry: item.industry,
      year: item.year,
      companyCount: item.companyCount,
      revenue: item.revenue,
      employeeCount: item.employeeCount,
      growthRate: item.growthRate,
    });

    setError('');
    setSuccessMessage('');
  };

  const handleCancelEdit = () => {
    resetForm();
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError('');
      setSuccessMessage('');

      if (editingId !== null) {
        await marketService.updateMarket(editingId, formData);
        setSuccessMessage('Запись успешно обновлена');
      } else {
        await marketService.createMarket(formData);
        setSuccessMessage('Запись успешно добавлена');
      }

      resetForm();
      await fetchMarketData();
    } catch {
      setError(
        editingId !== null
          ? 'Не удалось обновить запись'
          : 'Не удалось добавить запись'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setError('');
      setSuccessMessage('');

      if (editingId === id) {
        resetForm();
      }

      await marketService.deleteMarket(id);
      setSuccessMessage('Запись успешно удалена');
      await fetchMarketData();
    } catch {
      setError('Не удалось удалить запись');
    }
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
    {
      key: 'id',
      title: 'Действия',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-amber-600"
          >
            Редактировать
          </button>

          <button
            type="button"
            onClick={() => handleDelete(row.id)}
            className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-800">
            {editingId !== null ? 'Редактирование записи' : 'Добавление новой записи'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {editingId !== null
              ? 'Измените данные и сохраните обновленную запись'
              : 'Заполните форму для добавления данных о рынке МСБ'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Регион
            </label>
            <input
              type="text"
              value={formData.region}
              onChange={(e) => handleChange('region', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              placeholder="Например: Ташкент"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Отрасль
            </label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              placeholder="Например: IT"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Год
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Количество компаний
            </label>
            <input
              type="number"
              value={formData.companyCount}
              onChange={(e) => handleChange('companyCount', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Выручка
            </label>
            <input
              type="number"
              value={formData.revenue}
              onChange={(e) => handleChange('revenue', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Количество сотрудников
            </label>
            <input
              type="number"
              value={formData.employeeCount}
              onChange={(e) => handleChange('employeeCount', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Темп роста (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.growthRate}
              onChange={(e) => handleChange('growthRate', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              required
            />
          </div>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
            >
              {isSubmitting
                ? editingId !== null
                  ? 'Сохранение...'
                  : 'Добавление...'
                : editingId !== null
                ? 'Сохранить изменения'
                : 'Добавить запись'}
            </button>

            {editingId !== null ? (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Отмена
              </button>
            ) : null}
          </div>
        </form>

        {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

        {successMessage ? (
          <p className="mt-4 text-sm text-green-600">{successMessage}</p>
        ) : null}
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Управление записями
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Список всех записей с возможностью редактирования и удаления
          </p>
        </div>

        {isLoading ? (
          <div className="text-slate-600">Загрузка данных...</div>
        ) : (
          <Table data={data} columns={columns} />
        )}
      </section>
    </div>
  );
};

export default AdminPage;