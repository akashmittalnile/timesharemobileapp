import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
//import : styles
import {styles} from './NotificationsStyle';
//import : custom components
import MyHeader from '../../../components/MyHeader/MyHeader';
import NotificationTab from './NotificationTab';
import {ScreenNames,Colors, Service} from '../../../global/Index';
import {useSelector} from 'react-redux';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';

const Notifications = ({navigation}) => {
  const userToken = useSelector(state => state.user.userToken);
  const [notificationData, setNotificationData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const DATA = [
    // {
    //   id: 1,
    //   text: 'Remember To Book Your Marriott Abound Points For Maximum vailability Throughout The Year!',
    //   date: 'March 31, 2023',
    // },
    // {
    //   id: 2,
    //   text: 'Click Here Timeshare Points Calculator To Turn Your Points Into Cash For This Year And Get Them Rented Immediately!',
    //   date: 'March 31, 2023',
    //   timeShare: 'Yes',
    // },
    // {
    //   id: 3,
    //   text: 'You have only one month left to decide to save your Marriott abound points to the following year by June 31, 2023. This will give you one more year to use them. If not, You will have to use them by dec 31, 2023',
    //   date: 'March 31, 2023',
    // },
    // {
    //   id: 4,
    //   text: 'If You Want To Turn Abound Points Into Cash, We Can Rent Them For You Click Here For An Instant Estimate And Contract Timeshare Points Calculator',
    //   date: 'March 31, 2023',
    //   timeShare: 'Yes',
    // },
  ];
  const getNotification = async () => {
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.GET_NOTIFICATION,
      );
      // console.log('================notification', resp.data.
      // );
      if (resp?.data?.status) {
        setNotificationData(resp.data.notification);
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };
  const readNotification = async () => {
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.read_notification,
      );
    
      if (resp?.data?.status) {
       console.log('done',resp?.data)
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };
  
  useEffect(() => {
    setShowLoader(true);
    getNotification();
   
  }, []);
  const renderNotificationItems = ({item}) => {
    return <NotificationTab items={item} />;
  };

  return (
    <>
      <View style={styles.container}>
        <MyHeader Title="Notifications" />
        <TouchableOpacity style={{width:70,height:30,borderRadius:8,backgroundColor:Colors.THEME_BLUE,alignSelf:'flex-end',justifyContent: 'center',margin:10}}
        onPress={()=>{ readNotification()}}>
      <Text style={{color:'#000',fontWeight:'700',textAlign:'center'}}>Clear</Text>
        </TouchableOpacity>
        <View style={styles.mainView}>
          <FlatList
            data={notificationData}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={renderNotificationItems}
            listKey={'myGroupList'}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </View>
      <CustomLoader showLoader={showLoader} />
    </>
  );
};

export default Notifications;
