import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

type imageProps = {
  file: string;
  handleRemove?: (name: string) => void;
};

function ImageContainer({ file, handleRemove }: imageProps) {
  return (
    <>
      <div className='relative'>
        <ImCancelCircle
          size={30}
          onClick={handleRemove}
          className='absolute right-[-18px] top-[-14px] cursor-pointer  text-gray-950  dark:text-gray-50'
        />
        <div className='h-36 w-[230px] overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
          <img className='h-full w-full  object-cover' src={file} />
        </div>
      </div>
    </>
  );
}

export default ImageContainer;
