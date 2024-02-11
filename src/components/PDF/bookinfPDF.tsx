import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';

import { Booking } from '@/components/PDF';

const DummyPDF = ({ details }: any) => {
  return (
    <>
      <PDFViewer style={{ width: '100%', height: '100vh' }} showToolbar={true}>
        <Booking details={details} />
      </PDFViewer>
    </>
  );

  // ReactPDF.render(<Booking title='Booking Form' />);
};

export default DummyPDF;
