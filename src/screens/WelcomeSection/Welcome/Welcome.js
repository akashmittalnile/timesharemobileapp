//import : react components
import {Colors, Images, MyIcon, ScreenNames} from 'global/Index';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import : styles
import {styles} from './WelcomeStyle';
import MyText from 'components/MyText/MyText';
import MyButton from 'components/MyButton/MyButton';

const Welcome = ({navigation}) => {
  const gotoLogin = () => navigation.navigate(ScreenNames.DRIVER_LOG_IN);
  const gotoSignUP1 = () => navigation.navigate(ScreenNames.SIGN_UP_1);
  const gotoSignIn = () => navigation.navigate(ScreenNames.SIGN_IN);
  useEffect(()=>{
StatusBar.setHidden(true)
return ()=> {
  StatusBar.setHidden(false)
}
  },[])
  //UI
  return (
    <ImageBackground
      source={require('assets/images/welcome-bg.png')}
      style={styles.container}>
      {/* <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(14, 71, 124, 0.81)',
          'rgba(14, 71, 124, 0.81)'
        ]} style={styles.gradientStyle}> */}
      <View style={styles.absoluteView}>
        <Image
          source={require('assets/images/splash-logo.png')}
          style={styles.logoStyle}
        />
        <MyButton
          text={'Login'}
          onPress={gotoSignIn}
          style={styles.loginStyle}
        />
        <MyButton text={'Signup'} isWhite onPress={gotoSignUP1} />
      </View>
      {/* </LinearGradient> */}
    </ImageBackground>
  );
};

export default Welcome;
