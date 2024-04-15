import { Button } from '@windmill/react-ui';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import AadharCardPlaceholder from '@/components/Booking/aadharCardPlaceholder';
import PassportPlaceholder from '@/components/Booking/passportPlaceholder';
import CustomerForm from '@/components/Customers/customerForm';
import HeaderWrapper from '@/components/Customers/EditCustomer/headerWrapper';
import {
  activeTabState,
  TCustomerImage,
  Tdocument,
  TEditResponse,
  TModal,
} from '@/components/Customers/EditCustomer/types';
import EditTab from '@/components/Tabs/editTab';
import EmptyImage from '@/components/TestProjects/EditProject/emptyImage';
import ImageModal from '@/components/TestProjects/EditProject/imageModal';
import { SvmProjectToast } from '@/components/Toast/Toast';

import { httpInstance } from '@/constants/httpInstances';

const EditCustomerCollection = ({
  editId,
  editInitialValues,
}: TEditResponse) => {
  const router = useRouter();
  const Tabs = ['Customer Info', 'Images'];
  const [loading, setLoading] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<activeTabState>({
    info: true,
    images: false,
  });

  const [currentTab, setCurrentTab] = useState<string>('Customer Info');
  const [passPhoto, setPassPhoto] = useState<unknown>([]);

  const [customerDocs, setCustomerDocs] = useState<Tdocument>({
    AADHAR_FRONT: '',
    AADHAR_REAR: '',
    PAN: '',
    PHOTO: '',
  });
  const [panCard, setPanCard] = useState<unknown>([]);

  const [openImageModal, setOpenImageModal] = useState<TModal>({
    aadharCardModal: false,
    panCardModal: false,
    passphotoModal: false,
  });

  const [frontAadharCard, setFrontAadharCard] = useState<unknown>([]);
  const [backAadharCard, setBackAadharCard] = useState<unknown>([]);

  const getImages = useCallback(async () => {
    try {
      const res = await httpInstance.get(`customer/get-images/${editId}`);

      const documents = res?.data?.result;

      const docsObject = documents.reduce(
        (acc: Record<string, string>, item: TCustomerImage) => {
          acc[item.type] = item.imageUrl;
          return acc;
        },
        {}
      );

      setCustomerDocs(docsObject);
    } catch (err) {
      console.log(err);
    }
  }, [passPhoto, panCard, frontAadharCard, backAadharCard]);

  useEffect(() => {
    getImages();
  }, []);

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
    setOpenImageModal({
      aadharCardModal: false,
      panCardModal: false,
      passphotoModal: false,
    });
  }

  const handleUploadPassPhoto = async () => {
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < passPhoto.length; i++) {
      formData.append('customerImage', passPhoto[i]);
    }
    try {
      const res = await httpInstance.patch(
        `customer/upload/customer-image/${editId}`,
        formData
      );
      setLoading(false);
      toast.success('Passphoto uploaded successfully');
      setPassPhoto([]);
      getImages();
      closeModal();
    } catch (err) {
      setLoading(false);
      toast.success('Passphoto must be lessthan 1mb');
      closeModal();
    }
  };

  const handleAadharCard = async () => {
    setLoading(true);
    const formData = new FormData();

    for (let i = 0; i < frontAadharCard.length; i++) {
      formData.append('aadharImageFront', frontAadharCard[i]);
    }
    for (let i = 0; i < backAadharCard.length; i++) {
      formData.append('aadharImageRear', backAadharCard[i]);
    }

    try {
      await httpInstance.patch(
        `customer/upload/aadhar-image/${editId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setLoading(false);

      getImages();
      setFrontAadharCard([]);
      setBackAadharCard([]);
      closeModal();
      toast.success('Aadharcard uploaded successfully');
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  const handlePanUpload = async () => {
    setLoading(true);
    const formData = new FormData();

    for (let i = 0; i < panCard.length; i++) {
      formData.append('panImages', panCard[i]);
    }

    try {
      await httpInstance.patch(
        `customer/upload/pan-image/${editId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setLoading(false);

      getImages();
      setPanCard([]);
      closeModal();
      toast.success('Pancard uploaded successfully');
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
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
                    src={customerDocs?.PHOTO}
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

            {customerDocs?.AADHAR_FRONT === '' ||
            customerDocs?.AADHAR_REAR === '' ? (
              <EmptyImage title="Please Upload Client's Aadharcard" />
            ) : (
              <div className='flex gap-2'>
                <div className='h-48 w-96  overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
                  <img
                    className='h-full w-full  object-cover'
                    src={customerDocs?.AADHAR_FRONT}
                  />
                </div>
                <div className='h-48 w-96  overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'>
                  <img
                    className='h-full w-full  object-cover'
                    src={customerDocs?.AADHAR_REAR}
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
            {customerDocs?.PAN === '0' ? (
              <EmptyImage title='Upload Clients Pancard or Voter ID' />
            ) : (
              <div
                className='h-48 w-96  overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
                // key={ind}
              >
                <img
                  className='h-full w-full  object-cover'
                  src={customerDocs?.PAN}
                />
              </div>
            )}
          </div>
          {/* Pancard */}

          <div className='mt-8 flex w-full items-center justify-center'>
            <div className='flex  w-[80%] justify-center'>
              <Button onClick={() => router.push('/admin/customers')}>
                Back To Customer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Passphoto */}
      <ImageModal
        isLoading={loading}
        handleClose={() =>
          setOpenImageModal({ ...openImageModal, passphotoModal: false })
        }
        isDisabled={passPhoto?.length === 0}
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
        isLoading={loading}
        handleClose={() =>
          setOpenImageModal({ ...openImageModal, aadharCardModal: false })
        }
        handleUpload={handleAadharCard}
        isDisabled={
          frontAadharCard?.length === 0 && backAadharCard?.length === 0
        }
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
        isLoading={loading}
        handleClose={() =>
          setOpenImageModal({ ...openImageModal, panCardModal: false })
        }
        isDisabled={panCard.length === 0}
        handleUpload={handlePanUpload}
        isModalOpen={openImageModal.panCardModal}
        title='Update PanCard'
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
      <SvmProjectToast />
    </>
  );
};

export default EditCustomerCollection;
