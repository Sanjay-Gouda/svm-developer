import { View, Text } from "@react-pdf/renderer";

const InvoiceFooter = () => {
  return (
    <>
      <Text
        style={{
          position: "relative",
          top: 40,
          bottom: 0,
          left: 90,
          right: 0,
          paddingRight: 20,
        }}
      >
        REMARKS:
      </Text>
      <View
        style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            width: "50%",
            height: 100,
            backgroundColor: "#FFFF",
            position: "relative",
            border: "2px solid black",
          }}
        ></View>
        <Text>for,S.V.M. Builders & Developers</Text>
      </View>
    </>
  );
};

export default InvoiceFooter;
