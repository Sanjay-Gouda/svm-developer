import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import React from 'react';

const termsAndCondition = [
  {
    id: 1,
    term: 'સરકાર સ્થાનિક સત્તાવાળાઓ દ્વારા વસુલવામાં આવેલા કોઈ પણ વધારવાના ચાર્જસ, યોજના ના પૂર્ણ થવાના પેહલા અથવા પૂર્ણ થયા બાદ, ખરીદારે ચૂકવવાના રહશે.',
  },
  {
    id: 2,
    term: 'ડેવેલોપર્સ આવશ્યકતા મુજબ યાજનાઓ અને સ્પષ્ટિકરણમા સુધારો કરવાના અધિકાર અનામત રાખે છે.',
  },
  {
    id: 3,
    term: 'કાનૂની દસ્તાવેજો, વધારવાની સ્ટેમ્પ ડ્યૂટી, કોર્પોરેશન ટેક્સસ અને સોસાયટી જાણવણી ખર્ચ તથા અન્ય કોઈ પણ પ્રકાર નો ખર્ચ ખરીદારને અલગ થી ચુકવાના રહશે',
  },
  {
    id: 4,
    term: 'ડેવેલપર્સ અને ખરીદદાર વચ્ચે ના કોઈ પણ વિવાદમાં, ડેવેલપર્સ નો લીધેલો નિર્ણય ,છેલ્લો નિર્ણય માન્ય રાખવામાં આવશે, જે ખરીદાર ને મંજૂર રાખી અને અનુસરવાની રહશે.',
  },
  {
    id: 5,
    term: 'ઈ.એમ.આઈ.(હપ્તા ) ની ચુકવણીમાં જો ૨ મહિના થી વધુ કોઈ સમસ્યા ઉદ્યભવે અથવા ચુકાવામાં મોડો પડે તો ડેવેલપર્સ પ્લોટ ની બુકીંગ રદ્દ કરી શકે છે, તથા રદ્દ કરેલો પ્લોટ નવા ખરીદાર (ગ્રાહક ) ને વેચવાનો અધિકાર અનામત ધરાવે છે.અને તે પ્લોટ પ્રતિ જુના ખરીદાર (ગ્રાહક) કોઈ પણ જાતનો દાવો કે વિવાદ કરવાનો અધિકાર રહેશે નહિ. અને ખાસ નોંધ લેવી .',
  },
  {
    id: 6,
    term: 'બોનસ ઇનામો સમયસર અને વગર ચુકે દર મહિને ઈ.એમ.આઈ (હપ્તો) ભરનાર ખરીદાર (ગ્રાહક) ને જ આપવામાં આવશે.અને ઇનામો નો વિતરણ ૪૦૦૦ પ્લોટ નું વેચાણ થયા બાદ કરવામાં આવશે.',
  },
  {
    id: 7,
    term: 'અગર કોઈ ખરીદાર(ગ્રાહક) હપ્તો ના ભરવાનો હોય અને પોતાનો પ્લોટ કોઈ બીજા ખરીદાર (ગ્રાહક) ને ટ્રાન્સફર કરવા માંગતો હોય તો તેને રૂપિયા - ૫૧૦૦/- તથા ટેક્સસ નો ચાર્જ અલગ થી ભરવાનો રહશે.',
  },
  {
    id: 8,
    term: 'ખરીદાર (ગ્રાહક) ના કોઈ પણ પ્લોટ રદ્દ કરવા પર ખરીદાર ને પ્લોટની કુલ રકમના ૧૦% અથવા રૂ.૧૪૦૦૦ (જે વધારે હોય) તથા ટેક્સસ (પ્લોટ દીઠ ) કપાત કરવામાં આવશે અને પ્રોજેક્ટ સ્કીમ પૂર્ણ થયા બાદ,જે તે હપ્તા માં ખરીદારે ભર્યા હશે તેટલા જ હપ્તા માં પરત કરવામાં આવશે.અને પરત કરેલી રકમ પ્લોટ ખરીદાર (ગ્રાહક) ના બેંક એકાઉન્ટ માં આપવામાં આવશે, રોકડ નો કોઈ પણ વહેવાર કરવામાં આવશે નહિ,એની ખાસ નોંધ લેવી.',
  },
  {
    id: 9,
    term: 'ખરીદાર (ગ્રાહક) ને ખાસ નોંધ લેવી કે કોઈ પણ પ્લોટ ખરીદ કારિયાના "૬" મહિના બાદ રદ્દ કરવામાં આવશે નહિ અને આવા સંજોગો માં ખરીદારે (ગ્રાહકે) પ્લોટ લેવો ફરજીયાત થાય જશે અથવા પોતાનો પ્લોટ કોઈ બીજા (નવા) ગ્રાહક ને ટ્રાન્સફર કરવાનો રહેશે(બીજો નવો ગ્રાહક જુના ખરીદારે પોતેય લાવો પડશે).',
  },
  {
    id: 10,
    term: 'કોઈ પણ ગ્રાહક ના પ્લોટ નું પૂરું પેમેન્ટ અગર પ્રોજેક્ટ ના સમય પુરા થાય પછી કરે છે તો ગ્રાહકે રૂ.૧૦૦૦/- (પ્લોટ દીઠ ) દર મહિને અલગ થી ચુકવાના રહેશે.',
  },
];

Font.register({
  family: 'Nato Sans Gujarati',
  src: '/fonts/NotoSansGujarati_Condensed-Light.ttf',
  format: 'truetype',
});

export const Booking = ({ details }: any) => {
  const {
    customerName,
    projectName,
    totalAmt,
    paidAmt,
    installmentAmt,
    area,
    address1,
    phone,

    customerImage,
  } = details;

  // const passphoto = customerImage?.map((passphoto) => passphoto.imageUrl);

  const styles = StyleSheet.create({
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
              src='/images/SVM-Developers-Logo.png'
              alt='Logo'
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
            {customerImage?.slice(0, 1).map((img, ind) => (
              <View style={styles.passPhotoContainer} key={ind}>
                <Image
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={img?.imageUrl}
                  alt='passphoto'
                />
              </View>
            ))}
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
            <View style={styles.halfDiv}>
              <Text style={styles.ml}>{phone}</Text>
            </View>
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
        {/* <View style={styles.termBox}></View> */}
      </Page>
      <Page size='A4' style={styles.page2}>
        <View style={styles.footer}></View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: '20px',
            backgroundColor: '#17A34B',
          }}
        >
          <Text
            style={{
              fontFamily: 'Nato Sans Gujarati',
              fontWeight: 'extrabold',
              fontSize: '20px',
              color: 'white',
            }}
          >
            નિયમો અને શરતો
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '16px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '20px',
            // margin: "0 2 0px",
            // border: "1px solid red",
          }}
        >
          {termsAndCondition?.map((term, ind) => (
            <View
              key={ind}
              style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}
            >
              <Text>•</Text>

              <Text
                style={{ fontFamily: 'Nato Sans Gujarati', fontSize: '16px' }}
              >
                {term.term}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text
            style={{
              // fontFamily: "Nato Sans Gujarati",
              fontWeight: 'extrabold',
              fontSize: '20px',
            }}
          >
            Thank You , Visit Again
          </Text>
        </View>
      </Page>
    </Document>
  );
};
