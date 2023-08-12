import { Card, CardBody } from '@windmill/react-ui';
import React from 'react';

import AddUserForm from '@/components/ManageUser/addUser';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps = async (params) => {
  const userId = params.params.id;
  const res = await httpInstance.get(`user/get/${userId}`);
  const userData = res?.data?.result;

  return {
    props: { userData },
  };
};
type RoleProps = {
  id: string;
  name: string;
};

type addUser = {
  name: string;
  phone: number | undefined;
  email: string;
  userRole: RoleProps;
};
const AddUser = ({ userData }) => {
  const { name, phone, email, role, userId, roleId } = userData;

  const editUserRole = {
    id: roleId,
    name: role,
  };
  const editValues = {
    name: name,
    phone: phone,
    email: email,
    userRole: editUserRole,
  };

  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          <AddUserForm editValues={editValues} editId={userId} />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default AddUser;
