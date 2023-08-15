import { Button } from '@windmill/react-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

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
  const routes = useRouter();

  const handleEdit = (id) => {
    routes.push(`${id}`);
  };

  return (
    <>
      <Layout
        pageTitle='Manage Roles'
        right={
          <Link href='addRole'>
            <Button>Add User</Button>
          </Link>
        }
      >
        <div className='mb-4 flex w-full flex-wrap gap-4'>
          {roleList?.map((list) => {
            return (
              <Rolecard
                label={list?.label}
                key={list?.roleId}
                permissions={list?.permission}
                handleEdit={() => handleEdit(list.roleId)}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default ManageRoles;
