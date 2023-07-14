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

export default function Expanses() {
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
              <TableRow>
                <TableCell>Sai Resendency</TableCell>
                <TableCell>300</TableCell>
                <TableCell>300</TableCell>
                <TableCell>300</TableCell>
                <TableCell>300</TableCell>
                <TableCell>300</TableCell>
                <TableCell className='flex gap-5'>
                  {/* <EditIcon className='h-5 w-5 cursor-pointer' /> */}
                  <MdModeEditOutline
                    size='24'
                    className='cursor-pointer'
                    style={{ color: ' #30bcc2' }}
                    onClick={() => {
                      // handleFormEdit(list?.referralId);
                    }}
                  />
                  <MdDelete
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
