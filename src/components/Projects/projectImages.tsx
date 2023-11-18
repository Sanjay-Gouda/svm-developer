import { Button } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import React from 'react';
import { ClipLoader } from 'react-spinners';

import LogoContainer from '@/components/Projects/logoContainer';
import UploadProjectImages from '@/components/Projects/uploadProjectImages';
import UploadSiteImages from '@/components/Projects/uploadSiteImages';

type TImageProps = {
  isEditActive?: string;
  handleGoBack: () => void;
  planImages: [];
  setPlanImages: (e: any) => void;
  projectDevelopementImages: [];
  setProjectDevelopementImages: (e: any) => void;
  handleSubmit: (e: any) => void;
  projectLogo: [];
  setProjectLogo: (e: any) => void;
  loader: boolean;
};

function ProjectImages({
  handleGoBack,
  planImages,
  setPlanImages,
  projectDevelopementImages,
  setProjectDevelopementImages,
  handleSubmit,
  projectLogo,
  setProjectLogo,
  isEditActive,
  loader,
}: TImageProps) {
  const routes = useRouter();

  return (
    <div className='flex flex-col gap-5'>
      <div>
        <LogoContainer
          projectLogo={projectLogo}
          setProjectLogo={setProjectLogo}
        />
      </div>

      <div>
        <UploadProjectImages
          setPlanImages={setPlanImages}
          planImages={planImages}
        />
      </div>
      <div>
        <UploadSiteImages
          projectDevelopementImages={projectDevelopementImages}
          setProjectDevelopementImages={setProjectDevelopementImages}
        />
      </div>
      <div className='mt-3 flex w-full items-center justify-between'>
        <Button
          size='regular'
          // onClick={() => onComplete('form')}
          onClick={handleGoBack}
          layout='link'
          className='mr-auto'
        >
          Go Back
        </Button>
        <div className='flex gap-4'>
          <Button
            size='regular'
            // onClick={() => onComplete('siteImages')}
            onClick={handleSubmit}
            className='col-span-2 ml-auto'
          >
            Submit
            {loader && <ClipLoader size={20} color='white' />}
          </Button>
          {isEditActive && (
            <Button
              layout='outline'
              onClick={() => routes.push('/admin/projects')}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectImages;
