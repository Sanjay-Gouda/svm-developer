import { Button } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';

import { API_ENDPOINT } from '@/const/APIRoutes';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required '),
  lastName: Yup.string().required('Last Name is required '),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile number')
    .required('Customer Mobile Number is required'),
  aadharNo: Yup.string()
    .matches(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/, 'Invalid Aadhaar number')
    .required('Aadhar Card number is required '),
  email: Yup.string().email('Invalid email address'),
});

type formProps = {
  firstName: string;
  lastName: string;
  phone: string;
  aadharNo: string;
  email: string;
};

function CustomerForm() {
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const routes = useRouter();

  /* Add Customer  */
  const addCustomers = async (details: formProps) => {
    await axios({
      method: 'post',
      url: `${API_ENDPOINT.END_POINT}/customer/create`,
      data: details,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        toast.success('Customer added successfully');
        setTimeout(() => {
          routes.push('/admin/customers');
        }, 1000);
        setIsDataSubmitted(true);
      })
      .catch((err) => {
        toast.error('Something went wrong');
      });
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      aadharNo: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values: formProps, { setSubmitting, resetForm }) => {
      addCustomers(values);

      if (isDataSubmitted) {
        resetForm();
      }

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
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className='text-red-400'>{formik.errors.firstName}</div>
        )}
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='lastName'
          label='LastName'
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className='text-red-400'>{formik.errors.lastName}</div>
        )}
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='phone'
          label='Mobile No'
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className='text-red-400'>{formik.errors.phone}</div>
        )}
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='aadharNo'
          label='Aadhar No'
          onChange={formik.handleChange}
          value={formik.values.aadharNo}
        />
        {formik.touched.aadharNo && formik.errors.aadharNo && (
          <div className='text-red-400'>{formik.errors.aadharNo}</div>
        )}
      </div>

      <div className='flex flex-col'>
        <TextInput
          type='email'
          name='email'
          label='Email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='text-red-400'>{formik.errors.email}</div>
        )}
      </div>

      <Button
        onClick={() => {
          formik.handleSubmit();
        }}
      >
        Submit
      </Button>

      <SvmProjectToast />
    </div>
  );
}

export default CustomerForm;
