/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from '@react-pdf/renderer';

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
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    maxWidth: '100%',
  },
  line: {
    borderBottom: 1,
    borderColor: 'black',
  },
});

const invoice = {
  firstText: 'Received with thanks from shree/smt.',
  address: 'Address',
  sumofRupee: 'Sum of Rupees',
  cashCheque: 'Payment type',
  type: 'For Booking/ Plat/Flat/Shop/Row House No.',
};
const BillTo = ({ customer, amount, paymentType, plotNo }) => {
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

      {/* <View style={styles.headerContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
          }}
        >
          <Text>{invoice.address}</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: 'black',
              width: '95%',
              position: 'relative',
              bottom: 2,
            }}
          ></View>
        </View>
      </View> */}

      <View style={styles.headerContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            // justifyContent: "space-around",
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
          ></View>
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
              width: '20%',
              position: 'relative',
              bottom: 3,
            }}
          >
            <Text>{paymentType?.toLowerCase()}</Text>
          </View>
          <Text>Date</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: 'black',
              width: '30%',
              position: 'relative',
              bottom: 3,
            }}
          ></View>
          <Text>Bank</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: 'black',
              width: '20%',
              position: 'relative',
              bottom: 3,
            }}
          ></View>
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
