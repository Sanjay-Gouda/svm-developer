import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import Link from 'next/link';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

export default function Installment() {
  return (
    <>
      <Layout
        pageTitle='Customers'
        right={
          <Link href='realEstateProjects/installmentForm/addInstallment'>
            <Button>Add Installment</Button>
          </Link>
        }
        isShowSearchBar={true}
        // handleSearch={handleSearch}
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <TableCell>Cusromer Name</TableCell>
              <TableCell>Paid Amount</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Action</TableCell>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Mehul</TableCell>
                <TableCell>10000</TableCell>
                <TableCell>Cash</TableCell>
                <TableCell className='flex gap-5'>
                  <MdModeEditOutline
                    // onClick={() => handleEdit(list?.customerId)}
                    size='24'
                    className='cursor-pointer'
                    style={{ color: ' #30bcc2' }}
                  />
                  <MdDelete
                    // onClick={() => handleView(list?.customerId)}
                    size='24'
                    className='cursor-pointer'
                    style={{ color: ' #F38C7F' }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
}
