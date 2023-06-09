import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import axios from 'axios';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import Layout from '@/containers/Layout';

import { setAccountList } from '@/store/accountSlice/accountList';

import { API_ENDPOINT } from '@/const/APIRoutes';

type accounrDetailProps = {
  accNo: string;
  adminAccountId: number;
  balance: number;
  bankName: string;
  name: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { token } = req.cookies;

  const axiosConfig = {
    withCredentials: true,
  };

  // console.log(token, 'TOKEN');
  const res = await axios.get(
    `${API_ENDPOINT.END_POINT}/account/basic-list`,
    axiosConfig
  );
  const repo = res.data;
  return { props: { repo } };
};

export default function Account({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [accountDetails] = useState<accounrDetailProps[]>(repo.result);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setAccountList(repo.result));
  }, []);

  const handleEdit = (id) => {
    router.push(`realEstateProjects/accountForm/${id}`);
  };

  return (
    <>
      <Layout
        right={
          <Link href='realEstateProjects/accountForm/addAccounts'>
            <Button>Add Accounts</Button>
          </Link>
        }
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell className='text-[14px]'>Bank Name</TableCell>
                <TableCell className='text-[14px]'>
                  Account Holdername
                </TableCell>
                <TableCell className='text-[14px]'>Account No.</TableCell>
                <TableCell className='text-[14px]'>Action </TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {accountDetails?.map((details) => {
                return (
                  <TableRow key={details?.adminAccountId}>
                    <TableCell>{details?.bankName}</TableCell>
                    <TableCell>{details?.name}</TableCell>
                    <TableCell>{details?.accNo}</TableCell>
                    <TableCell className='flex gap-5'>
                      <MdModeEditOutline
                        size='24'
                        className='cursor-pointer'
                        style={{ color: ' #30bcc2' }}
                        onClick={() => {
                          handleEdit(details?.adminAccountId);
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
}
