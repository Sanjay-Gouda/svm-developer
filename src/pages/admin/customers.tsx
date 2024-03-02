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
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
import Layout from '@/containers/Layout';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { httpInstance } from '@/constants/httpInstances';

type customerListProps = {
  aadharNo: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token = context.req.headers.cookie?.split('=')[1];

    console.log(token, 'Token');
    httpInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    const res = await httpInstance.get(`/customer/advance-list`);
    const data = res.data.result.list;

    return { props: { data } };
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      error: 'An error occurred while fetching data. Please try again later.',
    },
  };
};

export default function Customers({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data, 'customerData');

  const route = useRouter();
  const [customerData, setCustomerData] = useState<any>(data);

  const handleEdit = (id: string) => {
    route.push(`realEstateProjects/customerForm/${id}`);
  };

  const handleView = (id: string) => {
    route.push(`realEstateProjects/bookingPDF/${id}`);
  };

  const handleSearch = async (e: any) => {
    const value = e.target.value;

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT.END_POINT}/customer/advance-list?searchString=${value}`
        );
        const data = res.data.result.list;

        setCustomerData(data);
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
        pageTitle='Customers'
        right={
          <Link href='realEstateProjects/customerForm/addCustomers'>
            <Button>Add Customers</Button>
          </Link>
        }
        isShowSearchBar={true}
        handleSearch={handleSearch}
      >
        {error ? (
          <>
            <ServerError />
          </>
        ) : (
          <>
            {data?.length === 0 ? (
              <>
                <EmptyState />
              </>
            ) : (
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell className='text-[14px]'>Name</TableCell>
                      <TableCell className='text-[14px]'>Mobile No</TableCell>
                      <TableCell className='text-[14px]'>
                        Aadhar-Card No
                      </TableCell>
                      <TableCell className='text-[14px]'>Email Id </TableCell>
                      <TableCell className='text-[14px]'>Action </TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {customerData?.map((list: customerListProps) => {
                      const { firstName, lastName } = list;

                      const customerName = firstName + ' ' + lastName;

                      return (
                        <TableRow key={list?.customerId}>
                          <TableCell>{customerName}</TableCell>
                          <TableCell>{list?.phone}</TableCell>
                          <TableCell>{list?.aadharNo}</TableCell>
                          <TableCell>{list?.email}</TableCell>
                          <TableCell className='flex gap-5'>
                            <MdModeEditOutline
                              onClick={() => handleEdit(list?.customerId)}
                              size='24'
                              className='cursor-pointer'
                              style={{ color: ' #30bcc2' }}
                            />
                            <MdDelete
                              onClick={() => handleView(list?.customerId)}
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
            )}
          </>
        )}
      </Layout>
    </>
  );
}
