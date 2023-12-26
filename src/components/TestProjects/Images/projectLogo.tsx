import { Button } from '@windmill/react-ui';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import LogoContainer from '@/components/Projects/logoContainer';
import { SvmProjectToast } from '@/components/Toast/Toast';

import { httpInstance } from '@/constants/httpInstances';

type TLogo = {
  projectId?: string;
  handleNextStep?: () => void;
  handleBack?: () => void;
};

const ProjectLogo = ({ projectId, handleNextStep, handleBack }: TLogo) => {
  const [projectLogo, setProjectLogo] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSave = async () => {
    if (projectLogo.length === 0) {
      toast.info('Please Select Logo');
    } else {
      setLoader(true);
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
        setLoader(true);
        handleNextStep();
      } catch (err) {
        toast.error('Something went wrong');

        setLoader(false);
      }
    }
  };

  return (
    <>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='flex w-[80%] flex-col items-center justify-center'>
          <LogoContainer
            projectLogo={projectLogo}
            setProjectLogo={setProjectLogo}
          />

          {loader ? (
            <Button className=' col-span-2 ml-auto mt-8'>Saving...</Button>
          ) : (
            <Button
              size='regular'
              onClick={handleSave}
              className='col-span-2 ml-auto mt-8'
            >
              Save & Next
            </Button>
          )}
        </div>
      </div>
      <SvmProjectToast />
    </>
  );
};

export default ProjectLogo;
