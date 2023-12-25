import React from 'react';

type TImageCard = {
  key: string;
  url: string;
};

const ImageCard = ({ url }: TImageCard) => {
  return (
    <>
      <div className='h-36 w-[230px] overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
        <img className='h-full w-full  object-cover' src={url} />
      </div>
    </>
  );
};

export default ImageCard;
