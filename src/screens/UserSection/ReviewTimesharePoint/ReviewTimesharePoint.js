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
  KeyboardAvoidingView,
} from 'react-native';
//import : custom components
import MyHeader from 'components/MyHeader/MyHeader';
import MyText from 'components/MyText/MyText';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
//import : global
import {Colors, Constant, MyIcon, ScreenNames, Service} from 'global/Index';
//import : styles
import {styles} from './ReviewTimesharePointStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'components/Divider/Divider';
import {WebView} from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import DropdownPicker from '../../../components/DropdownPicker/DropdownPicker';
import moment, {locale} from 'moment';
import InstantOfferModal from '../../../modals/InstantOfferModal/InstantOfferModal';
import ContractTerms from '../../../modals/ContractTerms/ContractTerms';
import DateSelector from '../../../components/DateSelector/DateSelector';
import {CommonActions} from '@react-navigation/native';
import {
  getFormattedPhoneNumber,
  getImageForDeveloper,
  getNameOfNumber,
} from '../../../global/Constant';

const userImg = `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60`;
let couponTotalAmount = null;
const ReviewTimesharePoint = ({navigation, dispatch, route}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [showInstantOfferModal, setShowInstantOfferModal] = useState(false);
  const [showContractTermsModal, setShowContractTermsModal] = useState(false);
  const [developerName, setDeveloperName] = useState(
    route?.params?.selectedDeveloper?.name,
  );
  const [name, setName] = useState(route?.params?.name);
  const [email, setEmail] = useState(route?.params?.email);
  const [phone, setPhone] = useState(route?.params?.phone);
  const [referralCode, setReferralCode] = useState('');
  const [developerData, setDeveloperData] = useState([
    {label: 'Marriot', value: 'Marriot'},
  ]);
  const [openDeveloperDropdown, setOpenDeveloperDropdown] = useState(false);
  const [developerValue, setDeveloperValue] = useState('');
  // const [couponTotalAmount, setCouponTotalAmount] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const referralCodeRef = useRef();

  useEffect(() => {
    console.log('ReviewTimesharePoint route?.params', route?.params);
    console.log(
      'moment 24 12',
      moment().format('YYYY-MM-DD HH:mm:ss'),
      moment().format('YYYY-MM-DD hh:mm:ss A'),
    );
  }, []);

  const resetIndexGoToUserBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });

  const checkReferalCode = async () => {
    if (referralCode?.trim()?.length === 0) {
      Toast.show('Please enter Referral Code', Toast.SHORT);
      return;
    }
    setShowLoader(true);
    try {
      const postData = new FormData();
      postData.append(
        'developer_id',
        route?.params?.selectedDeveloper?.developer_points[0].developer_id,
      );
      postData.append('coupon_name', referralCode);
      postData.append('total_points', route?.params?.points);
      postData.append(
        'points_price',
        route?.params?.selectedDeveloper?.developer_points.find(
          el => el.year == route?.params?.selectedYear    //getCurrentYear(),
        )?.price_per_point,
      );
      console.log('checkReferalCode postData', postData);
      const resp = await Service.postApiWithToken(
        userToken,
        Service.COUPON_VALIDATE,
        postData,
      );
      console.log('checkReferalCode resp', resp?.data);
      if (resp?.data?.status) {
        Toast.show(resp?.data?.message, Toast.SHORT);
        // setCouponTotalAmount(resp?.data?.total_amount)
        couponTotalAmount = resp?.data?.total_amount;
        setShowInstantOfferModal(true);
      } else {
        Toast.show(resp?.data?.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in checkReferalCode', error);
    }
    setShowLoader(false);
  };
  const openContractTermsModal = () => {
    setShowInstantOfferModal(false);
    setShowContractTermsModal(true);
  };
  const handleSignContract = async status => {
    setShowLoader(true);
    try {
      let data = {
        developer_id:
        route?.params?.selectedDeveloper?.developer_points[0]?.developer_id,
        userid: userInfo?.id,
        year: route?.params?.selectedYear,  
        points: route?.params?.points,
        price_per_point:route?.params?.selectedDeveloper?.name=='Marriott' ?
          route?.params?.selectedDeveloper?.developer_points?.find(
            el => el?.year == route?.params?.selectedYear,
          )?.price_per_point
          :
          route?.params?.price_per_point,
        developer_name: route?.params?.selectedDeveloper?.name,
        name: route?.params?.name,
        email: route?.params?.email,
        mobile: route?.params?.phone,
        referral_code: referralCode,
        amount: referralCode === '' ? route?.params?.amount : couponTotalAmount,
        offer_status: status, //2 on accept, 3 on reject
        created_by: '1',
        created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        modified_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        category:route?.params?.selectedDeveloper?.name=='Marriott' ? route?.params?.marriottid :''
        // agreement_date: '2023-07-21 11:39:32',
        // agreementwith: '1',
        // valid_days: '20',
        // swift_code: '1',
        // code: '1',
        // signature: '1',
        // date: '2023-07-21',
        // Account1: '1252753422',
        // Account2: '1325412837',
      };
      console.log('Hello Ashish ===>>',data)
      const datesData = {};
      const pointsPerDateData = {};
      for (let i = 0; i < route?.params?.anniStartDates?.length; i++) {
        datesData[`userdetails[anniversary_start_date][${i}]`] =
          route?.params?.anniStartDates[i];
      }
      for (let i = 0; i < route?.params?.anniEndDates?.length; i++) {
        datesData[`userdetails[anniversary_end_date][${i}]`] =
          route?.params?.anniEndDates[i];
      }
      for (let i = 0; i < route?.params?.pointsPerDate?.length; i++) {
        pointsPerDateData[`userdetails[anniversary_point][${i}]`] =
          route?.params?.pointsPerDate[i];
      }
      data = {...data, ...datesData, ...pointsPerDateData};
      console.log('handleSignContract postData', data);
      const resp = await Service.postApiWithToken(
        userToken,
        Service.ADD_CONTRACT,
        data,
      );
      console.log('handleSignContract resp', resp?.data);
      if (resp?.status) {
        Toast.show(resp?.data?.msg, Toast.SHORT);
        // only show sign contract webpage on accept
        if (status === '2') {
          setShowContractTermsModal(false);
          const showWebpage = false;
          if (!showWebpage) {
            gotoViewContract(
              resp?.data?.contract_id,
              resp?.data?.print_name,
              resp?.data?.signature_image,
            );
            // gotoSignContract()
          } else {
            let contractUrl = Service.BASE_URL?.replace('/api/', '/agreement/');
            contractUrl += userInfo?.id;
            contractUrl += '/';
            contractUrl += resp?.data?.contract_id;
            console.log('contractUrl', contractUrl);
            gotoWebPage(
              contractUrl,
              `Sign ${route?.params?.selectedDeveloper?.name} Contract`,
            );
          }
        } else {
          setShowLoader(false);
          openContractTermsModal(false);
          navigation.dispatch(resetIndexGoToUserBottomTab);
        }
        // gotoSignContract()
      } else {
        Toast.show(resp?.data?.msg, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in handleSignContract', error);
    }
    setShowLoader(false);
  };
  
  const gotoViewContract = (contractId, print_name, signature_image) => {
    const newAmount =
      referralCode === '' ? route?.params?.amount : couponTotalAmount;
    console.log('newAmount', {...route.params, newAmount});
    // return
    console.log('====================================');
    console.log(developerName);
    console.log('====================================');
    navigation.navigate(getImageForDeveloper(developerName), {
      ...route.params,
      newAmount,
      contractId,
      print_name,
      signature_image,
      referralCode,
      valid_days: route?.params?.selectedDeveloper?.valid_days,
    });
  };
  const gotoWebPage = (link, Name) => {
    navigation.navigate(ScreenNames.SIDE_MENU_LINKS, {link, Name});
  };
  //UI
  return (
    <LinearGradient
      colors={['#0C8AFF65', '#0C8AFF83', '#0C8AFF65']}
      style={styles.container}>
      <View style={styles.container}>
        <MyHeader Title="Review Timeshare Point" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '20%'}}>
            <Image
              source={require('assets/images/get-in-touch-bg.png')}
              style={styles.homebg}
            />

            <View style={styles.mainView}>
              <View style={styles.emptyContainer}>
                <View style={styles.topRow}>
                  <Image
                    source={require('assets/images/small-logo.png')}
                    style={styles.logo}
                  />
                </View>
                <MyText
                  text={`What Timeshare Developer Points Do You Want To Rent Out For ${route?.params?.selectedYear}?`}
                  textColor={Colors.Dark_GRAY}
                  fontSize={14}
                  lineHeight={20}
                  style={{marginHorizontal: 10, marginTop: 5}}
                />
              </View>

              <MyText
                text="My Developer *"
                textColor={Colors.WHITE}
                fontSize={14}
                fontFamily="medium"
                style={{marginTop: 30, marginBottom: 3}}
              />
              <MyTextInput
                placeholder={'Enter the developer name'}
                value={developerName}
                setValue={setDeveloperName}
                editable={false}
                onSubmitEditing={() => nameRef.current.focus()}
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderWidth: 0,
                }}
              />
              {/* <DropdownPicker
              data={developerData}
              setData={setDeveloperData}
              visible={openDeveloperDropdown}
              setVisibility={setOpenDeveloperDropdown}
              onHide={() => setOpenDeveloperDropdown(false)}
              value={developerValue}
              setValue={setDeveloperValue}
              customChangeValue={v => {
                setDeveloperValue(v);
              }}
              isCustomChangeValue
              placeholder={`Select Developer`}
              style={{
                marginBottom: 10,
                borderRadius: 10,
                borderWidth: 0,
                zIndex: 4000,
                zIndexInverse: 1000,
              }}
              zIndex={4000}
              zIndexInverse={1000}
            /> */}
              <MyText
                text="My Name *"
                textColor={Colors.WHITE}
                fontSize={14}
                fontFamily="medium"
                style={{}}
              />
              <MyTextInput
                inputRef={nameRef}
                placeholder={'Full Name'}
                value={name}
                setValue={setName}
                editable={false}
                onSubmitEditing={() => emailRef.current.focus()}
                isIcon
                icon={require('assets/images/name-icon.png')}
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderWidth: 0,
                }}
              />
              <MyText
                text="My Email *"
                textColor={Colors.WHITE}
                fontSize={14}
                fontFamily="medium"
                style={{}}
              />
              <MyTextInput
                inputRef={emailRef}
                placeholder={'Email Address'}
                value={email}
                setValue={setEmail}
                editable={false}
                isIcon
                icon={require('assets/images/email-icon.png')}
                onSubmitEditing={() => phoneRef.current.focus()}
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderWidth: 0,
                }}
              />
              <MyText
                text="My Phone Number *"
                textColor={Colors.WHITE}
                fontSize={14}
                fontFamily="medium"
                style={{}}
              />
              <MyTextInput
                inputRef={phoneRef}
                placeholder={'Phone'}
                value={phone}
                setValue={setPhone}
                editable={false}
                isIcon
                icon={require('assets/images/phone-icon.png')}
                keyboardType="number-pad"
                onSubmitEditing={() => referralCodeRef.current.focus()}
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderWidth: 0,
                }}
              />
              {route?.params?.anniStartDates?.map((el, index) => (
                <View
                  key={index?.toString()}
                  style={{marginTop: index > 0 ? 10 : 0}}>
                  <MyText
                    text={`My Anniversary Dates ${index + 1} *`}
                    textColor={Colors.WHITE}
                    fontSize={14}
                    fontFamily="medium"
                    style={{marginBottom: 10}}
                  />
                  <View style={styles.dateWithIconRow}>
                    <DateSelector
                      Title={
                        route?.params?.anniStartDates[index] === ''
                          ? 'Start'
                          : // : moment(startDate).format('MMMM Do YYYY')
                            moment(route?.params?.anniStartDates[index]).format(
                              'MMMM DD, YYYY',
                            )
                      }
                      showDateIcon
                      placeholder="Start"
                      dateViewStyle={{borderWidth: 0}}
                      calenderViewStyle={{
                        borderWidth: 0,
                        borderRadius: 10,
                        width: '47%',
                        paddingHorizontal: 10,
                      }}
                    />
                    <DateSelector
                      Title={
                        route?.params?.anniEndDates[index] === ''
                          ? 'End'
                          : // : moment(startDate).format('MMMM Do YYYY')
                            moment(route?.params?.anniEndDates[index]).format(
                              'MMMM DD, YYYY',
                            )
                      }
                      showDateIcon
                      placeholder="End"
                      dateViewStyle={{borderWidth: 0}}
                      calenderViewStyle={{
                        borderWidth: 0,
                        borderRadius: 10,
                        width: '47%',
                        paddingHorizontal: 10,
                      }}
                    />
                  </View>
                  <MyText
                    text={`${getNameOfNumber(
                      index + 1,
                    )} Anniversary Date Points *`}
                    textColor={Colors.WHITE}
                    fontSize={14}
                    fontFamily="medium"
                    style={{marginTop: 10}}
                  />
                  <MyTextInput
                    placeholder={'Enter Points'}
                    value={route?.params?.pointsPerDate[index]}
                    // maxLength={10}
                    keyboardType="number-pad"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderWidth: 0,
                      marginBottom: 0,
                      paddingBottom: 0,
                    }}
                  />
                </View>
              ))}
              <MyText
                text="My Referral Code"
                textColor={Colors.WHITE}
                fontSize={14}
                fontFamily="medium"
                style={{marginTop: 10}}
              />
              <MyTextInput
                inputRef={referralCodeRef}
                placeholder={'Referral Code'}
                value={referralCode}
                setValue={setReferralCode}
                onSubmitEditing={() => phoneRef.current.focus()}
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderWidth: 0,
                }}
              />
              <MyButton
                text={'Submit & Get estimate'}
                onPress={() => {
                  if (referralCode === '') {
                    setShowInstantOfferModal(true);
                  } else {
                    checkReferalCode();
                  }
                }}
                style={styles.buttonStyle}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <InstantOfferModal
          visible={showInstantOfferModal}
          amount={
            referralCode === ''
              ? getFormattedNumber(route?.params?.amount)
              : couponTotalAmount
          }
          points={route?.params?.points}
          // amount={couponTotalAmount}
          setVisibility={setShowInstantOfferModal}
          handleNext={openContractTermsModal}
          handleReject={() => handleSignContract('3')}
        />
        <ContractTerms
          visible={showContractTermsModal}
          setVisibility={setShowContractTermsModal}
          gotoSignContract={() => handleSignContract('2')}
        />
        <CustomLoader showLoader={showLoader} />
      </View>
    </LinearGradient>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(ReviewTimesharePoint);

const Contact = ({icon, text}) => {
  return (
    <View style={styles.contactRow}>
      <Image source={icon} />
      <MyText
        text={text}
        textColor={Colors.LIGHT_GRAY}
        fontSize={14}
        style={{marginLeft: 10}}
      />
    </View>
  );
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const getFormattedNumber = num => {
  console.log('getFormattedNumber num', num);
  num = Number(num);
  const formatWithDecimals = formatNumberWithTwoDecimalsWithoutRounding(num);
  const formattedNumber = Number(formatWithDecimals).toLocaleString('en-US');
  // console.log(formattedNumber); // 1,234,567,890
  return formattedNumber;
};

function formatNumberWithTwoDecimalsWithoutRounding(number) {
  if (Number.isNaN(number)) {
    return 'Invalid Number';
  }

  // Check if the number has decimals
  if (Number.isInteger(number)) {
    return number.toFixed(2); // Add ".00" to integers
  } else {
    return parseFloat(number.toFixed(2)); // Format with two decimal places without rounding
  }
}
