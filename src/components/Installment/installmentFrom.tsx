import { Button, Input, Label } from '@windmill/react-ui';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useBookingDetails } from '@/hooks/useBookingDetails';

import { TextInput } from '@/components/ui-blocks';

import { httpInstance } from '@/constants/httpInstances';

const addInitialValues: TInstallment = {
  bookingCustomer: [],
  amt: 0,
  paymentMethod: 'CASH',
  BTAcNo: '',
  BTBankName: '',
  cBankName: '',
  cheuqeNo: '',
  UPIId: '',
  penalty: 0,
};

export type TIBankDetails = {
  paymentType: 'CHEQUE' | 'CASH' | 'UPI' | 'BANK_TRANSFER';
  accountNumber?: string;
  bankName?: string;
  chequeNumber?: string;
  upiId?: string;
  penalty?: number;
  installmentNo: number;
};

type TInstallment = {
  bookingCustomer: string[];
  amt: number;
  UPIId: '';
  cheuqeNo: '';
  cBankName: '';
  BTAcNo: '';
  BTBankName: '';
  penalty: number;
  paymentMethod: 'CHEQUE' | 'CASH' | 'UPI' | 'BANK_TRANSFER';
};

export type TCreateInstallment = {
  bookingId: string;
  amount: number;
  data: TIBankDetails[];
};

type TIBookingCustomerList = {
  customerList?: TInstallment;
  bookingId?: string;
};

