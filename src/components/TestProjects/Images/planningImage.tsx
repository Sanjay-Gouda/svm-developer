import { Button } from '@windmill/react-ui';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import UploadProjectImages from '@/components/Projects/uploadProjectImages';
import { SvmProjectToast } from '@/components/Toast/Toast';

import { httpInstance } from '@/constants/httpInstances';

type TLogo = {
  projectId?: string;
  handleNextStep?: () => void;
};
const PlanningImage = ({ projectId, handleNextStep }: TLogo) => {
  const [planningImages, setPlanningImages] = useState<any>([]);
  const [loader, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();

    for (let i = 0; i < planningImages.length; i++) {
      formData.append('planningImages', planningImages[i]);
    }

    try {
      const res = await httpInstance.patch(
        `project/upload/project-images/${projectId}`,
        formData,

        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setLoading(false);
      handleNextStep();
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='mt-5 flex w-[80%] flex-col items-center justify-center'>
          <UploadProjectImages
            setPlanImages={setPlanningImages}
            planImages={planningImages}
          />

          {loader ? (
            <Button className=' col-span-2 ml-auto mt-4'>
              Saving...
              {/* <ClipLoader size={20} color='white' /> */}
            </Button>
          ) : (
            <div className='mt-8 flex w-full items-end justify-end'>
              <Button
                size='regular'
                // onClick={() => onComplete('form')}
                onClick={handleNextStep}
                layout='link'
                className='mr-auto'
              >
                Skip
              </Button>

              <Button
                size='regular'
                onClick={handleSave}
                className='col-span-2 ml-auto mt-4'
              >
                Save & Next
              </Button>
            </div>
          )}
        </div>
      </div>

      <SvmProjectToast />
    </>
  );
};

export default PlanningImage;
