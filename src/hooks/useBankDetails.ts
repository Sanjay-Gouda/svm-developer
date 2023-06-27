import { useEffect, useState } from 'react';

import { httpInstance } from '@/constants/httpInstances';

type bankAccountProps = {
  id: string;
  name: string;
}[];

export const useBankDetails = () => {
  const [accountList, setAccountList] = useState<bankAccountProps>([]);

  useEffect(() => {
    getAccountList();
  }, []);

  const getAccountList = async () => {
    try {
      const res = await httpInstance.get(`/account/advance-list`);

      const list = res?.data?.result;
      const data = list?.map((accounts) => ({
        name: accounts.bankName,
        id: accounts.adminAccountId,
      }));
      setAccountList(data);
    } catch (err) {
      alert('Something went wrong');
    }
  };

  return accountList;
};
