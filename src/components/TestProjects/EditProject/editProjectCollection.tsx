import { Button } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import LogoContainer from '@/components/Projects/logoContainer';
import PdfViewer from '@/components/Projects/pdfViewer';
import UploadProjectImages from '@/components/Projects/uploadProjectImages';
import UploadSiteImages from '@/components/Projects/uploadSiteImages';
import EditTab from '@/components/Tabs/editTab';
import TestProjects from '@/components/TestProjects/CreateProject';
import EmptyImage from '@/components/TestProjects/EditProject/emptyImage';
import ImageCard from '@/components/TestProjects/EditProject/imageCard';
import ImageModal from '@/components/TestProjects/EditProject/imageModal';
import { TProjectResponse } from '@/components/TestProjects/types';
import { SvmProjectToast } from '@/components/Toast/Toast';

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
  const router = useRouter();
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

  const getImages = useCallback(async () => {
    try {
      const res = await httpInstance.get(`project/get-images/${editId}`);
      console.log(res);
      const imageData = res.data.result;
      setProjectImages(imageData);
    } catch (err) {
      console.log(err);
    }
  }, [editId, projectLogo, planningImages, siteImages]);

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
    if (projectLogo.length === 0) {
      alert('please select a Logo');
    } else {
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
        toast.success('Logo Updated Successfully');
        closeModal();
      } catch (err) {
        closeModal();
        toast.error('Something went wrong');
      }
    }
  };

  const handlePlanningImageUpload = async () => {
    if (planningImages.length === 0) {
      alert('please select image to upload');
    } else {
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

        closeModal();
        // handleNextStep();
      } catch (err) {
        closeModal();
        console.log(err);
      }
    }
  };

  const handleSiteImageUpload = async () => {
    if (siteImages.length === 0) {
      alert('please select image to upload');
    } else {
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
        // console.log(res);
        toast.success('Images uploaded Successfully');
        setSiteImages([]);
        closeModal();
      } catch (err) {
        toast.error('Something went wrong');
        setSiteImages([]);

        closeModal();
      }
    }
  };

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <>
      <EditTab
        tabs={Tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => handleTabChange(tabId)}
      />

      {currentTab === 'Project Info' ? (
        <TestProjects
          editInitialValues={editInitialValues}
          editId={editId}
          handleTabChange={() => handleTabChange('Images')}
        />
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
                  Update
                </Button>
              </div>
            </div>
            <div className='w-full'>
              <div className='flex w-full flex-wrap gap-2'>
                <div className='h-36 w-[230px] overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
                  <ImageCard
                    url={projectImages?.logoUrl}
                    isShowDeleteIcon={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Planning Image */}
          <div className='flex w-[80%] flex-col'>
            <div className='flex w-full'>
              <p className=' inline-flex w-full items-center text-sm text-xl font-semibold text-black transition-colors duration-150 dark:text-white '>
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
                {projectImages?.planningImages?.length !== 0 ? (
                  <>
                    {projectImages?.planningImages?.map((img, ind) => (
                      // <ImageCard key={img.projectImageId} url={img?.url} />
                      <PdfViewer
                        key={img.projectImageId}
                        name={`Planning PDF ${ind + 1}`}
                        url={img?.url}
                        handleRemove={() => {
                          console.log('');
                        }}
                      />
                    ))}
                  </>
                ) : (
                  <EmptyImage title='Upload Planning Images' />
                )}
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
                {projectImages?.siteImages?.length !== 0 ? (
                  <>
                    {projectImages?.siteImages?.map((img) => (
                      <ImageCard
                        isShowDeleteIcon={true}
                        key={img.projectImageId}
                        url={img?.url}
                      />
                    ))}
                  </>
                ) : (
                  <EmptyImage title='Upload Site Images' />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='mt-8 flex w-full items-center justify-center'>
        <div className='flex  w-[80%] justify-center'>
          <Button onClick={() => router.push('/admin/projects')}>
            Back To Projects
          </Button>
        </div>
      </div>

      <ImageModal
        title='Upload Logo'
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
        title='Upload Planning Images'
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
        title='Upload Site Images'
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

      <SvmProjectToast />
    </>
  );
};

export default EditProjectCollection;
