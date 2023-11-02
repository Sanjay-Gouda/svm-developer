import { useEffect, useState } from 'react';

import { httpInstance } from '@/constants/httpInstances';

type TBooking = {
  id: string;
  name: string;
}[];

export const useBookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState<TBooking>([]);

  useEffect(() => {
    getBookingDetails();
  }, []);

  const getBookingDetails = async () => {
    try {
      const res = await httpInstance.get(`booking/list`);
      const list = res.data.result.list;

      if (list && list?.length > 0) {
        const data = list?.map((payload) => ({
          name: payload.customerName,
          id: payload.bookingId,
        }));
        setBookingDetails(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return bookingDetails;
};
