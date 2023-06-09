import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Papa from 'papaparse';
import Badge from '../Badge/Badge';
export interface DataTableProps<T> {
  rows: T[];
  dataSet: number;
  exportData?: Record<any, any>[];

  columns: {
    key: string;
    width?: string;
    sticky?: 'left' | 'right';
    maxWidth?: string;
    minWidth?: string;
    padding?: string;
    sortValue?: (row: T) => string | number;
    // eslint-disable-next-line no-undef, no-unused-vars
    cell: (row: T) => JSX.Element | string | null | number;
    header: () => JSX.Element | string | null;
    total?: (rows: T[]) => JSX.Element | string | null | number;
  }[];
}

const DataTable = <T extends object>({
  rows,
  columns,
  dataSet,
  exportData
}: DataTableProps<T>) => {
  const [rowsData, setRowsData] = useState(rows);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  function handleSort(key: string) {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  }

  useEffect(() => {
    if (sortKey) {
      const sortedRows = [...rows].sort((a, b) => {
        const sortColumn = columns.find((col) => col.key === sortKey);

        const aValue =
          sortColumn && sortColumn.sortValue
            ? sortColumn.sortValue(a)
            : a[sortKey as keyof T];
        const bValue =
          sortColumn && sortColumn.sortValue
            ? sortColumn.sortValue(b)
            : b[sortKey as keyof T];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
      setRowsData(sortedRows);
    }
  }, [rows, sortKey, sortDirection]);

  useEffect(() => {
    setRowsData(rows);
  }, [rows]);

  function downloadCSV(
    array: Record<string, string | number | boolean | undefined>[],
    fileName: string
  ) {
    const headers = columns.map((col) => {
      const header = col.header?.();
      if (!header) {
        return '';
      } else if (typeof header === 'string') {
        return header;
      } else {
        return header.toString();
      }
    });

    const data = array.map((item) =>
      columns.map((col) => {
        console.log(item[col.key]);
        const cellValue = item[col.key];
        if (typeof cellValue === 'object' && col.key.includes('.')) {
          const subKeys = col.key.split('.');
          let tempValue: Record<string, any> | undefined = item;
          for (let i = 0; i < subKeys.length; i++) {
            if (tempValue) {
              tempValue = tempValue[subKeys[i]];
            } else {
              break;
            }
          }
          return tempValue !== undefined ? tempValue.toString() : '';
        } else {
          return cellValue !== null && cellValue !== undefined
            ? cellValue.toString()
            : '';
        }
      })
    );

    const csv = Papa.unparse(
      {
        fields: headers,
        data: data
      },
      {
        delimiter: ','
      }
    );

    var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var csvURL = null;
    if ((navigator as any)?.msSaveBlob) {
      csvURL = (navigator as any).msSaveBlob(csvData, `cihangirokullari.csv`);
    } else {
      csvURL = window.URL.createObjectURL(csvData);
    }

    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', `cihangirokullari.csv`); 
    tempLink.click();
  }

  return (
    <div className="min-w-full relative  bg-white border border-brand-black-light rounded-xl shadow-md w-full overflow-scroll">
      <table className="w-full">
        <thead className="text-left">
          <tr>
            {columns.map((col) => (
              <th
                onClick={() => handleSort(col.key)}
                style={{
                  maxWidth: col.maxWidth,
                  width: col.width,
                  position: col.sticky ? 'sticky' : undefined,
                  zIndex: col.sticky ? '1' : undefined,
                  left: col.sticky === 'left' ? '0' : undefined,
                  right: col.sticky === 'right' ? '0' : undefined,
                  minWidth: col.minWidth || '150px'
                }}
                key={col.key}
                className={`${
                  col.padding ? col.padding : 'px-4'
                } select-none py-3 up font-medium whitespace-nowrap text-brand-black-secondary text-xs uppercase`}>
                <div className="flex items-center space-x-1">
                  <span className="text-black   text-left font-semibold">
                    {col.header()}
                  </span>
                  {sortKey === col.key && (
                    <span className="text-black">
                      {sortDirection === 'asc' ? ' ▲' : ' ▼'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsData.length <= 0 ? (
            <tr className="bg-white">
              <td
                colSpan={columns.length}
                className="px-4 border-t border-brand-black-light py-3 text-sm">
                ---
              </td>
            </tr>
          ) : (
            rowsData
              .slice(0 + (currentPage - 1) * dataSet, currentPage * dataSet)
              .map((row, index) => (
                <tr className="bg-white" key={index}>
                  {columns.map((col, idx) => (
                    <td
                      style={{
                        maxWidth: col.maxWidth,
                        width: col.width,
                        position: col.sticky ? 'sticky' : undefined,
                        zIndex: col.sticky ? '1' : undefined,
                        left: col.sticky === 'left' ? '0' : undefined,
                        right: col.sticky === 'right' ? '0' : undefined,
                        minWidth: col.minWidth || '150px'
                      }}
                      key={`${col.key}${idx}${index}`}
                      className={`${
                        col.padding ? col.padding : 'px-4'
                      } border-t border-brand-black-light py-2 text-sm`}>
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
          )}
        </tbody>
      </table>
      <div className="pl-3 pr-4 sticky left-0 py-3 flex items-center justify-between text-brand-black-primar text-sm bg-white border-t border-brand-black-light">
        {Math.ceil(rows.length / dataSet) > 0 && (
          <div className="flex text-sm items-center">
            <button
              className="w-4 h-4 mr-1.5 disabled:opacity-60 flex items-center justify-center"
              onClick={() =>
                setCurrentPage((prev) => (prev === 1 ? 1 : prev - 1))
              }
              disabled={currentPage === 1}
              type="button">
              <ChevronLeftIcon className="w-4 h-4 stroke-2" />
            </button>
            <span className="leading-none">
              Sayfa{' '}
              <span className="font-bold">
                {' '}
                {currentPage} / {Math.ceil(rows.length / dataSet)}{' '}
              </span>
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === Math.ceil(rows.length / dataSet)}
              className="w-4 h-4 ml-1.5 disabled:opacity-60 flex items-center justify-center"
              type="button">
              <ChevronRightIcon className="w-4 h-4 stroke-2" />
            </button>
          </div>
        )}
        <div className="flex ml-auto items-center justify-end gap-2">
          {columns
            .filter((col) => col.total)
            .map((col, idx) => (
              <div key={idx}>
                <span className="font-semibold mr-1">Toplam Tutar:</span>
                {col.total && col.total(rowsData)}
              </div>
            ))}
          <Badge color="primary" text={`${rows.length} Kayıt`} />
          {exportData && (
            <button
              className="flex items-center justify-center"
              onClick={() => {
                if (exportData.length > 0) {
                  downloadCSV(exportData, 'export');
                }
              }}>
              <Badge color="blue" text={`Dışa Aktar`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
