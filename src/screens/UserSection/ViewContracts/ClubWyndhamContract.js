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
import {
  formatPhoneNumber,
  getImageForDeveloper,
  width,
} from '../../../global/Constant';
import {useDispatch, useSelector} from 'react-redux';
import MyButton from '../../../components/MyButton/MyButton';
import Toast from 'react-native-simple-toast';

import SimpleTextInput from '../../../components/MyTextInput/BottomlineTextInput';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import moment from 'moment';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import SuccessfullySigned from '../../../modals/SuccessfullySigned/SuccessfullySigned';
import {CommonActions} from '@react-navigation/native';
const ClubWyndhamContract = ({navigation, route}) => {
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
  const [rotingnumber,setrotingnumber]=useState('');
  const [acnumber,setacnumber]=useState();
  const [achnumber,setachnumber]=useState('')
  const [paymenttype,setpaymenttype]=useState(true)
  const [mvc,setmvc]=useState(true)
  const [ach,seach]=useState(true)



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

  const validatio_n = () => {
    if (chequeNumber == 'Y' || chequeNumber == 'y') {
      if (checkIfEmpty(username)) {
       
        return false;
      }else if(checkIfEmpty(paypalEmail)){
        
        return false;
      } else if (checkIfEmpty(paypalPassword)) {
       
        return false;
      } else if (checkIfEmpty(printName)) {
       
        return false;
      } else if (checkIfEmpty(signature)) {
       
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
      } else if (checkIfEmpty(rotingnumber)) {
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


  const validation = () => {

    console.log(paymenttype);

   if(mvc==false){
      return false;
    }else if(paymenttype==false){
     
        if (checkIfEmpty(username)) {
          return false;
        } else if (checkIfEmpty(paypalPassword)) {
          return false;
        } else if (checkIfEmpty(printName)) {
          return false;
        }  else if (checkIfEmpty(signature)) {
          return false;
        } else if (checkIfEmpty(addressLine1)) {
          return false;
        } else if (checkIfEmpty(addressLine2)) {
          return false;
        } else if (checkIfEmpty(email)) {
          return false;
        } 
       
        else if (checkIfEmpty(phone)) {
          return false;
        }else{
        return true;
        } 
    }else if(paymenttype==true){
      if(checkIfEmpty(paypalEmail)){
      
        return false;
      }else if (checkIfEmpty(username)) {
        return false;
      } else if (checkIfEmpty(paypalPassword)) {
        return false;
      } else if (checkIfEmpty(printName)) {
        return false;
      } else if (checkIfEmpty(signature)) {
        return false;
      }
       return true;
    }else if(paymenttype=='ach'){
      if (checkIfEmpty(rotingnumber)) {
          return false;
        } else if (checkIfEmpty(acnumber)) {
          return false;
        }
      return true;
    } 
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
      paypal_email: paypalEmail, 
      signature: printName,
      paypal_password:paypalPassword,
      // paypal_status: chequeNumber,
      // check_status: personalCheck,
      //   routing_number:rotingnumber,
      //   account_number :acnumber,
      //   ach_number:achnumber,

        paypal_status: paymenttype==true?'Y':'N',
        check_status: paymenttype==false?'Y':'N',
        mvc_salesperson:'1',
        routing_number:rotingnumber,
        account_number :acnumber,
        ach_number:achnumber
    };
    
    if (paymenttype=='ach') {
      data.ach_number = achnumber;
    }
    if (paymenttype==true) {
      data.paypal_email = paypalEmail;
      data.paypal_password = paypalPassword;
    }
    if (paymenttype==false) {
      const data2 = {
        check_code: chequeNumber,
        // check_firstname: firstName,
        // check_lastname: lastName,
        check_email: email,
      };
      data = {...data, ...data2};
  }

    for (const [key, value] of Object.entries(data)) {
      postData.append(String(key), value);
    }

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
        setShowSignedContractModal(true);
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
              style={{height: 638, width: '100%'}}
              source={images.clubwyndhambanner}
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
                  text={'Timeshare Management Service Agreement'}
                  textColor="#1050A2"
                  fontSize={20}
                  fontFamily="Verdana"
                  style={{marginBottom: 15, marginLeft: 20, marginTop: 50}}
                />
                 <View>
                  <MyText
                    text={'This Timeshare Management Service Agreement ("Agreement") is entered into as of the date when all parties have signed this agreement'}
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    style={{marginLeft: 20, fontWeight: 400}}
                  />
  
                 <View style={{flexDirection:'row',width:width-150,alignItems:'center'}}>
                 <MyTextInput
                    // inputRef={emailRef}
                    placeholder={''}
                    editable={false}
                    value={moment(new Date()).format('MM/DD/YYYY')}
                    setValue={setAgreementEnteredIntoOn}
                    onSubmitEditing={() => anniStartDates.current.focus()}
                    style={{...styles.textInputStyle}}
                    textInputstyle={{padding: 0, paddingLeft: 10}}
                    // isValidationError && checkIfEmpty(agreementEnteredIntoOn)
                    //   ? styles.redBorderNotFilled
                    //   : null
                  />
                   <MyText
                    text={', by and between:'}
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    style={{marginLeft: 20, fontWeight: 400}}
                  />
                 </View>
                  
                </View>

                <MyText
                  text={' And between:KTJ Enterprises Inc. a Nevada Corporation,d/b/a Timeshare Simplified [support@timesharesimplified.com] ("TS ") and'}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  style={{marginLeft: 20, fontWeight: 300, marginTop: 0}}
                />
  
                <View
                  style={{
                    flexDirection: 'row',
                    // marginTop: 5,
                    alignItems: 'center',
                  }}>
                  {/* <MyText
                    text={' Simplified and,'}
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    style={{marginLeft: 20, marginTop: 12}}
                  /> */}
                  <MyTextInput
                    inputRef={pointsRef}
                    placeholder={'Type here'}
                    editable={false}
                    value={points}
                    setValue={setPoints}
                    keyboardType="number-pad"
                    onSubmitEditing={() => yearRef.current.focus()}
                    style={{...styles.textInputStyle, ...styles.textInputStyle1,top:-5}}
                    // textInputstyle={{width: '100%'}}
                  />
                </View>
                <MyText
                  text={'("Program Member",“You” or "PM") (collectively referred to as "Parties")'}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  style={{marginLeft: 20, marginTop: 0,top:-5}}
                />
               
           </ImageBackground>
           <View>
                  <MyText
                    text={`Background :`}
                    textColor="#000"
                    fontSize={14}
                    fontFamily="Verdana"
                    textAlign={'auto'}
                    style={{marginLeft: 20, marginTop: 70, fontWeight: '700'}}
                  />
                  <MyText
                    text={
                      'WHEREAS, Program Member owns a number of points in the Club wyndham Vacation Club("CW") timeshare program and desires to engage TS to act as its designated delegate to operate PM’s timeshare program for the purposes including but not limited to, arranging, coordinating and identifying Guests to utilize PM’s CW points; and'
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

                 <MyText
                    text={
                      'WHEREAS, TS is willing to provide the services as described herein and facilitate use of your account in accordance with the terms set forth below'
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
              {/* <View>
                <MyText
                  text={'This agreement is hereby entered into on'}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  style={{marginLeft: 20, fontWeight: 400}}
                />

                
                <MyTextInput
                  // inputRef={emailRef}
                  placeholder={''}
                  editable={false}
                  value={moment(new Date()).format('MM/DD/YYYY')}
                  setValue={setAgreementEnteredIntoOn}
                  onSubmitEditing={() => anniStartDates.current.focus()}
                  style={{...styles.textInputStyle}}
                  textInputstyle={{padding: 0, paddingLeft: 10}}
                  // isValidationError && checkIfEmpty(agreementEnteredIntoOn)
                  //   ? styles.redBorderNotFilled
                  //   : null
                />
              </View>  <MyText
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
                text={'Club Wyndham Member. This contract is void'}
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
                  text={'if not signed within'}
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
              </View> <View
              style={{
                backgroundColor: '#FEFDFB',

                paddingVertical: 10,
                width: '90%',
                alignSelf: 'center',
                marginTop: 50,
              }}>
              <MyText
                text={
                  'Timeshare Account Utilization by signing this agreement, you agree to give us access to your Club Wyndham Member account information to make bookings on your behalf. In your account it includes your personal contact details, owner number, username, and password . We will keep information secure and safe with keepersecurity.com , and use only the agreed upon number of points to book reservations for various different amounts, at various times of the year, depending upon business needs.'
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
                  'If we utilize your account to rent out the your timeshare points, you agree that we shall not be held liable for any actions taken by your resort in relation to your account, including but not limited to the loss of your account and any damages imposed by Club Wyndham Member resorts ownership department. You acknowledge and agree to indemnify, defend, and hold us harmless from any claims, demands, suits, or actions arising out of or related to the aforementioned utilization of your account.'
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
            </View> */}




            
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
                      `'The client agrees not to change their password until we have utilized the agreed upon points and the last guest has checked in. After that point, the client is free to change their password to a different one. In the event that the owner changes their password, they agree to provide us with the new password and access to reuse the points we have already compensated them for. Reservation Changes and Cancellations: If the owner changes the password without allowing us to reuse the points, or cancels any of the reservations made under a guest's name, we reserve the right to terminate their participation in our program and discontinue providing our services to them in the future.'`
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
                text={`Summary:`}
                textColor="#1050A2"
                fontSize={16}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={25}
                style={{marginLeft: 20, marginTop: 40}}
              />

        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
          <View style={{width:'70%'}}>
              <MyText
                text={`Number Of Points Allocated: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{borderBottomColor:'#000',borderBottomWidth:1,width:'30%'}}>
              <Text style={{fontSize:13,color:'#353334',fontFamily:'Verdana',lineHeight:21,marginTop: 20, fontWeight: 400,textAlign:'center'}}>{rentOut}</Text>
              </View>
             
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
          <View style={{width:'70%'}}>
              <MyText
                text={`Use Year: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{borderBottomColor:'#000',borderBottomWidth:1,width:'30%'}}>
              <Text style={{fontSize:13,color:'#353334',fontFamily:'Verdana',lineHeight:21,marginTop: 20, fontWeight: 400,textAlign:'center'}}>{selectedYear}</Text>
              </View>
             
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
          <View style={{width:'50%'}}>
              <MyText
                text={`Your Club wyndham Username: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{width:'50%'}}>
              <MyTextInput
                placeholder={''}
                value={username}
                setValue={setUserName}
                style={{...styles.textInputStyle, ...styles.textInputStyle3,width:'100%',left:-20}}
              />      
              </View>
             
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
          <View style={{width:'50%'}}>
              <MyText
                text={`Password: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{width:'50%'}}>
              <MyTextInput
                placeholder={''}
                value={paypalPassword}
                setValue={setPaypalPassword}
                style={{...styles.textInputStyle, ...styles.textInputStyle3,width:'100%',left:-20}}
              />      
              </View>
             
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
          <View style={{width:'70%'}}>
              <MyText
                text={`Payment Per Point: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{borderBottomColor:'#000',borderBottomWidth:1,width:'30%'}}>
              <Text style={{fontSize:13,color:'#353334',fontFamily:'Verdana',lineHeight:21,marginTop: 20, fontWeight: 400,textAlign:'center'}}>{pricePerPoint}</Text>
              </View>
             
        </View>
        <MyText
                text={`Your Address`}
                textColor="#000"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={20}
                style={{marginLeft: 18, marginTop: 10, }}
              />

        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
          <View style={{width:'50%'}}>
              <MyText
                text={`Street: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{width:'50%'}}>
              <MyTextInput
                 placeholder={''}
                 value={addressLine1}
                 setValue={setAddressLine1}
                 editable={isPaymentDetails}
                style={{...styles.textInputStyle, ...styles.textInputStyle3,width:'100%',left:-20}}
              />      
              </View>
             
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
          <View style={{width:'50%'}}>
              <MyText
                text={`City, State, Zip: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{width:'50%'}}>
              <MyTextInput
                 placeholder={''}
                 value={addressLine2}
                 setValue={setAddressLine2}
                 editable={isPaymentDetails}
                style={{...styles.textInputStyle, ...styles.textInputStyle3,width:'100%',left:-20}}
              />      
              </View>
             
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
          <View style={{width:'50%'}}>
              <MyText
                text={`Email: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{width:'50%'}}>
              <MyTextInput
                 inputRef={emailRef}
                 placeholder={''}
                 value={email}
                 setValue={setEmail}
                 editable={isPaymentDetails}
                 onSubmitEditing={() => phoneRef.current.focus()}
                style={{...styles.textInputStyle, ...styles.textInputStyle3,width:'100%',left:-20}}
              />      
              </View>
             
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
          <View style={{width:'50%'}}>
              <MyText
                text={`Phone: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{width:'50%'}}>
              <MyTextInput
                 inputRef={phoneRef}
                 placeholder={''}
                 value={phone}
                 editable={isPaymentDetails}
                 keyboardType="number-pad"
                 maxLength={Platform.OS == 'android' ? 14 : 10}
                 onChangeText={text => formatPhoneNumber(text)}
               isOnChangeText={true}
                 onSubmitEditing={() => accountUserIdRef.current.focus()}
                style={{...styles.textInputStyle, ...styles.textInputStyle3,width:'100%',left:-20}}
              />      
              </View>
             
        </View>

              <View style={{marginHorizontal: 10}}>
              <MyText
                text={`Payment`}
                textColor="#000"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                style={{marginLeft: 10, marginTop: 30, }}
              />
              <MyText
                text={`Within 21 days for the Number of Points used from your account to make a Guest Reservation.`}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={19}
                style={{marginLeft: 10, marginTop: 20}}
              />
          
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%',alignItems:'center'}}>
          <View style={{width:'50%'}}>
              <MyText
                text={`Payment Method: `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{width:'50%',flexDirection:'row',alignItems:'center'}}>
                 <Text style={{fontSize:10,color:'#353334',fontFamily:'Verdana',lineHeight:21,marginTop: 20, fontWeight: 400,textAlign:'center'}}>Paypal</Text>
                   <TouchableOpacity style={{width:20,height:20,borderRadius:20,borderColor:'#000',borderWidth:1,marginLeft:3,marginTop: 20,justifyContent:'center'}}
                   onPress={()=>{
                    setIsPaymentDetails(false);
                    setIsPersonalCheck(false);
                    setChequeNumber('Y');
                    setpaymenttype(true)
                    setrotingnumber('')
                    setacnumber('')
                    }}>
                    <View style={{width:'80%',height:'80%',borderRadius:20,backgroundColor:paymenttype==true?'#000':'#fff',alignSelf:'center'}}></View>
                   </TouchableOpacity>
                   <Text style={{fontSize:10,color:'#353334',fontFamily:'Verdana',lineHeight:21,marginTop: 20, fontWeight: 400,textAlign:'center',marginLeft:10}}>Check</Text>
                   <TouchableOpacity style={{width:20,height:20,borderRadius:20,borderColor:'#000',borderWidth:1,marginLeft:3,marginTop: 20,justifyContent:'center'}}
                   onPress={()=>{
                    setPersonalCheck('N');
                    setIsPersonalCheck1(false);
                    setIsPaymentDetails(true)
                     setpaymenttype(false)
                     setrotingnumber('')
                     setacnumber('')
                     setPaypalEmail('')
                    }}>
                    <View style={{width:'80%',height:'80%',borderRadius:20,backgroundColor:paymenttype==false?'#000':'#fff',alignSelf:'center'}}></View>
                   </TouchableOpacity>
                   <Text style={{fontSize:10,color:'#353334',fontFamily:'Verdana',lineHeight:21,marginTop: 20, fontWeight: 400,textAlign:'center',marginLeft:10}}>ACH</Text>
                   <TouchableOpacity style={{width:20,height:20,borderRadius:20,borderColor:'#000',borderWidth:1,marginLeft:3,marginTop: 20,justifyContent:'center'}}
                   onPress={()=>{
                    setPersonalCheck('N');
                    setIsPersonalCheck1(false);
                    setIsPaymentDetails(true);
                     setpaymenttype('ach')
                     setPaypalEmail('')
                    }}>
                    <View style={{width:'80%',height:'80%',borderRadius:20,backgroundColor:paymenttype=='ach'?'#000':'#fff',alignSelf:'center'}}></View>
                   </TouchableOpacity>
              </View>
             
        </View>

           {paymenttype==true ?
                 <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
                 <View style={{width:'50%'}}>
                     <MyText
                       text={`Paypal Email: `}
                       textColor="#353334"
                       fontSize={13}
                       fontFamily="Verdana"
                       textAlign="auto"
                       lineHeight={21}
                       style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                     />
                 </View>

                     <View style={{width:'50%'}}>
                     <TextInput
                        editable
                        maxLength={40}
                        onChangeText={text => {setPaypalEmail(text)}}
                        value={paypalEmail}
                        style={{...styles.textInputStyle, ...styles.textInputStyle3,width:'100%',left:-20,height:40}}
                      />
                     </View>
                    
               </View>
               : paymenttype==false ?
               <></>
              
               : paymenttype=='ach' ?
               <>
             
               <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
                 <View style={{width:'50%'}}>
                     <MyText
                       text={`Routing Number: `}
                       textColor="#353334"
                       fontSize={13}
                       fontFamily="Verdana"
                       textAlign="auto"
                       lineHeight={21}
                       style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                     />
                 </View>
                   
                     <View style={{width:'50%'}}>
                     <MyTextInput
                        placeholder={''}
                        value={rotingnumber}
                        setValue={setrotingnumber}
                        editable={isPaymentDetails}
                        style={{...styles.textInputStyle, ...styles.textInputStyle3,width:'100%',left:-20}}
                     />      
                     </View>
                    
               </View>
               <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%'}}>
                 <View style={{width:'50%'}}>
                     <MyText
                       text={`Account Number: `}
                       textColor="#353334"
                       fontSize={13}
                       fontFamily="Verdana"
                       textAlign="auto"
                       lineHeight={21}
                       style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                     />
                 </View>
                   
                     <View style={{width:'50%'}}>
                     <MyTextInput
                        placeholder={''}
                        value={acnumber}
                        setValue={setacnumber}
                        editable={isPaymentDetails}
                        style={{...styles.textInputStyle, ...styles.textInputStyle3,width:'100%',left:-20}}
                     />      
                     </View>
                    
               </View>
           
             </>
             :
             null
              }
       <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%',alignItems:'center'}}>
          <View style={{width:'70%'}}>
              <MyText
                text={`At purchase my CW Salesperson advised me I could Rent out my timeshare: : `}
                textColor="#353334"
                fontSize={13}
                fontFamily="Verdana"
                textAlign="auto"
                lineHeight={21}
                style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
              />
          </View>
            
              <View style={{width:'35%',flexDirection:'row',alignItems:'center'}}>
                 <Text style={{fontSize:10,color:'#353334',fontFamily:'Verdana',lineHeight:21,marginTop: 20, fontWeight: 400,textAlign:'center',marginLeft:20}}> </Text>
                   <TouchableOpacity style={{width:20,height:20,borderRadius:2,borderColor:'#000',borderWidth:1,marginLeft:3,marginTop: 20,justifyContent:'center'}}
                   onPress={()=>{
                    setmvc(!mvc)
                    }}>
                      {mvc ? 
                      <Image style={{width:'100%',height:'100%',resizeMode:"stretch"}} source={require('../../../assets/images/blue-tick.png')}></Image>
                      : null}
                   </TouchableOpacity>
                 
              </View>
             
        </View>


            </View>
            <Image source={images.fbanner22} />
    {/* ************************* Defination  section******** */}         
              <View style={{marginHorizontal: 5}}>
              
              <MyText
                  text={`In consideration  of  the  mutual  covenants  and  agreements  stated  below,  the  parties agree as follows: `}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                <MyText
                  text={`1. Definitions:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`Capitalized terms not defined herein shall have the same meaning as that given to them by the Abound by Club wyndham Vacations Exchange Procedures governing PM’s ownership [document No. 526828-22(6.30.22)].`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                <MyText
                  text={`2. Term:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`This agreement shall commence on the Effective Date and shall continue until the earlier of the completion of PM’s current Use Year or the exhaustion or expiration of the Number of Points Allocated.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`3. Appointment as Delegate:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`Program Member hereby authorizes TS to act as its designated Delegate for the purposes of making reservations and operating PM’s account for the Number of Points Allocated by PM as set out in the Summary. PM shall provide any required notices to CW. Program Member agrees to provide during the Term, PM’s login credentials to TS for the online reservation system and authorize TS to log in to and interact with CW reservation or other personnel on behalf of Program Member. TS is also authorized by PM to answer any reservation questions, phone calls, certifications, or acknowledgments on behalf of Program Member in connection with any Guest reservation.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`4. Payment:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`TS will remit to PM  the agreed  amount per point for the points used to secure an invited Guest reservation on your behalf as described in the Summary. TS will make reservations and introduce Guests to PM in exchange for a service fee payable by PM, which shall be equal to the net difference between the amount received from the Guest for the use of an Accommodation and the amount of the Advance Payment paid to PM. In the event the amount paid by a Guest is less than the amount paid to PM, no additional payment shall be paid by PM to TS. PM acknowledges and agrees that all pay-ments from Guests will be collected by TS. Payments will be made per our payout schedule which we will notify You of and modify from time to time.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`5. Unused Points:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`TS will use every effort to utilize the Number of Points Allocated for the Use Year. TS does not guarantee all or any of the points will be booked and used for Guest Reservations. TS will use its best to secure Guest bookings. PM is responsible for any unused or leftover points and no advance payment or payments will be made for points that are unused or that have expired. We will use our best endeavors to book as many of the Points Allocated for the Use Year.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`6. Rollover Points:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`We will automatically carry forward the Number of Points Allocated into the following year on your behalf. The roll over date is set at three months to anytime during your current Use Year depending on the ownership level you have to the deadline to rollover, unless you provide written notice to us at least 30 days prior to your rollover deadline.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`We will put a reminder in our system to roll over your points into the next use year to prevent losing any points. However, ultimately you are still responsible for the points being rolled over. So, we recommend you to also set a reminder to ensure that the points have been saved to the next use year at least two weeks prior to the deadline.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                <MyText
                  text={`For instance, if you are a Standard Wyndham owner and have allocated 200,000 points to us, with an anniversary date from January 1 to December 31st, and we utilize 120,000 points by March 31st, we will carry forward the remaining 80,000 points into the following use year for bookings in that year which will automatically be deemed the Number of Points Allocated and the Payment Per Point Remains the same.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`Deposit Windows*`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                 <MyText
                  text={`Standard: Points may be deposited within the first three months of your current Use Year.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`VIP Bronze: Points may be deposited within the first four months of your current Use Year.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`VIP Silver: Points may be deposited within the first six months of your current Use Year.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`VIP Gold: Points may be deposited within the first nine months of your current Use Year.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`VIP Platinum: Points may be deposited anytime during your current Use Year.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`VIP Founders: Points may be deposited anytime during your current Use Year.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
               <MyText
                  text={`***If you submit your points to us after the allowable rollover. We will do everything we can in our best efforts to get those monetized for you. However, we cannot guarantee that they will get monetize by the end of your use year.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 5, fontWeight: 400}}
                />
                 <MyText
                  text={`7. Guest Cancellations:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`You understand that cancellations are inevitable and you will not hold us liable for such cancellation or any impact to your account or points status for such cancellations. In the event a guest cancels within the 60-day window, those points will be transferred to a holding account and placed in priority for rebooking another guest to be rebooked if possible. Whilst we will make every attempt to use cancelled points for another guest you understand that this may not be possible and as such those points shall be deducted from the Number of Points Allocated by you to us.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`8. Reservations:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`TS will ensure that all relevant information required to be provided by Guests to CW is provided by TS on behalf of Program Member. Reservations are limited to bookings made within the timeframe available for rolling over points, which varies depending on your ownership level. Executive, Presidential, and Chairman levels will have a 9-month window, while Select and Standard owners will have a 7-month window. Bookings will not extend beyond the last day allowable for point rollover.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`9. Representations and Warranties:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`Program Member represents and warrants to TS that: `}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`I.  You will not override or cancel any Guest reservation made by TS on your behalf;`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 10, fontWeight: 400}}
                />
                 <MyText
                  text={`II. Program Member's CW account is in good standing, and it has the authority to make Guest reservations;`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 10, fontWeight: 400}}
                />
                 <MyText
                  text={`III. Program Member has not received any notices from CW that it is not otherwise permitted to offer Accommodations to an invited Guest;`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 10, fontWeight: 400}}
                />
                <MyText
                  text={`IV. Program Member is not engaged in any commercial use or purpose with respect to their CW account;`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 10, fontWeight: 400}}
                />
                <MyText
                  text={`V. TS is not engaged to operate your account for any commercial use or purpose.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 10, fontWeight: 400}}
                />
                  <MyText
                  text={`10. Non- Commercial Use:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`The purpose of our services is to cover annual fees and other costs associated with your timeshare ownership, that is for personal use, and only as needed. You agree and acknowledge that usage of our services are for “non-commercial use” and any payment remitted is intended to offset, reimburse or fund maintenance fee payments and/or monthly loan payments related to your timeshare ownership. We require you to understand the rules and regulations set by their timeshare ownership. You are required to immediately alert us with any updates or changes to the status of Your timeshare ownership account as a result of purported misuse. Failure to comply may result in permanent account suspension and/or monetary damages.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`This change in status could include, but is not limited to:`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 5, fontWeight: 400}}
                />
                <MyText
                  text={`Account suspension or foreclosure for non-payment;`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 5, fontWeight: 400}}
                />
                <MyText
                  text={`Warning for violation of commercial use clause; and`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 5, fontWeight: 400}}
                />
                <MyText
                  text={`Account suspension for “commercial use”.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 5, fontWeight: 400}}
                />
              
                 <MyText
                  text={`11. Cancellation:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`Either party may terminate this Agreement by providing written notice to the other party at least 30 days in advance. All exiting reservations must be honored and any prepayments made to you (if any) must be repaid to us immediately.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`12. Dispute Resolution:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`a. Any dispute arising out of or relating to this Agreement shall be resolved through mediation in Las Vegas or another venue nominated by TS. If medi-ation fails to resolve the dispute, it shall then proceed to arbitration in accordance with the  rules  of  the  American  Arbitration Association,  and  judgment  upon  the  award ren-dered by the arbitrator(s) may be entered in any court having jurisdiction thereof.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`13. Assignment:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`This Agreement is fully assignable by TS and benefits our successors and  assigns.  Any  such  assignment  will  require  the  assignee  to  fulfill  our  obligations  under this Agreement. We reserve the right to outsource or assign any of our obligations under this Agreement to an affiliate or third party without your consent.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`14. Indemnification:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`PM agrees to indemnify and hold TS and our subsidiaries, affili- ates, shareholders, members, directors, officers, employees and agents harmless against,  and to reimburse us and them for, any loss, liability or damages arising out of or relating  to  the  services,  or  your  actions  or  inaction,  and  all  reasonable  costs  of  defending  any   claim  brought  against  any  of  us  or  them  or  any  action  in  which  any  of  us  or  them  is   named as a party. (including reasonable attorneys’ fees) unless the loss, liability, damage or cost is solely due to our negligence.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`15. Tax Advice Responsibility:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={` Program Member acknowledges and agrees that they are solely responsible for obtaining and relying upon their own independent tax advice in relation to any payments made or received under this Agreement. TS does not provide tax advice, and Program Member should consult with their own qualified tax professionals or advisors to ensure compliance with all applicable tax laws and regulations. Program Member shall hold TS harmless from any tax-related liabilities, penalties, or consequences arising from the payments made or received under this Agreement.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`16. Data Privacy and Confidentiality:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`i. Data Collection and Usage: TS may collect and process personal data of Program Member and Guests as necessary for the performance  of services under this Agreement. Program Member acknowledges and consents to the collection,  storage,  and  use  of  personal  data  for  the  purposes  outlined  in  this  Agree- ment. Personal data will only be used for the purpose of facilitating and managing Guest  reservations and related services. ii. Confidentiality: Both Parties shall maintain the confi- dentiality and security of any personal data shared or accessed during the provision of services under this Agreement. Personal data shall not be disclosed to third parties with- out the explicit consent of the data subject, except as required by law.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`17. Binding Effect:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`This  Agreement  is  binding  upon  the  parties  and  their  respective   executors, administrators, heirs, assigns, and successors in interest, and will not be modi-fied except by written agreement signed by both you and us Except as provided above, this Agreement is not intended, and will not be deemed, to confer any rights or remedies upon any person or legal entity not a party to this Agreement.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
                 <MyText
                  text={`18. Governing Law:`}
                  textColor="#000"
                  fontSize={14}
                  fontFamily="Verdana"
                  textAlign="auto"
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 700}}
                />
                <MyText
                  text={`This Agreement shall be governed by and construed in accordance with the laws of the State of Nevada. This Agreement represents the entire understand- ing between the Parties and supersedes all prior agreements and understandings, oral or written. Any modification to this Agreement must be in writing and signed by both  Parties. IN WITNESS WHEREOF, the Parties hereto have executed this Timeshare Management Service Agreement as of the Effective Date.`}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20, marginTop: 20, fontWeight: 400}}
                />
              </View>
            
           
            </View>

    {/* *************************KTJ Enterprises Inc. dba section******** */}
            <View>
          <View style={{marginHorizontal: 10}}>
         
       <Text style={{fontSize:13,color:'#000',fontWeight:'700',marginLeft:15,marginTop:20}}>KTJ Enterprises Inc. dba Timeshare Simplified</Text>

            <View
              style={{
              
                marginBottom: 20,
                marginTop: 20,
            
              }}>
             
             <View
                  style={{
                    width: '80%',
                   flexDirection:'row'
                  }}>
                
                 <MyText
                  text={`Signature :   `}                
                    textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20,  fontWeight: 400}}
                />
                  <View
                  style={{
                   borderBottomWidth: 0.5,
                    width: '80%',
                 
                  }}>
                   <MyText
                  text={printName}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={19}
                  style={{marginLeft: 10,fontStyle: 'italic', }}
                />
               
               </View>
                </View>

                <View
                  style={{
                    width: '80%',
                   flexDirection:'row',
                   marginTop:20
                  }}>
                
                 <MyText
                 text={`Printed Name :`}         
                    textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={21}
                  style={{marginLeft: 20,  fontWeight: 400}}
                />
                  <View
                  style={{
                   borderBottomWidth: 0.5,
                    width: '80%',
                  
                  }}>
                   <MyText
                  text={printName}
                  textColor="#353334"
                  fontSize={13}
                  fontFamily="Verdana"
                  textAlign="auto"
                  lineHeight={19}
                  style={{marginLeft: 10, }}
                />
               
               </View>
                </View>

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
                      placeholder={''}
                      editable={false}
                      value={moment(new Date()).format('MM/DD/YYYY')}
                   
                      setValue={setAgreementEnteredIntoOn}
                      onSubmitEditing={() => anniStartDates.current.focus()}
                    
                      style={{
                        ...styles.textInputStyle,top:7,left:5,
                        ...styles.textInputStyle6,
                      }}
                    />
                  </View>
                </View>


             
            </View>
          </View>

          <View style={{marginHorizontal: 10}}>
         
         <Text style={{fontSize:13,color:'#000',fontWeight:'700',marginLeft:15,marginTop:20}}>Program Member Full Name and Signature</Text>
  
              <View
                style={{
                
                  marginBottom: 20,
                  marginTop: 20,
              
                }}>
               
               <View
                    style={{
                      width: '80%',
                     flexDirection:'row'
                    }}>
                  
                   <MyText
                    text={`Signature :   `}                
                      textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    lineHeight={21}
                    style={{marginLeft: 20,  fontWeight: 400}}
                  />
                    <View
                    style={{
                     borderBottomWidth: 0.5,
                      width: '80%',
                   
                    }}>
                     <MyText
                   text={userInfo.name}
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    lineHeight={19}
                    style={{marginLeft: 10,fontStyle: 'italic', }}
                  />
                 
                 </View>
                  </View>
  
                  <View
                    style={{
                      width: '80%',
                     flexDirection:'row',
                     marginTop:20
                    }}>
                  
                   <MyText
                   text={`Printed Name :`}         
                      textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    lineHeight={21}
                    style={{marginLeft: 20,  fontWeight: 400}}
                  />
                    <View
                    style={{
                     borderBottomWidth: 0.5,
                      width: '80%',
                    
                    }}>
                     <MyText
                   text={userInfo.name}
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    lineHeight={19}
                    style={{marginLeft: 10, }}
                  />
                 
                 </View>
                  </View>
  
                  <View
                    style={{
                      width: '80%',
                     flexDirection:'row',
                     marginTop:20
                    }}>
                  
                   <MyText
                   text={`Phone Number : `} 
                      textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    lineHeight={21}
                    style={{marginLeft: 20,  fontWeight: 400}}
                  />
                    <View
                    style={{
                     borderBottomWidth: 0.5,
                      width: '80%',
                    
                    }}>
                     <MyText
                   text={userInfo.contact}
                    textColor="#353334"
                    fontSize={13}
                    fontFamily="Verdana"
                    textAlign="auto"
                    lineHeight={19}
                    style={{marginLeft: 10, }}
                  />
                 
                 </View>
                  </View>

                 


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
                        placeholder={''}
                        editable={false}
                        value={moment(new Date()).format('MM/DD/YYYY')}
                     
                        setValue={setAgreementEnteredIntoOn}
                        onSubmitEditing={() => anniStartDates.current.focus()}
                      
                        style={{
                          ...styles.textInputStyle,top:7,left:5,
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

export default ClubWyndhamContract;
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
