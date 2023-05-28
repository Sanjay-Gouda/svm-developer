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

export default function Account() {
  const [accountDetails, setAccountDetails] = useState<any>([]);

  const getAccountDetails = async () => {
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}/account/basic-list`,
    })
      .then((res) => {
        setAccountDetails(res?.data?.result);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAccountDetails();
  }, []);

  return (
    <>
      <Layout
        right={
          <Link href='realEstateProjects/addAccounts'>
            <Button>Add Accounts</Button>
          </Link>
        }
      >
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell className='text-[14px]'>Bank Name</TableCell>
                <TableCell className='text-[14px]'>
                  Account Holdername
                </TableCell>
                <TableCell className='text-[14px]'>Account No.</TableCell>
                <TableCell className='text-[14px]'>Action </TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {accountDetails?.map((details) => {
                return (
                  <TableRow key={details?.adminAccountId}>
                    <TableCell>{details?.bankName}</TableCell>
                    <TableCell>{details?.name}</TableCell>
                    <TableCell>{details?.accNo}</TableCell>
                    <TableCell className='flex gap-5'>
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
    </>
  );
}
