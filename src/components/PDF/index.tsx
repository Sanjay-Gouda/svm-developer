import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import React from 'react';

export const Booking = ({ details }: any) => {
  console.log(details);

  const {
    customerName,
    projectName,
    totalAmt,
    paidAmt,
    installmentAmt,
    area,
    address1,
  } = details;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
      fontSize: 12,
      position: 'relative',
      // paddingTop: 30,
      // paddingLeft: 50,
      // paddingRight: 50,
      lineHeight: 1.5,
      flexDirection: 'column',
      // Set your desired border style
      boxSizing: 'border-box',
    },
    ml: {
      marginLeft: '20px',
    },

    headingText: {
      fontSize: '12px',
      fontWeight: 'extrabold',
    },

    header: {
      width: '100%',
      height: '80px',
      // backgroundColor: "#F49614",
      backgroundColor: '#17A34B',
      position: 'absolute',
      top: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: '10px',
      // margin: "60px 0",
      alignItems: 'center',
    },

    footer: {
      width: '100%',
      height: '30px',
      // backgroundColor: "#F49614",
      backgroundColor: '#17A34B',
      position: 'absolute',
      bottom: 0,
    },

    companyLogo: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
      gap: '10px',
      marginTop: '100px',
      alignItems: 'center',
    },

    logo: {
      width: '150px',
      height: '80px',
    },

    companyName: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
    },

    titleWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',

      marginTop: '-50px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'extrabold',
      color: '#F49614',
    },

    passPhotoWrapper: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '0 10px',
      // marginTop: "-50px",
    },

    passPhotoContainer: {
      width: '100px',
      height: '120px',
      border: '1px solid black',
      marginLeft: '80%',
    },

    date: {
      fontSize: '12px',
    },

    detailTitle: {
      borderBottom: '1px solid gray',
    },

    headerContainer: {
      // marginTop: "30%",
      maxWidth: '100%',
    },

    fullWidthField: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bookingHeading: {
      fontSize: '18px',
      color: 'white',
      textAlign: 'center',
      fontWeight: 'heavy',
    },

    parentView: {
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      lineHeight: 1.5,
    },

    secondRowWrapper: {
      marginTop: '30px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      // border: "2px solid red",
    },
    halfDiv: {
      borderBottom: 1,
      borderColor: 'black',
      width: '40%',
      position: 'relative',
      bottom: 2,
    },
    addressDiv: {
      borderBottom: 1,
      borderColor: 'black',
      width: '86%',
      position: 'relative',
      bottom: 2,
    },
    flexEnd: {
      marginTop: '30px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
  });
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image
              style={styles.logo}
              // src='data:image/jpeg;base64,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'
              src='https://svmdevelopers.in/static/media/svm-new-logo.7feceb34130b3cfbc944.png'
              // alt='Logo'
            />
          </View>
          <View style={styles.flexCenter}>
            <Text style={styles.companyName}>SVM BUILDERS & DEVELOPER</Text>
            <Text style={styles.bookingHeading}>BOOKING FORM</Text>
          </View>
        </View>
        <View style={styles.footer}></View>

        <View style={styles.companyLogo}>
          <View style={styles.passPhotoWrapper}>
            <View style={styles.passPhotoContainer}></View>
          </View>
        </View>

        <View style={styles.parentView}>
          <View style={styles.fullWidthField}>
            <Text style={styles.headingText}>Project Name:</Text>
            <View
              style={{
                borderBottom: 1,
                borderColor: 'black',
                width: '80%',
              }}
            >
              <Text style={styles.ml}> {projectName}</Text>
            </View>
          </View>

          <View style={styles.secondRowWrapper}>
            <Text style={styles.headingText}>Name:</Text>
            <View style={styles.halfDiv}>
              <Text style={styles.ml}>{customerName}</Text>
            </View>

            <Text style={styles.headingText}>Mobile:</Text>
            <View style={styles.halfDiv}></View>
          </View>

          <View style={styles.secondRowWrapper}>
            <Text style={styles.headingText}>Address:</Text>
            <View style={styles.addressDiv}>
              <Text style={styles.ml}>{address1}</Text>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <Text style={styles.headingText}>Description:</Text>
            <View style={styles.halfDiv}></View>

            <Text style={styles.headingText}>Area:</Text>
            <View style={styles.halfDiv}>
              <Text style={styles.ml}>{area} sq.ft</Text>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <Text style={styles.headingText}>House/Plot No:</Text>
            <View
              style={{
                borderBottom: 1,
                borderColor: 'black',
                width: '82%',
                position: 'relative',
                bottom: 2,
              }}
            ></View>
          </View>
          <View style={styles.flexEnd}>
            <Text style={styles.headingText}>Total Amount:</Text>
            <View
              style={{
                borderBottom: 1,
                borderColor: 'black',
                width: '82%',
                position: 'relative',
                bottom: 2,
              }}
            >
              <Text style={styles.ml}>{totalAmt}</Text>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <Text style={styles.headingText}>Down Payment:</Text>
            <View style={styles.halfDiv}>
              <Text style={styles.ml}>{paidAmt}</Text>
            </View>

            <Text style={styles.headingText}>EMI:</Text>
            <View style={styles.halfDiv}>
              <Text style={styles.ml}>{installmentAmt}</Text>
            </View>
          </View>
          <View style={styles.flexEnd}>
            <Text style={styles.headingText}>Owner's Sign:</Text>
            <View style={styles.halfDiv}></View>

            <Text style={styles.headingText}>Customer's Sign:</Text>
            <View style={styles.halfDiv}></View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
