



//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import {Colors, Images, MyIcon, ScreenNames} from 'global/Index';
import LinearGradient from 'react-native-linear-gradient';
//import : styles
import {styles} from './Signup2Style';
import MyText from 'components/MyText/MyText';
import MyButton from 'components/MyButton/MyButton';
import WelcomeHeader from '../../../components/WelcomeHeader/WelcomeHeader';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import DropdownPicker from '../../../components/DropdownPicker/DropdownPicker';
import DatePicker from 'react-native-date-picker';
import DateSelector from '../../../components/DateSelector/DateSelector';
import moment from 'moment';
import {CommonActions} from '@react-navigation/native';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import {Service} from '../../../global/Index';
import Toast from 'react-native-simple-toast';
import Dropdown from 'components/Dropdown/Dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser, setUserToken} from '../../../reduxToolkit/reducer/user';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

function getYears(startYear) {
  var currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
}

const Signup2 = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [developerValue, setDeveloperValue] = useState([]);
  const [openDeveloperDropdown, setOpenDeveloperDropdown] = useState(false);
  const [pointsEnrollmentValue, setPointsEnrollmentValue] = useState([]);
  const [openPointsEnrollmentDropdown, setOpenPointsEnrollmentDropdown] =
    useState(false);
  const [pointsTypeValue, setPointsTypeValue] = useState([]);
  const [openPointsTypeDropdown, setOpenPointsTypeDropdown] = useState(false);
  const [ownershipLevelValue, setOwnershipLevelValue] = useState([]);
  const [openOwnershipLevelDropdown, setOpenOwnershipLevelDropdown] =
    useState(false);
  const [developerData, setDeveloperData] = useState([]);
  const [developerDropdownData, setDeveloperDropdownData] = useState([]);
  const [pointsEnrollmentData, setPointsEnrollmentData] = useState([]);
  const [pointsTypeData, setPointsTypeData] = useState([]);
  const [newpointsEnrollmentData, setNewPointsEnrollmentData] = useState([]);
  const [newpointsTypeData, setNewPointsTypeData] = useState([]);
  const [ownershipLevelData, setOwnershipLevelData] = useState([]);
  const [numPoints, setNumPoints] = useState([]);
  const [startDates, setStartDates] = useState([['']]);
  const [endDates, setEndDates] = useState([['']]);
  const [openStartDate, setOpenStartDate] = useState([[false]]);
  const [openEndDate, setOpenEndDate] = useState([[false]]);
  const [ownershipdataforMxMin, setownershipdataforMxMin] = useState([]);
  const [items, setItems] = useState(['x']);
  const [allDevelopersLength, setAllDevelopersLength] = useState(1);
  const [alldevList, setAllDevList] = useState([0]);
  const [enrollpointVisiable, setEnrollpointVisiable] = useState([true]);
  const [pointTypeVisiable, setPointTypeVisiable] = useState([true]);
  const [ownershiVisiable, setOwnershiVisiable] = useState([true, true]);
  const [selectedDevId, setselectedDevId] = useState(null);
  const [enrolmentPointId, setEnrolmentPointId] = useState(null);
  const [PointTypeId, setPointTypeId] = useState(null);
  const [developer_Id, setDeveloper_Id] = useState(null);
  const [selectedOwnerShip, setSelectedOwnerShip] = useState(null);
  const [lod,setlod]=useState(false)
  const [fcmToken, setFcmToken] = useState('');
  const userToken = useSelector(state => state.user.userToken);

  //ashish *******
  // const [devloper,setdevloper]=useState([])
  // const [pointEnroll,setpointEnroll]=useState([])
  // const [pointType,setpointType]=useState([])
  // const [pointOwned,setpointOwned]=useState([])
  // const [sdate,setsdate]=useState([])
  // const [edate,setedate]=useState([])
  // const [ownershipLevel,setownershipLevel]=useState([])



  useEffect(() => {
    getDeveloperData();
  }, []);


  // Saurabh Saneja August 21, 2023 get all developers data
  const getDeveloperData = async () => {
    setShowLoader(true);
    try {
      const resp = await Service.getApi(Service.ALL_DEVELOPERS);
      if (resp?.status) {
        const data = resp?.data?.data;
        setDeveloperDropdownData([...data]);
        setDeveloperData(data?.map(el => ({label: el.name, value: el.name,developer_id:el.developer_id})));
      } else {
        Toast.show(resp.data.message, Toast.SHORT);
      }
    } catch (error) {
      console.log('error in getDeveloperData', error);
    }
    setShowLoader(false);
  };
  const addItemValidation = () => {
    const checkForIndex = allDevelopersLength - 1;
    if (!developerValue[checkForIndex]) {
      Toast.show('Please Select Developer', Toast.SHORT);
      return false;
    } else if (
      enrollpointVisiable[checkForIndex] &&
      !pointsEnrollmentValue[checkForIndex]
    ) {
      Toast.show('Please Select Points Enrollment', Toast.SHORT);
      return false;
    } else if (
      pointTypeVisiable[checkForIndex] &&
      !pointsTypeValue[checkForIndex]
    ) {
      Toast.show('Please Select Points Type', Toast.SHORT);
      return true;
    } else if (
      startDates[checkForIndex][0] == '' &&
      endDates[checkForIndex][0] == ''
    ) {
      Toast.show(
        'Please Select at least one Start Date and one End Date',
        Toast.SHORT,
      );
      return false;
    }
    let dateExists = true;
    for (let i = 0; i < startDates[checkForIndex]?.length; i++) {
      if (
        startDates[checkForIndex][i] !== '' &&
        endDates[checkForIndex][i] == ''
      ) {
        Toast.show(
          `Please Select End Date for ${checkForIndex + 1} developer's ${
            i + 1
          } date`,
          Toast.SHORT,
        );
        dateExists = false;
        break;
      }
      if (
        startDates[checkForIndex][i] == '' &&
        endDates[checkForIndex][i] !== ''
      ) {
        Toast.show(
          `Please Select Start Date for ${checkForIndex + 1} developer's ${
            i + 1
          } date`,
          Toast.SHORT,
        );
        dateExists = false;
        break;
      }
    }
    if (!dateExists) {
      return false;
    }
    if (!ownershipLevelData[checkForIndex]) {
      Toast.show(
        'Please verify the details of previous developer to add more developer',
        Toast.SHORT,
      );
      return false;
    }
    return true;
  };
  const addItem = () => {
    console.log(developerValue);
   if(allDevelopersLength==2){
    Toast.show(`You can't add more than two developers`, Toast.SHORT);
   }else{
     if (!addItemValidation()) {
      return;
    }
    if (developerData?.length === allDevelopersLength) {
      Toast.show(`You have added all available developers`, Toast.SHORT);
      return;
    }
    const startDatesCopy = [...startDates];
    startDatesCopy.push(['']);
    setStartDates([...startDatesCopy]);

    const openStartDateCopy = [...openStartDate];
    openStartDateCopy.push([false]);
    setOpenStartDate([...openStartDateCopy]);
    const endDatesCopy = [...endDates];
    endDatesCopy.push(['']);
    setEndDates([...endDatesCopy]);
    const openEndDateCopy = [...openEndDate];
    openEndDateCopy.push([false]);
    setOpenEndDate([...openEndDateCopy]);

    setAllDevelopersLength(allDevelopersLength + 1);
    const newarr = [...alldevList];
    newarr.push(newarr.length);
    setAllDevList(newarr);
   } 
   
  };
  useEffect(() => {
    const enrollmentVisiableCopy = [...enrollpointVisiable];
    const pointTypeVisiableCopy = [...pointTypeVisiable];
    const ownershiVisiableCopy = [...ownershiVisiable];
    enrollmentVisiableCopy[allDevelopersLength] = true;
    pointTypeVisiableCopy[allDevelopersLength] = true;
    ownershiVisiableCopy[allDevelopersLength] = true;

    setEnrollpointVisiable([...enrollmentVisiableCopy]);
    setPointTypeVisiable([...pointTypeVisiableCopy]);
    setOwnershiVisiable([...ownershiVisiableCopy]);
  }, [allDevelopersLength]);

  const onAddDate = index => {
    if (startDates[index]?.length === 3) {
      Toast.show('Maximum 3 Start Dates and 3 End Dates can be selected');
      return;
    }
    const startDatesCopy = [...startDates];
    startDatesCopy[index].push('');
    setStartDates([...startDatesCopy]);

    const openStartDateCopy = [...openStartDate];
    openStartDateCopy[index].push(false);
    setOpenStartDate([...openStartDateCopy]);

    const endDatesCopy = [...endDates];
    endDatesCopy[index].push('');
    setEndDates([...endDatesCopy]);

    const openEndDateCopy = [...openEndDate];
    openEndDateCopy[index].push(false);
    setOpenEndDate([...openEndDateCopy]);
  };

  const onRemoveDate = (index, dateIndex) => {
    const startDatesCopy = [...startDates];
    startDatesCopy[index].splice(dateIndex, 1);
    setStartDates([...startDatesCopy]);

    const openStartDateCopy = [...openStartDate];
    openStartDateCopy[index].splice(dateIndex, 1);
    setOpenStartDate([...openStartDateCopy]);

    const endDatesCopy = [...endDates];
    endDatesCopy[index].splice(dateIndex, 1);
    setEndDates([...endDatesCopy]);

    const openEndDateCopy = [...openEndDate];
    openEndDateCopy[index].splice(dateIndex, 1);
    setOpenEndDate([...openEndDateCopy]);
  };

  const removeItem = index => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const gotoLogin = () => navigation.navigate(resetIndexGoToLogin);
  const gotoSignUP1 = () => navigation.navigate(ScreenNames.SIGN_UP_1);
  const goBack = () => {
    navigation.goBack();
  };
  const resetIndexGoToLogin = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.SIGN_IN}],
  });
  const resetIndexGoToBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  const gotoBottomTab = () => {
    navigation.dispatch(resetIndexGoToBottomTab);
  };
  const onIconClick = index => {
    if (items?.length !== 1 && index === items?.length - 1) {
      removeItem(index);
    } else {
      addItem();
    }
  };
  const isLastItem = index => {
    if (items?.length !== 1 && index === items?.length - 1) {
      return true;
    } else {
      return false;
    }
  };
  const Validation = () => {
    console.log('====================================1');
    
    const checkForIndex = allDevelopersLength - 1;
    if (!developerValue[0]) {
      Toast.show(`Please select at least one developer`);
      console.log('====================================2');
      return false;
    } else if (
      enrollpointVisiable[checkForIndex] &&
      pointsEnrollmentData[0].length > 0 &&
      !pointsEnrollmentValue[0]
    ) {
      console.log('====================================3');
      Toast.show(`Please Select Points Enrollment`);
      return false;
    } else if (pointsTypeValue.length > 0 && !pointsTypeValue[0]) {
      console.log('====================================4');
      Toast.show(`Please Select Points Type`);
      return false;
    } else if (!numPoints[0]) {
      console.log('====================================5');
      Toast.show(`Please Number of Points Owned`);
      return false;
    }
    let dateExists = true;
    for (let i = 0; i < startDates[0]?.length; i++) {
      if (startDates[0][i] == '' && endDates[0][i] == '') {
        console.log('====================================6');
        Toast.show(
          `Please Select End Date for ${1} developer's ${i + 1} date`,
          Toast.SHORT,
        );
        dateExists = false;
        break;
      }
      if (startDates[0][i] == '' && endDates[0][i] !== '') {
        console.log('====================================7');
        Toast.show(
          `Please Select Start Date for ${1} developer's ${i + 1} date`,
          Toast.SHORT,
        );
        dateExists = false;
        break;
      }
    }
    console.log('====================================8');
    if (!dateExists) {
      return false;
    }
    if (!ownershipLevelData[checkForIndex]) {
      Toast.show(`No Ownership Level available`);
      return false;
    }
    return true;
  };
  const signUpUser = async () => {
    if (!Validation()) {
      return;
    }
    const {filePath, name, email, phone, password, address} = route.params;

    // return
    setShowLoader(false);
    try {
      const postData = new FormData();
      postData.append('name', name);
      postData.append('email', email);
      postData.append('password', password);
      postData.append('fcm_token', fcmToken);

      postData.append('contact', phone);
      if (filePath != '') {
        const imageName = filePath.uri.slice(
          filePath.uri.lastIndexOf('/'),
          filePath.uri.length,
        );
        postData.append('profile_img', {
          name: imageName,
          type: filePath.type,
          uri: filePath.uri,
        });
      }

      // postData.append('profile_img', filePath);
      postData.append('address', address);
      for (let i = 0; i < allDevelopersLength; i++) {
        // if data enpty of last developer, dont add it
        if (!developerValue[i]) {
          break;
        }
        const devData = developerDropdownData?.find(
          el => el.name === developerValue[i],
        );
        console.log('devData', devData);
        const ptenroll = devData?.enrolled_points_type.find(
          el => el.point_type_title === pointsEnrollmentValue[i],
        );
        const pttype = devData?.weekly_pointsType.find(
          el => el.point_type_title === pointsTypeValue[i],
        );
        const ownlvl = devData?.owenership_level.find(
          el => el.ownership_type === ownershipLevelValue[i],
        );
        console.log('ptenroll', ptenroll);
        postData?.append(
          `userdetails[${i}][developer_id]`,
          ptenroll?.developer_id ? ptenroll?.developer_id : '',
        );
        postData?.append(
          `userdetails[${i}][points_enroll]`,
          ptenroll?.id ? ptenroll?.id : '',
        );
        postData?.append(
          `userdetails[${i}][points_type]`,
          pttype?.id ? pttype?.id : '',
        );
        postData?.append(
          `userdetails[${i}][ownership_level]`,
          ownlvl?.ownership_type,
        );
        postData?.append(`userdetails[${i}][no_of_points_owned]`, numPoints[i]);
        for (let j = 0; j < startDates[i]?.length; j++) {
          if (startDates[i][j] == '') {
            continue;
          }
          postData?.append(
            `userdetails[${i}][anniversy][anniversary_start_date][${j}]`,
            moment(startDates[i][j]).format('YYYY-MM-DD'),
          );
          postData?.append(
            `userdetails[${i}][anniversy][anniversary_end_date][${j}]`,
            moment(endDates[i][j]).format('YYYY-MM-DD'),
          );
        }
      }

      // postData.append('developerData', [{developerValue, pointsEnrollmentValue, pointsTypeValue, startDate, ownershipLevelValue}]);
      console.log('signUpUser postData', postData);
      // signUpData.append('fcmtoken', fcmToken);
      
      const resp = await Service.postApiWithToken(userToken,Service.Add_user_devlopers, postData);
      console.log(resp);
      console.log('signUpUser resp', resp?.data);
      if (resp?.data?.status) {
        Toast.show(resp?.data?.message, Toast.SHORT);
       // await AsyncStorage.setItem('userToken', resp?.data?.access_token);
        const jsonValue = JSON.stringify(resp?.data?.data);
        console.log('sign in jsonValue', jsonValue);
       // await AsyncStorage.setItem('userInfo', jsonValue);
       // dispatch(setUserToken(resp?.data?.access_token));
       // dispatch(setUser(resp?.data?.data));
        navigation.dispatch(resetIndexGoToBottomTab);
      } else {
        const data = resp?.data?.data;
        const key = Object.keys(data)[0];
        // Alert.alert('', `${resp.data.message}`);
        Toast.show(data[key][0], Toast.SHORT);
      }
    } catch (error) {
      console.log('error in signInUser', error);
    }
    setShowLoader(false);
  };

  //check N/A
  const isNotAvailable = item => {
    // console.log("isNotAvailable====",item[0].label!='N/A')
    return item[0]?.label != 'N/A';
  };
  // after developer chosen for select developer dropdown, set data for other dropdowns
  const handleDeveloperSelected = (value, index) => {

    

 //api/developers/developer-enroll-data/2/


    const filterData = developerDropdownData?.find(el => el.name === value);
    console.log('filterData', filterData);
    setDeveloper_Id(filterData.developer_id);
    const newNumPoints = [...numPoints];
    newNumPoints.splice(index, 1);
    setNumPoints(newNumPoints);
    const newowernshipForMaxMin = [...ownershipdataforMxMin];
    newowernshipForMaxMin[index] = filterData?.owenership_level;
    setownershipdataforMxMin(newowernshipForMaxMin);
    const pointsEnrollmentDataCopy = [...pointsEnrollmentData];
    const newpointsEnrollmentDataCopy = [...newpointsEnrollmentData];
    newpointsEnrollmentDataCopy[index] = filterData?.enrolled_points_type;
    setNewPointsEnrollmentData(newpointsEnrollmentDataCopy);
    pointsEnrollmentDataCopy[index] = filterData?.enrolled_points_type?.map(
      el => ({
        label: el.point_type_title,
        value: el.point_type_title,
      }),
    );
    console.log(
      'pointsEnrollmentDataCopy after changing',
      pointsEnrollmentDataCopy,
    );
    const enrollpointVisiableCopy = [...enrollpointVisiable];
    if (
      pointsEnrollmentDataCopy[index].length > 0 &&
      isNotAvailable(pointsEnrollmentDataCopy[index])
    ) {
      enrollpointVisiableCopy[index] = true;
    } else {
      enrollpointVisiableCopy[index] = false;
    }
    setEnrollpointVisiable([...enrollpointVisiableCopy]);
    setPointsEnrollmentData([...pointsEnrollmentDataCopy]);

    const pointsTypeDataCopy = [...pointsTypeData];
    const newpointsTypeDataCopy = [...newpointsTypeData];
    newpointsTypeDataCopy[index] = filterData?.weekly_pointsType;
    setNewPointsTypeData(newpointsTypeDataCopy);
    pointsTypeDataCopy[index] = filterData?.weekly_pointsType?.map(el => ({
      label: el.point_type_title,
      value: el.point_type_title,
    }));
    const pointTypeVisiableCopy = [...pointTypeVisiable];
    if (
      pointsTypeDataCopy[index].length > 0 &&
      isNotAvailable(pointsTypeDataCopy[index])
    ) {
      pointTypeVisiableCopy[index] = true;
    } else {
      pointTypeVisiableCopy[index] = false;
    }
    setPointTypeVisiable([...pointTypeVisiableCopy]);

    console.log('pointsTypeDataCopy===', pointsTypeDataCopy);
    setPointsTypeData([...pointsTypeDataCopy]);

    const ownershipLevelDataCopy = [...ownershipLevelData];
    ownershipLevelDataCopy[index] = filterData?.owenership_level?.map(el => ({
      label: el.ownership_type,
      value: el.ownership_type,
    }));
    const ownershiVisiableCopy = [...ownershiVisiable];
    if (
      ownershipLevelDataCopy[index].length > 0 &&
      isNotAvailable(ownershipLevelDataCopy[index])
    ) {
      ownershiVisiableCopy[index] = true;
    } else {
      ownershiVisiableCopy[index] = false;
    }
    setOwnershiVisiable([...ownershiVisiableCopy]);

    console.log('===setOwnershipLevelData==', ownershipLevelDataCopy);
    setOwnershipLevelData([...ownershipLevelDataCopy]);
  };

  const changeOpenStartDate = (value, index, dateIndex) => {
    const openStartDateCopy = [...openStartDate];
    openStartDateCopy[index][dateIndex] = value;
    setOpenStartDate([...openStartDateCopy]);
  };
  const changeOpenEndDate = (value, index, dateIndex) => {
    const openEndDateCopy = [...openEndDate];
    openEndDateCopy[index][dateIndex] = value;
    setOpenEndDate([...openEndDateCopy]);
  };
  const changeEndDates = (value, index, dateIndex) => {
    const endDateCopy = [...endDates];
    endDateCopy[index][dateIndex] = value;
    setEndDates([...endDateCopy]);
  };
  const changeStartDates = (value, index, dateIndex) => {
    const startDateCopy = [...startDates];
    startDateCopy[index][dateIndex] = value;
    setStartDates([...startDateCopy]);
  };
  // saurabh saneja, 12 sept 2023, show only unselected developer in dropdown
  const getFilteredDeveloperData = index => {
    if (index === 0) {
      return developerData;
    } else if (index > 0) {
      let data = [...developerData];
      for (let i = 0; i < index; i++) {
        data = developerData?.filter(el => el?.label != developerValue[i]);
      }
      return data;
    }
  };
  const validateStartDates = (start, end, index, dateIndex) => {
    console.log('start', start);
    console.log('end', end);
    // if end date is not selected yet, we cannot compare them, hence we return true
    if (end === '') {
      return true;
    }
    start = moment(start).format('YYYY-MM-DD');
    end = moment(end).format('YYYY-MM-DD');
    const areDatesSame = moment(start).isSame(end, 'day');
    const isEndDateBeforeStartDate = moment(end).isBefore(start, 'day');
    console.log('areDatesSame', areDatesSame);
    if (areDatesSame) {
      // Toast.show(`Anniversary Dates ${index + 1} Start Date ${dateIndex + 1} and End Date ${dateIndex + 1} cannot be same`, Toast.LONG)
      Toast.show(`Start Date and End Date cannot be same`, Toast.LONG);
      return false;
    } else if (isEndDateBeforeStartDate) {
      // Toast.show(`Anniversary Dates ${index + 1} End Date ${dateIndex + 1} cannot be before Start Date ${dateIndex + 1}`, Toast.LONG)
      Toast.show(`End Date cannot be before Start Date`, Toast.LONG);
      return false;
    }
    return true;
  };
  const validateEndDates = (start, end, index, dateIndex) => {
    console.log('start', start);
    console.log('end', end);
    // if start date is not selected yet, we cannot compare them, hence we return true
    if (start === '') {
      return true;
    }
    start = moment(start).format('YYYY-MM-DD');
    end = moment(end).format('YYYY-MM-DD');
    const areDatesSame = moment(start).isSame(end, 'day');
    const isEndDateBeforeStartDate = moment(end).isBefore(start, 'day');
    console.log('areDatesSame', areDatesSame);
    if (areDatesSame) {
      // Toast.show(`Anniversary Dates ${index + 1} Start Date ${dateIndex + 1} and End Date ${dateIndex + 1} cannot be same`, Toast.LONG)
      Toast.show(`Start Date and End Date cannot be same`, Toast.LONG);
      return false;
    } else if (isEndDateBeforeStartDate) {
      // Toast.show(`Anniversary Dates ${index + 1} End Date ${dateIndex + 1} cannot be before Start Date ${dateIndex + 1}`, Toast.LONG)
      Toast.show(`End Date cannot be before Start Date`, Toast.LONG);
      return false;
    }
    return true;
  };
  const getOwnerShipLevel = async (index,val) => {
    
    setShowLoader(true);
    console.log(developer_Id, selectedDevId, enrolmentPointId);
    //const url = `${Service.GET_OWNERSHIP_LEVEL}/${selectedDevId}/${enrolmentPointId}/${PointTypeId}/${numPoints[index]}`;
     const url = `${Service.GET_OWNERSHIP_LEVEL}/${selectedDevId}/${enrolmentPointId}/${PointTypeId}/${val}`;
    console.log('myUrl==>>Ahsihs',url);
    try {
      const resp = await Service.getApiWithToken(userToken, url);
      console.log('Ahsishshss===>>>>>',resp?.data?.data?.ownership_type);
      if (resp?.data?.status) {
        const newownershipLevelData = [...ownershipLevelData];
        newownershipLevelData[index] = resp?.data?.data?.ownership_type;
        setOwnershipLevelData(newownershipLevelData);
        setlod(!lod)
      }else{
        setOwnershipLevelData([]);
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };
  const selectEnrollId = (value, index) => {
    const newdata = [...newpointsEnrollmentData[index]];
    console.log(newdata, value);
    const filerEnrollMentPoint = newdata.filter(
      item => item?.point_type_title == value,
    );
    if (filerEnrollMentPoint.length > 0) {
      setselectedDevId(filerEnrollMentPoint[0].developer_id);
      setEnrolmentPointId(filerEnrollMentPoint[0].id);
    }
  };
  const selectWeeklyPointId = (value, index) => {
    const newdata = [...newpointsTypeData[index]];
    const newowernshipForMaxMinCopy = [...ownershipdataforMxMin[index]];

    const filerEnrollMentPoint = newdata.filter(
      item => item?.point_type_title == value,
    );
    if (filerEnrollMentPoint.length > 0) {
      setPointTypeId(filerEnrollMentPoint[0].id);
      const filterOwnership = newowernshipForMaxMinCopy.filter(
        item =>
          item.developer_id == selectedDevId &&
          item.enroll_type_id == enrolmentPointId &&
          item.weekly_type_id == filerEnrollMentPoint[0].id,
      );
      console.log('filterOwnership====', filterOwnership);
      if (filterOwnership && filterOwnership.length > 0) {
        console.log('ownershipdata====', filterOwnership);
        newowernshipForMaxMinCopy[index] = filterOwnership;
        setownershipdataforMxMin(newowernshipForMaxMinCopy);
      }
    }
  };
  const onPressDeleteDeveloper = index => {
    console.log(ownershipdataforMxMin);
    const newstartDates = [...startDates];
    const newEndDates = [...endDates];
    const newpointsEnrollmentValue = [...pointsEnrollmentValue];
    const newpointsTypeValue = [...pointsTypeValue];
    const newownershipLevelData = [...ownershipLevelData];
    const newnumberOfPoint = [...numPoints];
    newpointsEnrollmentValue.splice(index, 1);
    newpointsTypeValue.splice(index, 1);
    newnumberOfPoint.splice(index, 1);
    newstartDates.splice(index, 1);
    newEndDates.splice(index, 1);
    newownershipLevelData.slice(index, 1);
    setOwnershipLevelData(newownershipLevelData);
    setStartDates(newstartDates);
    setPointsEnrollmentValue(newpointsEnrollmentValue);
    setPointsTypeValue(newpointsTypeValue);
    setEndDates(newEndDates);
    setNumPoints(newnumberOfPoint);

    const new_dev_list = [...alldevList];
    console.log(ownershipLevelData);
    new_dev_list.splice(index, 1);
    setAllDevelopersLength(allDevelopersLength - 1);
    setAllDevList(new_dev_list);
    if (developerValue[index]) {
      const new_arr = [...developerValue];
      new_arr.splice(index, 1);
      setDeveloperValue(new_arr);
    }
  };
  const validateForNumberOfPointOwned = () => {
    const checkForIndex = allDevelopersLength - 1;
    if (!developerValue[checkForIndex]) {
      Toast.show('Please Select Developer', Toast.SHORT);
      return false;
    } else if (
      enrollpointVisiable[checkForIndex] &&
      !pointsEnrollmentValue[checkForIndex]
    ) {
      Toast.show('Please Select Points Enrollment', Toast.SHORT);
      return false;
    } else if (
      pointTypeVisiable[checkForIndex] &&
      !pointsTypeValue[checkForIndex]
    ) {
      Toast.show('Please Select Points Type', Toast.SHORT);
      return false;
    }
    return true;
  };
  //UI
  return (
    <ImageBackground
      source={require('assets/images/welcome-bg-1.jpg')}
      style={styles.container}>
      <KeyboardAvoidingView
        style={[styles.container, {}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{}}
          contentContainerStyle={{paddingBottom: '30%'}}>
          <WelcomeHeader backAction={goBack} style={{marginHorizontal: 20}} />
          {alldevList.map((item, index) => (
            <View key={index?.toString()}>
              <View style={styles.whiteBackground}>
                {index >= 1 && (
                  <View style={styles.deleteContainer}>
                    <MyText
                      text="Select Developer"
                      textColor={Colors.THEME_GRAY}
                      fonstSize={14}
                      fontFamily="medium"
                      style={{marginBottom: 5}}
                    />
                    <TouchableOpacity
                      onPress={() => onPressDeleteDeveloper(index)}
                      style={[styles.deleteButtonStyle,{top:-5}]}>
                      <MyIcon.MaterialIcons
                        name="delete"
                        color={Colors.THEME_BLUE}
                        size={23}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                <Dropdown
                  // data={developerData}
                  data={getFilteredDeveloperData(index) || []}
                  value={developerValue[index] || ''}
                  setValue={setDeveloperValue}
                  isCallFunc
                  callFunc={value => {
                    handleDeveloperSelected(value, index);
                    const developerValueCopy = [...developerValue];
                    developerValueCopy[index] = value;
                    setDeveloperValue([...developerValueCopy]);
                    const pointsEnrollmentValueCopy = [
                      ...pointsEnrollmentValue,
                    ];
                    pointsEnrollmentValueCopy[index] = null;
                    setPointsEnrollmentValue([...pointsEnrollmentValueCopy]);
                    const pointsTypeValueCopy = [...pointsTypeValue];

                    pointsTypeValueCopy[index] = null;
                    setPointsTypeValue([...pointsTypeValueCopy]);
                  }}
                  placeholder={`Select Developer`}
                  style={{marginBottom: 10}}
                />
                {enrollpointVisiable[index] && (
                  <MyText
                    text="Select Points Enrollment"
                    textColor={Colors.THEME_GRAY}
                    fonstSize={14}
                    fontFamily="medium"
                    style={{marginBottom: 5}}
                  />
                )}
                {enrollpointVisiable[index] && (
                  <Dropdown
                    data={pointsEnrollmentData[index] || []}
                    value={pointsEnrollmentValue[index] || ''}
                    isCallFunc
                    callFunc={value => {
                      selectEnrollId(value, index);
                      const pointsEnrollmentValueCopy = [
                        ...pointsEnrollmentValue,
                      ];
                      pointsEnrollmentValueCopy[index] = value;
                      setPointsEnrollmentValue([...pointsEnrollmentValueCopy]);
                    }}
                    isCustomIsFocus
                    customIsFocus={() => {
                      if (!developerValue[index]) {
                        Toast.show('Please select Developer first');
                      }
                    }}
                    placeholder={`Select Points Enrollment`}
                    style={{marginBottom: 10}}
                  />
                )}
                
                {pointTypeVisiable[index] && (
                  <MyText
                    text="Select Points Type"
                    textColor={Colors.THEME_GRAY}
                    fonstSize={14}
                    fontFamily="medium"
                    style={{marginBottom: 5}}
                  />
                )}
                {pointTypeVisiable[index] && (
                  <Dropdown
                    data={pointsTypeData[index] || []}
                    value={pointsTypeValue[index] || ''}
                    isCallFunc
                    callFunc={value => {
                      const pointsTypeValueCopy = [...pointsTypeValue];
                      selectWeeklyPointId(value, index);
                      pointsTypeValueCopy[index] = value;
                      setPointsTypeValue([...pointsTypeValueCopy]);
                    }}
                    isCustomIsFocus
                    customIsFocus={() => {
                      if (!developerValue[index]) {
                        Toast.show('Please select Developer first');
                      }
                    }}
                    placeholder={`Select Points Type`}
                    style={{marginBottom: 10}}
                  />
                )}
                <MyText
                  text="Number of Points Owned"
                  textColor={Colors.THEME_GRAY}
                  fonstSize={14}
                  fontFamily="medium"
                  style={{marginBottom: 5}}
                />
                <MyTextInput
                  placeholder={'Number of Points Owned'}
                  value={numPoints[index]}
                  isOnChangeText
                  onChangeText={e => {
                    if (validateForNumberOfPointOwned()) {
                      const numPointsCopy = [...numPoints];
                      numPointsCopy[index] = e;
                      setNumPoints([...numPointsCopy]);
                    }
                    setlod(!lod)
                    getOwnerShipLevel(index,e);
                  }}
                  keyboardType="number-pad"
                  // onEndEditing={() => {
                  //   getOwnerShipLevel(index);
                  // }}
                  //   onChangeText={() => alert(index)}
                  style={{marginTop: 0}}
                />

                {startDates[index]?.map((el, dateIndex) => (
                  <View
                    key={dateIndex?.toString()}
                    style={{marginTop: dateIndex > 0 ? 10 : 0}}>
                    <MyText
                      text={`Anniversary Dates ${dateIndex + 1}`}
                      textColor={Colors.THEME_GRAY}
                      fonstSize={14}
                      fontFamily="medium"
                      style={{marginBottom: 5}}
                    />
                    <View style={styles.dateWithIconRow}>
                      <DateSelector
                        Title={
                          el === ''
                            ? 'Start'
                            : // : moment(startDate).format('MMMM Do YYYY')
                              moment(el).format('MMM DD, YYYY')
                        }
                        showDateIcon
                        placeholder="Start"
                        onPress={() =>
                          changeOpenStartDate(true, index, dateIndex)
                        }
                        dateViewStyle={{borderWidth: 0}}
                        calenderViewStyle={{
                          width: '42%',
                          paddingHorizontal: 10,
                        }}
                      />
                      <DateSelector
                        Title={
                          endDates[index][dateIndex] == ''
                            ? 'End'
                            : // : moment(endDate).format('MMMM Do YYYY')
                              moment(endDates[index][dateIndex]).format(
                                'MMM DD, YYYY',
                              )
                        }
                        showDateIcon
                        placeholder="End"
                        onPress={() =>
                          changeOpenEndDate(true, index, dateIndex)
                        }
                        dateViewStyle={{borderWidth: 0}}
                        calenderViewStyle={{
                          width: '42%',
                          paddingHorizontal: 10,
                        }}
                      />
                      {dateIndex === 0 ? (
                        <TouchableOpacity onPress={() => onAddDate(index)}>
                          <Image source={require('assets/images/add.png')} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => onRemoveDate(index, dateIndex)}>
                          <Image source={require('assets/images/minus.png')} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
                <View>
                  <MyText
                    text="Do you have multiple anniversary date?"
                    textColor={Colors.THEME_GRAY}
                    fonstSize={14}
                    fontFamily="medium"
                    style={{marginBottom: 5, marginTop: 10}}
                  />
                </View>
                {ownershiVisiable[index] && (
                  <MyText
                    text="Ownership Level"
                    textColor={Colors.THEME_GRAY}
                    fonstSize={14}
                    fontFamily="medium"
                    style={{marginBottom: 5, marginTop: 10}}
                  />
                )}
                {ownershiVisiable[index] && (
                 
                  <MyTextInput
                    placeholder={'Ownership level'}
                    value={ownershipLevelData[index]}
                    keyboardType="number-pad"
                    editable={false}
                   
                    style={{marginTop: 0}}
                  />
                )}
              </View>

             
            </View>
          ))}
         
          {allDevelopersLength==2 ? 
          null
          :
          <MyButton
            text={'Add More Developer'}
            isWhite
            onPress={addItem}
            style={[styles.loginStyle, {marginTop: 40}]}
            textStyle={{color: Colors.THEME_BLUE}}
          />
          }
          
          <MyButton
            text={'Sign Up'}
            // onPress={gotoBottomTab}
            onPress={signUpUser}
            style={[styles.loginStyle,{marginTop:10}]}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {startDates?.map((el, index) =>
        el?.map((el2, dateIndex) => (
          <DatePicker
            key={dateIndex?.toString()}
            modal
            mode="date"
            open={openStartDate[index][dateIndex] || false}
            date={el2 || new Date()}
            // maximumDate={new Date()}
            onConfirm={date => {
              if (
                !validateStartDates(
                  date,
                  endDates[index][dateIndex],
                  index,
                  dateIndex,
                )
              ) {
                changeOpenStartDate(false, index, dateIndex);
                return;
              }
              changeStartDates(date, index, dateIndex);
              changeOpenStartDate(false, index, dateIndex);
            }}
            onCancel={() => {
              changeOpenStartDate(false, index, dateIndex);
            }}
          />
        )),
      )}
      {endDates?.map((el, index) =>
        el?.map((el2, dateIndex) => (
          <DatePicker
            key={dateIndex?.toString()}
            modal
            mode="date"
            open={openEndDate[index][dateIndex] || false}
            date={el2 || new Date()}
            // maximumDate={new Date()}
            // minimumDate={startDates[index][dateIndex]}
            onConfirm={date => {
              if (
                !validateEndDates(
                  startDates[index][dateIndex],
                  date,
                  index,
                  dateIndex,
                )
              ) {
                changeOpenEndDate(false, index, dateIndex);
                return;
              }
              changeEndDates(date, index, dateIndex);
              changeOpenEndDate(false, index, dateIndex);
            }}
            onCancel={() => {
              changeOpenEndDate(false, index, dateIndex);
            }}
          />
        )),
      )}
      <CustomLoader showLoader={showLoader} />
    </ImageBackground>
  );
};

export default Signup2;

