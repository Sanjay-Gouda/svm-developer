import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
 

import { httpInstance } from '@/constants/httpInstances';

const PDF = dynamic(() => import('@/components/PDF/bookinfPDF'), {
  ssr: false,
});

// export async function getServerSideProps(params: any) {
//   const EditId = params?.params.id;
//   console.log(EditId);
//   const res = await httpInstance.get(`booking/get/${EditId}`);
//   const bookingDetails = res.data.result;
//   return {
//     props: { EditId, bookingDetails },
//   };
// }

const BookingPDF = () => {
  const param = useParams();
  const [data, setData] = useState([]);

  const getBookingDetails = async () => {
    try {
      const res = await httpInstance.get(`booking/get/${param?.id}`);
      console.log(res.data.result);
      setData(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []);

  return <>{data ? <PDF details={data} /> : <h1>Loading</h1>}</>;
};

export default BookingPDF;
