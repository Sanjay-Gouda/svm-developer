import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
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

// Create styles
const styles = StyleSheet.create({
  document: {
    display: 'flex',
    width: '100%',

    // fontFamily: 'Roboto',
    justifyContent: 'center',
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    border: '1px solid gray',
    width: '1170px',
  },
  temrsSection: {
    margin: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  termsHeading: {
    fontSize: '28px',
    textAlign: 'center',
    textDecoration: 'underline',
  },

  terms: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  termsBottom: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    background: 'gray',
    color: 'white',
    borderRadius: '10px',
  },

  bookingTable: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  tableHead: {
    display: 'flex',
    borderBottom: '1px solid grey',
  },
  imageWrapper: {
    // border: '1px solid gray',
    borderRight: ' 1px solid gray',
    width: '25%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  projectLogoContainer: {
    width: '25%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyHeader: {
    // border: '1px solid gray',
    width: '75%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  projectLogoWrapper: {
    // border: '1px solid gray',
    width: '75%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  leftDiv: {
    borderRight: '1px solid gray',
    width: '25%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mobileWrapper: {
    // borderTop: '1px solid gray',
    borderRight: '1px solid gray',
    width: '40%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ownerSign: {
    borderRight: '1px solid gray',
    width: '40%',
    height: '70px',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  customersSign: {
    // border: '1px solid gray',
    width: '60%',
    height: '70px',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  descWrapper: {
    // borderTop: '1px solid gray',
    width: '60%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightBorder: {
    borderRight: '1px solid gray',
    width: '60%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  signatureBox: {
    // borderBottom: '1px solid gray',
    // borderTop: '1px solid gray',
    width: '60%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightDiv: {
    // border: '1px solid gray',
    width: '55%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  passphotoSection: {
    display: 'flex',
    width: '100%',
    // border: '1px solid gray',
  },
  passPhotoLeftDiv: {
    // border: '1px solid gray',
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  passphotoRightDiv: {
    width: '20%',
    height: '180px',
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameValue: {
    // border: '1px solid gray',
    width: '75%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addressKey: {
    width: '25%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRight: '1px solid gray',
  },

  addressWrpper: {
    width: '75%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  passphotoWrapper: {
    width: '20%',
    borderLeft: '1px solid gray',
    padding: '8px',
  },
  addressMainDiv: {
    display: 'flex',
    height: '100%',
  },
  socialWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '8px',
  },
});

// Create Document Component
export default function MyDocument() {
  const BulletListItem = ({ text }) => (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ marginRight: 5 }}>•</Text>
      <Text>{text}</Text>
    </View>
  );

  return (
    <>
      <div className='flex w-full flex-col items-center justify-center  '>
        <h1 className='mb-5 text-3xl'>Booking Form</h1>
      </div>
      <Document style={styles.document}>
        <Page size='A4' style={styles.page}>
          <View style={styles.bookingTable}>
            <View style={styles.tableHead}>
              <View style={styles.imageWrapper}>
                <img src='http://svmdevelopers.in/wp-content/uploads/2018/06/cropped-svnfinal-logo-1.png' />
              </View>
              <View style={styles.companyHeader}>
                <h1 className='text-4xl font-semibold'>
                  S.V.M Builders & Developers
                </h1>
              </View>
            </View>

            <View style={styles.tableHead}>
              <View style={styles.imageWrapper}>
                <h1 className='text-base font-semibold'>Project Logo:</h1>
              </View>
              <View style={styles.projectLogoWrapper}>
                <View style={styles.projectLogoContainer}>
                  <img src='http://svmdevelopers.in/wp-content/uploads/2019/08/saireslogo-e1570106978177.jpg' />
                </View>
              </View>
            </View>

            <View style={styles.passphotoSection}>
              <View style={styles.passPhotoLeftDiv}>
                <View style={styles.tableHead}>
                  <View style={styles.leftDiv}>
                    <h1 className='text-base font-semibold'>Name:</h1>
                  </View>
                  <View style={styles.nameValue}>
                    <h1 className='text-base '>Vikram Kumawat</h1>
                  </View>
                </View>
                <View style={styles.addressMainDiv}>
                  <View style={styles.addressKey}>
                    <h1 className='text-base font-semibold'>Address :</h1>
                  </View>
                  <View style={styles.addressWrpper}>
                    <h1 className='text-base '>
                      Gram- Joriyam Pure Kaloot, Joriyam, Faizabad, Uttar
                      Pradesh. Pin- 224229
                    </h1>
                  </View>
                </View>
              </View>

              <View style={styles.passphotoWrapper}>
                <View style={styles.image}>
                  <img src='http://svmdevelopers.in/wp-content/uploads/2019/08/saireslogo-e1570106978177.jpg' />
                </View>

                {/* <View style={styles.imageWrapper}>
                </View> */}
              </View>
            </View>

            <View style={styles.passphotoSection}>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  borderBottom: '1px solid gray',
                  borderTop: '1px solid gray',
                }}
              >
                <View style={styles.mobileWrapper}>
                  <h1 className='text-base font-semibold'>Mobile No:</h1>
                </View>
                <View style={styles.rightBorder}>
                  <h1 className='text-base'>909090</h1>
                </View>
              </View>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  borderBottom: '1px solid gray',
                  borderTop: '1px solid gray',
                }}
              >
                <View style={styles.mobileWrapper}>
                  <h1 className='text-base font-semibold'>EMI :</h1>
                </View>
                <View style={styles.descWrapper}>
                  <h1 className='text-base '> </h1>
                </View>
              </View>
            </View>
            <View style={styles.passphotoSection}>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  borderBottom: '1px solid gray',
                }}
              >
                <View style={styles.mobileWrapper}>
                  <h1 className='text-base font-semibold'>Shop/Plot No.:</h1>
                </View>
                <View style={styles.rightBorder}>
                  <h1 className='text-base '>909090</h1>
                </View>
              </View>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  borderBottom: '1px solid gray',
                }}
              >
                <View style={styles.mobileWrapper}>
                  <h1 className='text-base font-semibold '>Area :</h1>
                </View>
                <View style={styles.descWrapper}>
                  <h1 className='text-base '> </h1>
                </View>
              </View>
            </View>
            <View style={styles.passphotoSection}>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  borderBottom: '1px solid gray',
                }}
              >
                <View style={styles.mobileWrapper}>
                  <h1 className='text-base font-semibold '>Total Amount:</h1>
                </View>
                <View style={styles.rightBorder}>
                  <h1 className='text-base'>909090</h1>
                </View>
              </View>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  borderBottom: '1px solid gray',
                }}
              >
                <View style={styles.mobileWrapper}>
                  <h1 className='text-base font-semibold '>Down Payment:</h1>
                </View>
                <View style={styles.descWrapper}>
                  <h1 className='text-base '> </h1>
                </View>
              </View>
            </View>

            <View style={styles.passphotoSection}>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  borderBottom: '1px solid gray',
                }}
              >
                <View style={styles.ownerSign}>
                  <h1 className='text-base font-semibold'>Owner's Sign:</h1>
                </View>
                <View style={styles.rightBorder}>
                  <h1 className='text-base'>Vikram Kumawat</h1>
                </View>
              </View>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  borderBottom: '1px solid gray',
                }}
              >
                <View style={styles.ownerSign}>
                  <h1 className='text-base font-semibold'>Customer Sign:</h1>
                </View>
                <View style={styles.signatureBox}>
                  <h1 className='text-base'>Vikram Kumawat</h1>
                </View>
              </View>
            </View>
          </View>

          {/* Identity Section  */}

          {/* <View
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              marginTop: '40px',
            }}
          >
            <View
              style={{
                width: '500px',
                height: '250px',
                padding: '8px',
                border: '1px solid gray',
              }}
            >



            </View>
            <View
              style={{
                width: '500px',
                height: '250px',
                padding: '8px',
                border: '1px solid gray',
              }}
            ></View>
          </View> */}

          <View style={styles.socialWrapper}>
            <h1 className='text-xl font-semibold'>Follow Us</h1>
            <p className='text-base font-semibold'>
              <a href='http://svmdevelopers.in/'>🌐 www.svmdevelopers.in</a>
            </p>
            <p className='text-base font-semibold'>
              <a href='https://www.facebook.com/profile.php?id=100064151886759'>
                🌐 SVM Builders & Developers
              </a>
            </p>
          </View>

          {/* Terms */}
          <View style={styles.temrsSection}>
            <Text style={styles.termsHeading}>નિયમો અને શરતો</Text>
            <Text style={styles.terms}>
              {termsAndCondition?.map((term) => {
                return <BulletListItem key={term?.id} text={term.term} />;
              })}
              {/* Hello world */}
            </Text>
            <Text style={styles.termsBottom}>
              ** ઉપર દર્શાવેલ તમામ શરતો અને નિયમો મને સારી રીતે સમજાય છે. અને આ
              તમામ શરતો અને નિયમઓ મને મંજૂર છે.**
            </Text>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <View
                style={{
                  border: '2px solid gray',
                  padding: '8px',
                  width: '200px',
                  height: '80px',
                }}
              ></View>
              <Text>ખરીદનાર</Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
}
