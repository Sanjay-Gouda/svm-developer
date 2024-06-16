import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { FC, Fragment } from 'react';

import {
  installmentListProps,
  TinstallMentList,
} from '@/components/PDF/InstallmentHistory/types';

const borderColor = '#333333';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#333333',
    borderBottomWidth: 1,
    height: 24,
    fontStyle: 'bold',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    border: '1px solid black',
    borderTop: 'none',
  },
  cell: {
    width: '25%',
    borderRightColor: borderColor,
    // borderRightWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333333',
  },
});

const InvoiceTableRow: FC<installmentListProps> = ({ installmentList }) => {
  const rows = installmentList.map((data: TinstallMentList) => (
    <View style={styles.row} key={data?.installmentId}>
      <Text style={styles.cell}>{data?.installmentNo}</Text>
      <Text style={styles.cell}>
        {data?.createdAt?.split('T')[0]?.split('-')?.reverse()?.join('-')}
      </Text>
      <Text style={styles.cell}>{data?.amount}</Text>
      <Text style={styles.cell}>{data?.paymentType}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
