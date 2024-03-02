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
import { MdModeEditOutline } from 'react-icons/md';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
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
            <Button>Booking</Button>
          </Link>
        }
        isShowSearchBar={true}
        handleSearch={handleSearch}
      >
        {error ? (
          <ServerError />
        ) : (
          <>
            {list?.length === 0 ? (
              <>
                <EmptyState />
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
                      <TableCell className='text-[14px]'>Landmark</TableCell>
                      <TableCell className='text-[14px]'>Paid Amount</TableCell>
                      <TableCell className='text-[14px]'>
                        Payment Mode{' '}
                      </TableCell>
                      <TableCell className='text-[14px]'>
                        Payment Status{' '}
                      </TableCell>
                      <TableCell className='text-[14px]'>Action </TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {bookingList?.map((list) => {
                      return (
                        <TableRow key={list?.bookingId}>
                          <TableCell>{list?.customerName}</TableCell>
                          <TableCell>{list?.projectName}</TableCell>
                          <TableCell>{list?.area}sq.ft</TableCell>
                          <TableCell>{list?.address2}</TableCell>
                          <TableCell>{list?.paidAmt}</TableCell>
                          <TableCell>
                            {list?.paymentType.toLowerCase()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className='flex w-[40%] items-center justify-center py-1 text-[16px]'
                              type={
                                list?.paymentStatus === 'COMPLETED'
                                  ? 'success'
                                  : list?.paymentStatus === 'PENDING'
                                  ? 'warning'
                                  : 'primary'
                              }
                            >
                              {list?.paymentStatus.toLowerCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className='flex gap-5'>
                            <MdModeEditOutline
                              onClick={() => handleEdit(list?.bookingId)}
                              size='24'
                              className='cursor-pointer'
                              style={{ color: ' #30bcc2' }}
                            />

                            <FaFileDownload
                              size='24'
                              style={{ color: ' #17A34B' }}
                              onClick={() => handlePdfView(list?.bookingId)}
                              className='cursor-pointer'
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
    </>
  );
}
