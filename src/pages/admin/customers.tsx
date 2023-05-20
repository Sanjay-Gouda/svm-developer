import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import Link from 'next/link';
import React from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

const Customers = () => {
  return (
    <>
      <Layout
        right={
          <Link href='realEstateProjects/addCustomers'>
            <Button>Add Customers</Button>
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
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>9098212319</TableCell>
                <TableCell>4087-2422-3746</TableCell>
                <TableCell>some@gmail.com</TableCell>
                <TableCell className='flex gap-5'>
                  <MdModeEditOutline
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
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
};

export default Customers;
