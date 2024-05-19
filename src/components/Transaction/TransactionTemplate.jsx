import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  section: {
    margin: 20,
  },
  image: {
    width: 100,
    height: 50,
  },
  signature: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

const generateRandomDate = () => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const MyDocument = ({ transaction, buyerName }) => {
  const randomDate = formatDate(generateRandomDate());
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{randomDate}</Text>
          <Image src="public/image.png" style={styles.image} />
        </View>
        <View style={{...styles.section, borderBottom: '1 solid black'}}>
          <Text>Transaction ID: {transaction.id}</Text>
        </View>
        <View style={styles.section}>
          <Text>Buyer Name: {buyerName}</Text>
        </View>
        <View style={styles.section}>
          <Text>Transaction Fee: ${transaction.transactionFee}</Text>
        </View>
        <View style={styles.section}>
          <Text>Transaction Type: {transaction.transactionType}</Text>
        </View>
        <View style={styles.signature}>
          <Text>Signature: ____________________________________</Text>
        </View>
      </Page>
    </Document>
  );
};

const generatePDF = async (transaction, buyerName) => {
  const blob = await pdf(<MyDocument transaction={transaction} buyerName={buyerName} />).toBlob();
  return URL.createObjectURL(blob);
};

export default generatePDF;
