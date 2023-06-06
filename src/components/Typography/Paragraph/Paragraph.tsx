import { FC, ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
  variant: 'large' | 'small' | 'span';
  className?: string;
}
const Paragraph: FC<ParagraphProps> = ({ children, variant, className }) => {
  if (variant === 'small') {
    return (
      <p
        className={`text-sm font-normal text-brand-black-primary ${
          className || ''
        }`}
      >
        {children}
      </p>
    );
  }
  if (variant === 'span') {
    return (
      <span
        className={`text-sm font-normal text-brand-black-primary ${
          className || ''
        }`}
      >
        {children}
      </span>
    );
  }
  if (variant === 'large') {
    return (
      <p
        className={`text-sm font-normal md:text-base text-brand-black-primary ${
          className || ''
        }`}
      >
        {children}
      </p>
    );
  }

  return null;
};

export default Paragraph;
