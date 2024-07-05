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
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
//import : custom components
import MyText from 'components/MyText/MyText';
//import : globals
import {Colors, Constant, MyIcon, ScreenNames} from 'global/Index';
//import : styles
import {styles} from './ContractTermsStyle';
import MyButton from 'components/MyButton/MyButton';
import Toast from 'react-native-simple-toast';
import {interpolate} from 'react-native-reanimated';

const terms = [
  {
    id: '1',
    text: 'Your contract will only be accepted if we have enough time to rent out your points',
    isSelected: false,
  },
  // {
  //   id: '2',
  //   isSelected: false,
  //   text: 'You understand the only way to rent the points is for us to log into your account and make the reservations on your behalf',
  // },
  {
    id: '2',
    isSelected: false,
    text: 'You will be paid within two weeks of the guest checking into the reservation',
  },
  {
    id: '3',
    isSelected: false,
    text: 'We keep your password and account secure with Keeper Security',
  },
  {
    id: '4',
    isSelected: false,
    text: 'There is no cost to you at all! We handle evervthing from A-to-Z',
  },
  {
    id: '5',
    isSelected: false,
    text: 'You understand if we pay you upfront for points and there is a cancellation we have the right to reuse those points',
  },
  // {
  //   id: '6',
  //   isSelected: false,
  //   text: 'You understand once they email you they will start your account. The payments go out every two weeks for whatever points they used.',
  // },
  {
    id: '6',
    isSelected: false,
    text: 'You understand once they email you they will start your account. Then payments go out every two weeks for whatever points they used for a guest reservation that has checked in.',
  },
  {
    id: '7',
    isSelected: false,
    text: 'You understand we might not get the exact amount of points rented out sometime there is a small remainder of points',
  },
  {
    id: '8',
    isSelected: false,
    text: `You understand you're protected by our $1 million host guarantee insurance for vour bookings`,
  },
];

const ContractTerms = ({visible, setVisibility, gotoSignContract}) => {
  //variables : navigation
  const navigation = useNavigation();
  const myTextInput = useRef();
  const [term_condition, setTerm_Condition] = useState(terms);
  useEffect(() => {
    const data = [...term_condition];
    const filter_data = data.filter(item => item.isSelected == true);
    console.log('filter_data==', filter_data);

    if (filter_data.length == data.length) {
      setAreTermsSelected(true);
      console.log(filter_data.length);
    } else {
      setAreTermsSelected(false);
    }
  }, [term_condition]);
  const onPressSingeSelect = ele => {
    const data = [...term_condition];
    data.map((item, index) => {
      if (ele.id == item.id) {
        item.isSelected = !item.isSelected;
      }
    });
    setTerm_Condition(data);
  };
  const [areTermsSelected, setAreTermsSelected] = useState(false);
  //function : navigation function
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  const handleAccept = () => {
    if (!areTermsSelected) {
      Toast.show('Please select Contract Terms & Conditions', Toast.SHORT);
      return;
    }
    gotoSignContract();
  };
  const selectTerms = () => {
    const data = [...term_condition];
    data.map((item, index) => {
      if (areTermsSelected) {
        item.isSelected = false;
      } else {
        item.isSelected = true;
      }
    });
    setAreTermsSelected(!areTermsSelected);
  };
  const RenderTerm = ({text, isSelected, item}) => {
    return (
      <View style={styles.termRow}>
        <TouchableOpacity
          onPress={() => {
            onPressSingeSelect(item);
          }}
          style={styles.tickView}>
          <Image
            source={
              isSelected
                ? require('assets/images/blue-tick.png')
                : require('assets/images/grey-tick.png')
            }
          />
        </TouchableOpacity>
        <MyText
          text={text}
          textColor={Colors.THEME_GRAY}
          fontSize={14}
          lineHeight={20}
          fontFamily="medium"
          style={{width: '88%', textAlign: 'justify', paddingRight: 5}}
        />
      </View>
    );
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
      onModalWillHide={() => {
        setAreTermsSelected(false);
      }}
      scrollOffset={1}
      propagateSwipe={true}
      coverScreen={false}
      backdropColor="transparent"
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Image
          source={require('assets/images/small-logo.png')}
          style={{position: 'absolute', zIndex: 1, top: -55, left: 20}}
        />
        <MyText
          text="Contract Terms & Conditions"
          fontSize={24}
          fontFamily="medium"
          textColor={Colors.THEME_BLUE}
          style={{marginTop: 50}}
        />
        <MyText
          text="*All Terms Are Mandatory"
          fontSize={14}
          // textAlign="center"
          textColor={Colors.THEME_GRAY}
          style={{marginTop: 5, marginBottom: 15}}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {term_condition?.map(el => {
            return (
              <RenderTerm
                isSelected={el?.isSelected}
                key={el.id}
                text={el.text}
                item={el}
              />
            );
          })}
        </ScrollView>

        <TouchableOpacity onPress={selectTerms} style={styles.btnStyle}>
          <View style={styles.tickView}>
            <Image
              source={
                areTermsSelected
                  ? require('assets/images/blue-tick.png')
                  : require('assets/images/grey-tick.png')
              }
            />
          </View>
          <MyText
            text="Select All"
            textColor={Colors.THEME_BLUE}
            fontSize={14}
            fontFamily="medium"
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
        <View style={styles.btnContainerStyle}>
          <MyButton
            text={'Accept'}
            onPress={handleAccept}
            style={styles.buttonStyle}
          />
          <MyButton
            text={'Cancel'}
            onPress={() => setVisibility(false)}
            style={styles.buttonStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ContractTerms;
