//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Keyboard,TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
//import : custom components
import MyHeader from 'components/MyHeader/MyHeader';
import MyText from 'components/MyText/MyText';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
//import : global
import {Colors, Constant, MyIcon, ScreenNames, Service} from '../../../global/Index';
//import : styles
import {styles} from './EditProfileStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'components/Divider/Divider';
import {WebView} from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';
import moment from 'moment';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import SelectImageSource from '../../../modals/SelectImageSource/SelectImageSource';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextInputWithFlag from '../../../components/TextInputWithFlag/TextInputWithFlag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../../../reduxToolkit/reducer/user';
import axios from 'axios';

const userImg = `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60`;

const EditProfile = ({navigation, dispatch}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [phone, setPhone] = useState(userInfo?.contact || '');
  const [showImageSourceModal, setShowImageSourceModal] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'US',
    dial_code: '+1',
    flag: '🇺🇸',
    name: {
      by: '',
      cz: 'Spoj  ené státy',
      en: 'United States',
      es: 'Estados Unidos',
      pl: 'Stany Zjednoczone',
      pt: 'Estados Unidos',
      ru: 'Соединенные Штаты',
      ua: 'Сполучені Штати',
    },
  });
  const emailRef = useRef();
  const phoneRef = useRef();
  const [phonecolor,setphonecolor]=useState('#000');

useEffect(()=>{
  if(userInfo?.contact){
    formatPhoneNumber(userInfo?.contact)
  }
  
},[])

  const verifyContact = async (txt) => {
    // setShowLoader(true);
    const postData = new FormData();
    postData.append('contact', txt);
    try {
      const resp = await Service.postApi(`${Service.CHECK_CONTACT}`, postData);
      console.log('============resp========================');
      console.log(resp?.data?.status);
      console.log('====================================');
      if (resp?.data?.status) {
        setphonecolor('#000')
        
      } else {
        setphonecolor('red')
       
      }
      
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);

      console.log(error);
    }
  };

  const formatPhoneNumber = input => {
    // Remove all non-numeric characters
    const cleanedInput = input.replace(/\D/g, '');

    // Format the number in (XXX) XXX-XXXX
    const formattedNumber = cleanedInput.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3',
    );
  
    setPhone(formattedNumber);
  };
  const validation = () => {
    if (name?.trim()?.length === 0) {
      Toast.show('Please enter Name', Toast.SHORT);
      return false;
    } else if (phone?.trim()?.length === 0) {
      Toast.show('Please enter Phone Number', Toast.SHORT);
      return false;
    } else if (phone?.trim()?.length < 10) {
      Toast.show('Phone Number should be 10 digits long', Toast.SHORT);
      return false;
    }
    return true;
  };
  const updateProfile = async () => {
    if (!validation()) {
      return;
    }
   
      const formdata = new FormData();
      // formdata.append('id', userInfo?.id);
      formdata.append('name', name);
      formdata.append('contact', phone);
      formdata.append('address', userInfo?.address);
      formdata.append('status', '1');
      if (filePath != '') {
        // const imageName = filePath.path.slice(
        //   filePath.path.lastIndexOf('/'),
        //   filePath.path.length,
        // );
      formdata.append('profile_img',{
          name: filePath.fileName,
          type: filePath.type,
          uri: filePath.uri,
        }
        );
      }
 
      setShowLoader(true);
      try {
        let response = await fetch('http://35.155.124.107/api/users/update_profile', {
        method: 'POST',
          body:formdata,
          headers : {'Content-Type': 'multipart/form-data','Accept':'application/json','Authorization': 'Bearer '+ userToken,'Cache-Control': 'no-cache'},
        }
        )
        setShowLoader(false);
        let code = await response.status
        console.log(code)   
        if(code==200){
          let responseJson = await response.json();
          console.log('====================================');
          console.log(responseJson);
          console.log('====================================');
        const jsonValue = JSON.stringify(responseJson?.data);
        await AsyncStorage.setItem('userInfo', jsonValue);
        dispatch(setUser(responseJson?.data));
        navigation.goBack();
         
        }else{
          let coddatasse = await response.json()
          console.log(coddatasse)   
        }
      } catch (error) {
        console.error(error);
        
      }

    setShowLoader(false)
  };

  //function : imp function
  const openCamera = () => {
    const options = {
      width: 1080,
      height: 1080,
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 1,
      compressImageMaxHeight: 1080 / 2,
      compressImageMaxWidth: 1080 / 2,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        // Alert.alert('User cancelled camera picker');
        setShowImageSourceModal(false);
        // dispatch(showToast({text: 'User cancelled picking image'}));
        // Alert.alert('User cancelled picking image');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        setShowImageSourceModal(false);
        // dispatch(showToast({text: 'Camera not available on device'}));
        // Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        setShowImageSourceModal(false);
        // dispatch(showToast({text: 'Permission not satisfied'}));
        // Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        setShowImageSourceModal(false);
        // dispatch(showToast({text: response.errorMessage}));
        // Alert.alert(response.errorMessage);
        return;
      }
      console.log('Response = ', response.assets[0]);
      setFilePath(response.assets[0]);
      setShowImageSourceModal(false);
    });
  };
  //function : imp function
  const checkCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      openCamera();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to access camera',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openCamera();
          console.log('Storage Permission Granted.');
        } else {
          Toast.show(`Storage Permission Not Granted`, Toast.SHORT);
          // Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('ERROR' + err);
      }
    }
  };
  //function : imp function
  const openLibrary = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // Alert.alert('User cancelled camera picker');
        setShowImageSourceModal(false);
        Toast.show('User cancelled image picker', Toast.LONG);
        // Alert.alert('User cancelled image picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        setShowImageSourceModal(false);
        Toast.show('Camera not available on device', Toast.LONG);
        // Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        setShowImageSourceModal(false);
        Toast.show('Permission not satisfied', Toast.LONG);
        // Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        setShowImageSourceModal(false);
        Toast.show(response.errorMessage, Toast.LONG);
        // Alert.alert(response.errorMessage);
        return;
      } else {
        setFilePath(response.assets[0]);
        setShowImageSourceModal(false);
      }
      setShowImageSourceModal(false);
    });
  };

  //UI
  return (
    <View style={styles.container}>
      <MyHeader Title="Edit Profile" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '20%', padding: 20}}>
        {filePath == '' ? (
          <View style={styles.imageViewStyle}>
            <Image
              resizeMode="contain"
              borderRadius={100}
              source={
                userInfo.profile_pic == '' || userInfo.profile_pic == null
                  ? require('../../../assets/images/user-default.png')
                  : {uri: userInfo.profile_pic}
              }
              // source={require('assets/images/user-default.png')}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setShowImageSourceModal(true);
              }}
              style={styles.addButtonStyle}>
              <MyIcon.AntDesign
                name="plus"
                color={Colors.THEME_BLUE}
                size={20}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageViewStyle}>
            <Image
              resizeMode="cover"
              borderRadius={100}
              source={{uri: filePath.uri}}
              style={{height: '100%', width: '100%'}}
            />
            <TouchableOpacity
              onPress={() => setFilePath('')}
              style={styles.deleteButtonStyle}>
              <MyIcon.MaterialIcons
                name="delete"
                color={Colors.THEME_BLUE}
                size={20}
              />
            </TouchableOpacity>
          </View>
        )}
        <MyTextInput
          placeholder={'Full Name'}
          value={name}
          setValue={setName}
          onSubmitEditing={() => emailRef.current.focus()}
          isIcon
          icon={require('assets/images/name-icon.png')}
          style={{marginTop: 10}}
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


