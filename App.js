//import : react components
import React, {useEffect,useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  Text,
  LogBox,
  Linking,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import : notification
//import : third parties
//import : globals
 import {Colors} from './src/global/Index';
import Drawer from './src/navigation/Drawer/Drawer';
//import : redux
import {Provider} from 'react-redux';
import {store} from './src/reduxToolkit/store/store';
//import : notification
import {NotificationAndroid} from './NotificationAndroid';
import {NotificationManagerIOS} from './NotificationManagerIOS';
import messaging from '@react-native-firebase/messaging';
import {AccessToken,AuthenticationToken,LoginManager,Profile,Settings,GraphRequest, GraphRequestManager} from 'react-native-fbsdk-next';
import AppUpdate from './src/components/AppUpdate';
import VersionCheck from 'react-native-version-check';
const App = () => {
  //function
  const [isUpdatedAvailable, setIsUpdatedAvailable] = useState(false);
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      sound: false,
      announcement: true,
    });
    
  }
  async function requestUserPermissionIos() {
    // await messaging().registerDeviceForRemoteMessages();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  //variables : hook
  //hook : useEffect
  useEffect(() => {
    checkAppUpdate()
    gettoken()
   if(Platform.OS=='ios'){
      Settings.setAppID('400809085634130');
      Settings.initializeSDK();
   }
    NotificationAndroid.createChannel();
    NotificationAndroid.configure();
    try {
      if (Platform.OS == 'android') {
        requestUserPermission();
      } else {
        requestUserPermissionIos();
      }
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        JSON.stringify(remoteMessage.data);
        const {messageId} = remoteMessage;
        const data = remoteMessage.notification;
        if (Platform.OS === 'android') {
          console.warn('data--->', data);
          NotificationAndroid.showNotification(
            data.title,
            data.body,
            data.subText,
            messageId,
            data,
          );
        } else {
          NotificationManagerIOS.showNotification(
            messageId,
            data.title,
            data.body,
            data,
            {},
          );
        }
      });
      return unsubscribe;
    } catch (error) {
      console.log(error.message);
    }
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const {data, messageId} = remoteMessage;
      const {Title, notificationText, subText} = data;
      if (Platform.OS === 'android') {
        NotificationAndroid.showNotification(
          Title,
          notificationText,
          subText,
          messageId,
        );
      } else {
        NotificationManagerIOS.showNotification(
          messageId,
          Title,
          notificationText,
          data,
          {},
        );
      }
    });
  }, []);
  
  const checkAppUpdate = () => {
    var currentVersion = VersionCheck.getCurrentVersion();
    VersionCheck.getLatestVersion({}).then(latestVersion => {
      VersionCheck.needUpdate({
        currentVersion: currentVersion,
        latestVersion: latestVersion,
      }).then(res => {
        console.log('====================================');
        console.log('Ashish',res);
        console.log('====================================');
        // setIsUpdatedAvailable(true);
        if (res.isNeeded) {
          setIsUpdatedAvailable(true);
        }
      });
    });
  };

  const gettoken = () => {
    messaging().getToken().then((token) => {
    
      console.log('Device token is:==>>',token)
     
   });
    };

  //UI
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor:
              Platform.OS === 'android' ? 'transparent' : Colors.THEME_BLUE,
          }}>
          <StatusBar backgroundColor={Colors.THEME_BLUE} />
          <Drawer />
          <AppUpdate
            visible={isUpdatedAvailable}
            setVisibility={setIsUpdatedAvailable}
          />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
