import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import { debounce } from 'lodash';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';

import EmptyState from '@/components/Empty';
import ServerError from '@/components/Error/500Error';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await httpInstance.get(`/referral/list`);
    const repo = res.data.result.list;

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

export default function Refferral({
  repo,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [refferList, setRefferList] = useState(repo);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpInstance.get(
          `/referral/list?searchString=${searchQuery}`
        );

        const data = res.data.result.list;
        setRefferList(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (searchQuery) {
      fetchData();
    } else {
      setRefferList(repo);
    }
  }, [searchQuery]);

  const handleSearch = debounce((searchQuery: string) => {
    setSearchQuery(searchQuery);
  }, 300);

  const router = useRouter();

  const handleFormEdit = (id: string) => {
    router.push(`realEstateProjects/referrerForm/${id}`);
  };

  return (
    <Layout
      pageTitle='Referral'
      right={
        <Link href='realEstateProjects/referrerForm/addReferral/'>
          <Button>Add Referrer</Button>
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
          {refferList?.length === 0 ? (
            <>
              <EmptyState
                btnLable='Add Referral'
                redirectLink='realEstateProjects/referrerForm/addReferral/'
                heading='Add New Referrals'
              />
            </>
          ) : (
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
                  {repo?.map((list) => {
                    return (
                      <TableRow key={list?.referralId}>
                        <TableCell>{list?.firstName}</TableCell>
                        <TableCell>{list?.phone}</TableCell>
                        <TableCell>{list?.email}</TableCell>
                        <TableCell>{list?.address}</TableCell>
                        <TableCell className='flex gap-5'>
                          <MdModeEditOutline
                            size='24'
                            className='cursor-pointer'
                            style={{ color: ' #30bcc2' }}
                            onClick={() => {
                              handleFormEdit(list?.referralId);
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
  );
}
