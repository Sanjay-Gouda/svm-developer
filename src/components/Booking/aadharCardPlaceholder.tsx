import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

const AadharCardPlaceholder = ({
  files,
  getRootProps,
  getInputProps,
  isDragActive,
  placeholder,
}: any) => {
  return (
    <>
      <div className='relative flex h-48 w-96 '>
        {files.length > 0 ? (
          <>
            <ImCancelCircle
              size={30}
              className=' absolute right-[-18px] top-[-14px] text-purple-600 '
            />
            {files.map((files, ind) => {
              return (
                <div
                  className='h-48 w-96  overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
                  key={ind}
                >
                  <img
                    className='h-full w-full  object-cover'
                    src={files.preview}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <label
            for='dropzone-file'
            className='dark:hover:bg-bray-800 flex h-full w-full 
                  cursor-pointer flex-col items-center justify-center rounded-lg 
                  border-2 border-dashed border-gray-300 bg-gray-50 p-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            <div
              {...getRootProps()}
              className='flex h-full items-center justify-center text-gray-900   dark:text-gray-400'
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p className='text-center'>{placeholder}</p>
              )}
            </div>
          </label>
        )}
      </div>
    </>
  );
};

export default AadharCardPlaceholder;
