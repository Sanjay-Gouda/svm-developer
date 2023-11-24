import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

function ProjectHappyCustomer() {
  return (
    <Layout>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableCell>Project</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Action</TableCell>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Sai Resedency</TableCell>
              <TableCell>10000</TableCell>
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
  );
}

export default ProjectHappyCustomer;