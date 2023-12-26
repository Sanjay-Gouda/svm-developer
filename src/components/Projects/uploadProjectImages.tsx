import { Button } from '@windmill/react-ui';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import ImageContainer from '@/components/Booking/imageContainer';
import UploadPlaceholder from '@/components/Projects/uploadPlaceholder';

const UploadProjectImages = ({ setPlanImages, planImages }) => {
  const handleDrop = (acceptedFiles: any) => {
    setPlanImages((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleDrop,
    // noClick: true,
  });

  const handleAddImagesClick = () => {
    // Open the file selector
    open();
  };
  const handleClearImages = () => {
    setPlanImages([]);
  };

  const handleRemove = (name: string) => {
    const remainingImages = planImages.filter((file) => {
      return file.name !== name;
    });
    setPlanImages(remainingImages);
  };

  return (
    <>
      {planImages?.length > 0 ? (
        <div className='auto  flex w-full flex-wrap gap-6  rounded-lg  border-2 border-gray-300 px-2 py-5  dark:border-gray-600'>
          {planImages?.map((file, ind) => {
            return (
              <>
                <ImageContainer
                  key={ind}
                  file={file?.preview || file.url}
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

      <div className='mt-3 flex w-full justify-end gap-2'>
        <Button
          size='regular'
          onClick={() => handleClearImages()}
          layout='link'
        >
          Clear Images
        </Button>
        <Button size='regular' onClick={handleAddImagesClick}>
          Add Images
        </Button>
        <input {...getInputProps()} className='hidden' />
      </div>
    </>
  );
};

export default UploadProjectImages;
