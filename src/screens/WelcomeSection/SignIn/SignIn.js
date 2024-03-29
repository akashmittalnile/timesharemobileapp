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
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import {Colors, Images, MyIcon, ScreenNames} from '../../../global/Index';
import LinearGradient from 'react-native-linear-gradient';
//import : styles
import {styles} from './SignInStyle';
import MyText from 'components/MyText/MyText';
import MyButton from 'components/MyButton/MyButton';
import WelcomeHeader from '../../../components/WelcomeHeader/WelcomeHeader';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import SuccessSignUpModal from '../../../modals/SuccessSignUpModal/SuccessSignUpModal';
import ForgotPasswordEnterEmail from '../../../modals/ForgotPasswordEnterEmail/ForgotPasswordEnterEmail';
import ForgotPasswordEnterOTP from '../../../modals/ForgotPasswordEnterOTP/ForgotPasswordEnterOTP';
import ForgotPasswordEnterNewPassword from '../../../modals/ForgotPasswordEnterNewPassword/ForgotPasswordEnterNewPassword';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser, setUserToken} from 'src/reduxToolkit/reducer/user';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import {Service} from '../../../global/Index';
import messaging from '@react-native-firebase/messaging';
import {GoogleSignin,statusCodes,} from '@react-native-google-signin/google-signin';
import { width } from '../../../global/Constant';
import {AccessToken,AuthenticationToken,LoginManager,Profile,Settings,GraphRequest, GraphRequestManager} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const firstCodeRef = useRef();
  const secondCodeRef = useRef();
  const thirdCodeRef = useRef();
  const forthCodeRef = useRef();
  const [firstCode, setFirstCode] = useState('');
  const [secondCode, setSecondCode] = useState('');
  const [thirdCode, setThirdCode] = useState('');
  const [forthCode, setForthCode] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  const [googleUserInfo, setGoogleUserInfo] = useState({});

  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //function : service function
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
  useEffect(() => {
    checkToken();
  }, []);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '364398567313-l0dim3kg2a6equ98r234gl24ilbkr9i1.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices();
      console.log('hasPlayServices', hasPlayServices);
      const userInfo = await GoogleSignin.signIn();
      console.log('google userInfo', userInfo);
      console.log('google userInfo2', userInfo?.user?.name);
      SosalloginUser(userInfo?.user,2)
      setGoogleUserInfo({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated', error);
        // play services not available or outdated
      } else {
        console.log('some other error happened', error);
        // some other error happened
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
      postData.append('check_login', 'login');
        console.log('loginUser postData', postData);
        const resp = await Service.postApi(Service.SOSALLOGIN, postData);
        console.log('loginUser resp', resp?.data);
        console.log('loginUser token', resp?.data?.access_token);
        if (resp?.data?.status) {
          await AsyncStorage.setItem('userToken', resp?.data?.access_token);
          const jsonValue = JSON.stringify(resp?.data?.data);
          console.log('sign in jsonValue', jsonValue);
          await AsyncStorage.setItem('userInfo', jsonValue);
          dispatch(setUserToken(resp?.data?.access_token));
          dispatch(setUser(resp?.data?.data));
          navigation.dispatch(resetIndexGoToBottomTab);
        } else {
          Toast.show(resp.data.message, Toast.SHORT);
        }
      } catch (error) {
        console.log('error in loginUser', error);
      }
      setShowLoader(false);
    
  };

  const gotoLogin = () => navigation.navigate(ScreenNames.DRIVER_LOG_IN);
  const gotoSignUP1 = () => navigation.navigate(ScreenNames.SIGN_UP_1);
  const Validation = () => {
    if (email == '') {
      Toast.show('Please enter Email Address', Toast.LONG);
      return;
    } else if (password == '') {
      Toast.show('Please enter Password', Toast.LONG);
      return;
    }
    return true;
  };

  const loginUser = async () => {
    if (Validation()) {
      setShowLoader(true);
      try {
        const postData = new FormData();
        postData.append('email', email);
        postData.append('password', password);
        postData.append('fcm_token', fcmToken);
        console.log('loginUser postData', postData);
        const resp = await Service.postApi(Service.LOGIN, postData);
        console.log('loginUser resp', resp?.data);
        console.log('loginUser token', resp?.data?.access_token);
        if (resp?.data?.status) {
          await AsyncStorage.setItem('userToken', resp?.data?.access_token);
          const jsonValue = JSON.stringify(resp?.data?.data);
          console.log('sign in jsonValue', jsonValue);
          await AsyncStorage.setItem('userInfo', jsonValue);
          dispatch(setUserToken(resp?.data?.access_token));
          dispatch(setUser(resp?.data?.data));
          navigation.dispatch(resetIndexGoToBottomTab);
        } else {
          Toast.show(resp.data.message, Toast.SHORT);
        }
      } catch (error) {
        console.log('error in loginUser', error);
      }
      setShowLoader(false);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };
  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const openEmailModal = () => {
    setShowEmailModal(true);
  };
 
  const openNewPasswordModal = async() => {
   
    try {
     var myotp=firstCode+secondCode+thirdCode+forthCode
     setShowLoader(true);
      const postData = new FormData();
      postData.append('email', forgotEmail);
      postData.append('otp', myotp);
      console.log('postData======',postData);
      const resp = await Service.postApi(Service.VERIFY_OTP, postData);
      setShowLoader(false);
      console.log('resp======', resp.data);
      if (resp?.data?.success) {
        setShowOTPModal(false);
        setShowNewPasswordModal(true);
      } else {
        Toast.show(resp?.data?.msg, Toast.SHORT);
      }
    } catch (e) {
      setShowLoader(false);
      console.log(e);
    }
  };
  const changePass=async()=>{
    console.log('====================================');
    console.log('jiijiji');
    console.log('====================================');
    try {
      setShowLoader(true);
      const postData = new FormData();
      postData.append('email', forgotEmail);
      postData.append('new_password', newPassword);
      postData.append('confirm_password', confirmPassword);
      console.log('postData======', postData);
      const resp = await Service.postApi(Service.CHANGE_PASSWORD, postData);
      setShowLoader(false);
      console.log('resp======', resp.data);
      if (resp?.data?.status) {
        // setShowOTPModal(false);
        Toast.show(resp?.data?.message, Toast.SHORT);
         setShowNewPasswordModal(false);
      } else {
        Toast.show(resp?.data?.message, Toast.SHORT);
      }
    } catch (e) {
      setShowLoader(false);
      console.log(e);
    }
  }
  const resetIndexGoToBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  const gotoBottomTab = () => {
    navigation.dispatch(resetIndexGoToBottomTab);
  };
  const handleSendOtp = async () => {
    console.log("handleSendOtp")
    try {
      setShowLoader(true);
      const postData = new FormData();
      postData.append('email', forgotEmail);
      const resp = await Service.postApi(Service.SEND_OTP, postData);
      setShowLoader(false);
      console.log('resp======', resp.data);
      if (resp?.data?.status) {
        setShowEmailModal(false)
        setShowOTPModal(true)
      } else {
        Toast.show(resp?.data?.message, Toast.SHORT);
      }
    } catch (e) {
      setShowLoader(false);
      console.log(e);
    }
  };
  //UI
  return (
    <ImageBackground
      source={require('assets/images/welcome-bg-1.jpg')}
      style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}
          contentContainerStyle={{paddingBottom: '30%'}}>
             {/* <WelcomeHeader backAction={goBack} /> */}
             <TouchableOpacity onPress={goBack} style={{ width: 38.5,
              height: 37.64,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,margin:15}}>
        <Image source={require('assets/images/dark-back-icon.png')} style={{}} />
      </TouchableOpacity>
     
          <View style={styles.mainView}>
          <Image
        source={require('assets/images/splash-logo.png')}
        style={{ width: 110,
          height: 110,
          position: 'absolute',top:20,
          alignSelf:'center'}}
      />
            <View style={{marginTop:100}} />
            <MyTextInput
              inputRef={emailRef}
              placeholder={'Email Address'}
              value={email}
              setValue={setEmail}
              isIcon
              icon={require('assets/images/email-icon.png')}
              // onSubmitEditing={() => passwordRef.current.focus()}
              style={{marginTop: 70}}
            />
            <MyTextInput
              // inputRef={passwordRef}
              placeholder={'Password'}
              value={password}
              setValue={setPassword}
              secureTextEntry
              textInputstyle={{width: '75%'}}
              isIcon
              icon={require('assets/images/password-icon.png')}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <MyButton
              text={'Login'}
              // onPress={gotoBottomTab}
              onPress={loginUser}
              style={[styles.loginStyle,{borderRadius: 10,}]}
              textStyle={{fontSize: 15}}
            />

            <TouchableOpacity onPress={openEmailModal}>
              <MyText
                text="Forgot Password?"
                fontSize={15}
                fontFamily="medium"
                textColor={Colors.THEME_BLUE}
                textAlign="center"
              />
            </TouchableOpacity>
          </View>
        
          <View style={styles.horizontalLineContainer}>
            <View style={styles.line} />
            <MyText
              text="OR"
              fontSize={14}
              fontFamily="medium"
              textColor="black"
            />
            <View style={styles.line} />
          </View>

          <View style={styles.mainView}>
            {Platform.OS=='ios'? 
            <MyButton
              text={'Continue with Apple'}
              isWhite
              onPress={()=>onAppleButtonPress()}
              style={[styles.buttonStyle, {marginTop: 40}]}
              icon={require('assets/images/apple-icon.png')}
              isIcon
              iconStyle={{marginRight: 10}}
            />
            : null}
            <MyButton
              text={'Continue with Google'}
              isWhite
              onPress={signInWithGoogle}
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
           
          </View>
           <TouchableOpacity onPress={gotoSignUP1} style={[styles.already,{marginTop:20}]}>
              <MyText
                text={`Don't have an account? `}
                fontSize={15}
                fontFamily="700"
                textColor="#000"
              />
              <MyText
                text="Signup"
                fontSize={17}
                fontFamily="bold"
                textColor={Colors.THEME_BLUE}
              />
            </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <SuccessSignUpModal
        visible={showSuccessModal}
        setVisibility={setShowSuccessModal}
        forgotEmail={forgotEmail}
        setForgotEmail={setForgotEmail}
      />
      <ForgotPasswordEnterEmail
        visible={showEmailModal}
        setVisibility={setShowEmailModal}
        handleNext={() => {
          handleSendOtp();
        }}
        setForgotEmail={setForgotEmail}
        forgotEmail={forgotEmail}
      />
      <ForgotPasswordEnterOTP
        visible={showOTPModal}
        setVisibility={setShowOTPModal}
        openNewPasswordModal={openNewPasswordModal}
        firstCode={firstCode}
        secondCode={secondCode}
        thirdCode={thirdCode}
        forthCode={forthCode}
        setFirstCode={setFirstCode}
        setSecondCode={setSecondCode}
        setThirdCode={setThirdCode}
        setForthCode={setForthCode}
        firstCodeRef={firstCodeRef}
        secondCodeRef={secondCodeRef}
        thirdCodeRef={thirdCodeRef}
        forthCodeRef={forthCodeRef}
        errorMessage2={errorMessage2}
        setErrorMessage2={setErrorMessage2}
      />
      <ForgotPasswordEnterNewPassword
        visible={showNewPasswordModal}
        changePass={changePass}
        setVisibility={setShowNewPasswordModal}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        // confirmPasswordRef={confirmPasswordRef}
      />
      <CustomLoader showLoader={showLoader} />
    </ImageBackground>
  );
};

export default SignIn;
