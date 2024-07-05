import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import PDFView from 'react-native-view-pdf';
import Loader from '../../NetworkCall/Loader';
const ViewPdf = (props) => {
  const [loading, setloading] = useState(true);
  console.log(props);
  let {pdfUrl} = props.route.params;
  const resources = {
    file:
      Platform.OS === 'ios'
        ? 'downloadedDocument.pdf'
        : '/sdcard/Download/downloadedDocument.pdf',
    url: pdfUrl,
    base64: 'JVBERi0xLjMKJcfs...',
  };
  const resourceType = 'url';
  return (
    <>
      <Loader isLoader={loading} />
      <View style={styles.CradContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.BackContainer}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../images/back.png')} />
        </TouchableOpacity>
        <View style={{alignSelf: 'center', marginTop: 18, marginLeft: 15}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#898989',
              marginTop: 10,
            }}>
            View PDF
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <PDFView
          fadeInDuration={250.0}
          style={{flex: 1}}
          resource={resources[resourceType]}
          resourceType={resourceType}
          onLoad={() =>
            console.log(`PDF rendered from ${resourceType}`, setloading(false))
          }
          onError={(error) => console.log('Cannot render PDF', error)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  CradContainer: {
    height: 120,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowRadius: 30,
    borderWidth: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    // alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  pdfcontainer: {
    paddingHorizontal: 20,

    width: 120,

    marginLeft: 20,
    bottom: 10,
    borderRadius: 10,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3AB34A',
  },
  pdfText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  BackContainer: {
    width: '10%',
    height: '30%',
    marginLeft: '5%',
    marginTop: '15%',
  },
});

export default ViewPdf;
