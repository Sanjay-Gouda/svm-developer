import { Button } from '@windmill/react-ui';
import React, { useRef } from 'react';
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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddMoreClick = () => {
    console.log(inputRef);
    // Trigger file input click
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDrop = (acceptedFiles: any) => {
    if (acceptedFiles.length > 11) {
      toast.info('You can upload a maximum of 10 images.');
    } else {
      setProjectDevelopementImages((prevFiles: any) => [
        ...prevFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/png': ['.png', '.jpg', '.jpeg'] },
    // maxFiles: 1,
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

  // useEffect(()=>{

  // },[])

  return (
    <>
      <div className=' mb-2 flex items-center justify-between gap-2'>
        <label className='block text-lg font-medium leading-6 text-gray-900 dark:text-gray-300'>
          Upload Site Images
        </label>
        <div className='flex gap-2'>
          <Button
            size='regular'
            onClick={() => handleClearImages()}
            layout='link'
          >
            Clear Images
          </Button>
          <Button size='regular' {...getRootProps()}>
            Add Images
            <input {...getInputProps()} className='hidden' />
          </Button>
        </div>
      </div>

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

      <SvmProjectToast />
    </>
  );
};

export default UploadSiteImages;
