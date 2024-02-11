/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

import BillTo from './BillTo';
import InvoiceFooter from './InvoiceFooter';
import InvoiceNameDate from './InvoiceNameDate';
import InovieProjectDes from './InvoiceProjectDes';
import InvoiceTermCond from './InvoiceTermCond';
import InvoiceTitle from './InvoiceTitle';
// import logo from '../../assets/logo.png';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    lineHeight: 1.5,
    flexDirection: 'column',
  },

  logo: {
    width: 84,
    height: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const InvoiceData = {
  firstText: 'Received with thanks from shree/smt.',
  address: 'Address',
  sumofRupee: 'Sum of Rupees',
  cashCheque: 'By Cash/Cheques No.',
  type: 'For Booking/ Plat/Flat/Shop/Row House No.',
};

const Reciept = () => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* <Image style={styles.logo} src={logo} /> */}
        <InvoiceTitle title='SVM Developer' />
        <InvoiceNameDate receiptNo='3620' date='31/09/2023' />
        <InovieProjectDes />
        <BillTo invoice={InvoiceData} />
        <InvoiceTermCond />
        <InvoiceFooter />
      </Page>
    </Document>
  );
};

export default Reciept;
