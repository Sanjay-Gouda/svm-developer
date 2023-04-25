import Image from 'next/image';
import React from 'react';

import classNames from './vehicles.module.css';

export const VehicleImages = () => {
  return (
    <div
      className={`flex max-w-full flex-1 gap-5 overflow-auto ${classNames.scroll_image_container}`}
    >
      <Image
        src='https://images.pexels.com/photos/15194851/pexels-photo-15194851.jpeg?cs=srgb&dl=pexels-emrah-ayvali-15194851.jpg&fm=jpg&_gl=1*bpuesw*_ga*NzY5NzU0NjUzLjE2ODA5NDk2MjY.*_ga_8JE65Q40S6*MTY4MDk0OTYyNy4xLjEuMTY4MDk0OTY3MC4wLjAuMA..'
        alt=''
        width={500}
        height={500}
        className='h-full w-full bg-red-200 object-cover'
      />
      <Image
        src='https://images.pexels.com/photos/15194851/pexels-photo-15194851.jpeg?cs=srgb&dl=pexels-emrah-ayvali-15194851.jpg&fm=jpg&_gl=1*bpuesw*_ga*NzY5NzU0NjUzLjE2ODA5NDk2MjY.*_ga_8JE65Q40S6*MTY4MDk0OTYyNy4xLjEuMTY4MDk0OTY3MC4wLjAuMA..'
        alt=''
        width={500}
        height={500}
        className='h-full w-full bg-red-200 object-cover'
      />
      <Image
        src='https://images.pexels.com/photos/15194851/pexels-photo-15194851.jpeg?cs=srgb&dl=pexels-emrah-ayvali-15194851.jpg&fm=jpg&_gl=1*bpuesw*_ga*NzY5NzU0NjUzLjE2ODA5NDk2MjY.*_ga_8JE65Q40S6*MTY4MDk0OTYyNy4xLjEuMTY4MDk0OTY3MC4wLjAuMA..'
        alt=''
        width={500}
        height={500}
        className='h-full w-full bg-red-200 object-cover'
      />
    </div>
  );
};
