import React from 'react';
// import { MdDelete } from 'react-icons/md';
import { ImCancelCircle } from 'react-icons/im';

type TImageCard = {
  key?: string;
  url: string;
  isShowDeleteIcon?: boolean;
  handleRemove?: () => void;
};

const ImageCard = ({ url, isShowDeleteIcon, handleRemove }: TImageCard) => {
  return (
    <>
      <div className='relative flex w-[230px] flex-col gap-2'>
        <div className='h-36 w-full overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
          <img className='h-full w-full  object-cover' src={url} />
        </div>
        {isShowDeleteIcon && (
          <ImCancelCircle
            onClick={handleRemove}
            size={25}
            color='red'
            className='absolute right-[2px] top-0 cursor-pointer  text-gray-950  dark:text-gray-50'
          />
        )}
      </div>
    </>
  );
};

export default ImageCard;
