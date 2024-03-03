import { Button } from '@windmill/react-ui';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';

import { httpInstance } from '@/constants/httpInstances';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required '),
  lastName: Yup.string().required('Last Name is required '),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile number')
    .required('Customer Mobile Number is required'),
  // aadharNo: Yup.string()
  //   .matches(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/, 'Invalid Aadhaar number')
  //   .required('Aadhar Card number is required '),
  email: Yup.string().email('Invalid email address'),
});

type formProps = {
  firstName: string;
  lastName: string;
  phone: string;
  aadharNo: string;
  email: string;
};

const addInitialValues: formProps = {
  firstName: '',
  lastName: '',
  phone: '',
  aadharNo: '',
  email: '',
};

type editValueProps = {
  editInitialValues?: any;
  editId?: string;
  handleNextStep?: () => void;
  setCustomerDetails?: any;
};

type Tpayload = {
  firstName: string;
  lastName: string;
  aadharNo: string;
  email: string;
  phone: string;
  // aadharImages: any;
  // panImages: any;
  // customerImage: any;
};

function CustomerForm({
  editInitialValues,
  editId,
  handleNextStep,
  setCustomerDetails,
}: editValueProps) {
  const router = useRouter();

  // console.log(editInitialValues, 'image');

  const [loader, setLoader] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get('token');

  /* Add Customer  */
  const addCustomers = async (details: formProps) => {
    setLoader(true);

    const { aadharNo, email, firstName, lastName, phone } = details;

    const payload: Tpayload = {
      firstName: firstName,
      lastName: lastName,
      aadharNo: aadharNo,
      email: email,
      phone: phone,
    };

    // const formData = new FormData();

    // Object.entries(payload).forEach(([key, value]: any) => {
    //   if (
    //     key !== 'aadharImages' &&
    //     key !== 'panImages' &&
    //     key !== 'customerImage'
    //   ) {
    //     formData.append(key, value);
    //   }
    // });

    // for (let i = 0; i < frontAadharCard.length; i++) {
    //   formData.append('aadharImages', frontAadharCard[i]);
    // }
    // for (let i = 0; i < backAadharCard.length; i++) {
    //   formData.append('aadharImages', backAadharCard[i]);
    // }
    // for (let i = 0; i < panCard.length; i++) {
    //   formData.append('panImages', panCard[i]);
    // }
    // for (let i = 0; i < passPhoto.length; i++) {
    //   formData.append('customerImage', passPhoto[i]);
    // }
    // for (let i = 0; i < secondPassPhoto.length; i++) {
    //   formData.append('customerImage', secondPassPhoto[i]);
    // }
    // for (let i = 0; i < thirdPassphoto.length; i++) {
    //   formData.append('customerImage', thirdPassphoto[i]);
    // }

    try {
      const res = await httpInstance.post(`/customer/create`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoader(false);
      handleNextStep();
      setCustomerDetails(res.data.result);
    } catch (err) {
      setLoader(false);
      toast.error('something went wrong');
    }
  };

  /* Update Customer */
  const updateCustomers = async (details: formProps) => {
    setLoader(true);

    const { aadharNo, email, firstName, lastName, phone } = details;

    const payload: Tpayload = {
      firstName: firstName,
      lastName: lastName,
      aadharNo: aadharNo,
      email: email,
      phone: phone,
    };

    try {
      const res = await httpInstance.put(
        `/customer/update/${editId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoader(false);
      router.push('/admin/customers');
    } catch (err) {
      toast.error('something went wrong');
    }
  };

  const formValues = editId ? editInitialValues : addInitialValues;

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit: (values: formProps, { setSubmitting, resetForm }) => {
      editId ? updateCustomers(values) : addCustomers(values);
    },
  });

  return (
    <>
      <div className='mx-auto mt-5 flex w-1/3 flex-col gap-2'>
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

        {editId ? (
          <>
            <Button
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              {loader ? 'Updateing...' : 'Update'}
              {/* Update */}
            </Button>
            <Button
              layout='outline'
              onClick={() => router.push('/admin/customers')}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Save & Next
          </Button>
        )}

        {/* <Button
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          {editId ? 'Update' : 'Submit'}
          {loader && <ClipLoader size={20} color='white' />}
        </Button>
        {editId ? (
          <Button
            layout='outline'
            onClick={() => routes.push('/admin/customers')}
          >
            Cancel
          </Button>
        ) : null} */}
      </div>

      <SvmProjectToast />
    </>
  );
}

export default CustomerForm;
