import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import AddUserForm from '@/components/ManageUser/addUser';
import Layout from '@/containers/Layout';

const EditUser = () => {
  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          <AddUserForm />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default EditUser;
