import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import AadharCardPlaceholder from '@/components/Booking/aadharCardPlaceholder';

const AadharcardContainer = () => {
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
      </div>
    </>
  );
};

export default AadharcardContainer;
