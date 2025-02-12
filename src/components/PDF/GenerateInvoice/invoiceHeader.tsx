/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { FC } from 'react';

const styles = StyleSheet.create({
  invoiceContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: '80px',
    margin: '0 auto',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // gap: '10px',
    alignItems: 'flex-end',
    borderRadius: 5,
    borderBottom: '2px dashed black',
    marginBottom: '20px',
  },
  logo: {
    width: '150px',
    height: '80px',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#091762',
    // letterSpacing: 3,
  },
  bookingHeading: {
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: 'heavy',
    color: '#091762',
  },
});

type THeaderProps = {
  heading: string;
};

const InvoiceHeader: FC<THeaderProps> = ({ heading }) => {
  return (
    <>
      <View>
        <Text style={styles.bookingHeading}>{heading}</Text>
      </View>
      <View style={styles.header}>
        <View>
          <Image
            style={styles.logo}
            src='/images/SVM-Developers-Logo.png'
            alt='Logo'
          />
        </View>
        <View style={styles.flexCenter}>
          <Text style={styles.companyName}>SVM BUILDERS & DEVELOPER</Text>
        </View>
      </View>
    </>
  );
};

export default InvoiceHeader;
