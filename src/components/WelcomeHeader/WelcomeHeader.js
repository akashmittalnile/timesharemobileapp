//import : react components
import {Colors, Images, MyIcon, ScreenNames} from 'global/Index';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import : styles
import {styles} from './WelcomeHeaderStyle';
import MyText from 'components/MyText/MyText';

const WelcomeHeader = ({backAction, style = {}}) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <TouchableOpacity onPress={backAction} style={styles.backView}>
        <Image source={require('assets/images/dark-back-icon.png')} />
      </TouchableOpacity>
      <Image
        source={require('assets/images/splash-logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default WelcomeHeader;
