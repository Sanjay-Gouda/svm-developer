import React from 'react';
import DatePicker from 'react-datepicker';
import { MdDateRange } from 'react-icons/md';

import 'react-datepicker/dist/react-datepicker.css';

type TDate = {
  selected: Date | null;
  name: string;
  onChange: (date: Date) => void;
};

const DateSelector = ({ selected, onChange, name }: TDate) => {
  return (
    <>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 start-0 z-40 flex items-center ps-3'>
          <MdDateRange size={20} />
        </div>
        <DatePicker
          name={name}
          selected={selected}
          onChange={onChange}
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholderText='DD-MM-YYYY'
          showYearDropdown
          scrollableYearDropdown
          popperPlacement='bottom'
        />
      </div>
    </>
  );
};

export default DateSelector;
