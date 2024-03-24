import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await httpInstance.get(`/installment/list`);
    const list = res.data.result.list;
    return { props: { list } };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      error: 'Error occured',
    },
  };
};

export default function Installment({
  list,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(list);
  const [installmentList, setInstallmentList] = useState(list);

  return (
    <>
      <Layout
        pageTitle='Installment'
        right={
          <Link href='realEstateProjects/installmentForm/addInstallment'>
            <Button>Add Installment</Button>
          </Link>
        }
        isShowSearchBar={true}
        // handleSearch={handleSearch}
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Cusromer Name</TableCell>
                <TableCell>Paid Amount</TableCell>
                <TableCell>Payment Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Mehul</TableCell>
                <TableCell>10000</TableCell>
                <TableCell>Cash</TableCell>
                <TableCell className='flex gap-5'>
                  <MdModeEditOutline
                    // onClick={() => handleEdit(list?.customerId)}
                    size='24'
                    className='cursor-pointer'
                    style={{ color: ' #30bcc2' }}
                  />
                  <MdDelete
                    // onClick={() => handleView(list?.customerId)}
                    size='24'
                    className='cursor-pointer'
                    style={{ color: ' #F38C7F' }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
}
