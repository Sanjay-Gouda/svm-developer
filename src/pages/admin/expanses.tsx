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
import { useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
import Layout from '@/containers/Layout';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await httpInstance.get('/expense/list');
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

export default function Expanses({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [expanseData, setExpanseData] = useState(data);

  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`realEstateProjects/expanseForm/${id}`);
  };

  const handleSearch = async (e: any) => {
    const value = e.target.value;

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT.END_POINT}/expense/list?searchString=${value}`
        );
        const data = res.data.result.list;

        setExpanseData(data);
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
        pageTitle='Expenses'
        right={
          <Link href='realEstateProjects/expanseForm/expanseListForm'>
            <Button>Add Expenses</Button>
          </Link>
        }
        isShowSearchBar={true}
      >
        {error ? (
          <>
            <ServerError />
          </>
        ) : (
          <>
            {data.length === 0 ? (
              <>
                <EmptyState
                  btnLable='Add Expenses '
                  heading='Add your Project expenses '
                  redirectLink='realEstateProjects/expanseForm/expanseListForm'
                />
              </>
            ) : (
              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell className='text-[14px]'>
                        Project Name
                      </TableCell>
                      <TableCell className='text-[14px]'>
                        Land Purchase
                      </TableCell>
                      <TableCell className='text-[14px]'>
                        Non-Agriculture
                      </TableCell>
                      <TableCell className='text-[14px]'>Brokerage</TableCell>
                      <TableCell className='text-[14px]'>
                        Planning & Layout
                      </TableCell>
                      <TableCell className='text-[14px]'>Landvisit </TableCell>
                      <TableCell className='text-[14px]'>Action </TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {expanseData?.map((list) => {
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
            )}
          </>
        )}
      </Layout>
    </>
  );
}
