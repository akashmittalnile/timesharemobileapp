//import : react components
import React, {useState} from 'react';
import {
  View,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  Platform,StyleSheet,
} from 'react-native';

import VersionCheck from 'react-native-version-check';
//import : styles

const AppUpdate = ({visible, setVisibility}) => {
  //variables
  //hook : states
  const [latestVersion, setlatestVersion] = useState(
    VersionCheck.getCurrentVersion(),
  );
  const showDetail = async () => {
    VersionCheck.getLatestVersion().then(latestVersion => {
      setlatestVersion(latestVersion);
    });
  };
  const updateApp = async () => {
    let url;
    if (Platform.OS === 'android') {
      url = await VersionCheck.getStoreUrl({});
    } else {
      url = `https://apps.apple.com/in/app/timeshare/id6470616730`;
    }
    Linking.openURL(url);
  };
  //UI
  return (
    <Modal
      visible={visible}
      animationType="fade"
      onShow={showDetail}
      transparent>
      <View style={styles.container}>
        <View style={styles.mainView}>
          <Image
            resizeMode="stretch"
            source={require('../assets/images/splash-logo.png')}
            style={{height:200,width:200,alignSelf:'center'}}
          />
          <Text style={styles.title}>Important Update</Text>
          <Text style={styles.subText}>
            A new version is now available for the Timeshare Simplified app. Please click
            on UPDATE button below to get the latest version.
          </Text>
          {/* <Text style={styles.subText}>
            {`What's new in v${latestVersion}`}
          </Text> */}
          <TouchableOpacity onPress={updateApp} style={styles.buttonView}>
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
          {/* <View style={styles.bottomSection}>
            
          </View> */}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    // blurView: {
    //   flex: 1,
    // },
    mainView: {
      justifyContent: 'space-around',
      margin: '10%',
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
    logoStyle: {
      height: '30%',
      width: 150,
      alignSelf: 'center',
    },
    title: {
      fontSize: 18,
      color: '#000',
    //   fontFamily: Fonts.BOLD,
      textAlign: 'center',
      marginTop: 10,
    //   marginBottom: -10,
    },
    subText: {
      color: '#000',
    //   fontFamily: Fonts.SEMI_BOLD,
    //   marginBottom: 10,
    marginTop:20,
      textAlign: 'center',
    },
    bottomSection: {
      justifyContent: 'center',
    },
    buttonView: {
      backgroundColor: 'green',
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:15
    },
    buttonText: {
      color: '#fff',
    },
  });
  
export default AppUpdate;
