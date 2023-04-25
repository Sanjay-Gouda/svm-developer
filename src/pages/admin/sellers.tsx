import {
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import Link from 'next/link';

import Layout from '@/containers/Layout';
export default function Sellers() {
  return (
    <Layout
      right={
        <Link href='realEstateProjects/addProject'>
          <Button>Add Seller</Button>
        </Link>
      }
    >
      <TableContainer className='mb-8'>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Seller ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>AdharCard Number</TableCell>
              <TableCell>Total Vehicles Sold</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1232</TableCell>
              <TableCell>John</TableCell>
              <TableCell>admin@gmail.com</TableCell>
              <TableCell>1234 3423 2342 2342</TableCell>
              <TableCell>123456789</TableCell>
              <TableCell>
                <Select css={{}}>
                  <option value=''>Active</option>
                  <option value=''>Suspended</option>
                  <option value=''>Deactivated</option>
                </Select>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
