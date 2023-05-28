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
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

import Layout from '@/containers/Layout';

import { API_ENDPOINT } from '@/const/APIRoutes';

type referrerListProps = {
  firstName: string;
  referralId: string;
  phone: string;
  lastName: string;
  email: string;
  address: string;
};

export default function Refferral() {
  const [referrerList, setReferrerList] = useState<referrerListProps[]>([]);

  const getReferrers = async () => {
    await axios({
      method: 'get',
      url: `${API_ENDPOINT.LOCAL}/referral/list`,
    })
      .then((res) => {
        setReferrerList(res?.data?.result);
        console.log(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReferrers();
  }, []);

  return (
    <Layout
      right={
        <Link href='realEstateProjects/addReferral'>
          <Button>Add Referrer</Button>
        </Link>
      }
    >
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell className='text-[14px]'>Name</TableCell>
              <TableCell className='text-[14px]'>Mobile No</TableCell>
              <TableCell className='text-[14px]'>Emaild Id</TableCell>
              <TableCell className='text-[14px]'>Address</TableCell>
              <TableCell className='text-[14px]'>Action </TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {referrerList?.map((list) => {
              return (
                <TableRow key={list?.referralId}>
                  <TableCell>{list?.firstName}</TableCell>
                  <TableCell>{list?.phone}</TableCell>
                  <TableCell>{list?.email}</TableCell>
                  <TableCell>{list?.address}</TableCell>
                  <TableCell className='flex gap-5'>
                    {/* <EditIcon className='h-5 w-5 cursor-pointer' /> */}
                    <MdModeEditOutline
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
  );
}
