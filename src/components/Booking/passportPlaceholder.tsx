import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

const PassportPlaceholder = ({
  files,
  getRootProps,
  getInputProps,
  isDragActive,
  placeholder,
  setImageArray,
}: any) => {
  // console.log(files[0]?.name);

  console.log(setImageArray, 'array list');

  const handleRemove = (name) => {
    const remove = files.filter((images) => {
      return images.name !== name;
    });

    setImageArray(remove);
  };

  return (
    <>
      <div className='relative flex h-48 w-48'>
        {files?.length > 0 ? (
          <>
            <ImCancelCircle
              size={30}
              onClick={() => handleRemove(files[0]?.name)}
              className=' absolute right-[-18px] top-[-14px] cursor-pointer text-gray-950 dark:text-gray-50'
            />
            ;
            {files?.map((files, ind) => {
              console.log(files.name);
              return (
                <div
                  className='h-48 w-48 overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
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

export default PassportPlaceholder;
