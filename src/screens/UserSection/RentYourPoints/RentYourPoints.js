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
  Platform,
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
import {styles} from './RentYourPointsStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'components/Divider/Divider';
import {WebView} from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import Dropdown from '../../../components/Dropdown/Dropdown';
import DropDownPicker from 'react-native-dropdown-picker';

const userImg = `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60`;

const pointsData = [
  {
    id: '1',
    choosePointsImg: require('assets/images/choose-points.png'),
    vacationClubImg: require('assets/images/vacation-club.png'),
  },
  {
    id: '2',
    choosePointsImg: require('assets/images/choose-points.png'),
    vacationClubImg: require('assets/images/vacation-club.png'),
  },
  {
    id: '3',
    choosePointsImg: require('assets/images/choose-points.png'),
    vacationClubImg: require('assets/images/vacation-club.png'),
  },
];

const RentYourPoints = ({navigation, dispatch, route}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [allDeveloperData, setAllDeveloperData] = useState([]);
  const [filteredDeveloperData, setFilteredDeveloperData] = useState([]);
  const [filteredDeveloperNames, setFilteredDeveloperNames] = useState([]);
  const [currentOrFutureYears, setCurrentOrFutureYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPoint, setSelectedPoint] = useState('');
  const [points, setPoints] = useState('');
  const [developerData1, setdeveloperData1] = useState([]);
  const [openDeveloperDropdown, setOpenDeveloperDropdown] = useState(false);
  const [developerValue, setDeveloperValue] = useState(null);
  const [devdata,setdevdata]=useState('')
  useEffect(() => {
    getDeveloperData();
    getDropdownData(1)
  }, []);

  const getDropdownData = async (id) => {
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
        setdeveloperData1(myarr)
        setdevdata(myarr[0])
        setDeveloperValue(myarr[0].value)
        // return myarr
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in setVideoData', error);
    }

  };

  const getDeveloperData = async () => {
    const tempToken = `20|styw8BWZn5bvwMI7lDtJGd7EuZAVD3ap2tDhDddO`;
    setShowLoader(true);
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.New_ALL_DEVELOPERS,
      );
      console.log('getDeveloperData resp', resp?.data?.data);
      if (resp?.status) {
        setAllDeveloperData(resp?.data?.data);
        let allYears = [];
        resp?.data?.data?.map(el =>
          el?.developer_points?.find(jl => {
            if (!allYears.includes(Number(jl.year))) {
              allYears.push(Number(jl.year));
            }
          }),
        );
        const localCurrentOrFutureYears = allYears
          .filter(el => el >= getCurrentYear())
          ?.map(el => ({label: String(el), value: String(el)}));
        console.log('localCurrentOrFutureYears', localCurrentOrFutureYears);
        setCurrentOrFutureYears([...localCurrentOrFutureYears]);
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in getDeveloperData', error);
    }
    setShowLoader(false);
  };

  const gotoGetInTouch = () => {
    if (selectedYear === '') {
      Toast.show('Please Select Year', Toast.SHORT);
      return;
    } else if (selectedPoint === '') {
      Toast.show('Please select Developer', Toast.SHORT);
      return;
    } else if (points?.trim()?.length === 0) {
      Toast.show('Please enter points', Toast.SHORT);
      return;
    }
    const selectedDeveloper = allDeveloperData?.find(
      el => el.name == selectedPoint,
    );
    // console.log('selectedDeveloper', selectedDeveloper);
    var pointPrice = selectedDeveloper?.developer_points?.find(
      el => el.year == showSelectedYear(),
    )?.price_per_point;
    var totalAmount = 0;
    if(selectedDeveloper.name=='Marriott'){
      console.log('====================================ashish');
      console.log(devdata);
      console.log('====================================');
      // var mypointPrice = devdata?.data.years.find(
      //   el => el.year == showSelectedYear(),
      // )?.price_per_point;
      var mydevdata=devdata?.data.years
    //  var testd={"category_name": "Owners", "id": 1, "years": [{year:2023,price_per_point:0.75},{year:2024,price_per_point:0.81},{year:2025,price_per_point:0.75}]}
    //  var mydevdata=testd.years
     var mypointPrice = 0
      for(let i=0;i<mydevdata.length;i++){
        if(mydevdata[i].year==showSelectedYear()){
          mypointPrice=mydevdata[i].price_per_point
        }
      }
      pointPrice=mypointPrice
      totalAmount = mypointPrice * points
     // totalAmount = pointPrice * points
      console.log('====================================totalAmount');
      console.log(totalAmount);
      console.log('====================================');
    }else{
      totalAmount = pointPrice * points
    }
    const totalAmountB = checkIfDecimal(totalAmount)
      ? Number(totalAmount).toFixed(2)
      : totalAmount;
    // console.log('pointPrice, totalAmountB', pointPrice, totalAmountB);
    console.log('rent your points will send this data', {
      points,
      selectedDeveloper,
      amount: totalAmountB,
      price_per_point: pointPrice,
      selectedYear,
    });
    navigation.navigate(ScreenNames.GET_IN_TOUCH, {
      points,
      selectedDeveloper,
      amount: totalAmountB,
      price_per_point: pointPrice,
      selectedYear,
      marriottid:developerValue
    });
  };

  const renderPoint = ({item}) => {
    return (
      // <TouchableOpacity onPress={() => { setSelectedPoint(item.id) }} style={[styles.pointContainer, selectedPoint === item.id ? styles.selectedPoint : null]}>
      //   <Image source={item.choosePointsImg} />
      //   <Image source={item.vacationClubImg} style={{ marginLeft: 5 }} />
      //   {selectedPoint === item.id ?
      //     <View style={styles.tickView}>
      //       <Image source={require('assets/images/blue-tick.png')} />
      //     </View>
      //     : null}
      // </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedPoint(item.name);
        }}
        style={[
          styles.pointContainer,
          selectedPoint === item.name ? styles.selectedPoint : null,
        ]}>
        {/* <Image source={{uri: item.developer_image}} style={{height: 120, width: 127.5}} /> */}
        <Image
          source={{uri: item.logo}}
          style={{height: 63, width: 73}}
          resizeMode="contain"
        />
        <MyText
          text={item.name}
          textColor={'black'}
          fontSize={16}
          fontFamily="regular"
          style={{marginLeft: 15, width: '60%'}}
        />
        {/* <Image source={item.vacationClubImg} style={{ marginLeft: 5 }} /> */}
        {selectedPoint === item.name ? (
          <View style={styles.tickView}>
            <Image source={require('assets/images/blue-tick.png')} />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const showSelectedYear = () => {
    return selectedYear === '' ? getCurrentYear() : selectedYear;
  };

  const getDevelopersForSelectedYear = value => {
    const updatedData = allDeveloperData?.filter(el =>
      el?.developer_points?.find(jl => jl.year == value),
    );
    console.log("allDeveloperData======",allDeveloperData)
    setFilteredDeveloperData(updatedData)
    const updatedDeveloperNames = updatedData?.map(el => ({
      label: el.name,
      value: el.name,
    }));
    setFilteredDeveloperNames(updatedDeveloperNames);
  };

  //UI
  return (
    <View style={styles.container}>
      <MyHeader Title="Rent Your Points" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}>
          <Image
            source={require('assets/images/rent-your-points-bg.png')}
            style={styles.homebg}
          />

          <View style={styles.mainView}>
            <View style={styles.emptyContainer}>
              <Image
                source={require('assets/images/small-logo.png')}
                style={styles.logo}
              />
            </View>
            <MyText
              text="Select Year"
              textColor={Colors.Dark_GRAY}
              fontSize={16}
              fontFamily="medium"
              style={{marginTop: 45}}
            />
            <Dropdown
              data={currentOrFutureYears}
              value={selectedYear || ''}
              setValue={setSelectedYear}
              isCallFunc
              callFunc={Myvalue => {
                setSelectedYear(Myvalue.value);
                getDevelopersForSelectedYear(Myvalue.value);
              }}
              placeholder={`Select Year`}
              style={{marginTop: 10}}
            />
            <MyText
              text={`What Timeshare Developer Points Do You Want To Rent Out For ${showSelectedYear()}?`}
              textColor={Colors.Dark_GRAY}
              fontSize={16}
              fontFamily="medium"
              style={{}}
            />
            <Dropdown
              data={filteredDeveloperNames}
              value={selectedPoint || ''}
              setValue={setSelectedPoint}
              isCallFunc
              callFunc={Myvalue => {
                setSelectedPoint(Myvalue.value);
              }}
              isCustomIsFocus
              customIsFocus={() => {
                if (selectedYear === '') {
                  Toast.show('Please Select Year first');
                }
              }}
              placeholder={`Select Timeshare Developer Points`}
              style={{marginTop: 10}}
            />
         
          {selectedPoint=='Marriott' ?
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
             setItems={(i) => { setdeveloperData1(i) }}
             zIndex={'999'}
             placeholder={'Category'}
             onChangeValue={(value) => {
             }}
             onSelectItem={(item) => {
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
                width:'100%',paddingHorizontal:10}}
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
       
            <MyText
              text={`How Many Points Do You Want To Rent Out For ${showSelectedYear()}?*`}
              textColor={Colors.Dark_GRAY}
              fontSize={16}
              fontFamily="medium"
              style={{marginTop: 20}}
            />
            <MyTextInput
              placeholder={'Enter points here'}
              value={points}
              setValue={setPoints}
              keyboardType="number-pad"
              style={{
                marginTop: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderWidth: 0,
              }}
            />
            <MyButton
              text={'Next'}
              onPress={gotoGetInTouch}
              style={styles.buttonStyle}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(RentYourPoints);

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
const checkIfDecimal = num => {
  return num % 1 !== 0;
};
