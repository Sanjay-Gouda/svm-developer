import { Button } from '@windmill/react-ui';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDropzone } from 'react-dropzone';

import AadharCardPlaceholder from '@/components/Booking/aadharCardPlaceholder';

import { httpInstance } from '@/constants/httpInstances';

type Tdocument = {
  handleNextStep: () => void;
  customerId: string;
};

const AadharcardContainer = ({ customerId, handleNextStep }: Tdocument) => {
  const [frontAadharCard, setFrontAadharCard] = useState<any>([]);
  const [backAadharCard, setBackAadharCard] = useState<any>([]);

  const handleFrontSideAadharCard = (acceptedFiles: any) => {
    setFrontAadharCard((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const handleBackSideAadhardCard = (acceptedFiles: any) => {
    setBackAadharCard((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const frontSideAadharCard = useDropzone({
    onDrop: handleFrontSideAadharCard,
    multiple: false,
  });
  const backSideAadharCard = useDropzone({
    onDrop: handleBackSideAadhardCard,
    multiple: false,
  });

  const handleUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < frontAadharCard.length; i++) {
      formData.append('aadharImages', frontAadharCard[i]);
    }
    for (let i = 0; i < backAadharCard.length; i++) {
      formData.append('aadharImages', backAadharCard[i]);
    }

    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const res = await httpInstance.patch(
        `customer/upload/aadhar-image/${customerId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleNextStep();

      console.log(res);
    } catch (err) {
      // handleNextStep();
      console.log(err);
    }
  };

  return (
    <>
      <div className='mt-8 flex w-full flex-col items-center justify-center gap-10'>
        <div className='flex w-[60%] justify-between gap-8'>
          <AadharCardPlaceholder
            setImageArray={setFrontAadharCard}
            files={frontAadharCard}
            {...frontSideAadharCard}
            placeholder='Upload Clients frontside of Aadharcard'
          />
          <AadharCardPlaceholder
            setImageArray={setBackAadharCard}
            files={backAadharCard}
            {...backSideAadharCard}
            placeholder='Upload Clients backside of Aadharcard'
          />
        </div>

        <div className='mt-8 flex w-[60%] items-end justify-end'>
          {/* <Button
            size='regular'
            // onClick={() => onComplete('form')}
            // onClick={handleNextStep}
            layout='link'
            className='mr-auto'
          >
            Skip
          </Button> */}

          <Button
            size='regular'
            onClick={handleUpload}
            className='col-span-2 ml-auto mt-4'
          >
            Save & Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default AadharcardContainer;
