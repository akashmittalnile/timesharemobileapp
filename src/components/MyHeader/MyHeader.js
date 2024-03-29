//import : react components
import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Image, Keyboard, Text } from 'react-native';
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
  CommonActions,
} from '@react-navigation/native';
//import : custom components
import MyText from 'components/MyText/MyText';
//import : global
import { Colors, Images, MyIcon, ScreenNames, Service } from 'global/Index';
//import : styles
import { styles } from './MyHeaderStyle';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { logOutUser } from 'src/reduxToolkit/reducer/user';

const MyHeader = ({ Title, isMenu = false, style = {} }) => {
  //variables
  const navigation = useNavigation();
  const userToken = useSelector(state => state.user.userToken);
  const ICON_SIZE = 30;
  const userInfo = useSelector(state => state.user.userInfo);
  const userNotifications = useSelector(state => state.user.userNotifications);
  const [notificationData,setnotificationData]=useState('')
  const dispatch = useDispatch();

  useFocusEffect(
  
    useCallback(() => {
      getNotification()
      const checkTokenExpired = async () => {
        try {
          console.log('header userToken', userToken);
          const resp = await Service.postApiWithToken(
            userToken,
            Service.CHECK_TOKEN_EXPIRY,
            {}
          );
          console.log('checkTokenExpired resp header', resp?.data);
          if (!resp?.data?.success) {
              Toast.show('Your session has expired. Please login again', Toast.SHORT)
              await AsyncStorage.clear();
              dispatch(logOutUser());
              navigation.dispatch(resetIndexGoToWelcome);
            }
        } catch (error) {
          console.log('error in checkTokenExpired', error);
        }
      };
      checkTokenExpired();
      return () => {};
    }, []),
  );
  const getNotification = async () => {
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.GET_NOTIFICATION,
      );
      console.log('================notification', resp.data)
      // );
      if (resp?.data?.status) {
        setnotificationData(resp.data.total_notification);
      }

    } catch (error) {
      console.log(error);
  
    }
  };
  const resetIndexGoToWelcome = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.WELCOME}],
  });
  //function : navigation function
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());
  const goBack = () => navigation.goBack();
  const gotoMyProfile = () => navigation.navigate(ScreenNames.PROFILE);
  const gotoNotifications = () => navigation.navigate(ScreenNames.NOTIFICATIONS);
  const userImg = `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60`
  //UI
  return (
    // <View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 15,
        backgroundColor: Colors.THEME_BLUE,
        zIndex: 1,
        shadowColor: Colors.THEME_BLUE,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 2,
        ...style
      }}>

      {isMenu ?
        <TouchableOpacity onPress={openDrawer} style={{ flex: 1 }} >
          <Image source={require('assets/images/list.png')} resizeMode='contain' />
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={goBack} style={{ flex: 0.7 }} >
          <Image source={require('assets/images/arrow-left.png')} resizeMode='contain' />
        </TouchableOpacity>
      }

      <View style={[{ flex: 2.6, alignItems: 'center' },]}>
        <MyText text={Title} textColor='white' fontSize={16} fontFamily='medium' />
      </View>

      <View style={[styles.rightContainer, { flex: 1 }]}>
        <TouchableOpacity onPress={gotoNotifications}>
          {notificationData > 0 ?
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: -5,
                height: 15,
                width: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F1FFF4',
                borderRadius: 100,
              }}>
              <MyText text={notificationData} fontSize={10} textColor="black" />
            </View> : null}
          <Image source={require('assets/images/bell.png')} resizeMode='contain' style={{ marginBottom: 0, right: -7 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoMyProfile}>
          <Image source={userInfo?.profile_pic ? {uri: userInfo?.profile_pic} : require('assets/images/user-default.png')} resizeMode='contain' style={styles.profileImageStyle} />
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};

export default MyHeader;
