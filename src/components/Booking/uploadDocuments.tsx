import { Button } from '@windmill/react-ui';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import AadharCardPlaceholder from '@/components/Booking/aadharCardPlaceholder';
import PassportPlaceholder from '@/components/Booking/passportPlaceholder';

type formProps = {
  // onComplete?: (type: bookingComponetTypes) => void;
  handleGoBack?: () => void;
  handleDocumentSubmit: () => void;
  passPhoto: [];
  setPassphoto: (e: any) => void;
  secondPassphoto: [];
  setSecondPassphoto: (e: any) => void;
  thirdPassphoto: [];
  setThirdPassphoto: (e: any) => void;
  frontAadharCard: [];
  setFrontAadharCard: (e: any) => void;
  backAadharCard: [];
  setBackAadharCard: (e: any) => void;
  panCard: [];
  setPanCard: (e: any) => void;
};

const UploadDocuments = ({
  handleGoBack,
  backAadharCard,
  frontAadharCard,
  panCard,
  passPhoto,
  secondPassphoto,
  setBackAadharCard,
  setFrontAadharCard,
  setPanCard,
  setPassphoto,
  setSecondPassphoto,
  setThirdPassphoto,
  thirdPassphoto,
  handleDocumentSubmit,
}: formProps) => {
  const handlePanCard = (acceptedFiles: any) => {
    setPanCard((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };
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
  const handleFirstpassPhoto = (acceptedFiles: any) => {
    setPassphoto((prevFiles: any) => [
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
  const frontSideAadharCard = useDropzone({
    onDrop: handleFrontSideAadharCard,
    multiple: false,
  });
  const backSideAadharCard = useDropzone({
    onDrop: handleBackSideAadhardCard,
    multiple: false,
  });
  const panCardDropZone = useDropzone({
    onDrop: handlePanCard,
    multiple: false,
  });

  return (
    <>
      <>
        <div className='flex w-full flex-col items-center justify-center gap-10'>
          <h3 className='text-xl text-black dark:text-white'>
            Upload Client's Passphoto
          </h3>
          <div className='flex w-[60%] justify-between gap-8'>
            <PassportPlaceholder
              files={passPhoto}
              setImageArray={setPassphoto}
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

          <h3 className='text-xl text-black dark:text-white'>
            Upload Client's Aadhar Card
          </h3>

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

          <h3 className='text-xl text-black dark:text-white'>
            Upload Client's pancard / Voting card
          </h3>

          <div className='flex w-[60%] justify-center gap-8'>
            <AadharCardPlaceholder
              setImageArray={setPanCard}
              files={panCard}
              {...panCardDropZone}
              placeholder='Upload Clients pancard/votingcard'
            />
          </div>

          <div className='mt-3 flex w-[60%] items-center justify-between'>
            <Button
              size='regular'
              // onClick={() => onComplete('form')}
              onClick={handleGoBack}
              layout='link'
              className='mr-auto'
            >
              Go Back
            </Button>
            <Button
              size='regular'
              // onClick={() => onComplete('siteImages')}
              onClick={() => handleDocumentSubmit()}
              className='col-span-2 ml-auto'
            >
              Submit
            </Button>
          </div>
        </div>
      </>
    </>
  );
};

export default UploadDocuments;
