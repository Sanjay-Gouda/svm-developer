import { GetServerSideProps } from 'next';
import React from 'react';

import Penalty from '@/components/Penalty';

import { httpInstance } from '@/constants/httpInstances';

export const getServerSideProps: GetServerSideProps = async (params) => {
  try {
    const bookingId = params?.params?.id;
    const res = await httpInstance.get(`booking/penalty-list/${bookingId}`);
    const penaltyHistory = res.data.result;
    return {
      props: {
        penaltyHistory,
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
  penaltyHistory: any;
};

const PenaltyHistory = ({ bookingId, penaltyHistory }: Tpenalty) => {
  return (
    <>
      <Penalty bookingId={bookingId} penaltyHistory={penaltyHistory} />
    </>
  );
};

export default PenaltyHistory;
