import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import MyText from 'components/MyText/MyText';
import { Colors, MyIcon } from 'global/Index';

const DateSelector = ({ Title = 'Today', placeholder = '', textColor = '#8F93A0', showDateIcon = false, onPress = () => { }, calenderViewStyle = {}, dateViewStyle = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.calendarView, ...calenderViewStyle }}>
      <View style={{ ...styles.selectedDateView, ...dateViewStyle }}>
        <MyText text={Title} fontFamily='medium' textColor={textColor} />
        {/* <MyIcon.AntDesign name="down" /> */}
      </View>
      {showDateIcon ?
        <Image source={require('../../assets/images/date-icon.png')} style={{ }} />
        : null}
    </TouchableOpacity>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  calendarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  selectedDateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '85%',
    borderWidth: 0.5,
    borderRadius: 10,
    // paddingHorizontal: 15,
    height: 40,
  },

  calendarIcon: {
    backgroundColor: Colors.BG_GREEN,
    borderRadius: 5,
    marginRight: 10
  },
});
