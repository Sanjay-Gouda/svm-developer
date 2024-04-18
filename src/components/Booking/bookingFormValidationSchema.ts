import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  // customerName: Yup.object().nullable().required('Customer Name is required'),
  projectName: Yup.mixed().required('Project Name is required'),
  bankAccount: Yup.mixed().required('Please Selct Bank Account'),
  area: Yup.number().required('Please enter area'),
  emiDate: Yup.date().required('Date is required'),
  totalAmt: Yup.number()
    .required('Amount is required')
    .positive('Amount must be greater than 0'),
  paidAmt: Yup.number()
    .min(0, 'Amount cannot be negative')
    .integer('Amount must be greater than 0')
    .required('Amount is required'),

  noOfInstallment: Yup.number()
    .positive('Amount must be positive')
    .integer('Amount must be an integer')
    .required('Amount is required'),

  amtPerInstallment: Yup.number()
    .positive('Amount must be positive')
    .integer('Amount must be greater than 0')
    .required('Amount is required'),
  paymentStatus: Yup.string().required('Project Status is required'),
});
