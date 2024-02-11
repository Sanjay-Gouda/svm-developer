/* eslint-disable react/prop-types */
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    maxWidth: "100%",
  },
  line: {
    borderBottom: 1,
    borderColor: "black",
  },
});
const BillTo = ({ invoice }) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          <Text>{invoice.firstText}</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: "black",
              width: "64%",
              position: "relative",
              bottom: 2,
            }}
          ></View>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          <Text>{invoice.address}</Text>
          <View
            s
            style={{
              borderBottom: 1,
              borderColor: "black",
              width: "95%",
              position: "relative",
              bottom: 2,
            }}
          ></View>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            // justifyContent: "space-around",
          }}
        >
          <Text>{invoice.sumofRupee}</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: "black",
              width: "30%",
              position: "relative",
              bottom: 3,
            }}
          ></View>
          <Text>in words</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: "black",
              width: "50%",
              position: "relative",
              bottom: 3,
            }}
          ></View>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          <Text>{invoice.cashCheque}</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: "black",
              width: "20%",
              position: "relative",
              bottom: 3,
            }}
          ></View>
          <Text>Date</Text>
          <View
            s
            style={{
              borderBottom: 1,
              borderColor: "black",
              width: "30%",
              position: "relative",
              bottom: 3,
            }}
          ></View>
          <Text>Bank</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: "black",
              width: "20%",
              position: "relative",
              bottom: 3,
            }}
          ></View>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          <Text>{invoice.type}</Text>
          <View
            style={{
              borderBottom: 1,
              borderColor: "black",
              width: "56%",
              position: "relative",
              bottom: 2,
            }}
          ></View>
        </View>
      </View>
    </>
  );
};

export default BillTo;
