import { Button } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';

import LogoContainer from '@/components/Projects/logoContainer';
import UploadProjectImages from '@/components/Projects/uploadProjectImages';
import UploadSiteImages from '@/components/Projects/uploadSiteImages';
import EditTab from '@/components/Tabs/editTab';
import TestProjects from '@/components/TestProjects/CreateProject';
import ImageCard from '@/components/TestProjects/EditProject/imageCard';
import ImageModal from '@/components/TestProjects/EditProject/imageModal';
import { TProjectResponse } from '@/components/TestProjects/types';

import { httpInstance } from '@/constants/httpInstances';

type activeTabState = {
  info: boolean;
  images: boolean;
};

type TModal = {
  logoModal: boolean;
  planningModal: boolean;
  siteImageModal: boolean;
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
    info: true,
    images: false,
  });

  const [openImageModal, setOpenImageModal] = useState<TModal>({
    logoModal: false,
    planningModal: false,
    siteImageModal: false,
  });

  const [projectImages, setProjectImages] = useState<TEditProjectImages>();
  const [projectLogo, setProjectLogo] = useState<any>([]);
  const [planningImages, setPlanningImages] = useState<any>([]);
  const [siteImages, setSiteImages] = useState<any>([]);

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    tabId === 'Project Info'
      ? setActiveTab({ images: false, info: true })
      : setActiveTab({ images: true, info: false });
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

  const handleOpenLogoModal = () => {
    setOpenImageModal({
      ...openImageModal,
      logoModal: true,
    });
  };

  const handlePlanningModal = () => {
    setOpenImageModal({
      ...openImageModal,
      planningModal: true,
    });
  };
  const handleSiteImageModal = () => {
    setOpenImageModal({
      ...openImageModal,
      siteImageModal: true,
    });
  };

  function closeModal() {
    // setIsModalOpen(false);
    setOpenImageModal({
      logoModal: false,
      planningModal: false,
      siteImageModal: false,
    });
    setProjectLogo([]);
    setPlanningImages([]);
  }

  const handleLogoUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < projectLogo.length; i++) {
      formData.append('logo', projectLogo[i]);
    }

    try {
      const res = await httpInstance.patch(
        `project/upload/logo/${editId}`,
        formData,

        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log(res);
      // handleNextStep();
      closeModal();
    } catch (err) {
      closeModal();
      console.log(err);
    }
  };

  const handlePlanningImageUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < planningImages.length; i++) {
      formData.append('planningImages', planningImages[i]);
    }

    try {
      const res = await httpInstance.patch(
        `project/upload/project-images/${editId}`,
        formData,

        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log(res);
      // handleNextStep();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSiteImageUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < siteImages.length; i++) {
      formData.append('siteImages', siteImages[i]);
    }

    try {
      const res = await httpInstance.patch(
        `project/upload/project-images/${editId}`,
        formData,

        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log(res);
      // handleNextStep();

      // setTimeout(() => {
      //   router.push('/admin/projects');
      // }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getImages();
  }, [editId, projectLogo, planningImages]);

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
          {/* Logo */}
          <div className='flex w-[80%] flex-col'>
            <div className='flex w-full'>
              <p className=' inline-flex w-full items-center text-sm font-semibold text-white transition-colors duration-150 '>
                Logo
              </p>
              <div className='flex w-[80%]'>
                <Button
                  onClick={handleOpenLogoModal}
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

          {/* Planning Image */}
          <div className='flex w-[80%] flex-col'>
            <div className='flex w-full'>
              <p className=' inline-flex w-full items-center text-sm font-semibold text-white transition-colors duration-150 '>
                Planning Images
              </p>
              <div className='flex w-[80%]'>
                <Button
                  size='regular'
                  onClick={handlePlanningModal}
                  className='col-span-2 ml-auto mt-3'
                >
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

          {/* Site Image */}
          <div className='flex w-[80%] flex-col'>
            <div className='flex w-full'>
              <p className=' inline-flex w-full items-center text-sm font-semibold text-white transition-colors duration-150 '>
                Site Images
              </p>
              <div className='flex w-[80%]'>
                <Button
                  size='regular'
                  onClick={handleSiteImageModal}
                  className='col-span-2 ml-auto mt-3'
                >
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

      <ImageModal
        isModalOpen={openImageModal.logoModal}
        handleClose={closeModal}
        handleUpload={handleLogoUpload}
        modalBody={
          <LogoContainer
            projectLogo={projectLogo}
            setProjectLogo={setProjectLogo}
          />
        }
      />
      <ImageModal
        isModalOpen={openImageModal.planningModal}
        handleClose={closeModal}
        handleUpload={handlePlanningImageUpload}
        modalBody={
          <UploadProjectImages
            setPlanImages={setPlanningImages}
            planImages={planningImages}
          />
        }
      />
      <ImageModal
        isModalOpen={openImageModal.siteImageModal}
        handleClose={closeModal}
        handleUpload={handleSiteImageUpload}
        modalBody={
          <UploadSiteImages
            projectDevelopementImages={siteImages}
            setProjectDevelopementImages={setSiteImages}
          />
        }
      />
    </>
  );
};

export default EditProjectCollection;
