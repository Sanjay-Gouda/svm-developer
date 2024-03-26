import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

type TinstallmentList = {
  amount: string;
  bookingId: string;
  installmentId: string;
  installmentNo: number;
  isDelete: boolean;
  paymentType: string;
  penalty: number;
};

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
  const [installmentList, setInstallmentList] =
    useState<TinstallmentList[]>(list);

  const router = useRouter();
  const handleEdit = (editId: string) => {
    router.push(`realEstateProjects/installmentForm/${editId}`);
  };

  const handlePreviewReceipt = (id: string) => {
    router.push(`realEstateProjects/installmentForm/pdf/${id}`);
  };

  return (
    <>
      <Layout
        pageTitle='Installment'
        isShowSearchBar={false}
        // handleSearch={handleSearch}
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Cusromer Name</TableCell>
                <TableCell>Paid Amount</TableCell>
                <TableCell>Payment Type</TableCell>
                <TableCell>Receipt</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {installmentList?.map((item: TinstallmentList) => (
                <TableRow key={item.bookingId}>
                  <TableCell>Mehul</TableCell>
                  <TableCell>{item?.amount}</TableCell>
                  <TableCell>{item?.paymentType}</TableCell>
                  <TableCell>
                    <FaFileDownload
                      size='24'
                      style={{ color: ' #17A34B' }}
                      onClick={() => handlePreviewReceipt(item?.installmentId)}
                      className='cursor-pointer'
                    />
                  </TableCell>
                  <TableCell className='flex gap-5'>
                    <MdModeEditOutline
                      onClick={() => handleEdit(item?.installmentId)}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
}
