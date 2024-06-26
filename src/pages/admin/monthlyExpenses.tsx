import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from '@windmill/react-ui';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await httpInstance.get('/expense/monthly-list');
    const list = res.data.result;
    console.log(res.data.result);
    return { props: { list } };
  } catch (err) {
    return err;
  }
};

export default function MonthlyExpenses({ list }) {
  console.log(list);
  return (
    <>
      <Layout
        pageTitle='Monthly Expenses'
        right={
          <Link href='realEstateProjects/monthlyExpenseForm/addExpenses'>
            <Button>Add Expenses</Button>
          </Link>
        }
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell className='text-[14px]'>Months</TableCell>
                <TableCell className='text-[14px]'>Dates</TableCell>
                <TableCell className='text-[14px]'>Action</TableCell>
              </tr>
            </TableHeader>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
}
