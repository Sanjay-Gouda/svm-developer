import { Button } from '@windmill/react-ui';
import React, { useState } from 'react';

import UploadProjectImages from '@/components/Projects/uploadProjectImages';

import { httpInstance } from '@/constants/httpInstances';

type TLogo = {
  projectId?: string;
  handleNextStep?: () => void;
};
const PlanningImage = ({ projectId, handleNextStep }: TLogo) => {
  const [planningImages, setPlanningImages] = useState<any>([]);

  const handleSave = async () => {
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
      console.log(res);
      handleNextStep();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='mt-5 flex w-full flex-col items-center justify-center'>
          <UploadProjectImages
            setPlanImages={setPlanningImages}
            planImages={planningImages}
          />

          <div className='mt-3 flex w-[80%] items-center justify-between'>
            <Button
              size='regular'
              // onClick={() => onComplete('image')}
              // onClick={() => formik.handleSubmit()}
              onClick={handleSave}
              className='col-span-2 ml-auto mt-3'
            >
              Save & Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanningImage;
