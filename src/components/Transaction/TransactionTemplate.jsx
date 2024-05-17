import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0000",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

const MyDocument = ({ transaction, buyerName }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Transaction ID: {transaction.id}</Text>
      </View>
      <View style={styles.section}>
        <Text>Buyer Name: {buyerName}</Text>
      </View>
      <View style={styles.section}>
        <Text>Transaction Fee: {transaction.transactionFee}</Text>
      </View>
      <View style={styles.section}>
        <Text>Transaction Type: {transaction.transactionType}</Text>
      </View>
    </Page>
  </Document>
);

const generatePDF = async (transaction, buyerName) => {
  const blob = await pdf(<MyDocument transaction={transaction} buyerName={buyerName} />).toBlob();
  return URL.createObjectURL(blob);
};

export default generatePDF;
