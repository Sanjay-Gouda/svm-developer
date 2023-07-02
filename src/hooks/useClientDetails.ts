import { useEffect, useState } from 'react';

import { httpInstance } from '@/constants/httpInstances';

type customerProps = {
  id: string;
  name: string;
}[];

export const useCustomerDetails = () => {
  const [customerList, setCustomerList] = useState<customerProps>([]);

  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerList = async () => {
    try {
      const res = await httpInstance.get(`customer/advance-list`);
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
