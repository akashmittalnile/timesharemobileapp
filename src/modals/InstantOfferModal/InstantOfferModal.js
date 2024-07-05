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
import {styles} from './InstantOfferModalStyle';
import MyButton from 'components/MyButton/MyButton';

const InstantOfferModal = ({visible, setVisibility, handleNext, amount, points, handleReject}) => {
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
          text={`Here's Your Instant Offer!*`}
          fontSize={24}
          fontFamily="medium"
          textColor={Colors.THEME_BLUE}
          style={{marginTop: 60}}
        />
        <MyText
          text="*Some Terms May Apply According To Your Anniversary Date"
          fontSize={14}
          // textAlign="center"
          textColor={Colors.THEME_GRAY}
          style={{marginTop: 5, marginBottom: 15}}
        />
        <View style={[styles.resultsView, {marginBottom: 10}]}>
          <MyText
            text={`Result $${amount}`}
            textColor={Colors.THEME_BLUE}
            fontSize={18}
            fontFamily="medium"
          />
        </View>
        <Text style={styles.longText}>
          You Can Receive ${amount} By Renting Out{' '}
          <Text style={{color: Colors.THEME_BLUE}}>{getFormattedNumber(points)} Pts</Text> These
          Unused Points With Us!
        </Text>
        <MyButton
          text={'Accept'}
          onPress={handleNext}
          style={styles.buttonStyle}
        />
        <MyButton
          text={'Reject'}
          isWhite
          onPress={handleReject}
          style={[styles.buttonStyle, {marginBottom: 0}]}
        />
      </View>
    </Modal>
  );
};

export default InstantOfferModal;

const getFormattedNumber = (num) => {
  const formattedNumber = Number(num).toLocaleString("en-US");
  // console.log(formattedNumber); // 1,234,567,890
  return formattedNumber
}
