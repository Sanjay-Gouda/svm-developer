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

import { httpInstance } from '@/constants/httpInstances';

const addInitialValues = {
  customerName: [],
  projectName: {},
  bankAccount: {},
  area: undefined,
  plotNo: undefined,
  totalAmt: 0,
  paidAmt: 0,
  paymentMethod: 'CASH',
  remainingAmt: 0,
  noOfInstallment: 0,
  amtPerInstallment: 0,
  paymentStatus: 'COMPLETED',
  UPIId: '',
  cheuqeNo: undefined,
  cBankName: '',
  BTAcNo: undefined,
  BTBankName: '',
  emiDate: null,
};

type editProps = {
  editInitialValues?: any;
  editId?: string;
};

const TestBooking = ({ editInitialValues, editId }: editProps) => {
  const [loader, setLoader] = useState(false);
  const [paymentTypeError, setPaymentTypeError] = useState({
    chequeNo: false,
    cBankName: false,
    UPIId: false,
    bBankName: false,
    bAcNo: false,
  });

  const routes = useRouter();

  const addBookingData = async (values: TBookingProps) => {
    setLoader(true);

    const {
      address,
      bankAccount,
      customerName,
      area,
      amtPerInstallment,
      noOfInstallment,
      paidAmt,
      paymentStatus,
      // landmark,
      // pincode,
      projectName,
      remainingAmt,
      totalAmt,
      paymentMethod,
      UPIId,
      cheuqeNo,
      cBankName,
      BTAcNo,
      BTBankName,
      plotNo,
      emiDate,
    } = values;

    const projectId = projectName.id;
    const accountId = bankAccount.id;
    const customerIds = customerName?.map((customer) => customer.id);

    const newPaymentStatus =
      paymentStatus === 'IN PROGRESS' ? 'PARTIAL' : paymentStatus;

    const payload = {
      projectId: projectId,
      installmentDate: emiDate,
      plotNo: plotNo,
      area: +area,
      paidAmt: +paidAmt,
      totalAmt: +totalAmt,
      installmentAmt: amtPerInstallment,
      remainAmt: +remainingAmt,
      paymentType: paymentMethod,
      upiId: UPIId,
      chequeNo: cheuqeNo,
      accountNo: BTAcNo,
      bankName: cBankName || BTBankName,
      paymentStatus: newPaymentStatus,
      customerIds: customerIds,
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
      setLoader(false);
      setTimeout(() => {
        routes.push('/admin/booking');
      }, 1000);
    } catch (err) {
      setLoader(false);

      toast.error(err?.response?.data?.message);
      // routes.push('/admin/booking');
    }
  };
  const updateBookingData = async (values: TBookingProps) => {
    setLoader(true);

    const {
      bankAccount,
      customerName,
      area,
      amtPerInstallment,
      noOfInstallment,
      paidAmt,
      paymentStatus,
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

    const newPaymentStatus =
      paymentStatus === 'IN PROGRESS' ? 'PARTIAL' : paymentStatus;

    const customerIds = customerName?.map((customer) => customer.id);

    const payload = {
      projectId: projectId,

      area: +area,
      paidAmt: paidAmt.toString(),
      totalAmt: totalAmt.toString(),
      installmentAmt: amtPerInstallment,
      remainAmt: remainingAmt,
      paymentType: paymentMethod,
      upiId: UPIId,
      chequeNo: cheuqeNo?.toString(),
      accountNo: BTAcNo,
      bankName: cBankName || BTBankName,

      // paymentMethod:'paymentMethod',
      paymentStatus: newPaymentStatus,
      customerIds: customerIds,
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
      setLoader(false);
      setTimeout(() => {
        routes.push('/admin/booking');
      }, 1000);
    } catch (err) {
      setLoader(false);

      toast.error(err?.response?.data?.message);
      routes.push('/admin/booking');
    }
  };

  const formInitialValue = editId ? editInitialValues : addInitialValues;
  console.log(formInitialValue, 'INITIAL VALUE UPDATE');

  const formik = useFormik({
    initialValues: formInitialValue,
    validationSchema,
    onSubmit: (values: TBookingProps, { setSubmitting }) => {
      console.log('Called TOP', values);

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
        // console.log('Called ELSE', values);
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

  const calculateRemainingAmt = (total: number, paid: number) => {
    const amount = +total - +paid;

    formik.setFieldValue('remainingAmt', amount.toString());
    // return amount;
  };

  const calculateInstallmentCount = () => {
    const remainingAmt = +formik.values.remainingAmt;
    const noOfInstallment = +formik.values.noOfInstallment;
    // const noOfInstallment = (remainingAmt / amtPerInstallment); // Round up to ensure all installments are covered
    const perInstallment = Math.ceil(remainingAmt / noOfInstallment);
    // const noOfInstallment = Math.ceil(remainingAmt / amtPerInstallment); // Round up to ensure all installments are covered
    formik.setFieldValue('amtPerInstallment', perInstallment);
  };

  useEffect(() => {
    calculateInstallmentCount();
  }, [formik.values.noOfInstallment, formik.values.totalAmt]);

  useEffect(() => {
    calculateRemainingAmt(formik.values.totalAmt, formik.values.paidAmt);
  }, [formik.values.paidAmt, formik.values.amtPerInstallment]);

  const handleClientSelect = (person: customerNameProps) => {
    formik.setFieldValue('customerName', person);
  };

  return (
    <>
      <BookingForm
        selectedDate={formik.values.emiDate}
        onDateChange={(date: Date) => formik.setFieldValue('emiDate', date)}
        editId={editId}
        loader={loader}
        handleMoveToUpload={formik.handleSubmit}
        clientError={
          formik.touched.customerName && formik.errors.customerName
            ? true
            : false
        }
        clientErrorMessage={formik.errors.customerName}
        clientSelect={formik.values.customerName}
        setClientSelect={handleClientSelect}
        selectProject={formik.values.projectName}
        setSelectedProject={(project: customerNameProps) => {
          formik.setFieldValue('projectName', project);
        }}
        areaValue={formik.values.area}
        handleArea={formik.handleChange}
        areaError={formik.touched.area && formik.errors.area ? true : false}
        dateError={
          formik.touched.emiDate && formik.errors.emiDate ? true : false
        }
        dateErrorMessage={formik.touched.emiDate}
        areaErrorMessage={formik.errors.area}
        handlePlotNo={formik.handleChange}
        plotNoValue={formik.values.plotNo}
        plotNoErrorMessage={
          formik.touched.plotNo && formik.errors.plotNo ? true : false
        }
        // pincodeValue={pincodeQuery}
        // handlePincode={handlePinCodeApi}
        pincodeError={
          formik.touched.pincode && formik.errors.pincode ? true : false
        }
        // pincodeErrorMessage={formik.errors.pincode}
        // state={formik.values.state}
        // city={formik.values.city}
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
