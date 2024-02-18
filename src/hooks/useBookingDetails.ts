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
      console.log(list, 'Booking');

      if (list && list?.length > 0) {
        const data = list?.map((payload) => ({
          name: payload.customerName,
          id: payload.bookingId,
          fullName: payload.projectName,
        }));
        setBookingDetails(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return bookingDetails;
};
