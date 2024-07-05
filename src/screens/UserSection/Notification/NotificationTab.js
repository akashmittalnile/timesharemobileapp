import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
//import : styles
import {styles} from './NotificationTabStyle';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames, Service} from '../../../global/Index';
//import : custom components

const NotificationTab = ({items}) => {
  const navigation = useNavigation();
  const gotoTimesharePoint = () => {
    navigation.navigate(ScreenNames.TIMESHARE_POINT);
  };

  return (
    <View style={styles.container}>
      {items?.timeShare !== 'Yes' ? (
        <View style={styles.notificationContainer}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={require('../../../assets/images/notificationIcon.png')}
          />
          <View style={styles.textContainer}>
            <Text
              style={[styles.headerText, {fontWeight: '600', fontSize: 16}]}>
              {items?.title}
            </Text>
            <Text style={styles.headerText}>{items?.message} </Text>
            <Text style={styles.dateText}>{items?.created_at} </Text>
          </View>
        </View>
      ) : (
        <View style={styles.notificationContainer}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={require('../../../assets/images/linkIcon.png')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>{items?.text}</Text>
            <Text style={styles.dateText}>{items?.date} </Text>

            {/* get started button section */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={gotoTimesharePoint}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default NotificationTab;
