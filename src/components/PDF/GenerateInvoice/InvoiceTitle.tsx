/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 24,
  },
  reportTitle: {
    color: "#3778C2",
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

const InvoiceTitle = ({ title }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
};

export default InvoiceTitle;
