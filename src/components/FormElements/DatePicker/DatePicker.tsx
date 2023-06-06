import { FC, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { useOnClickOutside } from 'usehooks-ts';
import Calendar from '../../Calendar/Calendar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface DatePickerProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (val?: Date) => void;
  selectedDate?: Date;
}

const DatePicker: FC<DatePickerProps> = ({
  label,
  disabled,
  error,
  onChange,
  selectedDate
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = () => {
    setOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);
  return (
    <div
      ref={ref}
      className={`select-none relative flex flex-col w-full ${
        disabled ? 'opacity-70 cursor-not-allowed' : ''
      }`}>
      {selectedDate && (
        <button
          type="button"
          className={`absolute z-20 flex items-center justify-center w-5 h-5 right-[13px] top-[16px] transfrom`}
          onClick={() => {
            onChange(undefined);
          }}>
          <XMarkIcon
            className={`w-5 stroke-2 h-5 ${
              open ? 'text-brand-palette-primary' : 'text-brand-black-secondary'
            }`}
          />
        </button>
      )}
      <div
        onClick={() => {
          setOpen(disabled ? false : !open);
        }}
        className={`relative cursor-pointer z-10 flex items-center justify-between w-full h-[50px] px-4 text-base font-normal bg-white border rounded text-brand-black-primary ${
          open
            ? 'border-brand-palette-primary ring-1 ring-brand-palette-primary'
            : 'border-brand-black-light'
        }`}>
        {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null}
        <span
          className={`absolute transform -translate-y-1/2 left-3 !leading-none transition-all px-1 bg-white ${
            selectedDate || open
              ? `text-xs font-medium ${
                  open
                    ? 'text-brand-palette-primary'
                    : 'text-brand-black-primary'
                } top-0`
              : 'text-brand-black-secondary top-1/2'
          }`}>
          {disabled ? 'Disabled' : label}
        </span>
      </div>

      <ErrorMessage error={error} />

      {selectedDate && (
        <button
          type="button"
          className={`absolute z-20 flex items-center justify-center w-5 h-5 right-[13px] top-[16px] transfrom`}
          onClick={() => {
            onChange(undefined);
            setOpen(false);
          }}>
          <XMarkIcon
            className={`w-5 stroke-2 h-5 ${
              open ? 'text-brand-palette-primary' : 'text-brand-black-secondary'
            }`}
          />
        </button>
      )}
      {open && (
        <div
          className={`absolute w-[280px] md:w-[308px] p-4 left-0 rounded shadow-container z-50 bg-white text-sm text-brand-black-primary top-[55px]`}>
          <Calendar
            onSelect={(e) => {
              onChange(e);
              setOpen(false);
            }}
            selected={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
