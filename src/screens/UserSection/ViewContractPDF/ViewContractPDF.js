//import : react components
import React, {useState} from 'react';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';
//import : custom components
import MyHeader from 'components/MyHeader/MyHeader';
import FAB_Button from 'components/FAB_Button/FAB_Button';
//import : third parties
import {WebView} from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';
// import : globals
import {Colors, MyIcon, Service} from 'global/Index';
//import : styles
import {styles} from './ViewContractPDFStyle';
//import : redux
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';

const ViewContractPDF = ({route}) => {
  //variables : redux variables
  const userToken = useSelector(state => state.user.userToken);
  const [loading, setloading] = useState(true);
  //variables : route variables
  const appointment_id = route.params.appointment_id;
  const booking_id = route.params.booking_id;
  //hook : states
  //function : imp function
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          Toast.show(`Storage Permission Not Granted`, Toast.SHORT);
        }
      } catch (err) {
        // To handle permission related exception
        console.log('ERROR' + err);
      }
    }
  };

  //function : service function
  const downloadFile = async () => {
    let pdfUrl = route?.params?.url;
    let DownloadDir =
      Platform.OS == 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DownloadDir;
    const {dirs} = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'TimeShareSimplified',
      path: `${dirToSave}.pdf`,
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
        appendExt: 'pdf',
      },
      android: configfb,
    });
    Platform.OS == 'android'
      ? RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: `${DownloadDir}/.pdf`,
            description: 'Cosmologo',
            title: `${route?.params?.contractId}contract.pdf`,
            mime: 'application/pdf',
            mediaScannable: true,
          },
        })
          .fetch('GET', `${pdfUrl}`)
          .catch(error => {
            console.warn(error.message);
          })
      : RNFetchBlob.config(configOptions)
          .fetch('GET', `${pdfUrl}`, {})
          .then(res => {
            if (Platform.OS === 'ios') {
              RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
              RNFetchBlob.ios.previewDocument(configfb.path);
            }
            console.log('The file saved to ', res);
          })
          .catch(e => {
            console.log('The file saved to ERROR', e.message);
          });
  };
  //UI
  console.log('=====route?.params?.url', route?.params?.url);
  return (
    <View style={styles.container}>
      <CustomLoader showLoader={loading} />
      <MyHeader Title={'Signed Contract PDF'} />
      <WebView
        source={{
          uri: Platform.OS=='ios'?route?.params?.url : `http://docs.google.com/gview?embedded=true&url=${encodeURIComponent(route?.params?.url)}`,
        }}
        onLoad={() => {
          setloading(true);
        }}
        onLoadEnd={() => {
          setloading(false);
        }}
        contentMode="mobile"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={false}
         onError={(error) => console.error('WebView error:', error)}
         onHttpError={(error) => console.error('WebView HTTP error:', error)}
        style={styles.webViewStyle}
      />
      <FAB_Button
        icon={
          <MyIcon.AntDesign name="download" size={30} color={Colors.WHITE} />
        }
        bottom={100}
        onPress={checkPermission}
      />
    </View>
  );
};

export default ViewContractPDF;
