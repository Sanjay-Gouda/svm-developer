import { Button } from '@windmill/react-ui';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import ImageContainer from '@/components/Booking/imageContainer';
import UploadPlaceholder from '@/components/Projects/uploadPlaceholder';
import { SvmProjectToast } from '@/components/Toast/Toast';

type TUploadImages = {
  setProjectDevelopementImages: (e: any) => void;
  projectDevelopementImages: [];
};

const UploadSiteImages = ({
  setProjectDevelopementImages,
  projectDevelopementImages,
}: TUploadImages) => {
  const handleDrop = (acceptedFiles: any) => {
    if (acceptedFiles.length === 0) {
      // console.log('You can upload a maximum of 4 images at a time.');
      toast.info('You can upload a maximum of 4 images at a time.');
    } else {
      setProjectDevelopementImages((prevFiles: any) => [
        ...prevFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/png': ['.png', '.jpg', '.jpeg'] },
    maxFiles: 4,
  });

  const handleClearImages = () => {
    setProjectDevelopementImages([]);
  };

  const handleRemove = (name: string) => {
    const remainingImages = projectDevelopementImages.filter((file: any) => {
      return file.name !== name;
    });
    setProjectDevelopementImages(remainingImages);
  };

  return (
    <>
      {projectDevelopementImages?.length > 0 ? (
        <div className='auto  flex w-full flex-wrap gap-6  rounded-lg  border-2 border-gray-300 px-2 py-5  dark:border-gray-600'>
          {projectDevelopementImages?.map((file: any, ind: any) => {
            return (
              <>
                <ImageContainer
                  key={ind}
                  file={file?.preview}
                  handleRemove={() => handleRemove(file?.name)}
                />
              </>
            );
          })}
        </div>
      ) : (
        <UploadPlaceholder
          rootProps={getRootProps}
          inputProps={getInputProps}
        />
      )}

      <div className='mt-2 flex w-full justify-end gap-2'>
        <Button
          size='regular'
          onClick={() => handleClearImages()}
          layout='link'
        >
          Clear Images
        </Button>
        {/* <Button size='regular' {...getRootProps()}>
          Add Images
          <input {...getInputProps()} className='hidden' />
        </Button> */}
      </div>

      <SvmProjectToast />
    </>
  );
};

export default UploadSiteImages;
