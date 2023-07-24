import { Button } from '@windmill/react-ui';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import ImageCollection from '@/components/Projects/imageCollection';
import UploadImage from '@/components/Projects/uploadImage';
import { SvmProjectToast } from '@/components/Toast/Toast';

import {
  clearPlanningImage,
  setPlanningImages,
} from '@/store/projectSlices/projectDetail';

import { ProjectFormTypes } from '@/pages/admin/realEstateProjects/projectForm/add';

type formProps = {
  onComplete: (type: ProjectFormTypes) => void;
};

interface ProjectImage {
  name: string;
  size: number;
  imageId: number;
}
interface RooteState {
  projectInfo: {
    planningImages: ProjectImage;
  };
}

function ProjectImages({ onComplete }: formProps) {
  const dispatch = useDispatch();
  const [imageFiles, setImageFiles] = useState<any>([]);

  const fileRef = useRef<HTMLInputElement>(null);

  const ImageFile = useSelector<RooteState>(
    (state) => state.projectInfo.planningImages
  );

  const onAddImages: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputFiles = e.target.files;
    setImageFiles(inputFiles);

    dispatch(setPlanningImages(inputFiles));
  };

  const handlePlanningImages = () => {
    if (imageFiles.length === 0) {
      toast.info('please,upload atleast one planning image  !');
    } else {
      onComplete('siteImages');
    }
  };

  const handleClearImages = () => {
    dispatch(clearPlanningImage());
  };
  const handleAddImages = () => {
    fileRef.current?.click();
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

      <div className='flex justify-between gap-2'>
        <label className='block text-lg font-medium leading-6 text-gray-900 dark:text-gray-300'>
          Planning Images
        </label>
        <div className='flex gap-2'>
          <Button
            size='regular'
            onClick={() => handleClearImages()}
            layout='link'
          >
            Clear Images
          </Button>
          <Button size='regular' onClick={() => handleAddImages()}>
            Add Images
          </Button>
        </div>
      </div>

      {ImageFile.length === 0 ? (
        <UploadImage id='file-upload' />
      ) : (
        <ImageCollection ImageFile={ImageFile} />
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
          // onClick={() => onComplete('siteImages')}
          onClick={() => handlePlanningImages()}
          className='col-span-2 ml-auto'
        >
          Add SiteImages
        </Button>
      </div>

      <SvmProjectToast />
    </>
  );
}

export default ProjectImages;
