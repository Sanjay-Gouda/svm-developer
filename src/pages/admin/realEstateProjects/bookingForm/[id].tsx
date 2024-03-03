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
  console.log(EditId, 'details');

  const {
    bookingId,
    projectId,
    address1,
    address2,
    pincode,
    area,
    totalAmt,
    paidAmt,
    remainAmt,
    installmentAmt,
    paymentType,
    paymentStatus,
    customerId,
    adminAccountId,
    installmentCount,
    projectName,
    customerName,
    adminBankName,
    bankName,
    chequeNumber,
    upiId,
    accountNumber,
    paymentId,
  } = bookingDetails;

  const editCustomer = {
    id: customerId,
    name: customerName,
  };
  const editProject = {
    id: projectId,
    name: projectName,
  };

  const editBankAccount = {
    id: +adminAccountId,
    name: adminBankName,
  };

  const bookingEditInitialValues = {
    customerName: editCustomer,
    projectName: editProject,
    bankAccount: editBankAccount,
    area: area,
    landmark: address2,
    pincode: pincode,
    state: 'state',
    city: 'city',
    address: address1,
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
  };

  return (
    <>
      <Layout>
        <Card>
          <CardBody>
            {/* <BookingForm
              editInitialValues={bookingEditInitialValues}
              editId={EditId}
            /> */}

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
