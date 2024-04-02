import { Button, Label } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { SvmProjectToast } from '@/components/Toast/Toast';
import DateSelector from '@/components/UI/DatePicker';
import { TextInput, TextInputArea } from '@/components/ui-blocks';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { httpInstance } from '@/constants/httpInstances';

const validationSchema = Yup.object().shape({
  // firstName: Yup.string().required('First Name is required '),
  // lastName: Yup.string().required('Last Name is required '),
  name: Yup.string().required('Last Name is required '),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile number')
    .required('Customer Mobile Number is required'),
  alternativeNo: Yup.string().matches(/^[0-9]{10}$/, 'Invalid Mobile number'),
  // aadharNo: Yup.string()
  //   .matches(/^\d{12}$/, 'Aadhaar number must be exactly 12 digits')
  //   .required('Aadhaar number is required'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Invalid PIN code. It must be a 6-digit number.'),
  email: Yup.string().email('Invalid email address'),
});

type formProps = {
  name: string;
  phone: string;
  email: string;
  alternativeNo: string;
  address: string;
  pincode?: number;
  state: string;
  city: string;
  dob?: Date | null;
};

const addInitialValues: formProps = {
  name: '',
  phone: '',
  email: '',
  address: '',
  alternativeNo: '',
  pincode: undefined,
  city: '',
  state: '',
  dob: null,
};

type editValueProps = {
  editInitialValues?: any;
  editId?: string;
  handleNextStep?: () => void;
  setCustomerDetails?: any;
};

type Tpayload = {
  name: string;
  email: string;
  phone1: string;
  phone2: string;
  address?: string;
  pincode?: number;
  state: string;
  city: string;
};

function CustomerForm({
  editInitialValues,
  editId,
  handleNextStep,
  setCustomerDetails,
}: editValueProps) {
  const router = useRouter();

  const [loader, setLoader] = useState(false);
  const [pincodeQuery, setPincodeQuery] = useState<string>();

  // // const [startDate, setStartDate] = useState<Date | null>(null);

  // const handleStartDateChange = (date: Date) => {
  //   setStartDate(date);
  // };

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handlePincode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query.length < 6) {
      formik.setFieldValue('state', '');
      formik.setFieldValue('city', '');
    }
    setPincodeQuery(query);
    formik.setFieldValue('pincode', query);
  };

  /* pincode API */
  useEffect(() => {
    if (pincodeQuery?.length === 6) {
      const timer = setTimeout(async () => {
        await axios({
          method: 'get',
          url: `${API_ENDPOINT.END_POINT}/appConfig/pincode?zip=${pincodeQuery}`,
        })
          .then((res) => {
            formik.setFieldValue('state', res?.data?.result[0].State);
            formik.setFieldValue('city', res?.data?.result[0].District);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [pincodeQuery]);
  /* pincode API */

  /* Add Customer  */
  const addCustomers = async (details: formProps) => {
    setLoader(true);

    const {
      // aadharNo,
      email,
      name,
      phone,
      alternativeNo,
      city,
      state,
      pincode,
      address,
    } = details;

    const payload: Tpayload = {
      name: name,
      // aadharNo: aadharNo,
      email: email,
      phone1: phone,
      address: address,
      phone2: alternativeNo,
      city: city,
      state: state,
      pincode: pincode,
    };

    try {
      const res = await httpInstance.post(`/customer/create`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoader(false);
      handleNextStep();
      toast.success('Customer details addedd successfully');
      setCustomerDetails(res.data.result);
    } catch (err) {
      // console.log(err?.response?.data?.message, 'CUSTOMER');
      setLoader(false);
      toast.error(err?.response?.data?.message);
    }
  };

  /* Update Customer */
  const updateCustomers = async (details: formProps) => {
    setLoader(true);

    const {
      // aadharNo,
      email,
      name,
      phone,
      address,
      alternativeNo,
      city,
      state,
      pincode,
    } = details;

    const payload: Tpayload = {
      name: name,
      city: city,
      phone1: phone,
      phone2: alternativeNo,
      address: address,
      state: state,
      pincode: pincode,
      // aadharNo: aadharNo,
      email: email || 'example@gmail.com',
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
      // router.push('/admin/customers');
      toast.success('Customer details updated successfully');
    } catch (err) {
      setLoader(false);
      toast.error('something went wrong');
    }
  };

  const formValues = editId ? editInitialValues : addInitialValues;

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit: (values: formProps, { setSubmitting, resetForm }) => {
      // console.log(values.dob);
      editId ? updateCustomers(values) : addCustomers(values);
    },
  });

  return (
    <>
      <div className='mx-auto mt-5 flex w-1/3 flex-col gap-2'>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            // name='firstName'
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
            name='alternativeNo'
            label='Alternative Mobile No'
            onChange={formik.handleChange}
            value={formik.values.alternativeNo}
          />
          {formik.touched.alternativeNo && formik.errors.alternativeNo && (
            <div className='text-red-400'>{formik.errors.alternativeNo}</div>
          )}
        </div>
        <div className='flex w-full flex-col'>
          <Label>Select DOB</Label>
          <DateSelector
            name='dob'
            selected={formik.values.dob}
            onChange={(date) => formik.setFieldValue('dob', date)}
          />
        </div>

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='pincode'
            label='Pincode'
            placeholder='e.g 394230'
            // value={pincodeValue}
            value={formik.values.pincode}
            onChange={handlePincode}
          />
          {/* {formik.touched.phone && formik.errors.phone && (
            <div className='text-red-400'>{formik.errors.phone}</div>
          )} */}
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='state'
            label='State'
            placeholder='state'
            disabled
            value={formik.values.state}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='city'
            label='City'
            placeholder='city'
            disabled
            value={formik.values.city}
          />
        </div>
        <TextInputArea
          name='address'
          containerClassName='flex-1 '
          label='Address'
          rows='2'
          value={formik.values.address}
          handleChange={formik.handleChange}
        />

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
            {loader ? 'Saving...' : 'Save & Next'}
          </Button>
        )}
      </div>

      <SvmProjectToast />
    </>
  );
}

export default CustomerForm;
