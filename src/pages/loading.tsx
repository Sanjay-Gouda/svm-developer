import React from 'react';

const Loading = () => {
  return (
    <>
      <div className='flex h-screen flex-col items-center  justify-center gap-5 space-x-2 bg-white dark:invert'>
        <div className='flex items-center justify-center space-x-2'>
          <div className='h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.3s]'></div>
          <div className='h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.15s]'></div>
          <div className='h-8 w-8 animate-bounce rounded-full bg-black'></div>
        </div>
        <div>
          <span className='block text-2xl font-semibold text-black dark:text-white'>
            Hold On...
          </span>
        </div>
      </div>
    </>
  );
};

export default Loading;
