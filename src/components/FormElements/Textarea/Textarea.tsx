import { FC, TextareaHTMLAttributes } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export interface TextareaProps {
  props?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  error?: string;
}

const Textarea: FC<TextareaProps> = ({ props, error }) => {
  return (
    <div className="flex w-ful flex-col">
      <div className="relative flex w-full">
        <textarea
          className={`text-base h-[160px] resize-none px-4 py-3 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded border-brand-black-light focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary`}
          id={`${props?.name}-textarea-id`}
          {...props}
        />
        {props?.placeholder && (
          <label
            htmlFor={`${props?.name}-textarea-id`}
            className={`peer-placeholder-shown:text-base left-3 peer-focus:text-xs text-xs top-0 peer-placeholder-shown:text-brand-black-secondary peer-focus:top-0 peer-focus:text-brand-palette-primary peer-focus:font-medium transform -translate-y-1/2 absolute bg-white peer-placeholder-shown:top-6 !leading-none px-1 cursor-text text-brand-black-primary transition-[top,font-size]`}>
            {props.placeholder}
          </label>
        )}
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export default Textarea;
