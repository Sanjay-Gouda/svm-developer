import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

import { API_ENDPOINT } from '@/const/APIRoutes';

type customerListProps = {
  aadharNo: string;
  customerId: string;
  firstName: string;
  lastName: string;
};

const Customers = () => {
  const [customerList, setCustomerList] = useState<customerListProps[]>([]);

  /* Cutomer List */
  const getCustomerList = async () => {
    await axios({
      method: 'get',
      url: `${API_ENDPOINT.LOCAL}/customer/basic-list`,
    })
      .then((res) => {
        setCustomerList(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCustomerList();
  }, [customerList]);

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
              {customerList?.map((list: customerListProps) => {
                const { firstName, lastName } = list;

                const customerName = firstName + ' ' + lastName;

                return (
                  <TableRow key={list?.customerId}>
                    <TableCell>{customerName}</TableCell>
                    <TableCell>9098212319</TableCell>
                    <TableCell>{list?.aadharNo}</TableCell>
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
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
};

export default Customers;
