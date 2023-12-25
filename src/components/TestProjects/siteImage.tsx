import { Button } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import UploadSiteImages from '@/components/Projects/uploadSiteImages';

import { httpInstance } from '@/constants/httpInstances';

type TLogo = {
  projectId?: string;
  handleNextStep?: () => void;
};

const SiteImage = ({ handleNextStep, projectId }: TLogo) => {
  const router = useRouter();

  const [siteImages, setSiteImages] = useState<any>([]);

  /* [file][file][file][file] */
  /* 'https:url.com' 'https:url.com' 'https:url.com' [file] [file]*/

  const handleSave = async () => {
    const formData = new FormData();

    for (let i = 0; i < siteImages.length; i++) {
      formData.append('siteImages', siteImages[i]);
    }

    try {
      const res = await httpInstance.patch(
        `project/upload/project-images/${projectId}`,
        formData,

        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log(res);
      handleNextStep();

      setTimeout(() => {
        router.push('/admin/projects');
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='mt-8 flex w-[80%] flex-col items-center justify-center gap-3'>
          <UploadSiteImages
            projectDevelopementImages={siteImages}
            setProjectDevelopementImages={setSiteImages}
          />

          <div className='mt-3 flex w-full items-center justify-between'>
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

export default SiteImage;
