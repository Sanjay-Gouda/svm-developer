/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
// import google from "../../assets/google.png";
// import facebook from "../../assets/facebook.png";
// import instagram from "../../assets/instagram.png";
// import twitter from "../../assets/twitter.png";
// import linkedin from "../../assets/linkedin.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    // margin: 10,
    padding: 10,
    position: 'relative',
  },
  box: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFFF',
    borderRadius: 5,
    position: 'relative',
    border: '2px solid black',
  },
  text: {
    fontSize: 12,
    textAlign: 'left',
    margin: '10px 10px 10px 10px',
    textDecoration: 'underline',
    fontWeight: 400,
  },
  logo: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  projectLogo: {
    width: '150px',
    height: '80px',
  },
  line: {
    borderTop: 1,
    borderColor: 'black',
    width: '100%',
    position: 'absolute',
    top: '75%',
  },

  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

const InovieProjectDes = ({ logo, address }) => {
  return (
    <View style={styles.section}>
      <View style={styles.box}>
        <Text style={styles.text}>Project:-</Text>

        <View style={styles.flexCenter}>
          <Image
            style={styles.projectLogo}
            src={
              logo ||
              'https://svmdevelopers.in/static/media/svm-new-logo.7feceb34130b3cfbc944.png'
            }
            alt='Logo'
          />
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>
            Address : {address || null}
          </Text>
        </View>
        <View style={styles.line}></View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            paddingRight: 20,
          }}
        >
          <Text
            style={{
              fontSize: 12,
            }}
          >
            Follow Us:
          </Text>
          <Image style={styles.logo} src='/images/google.png' alt='google' />
          <Image
            style={styles.logo}
            src='/images/facebook.png'
            alt='facebook'
          />
          <Image style={styles.logo} src='/images/instagram.png' alt='insta' />
          <Image style={styles.logo} src='/images/twitter.png' alt='X' />
          <Image
            style={styles.logo}
            src='/images/linkedin.png'
            alt='linkedin'
          />
        </View>
      </View>
    </View>
  );
};

export default InovieProjectDes;
