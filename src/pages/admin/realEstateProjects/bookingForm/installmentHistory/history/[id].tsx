import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { httpInstance } from '@/constants/httpInstances';

const HistoryPDF = dynamic(
  () => import('@/components/PDF/InstallmentHistory/index'),
  {
    ssr: false,
  }
);
type TinstallMentList = {
  installmentId: string;
  bookingId: string;
  amount: number;
  paymentType: string;
  installmentNo: number;
  adminAccountId: any;
  penalty: number;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  customer: any;
};
const InstallmentHistory = () => {
  const params = useParams();
  const [installmentList, setInstallmentList] = useState<TinstallMentList[]>(
    []
  );

  const getInstallmentHistory = async () => {
    try {
      const res = await httpInstance.get(
        `/installment/list?bookingId=${params?.id}`
      );
      console.log(res?.data?.result?.list);
      setInstallmentList(res?.data?.result?.list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInstallmentHistory();
  }, []);

  return (
    <>
      <HistoryPDF installmentList={installmentList} />
    </>
  );
};

export default InstallmentHistory;
