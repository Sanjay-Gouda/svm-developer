import { Button } from '@windmill/react-ui';
import React, { useState } from 'react';

import LogoContainer from '@/components/Projects/logoContainer';

import { httpInstance } from '@/constants/httpInstances';

type TLogo = {
  projectId?: string;
  handleNextStep?: () => void;
  handleBack?: () => void;
};

const ProjectLogo = ({ projectId, handleNextStep, handleBack }: TLogo) => {
  const [projectLogo, setProjectLogo] = useState<any>([]);

  const handleSave = async () => {
    if (projectLogo.length === 0) {
      alert('please Select Logo');
    } else {
      const formData = new FormData();

      for (let i = 0; i < projectLogo.length; i++) {
        formData.append('logo', projectLogo[i]);
      }

      try {
        const res = await httpInstance.patch(
          `project/upload/logo/${projectId}`,
          formData,

          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        console.log(res);
        handleNextStep();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='flex w-full flex-col items-center justify-center'>
          <LogoContainer
            projectLogo={projectLogo}
            setProjectLogo={setProjectLogo}
          />

          {/* <Button
              size='regular'
              // onClick={() => onComplete('form')}
              onClick={handleBack}
              layout='link'
              className='mr-auto'
            >
              Go Back
            </Button> */}
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

export default ProjectLogo;
