import { FC } from 'react';

interface BadgeProps {
  text: string;
  color: 'red' | 'yellow' | 'primary' | 'green' | 'gray' | 'blue';
}

const Badge: FC<BadgeProps> = ({ color, text }) => {
  const classNameHelper = (variant: BadgeProps['color']) => {
    if (variant === 'red')
      return 'bg-brand-red-primaryLight text-brand-red-primary';
    if (variant === 'green')
      return 'bg-brand-green-primaryLight text-brand-green-primary';
    if (variant === 'yellow')
      return 'bg-brand-yellow-primaryLight text-brand-yellow-primary';
    if (variant === 'primary')
      return 'bg-brand-palette-primaryLight text-brand-palette-primary';
    if (variant === 'gray') return 'bg-slate-100 text-slate-500';
    if (variant === 'blue')
      return 'bg-brand-blue-primaryLight text-brand-blue-primary';
  };

  return (
    <span
      className={`select-none text-xs font-medium px-1 py-0.5 rounded ${classNameHelper(
        color
      )}`}>
      {text}
    </span>
  );
};

export default Badge;
