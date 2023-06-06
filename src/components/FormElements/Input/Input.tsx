import { FC, InputHTMLAttributes } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export interface InputProps {
  props?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  type?: string;
  pattern?: string;
  onBlur?: (e: any) => void;
}

const Input: FC<InputProps> = ({ props, error, type, pattern, onBlur }) => {
  return (
    <div className="flex w-full flex-col">
      {props?.placeholder && (
          <label
            htmlFor={`${props?.name}-input-id`}
            style={{ whiteSpace: 'nowrap' }}
            className="top-0 left-0 relative px-2 text-[8px] text-black-300">
            {props.placeholder}
          </label>
        )}
      <div className="relative w-full">
      
        <input
          pattern={pattern}
          type={type}
          className={`text-base px-4 disabled:opacity-80 py-3 w-full peer placeholder-transparent font-thin border text-brand-black-primary rounded border-brand-black-light focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary`}
          id={`${props?.name}-input-id`}
          {...props}
          onBlur={onBlur}
        />
        
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export default Input;
