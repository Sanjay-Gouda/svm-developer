import { Button } from '@windmill/react-ui';
import React, { useState } from 'react';

import Rolecard from '@/components/RoleCard';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps = async () => {
  const res = await httpInstance.get(`role/advance-list`);

  const roleList = res?.data?.result;

  return {
    props: { roleList },
  };
};

const ManageRoles = ({ roleList }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log(roleList, 'list');

  return (
    <>
      <Layout
        pageTitle='Manage Roles'
        right={<Button onClick={() => setIsOpenModal(true)}>Add User</Button>}
      >
        {/* <AddUser
          openModal={isOpenModal}
          closeModal={() => setIsOpenModal(false)}
        /> */}

        {/* {roleList?.map((list) => {
          return (
            <div className='flex w-full flex-wrap gap-4' key={list?.roleId}>
              <Rolecard label={list?.label} />
              </div>
              );
            })} */}
        <div className='flex w-full flex-wrap gap-4'>
          {roleList?.map((list) => {
            return (
              <Rolecard
                label={list?.label}
                key={list?.roleId}
                permissions={list?.permission}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default ManageRoles;
