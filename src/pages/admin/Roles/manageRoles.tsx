import { Button } from '@windmill/react-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const routes = useRouter();

  const [roles, setRoles] = useState(roleList);

  const handleEdit = (id: string) => {
    routes.push(`${id}`);
  };

  const handleSearch = (e: any) => {
    const searchValue = e.target.value;

    const timer = setTimeout(async () => {
      try {
        const res = await httpInstance.get(
          `role/advance-list?searchString=${searchValue}`
        );
        setRoles(res?.data?.result);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
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
        isShowSearchBar={true}
        handleSearch={handleSearch}
      >
        <div className='mb-4 flex w-full flex-wrap gap-4'>
          {roles?.map((list) => {
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
