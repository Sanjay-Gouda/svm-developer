import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import debounce from 'lodash/debounce';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { useModal } from '@/hooks/useModal';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
import DeleteModal from '@/components/Modal';
import SvmPagination from '@/components/Pagination';
import { SvmProjectToast } from '@/components/Toast/Toast';
import Layout from '@/containers/Layout';

import { httpInstance, setAuthHeader } from '@/constants/httpInstances';

interface BookingItem {
  bookingId: string;
  area: number;
  projectName: string;
  customerName: string[]; // assuming it's always an array of strings
  adminBankName: string | null;
  totalAmt: number;
  paidAmt: number;
  status: 'CANCEL' | string;
  remainAmt: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    setAuthHeader(context);

    const res = await httpInstance.get(`/booking/cancel-list`);

    const meta = res.data.result.meta;
    const data = res.data.result.list;
    return { props: { data, meta } };
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      error: 'An error occurred while fetching data. Please try again later.',
    },
  };
};

export default function CancelledBookings({
  data,
  error,
  meta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data, ' Data from client side props');

  const route = useRouter();
  const { isModalOpen, closeModal, openModal, deleteId, handleModalOpen } =
    useModal();
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = meta?.pageSize;
  const totalResults = meta?.totalCount;

  const [currentPage, setCurrentPage] = useState(meta?.page);

  const handlePageChange = async (pageNumber: number) => {
    try {
      const res = await httpInstance.get(
        `/booking/cancel-list?page=${pageNumber}`
      );
      setCurrentPage(res?.data?.result?.meta?.page);
      setCustomerData(res?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  const [customerData, setCustomerData] = useState<any>(data);

  const reFetchData = async () => {
    try {
      const data = await httpInstance.get(
        `/booking/cancel-list?page=${currentPage}`
      );
      setCustomerData(data?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     const res = await httpInstance.delete(`/customer/delete/${deleteId}`);
  //     toast.success(res?.data?.message || 'Customer Deleted Successfully');
  //     reFetchData();
  //     closeModal();
  //   } catch (err) {
  //     // console.log(err);
  //     toast.success('Something Went wrong');
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpInstance.get(
          `/cancel-list?searchString=${searchQuery}`
        );

        const data = res.data.result.list;

        setCustomerData(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (searchQuery) {
      fetchData();
    } else {
      console.log('Hey You Called Me');
      // setCustomerData(data);
      reFetchData();
    }
  }, [searchQuery]);

  const handleSearch = debounce((searchQuery: string) => {
    setSearchQuery(searchQuery);
  }, 300);

  return (
    <>
      <Layout
        pageTitle='Cancelled Booking'
        // right={
        //   <Link href='realEstateProjects/customerForm/addCustomers'>
        //     <Button>Add Customers</Button>
        //   </Link>
        // }
        // isShowSearchBar={true}
        handleSearch={(e) => handleSearch(e.target.value)}
      >
        {error ? (
          <>
            <ServerError />
          </>
        ) : (
          <>
            {customerData?.length === 0 ? (
              <>
                <EmptyState
                  btnLable='Add Cancelled Booking'
                  heading='No Booking Cancelled Yet'
                  // redirectLink='realEstateProjects/customerForm/addCustomers'
                />
              </>
            ) : (
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      {/* <TableCell className='text-[14px] font-semibold text-black dark:text-gray-200'>
                        Booking Id
                      </TableCell> */}
                      <TableCell className='text-[14px] font-semibold text-black dark:text-gray-200'>
                        Customer Name
                      </TableCell>
                      <TableCell className='text-[14px] font-semibold text-black dark:text-gray-200'>
                        projectName
                      </TableCell>
                      <TableCell className='text-[14px] font-semibold text-black dark:text-gray-200'>
                        Remain Amount
                      </TableCell>
                      <TableCell className='text-[14px] font-semibold text-black dark:text-gray-200'>
                        Paid Amount
                      </TableCell>
                      <TableCell className='text-[14px] font-semibold text-black dark:text-gray-200'>
                        Total Amount
                      </TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {customerData?.map((list: BookingItem) => {
                      return (
                        <TableRow key={list?.bookingId}>
                          <TableCell>{list?.customerName}</TableCell>
                          <TableCell>{list?.projectName}</TableCell>
                          <TableCell>{list?.remainAmt}</TableCell>
                          <TableCell>{list?.paidAmt}</TableCell>
                          <TableCell>{list?.totalAmt}</TableCell>
                          <TableCell className='flex  justify-start gap-3 '>
                            {/* <FaEye
                              // onClick={() => handleEdit(list?.customerId)}
                              size='24'
                              className='cursor-pointer'
                              style={{ color: ' #30bcc2' }}
                            /> */}
                            {/* <MdDelete
                              onClick={() => handleModalOpen(list?.customerId)}
                              size='24'
                              className='cursor-pointer'
                              style={{ color: ' #F38C7F' }}
                            /> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {/* <TableFooter className='text-[14px]'>
                  <SvmPagination
                    onChange={handlePageChange}
                    resultsPerPage={pageSize}
                    totalResults={totalResults}
                  />
                </TableFooter> */}
              </TableContainer>
            )}
          </>
        )}
      </Layout>
      <SvmProjectToast />
      {/* <DeleteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
      /> */}
    </>
  );
}
