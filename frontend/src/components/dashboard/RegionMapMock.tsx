import { useMemo, useState } from 'react';
import Card from '../ui/Card';
import type { RegionStatsItem } from '../../types/market.types';
import { formatNumber } from '../../utils/formatNumber';

interface RegionMapMockProps {
  data: RegionStatsItem[];
}

const RegionMapMock = ({ data }: RegionMapMockProps) => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const normalized = useMemo(() => {
    const max = Math.max(...data.map((item) => item.companies), 1);

    return data.map((item) => ({
      ...item,
      intensity: item.companies / max,
    }));
  }, [data]);

  const selected =
    normalized.find((item) => item.region === activeRegion) ?? normalized[0];

  return (
    <Card className="h-full">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">Карта активности регионов</h2>
        <p className="text-sm text-slate-400">
          Интерактивная панель распределения компаний по регионам
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {normalized.map((item) => (
            <button
              key={item.region}
              onMouseEnter={() => setActiveRegion(item.region)}
              onClick={() => setActiveRegion(item.region)}
              className="rounded-3xl border border-white/10 p-4 text-left transition hover:scale-[1.02]"
              style={{
                background: `rgba(34, 211, 238, ${0.12 + item.intensity * 0.4})`,
              }}
            >
              <p className="text-sm text-white">{item.region}</p>
              <p className="mt-2 text-xl font-bold text-slate-50">
                {formatNumber(item.companies)}
              </p>
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Выбранный регион</p>
          <h3 className="mt-2 text-2xl font-bold text-cyan-300">
            {selected?.region ?? 'Нет данных'}
          </h3>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">Количество компаний</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {selected ? formatNumber(selected.companies) : '—'}
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">Уровень активности</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {selected ? `${Math.round(selected.companies / 1000)} / 100` : '—'}
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-300">
              Наведи курсор или нажми на карточку региона, чтобы показать
              сравнительную активность и использовать блок как визуальную карту.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RegionMapMock;