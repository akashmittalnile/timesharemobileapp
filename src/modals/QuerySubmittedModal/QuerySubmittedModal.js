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
import {styles} from './QuerySubmittedModalStyle';
import MyButton from 'components/MyButton/MyButton';

const QuerySubmittedModal = ({visible, setVisibility, visitWebsite}) => {
  //variables : navigation
  const navigation = useNavigation();
  const myTextInput = useRef();
  //function : navigation function
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
    navigation.goBack()
  };
  //UI
  return (
    <Modal
      isVisible={visible}
      swipeDirection="down"
      onBackdropPress={() => setVisibility(false)}
      onSwipeComplete={e => {
        setVisibility(false);
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
          style={{position: 'absolute', zIndex: 1, top: -70, left: 10}}
        />
        <MyText
          text="Great!"
          fontSize={24}
          fontFamily="medium"
          textColor={Colors.THEME_BLUE}
          style={{marginTop: 5}}
        />
        <MyText
          text={
            'We Have Got Your Response And We Will\nGet Back To You Shortly'
          }
          fontSize={14}
          textColor={Colors.THEME_GRAY}
          // textAlign="center"
          style={{marginTop: 5, marginBottom: 5}}
        />
        <MyText
          text={'You Can Visit Us Online At'}
          fontSize={12}
          textColor={'#BCBBB7'}
          textAlign="center"
          style={{marginBottom: 20}}
        />
        <MyButton
          text={'Visit website'}
          onPress={visitWebsite}
          style={styles.buttonStyle}
        />
        <MyButton
          text={'Close'}
          onPress={closeModal}
          style={[styles.buttonStyle, {marginBottom: 0}]}
        />
      </View>
    </Modal>
  );
};

export default QuerySubmittedModal;
