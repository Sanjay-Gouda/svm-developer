import {
  Badge,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';

import { AddVehicleButtons } from '@/components/vehicle';
import Layout from '@/containers/Layout';
import Link from 'next/link';

const ListofProjects = [
  {
    projectName: 'Sai resedency',
    projectsOwner: 'Vikram',
    city: 'Surat',
    area: '300',
    status: 'In-Progress',
  },
  {
    projectName: 'Sai resedency',
    projectsOwner: 'Vikram',
    city: 'Surat',
    area: '300',
    status: 'pending',
  },
  {
    projectName: 'Sai resedency',
    projectsOwner: 'Vikram',
    city: 'Surat',
    area: '300',
    status: 'success',
  },
  {
    projectName: 'Sai resedency',
    projectsOwner: 'Vikram',
    city: 'Surat',
    area: '300',
    status: 'In-Progress',
  },
  {
    projectName: 'Sai resedency',
    projectsOwner: 'Vikram',
    city: 'Surat',
    area: '300',
    status: 'pending',
  },
  {
    projectName: 'Sai resedency',
    projectsOwner: 'Vikram',
    city: 'Surat',
    area: '300',
    status: 'success',
  },
];

export default function Vehicles() {
  return (
    <Layout
      right={
        <Link href='realEstateProjects/add'>
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
            </tr>
          </TableHeader>
          <TableBody>
            {ListofProjects?.map((data, ind) => {
              return (
                <TableRow>
                  <TableCell>{data.projectName}</TableCell>
                  <TableCell>{data.city}</TableCell>
                  <TableCell>{data.area}</TableCell>
                  <TableCell>{data.projectsOwner}</TableCell>
                  <TableCell>
                    <Badge
                      className='flex w-[40%] items-center justify-center py-1 text-[16px]'
                      type={
                        data.status === 'success'
                          ? 'success'
                          : data.status === 'pending'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {data.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={10}
            resultsPerPage={4}
            onChange={() => {}}
            label='Table navigation'
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}
