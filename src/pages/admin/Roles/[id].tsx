import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import AddRoleForm from '@/components/ManageRoles/addRole';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps = async (params) => {
  const roleId = params.params.id;

  const res = await httpInstance.get(`role/get/${roleId}`);

  const roleDetails = res?.data?.result;

  return {
    props: { roleDetails },
  };
};

const EditRole = ({ roleDetails }) => {
  console.log(roleDetails);

  return (
    <Layout>
      <Card className='mx-auto w-full p-2'>
        <CardBody>
          <AddRoleForm editValues={roleDetails} />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default EditRole;
