import { Button, Label } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import ComboBox from '@/components/ComboBox/comboBox';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption, TextInputArea } from '@/components/ui-blocks/input';

import { API_ENDPOINT } from '@/const/APIRoutes';

type payloadProp = {
  id: string;
  name: string;
};

export const validationSchema = Yup.object().shape({
  customerName: Yup.mixed().required('Customer Name is required'),
  projectName: Yup.mixed().required('Project Name is required'),
  area: Yup.number().required('Area must be in number'),
  landmark: Yup.string().required('Landmark is required'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Invalid PIN code. It must be a 6-digit number.'),
  // address: Yup.string().required('Address is required'),
  totalAmt: Yup.number()
    .positive('Amount must be positive')
    .integer('Amount must be an integer')
    .required('Amount is required'),
  paidAmt: Yup.number()
    .min(0, 'Amount cannot be negative')
    .integer('Amount must be an integer')
    .required('Amount is required'),

  noOfInstallment: Yup.number()
    .positive('Amount must be positive')
    .integer('Amount must be an integer')
    .required('Amount is required'),

  amtPerInstallment: Yup.number()
    .positive('Amount must be positive')
    .integer('Amount must be an integer')
    .required('Amount is required'),
  paymentStatus: Yup.string().required('Project Status is required'),
});

type bookingFormProps = {
  customerName: string;
  projectName: string;
  area: undefined | number;
  landmark: string;
  pincode: undefined | number;
  address: string;
  totalAmt: undefined | number;
  paidAmt: undefined | number;
  remainingAmt: undefined | number;
  noOfInstallment: undefined | number;
  amtPerInstallment: undefined | number;
  paymentStatus: 'Done' | 'Pending';
};

const BookingForm = () => {
  const formik = useFormik({
    initialValues: {
      customerName: '',
      projectName: '',
      area: undefined,
      landmark: '',
      pincode: undefined,
      address: '',
      totalAmt: 0,
      paidAmt: 0,
      remainingAmt: 0,
      noOfInstallment: 0,
      amtPerInstallment: 0,
      paymentStatus: 'Done',
    },
    validationSchema,
    onSubmit: (values: bookingFormProps, { setSubmitting }) => {
      console.log(values, 'values');
    },
  });

  const [totalAmt, setTotalAmt] = useState(0);
  const [paidAmt, setPaidAmt] = useState(0);
  const [remainingAmt, setRemainingAmt] = useState(0);
  const [customerList, setCustomerList] = useState([]);
  const [query, setQuery] = useState('');

  const [selected, setSelected] = useState('');

  const hadnleSearchQuery = (e) => {
    setQuery(e.target.value);
  };

  const afterLeave = () => {
    setQuery('');
  };

  useEffect(() => {
    console.log(formik.errors);
  });

  useEffect(() => {
    console.log(selected, 'name');
  }, [selected]);

  const [customerPayload, setCustomerPayload] = useState([]);
  const [projectPayload, setProjectPayload] = useState([]);

  const getCustomerList = async () => {
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}/customer/advance-list`,
    })
      .then((res) => {
        console.log(res);

        const list = res?.data?.result;

        if (list && list?.length > 0) {
          const data = list?.map((payload) => ({
            name: payload.firstName,
            id: payload.customerId,
          }));

          setCustomerPayload(data);
        }

        setCustomerList(res.data.result);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const getProjectList = async () => {
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}project/list`,
    })
      .then((res) => {
        const list = res?.data?.result?.list;

        if (list && list?.length > 0) {
          const data = list?.map((payload) => ({
            name: payload.name,
            id: payload.projectId,
          }));
          console.log(data, 'payload');

          setProjectPayload(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAccountList = async () => {
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}/account/basic-list`,
    })
      .then((res) => {
        console.log(res, 'res');
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };

  useEffect(() => {
    getCustomerList();
    getProjectList();
    getAccountList();
  }, []);

  const filteredCustomer =
    query === ''
      ? customerPayload
      : customerPayload.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const filterProjects =
    query === ''
      ? projectPayload
      : projectPayload.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleTotalAmtChange = (e) => {
    const newTotalAmt = parseInt(e.target.value);
    setTotalAmt(newTotalAmt);
    calculateRemainingAmt(newTotalAmt, paidAmt);
  };

  const handlePaidAmtChange = (e) => {
    const newPaidAmt = parseInt(e.target.value);
    setPaidAmt(newPaidAmt);
    calculateRemainingAmt(totalAmt, newPaidAmt);
  };

  const calculateRemainingAmt = (totalAmt, paidAmt) => {
    const remainingAmt = totalAmt - paidAmt;
    setRemainingAmt(remainingAmt);
  };

  return (
    <>
      <div className='mx-auto flex w-1/3 flex-col gap-2'>
        <div className='flex flex-col'>
          <Label>Client Name</Label>
          <ComboBox
            placeholder='Search Client'
            data={filteredCustomer}
            query={query}
            afterLeave={afterLeave}
            handleSearchQuery={hadnleSearchQuery}
            selected={formik.values.customerName}
            setSelected={(person) => {
              formik.setFieldValue('customerName', person);
            }}
          />

          {formik.touched.customerName && formik.errors.customerName && (
            <div className='text-red-400'>{formik.errors.customerName}</div>
          )}
        </div>
        <div className='flex flex-col'>
          <Label>Project Name</Label>
          <ComboBox
            placeholder='Search Project'
            data={filterProjects}
            query={query}
            afterLeave={afterLeave}
            handleSearchQuery={hadnleSearchQuery}
            selected={formik.values.projectName}
            setSelected={(project) => {
              formik.setFieldValue('projectName', project);
            }}
          />
          {formik.touched.projectName && formik.errors.projectName && (
            <div className='text-red-400'>{formik.errors.projectName}</div>
          )}
        </div>

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='area'
            label='Area'
            placeholder='e.g 30 sq.meter'
            value={formik.values.area}
            onChange={formik.handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='pincode'
            label='Pincode'
            placeholder='e.g 394230'
            value={formik.values.pincode}
            onChange={formik.handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='landmark'
            label='Landmark'
            placeholder='e.g Sachin'
            value={formik.values.landmark}
            onChange={formik.handleChange}
          />
        </div>

        <TextInputArea
          name='address'
          containerClassName='flex-1 '
          label='Address'
          rows='2'
          value={formik.values.address}
          onChange={formik.handleChange}
        />

        <div className='flex flex-col'>
          <Label>Bank Account</Label>
          <ComboBox
            placeholder='Select Account'
            // data={filteredPeople}
            // query={query}
            // afterLeave={afterLeave}
            // handleSearchQuery={hadnleSearchQuery}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            // value={totalAmt}
            type='text'
            name='totalAmt'
            label='Total Amount'
            // onChange={handleTotalAmtChange}
            value={formik.values.totalAmt}
            onChange={formik.handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            // value={paidAmt}
            // onChange={handlePaidAmtChange}
            type='text'
            name='paidAmt'
            label='Paid Amount'
            value={formik.values.paidAmt}
            onChange={formik.handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            // value={remainingAmt}
            type='text'
            name='remainingAmt'
            label='Remaining Amount'
            value={formik.values.remainingAmt}
            onChange={formik.handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='noOfInstallment'
            label='No.Of Installment'
            value={formik.values.noOfInstallment}
            onChange={formik.handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='amtPerInstallment'
            label='Amount Per Installment'
            value={formik.values.amtPerInstallment}
            onChange={formik.handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <SelectOption
            options={['done', 'pending']}
            title='Payment Status'
            containerClassName='flex-1 mt-1 w-full'
            name='status'
            // value={formik.values.remainingAmt}
            onChange={formik.handleChange}
          />
        </div>

        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Check
        </Button>
      </div>
    </>
  );
};

export default BookingForm;
