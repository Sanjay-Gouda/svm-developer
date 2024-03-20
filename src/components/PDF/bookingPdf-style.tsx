import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
    // fontFamily: 'Nato Sans Gujarati',
    fontSize: 12,
    position: 'relative',

    lineHeight: 1.5,
    flexDirection: 'column',
    // Set your desired border style
    // boxSizing: 'border-box',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },

  note: {
    width: '90%',
    padding: '6px ',
    margin: '0 auto',
    marginTop: '20px',
    backgroundColor: '#fff',
    border: '2px solid black',
    borderRadius: '10px',
    // boxShadow: '-5px 5px 10px red',
    boxShadow: '10px 10px',
  },

  termsHeading: {
    fontSize: '28px',
    textAlign: 'center',
    textDecoration: 'underline',
  },

  termBox: {
    width: '100%',
    // padding: '10px',
    height: '300px',
    // marginTop: '248px',
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
    margin: '0 auto',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // gap: '10px',
    alignItems: 'center',
    borderRadius: 5,
    border: '2px solid black',
    marginBottom: '20px',
  },

  footer: {
    width: '100%',
    height: '30px',
    backgroundColor: '#17A34B',
    position: 'absolute',
    bottom: 0,
  },

  companyLogo: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    // border: '1px solid red',
    margin: '0 auto',
    alignItems: 'center',

    height: 150,
    backgroundColor: '#FFFF',
    borderRadius: 5,
    border: '2px solid black',
    position: 'relative',
  },

  logo: {
    width: '150px',
    height: '80px',
  },

  companyName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#091762',
    // letterSpacing: 3,
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
    // padding: '0 10px',
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
    marginTop: '30px',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingHeading: {
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: 'heavy',
    color: '#091762',
  },

  invoiceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  parentView: {
    width: '100%',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
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
    width: '100%',
  },
  addressDiv: {
    borderBottom: 1,
    borderColor: 'black',
    width: '100%',
    position: 'relative',
    bottom: 2,
  },
  flexEnd: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'row',
    // gap: '16px',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // border: '1px solid red',
  },

  newHalfDivWrapper: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    columnGap: '8px',
    rowGap: '8px',
    // border: '1px solid red',
    justifyContent: 'space-between',
    // gap: '8px',
  },
});
