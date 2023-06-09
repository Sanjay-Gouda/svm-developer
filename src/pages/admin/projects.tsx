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
import { useEffect } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import Layout from '@/containers/Layout';

import { setProjectList } from '@/store/projectSlices/projectList';

import { API_ENDPOINT } from '@/const/APIRoutes';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${API_ENDPOINT.END_POINT}project/list`);
  const repo = res.data.result.list;
  return { props: { repo } };
};

export default function Projects({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();
  const routes = useRouter();

  useEffect(() => {
    dispatch(setProjectList(repo));
  }, []);

  const handleEdit = (id: string) => {
    routes.push(`realEstateProjects/projectForm/${id}`);
  };

  return (
    <Layout
      right={
        <Link href='realEstateProjects/projectForm/add'>
          <Button>Add Projects</Button>
        </Link>
      }
    >
      <TableContainer className='mb-8'>
        <Table>
          <TableHeader>
            <tr>
              <TableCell className='text-[14px]'>Project Name</TableCell>
              <TableCell className='text-[14px]'>City</TableCell>
              <TableCell className='text-[14px]'>Area</TableCell>
              <TableCell className='text-[14px]'>Project Owner </TableCell>
              <TableCell className='text-[14px]'>Status</TableCell>
              <TableCell className='text-[14px]'>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {repo.map((data: any, ind: number) => {
              return (
                <TableRow key={ind}>
                  <TableCell>{data?.name}</TableCell>
                  <TableCell>{data?.area}</TableCell>
                  <TableCell>{data?.pincode}</TableCell>
                  <TableCell>{data?.ownerName}</TableCell>

                  <TableCell>
                    <Badge
                      className='flex w-[40%] items-center justify-center py-1 text-[16px]'
                      type={
                        data.status === 'ACTIVE'
                          ? 'success'
                          : data.status === 'UPCOMING'
                          ? 'warning'
                          : 'warning'
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
            onChange={() => {
              console.log('hello');
            }}
            label='Table navigation'
          />
        </TableFooter> */}
      </TableContainer>
    </Layout>
  );
}
