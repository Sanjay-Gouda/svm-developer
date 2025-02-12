import { Card, CardBody } from '@windmill/react-ui';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

import InstallmentForm from '@/components/Installment/installmentFrom';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

type TImageType = 'FRONT_REAR' | 'FRONT_BACK' | 'PHOTO';

type TCutomerImage = {
  createdAt: string;

  customerId: string;
  customerImageId: string;

  imageUrl: string;

  type: TImageType;

  updatedAt: string;
};

type TCustomerPDFDetail = {
  address: string;
  city: string;
  customerId: string;
  images: TCutomerImage[];
  name: string;
  phone1: string;
  phone2: string;
  pincode: string;
  state: string;
};

type TInstallment = {
  bookingCustomer: string[];
  amt: number | string;
  remainngAmt: number;
  UPIId: '';
  cheuqeNo: '';
  cBankName: '';
  BTAcNo: '';
  BTBankName: '';
  penalty: number | string;
  paymentMethod: 'CHEQUE' | 'CASH' | 'UPI' | 'BANK_TRANSFER';
};

export const getServerSideProps: GetServerSideProps = async (params) => {
  const bookingId = params?.params?.id;
  console.log(bookingId, 'BOOKING ID');
  const res = await httpInstance.get(`booking/get/${bookingId}`);
  const bookingDetails = res.data.result;
  console.log({ res }, 'BOOKING RESPONSE');

  return {
    props: { bookingId, bookingDetails },
  };
};

const BookingInstallment = ({
  bookingId,
  bookingDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { customer, remainAmt } = bookingDetails;

  const customerNames = customer
    ?.map((customer: TCustomerPDFDetail) => customer.name)
    .join(', ');

  const installmentInitialValues: TInstallment = {
    bookingCustomer: customerNames,
    remainngAmt: remainAmt,
    amt: '',
    paymentMethod: 'CASH',
    BTAcNo: '',
    BTBankName: '',
    cBankName: '',
    cheuqeNo: '',
    UPIId: '',
    penalty: 0,
  };

  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          <InstallmentForm
            customerList={installmentInitialValues}
            bookingId={bookingId}
          />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default BookingInstallment;
