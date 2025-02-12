import { Button } from '@windmill/react-ui';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';

import { httpInstance } from '@/constants/httpInstances';

const validationSchema = Yup.object().shape({
  bankName: Yup.string().required('bankName is required'),
  accHolderName: Yup.string().required('AccHolderName is required'),
  accNo: Yup.string()
    .matches(/^\d{6,}$/, 'Bank account number atleast 6 digits long')
    .required('Bank account number is required'),
});

type accProps = {
  bankName: string;
  accHolderName: string;
  accNo: string;
};

type editValueprops = {
  editInitialValues?: any;
  editId?: number;
};

function AccountForm({ editInitialValues, editId }: editValueprops) {
  const route = useRouter();
  const [loader, setLoader] = useState(false);

  /* Add Account */
  const addAccounts = async (values: accProps) => {
    const { accHolderName, accNo, bankName } = values;
    setLoader(true);
    const payload = {
      name: accHolderName,
      bankName: bankName,
      accNo: accNo.toString(),
    };

    try {
      const res = await httpInstance.post(`/account/create`, payload);
      setLoader(false);
      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Booking completed successfully';
      toast.success(successMessage);
      setTimeout(() => {
        route.push('/admin/accounts');
      }, 1000);
    } catch (err) {
      // route.push('/admin/accounts');
      setLoader(false);
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  /* Update  AccountList */
  const updateAccounts = async (values: accProps) => {
    const { accHolderName, accNo, bankName } = values;
    setLoader(true);
    const payload = {
      name: accHolderName,
      bankName: bankName,
      accNo: accNo.toString(),
    };

    try {
      const res = await httpInstance.put(`/account/update/${editId}`, payload);
      setLoader(false);
      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Account details updated successfully';
      toast.success(successMessage);
      setTimeout(() => {
        route.push('/admin/accounts');
      }, 1000);
    } catch (err) {
      setLoader(false);
      // toast.error('Something went wrong');
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  const addAccountInitialValues = {
    bankName: '',
    accHolderName: '',
    accNo: '',
  };

  const formValues = editId ? editInitialValues : addAccountInitialValues;

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit: (values: accProps) => {
      editId ? updateAccounts(values) : addAccounts(values);
    },
  });

  return (
    <div className='mx-auto flex w-1/3 flex-col gap-2'>
      <div className='flex flex-col gap-3'>
        <TextInput
          type='text'
          name='bankName'
          label='Bank Name'
          onChange={formik.handleChange}
          value={formik.values.bankName}
        />
        {formik.touched.bankName && formik.errors?.bankName && (
          <div className='text-red-400'>{formik?.errors?.bankName}</div>
        )}
        <TextInput
          type='text'
          name='accHolderName'
          label='A/c Holder Name'
          onChange={formik.handleChange}
          value={formik.values.accHolderName}
        />
        {formik.touched.accHolderName && formik.errors?.accHolderName && (
          <div className='text-red-400'>{formik?.errors?.accHolderName}</div>
        )}
        <TextInput
          type='number'
          name='accNo'
          label='A/c No.'
          onChange={formik.handleChange}
          value={formik.values.accNo}
        />
        {formik.touched.accNo && formik.errors?.accNo && (
          <div className='text-red-400'>{formik?.errors?.accNo}</div>
        )}
        <Button onClick={() => formik.handleSubmit()}>
          {editId ? 'Update' : 'Submit'}
          {loader && <ClipLoader size={20} color='white' />}
        </Button>

        <Button layout='outline' onClick={() => route.push('/admin/accounts')}>
          Cancel
        </Button>
      </div>
      <SvmProjectToast />
    </div>
  );
}

export default AccountForm;
