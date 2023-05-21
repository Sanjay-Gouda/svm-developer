import { Button } from '@windmill/react-ui';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { TextInput } from '@/components/ui-blocks';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required '),
  lastName: Yup.string().required('Last Name is required '),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile number')
    .required('Customer Mobile Number is required'),
  aadharNo: Yup.string()
    .matches(/^[0-9]{12}$/, 'Invalid Aadhaar number')
    .required('Aadhar Card number is required '),
  email: Yup.string().email('Invalid email address'),
});

type formProps = {
  firstName: string;
  lastName: string;
  mobileNo: string;
  aadharNo: string;
  email: string;
};

function CustomerForm() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      mobileNo: '',
      aadharNo: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values: formProps, { setSubmitting }) => {
      console.log(values);
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
          name='mobileNo'
          label='Mobile No'
          onChange={formik.handleChange}
          value={formik.values.mobileNo}
        />
        {formik.touched.mobileNo && formik.errors.mobileNo && (
          <div className='text-red-400'>{formik.errors.mobileNo}</div>
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
    </div>
  );
}

export default CustomerForm;
