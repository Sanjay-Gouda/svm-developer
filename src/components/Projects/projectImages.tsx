import { Button } from '@windmill/react-ui';
import React from 'react';

import UploadProjectImages from '@/components/Projects/uploadProjectImages';
import UploadSiteImages from '@/components/Projects/uploadSiteImages';

function ProjectImages({
  handleGoBack,
  planImages,
  setPlanImages,
  projectDevelopementImages,
  setProjectDevelopementImages,
}) {
  return (
    <div className='flex flex-col gap-5'>
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
        <Button
          size='regular'
          // onClick={() => onComplete('siteImages')}
          // onClick={() => handlePlanningImages()}
          className='col-span-2 ml-auto'
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ProjectImages;
