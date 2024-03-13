import React from 'react';
// import { MdDelete } from 'react-icons/md';
import { ImCancelCircle } from 'react-icons/im';

type TImageCard = {
  key: string;
  url: string;
  isShowDeleteIcon?: boolean;
};

const ImageCard = ({ url, isShowDeleteIcon }: TImageCard) => {
  return (
    <>
      <div className='relative flex w-[230px] flex-col gap-2'>
        <div className='h-36 w-full overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
          <img className='h-full w-full  object-cover' src={url} />
        </div>
        {isShowDeleteIcon && (
          <ImCancelCircle
            size={25}
            color='red'
            className='absolute right-[2px] top-0 cursor-pointer  text-gray-950  dark:text-gray-50'
          />
        )}
        {/* <button
          // onClick={onClick}
          className='rounded-full border border-red-500 px-4 py-2 text-red-500 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white focus:outline-none'
        >
          Remove
        </button> */}
      </div>
    </>
  );
};

export default ImageCard;
