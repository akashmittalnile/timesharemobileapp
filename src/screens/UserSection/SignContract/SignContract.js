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
import {styles} from './SignContractStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'components/Divider/Divider';
import {WebView} from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import moment from 'moment';
import InstantOfferModal from '../../../modals/InstantOfferModal/InstantOfferModal';
import ContractTerms from '../../../modals/ContractTerms/ContractTerms';
import SuccessfullySigned from '../../../modals/SuccessfullySigned/SuccessfullySigned';
import {CommonActions} from '@react-navigation/native';
import DateSelector from '../../../components/DateSelector/DateSelector';

const userImg = `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60`;

const SignContract = ({navigation, dispatch, route}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [showSignedContractModal, setShowSignedContractModal] = useState(false);
  const [name, setName] = useState(route?.params?.name);
  const [email, setEmail] = useState(route?.params?.email);
  const [phone, setPhone] = useState(route?.params?.phone);
  const [referralCode, setReferralCode] = useState(route?.params?.referralCode);
  const [couponTotalAmount, setCouponTotalAmount] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const referralCodeRef = useRef();

  useEffect(() => {
    console.log('SignContract route?.params', route?.params);
    console.log('userInfo', userInfo);
  }, []);
  const checkReferalCode = async () => {
    setShowLoader(true);
    try {
      // const data = {
      //   developer_id: route?.params?.selectedDeveloper?.developer_points[0].developer_id,
      //   coupon_name: route?.params?.referralCode,
      //   total_points: route?.params?.points,
      //   points_price: route?.params?.selectedDeveloper?.developer_points.find(el => el.year == getCurrentYear())?.price_per_point,
      // }
      const postData = new FormData();
      postData.append('developer_id', route?.params?.selectedDeveloper?.developer_points[0].developer_id)
      postData.append('coupon_name', route?.params?.referralCode)
      postData.append('total_points', route?.params?.points)
      postData.append('points_price', route?.params?.selectedDeveloper?.developer_points.find(el => el.year == getCurrentYear())?.price_per_point)
      console.log('checkReferalCode postData', postData);
      const resp = await Service.postApiWithToken(userToken, Service.COUPON_VALIDATE, postData);
      console.log('checkReferalCode resp', resp?.data);
      if (resp?.data?.status) {
        Toast.show(resp?.data?.message, Toast.SHORT);
        setCouponTotalAmount(resp?.data?.total_amount)
        openSignedContractModal()
      } else {
        Toast.show(resp?.data?.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in checkReferalCode', error);
    }
    setShowLoader(false);
  };
  const openSignedContractModal = async () => {
    setShowLoader(true);
    try {
      let data = {
        developer_id:
          route?.params?.selectedDeveloper?.developer_points[0]?.developer_id,
        userid: userInfo?.id,
        year: '2022',
        points: route?.params?.points,
        developer_name: route?.params?.selectedDeveloper?.name,
        name: route?.params?.name,
        anniversay_start_date: route?.params?.anniStartDate,
        anniversay_end_date: route?.params?.anniEndDate,
        email: route?.params?.email,
        mobile: route?.params?.phone,
        referral_code: route?.params?.referralCode,
        amount: '500',
        status: '1',
        created_by: '1',
        created_date: '2023-07-21 11:39:32',
        modified_date: '2023-07-21 11:39:32',
        agreement_date: '2023-07-21 11:39:32',
        agreementwith: '1',
        valid_days: '20',
        swift_code: '1',
        code: '1',
        signature: '1',
        date: '2023-07-21',
        Account1: '1252753422',
        Account2: '1325412837',
      };
      const datesData = {};
      for (let i = 0; i < route?.params?.anniStartDates?.length; i++) {
        datesData[`userdetails[anniversy][anniversary_start_date][${i}]`] = route?.params?.anniStartDates[i];
      }
      for (let i = 0; i < route?.params?.anniEndDates?.length; i++) {
        datesData[`userdetails[anniversy][anniversary_end_date][${i}]`] = route?.params?.anniEndDates[i];
      }
      data = {...data, ...datesData};
      console.log('openSignedContractModal postData', data);
      // return
      const resp = await Service.postApiWithToken(
        userToken,
        Service.ADD_CONTRACT,
        data,
      );
      console.log('openSignedContractModal resp', resp?.data);
      if (resp?.status) {
        Toast.show(resp?.data?.msg, Toast.SHORT);
        setShowSignedContractModal(true);
      } else {
        Toast.show(resp?.data?.msg, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in openSignedContractModal', error);
    }
    setShowLoader(false);
  };
  const resetIndexGoToContracts = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.CONTRACTS}],
  });
  const viewSignedContract = () => {
    navigation.navigate(ScreenNames.CONTRACTS);
    // navigation.dispatch(resetIndexGoToContracts)
  };

  //UI
  return (
    <View style={styles.container}>
      <MyHeader Title="Sign Marriott Contract" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '20%'}}>
        <Image
          source={require('assets/images/sign-contract-bg.png')}
          style={styles.homebg}
        />

        <View style={styles.mainView}>
          <MyText
            text="Your unique opportunity!"
            textColor={Colors.THEME_BLUE}
            fontSize={24}
            fontFamily="medium"
            style={{marginTop: -10}}
          />
          <MyText
            text="Introduction"
            textColor={'#B4DBFF'}
            fontSize={24}
            style={{width: '100%'}}
          />
          <MyText
            text="We are very excited to have you as one of our newest community members! Our goal is to take the worry and hassle out of renting your vacation ownership points, and provide you with the value you truly deserve! We look forward to serving you; by acting as an intermediary between you and the vacation rental guest. Our corporate name is KTJ Enterprises Inc, dba Timeshare Simplified and our websites our www.timesharesimplified.com and www.vacationcondosforless.com"
            textColor={Colors.THEME_GRAY}
            fontSize={14}
            lineHeight={20}
            style={{marginTop: 10, width: width - 20}}
          />

          <MyText
            text="My Name is *"
            textColor={Colors.Dark_GRAY}
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
            text="My Email is*"
            textColor={Colors.Dark_GRAY}
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
            text="My Phone Number is *"
            textColor={Colors.Dark_GRAY}
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
                  text={`My Anniversary Start Date ${index + 1} is *`}
                  textColor={'black'}
                  fontSize={14}
                  fontFamily="medium"
                  style={{marginBottom: 10}}
                />
                <View style={styles.dateWithIconRow}>
                  <DateSelector
                    Title={
                      route?.params?.anniStartDates[index] === ''
                        ? 'mm/dd/yyyy'
                        : // : moment(startDate).format('MMMM Do YYYY')
                          moment(route?.params?.anniStartDates[index]).format('MM-DD-YYYY')
                    }
                    showDateIcon
                    placeholder="mm/dd/yyyy"
                    dateViewStyle={{borderWidth: 0}}
                    calenderViewStyle={{
                      borderWidth: 0,
                      borderRadius: 10,
                      width: '100%',
                    }}
                  />
                </View>
                <MyText
                  text={`My Anniversary End Date ${index + 1} is *`}
                  textColor={'black'}
                  fontSize={14}
                  fontFamily="medium"
                  style={{marginBottom: 10, marginTop: 10}}
                />
                <DateSelector
                  Title={
                    route?.params?.anniEndDates[index] === ''
                      ? 'mm/dd/yyyy'
                      : // : moment(startDate).format('MMMM Do YYYY')
                        moment(route?.params?.anniEndDates[index]).format('MM-DD-YYYY')
                  }
                  showDateIcon
                  placeholder="mm/dd/yyyy"
                  dateViewStyle={{borderWidth: 0}}
                  calenderViewStyle={{
                    borderWidth: 0,
                    borderRadius: 10,
                    width: '100%',
                  }}
                />
              </View>
            ))}
          <MyText
            text="My Referral Code is *"
            textColor={Colors.Dark_GRAY}
            fontSize={14}
            fontFamily="medium"
            style={{marginTop: 10}}
          />
          <MyTextInput
            inputRef={referralCodeRef}
            placeholder={'Referral Code'}
            value={referralCode}
            setValue={setReferralCode}
            editable={false}
            onSubmitEditing={() => phoneRef.current.focus()}
            style={{
              marginTop: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderWidth: 0,
            }}
          />
          <MyButton
            text={'Submit'}
            // onPress={openSignedContractModal}
            onPress={checkReferalCode}
            style={styles.buttonStyle}
          />
        </View>
      </ScrollView>
      <SuccessfullySigned
        visible={showSignedContractModal}
        setVisibility={setShowSignedContractModal}
        viewSignedContract={viewSignedContract}
        visitWebsite={() => {}}
      />
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(SignContract);

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
  return new Date().getFullYear()
}
