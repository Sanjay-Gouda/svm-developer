import React from 'react';
import { useDropzone } from 'react-dropzone';

import ImageContainer from '@/components/Booking/imageContainer';

type TLogo = {
  projectLogo: any;
  setProjectLogo: (e: any) => void;
};

const LogoContainer = ({ projectLogo, setProjectLogo }: TLogo) => {
  const handleLogo = (acceptedFiles: any) => {
    setProjectLogo((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { prevFile: URL.createObjectURL(file) })
      ),
    ]);
  };

  const logoDropZone = useDropzone({
    onDrop: handleLogo,
    multiple: false,
  });

  return (
    <div className='mt-5 h-56 w-[100%]'>
      {projectLogo?.length > 0 ? (
        <>
          <div className='auto  flex w-full flex-wrap gap-6  rounded-lg  border-2 border-gray-300 px-2 py-5  dark:border-gray-600'>
            {projectLogo?.map((file, ind) => {
              return (
                <>
                  <ImageContainer
                    key={ind}
                    file={file?.prevFile}
                    // handleRemove={() => handleRemove(file?.name)}
                  />
                </>
              );
            })}
          </div>
        </>
      ) : (
        <label
          htmlFor='dropzone-file'
          className='dark:hover:bg-bray-800 flex h-full w-full 
                  cursor-pointer flex-col items-center justify-center rounded-lg 
                  border-2 border-dashed border-gray-300 bg-gray-50 p-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
        >
          <div
            {...logoDropZone.getRootProps()}
            className='flex h-full items-center justify-center text-gray-900   dark:text-gray-400'
          >
            <input {...logoDropZone.getInputProps()} />
            <p>Upload Project Logo </p>
          </div>
        </label>
      )}
    </div>
  );
};

export default LogoContainer;
