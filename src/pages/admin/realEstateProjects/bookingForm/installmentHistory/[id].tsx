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
    console.log(router.pathname);
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
  return (
    <>
      <Layout
        pageTitle={`Installment of ${customerNames}`}
        right={
          <Link href='/admin/booking'>
            <Button>Back to Booking</Button>
          </Link>
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
                    <TableCell>Installment No</TableCell>
                    <TableCell>Paid Amount</TableCell>
                    <TableCell>Payment Type</TableCell>
                    <TableCell>Receipt</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installmentList?.map((item: TinstallmentList) => (
                    <TableRow key={item.bookingId}>
                      <TableCell>
                        {/* {item?.customer
                      ?.map((customer) => customer?.name)
                      .join(', ')} */}

                        {item?.installmentNo}
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
