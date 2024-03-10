import { Button } from '@windmill/react-ui';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useDropzone } from 'react-dropzone';

import PassportPlaceholder from '@/components/Booking/passportPlaceholder';

import { httpInstance } from '@/constants/httpInstances';

type Tpassphoto = {
  handleNextStep: () => void;
  customerId: string;
};

const PassPhotoContainer = ({ customerId, handleNextStep }: Tpassphoto) => {
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

  const handleUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < passPhoto.length; i++) {
      formData.append('customerImage', passPhoto[i]);
    }
    for (let i = 0; i < secondPassphoto.length; i++) {
      formData.append('customerImage', secondPassphoto[i]);
    }
    for (let i = 0; i < thirdPassphoto.length; i++) {
      formData.append('customerImage', thirdPassphoto[i]);
    }

    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const res = await httpInstance.patch(
        `customer/upload/customer-image/${customerId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleNextStep();

      console.log(res);
    } catch (err) {
      handleNextStep();
      console.log(err);
    }
  };

  return (
    <>
      <div className='mt-8 flex w-full flex-col items-center justify-center gap-10'>
        <div className='flex w-[60%] justify-center gap-8'>
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
        <div className='flex w-[60%]'>
          <Button
            size='regular'
            onClick={handleUpload}
            className='col-span-2 ml-auto mt-8'
          >
            Save & Next
          </Button>
          {/* <Button
            size='regular'
            onClick={handleUpload}
            className='col-span-2 ml-auto mt-8'
          >
            Skip
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default PassPhotoContainer;
