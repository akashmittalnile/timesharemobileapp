//import : react components
import {Colors, Images, MyIcon, ScreenNames} from 'global/Index';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import : styles
import {styles} from './MyButtonStyle';
import MyText from 'components/MyText/MyText';

const MyButton = ({
  text,
  onPress,
  isWhite = false,
  style = {},
  icon,
  isIcon = false,
  iconStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnStyle,
        style,
        isWhite ? {backgroundColor: 'white'} : null,
      ]}>
      {isIcon ? <Image source={icon} style={iconStyle} /> : null}
      <MyText
        text={text}
        textColor={isWhite ? Colors.THEME_GRAY : 'white'}
        fontSize={16}
        fontFamily="medium"
        style={textStyle}
      />
    </TouchableOpacity>
  );
};

export default MyButton;
