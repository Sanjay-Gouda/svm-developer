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
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

import { API_ENDPOINT } from '@/const/APIRoutes';

export default function Projects() {
  const [projectDetails, setProjectDetails] = useState<any>([]);

  /* Project Details API */
  const getProjectData = async () => {
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}project/list`,
    })
      .then((res) => {
        console.log(res);
        setProjectDetails(res?.data?.result?.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProjectData();
  }, []);

  const handleEdit = (id: string) => {
    console.log(id);
  };

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
              <TableCell className='text-[14px]'>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {projectDetails?.map((data: any, ind: number) => {
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
