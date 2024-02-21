//import : react components
import React from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
//import : custom components
import MyText from '../../../components/MyText/MyText';
//import : third parties
import {useNetInfo} from '@react-native-community/netinfo';
//import : globals
import {Colors, ScreenNames} from '../../../global/Index';
//import : redux
import {useDispatch, useSelector} from 'react-redux';
// import {CustomToastAction} from '../../redux/actions/actions';
import Toast from 'react-native-simple-toast';
import MyButton from '../../../components/MyButton/MyButton';

// saurabh saneja, 7 sept, 2023   show this screen if no internet
const NoConnection = ({navigation}) => {
  //variables
  const {isConnected, isInternetReachable} = useNetInfo();
  const userToken = useSelector(state => state.user.userToken);
  const dispatch = useDispatch();
  const resetIndexGoBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  const resetIndexGoToWelcome = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.WELCOME}],
  });
  //function
  const checkConnectivity = () => {
    if (isInternetReachable) {
      if (userToken === '') {
        navigation.dispatch(resetIndexGoToWelcome);
      } else {
        navigation.dispatch(resetIndexGoBottomTab);
      }
    } else {
      Toast.show(
        'Please check your internet connection and try again!',
        Toast.SHORT,
      );
      // Alert.alert('Please check your internet connection and try again!')
      // dispatch(
      //   CustomToastAction.showToast(
      //     'Please check your internet connection and try again!',
      //   ),
      // );
    }
  };
  const gotoWhichScreen = () => {
    return userToken === '' ? 'Go to Welcome' : 'Go to Home'
  }
  //UI
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
        }}>
        <Image
          resizeMode="contain"
          source={require('assets/images/nonetwork.png')}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
        <MyText
          text={'No internet connection !!'}
          fontFamily="black"
          fontSize={20}
          marginVertical={20}
        />
        <MyButton
          text={gotoWhichScreen()}
          onPress={checkConnectivity}
        />
      </View>
    </View>
  );
};

export default NoConnection;
