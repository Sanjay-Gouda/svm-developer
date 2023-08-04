import React from 'react';

import MyDocument from '@/pages/admin/dummyPDF';

// export async function getServerSideProps(params: any) {
//   const EditId = params?.params.id;
//   const res = await httpInstance.get(`booking/get/${EditId}`);
//   const bookingDetails = res.data.result;
//   console.log(bookingDetails);
//   return {
//     props: { bookingDetails },
//   };
// }

const BookingPDF = ({ bookingDetails }) => {
  console.log(bookingDetails, 'details');
  return (
    <>
      <MyDocument />
    </>
  );
};

export default BookingPDF;
