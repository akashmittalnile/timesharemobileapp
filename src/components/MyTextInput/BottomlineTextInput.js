import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const BottomlineTextInput = () => ({
  Title,
  value = '',
  inputRef,
  setValue = () => {},
  placeholder,
  fontSize = 14,
  secureTextEntry = false,
  placeholderTextColor = Colors.LIGHT_GRAY,
  borderColor = '#E0E0E0',
  keyboardType = 'default',
  onSubmitEditing,
  onTouchStart = () => {},
  backgroundColor = '#fff',
  style = {},
  textInputstyle = {},
  maxLength = 300,
  isOnChangeText = false,
  onChangeText = () => {},
  isIcon = false,
  icon,
  editable = true,
}) => {
  const [look, setLook] = useState(false);
  return (
    <View
    style={{
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
      width: '100%',
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: 10,
      backgroundColor,
      ...style,
    }}>
    {/* <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <MyText text={Title} textColor="theme_orange" />
      <MyText text="Required" textColor="theme_orange" />
    </View> */}

    {isIcon ? <Image source={icon} style={{marginLeft: 20}} /> : null}

    <TextInput
      ref={inputRef}
      value={value}
      onChangeText={isOnChangeText ? onChangeText : text => setValue(text)}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={
        !secureTextEntry ? false : look ? !secureTextEntry : secureTextEntry
      }
      onTouchStart={onTouchStart}
      keyboardType={keyboardType}
      maxLength={maxLength}
      onSubmitEditing={onSubmitEditing}
      editable={editable}
      style={{
        padding: 10,
        paddingLeft: 20,
        borderRadius: 5,
        width: '80%',
        height: 48,
        fontSize: fontSize,
        // color: '#455A64',
        color: Colors.THEME_GRAY,
        ...textInputstyle,
      }}
    />
    {secureTextEntry ? (
      <TouchableOpacity
        onPress={() => {
          setLook(prev => !prev);
        }}
        style={{padding: 10}}>
        <Feather
          name={look ? 'eye' : 'eye-off'}
          size={24}
          color={'#8F93A0'}
        />
      </TouchableOpacity>
    ) : null}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 5, // Adjust this value to reduce the gap
    paddingHorizontal: 10,
  },
});

export default BottomlineTextInput;
