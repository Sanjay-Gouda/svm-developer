import { GetServerSideProps } from 'next';
import React from 'react';

import Penalty from '@/components/Penalty';

export const getServerSideProps: GetServerSideProps = async (params) => {
  try {
    const bookingId = params?.params?.id;
    console.log(bookingId);
    // const res = await httpInstance.get(
    //   `/installment/list?bookingId=${bookingId}`
    // );
    // const installmentHistoryList = res.data.result.list;
    return {
      props: {
        // installmentHistoryList,
        bookingId,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      error: 'An error occurred while fetching data. Please try again later.',
    },
  };
};

export type Tpenalty = {
  bookingId: string;
};

const PenaltyHistory = ({ bookingId }: Tpenalty) => {
  return (
    <>
      <Penalty bookingId={bookingId} />
    </>
  );
};

export default PenaltyHistory;
