/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { numberToWords } from '@/hooks/numberToWord';

type TCustomerPDFDetail = {
  address: string;
  city: string;
  customerId: string;
  name: string;
  phone1: string;
  phone2: string;
  pincode: string;
  state: string;
};

type TupiPayment = {
  upiId: string;
}[];
type chequePayment = {
  bankName: string;
}[];

type TReceipt = {
  customer: TCustomerPDFDetail;
  amount: number;
  paymentType: 'UPI' | 'BANK_TRANSFER' | 'CASH' | 'CHEQUE';
  plotNo: number;
  upiPayment: TupiPayment;
  chequePayment: chequePayment;
  bankPayment: chequePayment;
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    maxWidth: '100%',
  },
  line: {
    borderBottom: 1,
    borderColor: 'black',
  },
  paymentType: {
    borderBottom: 1,
    borderColor: 'black',
    width: '60%',
    position: 'relative',
    bottom: 3,
  },
});

const invoice = {
  firstText: 'Received with thanks from shree/smt.',
  address: 'Address',
  sumofRupee: 'Sum of Rupees',
  cashCheque: 'Payment type',
  type: 'For Booking/ Plat/Flat/Shop/Row House No.',
};
const BillTo = ({
  customer,
  upiPayment,
  amount,
  paymentType,
  plotNo,
  chequePayment,
  bankPayment,
}: TReceipt) => {
  // console.log(upiPayment, chequePayment, 'UPI PAYMENT');
  return (
    <>
      <View style={styles.headerContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
          }}
        >
          <Text>{invoice.firstText}</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: 'black',
              width: '64%',
              position: 'relative',
              bottom: 2,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Text>
              {customer?.map((customer) => customer?.name).join(', ')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Text>{invoice.sumofRupee}</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: 'black',
              width: '30%',
            }}
          >
            <Text style={{ marginLeft: '20px' }}>{amount}</Text>
          </View>
          <Text>in words</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: 'black',
              width: '50%',
              position: 'relative',
              bottom: 3,
            }}
          >
            <Text style={{ marginLeft: '20px', textTransform: 'capitalize' }}>
              {numberToWords(amount)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
          }}
        >
          <Text>{invoice.cashCheque}</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: 'black',
              width: '40%',
              position: 'relative',
              bottom: 3,
            }}
          >
            <Text style={{ marginLeft: '20px', textTransform: 'capitalize' }}>
              {paymentType}
            </Text>
          </View>

          {paymentType === 'UPI' ? (
            <>
              <Text>UPI Id</Text>
              <View style={styles.paymentType}>
                {upiPayment?.map((id) => (
                  <Text key={id.upiId} style={{ marginLeft: '20px' }}>
                    {id?.upiId}
                  </Text>
                ))}
              </View>
            </>
          ) : paymentType === 'BANK_TRANSFER' ? (
            <>
              <Text>Bank Name</Text>
              <View style={styles.paymentType}>
                {bankPayment?.map((dt, ind) => (
                  <Text
                    key={ind}
                    style={{ marginLeft: '20px', textTransform: 'capitalize' }}
                  >
                    {dt?.bankName}
                  </Text>
                ))}
              </View>
            </>
          ) : paymentType === 'CHEQUE' ? (
            <>
              <Text>Bank Name</Text>
              <View style={styles.paymentType}>
                {chequePayment?.map((dt, ind) => (
                  <Text
                    key={ind}
                    style={{ marginLeft: '20px', textTransform: 'capitalize' }}
                  >
                    {dt?.bankName}
                  </Text>
                ))}
              </View>
            </>
          ) : (
            <>
              <Text>Cash </Text>
              <View style={styles.paymentType}>
                <Text style={{ marginLeft: '20px' }}>Cash Deposite</Text>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
          }}
        >
          <Text>{invoice.type}</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: 'black',
              width: '56%',
              position: 'relative',
              bottom: 2,
            }}
          >
            <Text style={{ marginLeft: '20px' }}>{plotNo}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default BillTo;
