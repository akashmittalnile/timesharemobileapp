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
  ImageBackground,
} from 'react-native';
//import : custom components
import MyHeader from '../../../components/MyHeader/MyHeader';
import MyText from 'components/MyText/MyText';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
//import : third parties
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
//import : global
import { Colors, Constant, MyIcon, ScreenNames, Service } from '../../../global/Index';
//import : styles
import { styles } from './ProfileStyle';
//import : modal
//import : redux
import { connect, useSelector } from 'react-redux';
import { width, height } from 'global/Constant';
import Divider from 'components/Divider/Divider';
import { WebView } from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';
import DateSelector from '../../../components/DateSelector/DateSelector';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { getFormattedPhoneNumber } from '../../../global/Constant';
import UpdatePhone from '../../../modals/UpdatePhone/UpdatePhone';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
const H = Dimensions.get('screen').height;
const W = Dimensions.get('screen').width;
const userImg = `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60`;
import {CommonActions} from '@react-navigation/core';
import {logOutUser, setUser} from '../../../reduxToolkit/reducer/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation, dispatch }) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState('');
  const [openStartDate, setOpenStartDate] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [contractsData, setcontractsData] = useState([])
  const [tableHead, settableHead] = useState(['Date', 'Name', 'Points', 'Status', 'Amount/Points', 'Logo'])
  const [widthArr, setwidthArr] = useState([100, 100, 100, 100, 100, 100])
  const [tabledataarray, settabledataarray] = useState([])
  const [signedData, setsignedData] = useState(false)
  const [acceptedData, setacceptedData] = useState(false)
  const [rejectedData, setrejectedData] = useState(false)
  const [tablesData, settablesData] = useState([])
  const [title, settitle] = useState('')
  const [ind, setind] = useState(0)
  const [developerData1, setDeveloperData1] = useState([]);
  const [openDeveloperDropdown, setOpenDeveloperDropdown] = useState(false);
  const [developerValue, setDeveloperValue] = useState(null);
  const [devdata, setdevdata] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDeveloperValue(null)
      setOpenDeveloperDropdown(false)
      setStartDate2('')
     getProfileData('','');
    })

    return () => {
      unsubscribe
    }
   
  }, []);

  const gotoWelcome = () =>
    CommonActions.reset({
      index: 1,
      routes: [{name: ScreenNames.WELCOME}],
  });

  const Mydelete = async () => {
    setShowLoader(true);
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.DELETE,
        {}
      );
      console.log('logout resp', resp);
      if (resp?.data?.status) {
       
        navigation.dispatch(gotoWelcome)
        dispatch(logOutUser());
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.log('error in logout', error);
    }
    setShowLoader(false);
  };


  const myfun = (ddd) => {
    var tablenumber = []
    var signedpoints = ddd.signed_pointsbydeveloper
    var acceptedpoints = ddd.accept_pointsbydeveloper
    var rejectedpoints = ddd.reject_pointsbydeveloper
    var headArr = tableHead

    //*****Start RowData Collection */
    var tabledata = []
    for (let i = 0; i < signedpoints.length; i += 1) {

      for (let j = 0; j < signedpoints[i]?.signContracts.length; j += 1) {
        var rowdata = []
        rowdata.push(signedpoints[i].signContracts[j].agreement_date)
        rowdata.push(signedpoints[i].signContracts[j].developer_name)
        rowdata.push(signedpoints[i].signContracts[j].anniversary_points)
        rowdata.push('Signed')
        rowdata.push(signedpoints[i].signContracts[j].price_per_point)
        rowdata.push(signedpoints[i].signContracts[j].developer_logo)
        tabledata.push(rowdata)
      }
    }
    tablenumber.push({ 'tablesData': tabledata, 'Total': '12' })
    //****Accepted data array */
    var tabledata2 = []
    for (let i = 0; i < acceptedpoints.length; i += 1) {
      for (let j = 0; j < acceptedpoints[i]?.acceptedContracts.length; j += 1) {
        var rowdata = []
        rowdata.push(acceptedpoints[i].acceptedContracts[j].agreement_date)
        rowdata.push(acceptedpoints[i].acceptedContracts[j].developer_name)
        rowdata.push(acceptedpoints[i].acceptedContracts[j].anniversary_points)
        rowdata.push('Accepted')
        rowdata.push(acceptedpoints[i].acceptedContracts[j].price_per_point)
        rowdata.push(acceptedpoints[i].acceptedContracts[j].developer_logo)
        tabledata2.push(rowdata)
      }
    }
    tablenumber.push({ 'tablesData': tabledata2, 'Total': '15' })
    //****rejected data array */
    var tabledata3 = []
    for (let i = 0; i < rejectedpoints.length; i += 1) {

      for (let j = 0; j < rejectedpoints[i]?.rejectContracts.length; j += 1) {
        var rowdata = []
        rowdata.push(rejectedpoints[i].rejectContracts[j].agreement_date)
        rowdata.push(rejectedpoints[i].rejectContracts[j].developer_name)
        rowdata.push(rejectedpoints[i].rejectContracts[j].anniversary_points)
        rowdata.push('Rejected')
        rowdata.push(rejectedpoints[i].rejectContracts[j].price_per_point)
        rowdata.push(rejectedpoints[i].rejectContracts[j].developer_logo)
        tabledata3.push(rowdata)
      }
    }
    tablenumber.push({ 'tablesData': tabledata3, 'Total': '15' })
    settabledataarray(tablenumber)
  }

  const getProfileData = async (dates,devloper) => {
    const tempToken = `20|styw8BWZn5bvwMI7lDtJGd7EuZAVD3ap2tDhDddO`;
    const endPoint = Service.GET_PROFILE;
    console.log('getProfileData endPoint', endPoint);
    setShowLoader(true);
    try {

      var data={
        agreement_date:dates,
        developer_id:devloper
      }
      console.log('====================================profiledata');
      console.log(data);
      console.log('====================================');
      const resp = await Service.postApiWithToken(userToken,endPoint, data);
      // const resp = await Service.getApiWithToken(userToken, endPoint);
     console.log('getProfileData resp', resp?.data);
      if (resp?.status) {
        setProfileData(resp?.data);
        setDeveloperData1(resp?.data.data.all_developer)
        myfun(resp?.data)
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in getProfileData', error);
    }
    setShowLoader(false);
  };
  const gotoTimesharePoint = () => {
    navigation.navigate(ScreenNames.TIMESHARE_POINT);
  };
  const gotoEditProfile = () => {
    navigation.navigate(ScreenNames.EDIT_PROFILE);
  };
 
  //UI

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0C8AFF65', '#0C8AFF83', '#0C8AFF65']}
        style={styles.container}>
        <MyHeader Title="Profile" isMenu />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: '20%' }}>
          <Image
            source={require('../../../assets/images/profile-bg.png')}
            style={styles.homebg}
          />

          <View style={styles.mainView}>
            <TouchableOpacity onPress={gotoEditProfile} style={styles.editView}>
              <Image source={require('assets/images/edit-icon.png')} />
            </TouchableOpacity>

            <View style={styles.profileDetailsContainer}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={
                    userInfo?.profile_pic
                      ? { uri: userInfo?.profile_pic }
                      : require('../../../assets/images/user-default.png')
                  }
                  style={styles.img}
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <MyText
                  text={userInfo?.name}
                  textColor={Colors.THEME_GRAY}
                  fontSize={20}
                  fontFamily="bold"
                  style={{ marginBottom: 15 }}
                />
                <Contact
                  icon={require('assets/images/email-icon-2.png')}
                  text={userInfo?.email}
                  colo={Colors.THEME_GRAY}
                />
                <Contact
                  icon={require('assets/images/call-icon.png')}
                  text={`${userInfo.contact ? '+1 ' : ''}${userInfo.contact ? userInfo.contact : 'Add Number'}`}
                  colo={Colors.THEME_BLUE}
                />

              </View>
            </View>
            <View style={{alignSelf:'center',width:'100%'}}>
              <MyButton
                text={'Delete My Account'}
                onPress={Mydelete}
                style={[styles.buttonStyle,{alignSelf:'center'}]}
              />
            </View>
            
            <View style={styles.moneyContainer}>
              <View style={styles.starRow}>
                <Image source={require('assets/images/nebulas-(nas).png')} />
                <Image source={require('assets/images/weird-arrow.png')} />
                <Image source={require('assets/images/usd-coin-(usdc).png')} />
              </View>
              <MyText
                // text="68,88,48.09"
                text={profileData?.total_points}
                textColor={Colors.THEME_GRAY}
                fontSize={24}
                fontFamily="bold"
                style={{ marginBottom: 5, marginTop: 10 }}
              />
              <MyText
                text={'PTS remaining'}
                textColor={Colors.THEME_GRAY}
                fontSize={14}
              />
              <MyButton
                text={'Get Offer'}
                onPress={gotoTimesharePoint}
                style={styles.buttonStyle}
              />
              <Divider
                style={{ borderColor: '#EBEBEB', marginTop: 20, width: '100%' }}
              />
              <View style={styles.infoRow}>
                <Image source={require('assets/images/info-circle.png')} />
                <MyText
                  text={`You can get upto ${profileData?.total_amounts} Est`}
                  textColor={Colors.THEME_BLUE}
                  fontSize={14}
                />
              </View>
            </View>

            <TouchableOpacity style={[styles.mybutton, { height: 150, }]} onPress={() => {
              settitle('Signed Contracts')
              setind(0)
              setsignedData(true)
            }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/images/documentIcon.png')} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ marginLeft: 10,color:'#000' }}>Signed Contracts</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../../../assets/images/usd-coin-(usdc).png')} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ color: Colors.THEME_BLUE }}>Total Points - {profileData?.sign_contract_points}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../../../assets/images/small-logo.png')} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ color: Colors.THEME_BLUE }}>Total Contracts - {profileData?.signed_points_count}</Text>
              </View>
              <View style={{ width: '110%', height: 40, backgroundColor: Colors.BRIGHT_GRAY, position: 'absolute', bottom: 0, alignSelf: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                  <Text style={{ marginLeft: 10,color:'#000' }}>View Your Contracts</Text>
                  <View style={{ width: 25, height: 25, borderRadius: 15, backgroundColor: Colors.THEME_BLUE, justifyContent: 'center', marginTop: 3, marginLeft: 10 }}>
                    <Image
                      source={require('../../../assets/images/blue-right-icon.png')}
                      resizeMode="contain"
                      tintColor={Colors.WHITE}
                      style={{ width: 15, height: 12, alignSelf: 'center' }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mybutton, { height: 150, }]} onPress={() => {
              settitle('Accepted Contracts')
              setind(1)
              setsignedData(true)
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/images/documentIcon.png')} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ marginLeft: 10,color:'#000' }}>Accepted Contracts</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../../../assets/images/usd-coin-(usdc).png')} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ color: Colors.THEME_BLUE }}>Total Points - {profileData?.accepted_contract_points}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../../../assets/images/small-logo.png')} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ color: Colors.THEME_BLUE }}>Total Contracts - {profileData?.accept_points_count}</Text>
              </View>
              <View style={{ width: '110%', height: 40, backgroundColor: Colors.BRIGHT_GRAY, position: 'absolute', bottom: 0, alignSelf: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                  <Text style={{ marginLeft: 10,color:'#000' }}>View Your Contracts</Text>
                  <View style={{ width: 25, height: 25, borderRadius: 15, backgroundColor: Colors.THEME_BLUE, justifyContent: 'center', marginTop: 3, marginLeft: 10 }}>
                    <Image
                      source={require('../../../assets/images/blue-right-icon.png')}
                      resizeMode="contain"
                      tintColor={Colors.WHITE}
                      style={{ width: 15, height: 12, alignSelf: 'center' }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mybutton, { height: 150, }]} onPress={() => {
              settitle('Rejected Contracts')
              setind(2)
              setsignedData(true)
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../assets/images/documentIcon.png')} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ marginLeft: 10 ,color:'#000'}}>Rejected Contracts</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../../../assets/images/usd-coin-(usdc).png')} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ color: Colors.THEME_BLUE }}>Total Points - {profileData?.rejected_contract_points}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../../../assets/images/small-logo.png')} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ color: Colors.THEME_BLUE }}>Total Contracts - {profileData?.reject_points_count}</Text>
              </View>
              <View style={{ width: '110%', height: 40, backgroundColor: Colors.BRIGHT_GRAY, position: 'absolute', bottom: 0, alignSelf: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                  <Text style={{ marginLeft: 10,color:'#000' }}>View Your Contracts</Text>
                  <View style={{ width: 25, height: 25, borderRadius: 15, backgroundColor: Colors.THEME_BLUE, justifyContent: 'center', marginTop: 3, marginLeft: 10 }}>
                    <Image
                      source={require('../../../assets/images/blue-right-icon.png')}
                      resizeMode="contain"
                      tintColor={Colors.WHITE}
                      style={{ width: 15, height: 12, alignSelf: 'center' }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <Image
              source={require('assets/images/splash-logo.png')}
              style={styles.logo}
            />
          </View>

    
          <View style={{ width: 100, height: 100 }} />



        </ScrollView>

      </LinearGradient>
    


      {!userInfo.contact ?
        <UpdatePhone />
        : null}
      {signedData ?
        <View style={{ position: 'absolute', width: '100%', height: H, alignSelf: 'center', backgroundColor: '#fff',zIndex:888 }}>
          <View
            style={{ width: '100%', height: 55, backgroundColor: Colors.THEME_BLUE, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 10 }}>
            {/* <MyHeader Title={title} /> */}
            <TouchableOpacity onPress={() => {
              setOpenDeveloperDropdown(false)
               setDeveloperValue(null)
               setStartDate2('')
              getProfileData('','')
              setsignedData(false)
            }}  >
              <Image source={require('../../../assets/images/arrow-left.png')} resizeMode='contain' />
            </TouchableOpacity>
            <View style={[{ flex: 2.6, alignItems: 'center' },]}>
              <MyText text={title} textColor='white' fontSize={16} fontFamily='medium' />
            </View>
            <Text></Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingHorizontal: 15 }}>

            <TouchableOpacity style={{ width: '45%', borderColor: Colors.THEME_BLUE, borderWidth: 0.4, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between' }}
              onPress={() => { setOpenStartDate(true) }}>
              <Text style={{ color: '#000', alignSelf: 'center', fontSize: 13 }}>{moment(startDate).format('MM/DD/YYYY')}</Text>
              <Image source={require('../../../assets/images/calendarIcon.png')} resizeMode='contain' />
            </TouchableOpacity>

            <View style={{ width: '45%' }}>
              <DropDownPicker
                open={openDeveloperDropdown}
                value={developerValue}
                items={developerData1}
                setOpen={setOpenDeveloperDropdown}
                setValue={(v) => { setDeveloperValue(v) }}
                // setItems={(i) => { setData(i) }}
                zIndex={'999'}
                placeholder={'Select Developer'}
                onChangeValue={(value) => {
               
                }}
                onSelectItem={(item) => {
                  var dds=  moment(startDate).format('MM/DD/YY')
                  getProfileData(startDate2!=''? dds : '',item.value)
                  setdevdata(item)
                }}
                listItemLabelStyle={{ color: Colors.THEME_GRAY }}
                labelStyle={{ color: Colors.THEME_GRAY }}
                dropDownDirection="BOTTOM"
                // listMode="MODAL"
                placeholderStyle={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '400'
                }}
                textStyle={{
                  fontSize: 14,
                  color: '#455A64',
                  fontWeight: '400'
                }}
                style={{
                  backgroundColor: 'white',
                  height: 40,
                  marginBottom: 10,
                  borderRadius: 10,
                  borderWidth: 0,
                  zIndex: 4000,
                  zIndexInverse: 1000, borderColor: Colors.THEME_BLUE, borderWidth: 0.4,
                  width: '100%'
                }}
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
                  zIndex: 999,
                }}
              />
            </View>
          </View>


          <View style={{
            width: '98%', borderRadius: 7, alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.2,
            elevation: 3,
            marginTop: 20, zIndex: -999
          }}>

            <View style={{}}>
              <View style={styles.container}>
                <ScrollView>
                  <ScrollView horizontal={true}>
                    <View>
                      <Table >
                        {/* <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: '600', color: '#fff' }} /> */}
                        <TableWrapper  style={{ flexDirection: 'row', }}>
                        {
                              tableHead.map((cellData, cellIndex) => (
                                <View style={{ height: 40, width: 100, borderWidth: 0.5, borderColor: '#000', justifyContent: 'center' }}>
                                  
                                    <Text style={{ flexDirection: 'row', width: 100, textAlign: 'center',fontWeight:'bold' }}>{cellData}</Text>
                                
                                </View>
                              ))
                         
                         
                        }
                     </TableWrapper>
                      </Table>
                      {/* <ScrollView style={styles.dataWrapper}> borderWidth: 1, borderColor: '#C1C0B9'*/}
                      <Table >
                        {
                          tabledataarray[ind]?.tablesData?.map((rowData, index) => (

                            <TableWrapper key={index} style={{ flexDirection: 'row', }}>
                              {rowData.map((cellData, cellIndex) => (
                                <View style={{ height: 40, width: 100, borderWidth: 0.5, borderColor: '#000', justifyContent: 'center' }}>
                                  {cellIndex == 5 ?
                                    <Image style={{ width: 50, height: 30, resizeMode: 'stretch',alignSelf:'center' }} source={{ uri: cellData }}></Image>
                                    :
                                    <Text style={{ flexDirection: 'row', width: 100, textAlign: 'center' }}>{cellData}</Text>
                                  }
                                </View>
                              ))}
                            </TableWrapper>
                          ))
                        }
                      </Table>
                      {/* </ScrollView> */}
                    </View>
                  </ScrollView>
                  <View style={{ width: 100, height: 250 }} />
                </ScrollView>
              </View>


            </View>

          </View>
          {tabledataarray[ind]?.tablesData?.length > 0 ?
            null
            :
            <View style={{ top: -100 }}>
              <Image style={{ width: 150, height: 130, resizeMode: 'stretch', alignSelf: 'center' }} source={require('../../../assets/images/no-data.png')}></Image>
              <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '600', marginTop: 20 }}>No Record Found</Text>
            </View>
          }

          <DatePicker
            modal
            mode="date"
            open={openStartDate}
            date={startDate}
            maximumDate={new Date()}
            onConfirm={date => {
              setOpenStartDate(false);
              setStartDate(date);
              setStartDate2(date)
              var datas=moment(date).format('MM/DD/YY')
              getProfileData(datas,developerValue==null ? '':developerValue)
            }}
            onCancel={() => {
              setOpenStartDate(false);
            }}
          />
        </View>
        : null
      }
  <CustomLoader showLoader={showLoader} />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(Profile);

const Contact = ({ icon, text, colo }) => {
  return (
    <View style={styles.contactRow}>
      <Image source={icon} />
      <MyText
        text={text}
        textColor={colo}
        fontSize={14}
        style={{ marginLeft: 10 }}
      />
    </View>
  );
};
const Point = ({ text }) => {
  return (
    <View style={styles.pointRow}>
      <View style={styles.tickView}>
        <Image source={require('assets/images/blue-tick.png')} />
      </View>
      <MyText
        text={text}
        textColor={Colors.THEME_GRAY}
        fontSize={14}
        fontFamily="bold"
        style={{ marginLeft: 10 }}
      />
    </View>
  );
};
const getNoDataheight = imgWidth => {
  return (200 / 306) * imgWidth;
};