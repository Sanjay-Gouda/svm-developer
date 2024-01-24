import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

import { httpInstance } from '@/constants/httpInstances';

type customerProps = {
  id: string;
  name: string;
}[];

const cookies = new Cookies();
const token = cookies.get('token');

export const useCustomerDetails = () => {
  const [customerList, setCustomerList] = useState<customerProps>([]);

  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerList = async () => {
    try {
      // const token = cookies.get('token');
      // httpInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      const res = await httpInstance.get(`customer/advance-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const list = res?.data?.result?.list;

      if (list && list?.length > 0) {
        const data = list?.map((payload) => ({
          name: payload.firstName,
          id: payload.customerId,
        }));

        setCustomerList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return customerList;
};
