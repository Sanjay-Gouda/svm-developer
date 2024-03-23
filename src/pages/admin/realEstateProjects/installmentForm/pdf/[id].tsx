import dynamic from 'next/dynamic';

const ReceiptPDF = dynamic(() => import('@/components/PDF/receiptPDF'), {
  ssr: false,
});

import React from 'react';

const Receipt = () => {
  return (
    <>
      <ReceiptPDF />
    </>
  );
};

export default Receipt;
