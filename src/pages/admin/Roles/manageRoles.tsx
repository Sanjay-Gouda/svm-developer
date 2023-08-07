import { Button } from '@windmill/react-ui';
import React, { useState } from 'react';

import AddUser from '@/components/ManageUser/addUser';
import Layout from '@/containers/Layout';

const ManageRoles = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Layout
        pageTitle='Manage Roles'
        right={<Button onClick={() => setIsOpenModal(true)}>Add Roles</Button>}
      >
        <AddUser
          openModal={isOpenModal}
          closeModal={() => setIsOpenModal(false)}
        />
      </Layout>
    </>
  );
};

export default ManageRoles;
