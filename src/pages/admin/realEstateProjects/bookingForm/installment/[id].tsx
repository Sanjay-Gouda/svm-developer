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
  amt: number;
  UPIId: '';
  cheuqeNo: '';
  cBankName: '';
  BTAcNo: '';
  BTBankName: '';
  penalty: number;
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
  console.log(bookingDetails, 'DETAILS');

  const { customer } = bookingDetails;

  const customerNames = customer
    ?.map((customer: TCustomerPDFDetail) => customer.name)
    .join(', ');

  console.log(customerNames);

  const installmentInitialValues: TInstallment = {
    bookingCustomer: customerNames,
    amt: 0,
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
