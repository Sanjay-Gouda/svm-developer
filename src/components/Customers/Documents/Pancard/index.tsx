import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import AadharCardPlaceholder from '@/components/Booking/aadharCardPlaceholder';

const PancardContainer = () => {
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
      </div>
    </>
  );
};

export default PancardContainer;
