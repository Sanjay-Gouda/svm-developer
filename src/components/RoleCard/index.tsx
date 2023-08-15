import React from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

type TcardProps = {
  label: string;
  permissions: any;
  handleEdit: () => void;
};

const Rolecard = ({ label, permissions, handleEdit }: TcardProps) => {
  return (
    <>
      <div className='w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8'>
        <div className='flex justify-between'>
          <h5 className='mb-4 text-base font-bold text-gray-900 dark:text-white'>
            {label.toUpperCase()}
          </h5>
          <div className='flex gap-4'>
            <MdModeEditOutline
              size='24'
              className='cursor-pointer'
              onClick={handleEdit}
              style={{ color: ' #30bcc2' }}
            />
            <MdDelete
              size='24'
              className='cursor-pointer'
              style={{ color: ' #F38C7F' }}
            />
          </div>
        </div>

        <ul role='list' className='my-7 space-y-5'>
          {permissions?.map((permission) => {
            return (
              <li
                className='flex items-center space-x-3'
                key={permission?.permissionId}
              >
                <svg
                  className='h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400'>
                  {permission?.label}
                </span>
              </li>
            );
          })}
        </ul>
        {/* <button
          type='button'
          className='inline-flex w-full justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900'
        >
          Choose plan
        </button> */}
      </div>
    </>
  );
};

export default Rolecard;
