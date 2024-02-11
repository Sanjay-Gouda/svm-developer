/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { StyleSheet, Text, View } from '@react-pdf/renderer';
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
  line: {
    borderTop: 1,
    borderColor: 'black',
    width: '100%',
    position: 'absolute',
    top: '75%',
  },
});

const InovieProjectDes = () => {
  return (
    <View style={styles.section}>
      <View style={styles.box}>
        <Text style={styles.text}>Project:-</Text>
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
          {/* <Image style={styles.logo} src={google} />
          <Image style={styles.logo} src={facebook} />
          <Image style={styles.logo} src={instagram} />
          <Image style={styles.logo} src={twitter} />
          <Image style={styles.logo} src={linkedin} /> */}
        </View>
      </View>
    </View>
  );
};

export default InovieProjectDes;

{
  /* <Svg height="210" width="500">
          <Line
            x1="0"
            y1="0"
            x2="91%"
            y2="0 "
            strokeWidth={2}
            stroke="rgb(0,0,0)"
            style={styles.line}
          />
        </Svg> */
}

// const styles = StyleSheet.create({
//   reactangle: {
//     marginTop: 10,
//     marginLeft: "auto",
//     marginRight: "auto",
//     width: 400,
//     height: 150,
//     backgroundColor: "lightgray",
//     borderRadius: 20,
//     boxShadow: "1px 2px 9px #F4AAB9",
//   },
// });
