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
import {styles} from './TimesharePointStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'components/Divider/Divider';
import {WebView} from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';

const TimesharePoint = ({navigation, dispatch, route}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);

  const gotoRentYourPoints = () => {
    navigation.navigate(ScreenNames.RENT_YOUR_POINTS, {developerData: route?.params?.developerData});
  };

  //UI
  return (
    <View style={styles.container}>
      <MyHeader Title="Timeshare Point" />
      <ImageBackground
        source={require('assets/images/timesharepoint-bg.png')}
        style={styles.bg}>
        <View style={styles.instantOfferContainer}>
          <Image
            source={require('assets/images/small-logo.png')}
            style={styles.logo}
          />
          <MyText
            text="Get An Instant Offer! Our Services Are At No Cost To You We Only Pay You!"
            textColor={Colors.Dark_GRAY}
            fontSize={18}
            fontFamily="medium"
            style={{marginTop: 5}}
            // textAlign="center"
          />
          <MyText
            text={`Click Continue To Review The Contract And\nSimply Accept Or Reject The Offer*`}
            textColor={Colors.Dark_GRAY}
            fontSize={14}
            // textAlign="center"
            style={{marginTop: 20}}
          />
          <MyText
            text="*Some Terms Can Apply Depending Upon Your Points Expiration Date"
            textColor={Colors.THEME_GRAY}
            fontSize={12}
            // textAlign="center"
            style={{marginTop: 20, marginBottom: 15}}
          />
          <MyButton
            text={'Continue'}
            onPress={gotoRentYourPoints}
            style={styles.buttonStyle}
          />
          <MyText
            text="* Terms & Conditions Apply"
            textColor={Colors.THEME_GRAY}
            fontSize={12}
            textAlign="center"
            style={{marginTop: 15}}
          />
        </View>
      </ImageBackground>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(TimesharePoint);
