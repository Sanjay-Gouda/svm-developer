import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {
  customerNameProps,
  TBookingProps,
} from '@/components/Booking/bookingFormTypes';
import { validationSchema } from '@/components/Booking/bookingFormValidationSchema';
import BookingForm from '@/components/TestBooking/bookingForm';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { httpInstance } from '@/constants/httpInstances';

const addInitialValues = {
  customerName: {},
  projectName: {},
  bankAccount: {},
  area: undefined,
  landmark: '',
  pincode: undefined,
  state: '',
  city: '',
  address: '',
  totalAmt: 0,
  paidAmt: 0,
  paymentMethod: 'CHEQUE',
  remainingAmt: 0,
  noOfInstallment: 0,
  amtPerInstallment: 0,
  paymentStatus: 'COMPLETED',
  UPIId: '',
  cheuqeNo: undefined,
  cBankName: '',
  BTAcNo: undefined,
  BTBankName: '',
};

type editProps = {
  editInitialValues?: any;
  editId?: string;
};

const TestBooking = ({ editInitialValues, editId }: editProps) => {
  const [showUploadDocument, setShowUploadDocument] = useState(true);
  const [pincodeQuery, setPincodeQuery] = useState<string>();

  const [paymentTypeError, setPaymentTypeError] = useState({
    chequeNo: false,
    cBankName: false,
    UPIId: false,
    bBankName: false,
    bAcNo: false,
  });

  const routes = useRouter();

  const addBookingData = async (values: TBookingProps) => {
    // setLoader(true);
    const {
      address,
      bankAccount,
      customerName,
      area,
      amtPerInstallment,
      noOfInstallment,
      paidAmt,
      paymentStatus,
      landmark,
      pincode,
      projectName,
      remainingAmt,
      totalAmt,
      paymentMethod,
      UPIId,
      cheuqeNo,
      cBankName,
      BTAcNo,
      BTBankName,
    } = values;

    const projectId = projectName.id;
    const accountId = bankAccount.id;
    const customerId = customerName.id;

    const payload = {
      projectId: projectId,
      address1: address,
      address2: landmark,
      pincode: pincode,
      area: area,
      paidAmt: +paidAmt,
      totalAmt: +totalAmt,
      installmentAmt: amtPerInstallment,
      remainAmt: +remainingAmt,
      paymentType: paymentMethod,
      upiId: UPIId,
      chequeNo: cheuqeNo,
      accountNo: BTAcNo,
      bankName: cBankName || BTBankName,
      paymentStatus: paymentStatus,
      customerId: customerId,
      adminAccountId: accountId,
      installmentCount: noOfInstallment,
    };

    try {
      const res = await httpInstance.post(`/booking/create`, payload);
      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Booking completed successfully';
      toast.success(successMessage);
      // setLoader(false);
      setTimeout(() => {
        routes.push('/admin/booking');
      }, 1000);
    } catch (err) {
      // setLoader(false);
      toast.error('Something went wrong');
      // routes.push('/admin/booking');
    }
  };
  const updateBookingData = async (values: TBookingProps) => {
    // setLoader(true);
    const {
      address,
      bankAccount,
      customerName,
      area,
      amtPerInstallment,
      noOfInstallment,
      paidAmt,
      paymentStatus,
      landmark,
      pincode,
      projectName,
      remainingAmt,
      totalAmt,
      paymentMethod,
      UPIId,
      cheuqeNo,
      cBankName,
      BTAcNo,
      BTBankName,
      paymentId,
    } = values;

    const projectId = projectName.id;
    const accountId = bankAccount.id;
    const customerId = customerName.id;

    const payload = {
      projectId: projectId,
      address1: address,
      address2: landmark,
      pincode: pincode,
      area: area,
      paidAmt: paidAmt.toString(),
      totalAmt: totalAmt.toString(),
      installmentAmt: amtPerInstallment,
      remainAmt: remainingAmt,
      paymentType: paymentMethod,
      upiId: UPIId,
      chequeNo: cheuqeNo,
      accountNo: BTAcNo,
      bankName: cBankName || BTBankName,

      // paymentMethod:'paymentMethod',
      paymentStatus: paymentStatus,
      customerId: customerId,
      adminAccountId: accountId,
      installmentCount: noOfInstallment,
      paymentId: paymentId,
    };

    try {
      const res = await httpInstance.put(`booking/update/${editId}`, payload);

      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Booking Updated successfully';

      toast.success(successMessage);
      // setLoader(false);
      setTimeout(() => {
        routes.push('/admin/booking');
      }, 1000);
    } catch (err) {
      // setLoader(false);
      toast.success('Something went wrong');
      routes.push('/admin/booking');
    }
  };

  const formInitialValue = editId ? editInitialValues : addInitialValues;

  const formik = useFormik({
    initialValues: formInitialValue,
    validationSchema,
    onSubmit: (values: TBookingProps, { setSubmitting }) => {
      // console.log(errors);
      // setShowUploadDocument(false);

      // onComplete('imageUpload');
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
        // setShowUploadDocument(false);
        // console.log(values);
        // // editId ? updateBookingData(values) : addBookingData(values);
        // // addBookingData(values);

        // addBookingData(values);

        editId ? updateBookingData(values) : addBookingData(values);
      }
    },
  });

  useEffect(() => {
    if (formik.values.cheuqeNo !== undefined) {
      setPaymentTypeError({
        ...paymentTypeError,
        chequeNo: false,
        cBankName: false,
      });
    } else if (formik.values.cBankName !== '') {
      setPaymentTypeError({
        ...paymentTypeError,
        cBankName: false,
      });
    } else if (formik.values.UPIId !== '') {
      setPaymentTypeError({
        ...paymentTypeError,
        UPIId: false,
      });
    } else if (formik.values.BTAcNo !== undefined) {
      setPaymentTypeError({
        ...paymentTypeError,
        bAcNo: false,
      });
    } else if (formik.values.BTBankName !== '') {
      setPaymentTypeError({
        ...paymentTypeError,
        bBankName: false,
      });
    }
  }, [formik.values]);

  const handlePaymentMethod = (e: any) => {
    formik?.setFieldValue('paymentMethod', e.target.value);
  };

  const handlePinCodeApi = async (e: any) => {
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

  useEffect(() => {
    setPincodeQuery(editInitialValues?.pincode);
  }, [editId]);

  // console.log(formik.errors);

  const handleGoBack = () => {
    setShowUploadDocument(true);
  };

  const calculateRemainingAmt = (total: number, paid: number) => {
    const amount = +total - +paid;

    formik.setFieldValue('remainingAmt', amount.toString());
    // return amount;
  };

  useEffect(() => {
    calculateRemainingAmt(formik.values.totalAmt, formik.values.paidAmt);
  }, [formik.values.paidAmt, formik.values.totalAmt]);

  return (
    <>
      {/* {showUploadDocument ? (
        
      ) : (
        <UploadDocuments handleGoBack={handleGoBack} />
      )} */}

      <BookingForm
        handleMoveToUpload={formik.handleSubmit}
        clientSelect={formik.values.customerName}
        setClientSelect={(person: customerNameProps) => {
          formik.setFieldValue('customerName', person);
        }}
        selectProject={formik.values.projectName}
        setSelectedProject={(project: customerNameProps) => {
          formik.setFieldValue('projectName', project);
        }}
        areaValue={formik.values.area}
        handleArea={formik.handleChange}
        areaError={formik.touched.area && formik.errors.area ? true : false}
        areaErrorMessage={formik.errors.area}
        pincodeValue={pincodeQuery}
        handlePincode={handlePinCodeApi}
        pincodeError={
          formik.touched.pincode && formik.errors.pincode ? true : false
        }
        pincodeErrorMessage={formik.errors.pincode}
        state={formik.values.state}
        city={formik.values.city}
        landmarkValue={formik.values.landmark}
        handleLandmark={formik.handleChange}
        landmarkError={
          formik.touched.landmark && formik.errors.landmark ? true : false
        }
        landmarkErrorMessage={formik.errors.landmark}
        addressValue={formik.values.address}
        handleAddress={formik.handleChange}
        addressError={
          formik.touched.address && formik.errors.address ? true : false
        }
        addressErrorMessage={formik.errors.address}
        selectBankAccount={formik.values.bankAccount}
        setSelectedBankAccount={(account: customerNameProps) => {
          formik.setFieldValue('bankAccount', account);
        }}
        bankAccountError={
          formik.touched.bankAccount && formik.errors.bankAccount ? true : false
        }
        bankAccountErrorMessage={formik.errors.bankAccount}
        totalAmtValue={formik.values.totalAmt}
        handleTotalAmt={formik.handleChange}
        totalAmtError={
          formik.touched.totalAmt && formik.errors.totalAmt ? true : false
        }
        totalAmtErrorMessage={formik.errors.totalAmt}
        paidAmtValue={formik.values.paidAmt}
        handlePaidAmt={formik.handleChange}
        paidAmtError={
          formik.touched.paidAmt && formik.errors.paidAmt ? true : false
        }
        paidAmtErrorMessage={formik.errors.paidAmt}
        remainAmtValue={formik.values.remainingAmt}
        remainingAmtError={
          formik.touched.remainingAmt && formik.errors.remainingAmt
            ? true
            : false
        }
        remainingAmtErrorMessage={formik.errors.remainingAmt}
        handlePaymentMethod={handlePaymentMethod}
        paymentMethodType={formik.values.paymentMethod}
        chequeNoValue={formik.values.cheuqeNo}
        handlechequeNo={formik.handleChange}
        chequeNoError={paymentTypeError.chequeNo}
        cBankNameValue={formik.values.cBankName}
        handleCBankName={formik.handleChange}
        cBankNameError={paymentTypeError.cBankName}
        upiValue={formik.values.UPIId}
        handleUpi={formik.handleChange}
        upiIdError={paymentTypeError.UPIId}
        btAcNoValue={formik.values.BTAcNo}
        handleBtAcNo={formik.handleChange}
        btAcNoError={paymentTypeError.bAcNo}
        btBankNameValue={formik.values.BTBankName}
        handleBtBankName={formik.handleChange}
        btBankNameError={paymentTypeError.bBankName}
        noOfInstallMentValue={formik.values.noOfInstallment}
        handleNoOfInstallment={formik.handleChange}
        installmentError={
          formik.touched.noOfInstallment && formik.errors.noOfInstallment
            ? true
            : false
        }
        installmentErrorMessage={formik.errors.noOfInstallment}
        amtPerInstallmentValue={formik.values.amtPerInstallment}
        handleAmtPerInstallment={formik.handleChange}
        amtPerInstallError={
          formik.touched.amtPerInstallment && formik.errors.amtPerInstallment
            ? true
            : false
        }
        amtPerInstallmentMessage={formik.errors.amtPerInstallment}
        handleSelectOption={formik.handleChange}
      />
    </>
  );
};

export default TestBooking;
