import {
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

import Toggle from '@/components/Toggle/toggle';
import { TextInput } from '@/components/ui-blocks';
import Layout from '@/containers/Layout';

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
    label: 'account',
    readName: 'acc_read',
    writeName: 'acc_write',
    read: 1,
    write: 2,
  },
  {
    label: 'booking',
    readName: 'book_read',
    writeName: 'book_write',
    read: 3,
    write: 4,
  },
  {
    label: 'expenses',
    readName: 'exp_read',
    writeName: 'exp_write',
    read: 5,
    write: 6,
  },
  {
    label: 'referrar',
    readName: 'ref_read',
    writeName: 'ref_write',
    read: 7,
    write: 8,
  },
];

const Permissions = () => {
  const [toggleName, setToggleName] = useState<permissmison_type>('acc_write');
  const [toggleValue, setToggleValue] = useState<number>(0);

  const [permissionId, setPermissionId] = useState<number[]>([]);

  const [isPermissionChecked, setIsPermissionChecked] = useState<any>({});

  const [toggleChange, setToggleChange] = useState({});

  const handleChange = (e: any) => {
    // setToggleState(!toggleState);
    const { name, value, checked } = e.target;

    setToggleValue(value);
    setToggleName(name);

    setIsPermissionChecked({
      [name]: checked,
    });
    setToggleChange({ ...toggleChange, [name]: value });
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

  // useEffect(() => {
  //   console.log(permissionId, 'id');
  // }, [permissionId]);

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
                />
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
                    {/* <Toggle
                      name='tstate'
                      value={1}
                      checked={toggleState}
                      handleChange={handleToggle}
                    /> */}

                    {permissions?.map((list) => {
                      return (
                        <TableRow key={list?.read}>
                          <TableCell>{list?.label.toLowerCase()}</TableCell>
                          <TableCell>
                            <Toggle
                              value={list?.read}
                              name={list?.readName}
                              checked={
                                isPermissionChecked?.[`${list?.readName}`]
                              }
                              // handleChange={() => {
                              //   handleChange(list?.read);
                              // }}
                              handleChange={handleChange}
                            />
                          </TableCell>
                          <TableCell>
                            <Toggle
                              value={list?.write}
                              name={list?.writeName}
                              checked={
                                isPermissionChecked[`${list?.writeName}`]
                              }
                              // handleChange={() => {
                              //   handleChange(list?.write);
                              // }}
                              handleChange={handleChange}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default Permissions;
