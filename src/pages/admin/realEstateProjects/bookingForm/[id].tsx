import { Card, CardBody } from '@windmill/react-ui';

import TestBooking from '@/components/TestBooking';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

export async function getServerSideProps(params: any) {
  const EditId = params?.params.id;
  const res = await httpInstance.get(`booking/get/${EditId}`);
  const bookingDetails = res.data.result;
  return {
    props: { EditId, bookingDetails },
  };
}

export const EditBookingDetails = ({ EditId, bookingDetails }) => {
  const {
    projectId,
    plotNo,
    area,
    totalAmt,
    paidAmt,
    remainAmt,
    installmentAmt,
    paymentType,
    paymentStatus,
    adminAccountId,
    installmentCount,
    projectName,
    adminBankName,
    bankName,
    chequeNumber,
    upiId,
    accountNumber,
    paymentId,

    customer,
  } = bookingDetails;

  const editcustomer = customer.map((customer) => {
    return {
      name: customer.name,
      id: customer.customerId,
    };
  });

  // const editCustomer = [
  //   { id: 1, name: 'Wade Cooper' },
  //   { id: 2, name: 'Arlene Mccoy' },
  //   { id: 3, name: 'Devon Webb' },
  //   { id: 4, name: 'Tom Cook' },
  //   { id: 5, name: 'Tanya Fox' },
  //   { id: 6, name: 'Hellen Schmidt' },
  // ];

  // const editCustomer = [
  //   {
  //     id: '0daba17d-8d3c-480c-b191-0898b0a376f2',
  //     name: 'Sahil',
  //   },
  // ];
  const editProject = {
    id: projectId,
    name: projectName,
  };

  const editBankAccount = {
    id: +adminAccountId,
    name: adminBankName,
  };

  const bookingEditInitialValues = {
    customerName: editcustomer,
    projectName: editProject,
    bankAccount: editBankAccount,
    area: area,
    plotNo: plotNo,
    totalAmt: totalAmt,
    paidAmt: paidAmt,
    paymentMethod: paymentType,
    remainingAmt: remainAmt,
    noOfInstallment: installmentCount,
    amtPerInstallment: installmentAmt,
    paymentStatus: paymentStatus,
    UPIId: upiId,
    cheuqeNo: chequeNumber,
    cBankName: bankName,
    BTAcNo: accountNumber,
    BTBankName: bankName,
    paymentId: paymentId,
    // customerName: customer,
  };

  return (
    <>
      <Layout>
        <Card>
          <CardBody>
            <TestBooking
              editInitialValues={bookingEditInitialValues}
              editId={EditId}
            />
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default EditBookingDetails;
