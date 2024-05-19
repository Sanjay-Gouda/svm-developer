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
  console.log({ bookingDetails });
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
    project,
    upiId,
    accountNumber,
    paymentId,
    installmentDate,
    dastavejAmt,
    customer,
    reminderDate,
  } = bookingDetails;

  console.log(bookingDetails, 'PROJECT NAME');

  const editcustomer = customer.map((customer) => {
    return {
      name: customer.name,
      id: customer.customerId,
    };
  });

  const editProject = {
    id: projectId,
    name: project?.name,
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
    emiDate: installmentDate,
    dastavejAmt: dastavejAmt,
    reminderDate: reminderDate,

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
