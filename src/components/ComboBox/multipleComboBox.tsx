import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

import { customerNameProps } from '@/components/Booking/bookingFormTypes';

// const people = [
//   { id: 1, name: 'Wade Cooper' },
//   { id: 2, name: 'Arlene Mccoy' },
//   { id: 3, name: 'Devon Webb' },
//   { id: 4, name: 'Tom Cook' },
//   { id: 5, name: 'Tanya Fox' },
//   { id: 6, name: 'Hellen Schmidt' },
// ];

type TCustomerDetails = {
  id: string;
  name: string;
}[];

type TMultiSelectprops = {
  selected: unknown;
  setSelected: (person: customerNameProps) => void;
  filteredCustomer: TCustomerDetails;
  query: string;
  afterLeave: () => void;
  hadnleSearchQuery: (e: unknown) => void;
};

export default function MultipleSelect({
  selected,
  setSelected,
  filteredCustomer,
  query,
  afterLeave,
  hadnleSearchQuery,
}: TMultiSelectprops) {
  const filteredPeople =
    query === ''
      ? filteredCustomer
      : filteredCustomer.filter((person) =>
          person.name
            .toLowerCase()

            .includes(query.toLowerCase())
        );

  return (
    <>
      <div className=''>
        <Combobox value={selected} onChange={setSelected} multiple>
          <div className='relative mt-1'>
            <div className=''>
              <Combobox.Input
                className='mt-1 block w-full rounded-md border-gray-300 bg-slate-50 text-sm leading-5 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300  dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-gray-600 dark:focus:ring-gray-300'
                value={selected?.map((person) => person.name).join(', ')}
                onChange={hadnleSearchQuery}
              />
              <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  // aria-hidden='true'
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={afterLeave}
            >
              <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-700 dark:text-gray-300'>
                {filteredCustomer.length === 0 && query !== '' ? (
                  <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                    Nothing found.
                  </div>
                ) : (
                  filteredCustomer.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-blue-600 text-white dark:text-white'
                            : 'text-black dark:text-white'
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                              }`}
                            >
                              <CheckIcon className='h-5 w-5' />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
}
