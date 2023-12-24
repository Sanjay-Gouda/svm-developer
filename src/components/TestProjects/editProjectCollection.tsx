import { Button } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';

import EditTab from '@/components/Tabs/editTab';
import TestProjects from '@/components/TestProjects';

type activeTabState = {
  info: boolean;
  images: boolean;
};

const EditProjectCollection = () => {
  const Tabs = ['Project Info', 'Images'];
  const [currentTab, setCurrentTab] = useState<string>('Project Info');
  const [activeTab, setActiveTab] = useState<activeTabState>({
    info: false,
    images: false,
  });

  const handleTabChange = (tabId: string) => {
    console.log(tabId, 'tabid');
    setCurrentTab(tabId);
  };

  useEffect(() => {
    if (currentTab === 'Project Info') {
      setActiveTab({
        info: true,
        images: false,
      });
    } else {
      setActiveTab({
        info: false,
        images: true,
      });
    }
  }, [activeTab]);

  return (
    <>
      <EditTab
        tabs={Tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => handleTabChange(tabId)}
      />

      {currentTab === 'Project Info' ? (
        <TestProjects />
      ) : (
        <div className='flex w-full flex-col items-center justify-center gap-6'>
          {/* <ProjectLogo />
          <PlanningImage />

              <SiteImage /> */}

          <div className='flex w-[80%] flex-col'>
            <div className='flex w-full'>
              <p className=' inline-flex w-full items-center text-sm font-semibold text-white transition-colors duration-150 '>
                Logo
              </p>
              <div className='flex w-[80%]'>
                <Button size='regular' className='col-span-2 ml-auto mt-3'>
                  Add Images
                </Button>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex w-full flex-wrap gap-2'>
                <div className='h-36 w-[230px] overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
                  <img className='h-full w-full  object-cover' src='' />
                </div>
                <div className='h-36 w-[230px] overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
                  <img className='h-full w-full  object-cover' src='' />
                </div>
                <div className='h-36 w-[230px] overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
                  <img className='h-full w-full  object-cover' src='' />
                </div>
              </div>
            </div>
          </div>

          {/* <div className='flex w-[80%]'>
            <p className=' inline-flex w-full items-center text-sm font-semibold text-white transition-colors duration-150 '>
              Site Images
            </p>
            <div className='flex w-[80%]'>
              <Button
                size='regular'
                // onClick={() => onComplete('image')}
                // onClick={() => formik.handleSubmit()}
                className='col-span-2 ml-auto mt-3'
              >
                Add Images
              </Button>
            </div>
          </div>
          <div className='flex w-[80%]'>
            <p className=' inline-flex w-full items-center text-sm font-semibold text-white transition-colors duration-150 '>
              Planning Images
            </p>
            <div className='flex w-[80%]'>
              <Button
                size='regular'
                // onClick={() => onComplete('image')}
                // onClick={() => formik.handleSubmit()}
                className='col-span-2 ml-auto mt-3'
              >
                Add Images
              </Button>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default EditProjectCollection;
