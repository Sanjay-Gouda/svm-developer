import { Button, Label } from '@windmill/react-ui';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useRoles } from '@/hooks/useRoles';

import ComboBox from '@/components/ComboBox/comboBox';
import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';

import { httpInstance } from '@/constants/httpInstances';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required '),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile number')
    .required('User mobile number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  userRole: Yup.mixed().required('Please select user role '),
});

type RoleProps = {
  id: string;
  name: string;
};

type addUser = {
  name: string;
  phone: number | undefined;
  email: string;
  userRole: RoleProps;
};

type modalProps = {
  editId?: string;
  editValues?: any;
  // editInitialValues: addUser;
};

const initialValue: addUser = {
  name: '',
  phone: undefined,
  email: '',
  userRole: { id: '', name: '' },
};

const AddUserForm = ({ editId, editValues }: modalProps) => {
  const roles = useRoles();
  const routes = useRouter();
  const [query, setQuery] = useState('');
  const [loader, setLoader] = useState(false);
  const formValues = editId ? editValues : initialValue;

  const addUser = async (values: addUser) => {
    setLoader(true);
    const { email, name, phone, userRole } = values;
    const { id } = userRole;
    const payload = {
      email: email,
      phone: phone,
      name: name,
      roleId: id,
    };
    try {
      const res = await httpInstance.post('/user/create', payload);
      setLoader(false);
      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'User Created Successfully';
      toast.success(successMessage);
      setTimeout(() => {
        routes.push('manageUser');
      }, [1000]);
    } catch (err) {
      toast.error('Something went wrong');
      routes.push('manageUser');
    }
  };
  const updateUser = async (values: addUser) => {
    setLoader(true);
    const { email, name, phone, userRole } = values;
    const { id } = userRole;
    const payload = {
      email: email,
      phone: phone,
      name: name,
      roleId: id.toString(),
    };
    try {
      const res = await httpInstance.put(`/user/update/${editId}`, payload);
      setLoader(false);
      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'User data Updated Successfully';
      toast.success(successMessage);
      routes.push('manageUser');
    } catch (err) {
      toast.error('Something went wrong');
      routes.push('manageUser');
    }
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit: (values: addUser, { resetForm }) => {
      editId ? updateUser(values) : addUser(values);
    },
  });

  const hadnleSearchQuery = (e) => {
    setQuery(e.target.value);
  };

  const afterLeave = () => {
    setQuery('');
  };

  const filterRoles =
    query === ''
      ? roles
      : roles.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <div className='mx-auto flex w-1/3 flex-col gap-2'>
        <div className='flex flex-col'>
          <Label>User Role</Label>

          <ComboBox
            placeholder='Select User'
            data={filterRoles}
            query={query}
            afterLeave={afterLeave}
            handleSearchQuery={hadnleSearchQuery}
            selected={formik.values.userRole}
            setSelected={(project) => {
              formik.setFieldValue('userRole', project);
            }}
          />
          {formik.touched.userRole && formik.errors.userRole && (
            <div className='text-red-400'> {formik.errors.userRole}</div>
          )}
        </div>

        <div className='flex flex-col '>
          <TextInput
            type='text'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            label='Name'
          />

          {formik.touched.name && formik.errors.name && (
            <div className='text-red-400'> {formik.errors.name}</div>
          )}
        </div>
        <div className='flex flex-col '>
          <TextInput
            type='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            label='Email'
          />

          {formik.touched.email && formik.errors.email && (
            <div className='text-red-400'> {formik.errors.email}</div>
          )}
        </div>
        <div className='flex flex-col '>
          <TextInput
            type='text'
            name='phone'
            value={formik.values.phone === undefined ? '' : formik.values.phone}
            onChange={formik.handleChange}
            label='Mobile No'
          />

          {formik.touched.phone && formik.errors.phone && (
            <div className='text-red-400'> {formik.errors.phone}</div>
          )}
        </div>
        <Button
          className='mt-1'
          disabled={loader ? true : false}
          onClick={() => formik.handleSubmit()}
        >
          {editId ? 'Update' : 'Submit'}
          {loader && <ClipLoader size={20} color='white' />}
        </Button>

        {editId && (
          <Button
            className='mt-1'
            layout='outline'
            onClick={() => formik.handleSubmit()}
          >
            Cancel
          </Button>
        )}
      </div>
      <SvmProjectToast />
    </>
  );
};

export default AddUserForm;
