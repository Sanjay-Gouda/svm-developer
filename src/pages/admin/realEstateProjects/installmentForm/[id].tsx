import { Card, CardBody } from '@windmill/react-ui';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';

import InstallmentForm from '@/components/Installment/installmentFrom';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

type TPaymentMethod = {
  paymentmethod: 'CHEQUE' | 'CASH' | 'UPI' | 'BANK_TRANSFER';
};

type TCustomerPDFDetail = {
  name: string;
};

type TEditInstallment = {
  amount: number;
  bankPayment: TBankPayment[];
  upiPayment: TUPIPayment[];
  bookingId: string;
  cashPayment: unknown[];
  chequePayment: TChequePayment[];
  installmentId: string;
  installmentNo: number;
  isDelete: boolean;
  paymentType: TPaymentMethod;
  penalty: number;
  customer: TCustomerPDFDetail[];
};

type TInstallment = {
  bookingCustomer: string;
  amt: number;
  UPIId: string;
  cheuqeNo: string;
  cBankName: string;
  BTAcNo: string;
  BTBankName: string;
  penalty: number;
  paymentMethod: TPaymentMethod;
};

type TChequePayment = {
  amount: number;
  bankName: string;
  chequeNumber: string;
};
type TUPIPayment = {
  amount: number;
  upiId: string;
};
type TBankPayment = {
  accountNumber: string;
  bankName: string;
};

export const getServerSideProps: GetServerSideProps = async (params) => {
  const installmentEditId = params?.params?.id;
  const token = params.req.headers.cookie?.split('=')[1];

  httpInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  const res = await httpInstance.get(`installment/get/${installmentEditId}`);
  const installmentDetails = res.data.result;

  return {
    props: { installmentEditId, installmentDetails },
  };
};

const EditInstallment = ({
  installmentEditId,
  installmentDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [installmentRes] = useState<TEditInstallment>(installmentDetails);

  const {
    amount,
    bookingId,
    bankPayment,
    chequePayment,
    upiPayment,
    paymentType,
    penalty,
    customer,
  } = installmentRes;

  const chequePaymentDetail = chequePayment?.map((detail: TChequePayment) => {
    return {
      amount: detail?.amount,
      bankName: detail?.bankName,
      chequeNumber: detail?.chequeNumber,
    };
  });
  const upiPaymentDetail = upiPayment?.map((detail: TUPIPayment) => {
    return {
      amount: detail?.amount,
      upiId: detail?.upiId,
    };
  });
  const bankPaymentDetail = bankPayment?.map((detail: TBankPayment) => {
    return {
      accountNumber: detail?.accountNumber,
      bankName: detail?.bankName,
    };
  });

  const customerNames = customer
    ?.map((customer: TCustomerPDFDetail) => customer.name)
    .join(', ');

  const editInitialvalues: TInstallment = {
    amt: amount,
    bookingCustomer: customerNames,
    paymentMethod: paymentType,
    penalty: penalty,
    BTAcNo: bankPaymentDetail[0]?.accountNumber,
    BTBankName: bankPaymentDetail[0]?.bankName,
    cBankName: chequePaymentDetail[0]?.bankName,
    cheuqeNo: chequePaymentDetail[0]?.chequeNumber,
    UPIId: upiPaymentDetail[0]?.upiId,
  };

  return (
    <Layout>
      <Card className='mx-auto  w-full p-2'>
        <CardBody>
          <InstallmentForm
            customerList={editInitialvalues}
            bookingId={bookingId}
            installmentId={installmentEditId}
          />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default EditInstallment;
