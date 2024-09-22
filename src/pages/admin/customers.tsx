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
import { toast } from 'react-toastify';

import { useModal } from '@/hooks/useModal';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
import DeleteModal from '@/components/Modal';
import SvmPagination from '@/components/Pagination';
import { SvmProjectToast } from '@/components/Toast/Toast';
import Layout from '@/containers/Layout';

import { httpInstance, setAuthHeader } from '@/constants/httpInstances';

type customerListProps = {
  city: string;
  customerId: string;
  name: string;
  state: string;
  phone1: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    setAuthHeader(context);

    const res = await httpInstance.get(`/customer/advance-list`);
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

export default function Customers({
  data,
  error,
  meta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(meta);
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
        `/customer/advance-list?page=${pageNumber}`
      );
      setCurrentPage(res?.data?.result?.meta?.page);
      setCustomerData(res?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  const [customerData, setCustomerData] = useState<any>(data);

  const handleEdit = (id: string) => {
    route.push(`realEstateProjects/customerForm/${id}`);
  };

  const reFetchData = async () => {
    try {
      const data = await httpInstance.get(
        `/customer/advance-list?page=${currentPage}`
      );
      setCustomerData(data?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await httpInstance.delete(`/customer/delete/${deleteId}`);
      toast.success(res?.data?.message || 'Customer Deleted Successfully');
      reFetchData();
      closeModal();
    } catch (err) {
      // console.log(err);
      toast.success('Something Went wrong');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpInstance.get(
          `/customer/advance-list?searchString=${searchQuery}`
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
        pageTitle='Customers'
        right={
          <Link href='realEstateProjects/customerForm/addCustomers'>
            <Button>Add Customers</Button>
          </Link>
        }
        isShowSearchBar={true}
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
                  btnLable='Add Customers '
                  heading='Add New Customers'
                  redirectLink='realEstateProjects/customerForm/addCustomers'
                />
              </>
            ) : (
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell className='text-[14px]'>Name</TableCell>
                      <TableCell className='text-[14px]'>Mobile No</TableCell>
                      <TableCell className='text-[14px]'>State</TableCell>
                      <TableCell className='text-[14px]'>City </TableCell>
                      <TableCell className='text-[14px]'>Action </TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {customerData?.map((list: customerListProps) => {
                      return (
                        <TableRow key={list?.customerId}>
                          <TableCell>{list?.name}</TableCell>
                          <TableCell>{list?.phone1}</TableCell>
                          <TableCell>{list?.state}</TableCell>
                          <TableCell>{list?.city}</TableCell>
                          <TableCell className='flex  justify-start gap-3 '>
                            <MdModeEditOutline
                              onClick={() => handleEdit(list?.customerId)}
                              size='24'
                              className='cursor-pointer'
                              style={{ color: ' #30bcc2' }}
                            />
                            <MdDelete
                              onClick={() => handleModalOpen(list?.customerId)}
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
                <TableFooter className='text-[14px]'>
                  <SvmPagination
                    onChange={handlePageChange}
                    resultsPerPage={pageSize}
                    totalResults={totalResults}
                  />
                </TableFooter>
              </TableContainer>
            )}
          </>
        )}
      </Layout>
      <SvmProjectToast />
      <DeleteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
      />
    </>
  );
}
