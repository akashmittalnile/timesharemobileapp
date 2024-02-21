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
import {styles} from './HelpAndSupportStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'components/Divider/Divider';
import {WebView} from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';
import moment from 'moment';

const userImg = `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60`;

const HelpAndSupport = ({navigation, dispatch}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [helpAndSupportData, setHelpAndSupportData] = useState([]);

  useEffect(() => {
    console.log('userInfo', userInfo);
    const unsubscribe = navigation.addListener('focus', () => {
      getHelpAndSupportData();
    });
    return unsubscribe;
  }, [navigation]);
  const getHelpAndSupportData = async () => {
    // const endPoint = Service.HELP_AND_SUPPORTS + userInfo?.id;
    const endPoint = Service.HELP_AND_SUPPORTS;
    console.log('getHelpAndSupportData endPoint', endPoint);
    setShowLoader(true);
    try {
      console.log('getHelpAndSupportData userToken', userToken);
      const resp = await Service.getApiWithToken(userToken, endPoint);
      console.log('getHelpAndSupportData resp', resp?.data);
      if (resp?.status) {
        console.log('resp?.allsupport', resp?.data?.allsupport);
        const updaedData = resp?.data?.allsupport?.map(el => ({
          ...el,
          isClicked: false,
        }));
        setHelpAndSupportData(updaedData);
      } else {
        Toast.show(resp.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in getHelpAndSupportData', error);
    }
    setShowLoader(false);
  };

  const gotoSubmit = () => {
    navigation.navigate(ScreenNames.SUBMIT_NEW_QUERY);
  };
  const showHideAnswer = id => {
    const dataCopy = [...helpAndSupportData];
    let updaedData = [];
    // check if currently this answer is showing
    const alreadyShown = helpAndSupportData?.find(
      el => el.id === id,
    )?.isClicked;
    console.log('alreadyShown', alreadyShown);
    // hide answer if already shown for this id
    if (alreadyShown) {
      updaedData = dataCopy?.map(el =>
        el.id === id ? {...el, isClicked: false} : el,
      );
    } else {
      // hide currently shown answer and show clicked answer
      updaedData = dataCopy?.map(el =>
        el.isClicked ? {...el, isClicked: false} : el,
      );
      updaedData = updaedData?.map(el =>
        el.id === id ? {...el, isClicked: true} : el,
      );
    }
    setHelpAndSupportData(updaedData);
  };

  const Query = ({item}) => {
    const date = moment(item.created_at).format('DD MMM YYYY, hh:mm A');
    return (
      <View>
        <TouchableOpacity
          onPress={() => showHideAnswer(item.id)}
          style={styles.queryContainer}>
          <View style={styles.queryIconView}>
            <Image source={require('assets/images/query-icon.png')} />
          </View>
          <View style={{marginLeft: 20, width: '75%'}}>
            <MyText
              text={item.message}
              textColor={Colors.THEME_GRAY}
              fontSize={16}
              fontFamily="medium"
            />
            <MyText
              text={'Submitted on ' + date}
              textColor={Colors.THEME_GRAY}
              fontSize={12}
              style={{marginTop: 5}}
            />
          </View>
        </TouchableOpacity>
        {item.isClicked ? (
          <View style={styles.answerContainer}>
            <View style={styles.answerTopRow}>
              <View style={styles.adminIconView}>
                <Image source={require('assets/images/admin-icon.png')} />
              </View>
              <MyText
                text={'Admin Response'}
                textColor={Colors.THEME_GRAY}
                fontSize={16}
                fontFamily="medium"
                style={{marginLeft: 10}}
              />
            </View>
            {/* <MyText
              text={'Dear User,'}
              textColor={Colors.THEME_GRAY}
              fontSize={16}
              fontFamily="medium"
              style={{marginTop: 10}}
            /> */}
            <MyText
              text={item?.past_response}
              textColor={Colors.THEME_GRAY}
              fontSize={16}
            />
          </View>
        ) : null}
      </View>
    );
  };
  //UI
  return (
    <View style={styles.container}>
      <MyHeader Title="Help & Support" isMenu />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '20%'}}>
        <Image
          source={require('assets/images/help-and-support-bg.png')}
          style={styles.homebg}
        />

        <View style={styles.mainView}>
          <ImageBackground
            source={require('assets/images/submit-new-query-bg.png')}
            style={[styles.newQueryContainer, {alignSelf: 'center'}]}>
            <ImageBackground
              source={require('assets/images/submit-new-query-white-bg.png')}
              style={styles.newQueryContainer}>
              <View style={{marginTop: 30, left: 120}}>
                <MyText
                  text={`Hi! ${userInfo?.name}`}
                  textColor={'#455A64'}
                  fontSize={16}
                  fontFamily="medium"
                />
                <MyText
                  text={`FAQ's Are Below. To Submit A New\nQuestion Click Here`}
                  textColor={'#455A64'}
                  fontSize={14}
                />
                <MyButton
                  text={'Submit New Query'}
                  onPress={gotoSubmit}
                  style={styles.buttonStyle}
                />
              </View>
              <Image
                source={
                  userInfo?.profile_pic
                    ? {uri: userInfo?.profile_pic}
                    : require('assets/images/user-default.png')
                }
                style={styles.img}
              />
            </ImageBackground>
          </ImageBackground>

          <MyText
            text="Recent Query"
            textColor={Colors.THEME_GRAY}
            fontSize={18}
            fontFamily="medium"
            style={{marginTop: 5, marginBottom: 20}}
          />

          {helpAndSupportData?.length > 0 ? (
            helpAndSupportData?.map((item, Index) => {
              return <Query key={Index?.toString()} item={item} />;
            })
          ) : (
            <View style={{marginTop: 10, alignItems: 'center'}}>
              <Image source={require('assets/images/no-data.png')} />
              <MyText
                text="No Queries found"
                textColor={Colors.THEME_GRAY}
                fontSize={16}
                fontFamily="medium"
                textAlign="center"
                style={{marginTop: 10}}
              />
            </View>
          )}

          {/* <Query
            title={'How Does The Process Work'}
            date="26 April 2023, 9:23 PM"
          /> */}
        </View>
      </ScrollView>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(HelpAndSupport);
