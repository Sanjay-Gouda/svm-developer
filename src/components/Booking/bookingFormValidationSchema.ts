import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  // customerName: Yup.object().nullable().required('Customer Name is required'),
  projectName: Yup.mixed().required('Project Name is required'),
  bankAccount: Yup.mixed().required('Please Selct Bank Account'),
  area: Yup.number().required('Please enter area'),
  plotNo: Yup.number().required('Please enter Plotno'),

  // landmark: Yup.string().required('Landmark is required'),
  // pincode: Yup.string()
  //   .required('Pincode is required')
  //   .matches(/^\d{6}$/, 'Invalid PIN code. It must be a 6-digit number.'),
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
