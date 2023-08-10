import { useEffect, useState } from 'react';

import { httpInstance } from '@/constants/httpInstances';

type TRoleProps = {
  id: string;
  name: string;
}[];

export const useRoles = () => {
  const [roles, setRoles] = useState<TRoleProps>([]);

  useEffect(() => {
    getRoleList();
  }, []);

  const getRoleList = async () => {
    try {
      const res = await httpInstance.get(`role/advance-list`);
      const list = res?.data?.result;

      const roles = list?.map((roles) => ({
        id: roles.roleId,
        name: roles?.label,
      }));

      setRoles(roles);
    } catch (err) {
      console.log(err, 'error');
    }
  };
  console.log(roles, 'ROles');
  return roles;
};
