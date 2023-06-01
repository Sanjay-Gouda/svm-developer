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

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${API_ENDPOINT.END_POINT}/account/basic-list`);
  const repo = res.data;
  return { props: { repo } };
};

export default function Account({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(repo.result);
  const [accountDetails] = useState<accounrDetailProps[]>(repo.result);

  return (
    <>
      <Layout
        right={
          <Link href='realEstateProjects/addAccounts'>
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
