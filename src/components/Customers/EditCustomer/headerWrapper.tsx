import { Button } from '@windmill/react-ui';
import React from 'react';

type THeaderProps = {
  heading: string;
  btnLable: string;
  onClick: () => void;
};

const HeaderWrapper = ({ heading, btnLable, onClick }: THeaderProps) => {
  return (
    <>
      <div className='flex w-full'>
        <p className=' inline-flex w-full items-center text-xl font-semibold text-black transition-colors duration-150 dark:text-white '>
          {heading}
        </p>
        <div className='flex w-[80%]'>
          <Button
            onClick={onClick}
            size='regular'
            className='col-span-2 ml-auto mt-3'
          >
            {btnLable}
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeaderWrapper;
