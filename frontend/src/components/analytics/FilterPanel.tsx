import type { ChangeEvent } from 'react';
import { RotateCcw } from 'lucide-react';
import Card from '../ui/Card';

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

  const selectClassName =
    'w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50 focus:bg-white/8';

  return (
    <Card className="p-5 md:p-6" hover={false}>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Фильтры анализа</h2>
          <p className="mt-1 text-sm text-slate-400">
            Выбери параметры и смотри, как меняется картина рынка.
          </p>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" />
          Сбросить
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Регион</span>
          <select
            value={selectedRegion}
            onChange={handleSelectChange(onRegionChange)}
            className={selectClassName}
          >
            <option value="">Все регионы</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-slate-300">Отрасль</span>
          <select
            value={selectedIndustry}
            onChange={handleSelectChange(onIndustryChange)}
            className={selectClassName}
          >
            <option value="">Все отрасли</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-slate-300">Год</span>
          <select
            value={selectedYear}
            onChange={handleSelectChange(onYearChange)}
            className={selectClassName}
          >
            <option value="">Все годы</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>
    </Card>
  );
};

export default FilterPanel;