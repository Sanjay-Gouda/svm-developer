import { Button } from '@windmill/react-ui';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDropzone } from 'react-dropzone';

import AadharCardPlaceholder from '@/components/Booking/aadharCardPlaceholder';

import { httpInstance } from '@/constants/httpInstances';

type Tdocument = {
  customerId: string;
};

const PancardContainer = ({ customerId }: Tdocument) => {
  const [panCard, setPanCard] = useState<any>([]);

  const handlePanCard = (acceptedFiles: any) => {
    setPanCard((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const panCardDropZone = useDropzone({
    onDrop: handlePanCard,
    multiple: false,
  });

  const handleUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < panCard.length; i++) {
      formData.append('panImages', panCard[i]);
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
      // handleNextStep();

      console.log(res);
    } catch (err) {
      // handleNextStep();
      console.log(err);
    }
  };

  return (
    <>
      <div className='mt-8 flex w-full flex-col items-center justify-center gap-5'>
        <h3 className='text-xl text-black dark:text-white'>
          Upload Client's Pancard / Voting card
        </h3>
        <div className='flex w-[60%] justify-center gap-8'>
          <AadharCardPlaceholder
            setImageArray={setPanCard}
            files={panCard}
            {...panCardDropZone}
            placeholder='Upload Clients pancard/votingcard'
          />
        </div>

        <div className='mt-8 flex w-[60%] items-end justify-end'>
          <Button
            size='regular'
            // onClick={() => onComplete('form')}
            // onClick={handleNextStep}
            layout='link'
            className='mr-auto'
          >
            Skip
          </Button>

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

export default PancardContainer;
