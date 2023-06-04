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

import { setReferralList } from '@/store/refferSlice/refferList';

import { API_ENDPOINT } from '@/const/APIRoutes';

type referrerListProps = {
  firstName: string;
  referralId: string;
  phone: string;
  lastName: string;
  email: string;
  address: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${API_ENDPOINT.END_POINT}/referral/list`);
  const repo = res.data;
  return { props: { repo } };
};

export default function Refferral({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(repo);

  const [referrerList] = useState<referrerListProps[]>(repo.result);
  // const [listEditId,setListEditId] = useState<string>();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFormEdit = (id: string) => {
    router.push(`realEstateProjects/referrerForm/${id}`);
  };

  useEffect(() => {
    dispatch(setReferralList(repo.result));
  }, []);

  return (
    <Layout
      right={
        <Link href='realEstateProjects/referrerForm/addReferral/'>
          <Button>Add Referrer</Button>
        </Link>
      }
    >
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell className='text-[14px]'>Name</TableCell>
              <TableCell className='text-[14px]'>Mobile No</TableCell>
              <TableCell className='text-[14px]'>Emaild Id</TableCell>
              <TableCell className='text-[14px]'>Address</TableCell>
              <TableCell className='text-[14px]'>Action </TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {referrerList?.map((list) => {
              return (
                <TableRow key={list?.referralId}>
                  <TableCell>{list?.firstName}</TableCell>
                  <TableCell>{list?.phone}</TableCell>
                  <TableCell>{list?.email}</TableCell>
                  <TableCell>{list?.address}</TableCell>
                  <TableCell className='flex gap-5'>
                    {/* <EditIcon className='h-5 w-5 cursor-pointer' /> */}
                    <MdModeEditOutline
                      size='24'
                      className='cursor-pointer'
                      style={{ color: ' #30bcc2' }}
                      onClick={() => {
                        handleFormEdit(list?.referralId);
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
  );
}
