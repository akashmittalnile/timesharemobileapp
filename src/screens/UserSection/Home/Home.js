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
import MyHeader from '../../../components/MyHeader/MyHeader';
import MyText from 'components/MyText/MyText';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
//import : global
import {Colors, Constant, MyIcon, ScreenNames, Service} from '../../../global/Index';
//import : styles
import {styles} from './HomeStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'components/Divider/Divider';
import {WebView} from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';
import UpdatePhone from '../../../modals/UpdatePhone/UpdatePhone';
import DropdownPicker from '../../../components/DropdownPicker/DropdownPicker';
import DropDownPicker from 'react-native-dropdown-picker';

const estimatesData = [
  {
    id: '1',
    title: 'Past Estimates',
    amount: '279',
    points: '10,000',
    positive: true,
  },
  {
    id: '2',
    title: 'Rejected Estimates',
    amount: '279',
    points: '10,000',
    positive: false,
  },
];
const priceData = [
  {
    id: '1',
    logo: require('assets/images/marriott-vacation-club-logo.png'),
    name: 'Marriott\nVacation Club',
    year2021: 0.61,
    year2022: 0.61,
    year2023: 0.61,
  },
  {
    id: '2',
    name: 'Marriott Vacation Club',
    logo: require('assets/images/marriott-vacation-club-logo.png'),
    year2021: 0.61,
    year2022: 0.61,
    year2023: 0.61,
  },
];

