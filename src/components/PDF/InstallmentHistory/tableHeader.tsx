import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

const borderColor = '#333333';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#333333',
    backgroundColor: '#333333',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
    width: '100%',
  },
  cell: {
    width: '25%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    color: '#ffffff',
  },
  // date: {
  //   width: '25%',
  //   borderRightColor: borderColor,
  //   borderRightWidth: 1,
  //   display:'flex',
  //   justifyContent: 'center'
  // },
  // amount: {
  //   width: '25%',
  //   borderRightColor: borderColor,
  //   borderRightWidth: 1,
  //   display:'flex',
  //   justifyContent: 'center'
  // },
  // status: {
  //   width: '25%',
  //   display:'flex',
  //   justifyContent: 'center'
  // },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.cell}>Installment No</Text>
    <Text style={styles.cell}>Date</Text>
    <Text style={styles.cell}>Amount</Text>
    <Text style={styles.cell}>Payment Mode</Text>
  </View>
);

export default InvoiceTableHeader;
