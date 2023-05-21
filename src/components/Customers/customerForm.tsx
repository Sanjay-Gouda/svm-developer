import { Button } from '@windmill/react-ui';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { TextInput } from '@/components/ui-blocks';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Customer Name is required '),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile number')
    .required('Customer Mobile Number is required'),
  aadharNo: Yup.string()
    .matches(/^[0-9]{12}$/, 'Invalid Aadhaar number')
    .required('Aadhar Card number is required '),
  email: Yup.string().email('Invalid email address'),
});

type formProps = {
  name: string;
  mobileNo: string;
  aadharNo: string;
  email: string;
};

// const initialValues:formProps = {
//   name: '',
//   mobileno: '',
//   aadharNo: '',
//   email: '',
// };

const CustomerForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      mobileNo: '',
      aadharNo: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values: formProps, { setSubmitting }) => {
      console.log(values);
    },
  });

  return (
    <div className='mx-auto flex w-1/3 flex-col gap-2'>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='name'
          label='Name'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className='text-red-400'>{formik.errors.name}</div>
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
};

export default CustomerForm;
