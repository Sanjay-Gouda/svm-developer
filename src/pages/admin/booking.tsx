import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from '@windmill/react-ui';
import Link from 'next/link';
import React from 'react';

import Layout from '@/containers/Layout';

const Booking = () => {
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
                <TableCell className='text-[14px]'>Name</TableCell>
                <TableCell className='text-[14px]'>Mobile No</TableCell>
                <TableCell className='text-[14px]'>Aadhar-Card No</TableCell>
                <TableCell className='text-[14px]'>Email Id </TableCell>
                <TableCell className='text-[14px]'>Action </TableCell>
              </tr>
            </TableHeader>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
};

export default Booking;
