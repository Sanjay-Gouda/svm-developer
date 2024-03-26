import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { httpInstance } from '@/constants/httpInstances';

const ReceiptPDF = dynamic(
  () => import('@/components/PDF/GenerateInvoice/Invoice'),
  {
    ssr: false,
  }
);

import React, { useEffect, useState } from 'react';

const Receipt = () => {
  const param = useParams();
  const [installmentData, setInstallmentData] = useState([]);

  const getBookingDetails = async () => {
    try {
      const res = await httpInstance.get(`installment/get/${param?.id}`, {
        headers: {},
      });

      setInstallmentData(res.data.result);
    } catch (err) {
      console.log(err, 'ERROR');
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []);
  return (
    <>
      {installmentData ? (
        <ReceiptPDF installmentData={installmentData} />
      ) : (
        <h1>Loading....</h1>
      )}
    </>
  );
};

export default Receipt;