function InstallmentForm({ customerList, bookingId }: TIBookingCustomerList) {
  const router = useRouter();

  const [paymentTypeError, setPaymentTypeError] = useState({
    chequeNo: false,
    cBankName: false,
    UPIId: false,
    bBankName: false,
    bAcNo: false,
  });

  const addInstallments = async (values: TInstallment) => {
    const {
      BTBankName,
      UPIId,
      amt,
      bookingCustomer,
      cBankName,
      BTAcNo,
      cheuqeNo,
      paymentMethod,
      penalty,
    } = values;

    const { name, id } = bookingCustomer;

    const payload: TCreateInstallment = {
      amount: amt,
      data: [
        {
          paymentType: paymentMethod,
          accountNumber: '9090990909',
          // bankName: BTBankName || cBankName,
          bankName: 'ICICI',
          chequeNumber: '8908909809',
          upiId: 'UPIId',
          penalty: penalty,
          installmentNo: 2,
        },
      ],
      bookingId: id,
    };

    try {
      const res = await httpInstance.post(`/installment/create`, payload);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaymentMethodErrors = (values: TInstallment) => {
    if (formik.values.paymentMethod === 'UPI' && formik.values.UPIId === '') {
      setPaymentTypeError({
        ...paymentTypeError,
        UPIId: true,
      });
    } else if (
      formik.values.paymentMethod === 'CHEQUE' &&
      (formik.values.cheuqeNo === undefined || formik.values.cBankName === '')
    ) {
      setPaymentTypeError({
        ...paymentTypeError,
        chequeNo: true,
        cBankName: true,
      });
    } else if (
      formik.values.paymentMethod === 'BANK_TRANSFER' &&
      (formik.values.BTBankName === '' || formik.values.BTAcNo === undefined)
    ) {
      setPaymentTypeError({
        ...paymentTypeError,
        bBankName: true,
        bAcNo: true,
      });
    } else {
      addInstallments(values);

      // editId ? updateBookingData(values) : addBookingData(values);
    }
  };

  const initialvalues = bookingId ? customerList : addInitialValues;

  console.log(initialvalues, 'INITIALVALUES');

  const formik = useFormik({
    initialValues: initialvalues,
    onSubmit: (values: TInstallment) => {
      // console.log(values);
      handlePaymentMethodErrors(values);
    },
  });

  const handlePaymentMethod = (e: any) => {
    formik?.setFieldValue('paymentMethod', e.target.value);
  };

  const bookigDetails = useBookingDetails();

  const [query, setQuery] = useState('');

  const hadnleSearchQuery = (e: any) => {
    setQuery(e.target.value);
  };

  const afterLeave = () => {
    setQuery('');
  };

  const filteredCustomer =
    query === ''
      ? bookigDetails
      : bookigDetails?.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleCancel = () => {
    router.push('/admin/booking');
  };

  return (
    <>
      <div className='mx-auto flex w-1/3  flex-col gap-2'>
        {/* <div className='flex flex-col'>
          <Label>Select Booking Customer</Label>
          <ComboBox
            placeholder='Search Customer'
            data={filteredCustomer}
            query={query}
            afterLeave={afterLeave}
            handleSearchQuery={hadnleSearchQuery}
            selected={formik.values.bookingCustomer}
            setSelected={(person) => {
              formik.setFieldValue('bookingCustomer', person);
            }}
          />
        </div> */}
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='bookingCustomer'
            label='Booking Customer'
            value={formik.values.bookingCustomer}
            disabled
            // onChange={formik.handleChange}
          />
        </div>

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='amt'
            label='Paid Amount'
            value={formik.values.amt}
            onChange={formik.handleChange}
          />
        </div>

        <div className='flex flex-col'>
          <Label className='mb-2'>Payment Type</Label>
          <div className='flex justify-between gap-2'>
            <Label radio>
              <Input
                css=''
                onChange={handlePaymentMethod}
                type='radio'
                value='CASH'
                name='paymentMehod'
                checked={formik.values.paymentMethod === 'CASH'}
              />
              <span className='ml-2'>Cash</span>
            </Label>
            <Label radio>
              <Input
                css=''
                onChange={handlePaymentMethod}
                type='radio'
                value='CHEQUE'
                name='paymentMehod'
                checked={formik.values.paymentMethod === 'CHEQUE'}
              />
              <span className='ml-2'>Cheuqe</span>
            </Label>
            <Label radio>
              <Input
                css=''
                onChange={handlePaymentMethod}
                type='radio'
                value='UPI'
                name='paymentMehod'
                checked={formik.values.paymentMethod === 'UPI'}
              />
              <span className='ml-2'>UPI</span>
            </Label>
            <Label radio>
              <Input
                css=''
                onChange={handlePaymentMethod}
                type='radio'
                value='BANK_TRANSFER'
                name='paymentMehod'
                checked={formik.values.paymentMethod === 'BANK_TRANSFER'}
              />
              <span className='ml-2'>Bank Transfer</span>
            </Label>
          </div>
        </div>

        <>
          {formik.values.paymentMethod === 'CHEQUE' ? (
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='cheuqeNo'
                  value={formik.values.cheuqeNo}
                  onChange={formik.handleChange}
                  label='Cheuqe No'
                />

                {paymentTypeError.chequeNo && (
                  <div className='text-red-400'>Cheque No is required</div>
                )}
              </div>

              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='cBankName'
                  value={formik.values.cBankName}
                  onChange={formik.handleChange}
                  label='Bank Name'
                />
                {paymentTypeError.cBankName && (
                  <div className='text-red-400'>Bank Name is required</div>
                )}
              </div>
            </div>
          ) : null}
        </>
        {/* For UPI */}
        <>
          {formik.values.paymentMethod === 'UPI' ? (
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='UPIId'
                  value={formik.values.UPIId}
                  onChange={formik.handleChange}
                  label='UPI ID'
                />

                {paymentTypeError.UPIId && (
                  <div className='text-red-400'>UPI id required</div>
                )}
              </div>
            </div>
          ) : null}
        </>
        {/* For Bank Transfer */}
        <>
          {formik.values.paymentMethod === 'BANK_TRANSFER' ? (
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='BTAcNo'
                  value={formik.values.BTAcNo}
                  onChange={formik.handleChange}
                  label='Account No.'
                />

                {paymentTypeError.bAcNo && (
                  <div className='text-red-400'>Account No. is required</div>
                )}
              </div>
              <div className='flex flex-col'>
                <TextInput
                  type='text'
                  name='BTBankName'
                  value={formik.values.BTBankName}
                  onChange={formik.handleChange}
                  label='Bank Name'
                />
                {paymentTypeError.bBankName && (
                  <div className='text-red-400'>Bank Name is required</div>
                )}
              </div>
            </div>
          ) : null}
        </>

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='penalty'
            label='Penalty'
            value={formik.values.penalty}
            onChange={formik.handleChange}
          />
        </div>

        <Button onClick={() => formik.handleSubmit()}>Submit</Button>
        <Button layout='outline' onClick={() => handleCancel()}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default InstallmentForm;
