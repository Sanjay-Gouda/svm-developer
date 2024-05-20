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
    boxSizing: 'border-box',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },

  note: {
    width: '90%',
    padding: '6px ',
    margin: '0 auto',
    marginTop: '20px',
    backgroundColor: '#000',
    border: '2px solid black',
    borderRadius: '10px',
    boxShadow: ' -10px 10px 5px -5px rgba(0, 0, 0, 0.5)',
    // boxShadow: '-5px 5px 10px red',
    // boxShadow: '10px 10px',
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
    fontSize: '12px',
    fontWeight: 'medium',
  },

  headingText: {
    fontSize: '12px',
    fontWeight: 'extrabold',
  },
  valueText: {
    fontSize: '12px',
    fontWeight: 'medium',
    marginLeft: '10px',
    textTransform: 'capitalize',
  },
  marriedText: {
    fontSize: '12px',
    fontWeight: 'medium',
    marginLeft: '16px',
  },

  header: {
    width: '100%',
    height: '80px',
    margin: '0 auto',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // gap: '10px',
    alignItems: 'flex-end',
    // borderRadius: 5,
    borderBottom: '2px dashed black',
    marginBottom: '20px',
  },

  footer: {
    width: '100%',
    height: '30px',
    backgroundColor: '#17A34B',
    position: 'absolute',
    bottom: 0,
  },

  projectDetailsWrapper: {
    margin: '0 auto',
    padding: '8px 0px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // border: '1px solid black',
    // height: 150,
  },

  detailsWrapper: {
    width: '70%',
    // border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  customerDetailWrapper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  },
  LogoWrapper: {
    width: '30%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  companyLogo: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    // border: '1px solid red',
    margin: '0 auto',
    alignItems: 'center',
    padding: '0 8px',

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
  formHeading: {
    fontSize: '14px',
    fontWeight: 'light',
    color: '#091762',
    // marginBottom: '10px',
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
    justifyContent: 'center',
    gap: '8px',
    // padding: '0 10px',
    // marginTop: "-50px",
  },

  passPhotoContainer: {
    width: '100px',
    height: '120px',
    border: '1px solid black',
    // marginLeft: '80%',
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

  detailFullWidthField: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  fullWidthField: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: '18px',
  },
  fullWidthFieldName: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // marginTop: '30px',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headeingFlexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px dashed black',
  },

  topWave: {
    position: 'absolute',
    top: 0,
    width: '120%',
    overflow: 'hidden',
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    width: '120%',
    overflow: 'hidden',
  },

  topWaveImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  bookingHeading: {
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: 'heavy',
    color: '#091762',
    marginTop: '20px',
  },
  projectLogoHeading: {
    fontSize: '14px',
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
    // marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  documentParentView: {
    width: '100%',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',

    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  documentWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px',
  },

  documentContainer: {
    width: '300px',
    height: '150px',
    border: '1px solid black',
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
    display: 'flex',
    flexDirection: 'row',
  },

  addressDiv: {
    borderBottom: 1,
    borderColor: 'black',
    width: '100%',
    position: 'relative',
    bottom: 2,
  },
  flexEnd: {
    marginBottom: '18px',
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

  termPage: {
    width: '100%',
    margin: '0 auto',
    position: 'relative',
  },
});
