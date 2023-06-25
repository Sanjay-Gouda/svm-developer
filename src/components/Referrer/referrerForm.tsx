import { Button } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput, TextInputArea } from '@/components/ui-blocks';

import { API_ENDPOINT } from '@/const/APIRoutes';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required '),
  lastName: Yup.string().required('Last Name is required '),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile number')
    .required('Referrer Mobile Number is required'),

  email: Yup.string().email('Invalid email address'),
});

type formProps = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
};

type updatevalueProps = {
  editList?: formProps;
  editId?: string;
};

function ReferrerForm({ editList, editId }: updatevalueProps) {
  const route = useRouter();
  const [loader, setLoader] = useState(false);

  /* ADD REFERRER LIST  */
  const addReferrer = async (details: formProps) => {
    setLoader(true);
    await axios({
      method: 'POST',
      url: `${API_ENDPOINT.END_POINT}/referral/create`,
      data: details,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        toast.success('Referrer added successfully');
        setLoader(false);
        setTimeout(() => {
          route.push('/admin/referral');
        }, 1000);
      })
      .catch((err) => {
        toast.error('Something went wrong');
        // console.log(err);
      });
  };

  /* UPDATE REFERRER LIST */
  const updateReferrerList = async (details: formProps) => {
    setLoader(true);
    await axios({
      method: 'PUT',
      url: `${API_ENDPOINT.END_POINT}/referral/update/${editId} `,
      data: details,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        toast.success('Data updated successfully');
        setLoader(false);

        setTimeout(() => {
          route.push('/admin/referral');
        }, 1000);
      })
      .catch((err) => {
        toast.error('Something went wrong');
      });
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
  };

  const formvalue = editList ? editList : initialValues;

  const formik = useFormik({
    initialValues: formvalue,
    validationSchema,
    onSubmit: (values: formProps, { setSubmitting, resetForm }) => {
      editList ? updateReferrerList(values) : addReferrer(values);
      // resetForm();
      setSubmitting(true);
    },
  });

  return (
    <div className='mx-auto flex w-1/3 flex-col gap-2'>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='firstName'
          label='FirstName'
          onChange={formik.handleChange}
          value={formik.values?.firstName}
        />
        {formik.touched.firstName && formik.errors?.firstName && (
          <div className='text-red-400'>{formik?.errors?.firstName}</div>
        )}
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='lastName'
          label='LastName'
          onChange={formik.handleChange}
          value={formik.values?.lastName}
        />
        {formik.touched.lastName && formik.errors?.lastName && (
          <div className='text-red-400'>{formik.errors?.lastName}</div>
        )}
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='phone'
          label='Mobile No'
          onChange={formik.handleChange}
          value={formik.values?.phone}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className='text-red-400'>{formik.errors.phone}</div>
        )}
      </div>

      <div className='flex flex-col'>
        <TextInput
          type='email'
          name='email'
          label='Email'
          onChange={formik.handleChange}
          value={formik.values?.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='text-red-400'>{formik.errors.email}</div>
        )}
      </div>
      <TextInputArea
        value={formik.values?.address}
        name='address'
        rows='2'
        label='Address'
        handleChange={formik.handleChange}
      />

      <Button
        className='mt-1'
        onClick={() => {
          formik.handleSubmit();
        }}
      >
        {editList ? 'Update ' : 'Submit'}
        {loader && <ClipLoader size={20} color='white' />}
      </Button>
      {editList ? (
        <Button layout='outline' onClick={() => route.push('/admin/referral')}>
          Cancel
        </Button>
      ) : null}

      <SvmProjectToast />
    </div>
  );
}

export default ReferrerForm;
