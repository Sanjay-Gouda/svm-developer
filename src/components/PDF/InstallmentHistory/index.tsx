import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  View,
} from '@react-pdf/renderer';
import React, { FC } from 'react';

import InvoiceHeader from '@/components/PDF/GenerateInvoice/invoiceHeader';
import InvoiceTableHeader from '@/components/PDF/InstallmentHistory/tableHeader';
import InvoiceTableRow from '@/components/PDF/InstallmentHistory/tableRow';
import { installmentListProps } from '@/components/PDF/InstallmentHistory/types';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
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
});

const InstallmentHistoryPDF: FC<installmentListProps> = ({
  installmentList,
}) => {
  return (
    <>
      <PDFViewer style={{ width: '100%', height: '100vh' }} showToolbar={true}>
        <Document>
          <Page size='A4' style={styles.page}>
            <InvoiceHeader heading='INSTALLMENT HISTORY' />
            <View style={styles.tableContainer}>
              <InvoiceTableHeader />
              <InvoiceTableRow installmentList={installmentList} />
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default InstallmentHistoryPDF;
