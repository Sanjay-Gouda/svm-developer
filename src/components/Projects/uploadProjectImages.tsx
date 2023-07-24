import { Button } from '@windmill/react-ui';
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadProjectImages = () => {
  const fileInputRef = useRef<any>(null);

  const [planningImages, setPlanningImages] = useState<any>([]);

  const handleDrop = (acceptedFiles: any) => {
    console.log(acceptedFiles, 'file');

    setPlanningImages((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  useEffect(() => {
    console.log(planningImages, 'images');
  }, [planningImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  const handleAddImages = () => {
    fileInputRef.current.click();
  };
  const handleClearImages = () => {
    setPlanningImages([]);
  };

  return (
    <>
      <div className=' mb-6 flex justify-between gap-2'>
        <label className='block text-lg font-medium leading-6 text-gray-900 dark:text-gray-300'>
          Planning Images
        </label>
        <div className='flex gap-2'>
          <Button
            size='regular'
            onClick={() => handleClearImages()}
            layout='link'
          >
            Clear Images
          </Button>
          <Button size='regular' onClick={() => handleAddImages()}>
            Add Images
          </Button>
        </div>
      </div>

      {planningImages?.length > 0 ? (
        <div className='auto relative flex w-full flex-wrap gap-6  rounded-lg  border-2 border-gray-300 p-2  dark:border-gray-600'>
          {planningImages?.map((file, ind) => {
            return (
              <div
                className='h-36 w-[230px] overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
                key={ind}
              >
                <img
                  className='h-full w-full  object-cover'
                  src={file?.preview}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className='flex w-full items-center justify-center'>
          <label
            htmlFor='dropzone-file'
            className='dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            <div
              {...getRootProps()}
              className='flex flex-col items-center justify-center pb-6 pt-5'
            >
              <svg
                className='mb-4 h-8 w-8 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 16'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                />
              </svg>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input {...getInputProps()} className='hidden' />
          </label>
        </div>
      )}
    </>
  );
};

export default UploadProjectImages;
