//import : react components
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
//import : custom components
import MyText from 'components/MyText/MyText';
//import : globals
import {Colors, Constant, MyIcon, ScreenNames} from '../../global/Index';
//import : styles
import {useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import MyButton from 'components/MyButton/MyButton';
import {setUser, setUserToken} from '../../../src/reduxToolkit/reducer/user';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import {Service} from '../../global/Index';
import {connect, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

const UpdatePhone = ({dispatch,press}) => {
  //variables : navigation
   const navigation = useNavigation();
  const myTextInput = useRef();
  const [phoneedit,setphoneedit]=useState(true) 
  const [phone, setPhone] = useState('');
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
  const [phonecolor,setphonecolor]=useState('#000')
  const [showLoader, setShowLoader] = useState(false);
  const [show, setShow] = useState(false);
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);

  const updateProfile = async () => {
      const formdata = new FormData();
      // formdata.append('id', userInfo?.id);
      formdata.append('contact', phone);
     
 
      setShowLoader(true);
      try {
        let response = await fetch(Service.BASE_URL+Service.Users_update_contact, {
          method: 'POST',
          body:formdata,
          headers : {'Content-Type': 'multipart/form-data','Accept':'application/json','Authorization': 'Bearer '+ userToken,'Cache-Control': 'no-cache'},
        }
        )
        setShowLoader(false);
        let code = await response.status
        console.log(code)   
        if(code==200){
          let responseJson = await response.json();

          console.log('====================================');
          console.log(responseJson);
          console.log('====================================');
          if(responseJson.status){
             const jsonValue = JSON.stringify(responseJson?.data);
            await AsyncStorage.setItem('userInfo', jsonValue);
            dispatch(setUser(responseJson?.data));
            Toast.show('Contact number added successfully')
            navigation.dispatch(resetIndexGoToBottomTab);
            
          }else{
            Toast.show(responseJson.result.contact[0])
          }
       
        }else{
          let coddatasse = await response.json()
          console.log(coddatasse)   
        }
      } catch (error) {
        console.error(error);
        
      }

    setShowLoader(false)
  };
  const resetIndexGoToBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.PROFILE}],
  });
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
  const verifyContact = async (txt) => {
    const postData = new FormData();
    postData.append('contact', txt);
    try {
      const resp = await Service.postApi(`${Service.CHECK_CONTACT}`, postData);
      console.log('============resp========================');
      console.log(resp?.data?.status);
      console.log('====================================');
      if (resp?.data?.status) {
        setphonecolor('#000')
      } else {
        setphonecolor('red')
      }
      if (!resp?.data?.status) {
        setphonecolor('red')
      }
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  };



  //UI
  return (
   
    <View style={{width:'100%',height:'100%',position:'absolute',zIndex:999,backgroundColor:'rgba(0,0,0,0.4)',justifyContent: 'center',}}>
     <View style={{width:'80%',padding:15,alignSelf:'center',backgroundColor:'#fff',borderRadius:10, 
     shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,}}>

<Image style={{width:150,height:150,resizeMode:'stretch',alignSelf:'center'}} source={require('../../assets/images/updatephone.png')}></Image>

<Text style={{color:'#000',fontSize:13,textAlign:'center'}}>Adding phone number is required because while signing the contracts its necessary that we have your full information so that we can contact you for sharing the points.</Text>

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
          onPress={() => {setShow(true)}}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyText text={selectedCountry.flag ? selectedCountry.flag :'🇺🇸'} />
          <MyIcon.AntDesign name="caretdown" color='black' style={{marginHorizontal: 10}} />
        </TouchableOpacity>

        <View style={{borderLeftWidth: 0.5, height: 24, marginRight: 10}} />
        <MyText text={selectedCountry.dial_code?selectedCountry.dial_code:'+1'} marginHorizontal={10} />
      
        <TextInput
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
       
      </View>
     
    </View>

            <MyButton
              text={'Update'}
              onPress={press?press:()=>{updateProfile()}}
              style={{ 
                marginTop: 20,
                alignSelf: 'center',
                width: '80%',
                height: 40,}}
            />
      </View>

      <CustomLoader showLoader={showLoader} />
        
        </View>
  );
};

const mapDispatchToProps = dispatch => ({
    dispatch,
  });
  export default connect(null, mapDispatchToProps)(UpdatePhone);
  
//export default UpdatePhone;
