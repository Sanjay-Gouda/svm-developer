import {
  Badge,
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
import { useEffect, useState } from 'react';
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

type TMetaProps = {
  totalCount: number;
  page: number;
  pageSize: number;
  totalQueryCount: number;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await httpInstance.get(`/project/list`);
    const meta: TMetaProps = res.data.result.meta;
    const repo = res.data.result.list;
    return { props: { repo, meta } };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      error: 'An error occurred while fetching data. Please try again later.',
    },
  };
};

export default function Projects({
  repo,
  error,
  meta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const routes = useRouter();
  const { closeModal, deleteId, handleModalOpen, isModalOpen } = useModal();
  const [projects, setProjects] = useState(repo);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (id: string) => {
    routes.push(`realEstateProjects/projectForm/${id}`);
  };

  const pageSize = meta?.pageSize;
  const totalResults = meta?.totalCount;

  const [currentPage, setCurrentPage] = useState(meta?.page);

  const handlePageChange = async (pageNumber: number) => {
    try {
      const res = await httpInstance.get(`/project/list?page=${pageNumber}`);
      setCurrentPage(res?.data?.result?.meta?.page);
      setProjects(res?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await httpInstance.get(`/project/list?page=${currentPage}`);
      setProjects(res?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await httpInstance.delete(`/project/delete/${deleteId}`);
      toast.success(res?.data?.message);

      fetchProjects();
      closeModal();
    } catch (err) {
      closeModal();
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpInstance.get(
          `/project/list?searchString=${searchQuery}`
        );

        const data = res.data.result.list;

        setProjects(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (searchQuery) {
      fetchData();
    } else {
      setProjects(repo);
    }
  }, [searchQuery]);

  const handleSearch = debounce((searchQuery: string) => {
    setSearchQuery(searchQuery);
  }, 300);

  return (
    <>
      <Layout
        pageTitle='Projects'
        right={
          <Link href='realEstateProjects/projectForm/add'>
            <Button>Add Projects</Button>
          </Link>
        }
        isShowSearchBar={true}
        handleSearch={(e) => handleSearch(e.target.value)}
      >
        {error ? (
          <ServerError />
        ) : (
          <>
            {projects?.length === 0 ? (
              <>
                <EmptyState
                  btnLable='Add projects '
                  heading='Add New Projects'
                  redirectLink='realEstateProjects/projectForm/add'
                />
              </>
            ) : (
              <TableContainer className='mb-8'>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell className='text-[14px]'>
                        Project Name
                      </TableCell>
                      {/* <TableCell className='text-[14px]'>City</TableCell> */}
                      <TableCell className='text-[14px]'>
                        Project Owner{' '}
                      </TableCell>
                      <TableCell className='text-[14px]'>Area</TableCell>
                      <TableCell className='text-[14px]'>Status</TableCell>
                      <TableCell className='text-[14px]'>Action</TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {projects?.map((data: any, ind: number) => {
                      return (
                        <TableRow key={ind}>
                          <TableCell>{data?.name}</TableCell>
                          {/* <TableCell>{data?.dist}</TableCell> */}
                          <TableCell>{data?.ownerName}</TableCell>
                          <TableCell>{data?.area} sq.ft</TableCell>

                          <TableCell>
                            <Badge
                              className='flex w-[40%] items-center justify-center py-1 text-[16px]'
                              type={
                                data.status === 'ACTIVE'
                                  ? 'primary'
                                  : data.status === 'UPCOMING'
                                  ? 'warning'
                                  : 'success'
                              }
                            >
                              {data.status}
                            </Badge>
                          </TableCell>
                          <TableCell className='flex gap-5'>
                            <MdModeEditOutline
                              onClick={() => handleEdit(data.projectId)}
                              size='24'
                              className='cursor-pointer'
                              style={{ color: ' #30bcc2' }}
                            />
                            <MdDelete
                              size='24'
                              onClick={() => handleModalOpen(data.projectId)}
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
