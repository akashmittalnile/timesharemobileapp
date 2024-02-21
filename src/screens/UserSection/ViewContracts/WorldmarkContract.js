import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './ViewContractsStyle';
import MyHeader from '../../../components/MyHeader/MyHeader';
import images from '../../../global/Images';
import MyText from '../../../components/MyText/MyText';
import {Colors, Fonts, ScreenNames, Service} from '../../../global/Index';
import {getImageForDeveloper, width} from '../../../global/Constant';
import {useDispatch, useSelector} from 'react-redux';
import MyButton from '../../../components/MyButton/MyButton';
import Toast from 'react-native-simple-toast';

import SimpleTextInput from '../../../components/MyTextInput/BottomlineTextInput';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import moment from 'moment';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import SuccessfullySigned from '../../../modals/SuccessfullySigned/SuccessfullySigned';
import {CommonActions} from '@react-navigation/native';
const WorldmarkContract = ({navigation, route}) => {
  const dispatch = useDispatch();
  console.log('route========', route);
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('1');
  const [isSelected, setSelection] = useState(false);
  const [isPaymentDetails, setIsPaymentDetails] = useState(true);
  const [loginuserEmail, setLoginUserEmail] = useState(route?.params?.email);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      name: 'PayPal',
    },
    {
      id: '2',
      name: 'Personal Cheque',
    },
  ]);
  const [agreementEnteredIntoOn, setAgreementEnteredIntoOn] = useState(
    route?.params?.anniStartDates[0],
  );
  const [developerName, setDeveloperName] = useState(
    route?.params?.selectedDeveloper?.name,
  );
  const [agreementBetween, setAgreementBetween] = useState(route?.params?.name);
  const [withinDays, setWithinDays] = useState(route?.params?.valid_days);
  const [rentOut, setRentOut] = useState(route?.params?.points);
  const [points, setPoints] = useState(String(route?.params?.name));
  const [selectedYear, setSelectedYear] = useState(
    String(route?.params?.selectedYear),
  );

  const [pricePerPoint, setPricePerPoint] = useState(
    String(route?.params?.price_per_point),
  );
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [username, setUserName] = useState('');
  const [signature, setSignature] = useState(
    String(route?.params?.signature_image),
  );
  const [printName, setPrintName] = useState(String(route?.params?.print_name));

  const [addressLine2, setAddressLine2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signedDate, setSignedDate] = useState('');
  const [openSignedDate, setOpenSignedDate] = useState(false);
  const [showImageSourceModal, setShowImageSourceModal] = useState(false);
  const [pointsfilePath, setPointsFilePath] = useState('');
  const [ownerImagefilePath, setOwnerImageFilePath] = useState('');
  const [isSignature, setIsSignatue] = useState(false);
  const [isSignatureError, setIsSignatueError] = useState(false);
  const [personalCheck, setPersonalCheck] = useState('');
  const [ispersonalCheck, setIsPersonalCheck] = useState(true);

  const [ispersonalCheck1, setIsPersonalCheck1] = useState(true);

  const [whichImageToUpload, setWhichImageToUpload] = useState('');
  const [showSignedContractModal, setShowSignedContractModal] = useState(false);
  const [isValidationError, setIsValidationError] = useState(false);
  const [accountUserId, setAccountUserId] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const agreementBetweenRef = useRef(null);
  const withinDaysRef = useRef(null);
  const pointsRef = useRef(null);
  const yearRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressLine1Ref = useRef(null);
  const addressLine2Ref = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const accountUserIdRef = useRef(null);
  const accountPasswordRef = useRef(null);
  const paypalPasswordRef = useRef(null);
  const [paypalemail, setpaypalemail] = useState('');
  const [rotingnumber,setrotingnumber]=useState('');
  const [acnumber,setacnumber]=useState();
  const [achnumber,setachnumber]=useState('')

  useEffect(()=>{
    setEmail(userInfo.email)
    setPhone(userInfo.contact)
  },[])

  const gotoSignedContracts = () => {
    navigation.navigate(ScreenNames.CONTRACTS);
  };
  const gotoSellMorePoints = () => {
    navigation.dispatch(resetIndexGoToRentYourPoints);
  };
  const resetIndexGoToRentYourPoints = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.RENT_YOUR_POINTS}],
  });
  const url = Service.GET_PREFILL_DATA + `?contract_id=381`;
  const getPrefillData = async () => {
    try {
      const resp = await Service.postApiWithToken(userToken, url, {});
      console.log(url);
      console.log('=====rrrrrr==', resp);
    } catch (e) {
      console.log(e);
    }
  };
  const checkIfEmpty = value => {
    if (value?.toString()?.trim()?.length === 0) {
      return true;
    }
    return false;
  };
  // const validation = () => {
  //   const ifChecqueMethdSelected = selectedPaymentMethod == 2;
  //   if (checkIfEmpty(agreementEnteredIntoOn)) {
  //     alert('points',points)
  //     return false;
  //   } else if (checkIfEmpty(withinDays)) {
  //     alert("withinDays")
  //     return false;
  //   } else if (checkIfEmpty(rentOut)) {
  //     alert("rentOut")
  //     return false;
  //   } else if (checkIfEmpty(points)) {
  //     alert('points',points)
  //     return false;
  //   } else if (checkIfEmpty(pricePerPoint)) {
  //     alert('points',points)
  //     return false;
  //   // } else if (!ifChecqueMethdSelected && checkIfEmpty(paypalEmail)) {
  //   //   return false;
  //   // } else if (!ifChecqueMethdSelected && checkIfEmpty(paypalPassword)) {
  //   //   return false;
  //   // } else if (ifChecqueMethdSelected && checkIfEmpty(chequeNumber)) {
  //   //   return false;
  //   } else if (ifChecqueMethdSelected && checkIfEmpty(firstName)) {
  //     alert('firstName',firstName)
  //     return false;
  //   } else if (ifChecqueMethdSelected && checkIfEmpty(lastName)) {
  //     alert("lastName")
  //     return false;
  //   } else if (checkIfEmpty(addressLine1)) {
  //     alert(addressLine1)
  //     return false;
  //   } else if (checkIfEmpty(addressLine2)) {
  //     alert(addressLine2)
  //     return false;
  //   } else if (ifChecqueMethdSelected && checkIfEmpty(email)) {
  //     alert(email)
  //     return false;
  //   } else if (checkIfEmpty(phone)) {
  //     alert(phone)
  //     return false;
  //   } else if (checkIfEmpty(accountUserId)) {
  //     alert(accountUserId)
  //     return false;
  //   } else if (checkIfEmpty(accountPassword)) {
  //     alert(accountPassword)

  //     return false;
  //   }
  //   // } else if (pointsfilePath === '') {
  //   //   return false;
  //   // } else if (isSignature == false) {
  //   //   return false;
  //   // } else if (signedDate === '') {
  //   //   return false;
  //   // }
  //   return true;
  // };
  const validation = () => {
    if (chequeNumber == 'Y' || chequeNumber == 'y') {
      if (checkIfEmpty(username)) {
        return false;
      }else if(checkIfEmpty(paypalemail)){
        return false;
      } else if (checkIfEmpty(paypalPassword)) {
        return false;
      } else if (checkIfEmpty(printName)) {
        return false;
      } else if (checkIfEmpty(signature)) {
        return false;
      }else if (checkIfEmpty(addressLine1)) {
        return false;
      } else if (checkIfEmpty(addressLine2)) {
        return false;
      } else if (checkIfEmpty(email)) {
        return false;
      } else if (checkIfEmpty(phone)) {
        return false;
      }
    } else {
      if (checkIfEmpty(chequeNumber)) {
        return false;
      }else if (checkIfEmpty(username)) {
        return false;
      } else if (checkIfEmpty(paypalPassword)) {
        return false;
      } else if (checkIfEmpty(firstName)) {
        return false;
      } else if (checkIfEmpty(lastName)) {
        return false;
      }else if (checkIfEmpty(rotingnumber)) {
        return false;
      } else if (checkIfEmpty(acnumber)) {
        return false;
      } else if (checkIfEmpty(addressLine1)) {
        return false;
      } else if (checkIfEmpty(addressLine2)) {
        return false;
      } else if (checkIfEmpty(email)) {
        return false;
      } else if (checkIfEmpty(phone)) {
        return false;
      }
    }
    return true;
  };
  const submitContract = async () => {
    if (!validation()) {
      Toast.show('One or more fields are empty', Toast.LONG);
      setIsValidationError(true);
      return;
    }
    setIsValidationError(false);

    const postData = new FormData();
    let data = {
      user_id: userInfo?.id,
      contract_id: route?.params?.contractId,
      agreementwith: agreementBetween, // between ktj enter
      valid_days: withinDays,
      agreement_date: moment(signedDate).format('MM/DD/YYYY'), //date at end of form
      street_address: addressLine1,
      city_address: addressLine2,
      developer_login_username: username,
      developer_login_password: paypalPassword,
      check_code: route?.params?.referralCode,
      check_firstname: firstName,
      check_lastname: lastName,
      check_email: email,
      paypal_email: paypalemail,
      signature: printName,
      paypal_status: chequeNumber,
      check_status: personalCheck,
      routing_number:rotingnumber,
      account_number :acnumber,
      ach_number:achnumber
    };
    if (selectedPaymentMethod === '1') {
      data.paypal_email = paypalemail;
      data.paypal_password = paypalPassword;
    }
    if (selectedPaymentMethod === '2') {
      const data2 = {
        check_code: chequeNumber,
        check_firstname: firstName,
        check_lastname: lastName,
        check_email: email,
      };
      data = {...data, ...data2};
    }
    for (const [key, value] of Object.entries(data)) {
      postData.append(String(key), value);
    }
    // const pointsImageName = pointsfilePath.uri.slice(
    //   pointsfilePath.uri.lastIndexOf('/'),
    //   pointsfilePath.uri.length,
    // );
    // postData.append('points_screenshot', {
    //   name: pointsImageName,
    //   type: pointsfilePath.type,
    //   uri: pointsfilePath.uri,
    // });
    // console.log('points_screenshot', {
    //   name: pointsImageName,
    //   type: pointsfilePath.type,
    //   uri: pointsfilePath.uri,
    // });
    // const OwnerImageName = ownerImagefilePath.uri.slice(
    //   ownerImagefilePath.uri.lastIndexOf('/'),
    //   ownerImagefilePath.uri.length,
    // );
    // postData.append('signature', {
    //   name: OwnerImageName,
    //   type: ownerImagefilePath.type,
    //   uri: ownerImagefilePath.uri,
    // });
    console.log('submitContract postData', postData);
    setShowLoader(true);
    try {
      const resp = await Service.postApiWithToken(
        userToken,
        Service.SIGN_CONTRACT_AGREEMENT,
        postData,
      );
      console.log('submitContract resp', resp?.data);
      if (resp?.data?.status) {
        Toast.show(resp?.data?.message, Toast.SHORT);
      } else {
        // Toast.show(resp?.data?.message, Toast.SHORT);
      }
      setShowLoader(false);
    } catch (error) {
      console.log('error in submitContract', error);
    }
    setShowLoader(false);
    setShowSignedContractModal(true);
  };
  // useEffect(() => {
  //   getPrefillData();
  // }, []);
  const visitWebsite = () => {
    const websiteUrl = `https://www.timesharesimplified.com/`;
    Linking.openURL(websiteUrl);
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
  return (
    <>
      <CustomLoader showLoader={showLoader} />
      <View style={styles.container}>
        <MyHeader Title={`Sign ${developerName} Contract`} />
        <ScrollView contentContainerStyle={{paddingBottom: '20%'}}>
          <View>
            <Image
              style={{height: 600, width: '100%'}}
              source={images.worldmarkbanner}
            />
          </View>
          <View style={styles.mainView}>
            {/* <MyText
          text={'Your unique opportunity!'}
          textColor="#654C32"
          fontSize={24}
          fontFamily="medum"
          style={{marginTop: 10}}
        /> */}
            <Image style={{marginTop: 20}} source={images.youropportunity} />
            <MyText
              text={'Introduction'}
              textColor="#000"
              fontSize={14}
              fontFamily="Verdana"
              style={{marginBottom: 15, marginTop: 20, fontWeight: 700}}
            />
            {/* description section */}
            <View>
              <MyText
                text={`We are very excited to have you as one of our newest community members!`}
                textColor={'#353334'}
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{}}
              />
              <MyText
                text={`Our goal is to take the worry and hassle out of renting your vacation ownership points, and provide you with the value you truly deserve!`}
                textColor={'#353334'}
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 20, fontWeight: 400}}
              />
              <MyText
                text={`We look forward to serving you by acting as an intermediary between you and the vacation rental guest.`}
                textColor={'#353334'}
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 20, fontWeight: 400}}
              />
              <MyText
                text={`Our corporate name is KTJ Enterprises Inc, DBATimeshare Simplified and our company websites are www.timesharesimplified.com and our sister company Vacations Simplified can be found at www.vacationcondosforless.com`}
                textColor={'#353334'}
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 20, fontWeight: 400}}
              />
            </View>

            <MyText
              text={'Our commitment to you!'}
              textColor="#000"
              fontSize={14}
              fontFamily="Verdana"
              lineHeight={20}
              style={{marginTop: 15, fontWeight: '700'}}
            />

            {/* description section */}
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View
                style={[styles.circle, {backgroundColor: '#353334'}]}></View>
              <MyText
                text={
                  'We will get your points rented out for you as quickly as possible in the order they come in'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 5}}
              />
            </View>
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View
                style={[styles.circle, {backgroundColor: '#353334'}]}></View>
              <MyText
                text={
                  'We will keep your password and personal Information secure at all times'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 5}}
              />
            </View>
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View
                style={[styles.circle, {backgroundColor: '#353334'}]}></View>
              <MyText
                text={
                  'We will use websites that ensure the guests staying in your unit will be verified individuals'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 15}}
              />
            </View>
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View
                style={[styles.circle, {backgroundColor: '#353334'}]}></View>
              <MyText
                text={
                  'We do our absolute best to never go over the agreed upon amount of points however if there is an instance where that does arise we will do everything to resolve it to your satisfaction within 24 hours of notifying us. (Please do not cancel the booking first so we can make other arrangements)'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 15}}
              />
            </View>
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View
                style={[styles.circle, {backgroundColor: '#353334'}]}></View>
              <MyText
                text={
                  'We are here for you any year you need us for any number of points big or small as long as it is enough for a reservation'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 15}}
              />
            </View>
            <MyText
              text={'Never an upfront cost to you!'}
              textColor="#000"
              fontSize={14}
              fontFamily="Verdana"
              lineHeight={20}
              style={{marginTop: 5, fontWeight: 600, marginLeft: 15}}
            />
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View
                style={[styles.circle, {backgroundColor: '#353334'}]}></View>
              <MyText
                text={
                  'We are available to you 7 days a week if you have any questions or concerns!'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 15}}
              />
            </View>
          </View>

          <Image
            style={{height: 210, width: 428}}
            source={images.middleBanner}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: '#014FA2',
              padding: 15,
              marginTop: 7,
            }}>
            <MyText
              text={'Information'}
              textColor="#fff"
              fontSize={20}
              fontFamily="Verdana"
              style={{marginTop: 15, marginBottom: 15}}
            />
            {/* description section */}
            <View>
              <MyText
                text={`Our team is available to you whenever you have questions or concerns throughout the process. Please feel free to contact us by email, text, or phone anytime and we typically respond within 12 hours.`}
                textColor={'#ffff'}
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{fontWeight: 400}}
              />
              <MyText
                text={`To ensures your understanding of the program please look over the attached agreement, then click on the links to sign, and date the agreement electronically. All you need to do is sit back, relax, and enjoy the extra cash!`}
                textColor={'#ffff'}
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{fontWeight: 400, marginTop: 20}}
              />
              <MyText
                text={`We are excited about creating a beneficial relationship for all parties involved. We look forward to helping you utilize your ownership, by providing an income source to alleviate many of the costs associated with owning a timeshare. Let us know if you have any questions or concerns. If you would like to speak with our Owner Liaison please email them at support@timesharesimplified.com. Or schedule a time on the calendar link sent to you in the Welcome email.`}
                textColor={'#ffff'}
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{fontWeight: 400, marginTop: 20}}
              />
              <MyText
                text={` We look forward to helping you and please let us know if you have any other questions or concerns.`}
                textColor={'#ffff'}
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{fontWeight: 400, marginTop: 20}}
              />
            </View>
            <View style={styles.textViewContainer}>
              <View style={styles.circle}></View>
              <MyText
                text={
                  'Once your contract is signed, it will go into rotation, according to when you came in'
                }
                textColor="#ffff"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 10}}
              />
            </View>
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View style={styles.circle}></View>
              <MyText
                text={
                  'There is nothing you need to do after signing the contract we will handle everything for you.'
                }
                textColor="#ffff"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 12}}
              />
            </View>
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View style={styles.circle}></View>
              <MyText
                text={
                  'The team will notify you the day they start to make bookings on your account to let you know you are next in line via email.'
                }
                textColor="#ffff"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 12}}
              />
            </View>
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View style={styles.circle}></View>
              <MyText
                text={
                  'Once your account has been started, we will send you a payment according to how many points we used during that time period every two weeks.'
                }
                textColor="#ffff"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginLeft: 12}}
              />
            </View>
            <View style={[styles.textViewContainer, {marginTop: 10}]}>
              <View style={styles.circle}></View>
              <MyText
                text={
                  'We will use your account until all the agreed-upon points are rented to as close to that number as possible. (sometimes there might be a small remainder of points left.)'
                }
                textColor="#ffff"
                fontSize={13}
                fontFamily="Verdana"
                lineHeight={20}
                style={{marginTop: 15, marginBottom: 15, marginLeft: 12}}
              />
            </View>
          </View>
          <View style={{alignSelf: 'center', marginRight: 40}}>
            <Image source={images.banner} />
          </View>
          <View
            style={{
              height: 10,
              width: '100%',
              backgroundColor: '#faf9f9',
            }}></View>
          {/* Agreement section */}
          <View>
            <ImageBackground
              style={{height: 260, width: 400}}
              source={images.bgbanner1}>
              <MyText
                text={'Agreement'}
                textColor="#1050A2"
                fontSize={20}
                fontFamily="Verdana"
                style={{marginBottom: 15, marginLeft: 20, marginTop: 60}}
              />
              <View>
                <MyText
                  text={'This agreement is hereby entered into on'}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  style={{marginLeft: 20, fontWeight: 400}}
                />

                {/* <SimpleTextInput
                value={agreementBetween}
                placeholder={'he'}
                onChangeText={value => setAgreementBetween(value)}
              /> */}
                <MyTextInput
                  // inputRef={emailRef}
                  placeholder={''}
                  editable={false}
                  value={moment(agreementEnteredIntoOn).format('MM/DD/YYYY')}
                  setValue={setAgreementEnteredIntoOn}
                  onSubmitEditing={() => anniStartDates.current.focus()}
                  style={{...styles.textInputStyle}}
                  textInputstyle={{padding: 0, paddingLeft: 10}}
                  // isValidationError && checkIfEmpty(agreementEnteredIntoOn)
                  //   ? styles.redBorderNotFilled
                  //   : null
                />
              </View>

              <MyText
                text={'between KTJ Enterprises Inc., dba Timeshare'}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                style={{marginLeft: 20, fontWeight: 300, marginTop: 10}}
              />

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignItems: 'center',
                }}>
                <MyText
                  text={' Simplified and,'}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  style={{marginLeft: 20, marginTop: 12}}
                />
                <MyTextInput
                  inputRef={pointsRef}
                  placeholder={'Type here'}
                  editable={false}
                  value={points}
                  setValue={setPoints}
                  keyboardType="number-pad"
                  onSubmitEditing={() => yearRef.current.focus()}
                  style={{...styles.textInputStyle, ...styles.textInputStyle1}}
                  // textInputstyle={{width: '100%'}}
                />
              </View>
              <MyText
                text={'Worldmark by Wyndham Member. This contract'}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                style={{marginLeft: 20, marginTop: 10}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignItems: 'center',
                }}>
                <MyText
                  text={'is void if not signed within'}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  style={{marginLeft: 20, marginTop: 12}}
                />
                <MyTextInput
                  inputRef={withinDaysRef}
                  placeholder={'Type here'}
                  editable={false}
                  value={withinDays}
                  setValue={setWithinDays}
                  keyboardType="number-pad"
                  onSubmitEditing={() => Keyboard.dismiss()}
                  // style={
                  //   isValidationError && checkIfEmpty(withinDays)
                  //     ? styles.withinDaysNotFilledStyle
                  //     : styles.withinDaysFilledStyle
                  // }
                  style={{...styles.textInputStyle, ...styles.textInputStyle2}}
                />
                <MyText
                  text={'days.'}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  style={{marginLeft: 5, marginTop: 12}}
                />
              </View>
            </ImageBackground>
            <View
              style={{
                backgroundColor: '#FEFDFB',

                paddingVertical: 10,
                width: '90%',
                alignSelf: 'center',
                marginTop: 50,
              }}>
              <MyText
                text={
                  'Timeshare Account Utilization by signing this agreement, you agree to give us access to your Worldmark by Wyndham account information to make bookings on your behalf.In your account it includes your personal contact details, owner number, username, and password . We will keep information secure and safe with keepersecurity.com , and use only the agreed upon number of points to book reservations for various different amounts, at various times of the year, depending upon business needs.'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign={'auto'}
                lineHeight={21}
              />
            </View>
            <View
              style={{
                backgroundColor: '#FEFDFB',

                paddingVertical: 10,
                width: '90%',
                alignSelf: 'center',
              }}>
              <MyText
                text={
                  'If we utilize your account to rent out the your timeshare points, you agree that we shall not be held liable for any actions taken by your resort in relation to your account,including but not limited to the loss of your account and any damages imposed by Lawrence Worldmark by Wyndham ownership department. You acknowledge and agree to indemnify, defend, and hold us harmless from any claims, demands, suits, or arising out of or related to the aforementioned utilization of your account.'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign={'auto'}
                lineHeight={21}
              />
            </View>
            <View
              style={{
                backgroundColor: '#FEFDFB',

                paddingVertical: 10,
                width: '90%',
                alignSelf: 'center',
              }}>
              <MyText
                text={
                  'Upon granting us permission to log into your accounts and book reservations on your behalf, you hereby provide us with full permission and access to utilize the agreed upon amount of points specified in the contract at the specified price. By doing so, you acknowledge and agree that we shall not be held liable for any actions taken within the scope of this permission and access, and you release us from any claims or damages arising from such utilization.'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign={'auto'}
                lineHeight={21}
              />
            </View>
            <View
              style={{
                backgroundColor: '#FEFDFB',

                paddingVertical: 10,
                width: '90%',
                alignSelf: 'center',
              }}>
              <MyText
                text={
                  'In certain circumstances, cancellations may occur, and if the owner has already received payment for those points, you grant us permission to reuse those points for alternative reservations. This permission is contingent upon us not exceeding the agreed-upon amount of points outlined in the agreement.'
                }
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign={'auto'}
                lineHeight={21}
              />
            </View>
            <View
              style={{
                height: 15,
                width: '100%',
                backgroundColor: '#f5f5f2',
              }}></View>
          </View>
          {/* owner information */}
          <View style={{backgroundColor: '#F0DFCF'}}>
            <View style={{padding: 5}}>
              <MyText
                text={'Owner Information'}
                textColor="#1050A2"
                fontSize={17}
                fontFamily="Verdana"
                textAlign={'auto'}
                lineHeight={25}
                style={{marginLeft: 20, marginTop: 30}}
              />
              <View>
                <MyText
                  text={`Owner's Point Usage Notification:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign={'auto'}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: '700'}}
                />
                <MyText
                  text={
                    'The owner must promptly notify us within 24 hours if they utilize any points from the agreed-upon total. This facilitates record updates and issuance of a revised contract to avoid confusion.'
                  }
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign={'auto'}
                  style={{
                    marginLeft: 20,
                    marginTop: 10,
                    lineHeight: 21,
                    fontWeight: 400,
                  }}
                />
                <View>
                  <MyText
                    text={'Tax Responsibility and 1099 Form:'}
                    textColor="#000"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    style={{marginLeft: 20, marginTop: 10, fontWeight: 700}}
                  />
                  <MyText
                    text={
                      'The owner is responsible for taxes on rentals facilitated by them. In certain cases, we will provide a 1099 form for any payments made to the owner. There are many tax benefits you can utilize when renting out your timeshares and we encourage you to get a qualified CPA to learn about the many tax deductions available to you.'
                    }
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign={'auto'}
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      lineHeight: 21,
                      fontWeight: '400',
                    }}
                  />
                </View>
                <View>
                  <MyText
                    text={'Utilization of Websites and Marketing Channels:'}
                    textColor="#000"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign={'auto'}
                    style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                  />
                  <MyText
                    text={
                      'We reserve the right to utilize necessary websites and arketing channels to execute the rentals of the points.'
                    }
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign={'auto'}
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      lineHeight: 21,
                      fontWeight: 400,
                    }}
                  />
                </View>
                <View>
                  <MyText
                    text={'Website and Resort Protection:'}
                    textColor="#000"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                  />
                  <MyText
                    text={
                      'The websites we utilize provide host protection against damages and liabilities. Additionally, the resort requires guests to provide their credit card for any potential fees or damages. While instances involving damages are extremely rare, owners should be aware that they could potentially be involved, as per their governing documents however we have never seen an instance of this ever but it is not impossible.'
                    }
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign={'auto'}
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      lineHeight: 21,
                      fontWeight: 400,
                    }}
                  />
                </View>
                <View>
                  <MyText
                    text={'Handling of Damages:'}
                    textColor="#000"
                    fontSize={13}
                    fontFamily="bold"
                    textAlign="auto"
                    style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                  />
                  <MyText
                    text={
                      'Damages will be covered by the insurance provided by the hosting platforms we use. However, in other situations, we cannot be held liable, although we will offer assistance to resolve any issues to the best of our ability.'
                    }
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign={'auto'}
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      lineHeight: 21,
                      fontWeight: 400,
                    }}
                  />
                </View>
                <View>
                  <MyText
                    text={`Owner's Account Usage:`}
                    textColor="#000"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                  />
                  <MyText
                    text={
                      'The owner retains the ability to use their account independently at any time, as if they had not contracted with us for Points rental.'
                    }
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign={'auto'}
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      lineHeight: 21,
                      fontWeight: 400,
                    }}
                  />
                </View>
                <MyText
                  text={
                    'However, they must promptly notify us if they utilize any points from the agreed upon total that are under contract for rental so we can send an updated contract.'
                  }
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign={'auto'}
                  style={{
                    marginLeft: 20,
                    marginTop: 20,
                    lineHeight: 21,
                    fontWeight: 400,
                  }}
                />

                <View style={{marginBottom: 20}}>
                  <MyText
                    text={`Password Change Restriction:`}
                    textColor="#000"
                    fontSize={13}
                    textAlign="auto"
                    fontFamily="Verdana"
                    style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                  />
                  <MyText
                    text={
                      `The client agrees not to change their password until we have utilized the agreed-upon points and the last guest has checked in. After that point, the client is free to change their password to a different one. In the event that the owner changes their password, they agree to provide us with the new password and access to reuse the points we have already compensated them for. Reservation Changes and Cancellations: If the owner changes the password without allowing us to reuse the points, or cancels any of the reservations made under a guest's name, we reserve the right to terminate their participation in our program and discontinue providing our services to them in the future.`
                    }
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign={'auto'}
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      lineHeight: 21,
                      fontWeight: 400,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: '#F0DFCF'}}>
          
            <MyText
              text={`Canceling one of our bookings made on your account without notifying us will cause many problems for both us and the guest checking in and can cause an extreme hardship for a guest showing up with no reservation because we were never notified.`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign={'auto'}
              style={{
                marginLeft: 20,
                lineHeight: 21,
                fontWeight: 400,
              }}
            />
            <MyText
              text={` Please consider any booking made on your account was us and you agree not to cancel any bookings before clarifying with us first`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign={'auto'}
              style={{
                marginLeft: 20,
                marginTop: 5,
                lineHeight: 21,
                fontWeight: 400,
              }}
            />
            <MyText
              text={` If for any reason we went over the number of agreed-upon points or you don’t know who the reservation was from please contact us and we will rectify it immediately`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign={'auto'}
              style={{
                marginLeft: 20,
                marginTop: 20,
                lineHeight: 21,
                fontWeight: 400,
              }}
            />
            <MyText
              text={` However just canceling the reservation can cause serious problems so please text or email us immediately so we can fix the case to your satisfaction`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign={'auto'}
              style={{
                marginLeft: 20,
                marginTop: 20,
                lineHeight: 21,
                fontWeight: 400,
              }}
            />
            <Image style={{height: 232, width: 390}} source={images.ftbanner} />
          </View>
          {/* payment section */}
          <View style={{backgroundColor: '#FFFEFD'}}>
            <MyText
              text={`Payment`}
              textColor="#1050A2"
              fontSize={16}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={25}
              style={{marginLeft: 20, marginTop: 40}}
            />

          <MyText
              text={`Price per Point KTJ Enterprises Inc., dba Timeshare`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={21}
              style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
            />
            <View style={{flexDirection:'row'}}>
              <MyText
              text={`Simplified agrees to rent out`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={21}
              style={{marginLeft: 20,fontWeight: 400}}
            />
            <View style={{width:150}}>
               <MyTextInput
              placeholder={''}
              value={rentOut}
              editable={false}
              setValue={setRentOut}
              onSubmitEditing={() => pointsRef.current.focus()}
            
              style={{...styles.textInputStyle, ...styles.textInputStyle3,top:-10}}
            />
            </View>
           

            </View>
          
            
           
            <MyText
              text={`Worldmark by Wyndham -Use Year`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              style={{marginLeft: 20, }}
            />
            <View style={{flexDirection:'row'}}>
              <View style={{width:100}}>
                 <MyTextInput
              inputRef={pointsRef}
              placeholder={''}
              editable={false}
              value={selectedYear}
              setValue={setPoints}
              keyboardType="number-pad"
              onSubmitEditing={() => yearRef.current.focus()}
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
              // textInputstyle={{width: '100%'}}
            />
              </View>
              
          <MyText
              text={`for $`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              style={{ marginTop: 15}}
            />
              <View style={{width:150}}>
              <MyTextInput
                inputRef={yearRef}
                editable={false}
                placeholder={''}
                value={pricePerPoint}
                setValue={setPricePerPoint}
                keyboardType="number-pad"
             
                style={{...styles.textInputStyle, ...styles.textInputStyle1,marginLeft:-5}}
              />
              </View>
              <MyText
                text={`per point.`}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                style={{marginLeft: -60, marginTop: 17}}
              />
            </View>
          
            <View style={{marginHorizontal: 5}}>
              <MyText
                text={`Details`}
                textColor="#000"
                fontSize={14}
                fontFamily="Verdana"
                textAlign="auto"
                style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
              />
              <MyText
                text={`Please be aware on future points that you may want to sell us this price may not be the same. If we book a reservation on your account, you can ensure we collected the money upfront and that the guest is not allowed to cancel within 30 days of check-in in most instances. Once the points have been booked for a reservation, those points are considered purchased by us, regardless if a reservation cancels. If someone cancels a reservation, we will re-use the points for another reservation and you will not be penalized.`}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
              <MyText
                text={`We utilize your points to rent out various reservations for guests. Once we book a reservation, we collect the payment from them and hold the money into escrow for you. Your payment then goes out according to the method you selected every two weeks. If you’re paid by check, we will mail the check that day and it takes approximately 7 to 10 business days to get to you and a PayPal transfer goes out that day. This ensures that the owners money is paid ahead of time and that the guest has a reservation when they get there. Furthermore ensures that the owner of the points does not change the guest reservation as they have been paid in full.`}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
              <MyText
                text={`If at any time, you wish to withdraw from the program please contact us immediately, and we will be happy to give you a standing on your current balance of any unused points; and we will pay you what you are owed at that time. Any bookings you cancel that were booked by us, for a guest of ours, gives us the right to remove you from our program, and we reserve the right to forfeit any monies you would have received.`}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
            </View>
            <Image source={images.fbanner22} />
          </View>
          {/* please fill in section */}
          <View style={{marginHorizontal: 10}}>
            <MyText
              text={`Please fill in`}
              textColor="#000"
              fontSize={15}
              fontFamily="Verdana"
              textAlign="auto"
              style={{marginLeft: 20, marginTop: 30, fontWeight: 700}}
            />
            <MyText
              text={`Please mark with a Y next to your choice of how you would like payments to be sent`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 20}}
            />

            <MyText
              text={`And in the other box place an N. PayPal`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />

            <MyTextInput
              placeholder={''}
              value={chequeNumber}
              editable={ispersonalCheck1}
              setValue={setChequeNumber}
              isOnChangeText={true}
              onChangeText={txt => {
                setChequeNumber(txt);
                if (txt == 'Y' || txt == 'y') {
                  setIsPaymentDetails(false);
                  setIsPersonalCheck(false);
                } else {
                  setIsPaymentDetails(true);
                  setIsPersonalCheck(true);
                }
              }}
              // style={
              //   isValidationError && checkIfEmpty(chequeNumber)
              //     ? styles.genericInputNotFilledStyle
              //     : styles.genericInputFilledStyle
              // }
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />

            {!isPaymentDetails && (
              <MyText
                text={`Paypal Email`}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={19}
                style={{marginLeft: 20, marginTop: 10}}
              />
            )}
            {!isPaymentDetails && (
               <MyTextInput
               placeholder={''}
               value={paypalemail}
               isOnChangeText={true}
               onChangeText={txt => {
                 console.log(txt)
                 setpaypalemail(txt);
               }}
               style={{...styles.textInputStyle, ...styles.textInputStyle3}}
             />
            )}
            <MyText
              text={`or personal check`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            <MyTextInput
              placeholder={''}
              value={personalCheck}
              editable={ispersonalCheck}
              isOnChangeText={true}
              onChangeText={txt => {
                setPersonalCheck(txt);
                if (txt == 'N' || txt == 'n') {
                  setIsPersonalCheck1(false);
                } else {
                  setIsPersonalCheck1(true);
                }
              }}
              // style={
              //   isValidationError && checkIfEmpty(chequeNumber)
              //     ? styles.genericInputNotFilledStyle
              //     : styles.genericInputFilledStyle
              // }
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`(Enter N/A if choosing to be paid by Check)`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            {/* member information section */}
            {isPaymentDetails ?
            <>
           
            <MyText
              text={`Member Information Name:`}
              textColor="#000"
              fontSize={15}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={20}
              style={{marginLeft: 20, marginTop: 10, fontWeight: 700}}
            />
            <MyText
              text={`First`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            <MyTextInput
              placeholder={''}
              value={firstName}
              setValue={setFirstName}
              editable={isPaymentDetails}
              // style={
              //   isValidationError && checkIfEmpty(chequeNumber)
              //     ? styles.genericInputNotFilledStyle
              //     : styles.genericInputFilledStyle
              // }
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`Last`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            <MyTextInput
              placeholder={''}
              value={lastName}
              setValue={setLastName}
              editable={isPaymentDetails}
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`Routing Number`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            <MyTextInput
              placeholder={''}
              value={rotingnumber}
              setValue={setrotingnumber}
              editable={isPaymentDetails}
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`Account Number`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            <MyTextInput
              placeholder={''}
              value={acnumber}
              setValue={setacnumber}
              editable={isPaymentDetails}
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
             </>
            : null
          }



            <MyText
              text={`Address`}
              textColor="#000"
              fontSize={15}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={20}
              style={{marginLeft: 20, marginTop: 10, fontWeight: 700}}
            />
            <MyText
              text={`Street`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 20}}
            />
            <MyTextInput
              placeholder={''}
              value={addressLine1}
              setValue={setAddressLine1}
             // editable={isPaymentDetails}
              // style={
              //   isValidationError && checkIfEmpty(chequeNumber)
              //     ? styles.genericInputNotFilledStyle
              //     : styles.genericInputFilledStyle
              // }
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`City, State, Zip`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            <MyTextInput
              placeholder={''}
              value={addressLine2}
              setValue={setAddressLine2}
             // editable={isPaymentDetails}
              // style={
              //   isValidationError && checkIfEmpty(chequeNumber)
              //     ? styles.genericInputNotFilledStyle
              //     : styles.genericInputFilledStyle
              // }
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`Email`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            <MyTextInput
              inputRef={emailRef}
              placeholder={''}
              value={email}
              setValue={setEmail}
             // editable={isPaymentDetails}
              onSubmitEditing={() => phoneRef.current.focus()}
              // style={
              //   isValidationError && checkIfEmpty(email)
              //     ? styles.genericInputNotFilledStyle
              //     : styles.genericInputFilledStyle
              // }
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`Phone`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            <MyTextInput
              inputRef={phoneRef}
              placeholder={''}
              value={phone}
              //setValue={setPhone}
             // editable={isPaymentDetails}
              keyboardType="number-pad"
              maxLength={Platform.OS == 'android' ? 14 : 10}
              onChangeText={text => formatPhoneNumber(text)}
              isOnChangeText={true}
              onSubmitEditing={() => accountUserIdRef.current.focus()}
              // style={
              //   isValidationError && checkIfEmpty(phone)
              //     ? styles.genericInputNotFilledStyle
              //     : styles.genericInputFilledStyle
              // }
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`Worldmark by Wyndham Account:`}
              textColor="#000"
              fontSize={15}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={20}
              style={{marginLeft: 20, marginTop: 10, fontWeight: 700}}
            />
            <MyText
              text={`Username:`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 20}}
            />
            <MyTextInput
              placeholder={''}
              value={username}
              setValue={setUserName}
              // style={
              //   isValidationError && checkIfEmpty(chequeNumber)
              //     ? styles.genericInputNotFilledStyle
              //     : styles.genericInputFilledStyle
              // }
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`Password`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 10}}
            />
            <MyTextInput
              placeholder={''}
              value={paypalPassword}
              setValue={setPaypalPassword}
              // style={
              //   isValidationError && checkIfEmpty(chequeNumber)
              //     ? styles.genericInputNotFilledStyle
              //     : styles.genericInputFilledStyle
              // }
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`Acknowledgment and approval of contract:`}
              textColor="#000"
              fontSize={15}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={20}
              style={{marginLeft: 20, marginTop: 10, fontWeight: 700}}
            />
              <MyTextInput
              placeholder={''}
              value={points}
              setValue={setPrintName}
              editable={false}
           
              style={{...styles.textInputStyle, ...styles.textInputStyle3}}
            />
            <MyText
              text={`Print Name`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: -5}}
            />
            <MyText
              text={`Worldmark by Wyndham Owner`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 5}}
            />
         
            <View
              style={{
                borderBottomWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
              }}>
             
               <MyText
                  text={points}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="AlexBrush-Regular"
                  textAlign="auto"
                  lineHeight={19}
                  style={{marginLeft: 10, marginTop: 5,fontStyle: 'italic'}}
                />
            </View>
            <MyText
              text={`Signature`}
              textColor="#353334"
              fontSize={13}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={19}
              style={{marginLeft: 20, marginTop: 5}}
            />

            <View style={{flexDirection: 'row'}}>
              <MyText
                text={`Date :`}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={19}
                style={{marginLeft: 20, marginTop: 15}}
              />
              <MyTextInput
                // inputRef={emailRef}
                placeholder={''}
                editable={false}
                value={moment(new Date()).format('MM/DD/YYYY')}
                setValue={setAgreementEnteredIntoOn}
                onSubmitEditing={() => anniStartDates.current.focus()}
                style={{...styles.textInputStyle, ...styles.textInputStyle5}}
              />
            </View>

            <MyText
              text={`Timeshare Simplified`}
              textColor="#000"
              fontSize={15}
              fontFamily="Verdana"
              textAlign="auto"
              lineHeight={20}
              style={{marginLeft: 20, marginTop: 30, fontWeight: 700}}
            />
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                marginTop: 20,
                justifyContent: 'space-around',
              }}>
              <View style={{width: '68%'}}>
                <Text style={{marginLeft:30,top:30,}}>{printName}</Text>
                <MyTextInput
                  placeholder={''}
                  value={''}
                  setValue={setPrintName}
                  editable={false}
                  style={{...styles.textInputStyle, ...styles.textInputStyle3}}
                />
                <MyText
                  text={`Print Name`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={19}
                  style={{marginLeft: 30, marginTop: -5}}
                />
              </View>
              <View style={{width: '50%'}}>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    width: '80%',
                    alignSelf: 'center',
                  }}>
                
                   <MyText
                  text={printName}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="AlexBrush-Regular"
                  textAlign="auto"
                  lineHeight={19}
                  style={{marginLeft: 10, marginTop: 30,fontStyle: 'italic'}}
                />
                </View>
                <MyText
                  text={`Signature`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={19}
                  style={{marginLeft: 20, marginTop: 5}}
                />
                <View style={{flexDirection: 'row'}}>
                  <MyText
                    text={`Date :`}
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    lineHeight={19}
                    style={{marginLeft: 20, marginTop: 20}}
                  />
                  <View style={{width: 184}}>
                    <MyTextInput
                      // inputRef={emailRef}
                      placeholder={''}
                      editable={false}
                      value={moment(new Date()).format('MM/DD/YYYY')}
                      // value={moment(agreementEnteredIntoOn).format(
                      //   'MM/DD/YYYY',
                      // )}
                      setValue={setAgreementEnteredIntoOn}
                      onSubmitEditing={() => anniStartDates.current.focus()}
                      // style={{...styles.textInputStyle}}
                      // textInputstyle={{padding: 0, marginLeft:10}}
                      // isValidationError && checkIfEmpty(agreementEnteredIntoOn)
                      //   ? styles.redBorderNotFilled
                      //   : null
                      style={{
                        ...styles.textInputStyle,
                        ...styles.textInputStyle6,
                      }}
                    />
                 </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 10,
              width: '100%',
              backgroundColor: '#f5f5f2',
            }}></View>
          <View style={{marginTop: 20}}>
            <Image
              style={{width: '100%'}}
              source={images.bottombanner}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
        <MyButton
          text={'Submit'}
          onPress={() => {
            submitContract();
          }}
          style={[styles.buttonStyle, {alignSelf: 'center', marginBottom: 20}]}
        />
      </View>
      <SuccessfullySigned
        visible={showSignedContractModal}
        setVisibility={setShowSignedContractModal}
        viewSignedContract={gotoSignedContracts}
        visitWebsite={visitWebsite}
        davename={developerName}
        gotoSellMorePoints={gotoSellMorePoints}
      />
    </>
  );
};

export default WorldmarkContract;
// const SimpleTextInput = ({
//   inputRef,
//   value,
//   setValue = () => {},
//   placeholder,
//   keyboardType,
//   maxLength,
//   onSubmitEditing,
//   editable,
//   placeholderTextColor = Colors.LIGHT_GRAY,
//   onTouchStart,
//   fontSize = 14,
//   style = {},
//   inputContainerStyle = {},
// }) => {
//   return (
//     <View style={{borderBottomWidth:1.5,backgroundColor:'red'}} >
//       <TextInput

//         placeholder={placeholder}
//         keyboardType={keyboardType}
//         value={value}
//         onChangeText={newText => setValue(newText)}
//         editable={editable}
//       />
//     </View>
//   );
// };