<View style={{
   flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
    borderRadius: 10,
    shadowColor: '#0089CF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 2,}}>
      <View style={{ flexDirection: 'row',
    alignItems: 'center',}}>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyText text={selectedCountry.flag ? selectedCountry.flag :'🇺🇸'} />
          <MyIcon.AntDesign name="caretdown" color='black' style={{marginHorizontal: 10}} />
        </TouchableOpacity>

        <View style={{borderLeftWidth: 0.5, height: 24, marginRight: 10}} />
        <MyText text={selectedCountry.dial_code?selectedCountry.dial_code:'+1'} marginHorizontal={10} />
      
        <TextInput
          ref={phoneRef}
           value={phone}
          allowFontScaling={false}
          // editable={userInfo.contact?false:true}
          placeholder={'Enter Phone Number'}
          placeholderTextColor={'#c9c9c9'}
          onChangeText={(txt)=>{
            formatPhoneNumber(txt)
            // setPhone(txt)
            verifyContact(txt);
          }}
          style={{color:phonecolor}}
          maxLength={Platform.OS == 'android' ? 14 : 10}
          keyboardType="number-pad"
          // color={Colors.BLACK}
        />
       
      </View>
     
    </View>


        {/* <TextInputWithFlag
          inputRef={phoneRef}
          value={phone}
          Flag={selectedCountry.flag}
          CountryCode={selectedCountry.dial_code}
          placeholder="Enter Phone Number"
          keyboardType="number-pad"
          maxLength={Platform.OS == 'android' ? 14 : 10}
          onPress={() => setShow(true)}
          onChangeText={text => {
            setPhone(text)
          }}
          onSubmitEditing={() => passwordRef.current.focus()}
        /> */}
        <MyButton
          text={'Save Changes'}
          onPress={updateProfile}
          style={styles.buttonStyle}
        />
      </ScrollView>
      <SelectImageSource
        visible={showImageSourceModal}
        setVisibility={setShowImageSourceModal}
        openLibrary={openLibrary}
        openCamera={checkCameraPermission}
      />
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(EditProfile);
