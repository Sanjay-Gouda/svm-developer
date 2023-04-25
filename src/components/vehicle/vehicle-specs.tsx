import React from 'react';

import { Details } from '@/components/ui-blocks';

export const VehicleSpecification = () => {
  return (
    <div className='flex-1'>
      <div className='grid grid-cols-2 gap-2'>
        <Details label='Vehicle ID' value='1234' />
        <Details label='Manufacture Company Name' value='Skoda' />
        <Details label='Engine Number' value='123456789' />
        <Details label='Chassis Number' value='123456789' />
        <Details label='Vehicle Type' value='Car' />
        <Details label='Registration Year' value='2019' />
        <Details label='Vehicle Number' value='MH 12 AB 1234' />
      </div>
    </div>
  );
};
