import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import debounce from 'lodash/debounce';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

type accounrDetailProps = {
  accNo: string;
  adminAccountId: number;
  balance: number;
  bankName: string;
  name: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = httpInstance.get('/account/basic-list');
    const repo = res.data.result;
    return { props: { repo } };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      error: 'An error occurred while fetching data. Please try again later.',
    },
  };
};

export default function Account({
  repo,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [accountDetails, setAccountDetails] =
    useState<accounrDetailProps[]>(repo);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const handleEdit = (id: any) => {
    router.push(`realEstateProjects/accountForm/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpInstance.get(
          `/account/advance-list?searchString=${searchQuery}`
        );

        const data = res.data.result.list;

        setAccountDetails(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (searchQuery) {
      fetchData();
    } else {
      setAccountDetails(repo);
    }
  }, [searchQuery]);

  const handleSearch = debounce((searchQuery: string) => {
    setSearchQuery(searchQuery);
  }, 300);

  return (
    <>
      <Layout
        pageTitle='Bank Accounts'
        right={
          <Link href='realEstateProjects/accountForm/addAccounts'>
            <Button>Add Accounts</Button>
          </Link>
        }
        isShowSearchBar={true}
        handleSearch={(e) => handleSearch(e.target.value)}
      >
        {error ? (
          <>
            <ServerError />
          </>
        ) : (
          <>
            {repo?.length === 0 ? (
              <>
                <EmptyState
                  btnLable='Add Accounts '
                  heading='Add Your Bank Accounts'
                  redirectLink='realEstateProjects/accountForm/addAccounts'
                />
              </>
            ) : (
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
                              onClick={() => {
                                handleEdit(details?.adminAccountId);
                              }}
                            />
                            {/* <MdDelete
                              size='24'
                              className='cursor-pointer'
                              style={{ color: ' #F38C7F' }}
                            /> */}
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
