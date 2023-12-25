import { Button } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';

import EditTab from '@/components/Tabs/editTab';
import TestProjects from '@/components/TestProjects';
import ImageCard from '@/components/TestProjects/imageCard';
import ImageModal from '@/components/TestProjects/imageModal';
import { TProjectResponse } from '@/components/TestProjects/types';

import { httpInstance } from '@/constants/httpInstances';

type activeTabState = {
  info: boolean;
  images: boolean;
};

type TEditResponse = {
  editInitialValues: TProjectResponse;
  editId: string;
};

type TFetchImage = {
  projectImageId: string;
  type: string;
  url: string;
};

export type TEditProjectImages = {
  planningImages: TFetchImage[];
  siteImages: TFetchImage[];
  logoUrl: string | null;
};

const EditProjectCollection = ({
  editInitialValues,
  editId,
}: TEditResponse) => {
  const Tabs = ['Project Info', 'Images'];
  const [currentTab, setCurrentTab] = useState<string>('Project Info');
  const [activeTab, setActiveTab] = useState<activeTabState>({
    info: false,
    images: false,
  });

  const [projectImages, setProjectImages] = useState<TEditProjectImages>();

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  const getImages = async () => {
    try {
      const res = await httpInstance.get(`project/get-images/${editId}`);
      console.log(res);
      const imageData = res.data.result;
      setProjectImages(imageData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getImages();
  }, [editId]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <EditTab
        tabs={Tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => handleTabChange(tabId)}
      />

      {currentTab === 'Project Info' ? (
        <TestProjects editInitialValues={editInitialValues} editId={editId} />
      ) : (
        <div className='flex w-full flex-col items-center justify-center gap-6'>
          <div className='flex w-[80%] flex-col'>
            <div className='flex w-full'>
              <p className=' inline-flex w-full items-center text-sm font-semibold text-white transition-colors duration-150 '>
                Logo
              </p>
              <div className='flex w-[80%]'>
                <Button
                  onClick={openModal}
                  size='regular'
                  className='col-span-2 ml-auto mt-3'
                >
                  Add Images
                </Button>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex w-full flex-wrap gap-2'>
                <div className='h-36 w-[230px] overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
                  <ImageCard url={projectImages?.logoUrl} />
                </div>
              </div>
            </div>
          </div>

          <div className='flex w-[80%] flex-col'>
            <div className='flex w-full'>
              <p className=' inline-flex w-full items-center text-sm font-semibold text-white transition-colors duration-150 '>
                Planning Images
              </p>
              <div className='flex w-[80%]'>
                <Button size='regular' className='col-span-2 ml-auto mt-3'>
                  Add Images
                </Button>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex w-full flex-wrap gap-2'>
                {projectImages?.planningImages?.map((img) => (
                  <ImageCard key={img.projectImageId} url={img?.url} />
                ))}
              </div>
            </div>
          </div>
          <div className='flex w-[80%] flex-col'>
            <div className='flex w-full'>
              <p className=' inline-flex w-full items-center text-sm font-semibold text-white transition-colors duration-150 '>
                Site Images
              </p>
              <div className='flex w-[80%]'>
                <Button size='regular' className='col-span-2 ml-auto mt-3'>
                  Add Images
                </Button>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex w-full flex-wrap gap-2'>
                {projectImages?.siteImages?.map((img) => (
                  <ImageCard key={img.projectImageId} url={img?.url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <ImageModal isModalOpen={isModalOpen} handleClose={closeModal} />
    </>
  );
};

export default EditProjectCollection;
