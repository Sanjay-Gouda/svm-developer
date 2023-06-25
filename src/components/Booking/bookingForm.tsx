import { Button, Input, Label } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import ComboBox from '@/components/ComboBox/comboBox';
import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';
import { SelectOption, TextInputArea } from '@/components/ui-blocks/input';

import { API_ENDPOINT } from '@/const/APIRoutes';

type payloadProp = {
  id: string;
  name: string;
};

export const validationSchema = Yup.object().shape({
  customerName: Yup.mixed().required('Customer Name is required'),
  projectName: Yup.mixed().required('Project Name is required'),
  bankAccount: Yup.mixed().required('Please Selct Bank Account'),
  area: Yup.number().required('Area must be in number'),
  landmark: Yup.string().required('Landmark is required'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Invalid PIN code. It must be a 6-digit number.'),
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

type customerNameProps = {
  id?: string;
  name?: string;
};

type bookingFormProps = {
  customerName: customerNameProps;
  projectName: customerNameProps;
  bankAccount: customerNameProps;
  area: undefined | number;
  landmark: string;
  pincode: undefined | number;
  address: string;
  state: string;
  city: string;
  // totalAmt: undefined | number;
  totalAmt: any;
  paidAmt: any;
  remainingAmt: any;
  noOfInstallment: undefined | number;
  amtPerInstallment: undefined | number;

  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'CHEQUE' | 'UPI';
  paymentStatus: 'PENDING' | 'PARTIAL' | 'COMPLETED';

  cheuqeNo: undefined | number;
  /* C->Cheque */
  cBankName: string;

  UPIId: string;

  /* BT -BankTransfer */
  BTAcNo: undefined | number;
  BTBankName: string;
};

type EditFormProps = {
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

const BookingForm = ({ editId, editInitialValues }: EditFormProps) => {
  const routes = useRouter();

  const [paymentTypeError, setPaymentTypeError] = useState({
    chequeNo: false,
    cBankName: false,
    UPIId: false,
    bBankName: false,
    bAcNo: false,
  });

  const addBookingData = async (values: bookingFormProps) => {
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
      // bankName: BTBankName,
      // accountNumber: BTAcNo,

      // paymentMethod:'paymentMethod',
      paymentStatus: paymentStatus,
      customerId: customerId,
      adminAccountId: accountId,
      installmentCount: noOfInstallment,
    };

    await axios({
      method: 'post',
      url: `${API_ENDPOINT.END_POINT}booking/create`,
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        toast.success('Booking completed successfully');
        setTimeout(() => {
          routes.push('/admin/booking');
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateBookingData = async (values: bookingFormProps) => {
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

      // paymentMethod:'paymentMethod',
      paymentStatus: paymentStatus,
      customerId: customerId,
      adminAccountId: accountId,
      installmentCount: noOfInstallment,
    };

    await axios({
      method: 'post',
      url: `${API_ENDPOINT.END_POINT}booking/update/${editId}`,
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        toast.success('Booking details are updated successfully');
        setTimeout(() => {
          routes.push('/admin/booking');
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formInitialValue = editId ? editInitialValues : addInitialValues;

  const formik = useFormik({
    initialValues: formInitialValue,
    validationSchema,
    onSubmit: (values: bookingFormProps, { setSubmitting }) => {
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
        editId ? updateBookingData(values) : addBookingData(values);

        console.log(values, 'values');
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

  const [customerPayload, setCustomerPayload] = useState([]);
  const [projectPayload, setProjectPayload] = useState([]);
  const [accountPayload, setAccountPayload] = useState([]);

  const getCustomerList = async () => {
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}/customer/advance-list`,
    })
      .then((res) => {
        // console.log(res);

        const list = res?.data?.result;

        if (list && list?.length > 0) {
          const data = list?.map((payload) => ({
            name: payload.firstName,
            id: payload.customerId,
          }));

          setCustomerPayload(data);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const getProjectList = async () => {
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}project/list`,
    })
      .then((res) => {
        const list = res?.data?.result?.list;

        if (list && list?.length > 0) {
          const data = list?.map((payload) => ({
            name: payload.name,
            id: payload.projectId,
          }));

          setProjectPayload(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAccountList = async () => {
    await axios({
      method: 'GET',
      url: `${API_ENDPOINT.END_POINT}/account/advance-list`,
    })
      .then((res) => {
        // console.log(res?.data?.result, 'res');

        const list = res?.data?.result;

        const data = list?.map((accounts) => ({
          name: accounts.bankName,
          id: accounts.adminAccountId,
        }));

        setAccountPayload(data);
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };

  useEffect(() => {
    getCustomerList();
    getProjectList();
    getAccountList();
  }, []);

  const filteredCustomer =
    query === ''
      ? customerPayload
      : customerPayload.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const filterProjects =
    query === ''
      ? projectPayload
      : projectPayload.filter((person) => {
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

  // const handleTotalAmount = (e) => {
  //   const value = e.target.value;

  //   formik.setFieldValue('totalAmt', value);

  //   const remainingAmt = calculateRemainingAmt(
  //     formik.values.totalAmt,
  //     formik.values.paidAmt
  //   );
  //   formik.setFieldValue('remainingAmt', remainingAmt.toString());
  // };
  // const handlePaidAmount = (e) => {
  //   formik.setFieldValue('paidAmt', e.target.value);
  //   const remainingAmt = calculateRemainingAmt(
  //     formik.values.totalAmt,
  //     formik.values.paidAmt
  //   );
  //   formik.setFieldValue('remainingAmt', remainingAmt.toString());
  // };

  // const handleAmount = (e) => {
  //   const { name, value } = e.target;

  //   formik.setFieldValue(name, value);
  // };

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
            data={accountPayload}
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
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Update
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
