import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps = async () => {
  const res = await httpInstance.get('user/list');

  const users = res?.data?.result?.list;

  return {
    props: { users },
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

const ManageUsers = ({ users }) => {
  const [userList, setUserList] = useState(users);
  const route = useRouter();

  const handleEdit = async (userId: string) => {
    route.push(`${userId}`);
  };

  const handleSearch = async (e: any) => {
    const searchvalue = e.target.value;

    const timer = setTimeout(async () => {
      try {
        const res = await httpInstance.get(
          `user/list?searchString=${searchvalue}`
        );
        setUserList(res?.data?.result?.list);
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
        pageTitle='Manage Users'
        right={
          <Link href='addUser'>
            <Button>Add User</Button>
          </Link>
        }
        isShowSearchBar={true}
        handleSearch={handleSearch}
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell className='text-[14px]'>Role</TableCell>
                <TableCell className='text-[14px]'>Name</TableCell>
                <TableCell className='text-[14px]'>Mobile No.</TableCell>
                <TableCell className='text-[14px]'>Email </TableCell>
                <TableCell className='text-[14px]'>Action </TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {userList?.map((user) => {
                return (
                  <TableRow key={user?.userId}>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.phone}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell className='flex gap-5'>
                      <MdModeEditOutline
                        size='24'
                        className='cursor-pointer'
                        style={{ color: ' #30bcc2' }}
                        onClick={() => {
                          handleEdit(user?.userId);
                        }}
                      />
                      <MdDelete
                        size='24'
                        className='cursor-pointer'
                        style={{ color: ' #F38C7F' }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
};

export default ManageUsers;
