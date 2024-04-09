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

type TReceipt = {
  customer: TCustomerPDFDetail;

  amount: number;
  paymentType: 'UPI' | 'BANK_TRANSFER' | 'CASH';
  plotNo: number;
  upiPayment: TupiPayment;
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
}: TReceipt) => {
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
            }}
          >
            {customer?.map((customer: TCustomerPDFDetail, ind: string) => (
              <Text key={ind}>{customer?.name}</Text>
            ))}
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
            <Text style={{ marginLeft: '20px' }}>{numberToWords(12100)}</Text>
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
            <Text style={{ marginLeft: '20px' }}>
              {paymentType?.toLowerCase()}
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
                <Text style={{ marginLeft: '20px' }}>hello</Text>
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
