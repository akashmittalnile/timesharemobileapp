//import : react components
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  PermissionsAndroid,
  TextInput,Alert,AppRegistry,
} from 'react-native';
import {Colors, Images, MyIcon, ScreenNames} from '../../../global/Index';
import LinearGradient from 'react-native-linear-gradient';
//import : styles
import {styles} from './Signup1Style';
import MyText from 'components/MyText/MyText';
import MyButton from '../../../components/MyButton/MyButton';
import WelcomeHeader from '../../../components/WelcomeHeader/WelcomeHeader';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import SuccessSignUpModal from '../../../modals/SuccessSignUpModal/SuccessSignUpModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser, setUserToken} from 'src/reduxToolkit/reducer/user';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import {Service} from '../../../global/Index';
import TextInputWithFlag from '../../../components/TextInputWithFlag/TextInputWithFlag';
import {CountryPicker} from 'react-native-country-codes-picker';
import {height} from '../../../global/Constant';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '../../../webapi/webapi';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectImageSource from '../../../modals/SelectImageSource/SelectImageSource';
import {GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
 import {AccessToken,AuthenticationToken,LoginManager,Profile,Settings,GraphRequest, GraphRequestManager} from 'react-native-fbsdk-next';
 import auth from '@react-native-firebase/auth';
 import { appleAuth } from '@invertase/react-native-apple-authentication';
 import {CommonActions} from '@react-navigation/native';

const Signup1 = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  const [isNameCorrect, setIsNameCorrect] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isContactCorrect, setIsContactCorrect] = useState(false);
  const [nameedit,setnameedit]=useState(true)
  const [emailedit,setemailedit]=useState(false)
  const [phoneedit,setphoneedit]=useState(false) 
  const [passedit,setpassedit]=useState(false)
  const [namecolor,setnamecolor]=useState('#000')
  const [emailcolor,setemailcolor]=useState('#000')
  const [phonecolor,setphonecolor]=useState('#000')
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
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [latLng, setLatLng] = useState('');
  const [showImageSourceModal, setShowImageSourceModal] = useState(false);
  const [filePath, setFilePath] = useState('');

  const [stateText, setStateText] = useState('');
  const [dataSource, setDataSource] = useState();

  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();
  const googleSearchRef = useRef();

  useEffect(() => {

      
    checkToken();
    GoogleSignin.configure({
      webClientId: '364398567313-l0dim3kg2a6equ98r234gl24ilbkr9i1.apps.googleusercontent.com',
      offlineAccess: true,
    });
   
  }, []);

  useEffect(() => {
    if(Platform.OS=='ios'){
         return appleAuth.onCredentialRevoked(async () => {
          console.warn('If this function executes, User Credentials have been Revoked');
    });
    }
 
  }, []); 
  // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();

      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      await auth().signInWithCredential(credential);
      console.log(userInfo);
      //  await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();
      SosalloginUser(userInfo?.user,2)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in process
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
      } else {
        // Some other error
        console.error('error',error.message);
      }
    }
  };
  const initUser = async () => {
    try{
   const tokenObj = await AccessToken.getCurrentAccessToken();
   console.log('==========tokenObj==========================');
   console.log(tokenObj);
   console.log('====================================');
    const infoRequest = new GraphRequest(
        '/me',
        {
            accessToken: tokenObj.accessToken,
            parameters: {
                fields: {
                    string: 'email,name,first_name,middle_name,last_name,gender,address,picture.type(large)',
                },
            },
        },
        this.infoResponseCallback,
    );
   new GraphRequestManager().addRequest(infoRequest).start()
}catch(err){
    console.log("user error",err)
}

infoResponseCallback = (error,success) =>{
    if(error){
          console.log("eeeeeeeeeee",error)
    }else{
          console.log('sssssssssss',success)
           SosalloginUser(success,3)
    }
}
  }
  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        console.log('Facebook login canceled');
      } else {
        console.log('Facebook login success', result);
               if (Platform.OS === 'ios') {
              AuthenticationToken.getAuthenticationTokenIOS().then(res => {
                console.log('ios token',res?.authenticationToken);
                initUser(res?.authenticationToken)
         
              });
            }else{
                const data = await AccessToken.getCurrentAccessToken();
                console.log('Access Token:', data.accessToken);
                initUser(data.accessToken)
            }
      

        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
      }
    } catch (error) {
      console.log('Error during Facebook login:', error);
    }

    // try {

    //   LoginManager.logInWithPermissions(['public_profile']).then(
    //     (result) => {
    //       if (result.isCancelled) {
    //         console.log('Login Cancelled ' + JSON.stringify(result));
    //       } else {
    //         console.log(
    //           'Login success with permissions: ' +
    //             result.grantedPermissions.toString(),
    //         );

    //         if (Platform.OS === 'ios') {
    //           AuthenticationToken.getAuthenticationTokenIOS().then(res => {
    //             console.log('ios token',res?.authenticationToken);
    //             initUser(res?.authenticationToken)
         
    //           });
    //         } else {
    //           AccessToken.getCurrentAccessToken().then(res => {
    //             console.log('access token', res?.accessToken.toString());

    //             Profile.getCurrentProfile().then((currentProfile) => {
                  
    //               console.log('====================================');
    //               console.log(currentProfile);
    //               console.log('====================================');
                  
    //             });
    //           });
    //         }
    //       }
    //     },
    //   );
    // } catch (error) {
    //   console.log('Login failed with error: ' + error);
    // }
  };
  const onAppleButtonPress=async()=>{
//     appleAuth.onCredentialRevoked(async () => {
//       console.warn('If this function executes, User Credentials have been Revoked');
// })
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
    console.log('====================================ashish');
    console.log(appleAuthRequestResponse);
   
    var mydd={...appleAuthRequestResponse,name:appleAuthRequestResponse.fullName.givenName,id:appleAuthRequestResponse.user}
  
   console.log('============================mydd========',mydd);
   SosalloginUser(mydd,4)
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    return auth().signInWithCredential(appleCredential);
  }

  const SosalloginUser = async (datas,typ) => {
   
    setShowLoader(true);
    try {
      const postData = new FormData();
      postData.append('name', datas?.name);
      postData.append('email', datas?.email);
      postData.append('login_type', typ);
      postData.append('fcm_token', fcmToken);
      postData.append('status', 1);
      postData.append('auth_id', datas?.id);
      postData.append('check_login', 'register');
      console.log('signUpUser postData', postData);
      const resp = await Service.postApi(Service.SOSALLOGIN, postData);
      console.log('signUpUser resp', resp);
      if (resp?.data?.status) {
        await AsyncStorage.setItem('userToken', resp?.data?.access_token);
        const jsonValue = JSON.stringify(resp?.data?.data);
        console.log('sign in jsonValue', resp?.data);
        await AsyncStorage.setItem('userInfo', jsonValue);
        dispatch(setUserToken(resp?.data?.access_token));
        dispatch(setUser(resp?.data?.data));
        navigation.dispatch(resetIndexGoToBottomTab);
        // navigation.navigate(ScreenNames.SIGN_UP_2, {
        //   filePath,
        //   name,
        //   email,
        //   phone,
        //   password,
        //   address,
        // });
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in signInUser', error);
    }
    setShowLoader(false);


   };
   const resetIndexGoToBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  useEffect(() => {
    if (stateText?.length > 0 && dataSource?.length > 0) {
      if (addressRef.current) {
        addressRef.current.scrollTo({y: 230, animated: true});
      }
    }
  }, [stateText, dataSource]);
  const gotoLogin = () => navigation.navigate(ScreenNames.DRIVER_LOG_IN);
 
  const checkToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('fcm token', token);
        setFcmToken(token);
      } else {
        console.log('could not get fcm token');
      }
    } catch (error) {
      console.log('error in getting fcm token', error);
    }
  };
  const gotoSignUP2 = async () => {
    if(namecolor=='#000' && emailcolor=='#000' && phonecolor=='#000' && password!=''){
      try {
      console.log('postData=====');
      if (!Validation()) {
        return;
      }
      if (checkPwd(password)) {
        signUpUser();
      
      }
     
    } catch (error) {
      console.log(error);
    } 
    }else{
      // dispatch(setUserToken('623|nGdZ7qjNSr27zso40sMPxTB1TRT2JdLIcqI60GPk'));
      //   dispatch(setUser('Ashis'));
      //   navigation.navigate(ScreenNames.SIGN_UP_2, {
      //     filePath,
      //     name,
      //     email,
      //     phone,
      //     password,
      //     address,
      //   });
      Toast.show('Please verify the previous details to complete the sign up process.', Toast.SHORT);
    }
   
  };
  const gotoSignIn = () => navigation.navigate(ScreenNames.SIGN_IN);
  const goBack = () => {
    navigation.goBack();
  };
  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const Validation = () => {
    
    if (name == '') {
      Toast.show('Please enter Full Name', Toast.LONG);
      return;
    } else if (email == '') {
      Toast.show('Please enter Email Address', Toast.LONG);
      return;
    } else if (phone == '') {
      Toast.show('Please enter Phone number', Toast.LONG);
      return;
    } else if (password == '') {
      Toast.show('Please enter Password', Toast.LONG);
      return;
    }
    
    return true;
  };
  const signUpUser = async () => {
    setShowLoader(true);
    try {
      const postData = new FormData();
      postData.append('name', name);
      postData.append('email', email);
      postData.append('password', password);
      postData.append('contact', phone);
      if (filePath != '') {
        const imageName = filePath.uri.slice(
          filePath.uri.lastIndexOf('/'),
          filePath.uri.length,
        );
        postData.append('profile_img', {
          name: imageName,
          type: filePath.type,
          uri: filePath.uri,
        });
      }
      postData.append('fcm_token', fcmToken);
      console.log('signUpUser postData', postData);
      const resp = await Service.postApi(Service.REGISTER, postData);
      console.log('signUpUser resp', resp);
      if (resp?.data?.status) {
        await AsyncStorage.setItem('userToken', resp?.data?.access_token);
        const jsonValue = JSON.stringify(resp?.data?.data);
        console.log('sign in jsonValue', jsonValue);
        await AsyncStorage.setItem('userInfo', jsonValue);
        dispatch(setUserToken(resp?.data?.access_token));
        dispatch(setUser(resp?.data?.data));
        navigation.dispatch(resetIndexGoToBottomTab);
        // navigation.navigate(ScreenNames.SIGN_UP_2, {
        //   filePath,
        //   name,
        //   email,
        //   phone,
        //   password,
        //   address,
        // });
      } else {
        // Alert.alert('', `${resp.data.message}`);
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in signInUser', error);
    }
    setShowLoader(false);
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
        Toast.show('User cancelled picking image', Toast.LONG);
        setShowImageSourceModal(false);
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Toast.show('Camera not available on device', Toast.LONG);
        setShowImageSourceModal(false);
        return;
      } else if (response.errorCode == 'permission') {
        Toast.show('Permission not satisfied', Toast.LONG);
        setShowImageSourceModal(false);
        return;
      } else if (response.errorCode == 'others') {
        Toast.show(response.errorMessage, Toast.LONG);
        setShowImageSourceModal(false);
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
  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    // Email is valid, you can proceed with further actions
    // For example, you might send the email to an API or perform other operations
    // Here, we're just showing an alert for demonstration purposes
    Alert.alert('Valid Email', 'Email address is valid!');
  };
  const verifyName = async (text) => {
    // setShowLoader(true);
    const postData = new FormData();
    postData.append('name', text);
    try {
      const resp = await Service.postApi(`${Service.CHECK_NAME}`, postData);
      if (resp?.data?.status) {
        setIsNameCorrect(true);
        setnamecolor('#000')
        setemailedit(true)
      } else {
        setnamecolor('red')
        setIsNameCorrect(false);
        setemailedit(false)
        setphoneedit(false)
      }
      if (!resp?.data?.status) {
        setnamecolor('red')
        setemailedit(false)
        setphoneedit(false)
        Toast.show(resp?.data?.result.name[0], Toast.SHORT);
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };
  const verifyEmail = async (text) => {
    // setShowLoader(true);
    const postData = new FormData();
    postData.append('email', text);
    try {
      const resp = await Service.postApi(`${Service.CHECK_EMAIL}`, postData);
      if (resp?.data?.status) {
        setphoneedit(true)
        setemailcolor('#000')
        setIsEmailCorrect(true);
      } else {
        setemailcolor('red')
        setIsEmailCorrect(false);
        setphoneedit(false)
      }
      if (!resp?.data?.status) {
        setemailcolor('red')
        setphoneedit(false)
        Toast.show(resp?.data?.result.email[0], Toast.SHORT);
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };
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
        setpassedit(true)
        setIsContactCorrect(true);
      } else {
        setphonecolor('red')
        setpassedit(false)
        setIsContactCorrect(false);
      }
      if (!resp?.data?.status) {
        setphonecolor('red')
        setpassedit(false)
        Toast.show(resp?.data?.result.contact[0], Toast.SHORT);
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);

      console.log(error);
    }
  };
  function checkPwd(str) {
    if (str.length == 0) {
      Toast.show('Please enter your password!');
      return false;
    } else if (str.length < 8) {
      Toast.show('Password must be 8 characters long');
      return false;
    } else if (str.length > 12) {
      Toast.show('Password length should not be more than 12 characters!');
      return false;
    } else if (str.search(/\d/) == -1) {
      Toast.show('Password must contain atleast a number!');
      return false;
    } else if (str.search(/[A-Z]/) == -1) {
      Toast.show('Password must contain atleast one uppercase character!');
      return false;
    } else if (str.search(/[a-z]/) === -1) {
      Toast.show('Password must contain atleast one lowercase character!');
      return false;
    } else if (str.search(/^[A-Za-z0-9 ]+$/) != -1) {
      Toast.show('Password must contain atleast one special symbol!');
      return false;
    }
    // } else if (!isNameCorrect) {
    //   Toast.show('The name has already been taken  ');
    //   return false;
    // } else if (!isEmailCorrect) {
    //   Toast.show('The email has already been taken  ');
    //   return false;
    // } else if (!isContactCorrect) {
    //   Toast.show('The contact has already been taken  ');
    //   return false;
    // }
    return true;
  }
  //UI
  return (
    <ImageBackground
      source={require('assets/images/welcome-bg-1.jpg')}
      style={styles.container}>
      <CustomLoader showLoader={showLoader} />
      {/* <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(14, 71, 124, 0.81)',
          'rgba(14, 71, 124, 0.81)'
        ]} style={styles.gradientStyle}> */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          ref={addressRef}
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: '30%'}}>
             <TouchableOpacity onPress={goBack} style={[styles.backView,{margin:15}]}>
                <Image source={require('assets/images/dark-back-icon.png')} />
              </TouchableOpacity>
          <View style={styles.mainView}>

            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={goBack} style={{}}>
                {/* <Image source={require('assets/images/dark-back-icon.png')} /> */}
              </TouchableOpacity>
              {filePath == '' ? (
                <View style={styles.imageViewStyle}>
                  <Image
                    resizeMode="contain"
                    borderRadius={100}
                    source={require('assets/images/user-default.png')}
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
            </View>
            {/* <WelcomeHeader backAction={goBack} /> */}
            {/* <MyTextInput
              placeholder={'Full Name'}
              value={name}
              // setValue={setName}
              onSubmitEditing={() => emailRef.current.focus()}
              onChangeText={text => {
                setName(text)
                verifyName()
               // validateEmail(text)
              }
              }
              // onEndEditing={() => {
              //   verifyName();
              // }}
              // editable={nameedit}
              isIcon
              icon={require('assets/images/name-icon.png')}
              style={{marginTop: 10}}
            />
            */}
           <View style={{width:'100%',height:50,backgroundColor:'#fff',borderRadius:10,flexDirection:'row',alignItems:'center',paddingHorizontal:10,marginTop:50}}>
              <Image source={require('assets/images/name-icon.png')} style={{width:18,height:18,marginLeft:12}}></Image>
            
              <TextInput
                //  inputRef={emailRef}
                style={{paddingHorizontal:15,marginLeft:5,color:namecolor}}
                // keyboardType="email-address"
                onChangeText={(text)=>{
                 setName(text)
                //  if(name.length>1){
                   
                //  }
                verifyName(text)
                }}
                value={name}
                placeholder="Full Name"
                // onSubmitEditing={() => phoneRef.current.focus()}
                // onEndEditing={() => {
                //   // verifyEmail();
                // }}
              />
             
           </View>
            


           <View style={{width:'100%',height:50,backgroundColor:'#fff',borderRadius:10,flexDirection:'row',alignItems:'center',paddingHorizontal:10,marginTop:10}}>
              <Image source={require('assets/images/email-icon.png')} style={{width:18,height:18,marginLeft:12}}></Image>
             {emailedit ?
              <TextInput
                 inputRef={emailRef}
                style={{paddingHorizontal:15,marginLeft:5,color:emailcolor}}
                keyboardType="email-address"
                onChangeText={(text)=>{
                  setEmail(text)
                  verifyEmail(text);
                }}
                value={email}
                placeholder="Email Address"
                //onSubmitEditing={() => phoneRef.current.focus()}
                // onEndEditing={() => {
                //   verifyEmail();
                // }}
              />
              :
              <Text style={{color:'#c9c9c9',marginLeft:17}} onPress={()=>{

                Toast.show('Please verify the previous details to complete the sign up process.', Toast.SHORT);
              }}>Email Address</Text>
              }
           </View>
           
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
       {phoneedit || namecolor=='#000' && emailcolor=='#000' ? 
        <TextInput
          ref={phoneRef}
           value={phone}
          allowFontScaling={false}
          // editable={false}
          placeholder={'Enter Phone Number'}
          placeholderTextColor={'#c9c9c9'}
          onChangeText={(txt)=>{
            formatPhoneNumber(txt)
            // setPhone(txt)
            verifyContact(txt);
          }}
          style={{color:phonecolor}}
         // onSubmitEditing={() => passwordRef.current.focus()}
          maxLength={Platform.OS == 'android' ? 14 : 10}
          keyboardType="number-pad"
          // onEndEditing={() => {
          //   verifyContact();
          // }}
          // color={Colors.BLACK}
        />
        :
        <Text style={{color:'#c9c9c9',marginLeft:17}} 
        onPress={()=>{
          Toast.show('Please verify the previous details to complete the sign up process.', Toast.SHORT);
        }}
        >Enter Phone Number</Text>
        }
      </View>
     
    </View>
       
            {/* {passedit ?  */}
            <MyTextInput
              inputRef={passwordRef}
              placeholder={'Password'}
               value={password}
               editable={passedit}
              setValue={setPassword}
              // onEndEditing={() => {}}
              onChangeText={(text)=>{
                setPassword(text)
               
              }}
              secureTextEntry
              isIcon
              icon={require('assets/images/password-icon.png')}
              textInputstyle={{width: '75%'}}
              // onSubmitEditing={() => googleSearchRef.current.focus()}
            />
            {/* // :
            // <Text style={{color:'#c9c9c9',marginLeft:17}} 
            // onPress={()=>{
            // }}
            // >Password</Text>
            // } */}

            {/* <GooglePlacesAutocomplete
              ref={googleSearchRef}
              stateText={stateText}
              setStateText={setStateText}
              dataSource={dataSource}
              setDataSource={setDataSource}
              placeholder="Address"
              textInputProps={{
                placeholderTextColor: Colors.LIGHT_GRAY,
                // placeholderTextColor: Colors.BLACK,
                returnKeyType: 'search',
                // onFocus: () => setShowPlacesList(true),
                // onBlur: () => setShowPlacesList(false),
                multiline: true,
                // onTouchStart: ()=>{downButtonHandler()}
                height: 55,
              }}
              enablePoweredByContainer={false}
              listViewDisplayed={'auto'}
              styles={styles.searchbar}
              onPress={(data, details = null) => {
                console.log('GooglePlacesAutocomplete data', data);
                console.log('GooglePlacesAutocomplete details', details);
                // 'details' is provided when fetchDetails = true
                // setShowPlacesList(false)
                const localZipCode = details?.address_components?.find(
                  component => component?.types?.includes('postal_code'),
                )?.long_name;
                if (localZipCode) {
                  setZipCode(localZipCode);
                }
                console.log('localZipCode', localZipCode); // Log the zip code
                setLatLng({
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                });
                setAddress(data?.description);
              }}
              GooglePlacesDetailsQuery={{
                fields: 'geometry,address_components,formatted_address',
                libraries: 'places',
                components: 'country:us', // Limit results to the United States (optional)
              }}
              fetchDetails={true}
              query={{
                key: GOOGLE_API_KEY,
                language: 'en',
                // components: 'country:us', // Limit results to the United States (optional)
                // fields: 'address_components,formatted_address',
              }}
            /> */}
            <MyButton
              text={'Next'}
              onPress={
                gotoSignUP2}
              // onPress={signUpUser}
              style={[styles.loginStyle,{backgroundColor:namecolor=='#000' && emailcolor=='#000' && phonecolor=='#000' && password!='' ? Colors.THEME_BLUE:'gray',borderRadius: 10,}]}
              textStyle={{fontSize: 15}}
            />
          </View>
          <View style={styles.horizontalLineContainer}>
          <View style={styles.line} />
            <MyText
              text="OR"
              fontSize={14}
              fontFamily="light"
              textColor="black"
            />
            <View style={styles.line} />
          </View>
           <View style={styles.horizontalLineContainer}>
            {/* <View style={styles.line} />
            <MyText
              text="OR"
              fontSize={14}
              fontFamily="medium"
              textColor="black"
            />
            <View style={styles.line} /> */}
            
          </View>
          <MyButton
              text={'Continue with Google'}
              isWhite
              onPress={() => {signIn()}}
              style={styles.buttonStyle}
              icon={require('assets/images/google-icon.png')}
              isIcon
              iconStyle={{marginRight: 10}}
            />
            <MyButton
              text={'Continue with Facebook'}
              isWhite
              onPress={() => {handleFacebookLogin()}}
              style={styles.buttonStyle}
              icon={require('assets/images/facebook-icon.png')}
              isIcon
              iconStyle={{marginRight: 10}}
            />
            {Platform.OS=='ios'? 
            <MyButton
              text={'Continue with Apple'}
              isWhite
              onPress={onAppleButtonPress}
              style={[styles.buttonStyle, {}]}
              icon={require('assets/images/apple-icon.png')}
              isIcon
              iconStyle={{marginRight: 10}}
            />
            :null}
     {/*     <View style={styles.mainView}>
            <MyButton
              text={'Continue with Apple'}
              isWhite
              onPress={openSuccessModal}
              style={[styles.buttonStyle, {marginTop: 40}]}
              icon={require('assets/images/apple-icon.png')}
              isIcon
              iconStyle={{marginRight: 10}}
            />
            <MyButton
              text={'Continue with Google'}
              isWhite
              onPress={() => {}}
              style={styles.buttonStyle}
              icon={require('assets/images/google-icon.png')}
              isIcon
              iconStyle={{marginRight: 10}}
            />
            <MyButton
              text={'Continue with Facebook'}
              isWhite
              onPress={() => {}}
              style={styles.buttonStyle}
              icon={require('assets/images/facebook-icon.png')}
              isIcon
              iconStyle={{marginRight: 10}}
            />
            <TouchableOpacity onPress={gotoSignIn} style={styles.already}>
              <MyText
                text="Already have an account? "
                fontSize={13}
                fontFamily="medium"
                textColor="black"
              />
              <MyText
                text="Login"
                fontSize={15}
                fontFamily="bold"
                textColor={'black'}
              />
            </TouchableOpacity>
          </View> */}
           <TouchableOpacity onPress={gotoSignIn} style={[styles.already,{marginTop:20}]}>
              <MyText
                text="Already have an account? "
                fontSize={15}
                fontFamily="700"
                textColor="#000"
              />
              <MyText
                text="Login"
                fontSize={17}
                fontFamily="bold"
                textColor={Colors.THEME_BLUE}
              />
            </TouchableOpacity>
        </ScrollView>
        <CustomLoader showLoader={showLoader} />
      </KeyboardAvoidingView>
      {/* </LinearGradient> */}
      <SuccessSignUpModal
        visible={showSuccessModal}
        setVisibility={setShowSuccessModal}
      />
      <CountryPicker
        show={show}
        disableBackdrop={false}
        // style={styles.countrySilderStyle}
        style={{
          // Styles for whole modal [View]
          modal: {
            height: height * 0.4,
            // backgroundColor: 'red',
          },
          // Styles for modal backdrop [View]
          backdrop: {},
          countryName: {
            color: 'black',
          },
          dialCode: {
            color: 'black',
          },
        }}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={item => {
          // console.warn('item', item);
          // setCountryCode(item.dial_code);
          setSelectedCountry(item);
          setShow(false);
        }}
        placeholderTextColor={'#c9c9c9'}
        color={Colors.BLACK}
        onBackdropPress={() => setShow(false)}
      />
      <SelectImageSource
        visible={showImageSourceModal}
        setVisibility={setShowImageSourceModal}
        openLibrary={openLibrary}
        openCamera={checkCameraPermission}
      />
    </ImageBackground>
  );
};

export default Signup1;
