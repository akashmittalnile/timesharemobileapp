//react components
import React, { useState } from 'react';
import { View, Platform, ActivityIndicator, TouchableOpacity, Image, Text, TouchableWithoutFeedback } from 'react-native';
//global
import { Colors } from 'global/Index';
import MyText from 'components/MyText/MyText';
import { styles } from './DropdownPickerStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from 'global/MyIcon';

const DropdownPicker = ({
  data,
  setData,
  visible,
  setVisibility,
  onHide,
  value,
  setValue,
  isCustomChangeValue = false,
  customChangeValue = () => { },
  placeholder = '',
  style = {},
  zIndex = 5000,
  zIndexInverse = 6000
}) => {
  return (
    <View style={[styles.outerView, style]}>
      <DropDownPicker
        open={visible}
        value={value}
        items={data}
        setOpen={setVisibility}
        setValue={(v) => { setValue(v) }}
        setItems={(i) => { setData(i) }}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        // placeholder="Select Status"
        placeholder={placeholder}
        onChangeValue={(value) => {
          if (isCustomChangeValue) {
            if (value) {
              customChangeValue(value)
            }
          } else {
            setValue(value)
          }
        }}
        listItemLabelStyle={{ color: Colors.THEME_GRAY }}
        labelStyle={{ color: Colors.THEME_GRAY }}
        dropDownDirection="BOTTOM"
        // listMode="MODAL"
        placeholderStyle={styles.placeholderStyle}
        textStyle={styles.itemTextStyle}
        style={{ borderColor: 'transparent', backgroundColor: 'white', paddingHorizontal: 20 }}
        containerStyle={{
          borderColor: 'red',
          // height:400
        }}
        disabledStyle={{
          opacity: 0.5
        }}
        // maxHeight={400}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />
    </View>
  )
}

export default DropdownPicker