import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import AadharCardPlaceholder from '@/components/Booking/aadharCardPlaceholder';
import PassportPlaceholder from '@/components/Booking/passportPlaceholder';
import CustomerForm from '@/components/Customers/customerForm';
import HeaderWrapper from '@/components/Customers/EditCustomer/headerWrapper';
import EditTab from '@/components/Tabs/editTab';
import EmptyImage from '@/components/TestProjects/EditProject/emptyImage';
import ImageModal from '@/components/TestProjects/EditProject/imageModal';

import { httpInstance } from '@/constants/httpInstances';

type activeTabState = {
  info: boolean;
  images: boolean;
};

type TEditResponse = {
  editInitialValues: any;
  editId: string;
};

type TModal = {
  passphotoModal: boolean;
  aadharCardModal: boolean;
  panCardModal: boolean;
};

const EditCustomerCollection = ({
  editId,
  editInitialValues,
}: TEditResponse) => {
  const Tabs = ['Customer Info', 'Images'];

  const [customerListImages, setCustomerListImages] = useState({
    passPhoto: [],
    aadharfront: [],
    aadharback: [],
    pancard: [],
  });

  const getImages = useCallback(() => {
    const imageTypes = {
      PHOTO: 'passPhoto',
      AADHAR_FRONT: 'aadharfront',
      AADHAR_REAR: 'aadharback',
      PAN: 'pancard',
    };

    const filteredImages = {};
    Object.keys(imageTypes).forEach((type) => {
      const filtered = editInitialValues?.customerImage?.filter(
        (item) => item?.type === type
      );
      if (filtered.length > 0) {
        filteredImages[imageTypes[type]] = filtered;
      }
    });

    setCustomerListImages(filteredImages);
  }, [editId]);

  // useEffect(() => {
  //   if (editInitialValues?.customerImage?.length > 0) {
  //     getImages();
  //     console.log(editInitialValues?.customerImage);
  //   }
  // }, [editInitialValues]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  const [activeTab, setActiveTab] = useState<activeTabState>({
    info: true,
    images: false,
  });

  const [currentTab, setCurrentTab] = useState<string>('Customer Info');
  const [passPhoto, setPassPhoto] = useState<any>([]);

  const [panCard, setPanCard] = useState<any>([]);

  const [openImageModal, setOpenImageModal] = useState<TModal>({
    aadharCardModal: false,
    panCardModal: false,
    passphotoModal: false,
  });

  const [frontAadharCard, setFrontAadharCard] = useState<any>([]);
  const [backAadharCard, setBackAadharCard] = useState<any>([]);

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    tabId === 'Customer Info'
      ? setActiveTab({ images: false, info: true })
      : setActiveTab({ images: true, info: false });
  };

  const handleFirstpassPhoto = (acceptedFiles: any) => {
    setPassPhoto((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const handleFrontSideAadharCard = (acceptedFiles: any) => {
    setFrontAadharCard((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const handleBackSideAadhardCard = (acceptedFiles: any) => {
    setBackAadharCard((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const handlePassphotoModal = () => {
    setOpenImageModal({
      ...openImageModal,
      passphotoModal: true,
    });
  };
  const handleAadharCardModal = () => {
    setOpenImageModal({
      ...openImageModal,
      aadharCardModal: true,
    });
  };
  const handlePancardModal = () => {
    setOpenImageModal({
      ...openImageModal,
      panCardModal: true,
    });
  };

  const firstPassphotoDropzone = useDropzone({
    onDrop: handleFirstpassPhoto,
    multiple: false,
    accept: { 'image/png': ['.png', '.jpg', '.jpeg'] },
  });

  const handlePanCard = (acceptedFiles: any) => {
    setPanCard((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const frontSideAadharCard = useDropzone({
    onDrop: handleFrontSideAadharCard,
    multiple: false,
    accept: { 'image/png': ['.png', '.jpg', '.jpeg'] },
  });
  const backSideAadharCard = useDropzone({
    onDrop: handleBackSideAadhardCard,
    multiple: false,
    accept: { 'image/png': ['.png', '.jpg', '.jpeg'] },
  });

  const panCardDropZone = useDropzone({
    onDrop: handlePanCard,
    multiple: false,
    accept: { 'image/png': ['.png', '.jpg', '.jpeg'] },
  });

  function closeModal() {
    // setIsModalOpen(false);
    setOpenImageModal({
      aadharCardModal: false,
      panCardModal: false,
      passphotoModal: false,
    });
    setCustomerListImages({
      aadharback: [],
      aadharfront: [],
      pancard: [],
      passPhoto: [],
    });
  }

  const handleUploadPassPhoto = async () => {
    const formData = new FormData();
    for (let i = 0; i < passPhoto.length; i++) {
      formData.append('customerImage', passPhoto[i]);
    }
    try {
      const res = await httpInstance.patch(
        `customer/upload/customer-image/${editId}`,
        formData
      );
      console.log(res);

      closeModal();
    } catch (err) {
      console.log(err);
      closeModal();
    }
  };

  return (
    <>
      <EditTab
        tabs={Tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => handleTabChange(tabId)}
      />
      {currentTab === 'Customer Info' ? (
        <CustomerForm editInitialValues={editInitialValues} editId={editId} />
      ) : (
        <div className='flex w-full flex-col items-center justify-center gap-6 '>
          {/* PassPhoto List  */}
          <div className='flex w-[80%] flex-col'>
            <HeaderWrapper
              heading='Passphoto'
              btnLable='Update'
              onClick={handlePassphotoModal}
            />

            <div className='w-full'>
              <div className='flex w-full flex-wrap gap-2'>
                <div
                  className='h-48 w-48 overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
                  // key={ind}
                >
                  <img
                    className='h-full w-full  object-cover'
                    src={customerListImages?.passPhoto[0]?.imageUrl}
                    alt='Passphoto'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* PassPhoto List  */}
          {/* Aadharcard */}
          <div className='flex w-[80%] flex-col'>
            <HeaderWrapper
              heading='Aadharcard'
              btnLable='Update'
              onClick={handleAadharCardModal}
            />

            {customerListImages?.aadharfront?.length === 0 ||
            customerListImages?.aadharback?.length === 0 ? (
              <EmptyImage title="Please Upload Client's Aadharcard" />
            ) : (
              <div className='flex gap-2'>
                <div className='h-48 w-96  overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
                  <img
                    className='h-full w-full  object-cover'
                    src={customerListImages?.aadharfront[0].imageUrl}
                  />
                </div>
                <div className='h-48 w-96  overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
                  <img
                    className='h-full w-full  object-cover'
                    src={customerListImages?.aadharback[0]?.imageUrl}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Aadharcard */}
          {/* Pancard */}
          <div className='flex w-[80%] flex-col'>
            <HeaderWrapper
              heading='Pancard /Voter Id'
              btnLable='Update'
              onClick={handlePancardModal}
            />
            {customerListImages?.pancard?.length === 0 ? (
              <EmptyImage title='Upload Clients Pancard or Voter ID' />
            ) : (
              <div
                className='h-48 w-96  overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
                // key={ind}
              >
                <img
                  className='h-full w-full  object-cover'
                  src={customerListImages?.pancard[0]?.imageUrl}
                />
              </div>
            )}
          </div>
          {/* Pancard */}
        </div>
      )}

      {/* Passphoto */}
      <ImageModal
        handleClose={() =>
          setOpenImageModal({ ...openImageModal, passphotoModal: false })
        }
        handleUpload={handleUploadPassPhoto}
        isModalOpen={openImageModal.passphotoModal}
        title='Update Passphoto'
        modalBody={
          <div className='flex w-full justify-center'>
            <PassportPlaceholder
              files={passPhoto}
              setImageArray={setPassPhoto}
              {...firstPassphotoDropzone}
              placeholder='Upload Clients passphoto'
            />
          </div>
        }
      />

      {/*aadharCard  */}
      <ImageModal
        handleClose={() =>
          setOpenImageModal({ ...openImageModal, aadharCardModal: false })
        }
        handleUpload={() => console.log('upload')}
        isModalOpen={openImageModal.aadharCardModal}
        title='Update AadharCard'
        modalBody={
          <div className='flex w-full flex-col items-center justify-between gap-8'>
            <AadharCardPlaceholder
              setImageArray={setFrontAadharCard}
              files={frontAadharCard}
              {...frontSideAadharCard}
              placeholder='Upload Clients frontside of Aadharcard'
            />
            <AadharCardPlaceholder
              setImageArray={setBackAadharCard}
              files={backAadharCard}
              {...backSideAadharCard}
              placeholder='Upload Clients backside of Aadharcard'
            />
          </div>
        }
      />

      {/* Pancard */}
      <ImageModal
        handleClose={() =>
          setOpenImageModal({ ...openImageModal, panCardModal: false })
        }
        handleUpload={() => console.log('upload')}
        isModalOpen={openImageModal.panCardModal}
        title='Update AadharCard'
        modalBody={
          <div className='flex w-full flex-col items-center justify-between gap-8'>
            <AadharCardPlaceholder
              setImageArray={setPanCard}
              files={panCard}
              {...panCardDropZone}
              placeholder='Upload Clients pancard / voter Id'
            />
          </div>
        }
      />
    </>
  );
};

export default EditCustomerCollection;
