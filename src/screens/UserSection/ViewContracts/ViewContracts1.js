//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  Keyboard,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
//import : styles
import {styles} from './ViewContractsStyle';
//import : custom components
import MyHeader from 'components/MyHeader/MyHeader';
import MyText from 'components/MyText/MyText';
import CustomLoader from 'components/CustomLoader/CustomLoader';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import MyButton from 'components/MyButton/MyButton';
import DatePicker from 'react-native-date-picker';
import DateSelector from '../../../components/DateSelector/DateSelector';
import moment from 'moment';
import SelectImageSource from '../../../modals/SelectImageSource/SelectImageSource';
import {useDispatch, useSelector} from 'react-redux';
import {MyIcon, ScreenNames, Service} from '../../../global/Index';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import SuccessfullySigned from '../../../modals/SuccessfullySigned/SuccessfullySigned';
import {CommonActions} from '@react-navigation/native';

const ViewContracts = ({navigation, route}) => {
  // console.log('ViewContracts route?.params?.newAmount', route?.params?.newAmount);
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('1');
  const [isSelected, setSelection] = useState(false);
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
  const [agreementEnteredIntoOn, setAgreementEnteredIntoOn] = useState('');
 const [developerName, setDeveloperName] = useState(
    route?.params?.selectedDeveloper?.name,
  ); 
  const [agreementBetween, setAgreementBetween] = useState('');
  const [withinDays, setWithinDays] = useState(route?.params?.valid_days);
  const [rentOut, setRentOut] = useState(route?.params?.points);
  const [points, setPoints] = useState(String(route?.params?.name));
  const [pricePerPoint, setPricePerPoint] = useState(
    String(route?.params?.price_per_point),
  );
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
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

  const goBack = () => {
    navigation.goBack();
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
      if (whichImageToUpload === '1') {
        setPointsFilePath(response.assets[0]);
      } else {
        setOwnerImageFilePath(response.assets[0]);
      }
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
        if (whichImageToUpload === '1') {
          setPointsFilePath(response.assets[0]);
        } else {
          setOwnerImageFilePath(response.assets[0]);
        }
        setShowImageSourceModal(false);
      }
      setShowImageSourceModal(false);
    });
  };
  const validation = () => {
    const ifChecqueMethdSelected = selectedPaymentMethod == 2;
    if (checkIfEmpty(agreementEnteredIntoOn)) {
      return false;
    } else if (checkIfEmpty(agreementBetween)) {
      return false;
    } else if (checkIfEmpty(withinDays)) {
      return false;
    } else if (checkIfEmpty(rentOut)) {
      return false;
    } else if (checkIfEmpty(points)) {
      return false;
    } else if (checkIfEmpty(pricePerPoint)) {
      return false;
    } else if (!ifChecqueMethdSelected && checkIfEmpty(paypalEmail)) {
      return false;
    } else if (!ifChecqueMethdSelected && checkIfEmpty(paypalPassword)) {
      return false;
    } else if (ifChecqueMethdSelected && checkIfEmpty(chequeNumber)) {
      return false;
    } else if (ifChecqueMethdSelected && checkIfEmpty(firstName)) {
      return false;
    } else if (ifChecqueMethdSelected && checkIfEmpty(lastName)) {
      return false;
    } else if (checkIfEmpty(addressLine1)) {
      return false;
    } else if (checkIfEmpty(addressLine2)) {
      return false;
    } else if (ifChecqueMethdSelected && checkIfEmpty(email)) {
      return false;
    } else if (checkIfEmpty(phone)) {
      return false;
    } else if (checkIfEmpty(accountUserId)) {
      return false;
    } else if (checkIfEmpty(accountPassword)) {
      return false;
    } else if (pointsfilePath === '') {
      return false;
    } else if (isSignature == false) {
      return false;
    } else if (signedDate === '') {
      return false;
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
      agreement_date: moment(signedDate).format('MM/DD/YY'), //date at end of form
      street_address: addressLine1,
      city_address: addressLine2,
      developer_login_username: accountUserId,
      developer_login_password: accountPassword,
    };
    if (selectedPaymentMethod === '1') {
      data.paypal_email = paypalEmail;
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
    const pointsImageName = pointsfilePath.uri.slice(
      pointsfilePath.uri.lastIndexOf('/'),
      pointsfilePath.uri.length,
    );
    postData.append('points_screenshot', {
      name: pointsImageName,
      type: pointsfilePath.type,
      uri: pointsfilePath.uri,
    });
    console.log('points_screenshot', {
      name: pointsImageName,
      type: pointsfilePath.type,
      uri: pointsfilePath.uri,
    });
    const OwnerImageName = ownerImagefilePath.uri.slice(
      ownerImagefilePath.uri.lastIndexOf('/'),
      ownerImagefilePath.uri.length,
    );
    postData.append('signature', {
      name: OwnerImageName,
      type: ownerImagefilePath.type,
      uri: ownerImagefilePath.uri,
    });
    console.log('submitContract postData', JSON.stringify(postData));
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
        Toast.show(resp?.data?.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in submitContract', error);
    }
    setShowLoader(false);
    setShowSignedContractModal(true);
  };
  const visitWebsite = () => {
    const websiteUrl = `https://www.timesharesimplified.com/`;
    Linking.openURL(websiteUrl);
  };
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

  return (
    <View style={styles.container}>
      <MyHeader Title={`Sign ${developerName} Contract `} />
      <ScrollView contentContainerStyle={{paddingBottom: '20%'}}>
        {/* banner image section */}
        <View style={styles.bannerImage}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../../assets/images/bannerImage.png')}
          />
        </View>

        {/* header section */}
        <View style={styles.mainView}>
          <MyText
            text={'Your unique opportunity!'}
            textColor="#4A95CF"
            fontSize={24}
            fontFamily="medum"
            style={{}}
          />
          <MyText
            text={'Introduction'}
            textColor="#B4DBFF"
            fontSize={24}
            fontFamily="light"
            style={{marginBottom: 15}}
          />
          {/* description section */}
          <View>
            <MyText
              text={`We are very excited to have you as one of our newest community members! Our goal is to take the worry and hassle out of renting your vacation ownership points, and provide you with the value you truly deserve! We look forward to serving you; by acting as an intermediary between you and the vacation rental guest. Our corporate name is KTJ Enterprises Inc, dba Timeshare Simplified and our websites our www.timesharesimplified.com and www.vacationcondosforless.com`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{}}
            />
          </View>
          {/* information section */}
          <MyText
            text={'Information'}
            textColor="#B4DBFF"
            fontSize={24}
            fontFamily="light"
            style={{marginTop: 15, marginBottom: 15}}
          />

          {/* description section */}
          <View>
            <MyText
              text={`Our team is available to you whenever you have questions or concerns throughout the process. Please feel free to contact us by email, text, or phone Mon - Fri 9 am - 6 pm & Sat 9 am - 3 pm PST at the provided numbers and we will get back with you within 24 hours. To ensures your understanding of the program please look over the attached agreement, then click on the links to sign, and date the agreement electronically. All you need to do is sit back, relax, and enjoy the extra cash. We are excited about creating a beneficial relationship for all parties involved. We look forward to helping you utilize your ownership, by providing an income source to alleviate many of the costs associated with owning a timeshare. Let me know if you have any questions or concerns. If you would like to speak with our Marriott Specialist please email them at support@vacationcondosforless.com.  We look forward to helping you out and please let us know if you have any other question or concern.`}
              textColor={'red'}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{}}
            />
          </View>

          {/* Agreement section */}
          <MyText
            text={'Agreement'}
            textColor="#B4DBFF"
            fontSize={24}
            fontFamily="light"
            style={{marginTop: 15, marginBottom: 15}}
          />
          {/* description section */}
          <View style={styles.descriptionContainer}>
            <MyText
              text={`This agreement is hereby entered into on Inc.,`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{marginBottom: 5}}
            />
            <MyTextInput
              // inputRef={emailRef}
              placeholder={'Type here'}
              value={agreementEnteredIntoOn}
              setValue={setAgreementEnteredIntoOn}
              onSubmitEditing={() => agreementBetweenRef.current.focus()}
              style={
                isValidationError && checkIfEmpty(agreementEnteredIntoOn)
                  ? styles.redBorderNotFilled
                  : null
              }
            />
            <MyText
              text={`between KTJ Enterprises ba Timeshare Simplified, and`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{marginTop: 10}}
            />
            <MyTextInput
              inputRef={agreementBetweenRef}
              placeholder={'Type here'}
              value={agreementBetween}
              setValue={setAgreementBetween}
              onSubmitEditing={() => withinDaysRef.current.focus()}
              style={
                isValidationError && checkIfEmpty(agreementBetween)
                  ? styles.agremntBtwnNotFilledStyle
                  : styles.agremntBtwnFilledStyle
              }
            />
            <MyText
              text={`Marriott Vacation cius Member, This contract is void if not signed within`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{marginTop: 5}}
            />
            <MyTextInput
              inputRef={withinDaysRef}
              placeholder={'Type here'}
              editable={false}
              value={withinDays}
              setValue={setWithinDays}
              keyboardType="number-pad"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={
                isValidationError && checkIfEmpty(withinDays)
                  ? styles.withinDaysNotFilledStyle
                  : styles.withinDaysFilledStyle
              }
            />
            <MyText
              text={`days.\nBy signing this agreement, you agree to give us access to your Marriott Vacation Club personal information, owner number, username, and password to book reservations on your behalf. We will keep information secure and safe, and use only the agreed above number of points to book reservations for various different amounts, at various times of the year, depending upon business needs.`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{marginTop: 7}}
            />
          </View>

          <Image
            resizeMode="stretch"
            style={styles.midImage}
            source={require('../../../assets/images/beach-image.png')}
          />

          {/* Payment section */}
          <MyText
            text={'Payment'}
            textColor="#B4DBFF"
            fontSize={24}
            fontFamily="light"
            style={{}}
          />
          <MyText
            text={'Payment'}
            textColor="#C0C0C0"
            fontSize={16}
            fontFamily="light"
            style={{}}
          />

          {/* description section */}
          <View style={styles.descriptionContainer}>
            <MyText
              text={`KTJ Enterprises Inc., da Timeshare Simplified agrees to rent out`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{}}
            />
            <MyTextInput
              placeholder={'Type here'}
              value={rentOut}
              editable={false}
              setValue={setRentOut}
              onSubmitEditing={() => pointsRef.current.focus()}
              style={
                isValidationError && checkIfEmpty(rentOut)
                  ? styles.rentOutNotFilledStyle
                  : styles.rentOutFilledStyle
              }
            />
            <MyText
              text={`Marriott Vacation Club Points - Use Year`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <SimpleTextInput
                inputRef={pointsRef}
                placeholder={'Type here'}
                editable={false}
                value={points}
                setValue={setPoints}
                keyboardType="number-pad"
                onSubmitEditing={() => yearRef.current.focus()}
                style={
                  isValidationError && checkIfEmpty(points)
                    ? styles.textInput2NotFilled
                    : styles.textInput2
                }
                textInputstyle={{width: '100%'}}
              />
              <MyText
                text={`for $`}
                textColor={Colors.THEME_GRAY}
                fontSize={14}
                fontFamily="regular"
                lineHeight={20}
                style={{}}
              />
              <SimpleTextInput
                inputRef={yearRef}
                editable={false}
                placeholder={'Type here'}
                value={pricePerPoint}
                setValue={setPricePerPoint}
                keyboardType="number-pad"
                style={
                  isValidationError && checkIfEmpty(pricePerPoint)
                    ? styles.textInput2NotFilled
                    : styles.textInput2
                }
              />
              <MyText
                text={`per point.`}
                textColor={Colors.THEME_GRAY}
                fontSize={14}
                fontFamily="regular"
                lineHeight={20}
                style={{}}
              />
            </View>
            <MyText
              text={'Payment'}
              textColor="#C0C0C0"
              fontSize={16}
              fontFamily="light"
              style={{marginTop: 15, marginBottom: 15}}
            />
            <MyText
              text={`Please be aware on future points that you may want to sell us this price may not be the same. Payments will be made to you after we have finished booking your points; or every 2 - 3 weeks, according to the number of points used during that time period. Once the points have been booked for a reservation, those points are considered purchased by us, regardless if a reservation cancels. If someone cancels a reservation, we will re-use the points for another reservation and you will not be penalized. If at any time, you wish to withdraw from the program please contact us immediately, and we will be happy to give you a standing on your current balance of any unused points; and we will pay you what you are owed at that time. Any bookings you cancel that were booked by us, for a guest of ours, gives us the right to remove you from our program, and we reserve the right to forfeit any monies you would have received.`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{}}
            />
            <MyText
              text={'Please fill in'}
              textColor="#C0C0C0"
              fontSize={16}
              fontFamily="light"
              style={{marginTop: 15, marginBottom: 15}}
            />
            <MyText
              text={`Please mark with a Y next to your choice of how you would like payments to be sent. An N in the other box.`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{}}
            />
            <View style={styles.paymentMethodRow}>
              {paymentMethods?.map(el => (
                <TouchableOpacity
                  key={el?.id}
                  onPress={() => {
                    setSelectedPaymentMethod(el?.id);
                  }}
                  style={[
                    selectedPaymentMethod === el?.id
                      ? styles.selectedPaymentMethodView
                      : styles.unselectedPaymentMethodView,
                    {marignRight: el?.id === '1' ? 10 : 0},
                  ]}>
                  <MyText
                    text={el?.name}
                    textColor="#353334"
                    fontSize={14}
                    fontFamily="regular"
                    style={{marginRight: 10}}
                  />
                  {selectedPaymentMethod === el?.id ? (
                    <Image source={require('assets/images/tick-circle.png')} />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
            {selectedPaymentMethod === '1' ? (
              <View>
                <MyTextInput
                  placeholder={'PayPal email'}
                  value={paypalEmail}
                  setValue={setPaypalEmail}
                  onSubmitEditing={() => {
                    paypalPasswordRef.current.focus();
                  }}
                  style={
                    isValidationError && checkIfEmpty(paypalEmail)
                      ? styles.genericInputNotFilledStyle
                      : styles.genericInputFilledStyle
                  }
                />
                <MyTextInput
                  inputRef={paypalPasswordRef}
                  placeholder={'PayPal password'}
                  value={paypalPassword}
                  setValue={setPaypalPassword}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  style={
                    isValidationError && checkIfEmpty(paypalPassword)
                      ? styles.genericInputNotFilledStyle
                      : styles.genericInputFilledStyle
                  }
                />
              </View>
            ) : (
              <MyTextInput
                placeholder={'Type here'}
                value={chequeNumber}
                setValue={setChequeNumber}
                style={
                  isValidationError && checkIfEmpty(chequeNumber)
                    ? styles.genericInputNotFilledStyle
                    : styles.genericInputFilledStyle
                }
              />
            )}
            <MyText
              text={`Enter N/A if choosing to be paid by Check New Member`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{}}
            />
            {selectedPaymentMethod === '2' ? (
              <>
                <MyText
                  text={`Name:`}
                  textColor={Colors.THEME_GRAY}
                  fontSize={14}
                  fontFamily="regular"
                  lineHeight={20}
                  style={{marginTop: 10}}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <MyTextInput
                    // inputRef={emailRef}
                    placeholder={'First Name'}
                    value={firstName}
                    setValue={setFirstName}
                    onSubmitEditing={() => lastNameRef.current.focus()}
                    style={
                      isValidationError && checkIfEmpty(firstName)
                        ? styles.textInputNotFilled
                        : styles.textInput
                    }
                  />
                  <MyTextInput
                    inputRef={lastNameRef}
                    placeholder={'Last Name'}
                    value={lastName}
                    setValue={setLastName}
                    onSubmitEditing={() => addressLine1Ref.current.focus()}
                    style={
                      isValidationError && checkIfEmpty(lastName)
                        ? styles.textInputNotFilled
                        : styles.textInput
                    }
                  />
                </View>
              </>
            ) : null}
            <MyText
              text={`Address:`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{marginTop: 5}}
            />
            <MyTextInput
              inputRef={addressLine1Ref}
              placeholder={'Address Line 1'}
              value={addressLine1}
              setValue={setAddressLine1}
              onSubmitEditing={() => addressLine2Ref.current.focus()}
              style={
                isValidationError && checkIfEmpty(addressLine1)
                  ? styles.genericInputNotFilledStyle
                  : styles.genericInputFilledStyle
              }
            />
            <MyTextInput
              inputRef={addressLine2Ref}
              placeholder={'Address Line 2'}
              value={addressLine2}
              setValue={setAddressLine2}
              onSubmitEditing={() => {
                selectedPaymentMethod === '2'
                  ? emailRef.current.focus()
                  : phoneRef.current.focus();
              }}
              style={
                isValidationError && checkIfEmpty(addressLine2)
                  ? styles.genericInputNotFilledStyle
                  : styles.genericInputFilledStyle
              }
            />
            {selectedPaymentMethod === '2' ? (
              <MyTextInput
                inputRef={emailRef}
                placeholder={'Email'}
                value={email}
                setValue={setEmail}
                onSubmitEditing={() => phoneRef.current.focus()}
                style={
                  isValidationError && checkIfEmpty(email)
                    ? styles.genericInputNotFilledStyle
                    : styles.genericInputFilledStyle
                }
              />
            ) : null}
            <MyTextInput
              inputRef={phoneRef}
              placeholder={'Phone'}
              value={phone}
              setValue={setPhone}
              keyboardType="number-pad"
              onSubmitEditing={() => accountUserIdRef.current.focus()}
              style={
                isValidationError && checkIfEmpty(phone)
                  ? styles.genericInputNotFilledStyle
                  : styles.genericInputFilledStyle
              }
            />

            <MyText
              text={`Marriott Account:`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{marginTop: 5}}
            />
            <MyTextInput
              inputRef={accountUserIdRef}
              placeholder={'Type here'}
              value={accountUserId}
              setValue={setAccountUserId}
              onSubmitEditing={() => accountPasswordRef.current.focus()}
              style={
                isValidationError && checkIfEmpty(accountUserId)
                  ? styles.genericInputNotFilledStyle
                  : styles.genericInputFilledStyle
              }
            />
            <MyTextInput
              inputRef={accountPasswordRef}
              placeholder={'Type here'}
              value={accountPassword}
              setValue={setAccountPassword}
              style={
                isValidationError && checkIfEmpty(accountPassword)
                  ? styles.genericInputNotFilledStyle
                  : styles.genericInputFilledStyle
              }
            />

            <MyText
              text={`Upload points screenshot*`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{marginTop: 5}}
            />
            {/* upload ss */}
            <View
              style={
                isValidationError && pointsfilePath == ''
                  ? styles.midImageNotFilled
                  : styles.midImage
              }>
              {pointsfilePath == '' ? (
                <View style={styles.imageViewStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowImageSourceModal(true);
                      setWhichImageToUpload('1');
                    }}
                    style={styles.addButtonStyle}>
                    <MyIcon.AntDesign
                      name="plus"
                      color={Colors.THEME_GREEN}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imageViewStyle}>
                  <Image
                    resizeMode="cover"
                    borderRadius={10}
                    source={{uri: pointsfilePath.uri}}
                    style={{height: '100%', width: '100%'}}
                  />
                  <TouchableOpacity
                    onPress={() => setPointsFilePath('')}
                    style={styles.deleteButtonStyle}>
                    <MyIcon.MaterialIcons
                      name="delete"
                      color={Colors.RED}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <MyText
              text={`Print Name Marriott Owner Date & Signature:`}
              textColor={Colors.THEME_GRAY}
              fontSize={14}
              fontFamily="regular"
              lineHeight={20}
              style={{marginTop: 5}}
            />
            {/* <View
              style={
                isValidationError && ownerImagefilePath == ''
                  ? styles.midImageNotFilled
                  : styles.midImage
              }>
              {ownerImagefilePath == '' ? (
                <View style={styles.imageViewStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowImageSourceModal(true);
                      setWhichImageToUpload('2');
                    }}
                    style={styles.addButtonStyle}>
                    <MyIcon.AntDesign
                      name="plus"
                      color={Colors.THEME_GREEN}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imageViewStyle}>
                  <Image
                    resizeMode="cover"
                    borderRadius={10}
                    source={{uri: ownerImagefilePath.uri}}
                    style={{height: '100%', width: '100%'}}
                  />
                  <TouchableOpacity
                    onPress={() => setOwnerImageFilePath('')}
                    style={styles.deleteButtonStyle}>
                    <MyIcon.MaterialIcons
                      name="delete"
                      color={Colors.RED}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={[
                  styles.tickView,
                  isValidationError &&
                    !isSignature && {borderColor: 'red', borderWidth: 1},
                ]}
                activeOpacity={0.9}
                onPress={() => {
                  setIsSignatue(!isSignature);
                }}>
                {isSignature && (
                  <Image source={require('assets/images/blue-tick.png')} />
                )}
              </TouchableOpacity>
              <MyText
                text={'By checking this you accepted. As your signature'}
              />
              <Text> </Text>
            </View>

            {/* date section */}
            <DateSelector
              Title={
                signedDate === ''
                  ? 'Select Signed Date'
                  : moment(signedDate).format('MMM DD, YYYY')
              }
              showDateIcon
              placeholder="Select Signed Date"
              onPress={() => setOpenSignedDate(true)}
              dateViewStyle={{borderWidth: 0}}
              calenderViewStyle={
                isValidationError && signedDate === ''
                  ? styles.dateSelectorNotFilledStyle
                  : styles.dateSelectorFilledStyle
              }
            />
            <MyText
              text={'Print Name Robert (Tony) Avitia Date & Signature'}
              textColor="#353334"
              fontSize={14}
              fontFamily="regular"
              textAlign="center"
              style={{marginBottom: 10, marginTop: 15}}
            />
            {/* address section  */}
            <View>
              <MyText
                text={'Toll Free: 800.461.5037 Call /Text'}
                textColor="#353334"
                fontSize={16}
                fontFamily="light"
                textAlign="center"
                style={{marginBottom: 10}}
              />
              <MyText
                text={'Direct: 702.581.8035 Mobile/Text'}
                textColor="#353334"
                fontSize={16}
                fontFamily="light"
                textAlign="center"
                style={{marginBottom: 10}}
              />
              <MyText
                text={'Email: Support@vacationcondosforless.com'}
                textColor="#353334"
                fontSize={16}
                fontFamily="light"
                textAlign="center"
                style={{marginBottom: 10}}
              />
              <MyText
                text={'Email: support@timesharesimplified.com'}
                textColor="#353334"
                fontSize={16}
                fontFamily="light"
                textAlign="center"
                style={{}}
              />
            </View>
          </View>

          {/* bottom logo section */}
          <Image
            resizeMode="stretch"
            style={styles.bottomLogo}
            source={require('../../../assets/images/splash-logo.png')}
          />

          {/* submit button section */}
          <MyButton
            text={'Submit'}
            onPress={submitContract}
            style={styles.loginStyle}
          />
        </View>
      </ScrollView>
      <CustomLoader showLoader={showLoader} />
      <DatePicker
        modal
        mode="date"
        open={openSignedDate}
        date={signedDate || new Date()}
        onConfirm={date => {
          setOpenSignedDate(false);
          setSignedDate(date);
        }}
        onCancel={() => {
          setOpenSignedDate(false);
        }}
      />
      <SelectImageSource
        visible={showImageSourceModal}
        setVisibility={setShowImageSourceModal}
        openLibrary={openLibrary}
        openCamera={checkCameraPermission}
      />
      <SuccessfullySigned
        visible={showSignedContractModal}
        setVisibility={setShowSignedContractModal}
        viewSignedContract={gotoSignedContracts}
        visitWebsite={visitWebsite}
        gotoSellMorePoints={gotoSellMorePoints}
      />
    </View>
  );
};

export default ViewContracts;

const checkIfEmpty = value => {
  if (value?.toString()?.trim()?.length === 0) {
    return true;
  }
  return false;
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const SimpleTextInput = ({
  inputRef,
  value,
  setValue = () => {},
  placeholder,
  keyboardType,
  maxLength,
  onSubmitEditing,
  editable,
  placeholderTextColor = Colors.LIGHT_GRAY,
  onTouchStart,
  fontSize = 14,
  style = {},
}) => {
  return (
    <TextInput
      ref={inputRef}
      value={value}
      onChangeText={text => setValue(text)}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onTouchStart={onTouchStart}
      keyboardType={keyboardType}
      maxLength={maxLength}
      onSubmitEditing={onSubmitEditing}
      editable={editable}
      style={{
        padding: 10,
        paddingLeft: 20,
        borderRadius: 5,
        width: '32%',
        height: 48,
        fontSize: fontSize,
        // color: '#455A64',
        color: Colors.THEME_GRAY,
        ...style,
      }}
    />
  );
};
