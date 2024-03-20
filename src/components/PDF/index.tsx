import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import React from 'react';

import { styles } from '@/components/PDF/bookingPdf-style';

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
  {
    id: 11,
    term: 'વેચાણ આપેલ પ્લોટની રકમ 36 મહિનામાં પૂર્ણ કરી દસ્તાવેજ કરાવવાનું રહેશે.',
  },
  {
    id: 12,
    term: 'પહેલા પક્ષનાએ યાને ખરીદનાર પાર્ટીએ દર માસના ઈ.એમ.આઈ સમયસર ભરવાના રહેશે. અને જો ઈ.એમ.આઈ. ભરવામાં નિષ્ફળ અથવા મોડું થાય તો ઈ.એમ.આઈ સાથે 500 રૂ. લેટ પેમેન્ટ ચાર્જ તરીકે અલગથી ચૂકવવાનો રહેશે',
  },
  {
    id: 13,
    term: 'પહેલા પક્ષનાએ યાને ખરીદનાર પાર્ટીએ કોઈપણ ચેક દ્વારા હપ્તાનું પેમેન્ટ કરેલું હોય અને કોઈપણ કારણસર ચેક બાઉન્સ થાય તો 500 રૂ. ચેકબાઉન્સ ચાર્જ + 18% ટેક્સ સાથે ૨કમ ચૂકવાણી રહેશે.',
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
    customer,

    customerImage,
  } = details;

  // const passphoto = customerImage?.map((passphoto) => passphoto.imageUrl);

  // const styles = StyleSheet.create({
  //   page: {
  //     backgroundColor: '#fff',
  //     fontFamily: 'Helvetica',
  //     // fontFamily: 'Nato Sans Gujarati',
  //     fontSize: 12,
  //     position: 'relative',

  //     lineHeight: 1.5,
  //     flexDirection: 'column',
  //     // Set your desired border style
  //     boxSizing: 'border-box',
  //   },

  //   note: {
  //     width: '90%',
  //     padding: '6px ',
  //     margin: '0 auto',
  //     marginTop: '20px',
  //     backgroundColor: '#fff',
  //     border: '2px solid black',
  //     borderRadius: '10px',
  //     // boxShadow: '-5px 5px 10px red',
  //     boxShadow: '10px 10px',
  //   },

  //   termsHeading: {
  //     fontSize: '28px',
  //     textAlign: 'center',
  //     textDecoration: 'underline',
  //   },

  //   termBox: {
  //     width: '100%',
  //     // padding: '10px',
  //     height: '300px',
  //     // marginTop: '248px',
  //   },
  //   ml: {
  //     marginLeft: '20px',
  //   },

  //   headingText: {
  //     fontSize: '12px',
  //     fontWeight: 'extrabold',
  //   },

  //   header: {
  //     width: '100%',
  //     height: '80px',
  //     // backgroundColor: "#F49614",
  //     // backgroundColor: '#17A34B',
  //     position: 'absolute',
  //     top: 0,
  //     display: 'flex',
  //     flexDirection: 'row',
  //     justifyContent: 'flex-start',
  //     gap: '10px',
  //     // margin: "60px 0",
  //     alignItems: 'center',
  //   },

  //   footer: {
  //     width: '100%',
  //     height: '30px',
  //     // backgroundColor: "#F49614",
  //     backgroundColor: '#17A34B',
  //     position: 'absolute',
  //     bottom: 0,
  //   },

  //   companyLogo: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     width: '100%',
  //     justifyContent: 'flex-start',
  //     // border: '1px solid red',
  //     // gap: '10px',
  //     marginTop: '100px',
  //     alignItems: 'center',
  //     marginLeft: '20px',
  //     // marginRight: '20px',
  //   },

  //   logo: {
  //     width: '150px',
  //     height: '80px',
  //   },

  //   companyName: {
  //     fontSize: '24px',
  //     fontWeight: 'bold',
  //     color: '#3778C2',
  //     letterSpacing: 3,
  //   },

  //   titleWrapper: {
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     width: '100%',

  //     marginTop: '-50px',
  //   },
  //   title: {
  //     fontSize: '24px',
  //     fontWeight: 'extrabold',
  //     color: '#F49614',
  //   },

  //   passPhotoWrapper: {
  //     display: 'flex',
  //     width: '100%',
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     padding: '0 10px',
  //     // marginTop: "-50px",
  //   },

  //   passPhotoContainer: {
  //     width: '100px',
  //     height: '120px',
  //     border: '1px solid black',
  //     marginLeft: '80%',
  //   },

  //   date: {
  //     fontSize: '12px',
  //   },

  //   detailTitle: {
  //     borderBottom: '1px solid gray',
  //   },

  //   headerContainer: {
  //     // marginTop: "30%",
  //     maxWidth: '100%',
  //   },

  //   fullWidthField: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     width: '100%',
  //     justifyContent: 'flex-start',
  //     alignItems: 'flex-end',
  //   },
  //   flexCenter: {
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  //   bookingHeading: {
  //     fontSize: '18px',
  //     textAlign: 'center',
  //     fontWeight: 'heavy',
  //     color: '#3778C2',
  //   },

  //   parentView: {
  //     paddingTop: 20,
  //     paddingLeft: 20,
  //     paddingRight: 20,
  //     lineHeight: 1.5,
  //     // border: '1px solid red',
  //   },

  //   secondRowWrapper: {
  //     marginTop: '30px',
  //     display: 'flex',
  //     flexDirection: 'row',
  //     justifyContent: 'flex-start',
  //     alignItems: 'flex-end',
  //     // border: "2px solid red",
  //   },
  //   halfDiv: {
  //     borderBottom: 1,
  //     borderColor: 'black',
  //     width: '40%',
  //     position: 'relative',
  //     bottom: 2,
  //   },
  //   addressDiv: {
  //     borderBottom: 1,
  //     borderColor: 'black',
  //     width: '86%',
  //     position: 'relative',
  //     bottom: 2,
  //   },
  //   flexEnd: {
  //     marginTop: '30px',
  //     display: 'flex',
  //     flexDirection: 'row',
  //     alignItems: 'flex-end',
  //   },
  // });
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View>
          <Text style={styles.bookingHeading}>BOOKING FORM</Text>
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
        {/* <View style={styles.footer}></View> */}

        <View style={styles.invoiceContainer}>
          <Text style={styles.headingText}>Booking Date : 30/3/24</Text>
        </View>

        <View style={styles.companyLogo}>
          <View style={styles.passPhotoWrapper}>
            <View style={styles.passPhotoContainer}>
              <Image
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={
                  `https://svm-bucket.blr1.digitaloceanspaces.com/svm/rohan1710871663693.jpg` ||
                  null
                }
                alt='passphoto'
              />
            </View>
          </View>
        </View>

        <View style={styles.parentView}>
          <View style={styles.fullWidthField}>
            <Text style={styles.headingText}>Project Name:</Text>
            <View
              style={{
                borderBottom: 1,
                borderColor: 'black',
                width: '100%',
              }}
            >
              <Text style={styles.ml}> {projectName}</Text>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Name:</Text>
              <View style={styles.halfDiv}></View>
            </View>

            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Mobile:</Text>
              <View style={styles.halfDiv}>
                <Text style={styles.ml}>{area} sq.ft</Text>
              </View>
            </View>
          </View>

          <View style={styles.fullWidthField}>
            <Text style={styles.headingText}>Address:</Text>
            <View style={styles.addressDiv}>
              <Text style={styles.ml}>{address1}</Text>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>House/Plot No:</Text>
              <View style={styles.halfDiv}></View>
            </View>

            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Area:</Text>
              <View style={styles.halfDiv}>
                <Text style={styles.ml}>{area} sq.ft</Text>
              </View>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <Text style={styles.headingText}>Description:</Text>
            <View
              style={{
                borderBottom: 1,
                borderColor: 'black',
                width: '100%',
              }}
            ></View>
          </View>
          <View style={styles.flexEnd}>
            <Text style={styles.headingText}>Total Amount:</Text>
            <View
              style={{
                borderBottom: 1,
                borderColor: 'black',
                width: '100%',
              }}
            >
              <Text style={styles.ml}>{totalAmt}</Text>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Down Payment:</Text>
              <View style={styles.halfDiv}></View>
            </View>

            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>EMI:</Text>
              <View style={styles.halfDiv}>
                <Text style={styles.ml}>{area} </Text>
              </View>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Owner's Sign:</Text>
              <View style={styles.halfDiv}></View>
            </View>

            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Customer's Sign:</Text>

              <View style={styles.halfDiv}></View>
            </View>
          </View>
        </View>
        {/* <View style={styles.termBox}></View> */}
      </Page>

      <Page size='A4' style={styles.page}>
        {/* <View style={styles.footer}></View> */}
        <View style={styles.parentView}>
          <View
            style={{
              width: '200px',
              height: '100px',
              border: '1px solid black',
            }}
          ></View>
        </View>
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
            gap: '8px',
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
                style={{ fontFamily: 'Nato Sans Gujarati', fontSize: '14px' }}
              >
                {term.term}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.note}>
          <Text
            style={{
              fontFamily: 'Nato Sans Gujarati',
              fontWeight: 'heavy',
              fontSize: '16px',
            }}
          >
            Note: ઉપર દર્શાવેલ તમામ શરતો અને નિયમો મને સારી રીતે સમજાય છે. અને આ
            તમામ શરતો અને નિયમઓ મને મંજૂર છે.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
