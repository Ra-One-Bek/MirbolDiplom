import type { ChangeEvent } from 'react';

interface FilterPanelProps {
  regions: string[];
  industries: string[];
  years: number[];
  selectedRegion: string;
  selectedIndustry: string;
  selectedYear: string;
  onRegionChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onReset: () => void;
}

const FilterPanel = ({
  regions,
  industries,
  years,
  selectedRegion,
  selectedIndustry,
  selectedYear,
  onRegionChange,
  onIndustryChange,
  onYearChange,
  onReset,
}: FilterPanelProps) => {
  const handleSelectChange =
    (callback: (value: string) => void) =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      callback(event.target.value);
    };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Фильтры анализа</h2>
        <p className="mt-1 text-sm text-slate-500">
          Выберите параметры для анализа рынка малого и среднего бизнеса
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Регион
          </label>
          <select
            value={selectedRegion}
            onChange={handleSelectChange(onRegionChange)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500"
          >
            <option value="">Все регионы</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Отрасль
          </label>
          <select
            value={selectedIndustry}
            onChange={handleSelectChange(onIndustryChange)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500"
          >
            <option value="">Все отрасли</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Год
          </label>
          <select
            value={selectedYear}
            onChange={handleSelectChange(onYearChange)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500"
          >
            <option value="">Все годы</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;