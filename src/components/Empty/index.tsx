import { Button, Card } from '@windmill/react-ui';
import Link from 'next/link';
import React from 'react';

const EmptyState = () => {
  return (
    <>
      <Card>
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='flex items-center justify-center'>
            <img
              className='h-64 w-64'
              src='https://res.cloudinary.com/daqsjyrgg/image/upload/v1690257804/jjqw2hfv0t6karxdeq1s.svg'
              alt='image empty states'
            />
          </div>
          <h1 className='mb-3 text-center text-2xl font-medium text-gray-700 dark:text-gray-300'>
            Create a Project and get organized!
          </h1>
          {/* <p className='mb-6 text-center text-gray-500 dark:text-gray-300'>
            Project are the backbones of time entry categorization in your
            workspace.
          </p> */}
          <div className='flex flex-col justify-center'>
            {/* <button className='flex items-center rounded bg-blue-500 px-4 py-2 text-white  hover:bg-blue-600'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='mr-2 h-6  w-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              Create New Project
            </button> */}
            <Button>
              <Link
                href='realEstateProjects/projectForm/add'
                className='flex items-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='mr-2 h-6  w-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                Create New Project
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default EmptyState;
