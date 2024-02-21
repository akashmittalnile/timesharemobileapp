//react components
import React, {useEffect} from 'react';
import {View, Image, ImageBackground, StyleSheet} from 'react-native';
//global
import {Colors, Constant, Images, ScreenNames} from 'global/Index';
//styles
import {styles} from './SplashStyle';
import {CommonActions} from '@react-navigation/native';
import MyText from 'components/MyText/MyText';
//third parties
import AsyncStorage from '@react-native-async-storage/async-storage';
//redux
import {useDispatch} from 'react-redux';
import {
  setUser,
  setUserToken,
  setUserNotifications,
} from 'src/reduxToolkit/reducer/user';

const Splash = ({navigation}) => {
  //variables : redux variables
  const dispatch = useDispatch();
  //function : navigation function
  const resetIndexGoToUserBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  const resetIndexGoToSignInSignUp = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.SIGN_IN_SIGN_UP}],
  });
  const resetIndexGoToSetLocation = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.DRIVER_SET_LOCATION}],
  });
  const resetIndexGoToWelcome = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.WELCOME}],
  });
  //useEffect
  useEffect(() => {
    setTimeout(async () => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      const userToken = await AsyncStorage.getItem('userToken');
      if (userInfo) {
        const notifications = await AsyncStorage.getItem('userNotifications');
        // console.log('User notifications', notifications);
        if (notifications) {
          dispatch(setUserNotifications(JSON.parse(notifications)));
        }
      }
      const userData = JSON.parse(userInfo);
      if (userData) {
        dispatch(setUserToken(userToken));
        dispatch(setUser(userData));
        navigation.dispatch(resetIndexGoToUserBottomTab);
      } else {
        navigation.dispatch(resetIndexGoToWelcome);
      }
    }, 2000);
    return () => {};
  }, []);

  //UI
  return (
    <ImageBackground
      source={require('assets/images/splash-bg.png')}
      style={[StyleSheet.absoluteFill, styles.bgStyle]}>
      <Image
        source={require('assets/images/splash-logo.png')}
        style={{marginTop: 40}}
      />
    </ImageBackground>
    // <View style={styles.container}>
    //   <View style={styles.mainView}>
    //     <View style={styles.logoView}>
    //       <Image
    //         resizeMode="contain"
    //         source={Images.SplashScreenImage}
    //         style={styles.centerImageStyle}
    //       />
    //     </View>
    //   </View>
    // </View>
  );
};

export default Splash;
