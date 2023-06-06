const TableFallback = () => {
  return (
    <div
      className={`min-w-full animate-pulse relative bg-white  border border-brand-black-light rounded w-full overflow-x-auto`}>
      <table className="w-full">
        <thead className="text-left">
          <tr>
            <th className="px-4 select-none py-3 up font-medium whitespace-nowrap text-brand-black-secondary text-xs uppercase">
              <span className="w-24 flex items-center justify-center h-[16px] bg-slate-100 rounded"></span>
            </th>
            <th className="px-4 select-none py-3 up font-medium whitespace-nowrap text-brand-black-secondary text-xs uppercase">
              <span className="w-24 flex items-center justify-center h-[16px] bg-slate-100 rounded"></span>
            </th>
            <th className="px-4 select-none py-3 up font-medium whitespace-nowrap text-brand-black-secondary text-xs uppercase">
              <span className="w-24 flex items-center justify-center h-[16px] bg-slate-100 rounded"></span>
            </th>
            <th className="px-4 select-none py-3 up font-medium whitespace-nowrap text-brand-black-secondary text-xs uppercase">
              <span className="w-24 flex items-center justify-center h-[16px] bg-slate-100 rounded"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((e) => (
            <tr key={e} className={'bg-white'}>
              <td className="h-[45px] px-[16px] border-t border-brand-black-light py-2.5 text-sm">
                <span className="w-24 flex items-center justify-center h-[20.5px] bg-gray-100 rounded"></span>
              </td>
              <td className="px-[16px] border-t border-brand-black-light py-2.5 text-sm">
                <span className="w-44 flex items-center justify-center h-[20.5px] bg-gray-100 rounded"></span>
              </td>
              <td className="px-[16px] border-t border-brand-black-light py-2.5 text-sm">
                <span className="w-24 flex items-center justify-center h-[20.5px] bg-gray-100 rounded"></span>
              </td>
              <td className="px-[16px] border-t border-brand-black-light py-2.5 text-sm">
                <span className="w-24 flex items-center justify-center h-[20.5px] bg-gray-100 rounded"></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-[16px] sticky left-0 py-3 flex items-center justify-between text-brand-black-primar text-sm bg-white border-t border-brand-black-light">
        <span className="w-32 flex items-center justify-center h-[20px] bg-slate-100 rounded"></span>
        <span className="w-20 flex items-center justify-center h-[20px] bg-slate-100 rounded"></span>
      </div>
    </div>
  );
};

export default TableFallback;
