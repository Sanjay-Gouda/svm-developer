import { Button } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import UploadSiteImages from '@/components/Projects/uploadSiteImages';
import { SvmProjectToast } from '@/components/Toast/Toast';

import { httpInstance } from '@/constants/httpInstances';

type TLogo = {
  projectId?: string;
  handleNextStep?: () => void;
};

const SiteImage = ({ handleNextStep, projectId }: TLogo) => {
  const router = useRouter();

  const [siteImages, setSiteImages] = useState<any>([]);

  const [loader, setLoader] = useState<boolean>(false);
  const handleSave = async () => {
    setLoader(true);
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
      setLoader(false);
      handleNextStep();

      setTimeout(() => {
        router.push('/admin/projects');
      }, 1000);
    } catch (err) {
      setLoader(false);

      toast.error('Something went wrong');
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
                onClick={() => {
                  router.push('/admin/projects');
                }}
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

export default SiteImage;
