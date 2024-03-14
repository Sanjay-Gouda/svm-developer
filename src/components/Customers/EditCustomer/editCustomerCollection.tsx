import React, { useState } from 'react';

import CustomerForm from '@/components/Customers/customerForm';
import HeaderWrapper from '@/components/Customers/EditCustomer/headerWrapper';
import EditTab from '@/components/Tabs/editTab';

type activeTabState = {
  info: boolean;
  images: boolean;
};

type TEditResponse = {
  editInitialValues: any;
  editId: string;
};
const EditCustomerCollection = ({
  editId,
  editInitialValues,
}: TEditResponse) => {
  const Tabs = ['Customer Info', 'Images'];

  const [activeTab, setActiveTab] = useState<activeTabState>({
    info: true,
    images: false,
  });

  const [currentTab, setCurrentTab] = useState<string>('Customer Info');

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    tabId === 'Customer Info'
      ? setActiveTab({ images: false, info: true })
      : setActiveTab({ images: true, info: false });
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
          {/* PassPhoto List  */}'
          <div className='flex w-[80%] flex-col'>
            <HeaderWrapper
              heading='Passphoto'
              btnLable='Update'
              onClick={() => console.log('Update Passphoto')}
            />

            <div className='w-full'>
              <div className='flex w-full flex-wrap gap-2'>
                <div
                  className='h-48 w-48 overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
                  // key={ind}
                >
                  <img
                    className='h-full w-full  object-cover'
                    src='https://svm-bucket.blr1.digitaloceanspaces.com/svm/Group%2021710331973723.jpg'
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
              onClick={() => console.log('Update Passphoto')}
            />
            <div
              className='h-48 w-96  overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
              // key={ind}
            >
              <img
                className='h-full w-full  object-cover'
                // src={files.preview}
              />
            </div>
          </div>
          {/* Aadharcard */}
          {/* Pancard */}
          <div className='flex w-[80%] flex-col'>
            <HeaderWrapper
              heading='Pancard /Voter Id'
              btnLable='Update'
              onClick={() => console.log('Update Passphoto')}
            />
            <div
              className='h-48 w-96  overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
              // key={ind}
            >
              <img
                className='h-full w-full  object-cover'
                // src={files.preview}
              />
            </div>
          </div>
          {/* Pancard */}
        </div>
      )}
    </>
  );
};

export default EditCustomerCollection;
