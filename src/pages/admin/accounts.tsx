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
import { useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

import { API_ENDPOINT } from '@/const/APIRoutes';

type accounrDetailProps = {
  accNo: string;
  adminAccountId: number;
  balance: number;
  bankName: string;
  name: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { req } = context;
  // const { token } = req.cookies;

  const axiosConfig = {
    withCredentials: true,
  };

  // console.log(token, 'TOKEN');
  const res = await axios.get(
    `${API_ENDPOINT.END_POINT}/account/basic-list`,
    axiosConfig
  );
  const repo = res.data.result;
  return { props: { repo } };
};

export default function Account({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [accountDetails, setAccountDetails] =
    useState<accounrDetailProps[]>(repo);

  const router = useRouter();

  const handleEdit = (id: any) => {
    router.push(`realEstateProjects/accountForm/${id}`);
  };

  const handleSearch = async (e: any) => {
    const value = e.target.value;

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT.END_POINT}/account/basic-list?searchString=${value}`
        );

        const data = res.data.result;
        console.log(data);
        setAccountDetails(data);
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
        pageTitle='Bank Accounts'
        right={
          <Link href='realEstateProjects/accountForm/addAccounts'>
            <Button>Add Accounts</Button>
          </Link>
        }
        handleSearch={handleSearch}
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
