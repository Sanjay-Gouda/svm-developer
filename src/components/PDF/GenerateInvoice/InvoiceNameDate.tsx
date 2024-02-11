/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  invoiceContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const InvoiceNameDate = ({ receiptNo, date }) => {
  return (
    <>
      <View style={styles.invoiceContainer}>
        <Text>Receipt No:{receiptNo}</Text>
        <Text>Date:{date}</Text>
      </View>
    </>
  );
};

export default InvoiceNameDate;
