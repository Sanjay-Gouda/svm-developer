import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  // customerName: Yup.object().nullable().required('Customer Name is required'),
  projectName: Yup.mixed().required('Project Name is required'),
  bankAccount: Yup.mixed().required('Please Selct Bank Account'),
  area: Yup.number()
    .min(1, 'Area must be greater than 0')
    .required('Please enter area'),
  emiDate: Yup.date().required('Date is required'),
  totalAmt: Yup.number()
    .min(0, 'Amount must be a  positive value ')
    .required('Amount is required'),
  paidAmt: Yup.number()
    .min(0, 'Amount must be a  positive value ')
    .required('Amount is required'),

  noOfInstallment: Yup.number()
    .min(0, 'No.of installment must be a  positive value ')
    .required('Amount is required'),

  amtPerInstallment: Yup.number()
    .min(0, 'amtPerInstallment must be a  positive value ')
    .required('Amount is required'),
  paymentStatus: Yup.string().required('Project Status is required'),
});
