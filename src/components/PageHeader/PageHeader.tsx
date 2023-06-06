import { ReactNode } from 'react';

export default function PageHeader({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`w-full px-5 bg-white shadow-md border-b border-gray-300 h-[62px] ${
        className || ''
      }`}>
      {children}
    </div>
  );
}
