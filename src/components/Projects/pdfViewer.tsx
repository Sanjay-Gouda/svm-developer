import { Button } from '@windmill/react-ui';
import React from 'react';

const PdfViewer = ({ name, url, handleRemove }) => {
  return (
    <>
      <div className='flex items-center justify-center gap-2'>
        <div className='group flex items-center rounded-lg  bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-200 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'>
          <div className='w-60'>
            <span className='ms-3 flex-1 whitespace-nowrap'>
              {/* {file?.name} */}

              {name}
            </span>
          </div>
          <span className='ms-3 inline-flex items-center justify-center rounded  px-2 py-0.5 text-xs font-medium text-gray-500  dark:text-gray-400'>
            <Button size='regular' layout='link'>
              <a
                target='_blank'
                href={url}
                rel='noopener noreferrer'
                className='text-[#143fcd]'
                // style={{ color: '#143fcd !important' }}
              >
                View
              </a>
            </Button>
            <Button
              size='regular'
              layout='link'
              className='text-red-500 dark:text-red-500'
              onClick={handleRemove}
            >
              Remove
            </Button>
          </span>
        </div>
      </div>
    </>
  );
};

export default PdfViewer;
