import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import React from 'react';

import InvoiceHeader from '@/components/PDF/GenerateInvoice/invoiceHeader';

import BillTo from './BillTo';
import InvoiceFooter from './InvoiceFooter';
import InvoiceNameDate from './InvoiceNameDate';
import InovieProjectDes from './InvoiceProjectDes';
import InvoiceTermCond from './InvoiceTermCond';
// import logo from '../../assets/logo.png';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
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

const Reciept = ({ installmentData }: any) => {
  const {
    amount,
    plotNo,
    projectLogo,
    createdAt,
    customer,
    paymentType,
    installmentNo,
    project,
    chequePayment,
    upiPayment,

    penalty,
    bankPayment,
  } = installmentData;
  console.log(installmentData, 'DATA');
  const reciptdate = createdAt?.split('T')[0]?.split('-')?.reverse()?.join('-');

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }} showToolbar={true}>
      <Document>
        <Page size='A4' style={styles.page}>
          <InvoiceHeader heading='RECEIPT' />
          <InvoiceNameDate receiptNo={installmentNo} date={reciptdate} />
          <InovieProjectDes
            logo={project?.logo}
            address={project?.address2 || '_ADDRESS_'}
          />
          <BillTo
            customer={customer}
            amount={amount}
            paymentType={paymentType}
            plotNo={plotNo}
            upiPayment={upiPayment}
            chequePayment={chequePayment}
            bankPayment={bankPayment}
          />
          <InvoiceTermCond />
          <InvoiceFooter remarks={penalty} />
          <View
            style={{
              marginTop: '30px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              Thank you, Visit Again
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Reciept;
