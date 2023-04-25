import ImageCollection from '@/components/svmprojects/imageCollection';
import React, { useRef, useState, useEffect } from 'react';
import { Alert, Button } from '@windmill/react-ui';
import UploadImage from '@/components/svmprojects/uploadImage';
import { ProjectFormTypes } from '@/pages/admin/realEstateProjects/add';

type formProps = {
  onComplete: (type: ProjectFormTypes) => void;
};

function ProjectImages({ onComplete }: formProps) {
  /* Need to discuss */
  const [imageFiles, setImageFiles] = useState<any>([]);

  const fileRef = useRef<HTMLInputElement>(null);

  const onAddImages: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputFiles = e.target.files;
    setImageFiles(inputFiles);
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
        Planning Images
      </label>
      {imageFiles.length === 0 ? (
        <UploadImage id='file-upload' />
      ) : (
        <ImageCollection Imagefiles={imageFiles} />
      )}

      <div className='mt-3 flex items-center justify-between'>
        <Button
          size='regular'
          onClick={() => onComplete('form')}
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
}

export default ProjectImages;
