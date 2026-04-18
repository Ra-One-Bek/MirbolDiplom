import { useMemo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  createCoordinates,
  type Coordinates,
} from '@vnedyalk0v/react19-simple-maps';
import Card from '../ui/Card';
import kzRegionsGeoJson from '../../data/kzRegions';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatNumber } from '../../utils/formatNumber';
import type { RegionMapItem } from '../../types/market.types';

type MetricKey = 'companies' | 'revenue' | 'employees' | 'growthRate';

interface KazakhstanRegionMapProps {
  data: RegionMapItem[];
  selectedRegion: string;
  onRegionSelect: (region: string) => void;
}

interface GeoProperties {
  name?: string;
  NAME_1?: string;
  shapeName?: string;
}

const REGION_NAME_ALIASES: Record<string, string[]> = {
  'Астана': ['Астана', 'г. Астана', 'Astana', 'Nur-Sultan', 'Нур-Султан'],
  'Алматы': ['Алматы', 'г. Алматы', 'Almaty'],
  'Шымкент': ['Шымкент', 'г. Шымкент', 'Shymkent'],
  'Акмолинская область': ['Акмолинская область', 'Akmola'],
  'Актюбинская область': ['Актюбинская область', 'Актобе', 'Aktobe'],
  'Алматинская область': ['Алматинская область', 'Almaty Region'],
  'Атырауская область': ['Атырауская область', 'Atyrau'],
  'Восточно-Казахстанская область': ['Восточно-Казахстанская область', 'East Kazakhstan'],
  'Жамбылская область': ['Жамбылская область', 'Zhambyl'],
  'Западно-Казахстанская область': ['Западно-Казахстанская область', 'West Kazakhstan'],
  'Карагандинская область': ['Карагандинская область', 'Karaganda'],
  'Костанайская область': ['Костанайская область', 'Kostanay'],
  'Кызылординская область': ['Кызылординская область', 'Kyzylorda'],
  'Мангистауская область': ['Мангистауская область', 'Mangystau'],
  'Павлодарская область': ['Павлодарская область', 'Pavlodar'],
  'Северо-Казахстанская область': ['Северо-Казахстанская область', 'North Kazakhstan'],
  'Туркестанская область': ['Туркестанская область', 'Turkistan'],
  'Область Абай': ['Область Абай', 'Abai'],
  'Область Жетісу': ['Область Жетісу', 'Жетысу', 'Jetisu', 'Zhetysu'],
  'Область Ұлытау': ['Область Ұлытау', 'Ulytau'],
};

const REGION_CENTERS: Record<string, Coordinates> = {
  'Астана': createCoordinates(71.4, 51.15),
  'Алматы': createCoordinates(76.9, 43.2),
  'Шымкент': createCoordinates(69.6, 42.3),
  'Акмолинская область': createCoordinates(69.9, 51.7),
  'Актюбинская область': createCoordinates(58.6, 49.2),
  'Алматинская область': createCoordinates(78.0, 44.8),
  'Атырауская область': createCoordinates(53.3, 47.7),
  'Восточно-Казахстанская область': createCoordinates(84.7, 48.7),
  'Жамбылская область': createCoordinates(71.7, 43.4),
  'Западно-Казахстанская область': createCoordinates(52.0, 50.5),
  'Карагандинская область': createCoordinates(69.8, 48.2),
  'Костанайская область': createCoordinates(63.4, 53.2),
  'Кызылординская область': createCoordinates(63.8, 44.6),
  'Мангистауская область': createCoordinates(52.7, 44.0),
  'Павлодарская область': createCoordinates(76.2, 52.4),
  'Северо-Казахстанская область': createCoordinates(69.6, 54.3),
  'Туркестанская область': createCoordinates(69.0, 42.3),
  'Область Абай': createCoordinates(81.5, 49.2),
  'Область Жетісу': createCoordinates(79.5, 45.7),
  'Область Ұлытау': createCoordinates(64.8, 47.0),
};

