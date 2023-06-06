import React, { FC, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  subMonths,
  addMonths,
  isSameDay
} from 'date-fns';
import { tr } from 'date-fns/locale';

interface CalendarProps {
  onSelect: (date: Date) => void;
  selected?: Date;
}
const Calendar: FC<CalendarProps> = ({ onSelect, selected }) => {
  const [activeDate, setActiveDate] = useState(
    selected ? new Date(selected) : new Date()
  );
  const getHeader = () => {
    return (
      <div className="flex pb-2 mb-1.5 border-b border-brand-black-light justify-center items-center">
        <button
          type="button"
          className="flex items-center justify-center"
          onClick={() => setActiveDate(subMonths(activeDate, 1))}>
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="mx-2 text-base">
          {format(activeDate, 'MMMM yyyy', {
            locale: tr
          })}
        </h2>
        <button
          type="button"
          className="flex items-center justify-center"
          onClick={() => setActiveDate(addMonths(activeDate, 1))}>
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div className="flex text-xs md:text-sm justify-center items-center rounded p-1.5 text-left">
          {format(addDays(weekStartDate, day), 'E', {
            locale: tr
          })}
        </div>
      );
    }
    return (
      <div className="grid  md:grid-cols-[repeat(7,minmax(0,36px))] grid-cols-[repeat(7,minmax(0,32px))] gap-1">
        {weekDays}
      </div>
    );
  };

  const generateDatesForCurrentWeek = (date: any) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <button
          type="button"
          onClick={() => {
            onSelect(cloneDate);
          }}
          className={`flex justify-center items-center rounded p-1.5 text-left ${
            selected && isSameDay(currentDate, selected)
              ? 'bg-brand-palette-primaryLight text-brand-palette-primary'
              : 'hover:bg-brand-palette-primaryLight hover:text-brand-palette-primary'
          }`}>
          <span className="text-sm md:text-base">
            {format(currentDate, 'd', {
              locale: tr
            })}
          </span>
        </button>
      );
      currentDate = addDays(currentDate, 1);
    }
    return <>{week}</>;
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(generateDatesForCurrentWeek(currentDate));
      currentDate = addDays(currentDate, 7);
    }

    return (
      <div className="grid md:grid-cols-[repeat(7,minmax(0,36px))] grid-cols-[repeat(7,minmax(0,32px))] gap-1">
        {allWeeks}
      </div>
    );
  };

  return (
    <div className="h-min">
      {getHeader()}
      {getWeekDaysNames()}
      {getDates()}
    </div>
  );
};

export default Calendar;
