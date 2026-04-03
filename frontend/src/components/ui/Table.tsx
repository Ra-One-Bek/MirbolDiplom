import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDownAZ, ArrowUpZA, Download, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

export interface Column<T, K extends keyof T = keyof T> {
  key: K;
  title: string;
  render?: (value: T[K], row: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  fileName?: string;
}

const Table = <T,>({
  data,
  columns,
  fileName = 'table-data',
}: TableProps<T>) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredData = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    const searched = normalized
      ? data.filter((row) =>
          columns.some((column) =>
            String(row[column.key] ?? '')
              .toLowerCase()
              .includes(normalized),
          ),
        )
      : data;

    if (!sortKey) {
      return searched;
    }

    return [...searched].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return sortDirection === 'asc'
        ? String(aValue ?? '').localeCompare(String(bValue ?? ''), 'ru')
        : String(bValue ?? '').localeCompare(String(aValue ?? ''), 'ru');
    });
  }, [columns, data, search, sortDirection, sortKey]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection('asc');
  };

  const handleExport = () => {
    const rows = filteredData.map((row) => {
      const result: Record<string, unknown> = {};

      columns.forEach((column) => {
        result[column.title] = row[column.key];
      });

      return result;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Поиск по таблице..."
            className="w-full rounded-2xl border border-white/10 bg-white/6 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-300/50 focus:bg-white/8"
          />
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/16"
        >
          <Download className="h-4 w-4" />
          Скачать Excel
        </button>
      </div>

      <div className="overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/35">
        <div className="max-h-[620px] overflow-auto">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead className="sticky top-0 z-10 backdrop-blur-xl">
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    onClick={() => handleSort(col.key)}
                    className="cursor-pointer border-b border-white/10 bg-slate-900/85 px-4 py-4 text-left font-medium text-slate-200 transition hover:bg-slate-800/90"
                  >
                    <span className="inline-flex items-center gap-2">
                      {col.title}
                      {sortKey === col.key ? (
                        sortDirection === 'asc' ? (
                          <ArrowDownAZ className="h-4 w-4 text-cyan-300" />
                        ) : (
                          <ArrowUpZA className="h-4 w-4 text-cyan-300" />
                        )
                      ) : null}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition hover:bg-white/[0.04]"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="border-b border-white/6 px-4 py-4 text-slate-300"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    Нет данных
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;