const normalizeRegionName = (value: string) =>
  value
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/й/g, 'и')
    .replace(/область/g, '')
    .replace(/г\./g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

const resolveRegionKey = (rawName?: string) => {
  if (!rawName) return null;

  const normalizedRaw = normalizeRegionName(rawName);

  for (const [canonical, aliases] of Object.entries(REGION_NAME_ALIASES)) {
    for (const alias of aliases) {
      if (normalizeRegionName(alias) === normalizedRaw) {
        return canonical;
      }
    }
  }

  return rawName;
};

const getMetricValue = (item: RegionMapItem, metric: MetricKey) => Number(item[metric] ?? 0);

const getFillColor = (value: number, max: number) => {
  if (max <= 0) return 'rgba(30, 41, 59, 0.92)';

  const intensity = value / max;

  if (intensity >= 0.8) return 'rgba(8, 145, 178, 0.75)';
  if (intensity >= 0.6) return 'rgba(8, 145, 178, 0.58)';
  if (intensity >= 0.4) return 'rgba(8, 145, 178, 0.44)';
  if (intensity >= 0.2) return 'rgba(8, 145, 178, 0.28)';

  return 'rgba(30, 41, 59, 0.92)';
};

const getBubbleRadius = (value: number, max: number) => {
  if (max <= 0) return 6;
  return 6 + (value / max) * 16;
};

const KazakhstanRegionMap = ({
  data,
  selectedRegion,
  onRegionSelect,
}: KazakhstanRegionMapProps) => {
  const [metric, setMetric] = useState<MetricKey>('companies');
  const [hovered, setHovered] = useState<RegionMapItem | null>(null);

  const dataMap = useMemo(() => {
    const map = new Map<string, RegionMapItem>();

    for (const item of data) {
      const key = resolveRegionKey(item.region) ?? item.region;
      map.set(key, item);
    }

    return map;
  }, [data]);

  const maxMetric = useMemo(() => {
    if (!data.length) return 0;
    return Math.max(...data.map((item) => getMetricValue(item, metric)), 0);
  }, [data, metric]);

  const maxCompanies = useMemo(() => {
    if (!data.length) return 1;
    return Math.max(...data.map((item) => item.companies || 0), 1);
  }, [data]);

  const hoveredOrSelected =
    hovered ??
    data.find((item) => item.region === selectedRegion) ??
    data[0] ??
    null;

  return (
    <Card className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Карта активности регионов</h3>
          <p className="mt-1 text-sm text-slate-300">
            Наведи на регион для показателей, нажми — чтобы отфильтровать dashboard.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { key: 'companies', label: 'Компании' },
            { key: 'revenue', label: 'Выручка' },
            { key: 'employees', label: 'Сотрудники' },
            { key: 'growthRate', label: 'Рост %' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setMetric(item.key as MetricKey)}
              className={`rounded-2xl px-4 py-2 text-sm transition ${
                metric === item.key
                  ? 'bg-cyan-400 text-slate-950'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.55fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: createCoordinates(67, 48),
              scale: 1150,
            }}
            width={900}
            height={500}
            style={{ width: '100%', height: 'auto' }}
          >
            <defs>
              <filter id="region-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
              </filter>
            </defs>

            <Geographies geography={kzRegionsGeoJson}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const properties = (geo.properties ?? {}) as GeoProperties;

                  const rawName =
                    properties.name ??
                    properties.NAME_1 ??
                    properties.shapeName ??
                    '';

                  const regionKey = resolveRegionKey(rawName);
                  const regionData = regionKey ? dataMap.get(regionKey) : undefined;
                  const metricValue = regionData ? getMetricValue(regionData, metric) : 0;
                  const isActive =
                    selectedRegion !== 'Все регионы' && regionData?.region === selectedRegion;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (regionData) setHovered(regionData);
                      }}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => {
                        if (regionData) onRegionSelect(regionData.region);
                      }}
                      style={{
                        default: {
                          fill: isActive
                            ? 'rgba(6, 182, 212, 0.9)'
                            : getFillColor(metricValue, maxMetric),
                          stroke: 'rgba(255,255,255,0.18)',
                          strokeWidth: isActive ? 1.5 : 0.8,
                          outline: 'none',
                          cursor: regionData ? 'pointer' : 'default',
                        },
                        hover: {
                          fill: 'rgba(34, 211, 238, 0.72)',
                          stroke: 'rgba(255,255,255,0.3)',
                          strokeWidth: 1,
                          outline: 'none',
                          cursor: regionData ? 'pointer' : 'default',
                        },
                        pressed: {
                          fill: 'rgba(8, 145, 178, 0.9)',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {data.map((item) => {
              const regionKey = resolveRegionKey(item.region) ?? item.region;
              const center = REGION_CENTERS[regionKey];

              if (!center) return null;

              const radius = getBubbleRadius(item.companies, maxCompanies);

              return (
                <Marker
                  key={item.region}
                  coordinates={center}
                  onMouseEnter={() => setHovered(item)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onRegionSelect(item.region)}
                >
                  <>
                    <circle
                      r={radius * 1.8}
                      fill="rgba(34, 211, 238, 0.18)"
                      filter="url(#region-blur)"
                    />
                    <circle
                      r={radius}
                      fill="rgba(34, 211, 238, 0.28)"
                      stroke="rgba(34, 211, 238, 0.95)"
                      strokeWidth={1.2}
                    />
                  </>
                </Marker>
              );
            })}
          </ComposableMap>

          <div className="mt-4 flex items-center justify-between gap-4 text-xs text-slate-400">
            <span>Низкая активность</span>
            <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-slate-700 to-cyan-400" />
            <span>Высокая активность</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">
              {hoveredOrSelected?.region ?? 'Нет данных'}
            </h4>

            <button
              type="button"
              onClick={() => onRegionSelect('Все регионы')}
              className="rounded-2xl bg-slate-800 px-3 py-2 text-xs text-slate-200 transition hover:bg-slate-700"
            >
              Сбросить регион
            </button>
          </div>

          {hoveredOrSelected ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <div className="text-sm text-slate-400">Компании</div>
                <div className="mt-1 text-2xl font-bold text-white">
                  {formatNumber(hoveredOrSelected.companies)}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/70 p-4">
                <div className="text-sm text-slate-400">Выручка</div>
                <div className="mt-1 text-xl font-bold text-white">
                  {formatCurrency(hoveredOrSelected.revenue)}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/70 p-4">
                <div className="text-sm text-slate-400">Сотрудники</div>
                <div className="mt-1 text-xl font-bold text-white">
                  {formatNumber(hoveredOrSelected.employees)}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/70 p-4">
                <div className="text-sm text-slate-400">Средний рост</div>
                <div className="mt-1 text-xl font-bold text-white">
                  {hoveredOrSelected.growthRate.toFixed(2)}%
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-400">
              Наведи курсор на регион.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default KazakhstanRegionMap;