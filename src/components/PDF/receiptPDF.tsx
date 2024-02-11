import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';

import Reciept from '@/components/PDF/GenerateInvoice/Invoice';

const ReceiptPDF = () => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }} showToolbar={true}>
      <Reciept />
    </PDFViewer>
  );
};

export default ReceiptPDF;
