//import : react components
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  Linking,
  Dimensions,
  Platform,
} from 'react-native';
import {CommonActions} from '@react-navigation/core';
//import : custom components
import MyText from 'components/MyText/MyText';
import CustomLoaderLogout from 'components/CustomLoader/CustomLoaderLogout';
//import : global
import {Colors, ScreenNames, Service} from '../../global/Index';
//import : styles
import {styles} from './CustomDrawerStyle';
//import : modal
//import : third parties
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
//import : redux
import {useSelector, useDispatch} from 'react-redux';
import {logOutUser, setUser} from 'src/reduxToolkit/reducer/user';
import {useDrawerStatus} from '@react-navigation/drawer';
import {WebView} from 'react-native-webview';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

const CustomDrawer = ({navigation}) => {
  //variables
  const userToken = useSelector(state => state.user.userToken);
  const isDrawerOpen = useDrawerStatus();
  const dispatch = useDispatch();
  //hook : states
  const [showLoader, setShowLoader] = useState(false);
  const [showLoaderLogout, setShowLoaderLogout] = useState(false);
  const [sideMenuData, setSideMenuData] = useState([]);
  //function : imp function
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //function : navigation function
  const closeDrawer = () => navigation.closeDrawer();

  
  const gotoWelcome = () =>
    CommonActions.reset({
      index: 1,
      routes: [{name: ScreenNames.WELCOME}],
  });
  // Saurabh Saneja August 16, 2023
  // if drawer open, call api to get side menu data
  useEffect(() => {
    console.log('userToken', userToken);
    if(isDrawerOpen === 'open'){
      getSideMenuData()
      checkTokenExpired()
    }
  }, [isDrawerOpen])
  const getSideMenuData = async () => {
    setShowLoader(true);
    try {
      const resp = await Service.getApiWithToken(userToken, Service.SIDE_MENU);
      console.log('getSideMenuData resp', resp?.data);
      if (resp?.status) {
        setSideMenuData(resp?.data?.data)
        console.log('socialmedia', Object.keys(resp?.data?.data?.socialmedia[0]));
        } else {
          Toast.show(resp.data.message, Toast.SHORT);
        }
      } catch (error) {
        console.log('error in getSideMenuData', error);
      }
      setShowLoader(false);
  };
  const checkTokenExpired = async () => {
    try {
      const resp = await Service.postApiWithToken(
        userToken,
        Service.CHECK_TOKEN_EXPIRY,
        {}
      );
      console.log('checkTokenExpired resp drawer', resp?.data);
      if (!resp?.data?.success) {
          Toast.show('Please login again', Toast.SHORT)
          closeDrawer();
          await AsyncStorage.clear();
          dispatch(logOutUser());
          navigation.dispatch(gotoWelcome)
      }
    } catch (error) {
      console.log('error in checkTokenExpired', error);
    }
  };  
  // Saurabh Saneja August 14, 2023
  // log out user (process: close drawer, go to welcome screen, delete user data from phone)
  const logout = async () => {
    setShowLoaderLogout(true);
    try {
      const resp = await Service.postApiWithToken(
        userToken,
        Service.LOGOUT,
        {}
      );
      console.log('logout resp', resp);
      if (resp?.data?.status) {
        // don't need to show message after successfully logging out
        // dispatch(showToast({text: resp.data.message}));
        closeDrawer();
        // gotoWelcome();
        navigation.dispatch(gotoWelcome)
        dispatch(logOutUser());
        // dispatch(clearCart());
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.log('error in logout', error);
    }
    setShowLoaderLogout(false);
  };
  const Mydelete = async () => {
    setShowLoaderLogout(true);
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.DELETE,
        {}
      );
      console.log('logout resp', resp);
      if (resp?.data?.status) {
       
        closeDrawer();
        navigation.dispatch(gotoWelcome)
        dispatch(logOutUser());
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.log('error in logout', error);
    }
    setShowLoaderLogout(false);
  };

  
  const gotoAboutUs = () => {
    gotoWebPage('https://www.timesharesimplified.com/about-us', 'About Us');
  };

  const gotoScheduleACall = () => {
    gotoWebPage('https://harmonizely.com/denise-mojnzf', 'Schedule A Call');
  };

  const gotoConciergeServices = () => {
    gotoWebPage(
      'https://www.timesharesimplified.com/concierge-ser',
      'Concierge Services',
    );
  };

  const gotoTermsConditions = () => {
    gotoWebPage(
      'https://www.timesharesimplified.com/terms-conditions',
      'Terms & Conditions',
    );
  };

  const gotoPrivacyPolicy = () => {
    gotoWebPage(
      'https://www.timesharesimplified.com/privacy-policy',
      'Privacy Policy',
    );
  };

  const gotoWebPage = (link, Name) => {
    navigation.navigate(ScreenNames.SIDE_MENU_LINKS, {link, Name});
  };

  const gotoTrainingVideos = () => {
    navigation.navigate(ScreenNames.TRAINING_VIDEOS);
  };

  const handleLinkPress = (item) => {
    if(item?.menu_title === 'Logout'){
      logout()
    } else if (item?.menu_title === 'Training Videos'){
      gotoTrainingVideos()
    } else {
      gotoWebPage(item?.menu_slug, item?.menu_title);
    }
  }

  const openSocialUrl = async (item) => {
    gotoWebPage(item.social_media_slug, item.social_media_name)
    return
    await Linking.openURL(url);
    return
    const supported = await Linking.canOpenURL(url);
    console.log('supported', supported);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }

  //UI
  return (
    <View style={styles.container}>
      <ScrollView>
      {/* <ScrollView contentContainerStyle={{paddingBottom: '20%'}}> */}
      <View style={styles.mainView}>
        <View style={styles.logoContainer}>
          <View style={styles.logoImage}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/images/splash-logo.png')}
            />
          </View>
          <TouchableOpacity
            style={styles.crossImage}
            onPress={() => {
              closeDrawer();
            }}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/images/close-circle.png')}
            />
          </TouchableOpacity>
        </View>
        
        {/* Saurabh Saneja August 16, 2023 show side menu data*/}
        {sideMenuData?.app_menu?.map((el, index)=> {
          return (
            <TouchableOpacity key={index?.toString()} style={styles.menuContainer} onPress={()=> {handleLinkPress(el)}}>
              {/* <View style={styles.menuImage}> */}
                <Image
                  // resizeMode="contain"
                  style={styles.iconImage}
                  source={{uri: el?.icon}}
                />
              {/* </View> */}
              <Text style={styles.menuLabel}>{el?.menu_title}</Text>
              <View style={styles.arrowImage}>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={require('../../assets/images/rightArrow.png')}
                />
              </View>
            </TouchableOpacity>
          )
        })}

    {Platform.OS=='ios' ? 
      <TouchableOpacity style={styles.menuContainer} onPress={Mydelete}>
          <View style={styles.menuImage}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/images/date-of-birth-icon.png')}
            />
          </View>
          <Text style={styles.menuLabel}>Delete Account</Text>
          <View style={styles.arrowImage}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/images/rightArrow.png')}
            />
          </View>
        </TouchableOpacity>
        : null }
        <TouchableOpacity style={styles.menuContainer} onPress={logout}>
          <View style={styles.menuImage}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/images/ts-logout.png')}
            />
          </View>
          <Text style={styles.menuLabel}>Logout</Text>
          <View style={styles.arrowImage}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../assets/images/rightArrow.png')}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* social media section*/}
      <View style={[styles.socialMediaContainer,{marginTop:'35%'}]}>
        {/* <Text style={styles.followText}>Follow Us!</Text> */}
        <Text style={{ color: Colors.THEME_GRAY,
    fontSize: 14,
    // textAlign: 'center',
    //marginLeft: 10,
    marginVertical:5,
    fontWeight: '500',}}>Follow Us!</Text>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          {sideMenuData?.socialmedia?.map((item, index) =>
          <TouchableOpacity key={index?.toString()} onPress={() => {openSocialUrl(item)}} style={{marginRight: 10}} >
            <Image
              resizeMode="contain"
              style={{width: 30, height: 30, marginRight: 3,borderRadius:20}}
              source={{uri: item.icon }}
            />
          </TouchableOpacity>
          )}
          {/* <TouchableOpacity onPress={() => {}} style={{marginRight: 10}} >
            <Image
              resizeMode="contain"
              style={{width: 25, height: 18, marginRight: 3}}
              source={require('../../assets/images/youTubeIcon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={{marginRight: 10}} >
            <Image
              resizeMode="contain"
              style={{width: 19, height: 19, marginRight: 3}}
              source={require('../../assets/images/instagramIcon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={{marginRight: 10}} >
            <Image
              resizeMode="contain"
              style={{width: 22, height: 18, marginRight: 3}}
              source={require('../../assets/images/twitterIcon.png')}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,alignItems:'center'}}>
      <Text style={{color:Colors.THEME_BLUE,marginLeft:15,marginTop:15,fontWeight:'600',fontSize:12}} onPress={()=>{Linking.openURL('https://www.timesharesimplified.com/privacy-policy')}}>Privacy Policy</Text>
      <Text style={{color:Colors.THEME_BLUE,marginLeft:15,marginTop:15,fontWeight:'600',fontSize:12}}>|</Text>
      <Text style={{color:Colors.THEME_BLUE,marginLeft:15,marginTop:10,fontWeight:'600',fontSize:12}} onPress={()=>{Linking.openURL('https://www.timesharesimplified.com/terms-conditions')}}>Terms and Conditions</Text>
      </View>
     
      {/* <Text style={styles.versionText}>App Version: V1.0.0.13</Text> */}
      {/* </ScrollView> */}
      <CustomLoader  showLoader={showLoader} />
      <CustomLoaderLogout showLoader={showLoaderLogout} />
      </ScrollView>
    </View>
  );
};

export default CustomDrawer;

export const DrawerItemList = ({Title = '', onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderTopWidth: 1,
        borderTopColor: Colors.LITE_GREY,
        width: '100%',
        paddingVertical: 15,
      }}>
      <MyText text={Title} fontFamily="medium" fontSize={16} />
    </TouchableOpacity>
  );
};