const Home = ({navigation, dispatch}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
     console.log('=====token==',userToken)
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [showLoader2, setShowLoader2] = useState(false);
  const [showHome1] = useState(true);
  const [developerData, setDeveloperData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [developerData1, setDeveloperData1] = useState([
    {label: 'Marriot', value: 'Marriot'},
  ]);
  const [openDeveloperDropdown, setOpenDeveloperDropdown] = useState(false);
  const [developerValue, setDeveloperValue] = useState(null);
  const [devdata,setdevdata]=useState('')
  const [price_per_point1,setprice_per_point1]=useState('')
  const [price_per_point2,setprice_per_point2]=useState('')
  const [price_per_point3,setprice_per_point3]=useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('userToken', userToken);
      setOpenDeveloperDropdown(false)
      getDeveloperData();
      getVideos();
      getDropdownData(1)
    });
    
    return unsubscribe;
  }, [navigation]);

  const getDeveloperData = async () => {
    setShowLoader(true);
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.New_ALL_DEVELOPERS,
      );
      console.log('getDeveloperData resp', resp?.data?.data);
      if (resp?.status) {
        setDeveloperData(resp?.data?.data);
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in getDeveloperData', error);
    }
    setShowLoader(false);
  };
  // Saurabh Saneja August 14, 2023
  // get videos data from backend 
  //developers/category-by-developer/1
  const getDropdownData = async (id) => {
    
    setShowLoader2(true);
    try {
      const resp = await Service.getApiWithToken(userToken, Service.developers_category+'1');
      console.log('developers_category resp', resp?.data);
      if (resp?.data?.status) {
        // {"data": [{"category_name": "Owners", "id": 1, "years": [{year:2023,price_per_point:0.75},{year:2024,price_per_point:0.75},{year:2025,price_per_point:0.75}]},
        //  {"category_name": "Presidential", "id": 2, "price_per_point": "0.45", "year": 2022}, 
        //  {"category_name": "Owners", "id": 1, "price_per_point": "0.75", "year": 2024}],
        //   "status": true}
        var myarr=[]
        var ddd=resp?.data.data
        for(let i=0;i<ddd.length;i++){
          myarr.push({label: ddd[i].category_name, value: ddd[i].id,data:ddd[i]})
        }
        setDeveloperData1(myarr)
        setdevdata(myarr[0])
        setDeveloperValue(myarr[0].value)
        var mydevdata=myarr[0].data.years
        for(let i=0;i<mydevdata.length;i++){
          console.log('====================================mydevdatamydevdatamydevdata');
          console.log(mydevdata[i]);
          console.log('====================================');
          if(mydevdata[i].year==getCurrentYear()-1){

           setprice_per_point1(mydevdata[i].price_per_point)
          }else if(mydevdata[i].year==getCurrentYear()){
           setprice_per_point2(mydevdata[i].price_per_point)
          }else if(mydevdata[i].year==getCurrentYear()+1){
           setprice_per_point3(mydevdata[i].price_per_point)
          }
        }
        // return myarr
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in setVideoData', error);
    }
    setShowLoader2(false);
  };
  const getVideos = async () => {
    console.log('setVideoData resp');
    setShowLoader2(true);
    try {
      const resp = await Service.getApiWithToken(userToken, Service.VIDEOS);
      console.log('setVideoData resp', resp?.data);
      if (resp?.data?.status) {
        setVideoData(resp?.data?.allvideos);
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in setVideoData', error);
    }
    setShowLoader2(false);
  };
  
  const gotoTimesharePoint = () => {
    navigation.navigate(ScreenNames.TIMESHARE_POINT, {developerData});
    // navigation.navigate(ScreenNames.VIEW_CONTRACTS, {developerData});
  };

  const gotoTrainingVideos = () => {
    navigation.navigate(ScreenNames.TRAINING_VIDEOS);
  };

  const renderEstimate = ({item}) => {
    // console.log('item', item);
    return (
      <View style={styles.estimateContainer}>
        <View style={styles.estimateTopRow}>
          <MyText
            text={item.title}
            textColor={Colors.THEME_GRAY}
            fontSize={18}
            fontFamily="medium"
          />
          <View
            style={[
              styles.resultsView,
              ,
              !item.positive ? {backgroundColor: 'rgba(255, 0, 0, 0.4)'} : null,
            ]}>
            <MyText
              text={'Result $' + item.amount}
              textColor={item.positive ? Colors.THEME_BLUE : Colors.RED}
              fontSize={14}
              fontFamily="medium"
            />
          </View>
        </View>
        <View style={styles.estimateBottomRow}>
          <Text style={styles.longText}>
            You Can Receive $279 By Renting Out
            <Text
              style={
                item.positive ? {color: Colors.THEME_BLUE} : {color: Colors.RED}
              }>
              10,000 Pts
            </Text>
            These Unused Points With Us!
          </Text>
          <TouchableOpacity
            style={[
              styles.arrowView,
              !item.positive ? {backgroundColor: 'rgba(255, 0, 0, 0.4)'} : null,
            ]}>
            <Image
              source={
                item.positive
                  ? require('assets/images/blue-right-icon.png')
                  : require('assets/images/red-right-icon.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const onselectcategory=(items)=>{
   // {"category_name": "Owners", "id": 1, "years": [{year:2023,price_per_point:0.75},{year:2024,price_per_point:0.75},{year:2025,price_per_point:0.75}]}
   var mydevdata=items.data.years
   //  var testd={"category_name": "Owners", "id": 1, "years": [{year:2023,price_per_point:0.75},{year:2024,price_per_point:0.81},{year:2025,price_per_point:0.75}]}
   //  var mydevdata=testd.years

     for(let i=0;i<mydevdata.length;i++){
       if(mydevdata[i].year==getCurrentYear()-1){
        setprice_per_point1(mydevdata[i].price_per_point)
       }else if(mydevdata[i].year==getCurrentYear()){
        setprice_per_point2(mydevdata[i].price_per_point)
       }else if(mydevdata[i].year==getCurrentYear()+1){
        setprice_per_point3(mydevdata[i].price_per_point)
       }
     }
  }
  const renderPrice = ({item}) => {
    // console.log('item', item);
    return (
      <View style={styles.priceContainer}>
        <View style={[styles.priceTopRow, {paddingHorizontal: 10}]}>
          {/* <View style={styles.logoView}> */}
          <Image
            source={{uri: item.logo}}
            style={{height: 63, width: 73}}
            resizeMode="contain"
          />
          {/* </View> */}
          <MyText
            text={item.name}
            textColor={'black'}
            fontSize={16}
            fontFamily="regular"
            style={{marginLeft: 15, width: item.name=='Marriott' ? '30%':'60%'}}
          />
          {item.name=='Marriott' ?
           <View style={{ 
           zIndex: 999,
           borderColor: '#E0E0E0',
           borderWidth: 1,
           borderRadius: 5,
           alignSelf: 'center',
          //  height:40
           }}>
           <DropDownPicker
             open={openDeveloperDropdown}
             value={developerValue}
             items={developerData1}
             setOpen={setOpenDeveloperDropdown}
             setValue={(v) => { setDeveloperValue(v) }}
            // setItems={(i) => { setData(i) }}
             zIndex={'999'}
             placeholder={'Category'}
             onChangeValue={(value) => { 
               
             }}
             onSelectItem={(item) => {
              onselectcategory(item)
              setdevdata(item)
            }}
             listItemLabelStyle={{ color: Colors.THEME_GRAY }}
             labelStyle={{ color: Colors.THEME_GRAY }}
             dropDownDirection="BOTTOM"
             // listMode="MODAL"
             placeholderStyle={{
               fontSize: 14,
              color: '#8F93A0',
              fontWeight: '400'}}
             textStyle={{ 
              fontSize: 14,
              color: '#455A64',
              fontWeight: '400'}}
             style={{ borderColor: 'transparent', backgroundColor: 'white',
                height:40 ,
                marginBottom: 10,
                borderRadius: 10,
                borderWidth: 0,
                zIndex: 4000,
                zIndexInverse: 1000,
                width:140}}
             containerStyle={{
               borderColor: 'red',
               // height:400
             }}
             disabledStyle={{
               opacity: 0.5
             }}
             // maxHeight={400}
             dropDownContainerStyle={{
              backgroundColor: '#fff',
              borderColor: 'transparent',
              shadowColor: '#000000',
              shadowOffset: {
                  width: 0,
                  height: 3
              },
              shadowRadius: 5,
              shadowOpacity: 1.0,
              elevation: 5,
              zIndex:999,}}
           />
         </View>
    
        : null}
          
        </View>
        <View style={[styles.priceMiddleRow, {paddingHorizontal: 10,zIndex:-999}]}>
        
       
       
          {item?.developer_points?.find(
            el => el?.year == getCurrentYear() - 2,
          ) ? (
            <View
              style={{
                backgroundColor: '#B1B2B426',
                paddingHorizontal: 10,
                paddingBottom: 0,
                borderRadius: 4,
              }}>
             
            </View>
          ) : null} 
          {item?.developer_points?.find(
            el => el?.year == getCurrentYear() - 1,
          ) ? (
            <View>
             
            </View>
          ) : null}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center',zIndex:-999}}>
            <View
              style={[
                styles.priceBottomRow,
                {
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                  marginLeft: 20,
                },
              ]}>
              <View style={{}}>
                <MyText
                  text={`Price Per Point ${getCurrentYear() - 1}`}
                  textColor={'grey'}
                  fontSize={14}
                  fontFamily="medium"
                  lineHeight={20}
                />
                {item?.developer_points?.find(
                      el => el?.year == getCurrentYear()-1,
                    )?.price_per_point!=undefined ? 
                <MyText
                  text={
                    item.name!='Marriott' ?
                    '$' +
                    item?.developer_points?.find(
                      el => el?.year == getCurrentYear()-1,
                    )?.price_per_point
                    :
                    price_per_point1
                  }
                  textColor={'black'}
                  fontSize={16}
                  fontFamily="medium"
                  textAlign="center"
                />
                :
                <MyText
                  text={'Not Available'}
                  textColor={'black'}
                  fontSize={16}
                  fontFamily="medium"
                  textAlign="center"
                />
                
                }
              </View>
            </View>
         
            <View
              style={[
                styles.priceBottomRow,
                {
                  paddingHorizontal: 8,
                  backgroundColor: '#fff',
                  paddingRight: 30,
                  marginRight: 5,
                },
              ]}>
              <View style={{}}>
                <MyText
                  text={`Price Per Point ${getCurrentYear() + 1}`}
                  textColor={'grey'}
                  fontSize={14}
                  fontFamily="medium"
                  lineHeight={20}
                />
                {item?.developer_points?.find(
                      el => el?.year == getCurrentYear()+1,
                    )?.price_per_point!=undefined ? 
                <MyText
                  text={
                    item.name!='Marriott' ?
                    '$' +
                    item?.developer_points?.find(
                      el => el?.year == getCurrentYear()+1,
                    )?.price_per_point
                    :
                    price_per_point3
                  }
                  textColor={'black'}
                  fontSize={16}
                  fontFamily="medium"
                  textAlign="center"
                />
                :
                <MyText
                  text={'Not Available'}
                  textColor={'black'}
                  fontSize={16}
                  fontFamily="medium"
                  textAlign="center"
                />
                
                }
              </View>
            </View>
          {/* ) : null} */}
        </View>

        
        <Divider style={{marginBottom: 5, marginTop: 7,zIndex:-999}} />
       {/*  {item?.developer_points?.find(el => el?.year == getCurrentYear()) ? ( */}
          <View style={[styles.priceBottomRow, {paddingHorizontal: 10,zIndex:-999}]}>
            <View style={{}}>
              <MyText
                text={`Price Per Point ${getCurrentYear()}`}
                textColor={'grey'}
                fontSize={14}
                fontFamily="medium"
                lineHeight={20}
              />
             {item?.developer_points?.find(
                      el => el?.year == getCurrentYear(),
                    )?.price_per_point!=undefined ? 
                <MyText
                  text={
                    item.name!='Marriott' ?
                    '$' +
                    item?.developer_points?.find(
                      el => el?.year == getCurrentYear(),
                    )?.price_per_point
                    :
                    price_per_point2
                  }
                  textColor={'black'}
                  fontSize={16}
                  fontFamily="medium"
                  textAlign="center"
                />
                :
                <MyText
                  text={'Not Available'}
                  textColor={'black'}
                  fontSize={16}
                  fontFamily="medium"
                  textAlign="center"
                />
                
                }
            </View>
          </View>
        {/* ) : null} */}
      </View>
    );
  };
  //UI
  return (
    <View style={styles.container}>
      <MyHeader Title="Home" isMenu />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '20%'}}
        style={styles.mainView}>
        {!showHome1 ? (
          <>
            <View style={styles.reviewProcessContainer}>
              <View style={styles.reviewProcessTopRow}>
                <MyText
                  text="Review Process"
                  textColor={Colors.THEME_GRAY}
                  fontSize={18}
                  fontFamily="medium"
                />
                <TouchableOpacity style={styles.arrowView}>
                  <Image
                    source={require('assets/images/blue-right-icon.png')}
                  />
                </TouchableOpacity>
              </View>
              <MyText
                text="It Involves A Thorough Examination Of The Contract Terms & Conditions To Ensure That Both Parties Understand Their Obligations And Rights Before Finalizing The Contract."
                textColor={Colors.LIGHT_GRAY}
                fontSize={14}
                lineHeight={20}
                style={{marginTop: 10}}
              />
            </View>

            <FlatList
              data={estimatesData}
              horizontal={true}
              style={{marginTop: 20}}
              // keyExtractor={item => item.id}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderEstimate}
            />
          </>
        ) : (
          <View style={styles.instantQuoteContainer}>
            <MyText
              text="Get An Instant Quote On Renting Out Your Timeshare Points Through Us! No Cost To You Get Paid Quickly!"
              textColor={Colors.THEME_GRAY}
              fontSize={18}
              fontFamily="medium"
              style={{marginBottom: 7}}
            />
            <MyText
              text="Get An Instant Quote! No Cost To You Get Paid Quickly ACCEPT/REJECT Offers & Sign Contract (Incase Of Acceptance The Timeshare Points Offers )"
              textColor={Colors.THEME_GRAY}
              fontSize={14}
            />
            <Image
              source={require('assets/images/home-bg.png')}
              style={styles.homebg}
            />
            <MyButton
              text={'Get Started'}
              onPress={gotoTimesharePoint}
              style={styles.buttonStyle}
            />
          </View>
        )}

        <MyText
          text="Our Current Price Per Point Is As Follows:"
          textColor={Colors.THEME_GRAY}
          fontSize={16}
          fontFamily="medium"
          style={{marginTop: 15}}
        />

        <FlatList
          // data={priceData}
          data={developerData}
          horizontal={true}
          style={{marginTop: 10}}
          // keyExtractor={item => item.id}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderPrice}
        />

          <Text style={{color:Colors.THEME_BLUE,textAlign:'center',marginVertical:8,fontWeight:'600'}}>Scroll to find your Developer</Text>


        <View style={styles.programViewAll}>
          <MyText
            text="How Our  Program Works?"
            textColor={Colors.THEME_GRAY}
            fontSize={18}
            fontFamily="medium"
          />
          <TouchableOpacity
            onPress={() => {
              gotoTrainingVideos();
            }}>
            <MyText
              text="View All"
              textColor={Colors.THEME_BLUE}
              fontSize={13}
            />
          </TouchableOpacity>
        </View>
        {/* Saurabh Saneja August 14, 2023 */}
        {/* show one video in webview, if no video found, then show image with message*/}
        {videoData?.length > 0 ? (
          <View style={styles.webViewContainer}>
            <WebView
              source={{
                uri: videoData[0]?.url_link,
              }}
              contentMode="mobile"
              style={styles.webViewStyle}
            />
          </View>
        ) : (
          <View style={{marginTop: 10, alignItems: 'center'}}>
            <Image source={require('assets/images/no-data.png')} />
            <MyText
              text="No Videos found"
              textColor={Colors.THEME_GRAY}
              fontSize={16}
              fontFamily="medium"
              textAlign="center"
              style={{marginTop: 10}}
            />
          </View>
        )}
      </ScrollView>
          {!userInfo.contact ?
          <UpdatePhone />
        : null}

      <CustomLoader showLoader={showLoader || showLoader2} />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(Home);

const getNoDataHeight = () => {
  return (width * 200) / 306;
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};
