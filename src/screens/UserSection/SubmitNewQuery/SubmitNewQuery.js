//import : react componentsbannerImage
import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import MyHeader from 'components/MyHeader/MyHeader';
//import : styles
import {styles} from './SubmitNewQueryStyle';
import {Colors, Service} from '../../../global/Index';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import MyButton from 'components/MyButton/MyButton';
import QuerySubmittedModal from '../../../modals/QuerySubmittedModal/QuerySubmittedModal';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import Toast from 'react-native-simple-toast';
import { getFormattedPhoneNumber } from '../../../global/Constant';

const SubmitNewQuery = ({navigation}) => {
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [phone, setPhone] = useState(userInfo?.contact);
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const emailRef = useRef();
  const phoneRef = useRef();
  const descriptionRef = useRef();

  const goBack = () => {
    navigation.goBack();
  };

  const openModal = () => {
    setShowModal(true);
  };
  // Saurabh Saneja August 14, 2023
  // validating that form fields are not empty before sending data to api
  const Validation = () => {
    if(name?.trim()?.length === 0){
      Toast.show(`Please enter Full Name`, Toast.SHORT)
      return false
    } 
    // else if(email?.trim()?.length === 0){
    //   Toast.show(`Please enter Email Address`, Toast.SHORT)
    //   return false
    // } 
    else if(phone?.trim()?.length === 0){
      Toast.show(`Please enter Phone`, Toast.SHORT)
      return false
    } else if(description?.trim()?.length === 0){
      Toast.show(`Please enter Message`, Toast.SHORT)
      return false
    }
    return true
  }
  // Saurabh Saneja August 14, 2023
  // send new query data to api
  const onSubmitQuery = async () => {
    if (Validation()) {
      setShowLoader(true);
      try {
        const postData = new FormData();
        postData.append('user_id', userInfo?.id);
        postData.append('name', name);
        postData.append('email', userInfo?.email);
        postData.append('contact', phone);
        postData.append('message', description);
        console.log('onSubmitQuery postData', postData);
        const resp = await Service.postApiWithToken(userToken, Service.SUBMIT_NEW_QUERY, postData);
        console.log('onSubmitQuery resp', resp);
        if (resp?.status) {
          openModal()
          setTimeout(() => {
            setShowModal(false);
            navigation.goBack();
          }, 5000);
        } else {
          Toast.show(resp.message, Toast.SHORT);
        }
      } catch (error) {
        console.log('error in onSubmitQuery', error);
      }
      setShowLoader(false);
    }
  };

  return (
    <LinearGradient
      colors={['#0C8AFF65', '#0C8AFF83', '#0C8AFF65']}
      style={styles.container}>
      <View style={styles.container}>
        <MyHeader Title="Submit New Query" />
        {/* banner image section */}
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: '20%',
              // paddingHorizontal: 20,
            }}>
        <View style={styles.bannerImage}>
          <View style={styles.bannerImage}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../../assets/images/help-and-support-bg.png')}
            />
          </View>
          {/* fixed tab */}
          <View style={styles.fixedContainer}>
            <Image
              source={require('assets/images/small-logo.png')}
              style={{position: 'absolute', top: -70}}
            />
            <Image
              resizeMode="contain"
              style={{height: 64, width: 64, borderRadius: 35, marginTop: 40}}
              source={require('../../../assets/images/getInTouchImage.png')}
            />
            <View style={{marginTop: 40}}>
              <Text style={styles.headerText}>Get In Touch</Text>
              <Text style={styles.subheaderText}>
                If You Have Any Query Related To Point Share
              </Text>
            </View>
          </View>
        </View>

            <View style={{paddingHorizontal:20}}>
            <MyTextInput
              placeholder={'Full Name'}
              value={name}
              setValue={setName}
              onSubmitEditing={() => emailRef.current.focus()}
              editable={false}
              isIcon
              icon={require('assets/images/name-icon.png')}
              style={{marginTop: 70}}
            />
            <MyTextInput
              inputRef={emailRef}
              placeholder={'Email Address'}
              value={email}
              setValue={setEmail}
              isIcon
              editable={false}
              icon={require('assets/images/email-icon.png')}
              onSubmitEditing={() => phoneRef.current.focus()}
            />
            <MyTextInput
              inputRef={phoneRef}
              placeholder={'Phone'}
              value={phone}
              setValue={setPhone}
              editable={false}
              isIcon
              icon={require('assets/images/phone-icon.png')}
              onSubmitEditing={() => descriptionRef.current.focus()}
              keyboardType="number-pad"
              
            />
            {/* description section */}
            <TextInput
              placeholder="Type your Message Here…"
              placeholderTextColor={Colors.LIGHT_GRAY}
              style={styles.descriptionInput}
              value={description}
              numberOfLines={3}
              multiline={true}
              textAlignVertical="top"
              onChangeText={text => setDescription(text)}
            />
            {/* submit button section */}
            <MyButton
              text={'Send Message'}
              // onPress={openModal}
              onPress={onSubmitQuery}
              style={styles.loginStyle}
            />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <QuerySubmittedModal
          visible={showModal}
          setVisibility={setShowModal}
          visitWebsite={() => {}}
        />
      <CustomLoader showLoader={showLoader} />
      </View>
    </LinearGradient>
  );
};

export default SubmitNewQuery;
