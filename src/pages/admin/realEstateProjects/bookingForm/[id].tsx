import { Card, CardBody } from '@windmill/react-ui';
import { useSelector } from 'react-redux';

import BookingForm from '@/components/Booking/bookingForm';
import Layout from '@/containers/Layout';

export async function getServerSideProps(params: any) {
  const EditId = params?.params.id;

  return {
    props: { EditId },
  };
}

type bookingFormProps = {
  customerName: {};
  projectName: string;
  bankAccount: string;
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
}[];

export const EditBookingDetails = ({ EditId }) => {
  const bookings = useSelector((state) => state.bookings.bookingList);

  const getBookingFormValues = bookings?.filter(
    (booking) => booking?.bookingId === EditId
  );

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
  } = getBookingFormValues[0];

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
  };

  return (
    <>
      <Layout>
        <Card>
          <CardBody>
            <BookingForm
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
