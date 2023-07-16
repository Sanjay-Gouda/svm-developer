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
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

import { API_ENDPOINT } from '@/const/APIRoutes';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${API_ENDPOINT.END_POINT}/expense/list`);
  const data = res.data.result;
  return { props: { data } };
};

export default function Expanses({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`realEstateProjects/expanseForm/${id}`);
  };

  return (
    <>
      <Layout
        pageTitle='Exapanses'
        right={
          <Link href='realEstateProjects/expanseForm/expanseListForm'>
            <Button>Add Expanses</Button>
          </Link>
        }
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell className='text-[14px]'>Project Name</TableCell>
                <TableCell className='text-[14px]'>Land Purchase</TableCell>
                <TableCell className='text-[14px]'>Non-Agriculture</TableCell>
                <TableCell className='text-[14px]'>Brokrage</TableCell>
                <TableCell className='text-[14px]'>Planning & Layout</TableCell>
                <TableCell className='text-[14px]'>Landvisit </TableCell>
                <TableCell className='text-[14px]'>Action </TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data?.map((list) => {
                return (
                  <TableRow key={list?.expenseId}>
                    <TableCell>{list?.projectName}</TableCell>
                    <TableCell>{list?.landPurchase}</TableCell>
                    <TableCell>{list?.nonAgricultural}</TableCell>
                    <TableCell>{list?.brokerage}</TableCell>
                    <TableCell>{list?.planningAndLayout}</TableCell>
                    <TableCell>{list?.landVisitCharge}</TableCell>
                    <TableCell className='flex gap-5'>
                      <MdModeEditOutline
                        onClick={() => handleEdit(list?.projectId)}
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
}
