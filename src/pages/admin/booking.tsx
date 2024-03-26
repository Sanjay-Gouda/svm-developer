import {
  Badge,
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
import React, { useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
import { SvmProjectToast } from '@/components/Toast/Toast';
import Layout from '@/containers/Layout';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // const res = await axios.get(`${API_ENDPOINT.END_POINT}/booking/list`);
    const res = await httpInstance.get('/booking/list');
    const list = res.data.result.list;
    return { props: { list } };
  } catch (err) {
    console.log(err, 'error');
  }

  return {
    props: {
      error: 'An error occurred while fetching data. Please try again later.',
    },
  };
};

export default function Booking({
  list,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [bookingList, setBookingList] = useState(list);

  const route = useRouter();

  const handleEdit = (id: string) => {
    route.push(`realEstateProjects/bookingForm/${id}`);
  };

  const handlePdfView = (id: string) => {
    route.push(`realEstateProjects/bookingForm/pdf/${id}`);
  };
  const handleAddInstallment = (id: string) => {
    route.push(`realEstateProjects/bookingForm/installment/${id}`);
  };

  const fetchData = async () => {
    try {
      const data = await httpInstance.get(`/booking/list`);
      setBookingList(data?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await httpInstance.delete(`/booking/delete/${id}`);
      toast.success(res?.data?.message || 'Booking info Deleted Successfully');
      fetchData();
    } catch (err) {
      // console.log(err);
      toast.error('Something Went wrong');
    }
  };

  const handleSearch = async (e: any) => {
    const value = e.target.value;

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT.END_POINT}/booking/list?searchString=${value}`
        );
        const data = res.data.result.list;

        setBookingList(data);
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
        pageTitle='Bookings'
        right={
          <Link href='realEstateProjects/bookingForm/registerForm'>
            <Button>Add Booking</Button>
          </Link>
        }
        isShowSearchBar={true}
        handleSearch={handleSearch}
      >
        {error ? (
          <ServerError />
        ) : (
          <>
            {bookingList?.length === 0 || list?.length === 0 ? (
              <>
                <EmptyState
                  btnLable='Add Bookings '
                  heading='Create New Bookings'
                  redirectLink='realEstateProjects/bookingForm/registerForm'
                />
              </>
            ) : (
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell className='text-[14px]'>
                        Customer Name
                      </TableCell>
                      <TableCell className='text-[14px]'>Project</TableCell>
                      <TableCell className='text-[14px]'>Area</TableCell>
                      <TableCell className='text-[14px]'>Paid Amount</TableCell>
                      <TableCell className='text-[14px]'>
                        Payment Mode{' '}
                      </TableCell>
                      <TableCell className='text-[14px]'>
                        Payment Status{' '}
                      </TableCell>
                      <TableCell className='text-[14px]'>Installment</TableCell>
                      <TableCell className='text-[14px]'>Download</TableCell>
                      <TableCell className='text-[14px]'>Action </TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {bookingList?.map((data) => {
                      return (
                        <TableRow key={data?.bookingId}>
                          <TableCell>{data?.customerName}</TableCell>
                          <TableCell>{data?.projectName}</TableCell>
                          <TableCell>{data?.area}sq.ft</TableCell>
                          <TableCell>{data?.paidAmt}</TableCell>
                          <TableCell>
                            {data?.paymentType.toLowerCase()}
                          </TableCell>

                          <TableCell>
                            <Badge
                              className='flex w-[40%] items-center justify-center py-1 text-[16px]'
                              type={
                                data?.paymentStatus === 'COMPLETED'
                                  ? 'success'
                                  : data?.paymentStatus === 'PENDING'
                                  ? 'warning'
                                  : 'primary'
                              }
                            >
                              {data?.paymentStatus?.toLowerCase()}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <Button
                              layout='outline'
                              onClick={() =>
                                handleAddInstallment(data?.bookingId)
                              }
                            >
                              Add
                            </Button>
                          </TableCell>
                          <TableCell>
                            <FaFileDownload
                              size='24'
                              style={{ color: ' #17A34B' }}
                              onClick={() => handlePdfView(data?.bookingId)}
                              className='cursor-pointer'
                            />
                          </TableCell>

                          <TableCell className='flex gap-5'>
                            <MdModeEditOutline
                              onClick={() => handleEdit(data?.bookingId)}
                              size='24'
                              className='cursor-pointer'
                              style={{ color: ' #30bcc2' }}
                            />
                            <MdDelete
                              onClick={() => handleDelete(data?.bookingId)}
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
                {/* <TableFooter>
            <Pagination
              totalResults={10}
              resultsPerPage={4}
              onChange={() => console.log('')}
              label='Table navigation'
            />
          </TableFooter> */}
              </TableContainer>
            )}
          </>
        )}
      </Layout>
      <SvmProjectToast />
    </>
  );
}
