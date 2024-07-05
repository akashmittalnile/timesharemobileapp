import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, MyIcon} from 'global/Index';

const FAB_Button = ({
  onPress = () => {},
  padding = 10,
  right = 30,
  bottom = 30,
  icon = <MyIcon.AntDesign name="plus" size={30} color={Colors.WHITE} />,
  style = {}
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        right: right,
        bottom: bottom,
        backgroundColor: Colors.THEME_BLUE,
        padding: padding,
        borderRadius: 100,
        // shadowColor: '#FFFFFF',
        shadowColor: Colors.THEME_BLUE,
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 4,
        ...style
      }}>
      {icon}
      {/* <MyIcon.AntDesign name="plus" size={30} color={Colors.WHITE} /> */}
    </TouchableOpacity>
  );
};

export default FAB_Button;
