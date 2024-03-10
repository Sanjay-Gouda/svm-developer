import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { httpInstance } from '@/constants/httpInstances';

const PDF = dynamic(() => import('@/components/PDF/bookinfPDF'), {
  ssr: false,
});

const BookingPDF = () => {
  const param = useParams();
  const [data, setData] = useState([]);

  const getBookingDetails = async () => {
    try {
      const res = await httpInstance.get(`booking/get/${param?.id}`, {
        headers: {},
      });
      console.log(res.data.result);
      setData(res.data.result);
    } catch (err) {
      console.log(err, 'ERROR');
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []);

  return <>{data ? <PDF details={data} /> : <h1>Loading</h1>}</>;
};

export default BookingPDF;
