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
import React, { useEffect } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import Layout from '@/containers/Layout';

import { setBookingList } from '@/store/bookingSlice/bookingList';

import { API_ENDPOINT } from '@/const/APIRoutes';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${API_ENDPOINT.END_POINT}/booking/list`);
  const list = res.data.result;
  return { props: { list } };
};

export default function Booking({
  list,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const route = useRouter();
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    route.push(`realEstateProjects/bookingForm/${id}`);
  };

  useEffect(() => {
    dispatch(setBookingList(list));
  }, []);

  return (
    <>
      <Layout
        right={
          <Link href='realEstateProjects/bookingForm/registerForm'>
            <Button>Booking</Button>
          </Link>
        }
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell className='text-[14px]'>Customer Name</TableCell>
                <TableCell className='text-[14px]'>Project</TableCell>
                <TableCell className='text-[14px]'>Area</TableCell>
                <TableCell className='text-[14px]'>Landmark</TableCell>
                <TableCell className='text-[14px]'>Paid Amount</TableCell>
                <TableCell className='text-[14px]'>Payment Mode </TableCell>
                <TableCell className='text-[14px]'>Payment Status </TableCell>
                <TableCell className='text-[14px]'>Action </TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {list?.map((list) => {
                return (
                  <TableRow key={list?.bookingId}>
                    <TableCell>{list?.customerName}</TableCell>
                    <TableCell>{list?.projectName}</TableCell>
                    <TableCell>{list?.area}sq m</TableCell>
                    <TableCell>{list?.address2}</TableCell>
                    <TableCell>{list?.paidAmt}</TableCell>
                    <TableCell>{list?.paymentType.toLowerCase()}</TableCell>
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
          {/* <TableFooter>
            <Pagination
              totalResults={10}
              resultsPerPage={4}
              onChange={() => console.log('')}
              label='Table navigation'
            />
          </TableFooter> */}
        </TableContainer>
      </Layout>
    </>
  );
}
