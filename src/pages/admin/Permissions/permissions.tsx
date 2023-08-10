import {
  Button,
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { SvmProjectToast } from '@/components/Toast/Toast';
import Toggle from '@/components/Toggle/toggle';
import { TextInput } from '@/components/ui-blocks';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

type permissmison_type =
  | 'acc_read'
  | 'acc_write'
  | 'book_read'
  | 'book_write'
  | 'exp_read'
  | 'exp_write'
  | 'ref_read'
  | 'ref_write';

// export const getServerSideProps = async (data) => {
//   const res = await httpInstance.get(`role/permissions`);

//   const permissions = res;

//   return {
//     props: { permissions },
//   };
// };

const permissions = [
  {
    read: 1,
    group: 'ADMIN_ACCOUNT',
    write: 2,
  },
  {
    read: 3,
    group: 'BOOKING',
    write: 4,
  },
  {
    read: 5,
    group: 'CUSTOMER',
    write: 6,
  },
  {
    read: 7,
    group: 'EXPENSE',
    write: 8,
  },
  {
    read: 9,
    group: 'PROJECT',
    write: 10,
  },
  {
    read: 11,
    group: 'REFERRAL',
    write: 12,
  },
  {
    read: 13,
    group: 'ROLE',
    write: 14,
  },
  {
    read: 15,
    group: 'USER',
    write: 16,
  },
  {
    read: 17,
    group: 'INSTALLMENT',
    write: 18,
  },
];

const Permissions = () => {
  const [toggleName, setToggleName] = useState<permissmison_type>('acc_write');
  const [toggleValue, setToggleValue] = useState<number>(0);
  const [permissionId, setPermissionId] = useState<number[]>([]);
  const [isPermissionChecked, setIsPermissionChecked] = useState<any>({});
  // const [toggleChange, setToggleChange] = useState({});
  const [error, setError] = useState(false);

  const [roleName, setRoleName] = useState('');

  const handleChange = (e: any) => {
    // setToggleState(!toggleState);
    const { name, value, checked } = e.target;

    setToggleValue(+value);
    setToggleName(name);

    setIsPermissionChecked({
      [name]: checked,
    });
    // setToggleChange({ ...toggleChange, [name]: value });
  };

  useEffect(() => {
    // console.log(isPermissionChecked);

    isPermissionChecked[toggleName]
      ? appendPermission(toggleValue)
      : removePermission(toggleValue);
  }, [isPermissionChecked]);

  const appendPermission = (value: number) => {
    permissionId.push(value);
  };
  const removePermission = (value: number) => {
    const removedId = permissionId.filter((id) => {
      return id !== value;
    });

    setPermissionId(removedId);
  };

  const handleName = (e) => {
    setRoleName(e.target.value);
  };

  useEffect(() => {
    if (roleName.length > 0) {
      setError(false);
    }
  }, [roleName]);

  const addRole = async () => {
    const payload = {
      label: roleName,
      permissionIds: permissionId,
    };

    try {
      const res = await httpInstance.post('/role/create', payload);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (roleName === '') {
      setError(true);
    } else if (permissionId.length === 0) {
      toast.error('Pleast allow atleast one permission ');
    } else {
      addRole();
      // console.log(roleName);
    }
  };

  return (
    <>
      <Layout>
        <Card className='mx-auto w-full p-2'>
          <CardBody>
            <div className='mx-auto flex w-1/3 flex-col gap-2'>
              <div className='flex flex-col'>
                <TextInput
                  name='roleName'
                  label='Role Name'
                  placeholder='Role Name'
                  onChange={handleName}
                />
                {error && (
                  <div className='text-red-400'>Role name is required</div>
                )}
              </div>

              <TableContainer>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell className='text-[14px]'>Permissions</TableCell>

                      <TableCell className='text-[14px]'>Read</TableCell>
                      <TableCell className='text-[14px]'>Write </TableCell>
                    </tr>
                  </TableHeader>
                  <TableBody>
                    {permissions?.map((list) => {
                      return (
                        <TableRow key={list?.read}>
                          <TableCell>{list?.group.toLowerCase()}</TableCell>
                          <TableCell>
                            <Toggle
                              value={list?.read}
                              name={list?.read}
                              checked={isPermissionChecked?.[`${list?.read}`]}
                              handleChange={handleChange}
                            />
                          </TableCell>
                          <TableCell>
                            <Toggle
                              value={list?.write}
                              name={list?.write}
                              checked={isPermissionChecked[`${list?.write}`]}
                              handleChange={handleChange}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <div className='w-full'>
                <Button className='w-full' onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <SvmProjectToast />
      </Layout>
    </>
  );
};

export default Permissions;
