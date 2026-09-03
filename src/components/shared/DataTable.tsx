'use client';

import { clsx } from 'clsx';

export interface Column<T> {
  key: string;
  header: string;
  // Optional custom cell renderer. If absent, renders raw value.
  render?: (row: T) => React.ReactNode;
  className?: string;
  // Hide on small screens
  hidden?: 'sm' | 'md' | 'lg';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  emptyMessage = 'No records found',
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  col.hidden === 'sm' && 'hidden sm:table-cell',
                  col.hidden === 'md' && 'hidden md:table-cell',
                  col.hidden === 'lg' && 'hidden lg:table-cell',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center text-slate-400 py-8">
                {emptyMessage}
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? 'cursor-pointer' : undefined}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={clsx(
                    col.hidden === 'sm' && 'hidden sm:table-cell',
                    col.hidden === 'md' && 'hidden md:table-cell',
                    col.hidden === 'lg' && 'hidden lg:table-cell',
                    col.className
                  )}
                >
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
