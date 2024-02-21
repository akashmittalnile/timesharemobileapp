//import : react components
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
//import : custom components
import MyText from 'components/MyText/MyText';
//import : globals
import {Colors, Constant, MyIcon, ScreenNames} from 'global/Index';
//import : styles
import {styles} from './SuccessfullySignedStyle';
import MyButton from 'components/MyButton/MyButton';

const SuccessfullySigned = ({
  visible,
  setVisibility,
  viewSignedContract,
  visitWebsite,
  davename,
  gotoSellMorePoints
}) => {
  //variables : navigation
  const navigation = useNavigation();
  const myTextInput = useRef();
  //function : navigation function
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  //UI
  return (
    <Modal
      isVisible={visible}
      // swipeDirection="down"
      // onBackdropPress={() => setVisibility(false)}
      onSwipeComplete={e => {
        // setVisibility(false);
      }}
      scrollTo={() => {}}
      scrollOffset={1}
      propagateSwipe={true}
      coverScreen={false}
      backdropColor="transparent"
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Image
          source={require('assets/images/small-logo.png')}
          style={{position: 'absolute', top: -50}}
        />
        <MyText
          text="Great!"
          fontSize={24}
          fontFamily="medium"
          textColor={Colors.THEME_BLUE}
          style={{marginTop: 50}}
        />
        <MyText
          text={"You Have Successfully Signed Timeshare Simplified ("+davename+")"}
          fontSize={14}
          textColor={Colors.THEME_GRAY}
          style={{marginTop: 5, marginBottom: 10}}
        />
        <Image
          source={require('assets/images/sign-contract-modal-bg.png')}
          style={styles.bg}
        />
        <MyButton
          text={'Visit website'}
          onPress={visitWebsite}
          style={styles.buttonStyle}
        />
        <MyButton
          text={'View Signed Contract'}
          onPress={viewSignedContract}
          style={styles.buttonStyle}
        />
        {/* <MyButton
          text={'Do you have another points to sell?'}
          onPress={gotoSellMorePoints}
          style={[styles.buttonStyle, {marginBottom: 0}]}
        /> */}
      </View>
    </Modal>
  );
};

export default SuccessfullySigned;
