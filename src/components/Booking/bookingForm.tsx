import { Button, Input, Label } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useBankDetails } from '@/hooks/useBankDetails';
import { useCustomerDetails } from '@/hooks/useClientDetails';
import { useProjectDetails } from '@/hooks/useProjectDetails';

import { TBookingProps } from '@/components/Booking/bookingFormTypes';
import { validationSchema } from '@/components/Booking/bookingFormValidationSchema';
import ComboBox from '@/components/ComboBox/comboBox';
import MultipleSelect from '@/components/ComboBox/multipleComboBox';
import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption, TextInputArea } from '@/components/ui-blocks/input';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { httpInstance } from '@/constants/httpInstances';
import { bookingComponetTypes } from '@/pages/admin/realEstateProjects/bookingForm/registerForm';

type formProps = {
  onComplete?: (type: bookingComponetTypes) => void;
};

type EditFormProps = {
  onComplete?: formProps;
  editInitialValues?: any;
  editId?: string;
};

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

const BookingForm = ({
  onComplete,
  editId,
  editInitialValues,
}: EditFormProps) => {
  const routes = useRouter();
  const customerList = useCustomerDetails();

  const projectList = useProjectDetails();
  const accountList = useBankDetails();

  const [loader, setLoader] = useState(false);

  const [paymentTypeError, setPaymentTypeError] = useState({
    chequeNo: false,
    cBankName: false,
    UPIId: false,
    bBankName: false,
    bAcNo: false,
  });

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
      setLoader(false);
      setTimeout(() => {
        routes.push('/admin/booking');
      }, 1000);
    } catch (err) {
      setLoader(false);
      toast.error('Something went wrong');
      routes.push('/admin/booking');
    }
  };
  const updateBookingData = async (values: TBookingProps) => {
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
      setLoader(false);
      setTimeout(() => {
        routes.push('/admin/booking');
      }, 1000);
    } catch (err) {
      setLoader(false);
      toast.success('Something went wrong');
      routes.push('/admin/booking');
    }
  };

  const formInitialValue = editId ? editInitialValues : addInitialValues;

  const formik = useFormik({
    initialValues: formInitialValue,
    validationSchema,
    onSubmit: (values: TBookingProps, { setSubmitting }) => {
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
        console.log(values);
        // editId ? updateBookingData(values) : addBookingData(values);
      }
    },
  });

  //  dependecny
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

  const [pincodeQuery, setPincodeQuery] = useState();
  const [query, setQuery] = useState('');

  const hadnleSearchQuery = (e) => {
    setQuery(e.target.value);
  };

  const afterLeave = () => {
    setQuery('');
  };

  const filteredCustomer =
    query === ''
      ? customerList
      : customerList?.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const filterProjects =
    query === ''
      ? projectList
      : projectList.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const filterAccounts =
    query === ''
      ? accountList
      : accountList.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const calculateRemainingAmt = (total, paid) => {
    const amount = +total - +paid;

    formik.setFieldValue('remainingAmt', amount.toString());
    // return amount;
  };

  useEffect(() => {
    calculateRemainingAmt(formik.values.totalAmt, formik.values.paidAmt);
  }, [formik.values.paidAmt, formik.values.totalAmt]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await axios({
        method: 'get',
        url: `${API_ENDPOINT.END_POINT}/appConfig/pincode?zip=${pincodeQuery}`,
      })
        .then((res) => {
          // console.log(res);

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
  }, [pincodeQuery]);

  const handlePinCodeApi = async (e) => {
    const query = e.target.value;
    setPincodeQuery(query);

    formik.setFieldValue('pincode', query);
  };

  useEffect(() => {
    setPincodeQuery(editInitialValues?.pincode);
  }, [editId]);

  const handlePaymentMethod = (e) => {
    formik?.setFieldValue('paymentMethod', e.target.value);
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
          {formik.touched.area && formik.errors.area && (
            <div className='text-red-400'>{formik.errors.area}</div>
          )}
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='pincode'
            label='Pincode'
            placeholder='e.g 394230'
            value={pincodeQuery}
            // value={formik.values.pincode}
            onChange={handlePinCodeApi}
          />

          {formik.touched.pincode && formik.errors.pincode && (
            <div className='text-red-400'>{formik.errors.pincode}</div>
          )}
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='state'
            label='State'
            placeholder='state'
            disabled={formik.values.state ? true : false}
            // value={formik.values.pincode}
            // value={bookingState}
            value={formik.values.state}
          />

          {/* {formik.touched.pincode && formik.errors.pincode && (
            <div className='text-red-400'>{formik.errors.pincode}</div>
          )} */}
        </div>
        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='city'
            label='City'
            placeholder='City'
            disabled={formik.values.city ? true : false}
            // value={formik.values.pincode}
            value={formik.values.city}
          />

          {/* {formik.touched.pincode && formik.errors.pincode && (
            <div className='text-red-400'>{formik.errors.pincode}</div>
          )} */}
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

          {formik.touched.landmark && formik.errors.landmark && (
            <div className='text-red-400'>{formik.errors.landmark}</div>
          )}
        </div>

        <TextInputArea
          name='address'
          containerClassName='flex-1 '
          label='Address'
          rows='2'
          value={formik.values.address}
          handleChange={formik.handleChange}
        />

        {formik.touched.address && formik.errors.address && (
          <div className='text-red-400'>{formik.errors.address}</div>
        )}

        <div className='flex flex-col'>
          <Label>Bank Account</Label>
          <ComboBox
            placeholder='Select Account'
            data={filterAccounts}
            query={query}
            afterLeave={afterLeave}
            handleSearchQuery={hadnleSearchQuery}
            selected={formik.values.bankAccount}
            setSelected={(account) => {
              formik.setFieldValue('bankAccount', account);
            }}
          />
          {formik.touched.bankAccount && formik.errors.bankAccount && (
            <div className='text-red-400'>{formik.errors.bankAccount}</div>
          )}
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

          {formik.touched.totalAmt && formik.errors.totalAmt && (
            <div className='text-red-400'>{formik.errors.totalAmt}</div>
          )}
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

          {formik.touched.paidAmt && formik.errors.paidAmt && (
            <div className='text-red-400'>{formik.errors.paidAmt}</div>
          )}
        </div>
        <div className='flex flex-col'>
          <TextInput
            readOnly
            // value={remainingAmt}
            type='text'
            name='remainingAmt'
            label='Remaining Amount'
            value={formik.values.remainingAmt}
            // onChange={formik.handleChange}
          />

          {formik.touched.remainingAmt && formik.errors.remainingAmt && (
            <div className='text-red-400'>{formik.errors.remainingAmt}</div>
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

        {/* For Cheque */}
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
            name='noOfInstallment'
            label='No.Of Installment'
            value={formik.values.noOfInstallment}
            onChange={formik.handleChange}
          />

          {formik.touched.noOfInstallment && formik.errors.noOfInstallment && (
            <div className='text-red-400'>{formik.errors.noOfInstallment}</div>
          )}
        </div>

        <div className='flex flex-col'>
          <TextInput
            type='text'
            name='amtPerInstallment'
            label='Amount Per Installment'
            value={formik.values.amtPerInstallment}
            onChange={formik.handleChange}
          />

          {formik.touched.amtPerInstallment &&
            formik.errors.amtPerInstallment && (
              <div className='text-red-400'>
                {formik.errors.amtPerInstallment}
              </div>
            )}
        </div>
        <div className='flex flex-col'>
          <SelectOption
            options={['COMPLETED', 'PENDING', 'PARTIAL']}
            title='Payment Status'
            containerClassName='flex-1 mt-1 w-full'
            name='paymentStatus'
            // value={formik.values.remainingAmt}
            onChange={formik.handleChange}
          />

          {formik.touched.paymentStatus && formik.errors.paymentStatus && (
            <div className='text-red-400'>{formik.errors.paymentStatus}</div>
          )}
        </div>

        {!editId ? (
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Submit
            {loader && <ClipLoader size={20} color='white' />}
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                formik.handleSubmit();
              }}

              // onClick={() => onComplete('imageUpload')}
            >
              Update
              {loader && <ClipLoader size={20} color='white' />}
            </Button>
            <Button
              layout='outline'
              onClick={() => routes.push('/admin/booking')}
            >
              Cancel
            </Button>
          </>
        )}

        <SvmProjectToast />
      </div>
    </>
  );
};

export default BookingForm;
