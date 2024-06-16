import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

type TinstallmentList = {
  amount: string;
  bookingId: string;
  installmentId: string;
  installmentNo: number;
  isDelete: boolean;
  paymentType: string;
  createdAt: string;
  penalty: number;
  customer: unknown[];
};

export const getServerSideProps: GetServerSideProps = async (params) => {
  try {
    const bookingId = params?.params?.id;
    const res = await httpInstance.get(
      `/installment/list?bookingId=${bookingId}`
    );
    const installmentHistoryList = res.data.result.list;
    return {
      props: {
        installmentHistoryList,
        bookingId,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      error: 'An error occurred while fetching data. Please try again later.',
    },
  };
};

const InstallmentHistory = ({ installmentHistoryList, error, bookingId }) => {
  const [installmentList, setInstallmentList] = useState<TinstallmentList[]>(
    installmentHistoryList
  );

  const customerNames = installmentHistoryList
    ?.slice(0, 1)
    .map((item) =>
      item?.customer?.map((customer) => customer?.name).join(', ')
    );

  const router = useRouter();

  const handleEdit = (editId: string) => {
    router.push(`installmentEdit/${editId}`);
  };

  const handlePreviewReceipt = (id: string) => {
    router.push(`receipt/${id}`);
  };

  const fetchData = async () => {
    try {
      const data = await httpInstance.get(`/installment/list`);
      setInstallmentList(data?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await httpInstance.delete(`installment/delete/${id}`);
      toast.success(res?.data?.message || 'Customer Deleted Successfully');
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error('Something Went wrong');
    }
  };

  const headingStyle = {
    fontSize: '14px',
  };

  const downloadInstallmentHistory = () => {
    router.push(`history/${bookingId}`);
  };

  return (
    <>
      <Layout
        pageTitle={`Installment of ${customerNames}`}
        right={
          <>
            <Button onClick={downloadInstallmentHistory}>
              Download History
            </Button>
            <Link href='/admin/booking'>
              <Button layout='outline'>Back to Booking</Button>
            </Link>
          </>
        }
      >
        {error ? (
          <>
            <ServerError />
          </>
        ) : installmentHistoryList?.length === 0 ? (
          <>
            <EmptyState
              btnLable='Add Installment '
              heading='Customer has not paid any installment yet'
              redirectLink={`addInstallment/${bookingId}`}
            />
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell style={headingStyle}>Sr. No</TableCell>
                    <TableCell style={headingStyle}>Date</TableCell>
                    <TableCell style={headingStyle}>Amount</TableCell>
                    <TableCell style={headingStyle}>Mode</TableCell>
                    <TableCell style={headingStyle}>Receipt</TableCell>
                    <TableCell style={headingStyle}>Action</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installmentList?.map((item: TinstallmentList) => (
                    <TableRow key={item.bookingId}>
                      <TableCell>{item?.installmentNo}</TableCell>
                      <TableCell>
                        {item?.createdAt
                          ?.split('T')[0]
                          ?.split('-')
                          ?.reverse()
                          ?.join('-')}
                      </TableCell>
                      <TableCell>{item?.amount}</TableCell>
                      <TableCell>{item?.paymentType}</TableCell>
                      <TableCell>
                        <FaFileDownload
                          size='24'
                          style={{ color: ' #17A34B' }}
                          onClick={() =>
                            handlePreviewReceipt(item?.installmentId)
                          }
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
                          onClick={() => handleDelete(item?.installmentId)}
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
          </>
        )}
      </Layout>
      <ToastContainer />
    </>
  );
};

export default InstallmentHistory;
