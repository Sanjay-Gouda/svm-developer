import { Button } from '@windmill/react-ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TextInput } from '@/components/ui-blocks';

const validationSchema = Yup.object().shape({
  bankName: Yup.string().required('bankName is required'),
  accHolderName: Yup.string().required('AccHolderName is required'),
  accNo: Yup.string()
    .matches(/^\d{10}$/, 'Bank account number must be 10 digits long')
    .required('Bank account number is required'),
});

type accProps = {
  bankName: string;
  accHolderName: string;
  accNo: string;
};

function AccountForm() {
  // const addAccounts = async (values: accProps) => {
  //   const { accHolderName, accNo, bankName } = values;

  //   const payload = {
  //     name: accHolderName,
  //     bankName: bankName,
  //     accNo: accNo,
  //   };

  //   await axios({
  //     method: 'post',
  //     url: `${API_ENDPOINT.END_POINT}/account/create`,
  //     data: payload,
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const formik = useFormik({
    initialValues: {
      bankName: '',
      accHolderName: '',
      accNo: '',
    },
    validationSchema,
    onSubmit: (values: accProps) => {
      console.log(values);
      // addAccounts(values);
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
        <TextInput
          type='text'
          name='accHolderName'
          label='A/c Holder Name'
          onChange={formik.handleChange}
          value={formik.values.accHolderName}
        />
        <TextInput
          type='text'
          name='accNo'
          label='A/c No.'
          onChange={formik.handleChange}
          value={formik.values.accNo}
        />
        <Button onClick={() => formik.handleSubmit()}>Submit</Button>
      </div>
    </div>
  );
}

export default AccountForm;
