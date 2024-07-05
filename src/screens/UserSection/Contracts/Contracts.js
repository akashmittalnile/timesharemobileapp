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
} from 'react-native';
//import : custom components
import MyHeader from 'components/MyHeader/MyHeader';
import MyText from 'components/MyText/MyText';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import Toast from 'react-native-simple-toast';
//import : global
import {Colors, Constant, MyIcon, ScreenNames, Service} from '../../../global/Index';
//import : styles
import {styles} from './ContractsStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width,getImageForDeveloper, height} from '../../../global/Constant';
import Divider from 'components/Divider/Divider';
import {WebView} from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';

const signedContractsData = [
  {
    id: '1',
    signedContractImg: require('assets/images/signed-contract.png'),
    logo: require('assets/images/marriott-vacation-club-logo.png'),
    title: 'Mariot',
  },
  {
    id: '2',
    signedContractImg: require('assets/images/signed-contract.png'),
    logo: require('assets/images/marriott-vacation-club-logo.png'),
    title: 'Mariot',
  },
];
const pendingContractsData = [
  {
    id: '1',
    signedContractImg: require('assets/images/signed-contract.png'),
    logo: require('assets/images/marriott-vacation-club-logo.png'),
    title: 'Mariot',
  },
  {
    id: '2',
    signedContractImg: require('assets/images/signed-contract.png'),
    logo: require('assets/images/marriott-vacation-club-logo.png'),
    title: 'Mariot',
  },
];
const Contracts = ({navigation, dispatch}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [contractsData, setContractsData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getContracts();
    });
    return unsubscribe;
  }, [navigation]);
  const getContracts = async () => {
    setShowLoader(true);
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.GET_CONTRACTS,
      );
      console.log('getContracts resp', resp?.data?.data.accepted_contracts);
      if (resp?.status) {
        setContractsData(resp?.data?.data);
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in getContracts', error);
    }
    setShowLoader(false);
  };
  const gotoSignContract = item => {

    navigation.navigate(getImageForDeveloper(item.developer_name), {
      email:'',
      name: userInfo?.name,
      newAmount:item.amount,
      contractId:item.id,
      anniStartDates:[item.anniversary_start_date],
      signature_image:item.signature_image,
      selectedYear:item.year,
      print_name:item.print_name,
      referralCode:'',
      points: item.points,
      valid_days: item.valid_days,
      price_per_point:item.price_per_point,
      selectedDeveloper: {name: item.developer_name},
    });
  };
  const gotoRejectedContract = item => {

    let url = Service.BASE_URL.replace('api/', 'agreement/');
    url += item.userid;
    url += '/';
    url += item.id;
    console.log('Ashish',url);
   console.log('gotoRejectedContractPDf url', url);
    navigation.navigate(ScreenNames.ViewRejectedContracts, {
      url,
      contractId: item.id,
    });

  };
  const gotoViewPDf = item => {
    let url = Service.BASE_URL.replace('api/', 'agreement/');
    url += item.userid;
    url += '/';
    url += item.id;
    console.log(url);
    // // console.log('gotoViewPDf url', url);
    navigation.navigate(ScreenNames.VIEW_CONTRACT_PDF, {
      url,
      contractId: item.id,
    });
  };

  const rendersignedContract = ({item}) => {
    // console.log('item', item);
    return (
     
      <View style={styles.contractTab}>
        <View style={styles.contractContainer}>
          <View style={{}}>
            <View style={styles.logoContainer}>
              <View style={styles.logoView}>
                <Image
                  // resizeMode="contain"
                  source={{uri: item?.developer_logo}}
                  style={{height: '100%', width: '100%',resizeMode:'stretch'}}
                />
              </View>
            </View>
          </View>
       
          <Image
            source={{uri: item?.developer_photo}}
            style={styles.sgImg}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          onPress={() => gotoViewPDf(item)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{fontSize: 15, color: Colors.BLACK, paddingVertical: 10}}>
            View Your Contract
          </Text>
          <View style={styles.rightArrowContainer}>
            <Image
              source={require('../../../assets/images/blue-right-icon.png')}
              resizeMode="contain"
              tintColor={Colors.WHITE}
              style={styles.rightArrowIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderAcceptedContract = ({item}) => {
    // console.log('item', item);
    return (
      // <View style={styles.contractContainer}>
      //   <Image
      //     source={item.signedContractImg}
      //     style={styles.sgImg}
      //     resizeMode="contain"
      //   />
      //   <View style={{marginLeft: 10}}>
      //     <View style={[styles.priceTopRow]}>
      //       <View style={styles.logoView}>
      //         <Image source={item.logo} />
      //       </View>
      //       <MyText
      //         text={item.title}
      //         textColor={Colors.THEME_GRAY}
      //         fontSize={14}
      //         style={{marginLeft: 15}}
      //       />
      //     </View>
      //     <MyButton
      //       text={'View Your Contract'}
      //       onPress={() => {}}
      //       style={styles.buttonStyle}
      //     />
      //   </View>
      // </View>
      <View style={styles.contractTab}>
        <View style={styles.contractContainer}>
          <View style={{}}>
            <View style={styles.logoContainer}>
              <View style={styles.logoView}>
                <Image
                  // resizeMode="contain"
                  source={{uri: item?.developer_logo}}
                  style={{height: '100%', width: '100%',resizeMode:'stretch'}}
                />
              </View>
            </View>
          </View>
          {/* <Image
            source={{uri: item?.developer_photo}}
            style={styles.pdfImg}
            resizeMode="contain"
          /> */}
          <Image
            source={{uri: item?.developer_photo}}
            style={styles.sgImg}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            gotoSignContract(item);
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{fontSize: 15, color: Colors.BLACK, paddingVertical: 10}}>
            View Your Contract
          </Text>
          <View style={styles.rightArrowContainer}>
            <Image
              source={require('assets/images/blue-right-icon.png')}
              resizeMode="contain"
              tintColor={Colors.WHITE}
              style={styles.rightArrowIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const rendeRejectedContract = ({item}) => {
    // console.log('item', item);
    return (
    
      <View style={styles.contractTab}>
        <View style={styles.contractContainer}>
          <View style={{}}>
            <View style={styles.logoContainer}>
              <View style={styles.logoView}>
                <Image
                  source={{uri: item?.developer_logo}}
                  style={{height: '100%', width: '100%',resizeMode:'stretch'}}
                />
              </View>
            </View>
          </View>
        
          <Image
            source={{uri: item?.developer_photo}}
            style={styles.sgImg}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            gotoRejectedContract(item);
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{fontSize: 15, color: Colors.BLACK, paddingVertical: 10}}>
            View Your Contract
          </Text>
          <View style={styles.rightArrowContainer}>
            <Image
              source={require('assets/images/blue-right-icon.png')}
              resizeMode="contain"
              tintColor={Colors.WHITE}
              style={styles.rightArrowIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const NoData = ({type}) => (
    <View style={{marginTop: 10, alignItems: 'center', width: '100%'}}>
      <Image
        source={require('assets/images/no-data.png')}
        style={{width: 150, height: getNoDataheight(150)}}
      />
      <MyText
        text={`No ${type} Contracts found`}
        textColor={Colors.THEME_GRAY}
        fontSize={16}
        fontFamily="medium"
        textAlign="center"
        style={{marginTop: 10}}
      />
    </View>
  );
  //UI
  return (
    <View style={styles.container}>
      <MyHeader Title="Contracts" isMenu />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '20%'}}>
        <Image
          source={require('assets/images/welcome-bg-1.jpg')}
          style={styles.homebg}
        />

        <Image
          source={require('assets/images/splash-logo.png')}
          style={styles.screenLogo}
        />

        <View style={styles.mainView}>
          <MyText
            text="Signed Contract"
            textColor={Colors.THEME_GRAY}
            fontSize={18}
            fontFamily="medium"
            style={{marginTop: 15}}
          />

          {contractsData?.signed_contracts?.length > 0 ? (
            <FlatList
              data={contractsData?.signed_contracts || []}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 10}}
              keyExtractor={item => item.id}
              renderItem={rendersignedContract}
            />
          ) : (
            <NoData type="Signed" />
          )}

          <MyText
            text="Accepted Contracts"
            textColor={Colors.THEME_GRAY}
            fontSize={18}
            fontFamily="medium"
            style={{marginTop: 15}}
          />

          {contractsData?.accepted_contracts?.length > 0 ? (
            <FlatList
              data={contractsData?.accepted_contracts || []}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 10}}
              keyExtractor={item => item.id}
              renderItem={renderAcceptedContract}
            />
          ) : (
            <NoData type="Accepted" />
          )}
          <MyText
            text="Rejected Contract"
            textColor={Colors.THEME_GRAY}
            fontSize={18}
            fontFamily="medium"
            style={{marginTop: 15}}
          />

          {contractsData?.rejected_contracts?.length > 0 ? (
            <FlatList
              data={contractsData?.rejected_contracts || []}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 10}}
              keyExtractor={item => item.id}
              renderItem={rendeRejectedContract}
            />
          ) : (
            <NoData type="Rejected" />
          )}
        </View>
      </ScrollView>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(Contracts);

const getNoDataheight = imgWidth => {
  return (200 / 306) * imgWidth;
};
