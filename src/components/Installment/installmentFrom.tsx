import { Button, Input, Label } from '@windmill/react-ui';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';

import { httpInstance } from '@/constants/httpInstances';

type TPaymentMethod = {
  paymentmethod: 'CHEQUE' | 'CASH' | 'UPI' | 'BANK_TRANSFER';
};

const validationSchema = Yup.object().shape({
  amt: Yup.string()
    .required('Amount is required')
    .typeError('Amount must be a number'),
});

const addInitialValues: TInstallment = {
  bookingCustomer: '',
  amt: '',
  remainngAmt: 0,
  paymentMethod: 'CASH',
  BTAcNo: '',
  BTBankName: '',
  cBankName: '',
  cheuqeNo: '',
  UPIId: '',
  penalty: 0,
};

export type TIBankDetails = {
  paymentType: TPaymentMethod;
  accountNumber?: string;
  bankName?: string;
  chequeNumber?: string;
  upiId?: string;
  penalty?: number;
  installmentNo?: number;
};

type TInstallment = {
  bookingCustomer: string;
  amt: number | string;
  remainngAmt: number;
  UPIId: '';
  cheuqeNo: '';
  cBankName: '';
  BTAcNo: '';
  BTBankName: '';
  penalty: number;
  paymentMethod: TPaymentMethod;
};

export type TCreateInstallment = {
  bookingId?: string;
  amount: number;
  data: TIBankDetails[];
};

type TIBookingCustomerList = {
  customerList?: TInstallment;
  bookingId?: string;
  installmentId?: string;
};

function InstallmentForm({
  customerList,
  bookingId,
  installmentId,
}: TIBookingCustomerList) {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const cookies = new Cookies();
  const token = cookies.get('token');

  const [paymentTypeError, setPaymentTypeError] = useState({
    chequeNo: false,
    cBankName: false,
    UPIId: false,
    bBankName: false,
    bAcNo: false,
  });

  const addInstallments = async (values: TInstallment) => {
    setLoader(true);
    const {
      BTBankName,
      UPIId,
      amt,
      cBankName,
      BTAcNo,
      cheuqeNo,
      paymentMethod,
      penalty,
    } = values;

    const payload: TCreateInstallment = {
      amount: +amt,
      data: [
        {
          paymentType: paymentMethod,
          accountNumber: BTAcNo,
          bankName: BTBankName || cBankName,
          chequeNumber: cheuqeNo,
          upiId: UPIId,
          penalty: +penalty,
        },
      ],
      bookingId: bookingId,
    };

    try {
      await httpInstance.post(`/installment/create`, payload);
      toast.success('Installment added Successfully');

      setTimeout(() => {
        router.push('/admin/booking');
      }, 3000);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      toast.error(
        err?.response?.data?.message ||
          'The installment exceeds the actual amount'
      );
      // router.push('/admin/booking');
    }
  };

  const updateInstallment = async (values: TInstallment) => {
    const {
      BTBankName,
      UPIId,
      amt,
      cBankName,
      BTAcNo,
      cheuqeNo,
      paymentMethod,
      penalty,
    } = values;
    setLoader(true);

    const payload: TCreateInstallment = {
      amount: +amt,
      paymentType: paymentMethod,
      accountNumber: BTAcNo,
      bankName: BTBankName || cBankName,
      chequeNumber: cheuqeNo,
      upiId: UPIId,
      penalty: penalty,
      bookingId: bookingId,
    };

    try {
      await httpInstance.put(`/installment/update/${installmentId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoader(false);
      toast.success('Installment Updated Successfully..');
      setTimeout(() => {
        router.push('/admin/booking');
      }, 3000);
    } catch (err) {
      setLoader(false);
      toast.error('Something went wrong');
      // router.push('/admin/booking');
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
      installmentId ? updateInstallment(values) : addInstallments(values);
    }
  };

  const initialvalues = bookingId ? customerList : addInitialValues;
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema,
    onSubmit: (values: TInstallment) => {
      handlePaymentMethodErrors(values);
    },
  });

  const handlePaymentMethod = (e: any) => {
    formik?.setFieldValue('paymentMethod', e.target.value);
  };

  const handleCancel = () => {
    router.push('/admin/booking');
  };

  return (
    <>
      <div className='mx-auto flex w-1/3  flex-col gap-2'>
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

        {!installmentId && (
          <div className='flex flex-col'>
            <TextInput
              type='text'
              name='remainngAmt'
              label='Remaining Amt'
              value={formik.values.remainngAmt}
              disabled
              // onChange={formik.handleChange}
            />
          </div>
        )}

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='amt'
            label='Paid Amount *'
            placeholder='add amount'
            value={formik.values.amt}
            onChange={formik.handleChange}
          />
          {formik.touched.amt && formik.errors.amt && (
            <div className='text-red-400'>{formik.errors.amt}</div>
          )}
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
              <span className='ml-2'>Cheque</span>
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
                  label='Cheque No'
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
            placeholder='Penalty'
            value={formik.values.penalty}
            onChange={formik.handleChange}
          />
        </div>
        {installmentId ? (
          <Button onClick={() => formik.handleSubmit()}>
            {loader ? 'Updating...' : 'Update'}
          </Button>
        ) : (
          <Button onClick={() => formik.handleSubmit()}>
            {loader ? 'Submitting...' : 'Submit'}
          </Button>
        )}
        <Button layout='outline' onClick={() => handleCancel()}>
          Cancel
        </Button>
      </div>

      <SvmProjectToast />
    </>
  );
}

export default InstallmentForm;
