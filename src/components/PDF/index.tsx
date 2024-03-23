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

type TImageType = 'FRONT_REAR' | 'FRONT_BACK' | 'PHOTO';

type TCutomerImage = {
  createdAt: string;

  customerId: string;
  customerImageId: string;

  imageUrl: string;

  type: TImageType;

  updatedAt: string;
};

type TCustomerPDFDetail = {
  address: string;
  city: string;
  customerId: string;
  images: TCutomerImage[];
  name: string;
  phone1: string;
  phone2: string;
  pincode: string;
  state: string;
};

type TcustomerMap = {
  customer: TCustomerPDFDetail;
  ind: string;
};

export const Booking = ({ details }: any) => {
  const {
    projectName,
    totalAmt,
    area,
    address1,
    customer,
    plotNo,
    installmentAmt,
    paidAmt,
    description,
  } = details;

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
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              width: '100%',
            }}
          >
            {/* <View>
              <Text style={styles.projectLogoHeading}>PROJECT LOGO</Text>
            </View> */}
            <View>
              <Image
                style={styles.logo}
                src='/images/SVM-Developers-Logo.png'
                alt='Logo'
              />
            </View>
          </View>

          <View style={styles.passPhotoWrapper}>
            {customer?.map((docs: TCustomerPDFDetail, ind: string) => (
              <>
                {docs?.images?.slice(0, 2).map((aadhar: TCutomerImage) => {
                  if (aadhar.type === 'PHOTO') {
                    return (
                      <>
                        <View key={ind} style={styles.passPhotoContainer}>
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            src={aadhar?.imageUrl}
                            alt='aadharCard-front'
                          />
                        </View>
                      </>
                    );
                  }
                })}
              </>
            ))}
          </View>
        </View>

        <View style={styles.parentView}>
          <View style={styles.fullWidthField}>
            <Text style={styles.headingText}>Project Name:</Text>
            <View style={styles.halfDiv}>
              <Text style={styles.valueText}> {projectName}</Text>
            </View>
          </View>

          {/* <View style={styles.flexEnd}>
            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Name:</Text>

              <View style={styles.halfDiv}>
                {customer?.map((customer: TCustomerPDFDetail, ind: string) => (
                  <Text style={styles.valueText} key={ind}>
                    {customer?.name}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Mobile:</Text>
              <View style={styles.halfDiv}>
                {customer?.map((customer: TCustomerPDFDetail, ind: string) => (
                  <Text key={ind} style={styles.valueText}>
                    {`${customer?.phone1} `}
                  </Text>
                ))}
              </View>
            </View>
          </View> */}

          <View style={styles.fullWidthField}>
            <Text style={styles.headingText}>Name:</Text>
            <View style={styles.halfDiv}>
              {customer?.map((customer: TCustomerPDFDetail, ind: string) => (
                <Text style={styles.valueText} key={ind}>
                  {customer?.name}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.fullWidthField}>
            <Text style={styles.headingText}>Mobile No:</Text>
            <View style={styles.halfDiv}>
              {customer?.map((customer: TCustomerPDFDetail, ind: string) => (
                <Text key={ind} style={styles.valueText}>
                  {`${customer?.phone1} `}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.fullWidthField}>
            <Text style={styles.headingText}>Address:</Text>
            <View style={styles.halfDiv}>
              {customer
                ?.slice(0, 1)
                .map((customer: TCustomerPDFDetail, ind: string) => (
                  <Text style={styles.valueText} key={ind}>
                    {customer?.address}
                  </Text>
                ))}
            </View>
          </View>

          <View style={styles.flexEnd}>
            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>House/Plot No:</Text>
              <View style={styles.halfDiv}>
                <Text style={styles.ml}> {plotNo}</Text>
              </View>
            </View>

            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Area:</Text>
              <View style={styles.halfDiv}>
                <Text style={styles.valueText}>{area} sq.ft</Text>
              </View>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <Text style={styles.headingText}>Description:</Text>
            <View style={styles.halfDiv}>
              <Text style={styles.valueText}> {description}</Text>
            </View>
          </View>
          <View style={styles.flexEnd}>
            <Text style={styles.headingText}>Total Amount:</Text>
            <View style={styles.halfDiv}>
              <Text style={styles.ml}>{totalAmt}</Text>
            </View>
          </View>

          <View style={styles.flexEnd}>
            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>Down Payment:</Text>
              <View style={styles.halfDiv}>
                <Text style={styles.ml}> {paidAmt}</Text>
              </View>
            </View>

            <View style={styles.newHalfDivWrapper}>
              <Text style={styles.headingText}>EMI:</Text>
              <View style={styles.halfDiv}>
                <Text style={styles.valueText}> {installmentAmt} </Text>
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
        <View style={styles.documentParentView}>
          <View style={styles.documentWrapper}>
            {customer?.map((docs: TCustomerPDFDetail, ind: string) => (
              <>
                {docs?.images?.map((aadhar: TCutomerImage) => {
                  if (aadhar.type === 'AADHAR_FRONT') {
                    return (
                      <>
                        <View key={ind} style={styles.documentContainer}>
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            src={aadhar?.imageUrl}
                            alt='aadharCard-front'
                          />
                        </View>
                      </>
                    );
                  }
                })}
              </>
            ))}
          </View>

          <View style={styles.documentWrapper}>
            {customer?.map((docs: TCustomerPDFDetail, ind: string) => (
              <>
                {docs?.images?.map((aadhar: TCutomerImage) => {
                  if (aadhar.type === 'AADHAR_REAR') {
                    return (
                      <>
                        <View key={ind} style={styles.documentContainer}>
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            src={aadhar?.imageUrl}
                            alt='aadharCard-front'
                          />
                        </View>
                      </>
                    );
                  }
                })}
              </>
            ))}
          </View>

          <View style={styles.documentWrapper}>
            {customer?.map((docs: TCustomerPDFDetail, ind: string) => (
              <>
                {docs?.images?.map((aadhar: TCutomerImage) => {
                  if (aadhar.type === 'PAN') {
                    return (
                      <>
                        <View key={ind} style={styles.documentContainer}>
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            src={aadhar?.imageUrl}
                            alt='aadharCard-front'
                          />
                        </View>
                      </>
                    );
                  }
                })}
              </>
            ))}
          </View>
        </View>
      </Page>

      <Page size='A4' style={styles.termPage}>
        {/* <View style={styles.footer}></View> */}

        <View
          style={{
            width: '100%',
            margin: '0 auto',
            padding: '0 15px',
          }}
        >
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              paddingTop: '20px',
            }}
          >
            <Text
              style={{
                fontFamily: 'Nato Sans Gujarati',
                fontWeight: 'extrabold',
                fontSize: '20px',
                color: '#091762',
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
              Note: ઉપર દર્શાવેલ તમામ શરતો અને નિયમો મને સારી રીતે સમજાય છે. અને
              આ તમામ શરતો અને નિયમઓ મને મંજૂર છે.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
