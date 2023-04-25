import ImageCollection from '@/components/svmprojects/imageCollection';
import UploadImage from '@/components/svmprojects/uploadImage';
import { ProjectFormTypes } from '@/pages/admin/realEstateProjects/add';
import { Button } from '@windmill/react-ui';
import React, { useRef, useState } from 'react';

type formProps = {
  onComplete: (type: ProjectFormTypes) => void;
};
const SiteImages = ({ onComplete }: formProps) => {
  const [imageFiles, setImageFiles] = useState<any>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const onAddImages: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.files);
    const projectImages = e.target.files;
    setImageFiles(projectImages);
  };

  return (
    <>
      <input
        id='file-upload'
        name='file-upload'
        type='file'
        className='sr-only'
        ref={fileRef}
        onInput={onAddImages}
        multiple
        accept='image/png, image/gif, image/jpeg, image/jpg'
      />
      <label className='block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300'>
        Project Images
      </label>

      <UploadImage id='file-upload' />

      <ImageCollection Imagefiles={imageFiles} />

      <div className='mt-3 flex items-center justify-between'>
        <Button
          size='regular'
          onClick={() => onComplete('image')}
          layout='link'
          className='mr-auto'
        >
          Go Back
        </Button>
        <Button
          size='regular'
          onClick={() => onComplete('siteImages')}
          className='col-span-2 ml-auto'
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default SiteImages;
