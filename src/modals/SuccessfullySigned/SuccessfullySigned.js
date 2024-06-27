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
import {Colors, Constant, MyIcon, ScreenNames,Service} from 'global/Index';
//import : styles
import {styles} from './SuccessfullySignedStyle';
import MyButton from 'components/MyButton/MyButton';
// import {Colors, Constant, MyIcon, ScreenNames, Service} from '../../../global/Index';
import {connect, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {width} from '../../global/Constant';

const SuccessfullySigned = ({
  visible,
  setVisibility,
  viewSignedContract,
  visitWebsite,
  davename,
  gotoSellMorePoints,
  point
}) => {
  //variables : navigation
  const navigation = useNavigation();
  const myTextInput = useRef();
  //function : navigation function
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  const [videoData, setVideoData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showLoader2, setShowLoader2] = useState(false);
  const userToken = useSelector(state => state.user.userToken);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getVideos();
    });
    
    return unsubscribe;
  }, [navigation]);



  const getVideos = async () => {
    console.log('setVideoData resp');
    setShowLoader2(true);
    try {
      const resp = await Service.getApiWithToken(userToken, Service.VIDEOS);
      console.log('setVideoData resp', resp?.data);
      if (resp?.data?.status) {
        setVideoData(resp?.data?.allvideos);
      } else {
        // Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in setVideoData', error);
    }
    setShowLoader2(false);
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
         <MyText
          text={"Congratulations. You’re on your way to monetizing your timeshare points!"}
          fontSize={14}
          textColor={Colors.THEME_GRAY}
          style={{marginTop: 5, marginBottom: 10}}
        />
        <MyText
        text={`You are now in our queue with number ${point} and we will notify you as you get closer to us using your account!`}
        fontSize={14}
        textColor={Colors.THEME_GRAY}
        style={{marginTop: 5, marginBottom: 10}}
      />
      <MyText
      text={"Once your account has been started payment go out every two weeks for whatever guest Reservation checks in during that time."}
      fontSize={14}
      textColor={Colors.THEME_GRAY}
      style={{marginTop: 5, marginBottom: 10}}
    />
        {/* <Image
          source={require('assets/images/sign-contract-modal-bg.png')}
          style={styles.bg}
          {"multicast_id":989924197124312191,"success":1,"failure":0,"canonical_ids":0,"results":[{"message_id":"1715681236654934"}]}{"status":true,"message":"Contract signed  successfully.","waiting_number":204}
        /> */}
        {/* {videoData?.length > 0 ? ( */}
        {true ? (
          <View style={{ width: '100%',
            height: 219,
            borderRadius: 10,
            overflow: 'hidden',marginBottom:10}}>
            <WebView
              source={{
                // uri: videoData[0]?.url_link,
                uri: 'https://drive.google.com/file/d/1lrHeq9lp5kr8-OqLVPqfkJ1DMajwDmMN/view?usp=sharing'
              }}
              contentMode="mobile"
              style={{ width: '100%',
                height: 219,
                opacity: 0.99,}}
            />
          </View>
        ) : (
          <View style={{marginTop: 10, alignItems: 'center'}}>
            <Image source={require('../../assets/images/no-data.png')} />
            <MyText
              text="No Videos found"
              textColor={Colors.THEME_GRAY}
              fontSize={16}
              fontFamily="medium"
              textAlign="center"
              style={{marginTop: 10}}
            />
          </View>
        )}
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
