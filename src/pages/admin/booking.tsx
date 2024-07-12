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
import { FaFileDownload } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import { useModal } from '@/hooks/useModal';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
import DeleteModal from '@/components/Modal';
import SvmPagination from '@/components/Pagination';
import { SvmProjectToast } from '@/components/Toast/Toast';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // const res = await axios.get(`${API_ENDPOINT.END_POINT}/booking/list`);
    const res = await httpInstance.get('/booking/list');
    const list = res.data.result.list;
    const meta = res.data.result.meta;
    return { props: { list, meta } };
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
  meta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [bookingList, setBookingList] = useState(list);
  const pageSize = meta?.pageSize;
  const totalResults = meta?.totalCount;

  const [currentPage, setCurrentPage] = useState(meta?.page);
  const [searchQuery, setSearchQuery] = useState('');
  const route = useRouter();

  const handlePageChange = async (pageNumber: number) => {
    try {
      const res = await httpInstance.get(`/booking/list?page=${pageNumber}`);
      setCurrentPage(res?.data?.result?.meta?.page);
      setBookingList(res?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };
  const { isModalOpen, closeModal, openModal, deleteId, handleModalOpen } =
    useModal();

  function truncateText(text: string) {
    if (text.length > 15) {
      return text.substring(0, 10) + '...';
    }
    return text;
  }

  const handleEdit = (id: string) => {
    route.push(`realEstateProjects/bookingForm/${id}`);
  };

  const handlePdfView = (id: string) => {
    route.push(`realEstateProjects/bookingForm/pdf/${id}`);
  };
  const handleAddInstallment = (id: string) => {
    // console.log(id, 'ID');
    route.push(
      `realEstateProjects/bookingForm/installmentHistory/addInstallment/${id}`
    );
  };

  const fetchData = async () => {
    try {
      const data = await httpInstance.get(`/booking/list?${currentPage}`);
      setBookingList(data?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewInstallment = (id: string) => {
    route.push(`realEstateProjects/bookingForm/installmentHistory/${id}`);
  };

  const handleDelete = async () => {
    try {
      const res = await httpInstance.delete(`/booking/delete/${deleteId}`);
      toast.success(res?.data?.message || 'Booking info Deleted Successfully');
      fetchData();
      closeModal();
    } catch (err) {
      closeModal();
      // console.log(err);
      toast.error('Something Went wrong');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpInstance.get(
          `/booking/list?searchString=${searchQuery}`
        );

        const data = res.data.result.list;

        setBookingList(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (searchQuery) {
      fetchData();
    } else {
      setBookingList(list);
    }
  }, [searchQuery]);

  const handleSearch = debounce((searchQuery: string) => {
    setSearchQuery(searchQuery);
  }, 300);

  const handlePanltyHistory = (id: string) => {
    route.push(`realEstateProjects/bookingForm/penaltyHistory/${id}`);
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
        handleSearch={(e) => handleSearch(e.target.value)}
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
                      <TableCell className='text-[14px]'>
                        Total Amount
                      </TableCell>
                      <TableCell className='text-[14px]'>Paid Amount</TableCell>
                      <TableCell className='text-[14px]'>
                        Remaining Amount
                      </TableCell>
                      <TableCell className='text-[14px]'>Installment</TableCell>
                      <TableCell className='text-[14px]'>Penalty</TableCell>
                      {/* <TableCell className='text-[14px]'>
                        Penalty History
                      </TableCell> */}
                      <TableCell className='text-[14px]'>Download</TableCell>
                      <TableCell className='text-[14px]'>Action </TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {bookingList?.map((data) => {
                      return (
                        <TableRow key={data?.bookingId}>
                          {/* <TableCell>{data?.customerName}</TableCell> */}
                          <TableCell>
                            {data?.customerName
                              ?.map((customer) => truncateText(customer))
                              .join(', ')}
                          </TableCell>

                          <TableCell>
                            {truncateText(data?.projectName)}
                          </TableCell>
                          <TableCell>{data?.area}sq.ft</TableCell>
                          <TableCell>{data?.totalAmt}</TableCell>
                          <TableCell>{data?.paidAmt}</TableCell>
                          <TableCell>{data?.remainAmt}</TableCell>

                          <TableCell style={{ display: 'flex', gap: '8px' }}>
                            <Button
                              layout='outline'
                              onClick={() =>
                                handleAddInstallment(data?.bookingId)
                              }
                            >
                              Add
                            </Button>
                            <Button
                              layout='outline'
                              onClick={() =>
                                handleViewInstallment(data?.bookingId)
                              }
                            >
                              View
                            </Button>
                          </TableCell>
                          {/* <TableCell>
                            <Button
                              layout='outline'
                              onClick={() =>
                                handleViewInstallment(data?.bookingId)
                              }
                            >
                              View
                            </Button>
                          </TableCell> */}
                          <TableCell>
                            <Button
                              layout='outline'
                              onClick={() =>
                                handlePanltyHistory(data?.bookingId)
                              }
                            >
                              Penalty
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
                              onClick={() => handleModalOpen(data?.bookingId)}
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
                <TableFooter>
                  <SvmPagination
                    totalResults={totalResults}
                    resultsPerPage={pageSize}
                    onChange={handlePageChange}
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
