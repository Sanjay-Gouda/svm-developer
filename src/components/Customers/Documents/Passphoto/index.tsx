import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import PassportPlaceholder from '@/components/Booking/passportPlaceholder';

const PassPhotoContainer = () => {
  const [passPhoto, setPassPhoto] = useState<any>([]);
  const [thirdPassphoto, setThirdPassphoto] = useState<any>([]);
  const [secondPassphoto, setSecondPassphoto] = useState<any>([]);

  const handleFirstpassPhoto = (acceptedFiles: any) => {
    setPassPhoto((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const handleThirdPassPhoto = (acceptedFiles: any) => {
    setThirdPassphoto((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const handleSecondpassPhoto = (acceptedFiles: any) => {
    setSecondPassphoto((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const firstPassphotoDropzone = useDropzone({
    onDrop: handleFirstpassPhoto,
    multiple: false,
  });

  const secondPassphotoDropzone = useDropzone({
    onDrop: handleSecondpassPhoto,
    multiple: false,
  });

  const thirdPassPhotoDropZone = useDropzone({
    onDrop: handleThirdPassPhoto,
    multiple: false,
  });
  return (
    <>
      <div className='mt-8 flex w-full flex-col items-center justify-center gap-10'>
        <div className='flex w-[60%] justify-between gap-8'>
          <PassportPlaceholder
            files={passPhoto}
            setImageArray={setPassPhoto}
            {...firstPassphotoDropzone}
            placeholder='Upload Clients first passphoto'
          />
          <PassportPlaceholder
            files={secondPassphoto}
            setImageArray={setSecondPassphoto}
            {...secondPassphotoDropzone}
            placeholder='Upload Clients second passphoto'
          />
          <PassportPlaceholder
            setImageArray={setThirdPassphoto}
            files={thirdPassphoto}
            {...thirdPassPhotoDropZone}
            placeholder='Upload Clients third passphoto'
          />
        </div>
      </div>
    </>
  );
};

export default PassPhotoContainer;
