import React from 'react';

type TEditTab = {
  tabs: string[];
  activeTab: any;
  onTabChange: (id: string) => void;
};

const EditTab = ({ tabs, onTabChange, activeTab }: TEditTab) => {
  return (
    <>
      <div className='flex w-full flex-col items-center justify-center'>
        <nav
          className='relative z-0 flex w-[80%] overflow-hidden rounded-xl border dark:border-gray-700'
          aria-label='Tabs'
          role='tablist'
        >
          {tabs?.map((tab, ind) => (
            <button
              type='button'
              key={tab}
              className={`hs-tab-active:border-b-blue-600    
              }  hs-tab-active:text-gray-900 dark:hs-tab-active:text-white dark:hs-tab-active:border-b-blue-600 active relative min-w-0 flex-1 overflow-hidden border-b-2 border-s bg-white px-4 py-4 text-center text-sm font-medium text-gray-500 first:border-s-0   hover:bg-gray-50 hover:text-gray-700 focus:z-10 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-b-gray-700 dark:border-l-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700  dark:hover:text-gray-400`}
              id='bar-with-underline-item-1'
              data-hs-tab='#bar-with-underline-1'
              aria-controls='bar-with-underline-1'
              role='tab'
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default EditTab;
