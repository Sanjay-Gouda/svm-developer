import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from '@windmill/react-ui';
import axios from 'axios';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React from 'react';

import Layout from '@/containers/Layout';

import { API_ENDPOINT } from '@/const/APIRoutes';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${API_ENDPOINT.END_POINT}/booking/list`);
  const list = res.data.result;
  return { props: { list } };
};

export default function Booking({
  list,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
              </tr>
            </TableHeader>
            {/* <TableBody>
                {
                  list?.map((list)=>{
                   return(
                    <TableRow key={}>
                        <TableCell>{}</TableCell>
                      

                    </TableRow>
                   )
                  })
                }

            </TableBody> */}
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
}
