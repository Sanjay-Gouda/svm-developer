import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import React, { useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import AddUser from '@/components/ManageUser/addUser';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps = async () => {
  const res = await httpInstance.get('user/list');

  const users = res?.data?.result?.list;

  return {
    props: { users },
  };
};

const ManageUsers = ({ users }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userList, setUserList] = useState(users);

  return (
    <>
      <Layout
        pageTitle='Manage Roles'
        right={<Button onClick={() => setIsOpenModal(true)}>Add User</Button>}
      >
        <AddUser
          openModal={isOpenModal}
          closeModal={() => setIsOpenModal(false)}
        />

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
                    <TableCell>{user?.roleId}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.phone}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell className='flex gap-5'>
                      <MdModeEditOutline
                        size='24'
                        className='cursor-pointer'
                        style={{ color: ' #30bcc2' }}
                        // onClick={() => {
                        //   handleEdit(details?.adminAccountId);
                        // }}
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
