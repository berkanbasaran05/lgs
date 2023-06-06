import { ReactNode } from 'react';

const InfoBox = ({
  title,
  value,
  className,
  noBorder
}: {
  title: string;
  value: ReactNode;
  className?: string;
  noBorder?: boolean;
}) => {
  return value && value !== `undefined` && value !== `null` ? (
    <div
      className={`grid md:grid-cols-[260px,1fr] grid-cols-[130px,1fr] gap-3 text-left items-center ${
        noBorder ? '' : 'border-b border-brand-black-light'
      } ${className || ''}`}>
      <div className="text-sm p-2.5 h-full font-semibold bg-slate-50 border-r border-brand-black-light">
        {title}
      </div>
      <div className="text-sm py-2.5 pr-2.5 text-left break-words">{value}</div>
    </div>
  ) : null;
};

export default InfoBox;
