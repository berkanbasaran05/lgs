import { FC, ReactNode } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ErrorViewProps {
  content: ReactNode;
}
const ErrorView: FC<ErrorViewProps> = ({ content }) => {
  return (
    <div className="px-4 flex items-center py-2 w-full bg-brand-red-primaryLight border border-brand-red-primary text-brand-red-primary font-medium rounded">
      <ExclamationCircleIcon className="w-5 mr-1.5 h-5" />
      <span className="leading-none">{content}</span>
    </div>
  );
};

export default ErrorView;
