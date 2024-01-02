import React, { useState } from 'react';

import CustomerForm from '@/components/Customers/customerForm';
import AadharcardContainer from '@/components/Customers/Documents/AadharCard';
import PancardContainer from '@/components/Customers/Documents/Pancard';
import PassPhotoContainer from '@/components/Customers/Documents/Passphoto';
import Stepper from '@/components/Stepper/Stepper';

const CustomerCollection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<any>([]);

  const steps = [
    'Customer Info',
    'Passphoto',
    'Aadhard Card',
    'Pan / Voting Card',
  ];
  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // const handleBack = () => {
  //   if (currentStep === 1) {
  //     return currentStep;
  //     // setCurrentStep((prev) => prev - 1);
  //   } else {
  //     setCurrentStep((prev) => prev - 1);
  //   }
  // };

  const handleComplete = () => {
    setComplete(true);
  };

  return (
    <>
      <div className='flex items-center justify-center'>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          complete={complete}
          handleNextStep={handleNextStep}
          handleComplete={handleComplete}
        />
      </div>

      {currentStep === 1 ? (
        <CustomerForm
          handleNextStep={handleNextStep}
          setCustomerDetails={setCustomerDetails}
        />
      ) : currentStep === 2 ? (
        <PassPhotoContainer
          handleNextStep={handleNextStep}
          customerId={customerDetails?.customerId || ''}
        />
      ) : currentStep === 3 ? (
        <AadharcardContainer
          handleNextStep={handleNextStep}
          customerId={customerDetails?.customerId || ''}
        />
      ) : (
        <PancardContainer customerId={customerDetails?.customerId || ''} />
      )}
    </>
  );
};

export default CustomerCollection;
