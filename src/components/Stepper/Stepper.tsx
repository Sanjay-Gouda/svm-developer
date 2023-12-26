// }

import React from 'react';
import { TiTick } from 'react-icons/ti';

type TStepper = {
  steps: string[];
  currentStep: number;
  complete: boolean;
  handleNextStep: () => void;
  handleComplete: () => void;
};

// import './styles.css';
const Stepper = ({ steps, currentStep, complete }: TStepper) => {
  return (
    <>
      <div className='flex w-[80%] justify-between'>
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && 'active'} ${
              (i + 1 < currentStep || complete) && 'complete'
            } `}
          >
            <div className='step'>
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className='text-gray-500'>{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
