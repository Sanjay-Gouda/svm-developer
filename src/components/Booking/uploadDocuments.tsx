import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import AadharCardPlaceholder from '@/components/Booking/aadharCardPlaceholder';
import PassportPlaceholder from '@/components/Booking/passportPlaceholder';

const UploadDocuments = () => {
  const [files, setFiles] = useState<any>([]);

  const [passPhoto, setPassPhoto] = useState<any>([]);

  const handleDrop = (acceptedFiles: any) => {
    console.log('image upload', acceptedFiles);

    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };
  const handleFirstpassPhoto = (acceptedFiles: any) => {
    console.log('image upload', acceptedFiles);

    setPassPhoto((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone();

  const defaultDropzon = useDropzone({
    onDrop: handleDrop,
    multiple: false,
  });

  const firstPassphotoDropzone = useDropzone({
    onDrop: handleFirstpassPhoto,
    multiple: false,
  });

  console.log(firstPassphotoDropzone, 'zoe');

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop: handleDrop,
  //   multiple: false,
  // });

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop: handleDrop,
  //   multiple: false,
  // });

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
              setImageArray={setPassPhoto}
              {...firstPassphotoDropzone}
              // getRootProps={getRootProps()}
              // getInputProps={getInputProps()}
              // isDragActive={isDragActive}
              placeholder='Upload Clients first passphoto'
            />
            <PassportPlaceholder
              files={files}
              {...defaultDropzon}
              // getRootProps={getRootProps()}
              // getInputProps={getInputProps()}
              // isDragActive={isDragActive}
              placeholder='Upload Clients second passphoto'
            />
            <PassportPlaceholder
              files={files}
              {...defaultDropzon}
              // getRootProps={getRootProps()}
              // getInputProps={getInputProps()}
              // isDragActive={isDragActive}
              placeholder='Upload Clients third passphoto'
            />
          </div>

          <h3 className='text-xl text-black dark:text-white'>
            Upload Client's Aadhar Card
          </h3>

          <div className='flex w-[60%] justify-between gap-8'>
            <AadharCardPlaceholder
              files={files}
              {...defaultDropzon}
              // getRootProps={getRootProps()}
              // getInputProps={getInputProps()}
              // isDragActive={isDragActive}
              placeholder='Upload Clients frontside of Aadharcard'
            />
            <AadharCardPlaceholder
              files={files}
              {...defaultDropzon}
              // getRootProps={getRootProps()}
              // getInputProps={getInputProps()}
              // isDragActive={isDragActive}
              placeholder='Upload Clients backside of Aadharcard'
            />
          </div>

          <h3 className='text-xl text-black dark:text-white'>
            Upload Client's pancard / Voting card
          </h3>

          <div className='flex w-[60%] justify-center gap-8'>
            <AadharCardPlaceholder
              files={files}
              {...defaultDropzon}
              // getRootProps={getRootProps()}
              // getInputProps={getInputProps()}
              // isDragActive={isDragActive}
              placeholder='Upload Clients pancard/votingcard'
            />
          </div>
        </div>
      </>
    </>
  );
};

export default UploadDocuments;
