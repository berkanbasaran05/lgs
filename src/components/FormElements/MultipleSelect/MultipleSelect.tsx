import { FC, ReactNode, useRef, useState } from 'react';
import {
  XMarkIcon,
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useOnClickOutside } from 'usehooks-ts';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface SelectProps {
  options: {
    value: string | number;
    filterValue?: string;
    label: string | ReactNode;
  }[];
  selecteds?: (string | number)[];
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: (string | number)[] | undefined) => void;
  error?: string;
  label: string;
}

const Select: FC<SelectProps> = ({
  error,
  onChange,
  disabled,
  selecteds,
  label,
  options
}) => {
  const [open, setOpen] = useState(false);
  const [optionsState, setOptionState] = useState(options);

  const selectRef = useRef(null);
  const handleClickOutside = () => {
    setOpen(false);
    setOptionState(options);
  };
  useOnClickOutside(selectRef, handleClickOutside);

  return (
    <div
      ref={selectRef}
      className={`select-none relative flex flex-col w-full ${
        disabled ? 'opacity-70 cursor-not-allowed' : ''
      }`}>
      <div
        onClick={() => {
          if (!disabled) {
            setOpen(!open);
            setOptionState(options);
          }
        }}
        className={`relative cursor-pointer z-10 flex items-center justify-between w-full px-4 text-base h-[50px] bg-white border rounded text-brand-black-primary ${
          open
            ? 'border-brand-palette-primary ring-1 ring-brand-palette-primary'
            : 'border-brand-black-light'
        }`}>
        <span className="truncate pr-2">
          {selecteds &&
            selecteds.length > 0 &&
            options
              ?.filter((option) => selecteds.some((e) => e === option.value))
              .map((e) => e.label)
              .join(', ')}
        </span>
        <span
          className={`absolute transform -translate-y-1/2 left-3 !leading-none transition-all px-1 bg-white ${
            (selecteds && selecteds.length > 0) || open
              ? `text-xs ${
                  open
                    ? 'text-brand-palette-primary'
                    : 'text-brand-black-primary'
                } top-0`
              : 'text-brand-black-secondary text-base top-1/2'
          }`}>
          {label}
        </span>
        {selecteds && selecteds.length === 0 && (
          <ChevronDownIcon
            className={`w-5 h-5 ml-auto stroke-2 transform transition-transform duration-200 ${
              open
                ? 'rotate-180 text-brand-palette-primary '
                : 'rotate-0 text-brand-black-secondary '
            }`}
          />
        )}
        {selecteds && selecteds.length > 0 && (
          <button
            type="button"
            className={`ml-auto flex items-center justify-center w-5 h-5`}
            onClick={() => {
              onChange(undefined);
            }}>
            <XMarkIcon
              className={`w-5 stroke-2 h-5 ${
                open
                  ? 'text-brand-palette-primary'
                  : 'text-brand-black-secondary'
              }`}
            />
          </button>
        )}
      </div>

      <ErrorMessage error={error} />

      {open && (
        <div
          className={`absolute bg-white shadow-container left-0 z-50 w-full rounded overflow-y-auto text-base origin-top max-h-64 animate-enterSelect text-brand-black-primary top-[58px]`}>
          {options[0]?.filterValue && (
            <div className="w-full sticky left-0 top-0">
              <input
                onChange={(e) => {
                  setOptionState(
                    options.filter((option) =>
                      option.filterValue
                        ?.toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  );
                }}
                placeholder="Arayınız"
                className="w-full px-4 py-2.5 text-sm border-b border-brand-palette-primary focus:ring-brand-palette-primary focus:outline-none focus:ring-1 rounded-t"
              />
            </div>
          )}

          {optionsState.length === 0 ? (
            <div className={`px-4 py-2.5 select-none`}>
              Kullanılabilir Seçenek Yok
            </div>
          ) : (
            optionsState.map((option) => (
              <div
                onClick={() => {
                  setOptionState(options);
                  if (selecteds?.some((e) => e === option.value))
                    onChange(selecteds.filter((e) => e !== option.value));
                  else {
                    onChange(
                      selecteds ? [...selecteds, option.value] : [option.value]
                    );
                  }
                }}
                className={`px-4 flex items-center justify-start py-2.5 select-none cursor-pointer lg:hover:bg-brand-palette-primaryLight ${
                  selecteds?.some((e) => e === option.value)
                    ? 'bg-brand-palette-primaryLight'
                    : ''
                }`}
                key={option.value}>
                {selecteds?.some((e) => e === option.value) && (
                  <CheckIcon className="w-[18px] h-[18px] mr-2 text-brand-palette-primary stroke-2" />
                )}{' '}
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
