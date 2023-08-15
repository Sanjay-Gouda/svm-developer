import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import AddRoleForm from '@/components/ManageRoles/addRole';
import Layout from '@/containers/Layout';

const AddRole = () => {
  return (
    <Layout>
      <Card className='mx-auto w-full p-2'>
        <CardBody>
          <AddRoleForm />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default AddRole;
