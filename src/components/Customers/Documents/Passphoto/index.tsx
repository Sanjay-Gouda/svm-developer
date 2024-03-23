import { Button } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
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
  // const [thirdPassphoto, setThirdPassphoto] = useState<any>([]);
  // const [secondPassphoto, setSecondPassphoto] = useState<any>([]);
  const [isDisable, setIsDisable] = useState(true);
  const [loader, setLoader] = useState(false);
  const handleFirstpassPhoto = (acceptedFiles: any) => {
    setPassPhoto((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  // const handleThirdPassPhoto = (acceptedFiles: any) => {
  //   setThirdPassphoto((prevFiles: any) => [
  //     ...prevFiles,
  //     ...acceptedFiles.map((file: any) =>
  //       Object.assign(file, { preview: URL.createObjectURL(file) })
  //     ),
  //   ]);
  // };

  // const handleSecondpassPhoto = (acceptedFiles: any) => {
  //   setSecondPassphoto((prevFiles: any) => [
  //     ...prevFiles,
  //     ...acceptedFiles.map((file: any) =>
  //       Object.assign(file, { preview: URL.createObjectURL(file) })
  //     ),
  //   ]);
  // };

  const firstPassphotoDropzone = useDropzone({
    onDrop: handleFirstpassPhoto,
    multiple: false,
    accept: { 'image/png': ['.png', '.jpg', '.jpeg'] },
  });

  useEffect(() => {
    if (passPhoto.length > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [passPhoto]);

  const handleUpload = async () => {
    const formData = new FormData();
    setLoader(true);

    for (let i = 0; i < passPhoto.length; i++) {
      formData.append('customerImage', passPhoto[i]);
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoader(false);
      handleNextStep();
    } catch (err) {
      handleNextStep();
      console.log(err, 'ERROR IMAGE');
      setLoader(false);
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
            placeholder='Upload Clients passphoto'
          />
          {/* <PassportPlaceholder
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
          /> */}
        </div>
        <div className='mt-8 flex w-[60%] items-end justify-end gap-5'>
          <Button size='regular' onClick={handleNextStep} layout='link'>
            Skip
          </Button>
          <Button
            size='regular'
            onClick={handleUpload}
            disabled={isDisable}
            className='col-span-2  mt-8'
          >
            {loader ? 'Saving...' : 'Save & Next'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PassPhotoContainer;
