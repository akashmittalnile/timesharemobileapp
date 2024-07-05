//import : react components
import React, { useEffect, useRef, useState } from 'react';
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
  ImageBackground
} from 'react-native';
//import : custom components
import MyHeader from 'components/MyHeader/MyHeader';
import MyText from 'components/MyText/MyText';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
//import : global
import { Colors, Constant, MyIcon, ScreenNames, Service } from 'global/Index';
//import : styles
import { styles } from './AboutUsStyle';
//import : modal
//import : redux
import { connect, useSelector } from 'react-redux';
import { width, height } from 'global/Constant';
import Divider from 'components/Divider/Divider';
import { WebView } from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import moment from 'moment';
import InstantOfferModal from '../../../modals/InstantOfferModal/InstantOfferModal';
import ContractTerms from '../../../modals/ContractTerms/ContractTerms';
import SuccessfullySigned from '../../../modals/SuccessfullySigned/SuccessfullySigned';

const userImg = `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60`

const AboutUs = ({ navigation, dispatch }) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [showSignedContractModal, setShowSignedContractModal] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const referralCodeRef = useRef();

  const openSignedContractModal = () => {
    setShowSignedContractModal(true)
  }

  const viewSignedContract = () => {
    navigation.navigate(ScreenNames.CONTRACTS)
  }

  //UI
  return (
    <View style={styles.container}>
      <MyHeader Title="About Us" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '20%' }}>

        <Image source={require('assets/images/about-us-bg.png')} style={styles.homebg} />

        <View style={styles.mainView}>

          <MyText text='HOW WE STARTED' textColor={'#B4DBFF'} fontSize={24} fontFamily='medium' style={{}} />
          <MyText text='When I First Bought My Timeshare At The Age Of 21, I Absolutely Hated It Because I Could Neverget The Trades That I Wanted To The Places I Wanted To Go. This Caused Me To Quit The Industry And Go To Work For A Timeshare Resale Company. Then I Realized Timeshare Resale Companies Are Complete Scams And So I Started My Own Landscaping Business. After Meeting My Wife And Needing A Better Job, I Decided To Get Back Into The Industry, But Only Dealing With Owners As They Had Already Bought The Timeshares. Working With Owners Allowed Me To Learn Many Tips And Tricks That Actually Make The Timeshares Valuable And Worthwhile.' textColor={Colors.THEME_GRAY} fontSize={14} lineHeight={20} style={{ marginTop: 10 }} />

        </View>

      </ScrollView>
      <SuccessfullySigned
        visible={showSignedContractModal}
        setVisibility={setShowSignedContractModal}
        viewSignedContract={viewSignedContract}
        visitWebsite={() => { }}
      />
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(AboutUs);


const Contact = ({ icon, text }) => {
  return (
    <View style={styles.contactRow}>
      <Image source={icon} />
      <MyText text={text} textColor={Colors.LIGHT_GRAY} fontSize={14} style={{ marginLeft: 10 }} />
    </View>
  )
}