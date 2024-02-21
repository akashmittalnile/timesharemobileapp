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
import {styles} from './GetInTouchStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'components/Divider/Divider';
import {WebView} from 'react-native-webview';
import MyButton from '../../../components/MyButton/MyButton';
import MyTextInput from '../../../components/MyTextInput/MyTextInput';
import DropdownPicker from '../../../components/DropdownPicker/DropdownPicker';
import DatePicker from 'react-native-date-picker';
import DateSelector from '../../../components/DateSelector/DateSelector';
import moment from 'moment';
import {
  getFormattedPhoneNumber,
  getNameOfNumber,
} from '../../../global/Constant';

const userImg = `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60`;

const GetInTouch = ({navigation, dispatch, route}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [developerName, setDeveloperName] = useState(
    route?.params?.selectedDeveloper?.name,
  );

  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [phone, setPhone] = useState(userInfo?.contact);
  console.log('phone===', phone);
  const [developerData, setDeveloperData] = useState([
    {label: 'Marriot', value: 'Marriot'},
  ]);
  const [openDeveloperDropdown, setOpenDeveloperDropdown] = useState(false);
  const [developerValue, setDeveloperValue] = useState('');
  const [anniStartDates, setAnniStartDates] = useState(
    getInitialStartDatesState(route?.params?.selectedDeveloper),
  );
  const [pointsPerDate, setPointsPerDate] = useState(
    getInitialPointsPerDateState(route?.params?.selectedDeveloper),
  );
  const [anniEndDates, setAnniEndDates] = useState(
    getInitialEndDatesState(route?.params?.selectedDeveloper),
  );
  const [openAnniStartDates, setOpenAnniStartDates] = useState(
    getInitialOpenDatesState(route?.params?.selectedDeveloper),
  );
  const [openAnniEndDates, setOpenAnniEndDates] = useState(
    getInitialOpenDatesState(route?.params?.selectedDeveloper),
  );

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    console.log('getintouch route?.params', route?.params);
    console.log('userToken', userToken);
    console.log('userInfo?.contact', userInfo?.contact);
  }, []);
  const validation = () => {
    if (name?.trim()?.length === 0) {
      Toast.show('Please enter Full Name', Toast.SHORT);
      return false;
    } else if (email?.trim()?.length === 0) {
      Toast.show('Please enter Email Address', Toast.SHORT);
      return false;
    } else if (phone?.trim()?.length === 0) {
      Toast.show('Please enter Phone', Toast.SHORT);
      return false;
    } else if (anniStartDates[0] === '' && anniEndDates[0] === '') {
      Toast.show(
        'Please select at least one Anniversary Start Date and Anniversary End Date',
        Toast.SHORT,
      );
      return false;
    } else if (anniStartDates[0] === '' && anniEndDates[0] !== '') {
      Toast.show('Please select Anniversary Start Date 1', Toast.SHORT);
      return false;
    } else if (anniStartDates[0] !== '' && anniEndDates[0] === '') {
      Toast.show('Please select Anniversary End Date 1', Toast.SHORT);
      return false;
    } else if (pointsPerDate[0] === '') {
      Toast.show('Please enter First Anniversary Date Points', Toast.SHORT);
      return false;
    } else if (validatePoints()) {
      Toast.show(
        `You can not enter more than ${route?.params?.points} points`,
        Toast.SHORT,
      );
      return false;
    }
    const filledDatesLength = anniStartDates?.filter(el => el !== '')?.length;
    let arePointsFilled = true;
    for (let i = 0; i < filledDatesLength; i++) {
      if (pointsPerDate[i] === '') {
        Toast.show(
          `Please enter ${getNameOfNumber(i + 1)} Anniversary Date Points`,
          Toast.SHORT,
        );
        arePointsFilled = false;
        break;
      }
    }
    if (!arePointsFilled) {
      return false;
    }
    return true;
  };
  const validatePoints = () => {
    const newArr = [...pointsPerDate];

    if (newArr.length == 0) {
      return true;
    } else if (newArr.length == 1) {
      if (parseFloat(route?.params?.points) >= parseFloat(newArr[0])) {
        return false;
      } else {
        return true;
      }
    } else {
      let sum = 0;
      newArr.map(item => {
        if (isNaN(parseFloat(item))) {
        } else {
          sum = sum + parseFloat(item);
        }
      });
      console.log(sum, newArr);
      if (sum <= route?.params?.points) return false;
      return true;
    }
  };
  const gotoReviewPoints = () => {
    if (!validation()) {
      return false;
    }
    const anniStartDatesFiltered = anniStartDates
      ?.filter(el => el !== '')
      ?.map(el => moment(el).format('YYYY-MM-DD'));
    const anniEndDatesFiltered = anniEndDates
      ?.filter(el => el !== '')
      ?.map(el => moment(el).format('YYYY-MM-DD'));
    const pointsPerDateFiltered = pointsPerDate?.filter(el => el !== '');
    console.log('anniStartDates', anniStartDates);
    console.log('anniStartDatesFiltered', anniStartDatesFiltered);
    console.log('anniEndDatesFiltered', anniEndDatesFiltered);
    navigation.navigate(ScreenNames.REVIEW_POINTS, {
      name,
      email,
      phone,
      anniStartDates: anniStartDatesFiltered,
      anniEndDates: anniEndDatesFiltered,
      pointsPerDate: pointsPerDateFiltered,
      ...route.params,
    });
  };
  const addDateValidation = () => {
    let dateExists = true;
    for (let i = 0; i < anniStartDates?.length; i++) {
      if (anniStartDates[i] !== '' && anniEndDates[i] == '') {
        Toast.show(`Please Select Anniversary End Date ${i + 1}`, Toast.SHORT);
        dateExists = false;
        break;
      }
      if (anniStartDates[i] == '' && anniEndDates[i] !== '') {
        Toast.show(
          `Please Select Anniversary Start Date ${i + 1}`,
          Toast.SHORT,
        );
        dateExists = false;
        break;
      }
      if (pointsPerDate[i] === '') {
        Toast.show(
          `Please enter ${getNameOfNumber(i + 1)} Anniversary Date Points`,
          Toast.SHORT,
        );
        dateExists = false;
        break;
      }
    }
    if (!dateExists) {
      return false;
    }
    return true;
  };
  const onAddDate = index => {
    if (anniStartDates?.length === 3) {
      Toast.show('Maximum 3 Start Dates and 3 End Dates can be chosen');
      return;
    }
    if (!addDateValidation()) {
      return;
    }
    const startDatesCopy = [...anniStartDates];
    startDatesCopy.push('');
    setAnniStartDates([...startDatesCopy]);

    const openStartDateCopy = [...openAnniStartDates];
    openStartDateCopy.push(false);
    setOpenAnniStartDates([...openStartDateCopy]);

    const endDatesCopy = [...anniEndDates];
    endDatesCopy.push('');
    setAnniEndDates([...endDatesCopy]);

    const openEndDateCopy = [...openAnniEndDates];
    openEndDateCopy.push(false);
    setOpenAnniEndDates([...openEndDateCopy]);

    const pointsPerDateCopy = [...pointsPerDate];
    pointsPerDateCopy.push('');
    setPointsPerDate(pointsPerDateCopy);
  };

  const onRemoveDate = (index, dateIndex) => {
    const startDatesCopy = [...anniStartDates];
    startDatesCopy.splice(index, 1);
    setAnniStartDates([...startDatesCopy]);

    const openStartDateCopy = [...openAnniStartDates];
    openStartDateCopy.splice(index, 1);
    setOpenAnniStartDates([...openStartDateCopy]);

    const endDatesCopy = [...anniEndDates];
    endDatesCopy.splice(index, 1);
    setAnniEndDates([...endDatesCopy]);

    const openEndDateCopy = [...openAnniEndDates];
    openEndDateCopy.splice(index, 1);
    setOpenAnniEndDates([...openEndDateCopy]);

    const pointsPerDateCopy = [...pointsPerDate];
    pointsPerDateCopy.splice(index, 1);
    setPointsPerDate(pointsPerDateCopy);
  };

  const validateStartDates = (start, end, index) => {
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
      Toast.show(
        `Anniversary Dates ${index + 1} Start Date and End Date cannot be same`,
        Toast.LONG,
      );
      return false;
    } else if (isEndDateBeforeStartDate) {
      Toast.show(
        `Anniversary Dates ${index + 1} End Date cannot be before Start Date`,
        Toast.LONG,
      );
      return false;
    }
    return true;
  };
  const validateEndDates = (start, end, index) => {
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
      Toast.show(
        `Anniversary Dates ${index + 1} Start Date and End Date cannot be same`,
        Toast.LONG,
      );
      return false;
    } else if (isEndDateBeforeStartDate) {
      Toast.show(
        `Anniversary Dates ${index + 1} End Date cannot be before Start Date`,
        Toast.LONG,
      );
      return false;
    }
    return true;
  };
  //UI
  return (
    <LinearGradient
      colors={['#0C8AFF65', '#0C8AFF83', '#0C8AFF65']}
      style={styles.container}>
      <View style={styles.container}>
        <MyHeader Title="Timeshare Point" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}>
          <Image
            source={require('assets/images/get-in-touch-bg.png')}
            style={styles.homebg}
          />

          <View style={styles.mainView}>
            <View style={styles.emptyContainer}>
              <View style={styles.topRow}>
                <Image
                  source={require('assets/images/small-logo.png')}
                  style={styles.logo}
                />
                <MyText
                  text="How Can We Get In Touch ?"
                  textColor={Colors.THEME_BLUE}
                  fontSize={24}
                  fontFamily="medium"
                  style={{width: '60%'}}
                />
              </View>
              <MyText
                text="Our Team Will Be Contacting You By Email Or Text Within 24 Hours About Our Services  Tailored To Your Developer! There Is Absolutely No Cost To You We Pay You Only! We Ad A Small Amount To The Rentals To Cover Our Costs. You Will Receive An Email With Your Instant Offer And All You Need To Do Is Accept Or Reject The Contract!"
                textColor={Colors.Dark_GRAY}
                fontSize={14}
                lineHeight={20}
                style={{marginHorizontal: 10, marginTop: 5}}
              />
            </View>

            <MyText
              text="My Developer *"
              textColor={Colors.WHITE}
              fontSize={14}
              fontFamily="medium"
              style={{marginTop: 30, marginBottom: 0}}
            />
            {/* <DropdownPicker
              data={developerData}
              setData={setDeveloperData}
              visible={openDeveloperDropdown}
              setVisibility={setOpenDeveloperDropdown}
              onHide={() => setOpenDeveloperDropdown(false)}
              value={developerValue}
              setValue={setDeveloperValue}
              customChangeValue={v => {
                setDeveloperValue(v);
              }}
              isCustomChangeValue
              placeholder={`Select Developer`}
              style={{
                marginBottom: 10,
                borderRadius: 10,
                borderWidth: 0,
                zIndex: 4000,
                zIndexInverse: 1000,
              }}
              zIndex={4000}
              zIndexInverse={1000}
            /> */}
            <MyTextInput
              placeholder={'Enter the developer name'}
              value={developerName}
              setValue={setDeveloperName}
              editable={false}
              onSubmitEditing={() => nameRef.current.focus()}
              style={{
                marginTop: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderWidth: 0,
              }}
            />
            <MyText
              text="My Name *"
              textColor={Colors.WHITE}
              fontSize={14}
              fontFamily="medium"
              style={{}}
            />
            <MyTextInput
              inputRef={nameRef}
              placeholder={'Full Name'}
              value={name}
              editable={false}
              setValue={setName}
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
              text="My Email *"
              textColor={Colors.WHITE}
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
              text="My Phone Number *"
              textColor={Colors.WHITE}
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
              // maxLength={10}
              isIcon
              icon={require('assets/images/phone-icon.png')}
              keyboardType="number-pad"
              style={{
                marginTop: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderWidth: 0,
              }}
            />
            {anniStartDates?.map((el, index) => (
              <View
                key={index?.toString()}
                style={{marginTop: index > 0 ? 10 : 0}}>
                <MyText
                  text={`My Anniversary Dates ${index + 1} *`}
                  textColor={Colors.WHITE}
                  fontSize={14}
                  fontFamily="medium"
                  style={{marginBottom: 10}}
                />
                <View style={styles.dateWithIconRow}>
                  <DateSelector
                    Title={
                      anniStartDates[index] === ''
                        ? 'Start'
                        : // : moment(startDate).format('MMMM Do YYYY')
                          moment(anniStartDates[index]).format('MMM DD, YYYY')
                    }
                    showDateIcon
                    placeholder="Start"
                    onPress={() => {
                      const openAnniStartDatesCopy = [...openAnniStartDates];
                      openAnniStartDatesCopy[index] = true;
                      setOpenAnniStartDates([...openAnniStartDatesCopy]);
                    }}
                    dateViewStyle={{borderWidth: 0}}
                    calenderViewStyle={{
                      borderWidth: 0,
                      borderRadius: 10,
                      width: '42%',
                      paddingHorizontal: 10,
                    }}
                  />
                  <DateSelector
                    Title={
                      anniEndDates[index] === ''
                        ? 'End'
                        : // : moment(startDate).format('MMMM Do YYYY')
                          moment(anniEndDates[index]).format('MMM DD, YYYY')
                    }
                    showDateIcon
                    placeholder="End"
                    onPress={() => {
                      const openAnniEndDatesCopy = [...openAnniEndDates];
                      openAnniEndDatesCopy[index] = true;
                      setOpenAnniEndDates([...openAnniEndDatesCopy]);
                    }}
                    dateViewStyle={{borderWidth: 0}}
                    calenderViewStyle={{
                      borderWidth: 0,
                      borderRadius: 10,
                      width: '42%',
                      paddingHorizontal: 10,
                    }}
                  />
                  {index === 0 ? (
                    <TouchableOpacity
                      onPress={() => onAddDate(index)}
                      style={styles.iconView}>
                      <Image source={require('assets/images/add.png')} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => onRemoveDate(index)}
                      style={styles.iconView}>
                      <Image source={require('assets/images/minus.png')} />
                    </TouchableOpacity>
                  )}
                </View>
                <MyText
                  text={`${getNameOfNumber(
                    index + 1,
                  )} Anniversary Date Points *`}
                  textColor={Colors.WHITE}
                  fontSize={14}
                  fontFamily="medium"
                  style={{marginTop: 10}}
                />
                <MyTextInput
                  placeholder={'Enter Points'}
                  value={pointsPerDate[index] || ''}
                  isOnChangeText
                  onChangeText={e => {
                    const pointsPerDateCopy = [...pointsPerDate];
                    pointsPerDateCopy[index] = e;
                    setPointsPerDate(pointsPerDateCopy);
                  }}
                  // maxLength={10}
                  keyboardType="number-pad"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderWidth: 0,
                    marginBottom: 0,
                    paddingBottom: 0,
                  }}
                />
              </View>
            ))}
            <MyButton
              text={'Next'}
              onPress={gotoReviewPoints}
              style={styles.buttonStyle}
            />
          </View>


     <View style={{width:100,height:150}}></View>


        </ScrollView>
        {openAnniStartDates?.map((el, index) => (
          <DatePicker
            key={index.toString()}
            modal
            mode="date"
            open={openAnniStartDates[index]}
            date={anniStartDates[index] || new Date()}
            onConfirm={date => {
              if (!validateStartDates(date, anniEndDates[index], index)) {
                const openAnniStartDatesCopy = [...openAnniStartDates];
                openAnniStartDatesCopy[index] = false;
                setOpenAnniStartDates([...openAnniStartDatesCopy]);
                return;
              }
              const openAnniStartDatesCopy = [...openAnniStartDates];
              openAnniStartDatesCopy[index] = false;
              setOpenAnniStartDates([...openAnniStartDatesCopy]);
              const anniStartDatesCopy = [...anniStartDates];
              anniStartDatesCopy[index] = date;
              setAnniStartDates([...anniStartDatesCopy]);
            }}
            onCancel={() => {
              const openAnniStartDatesCopy = [...openAnniStartDates];
              openAnniStartDatesCopy[index] = false;
              setOpenAnniStartDates([...openAnniStartDatesCopy]);
            }}
          />
        ))}
        {openAnniEndDates?.map((el, index) => (
          <DatePicker
            key={index.toString()}
            modal
            mode="date"
            open={openAnniEndDates[index]}
            date={anniEndDates[index] || new Date()}
            onConfirm={date => {
              if (!validateEndDates(anniStartDates[index], date, index)) {
                const openAnniEndDatesCopy = [...openAnniEndDates];
                openAnniEndDatesCopy[index] = false;
                setOpenAnniEndDates([...openAnniEndDatesCopy]);
                return;
              }
              const openAnniEndDatesCopy = [...openAnniEndDates];
              openAnniEndDatesCopy[index] = false;
              setOpenAnniEndDates([...openAnniEndDatesCopy]);
              const anniEndDatesCopy = [...anniEndDates];
              anniEndDatesCopy[index] = date;
              setAnniEndDates([...anniEndDatesCopy]);
            }}
            onCancel={() => {
              const openAnniEndDatesCopy = [...openAnniEndDates];
              openAnniEndDatesCopy[index] = false;
              setOpenAnniEndDates([...openAnniEndDatesCopy]);
            }}
          />
        ))}
        <CustomLoader showLoader={showLoader} />
      </View>
    </LinearGradient>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(GetInTouch);

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

const getInitialStartDatesState = data => {
  if (data?.anniversary_date?.length === 0) {
    return [''];
  } else {
    const notPastDates = data?.anniversary_date?.filter(el => {
      const date = new Date(el.anniversary_end_date);
      if (moment(date).isBefore(moment(), 'days')) {
        return false;
      } else {
        return true;
      }
    });
    return data?.anniversary_date?.map(
      el => new Date(el.anniversary_start_date),
    );
  }
};
const getInitialEndDatesState = data => {
  if (data?.anniversary_date?.length === 0) {
    return [''];
  } else {
    return data?.anniversary_date?.map(el => new Date(el.anniversary_end_date));
  }
};
const getInitialOpenDatesState = data => {
  if (data?.anniversary_date?.length === 0) {
    return [false];
  } else {
    return [...Array(data?.anniversary_date?.length).keys()]?.map(el => false);
  }
};
const getInitialPointsPerDateState = data => {
  if (data?.anniversary_date?.length === 0) {
    return [''];
  } else {
    return [...Array(data?.anniversary_date?.length).keys()]?.map(el => '');
  }
};
