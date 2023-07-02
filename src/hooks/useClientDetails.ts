import axios from 'axios';
import { useEffect, useState } from 'react';

import { API_ENDPOINT } from '@/const/APIRoutes';

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
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}customer/advance-list`,
    })
      .then((res) => {
        // console.log(res, 'response');
        const list = res?.data?.result?.list;

        if (list && list?.length > 0) {
          const data = list?.map((payload) => ({
            name: payload.firstName,
            id: payload.customerId,
          }));
          console.log(data, 'customers');
          setCustomerList(data);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return customerList;
};
