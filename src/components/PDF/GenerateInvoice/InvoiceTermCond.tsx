/* eslint-disable no-unused-vars */
import { Text, View } from "@react-pdf/renderer";
import React from "react";

const InvoiceTermCond = () => {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text>TERMS & CONDITION </Text>
      <Text>1) Receipt is valid on realization of Cheque. </Text>
      <Text>
        2) Cancellation charge will be 10 of total Booking price & Taxes.
      </Text>
    </View>
  );
};

export default InvoiceTermCond;
