//react components
import React from 'react';
import {View, Image, Text} from 'react-native';
//custom components
import MyText from 'components/MyText/MyText';
//Bottom Tab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//global
import {Colors, ScreenNames, MyIcon, Images} from 'global/Index';
//styles
import {styles} from './BottomTabStyle';
//screens
import Home from 'screens/UserSection/Home/Home';
import Contracts from 'screens/UserSection/Contracts/Contracts';
import HelpAndSupport from 'screens/UserSection/HelpAndSupport/HelpAndSupport';
import Profile from 'screens/UserSection/Profile/Profile';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

const BottomTab = ({userToken}) => {
  const userInfo = useSelector(state => state.user.userInfo);
  //variables
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    showLabel: false,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: styles.navigatorStyle,
  };
  // backBehavior = order - return to previous tab (in the order they are shown in the tab bar)
  // backBehavior = history - return to last visited tab
  return (
    <Tab.Navigator backBehavior="history" screenOptions={screenOptions}>
      <Tab.Screen
        name={ScreenNames.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabStyle}>
              {focused ? (
                <Image source={require('assets/images/home-icon-2.png')} />
              ) : (
                <Image source={require('assets/images/home-icon.png')} />
              )}
              <MyText
                text="Home"
                fontSize={14}
                fontFamily="medium"
                textColor={focused ? Colors.THEME_BLUE : Colors.LIGHT_GRAY}
                marginTop={5}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.CONTRACTS}
        component={Contracts}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabStyle}>
              {focused ? (
                <Image source={require('assets/images/contracts-icon-2.png')} />
              ) : (
                <Image source={require('assets/images/contracts-icon.png')} />
              )}
              <MyText
                text="Contracts"
                fontSize={14}
                fontFamily="medium"
                textColor={focused ? Colors.THEME_BLUE : Colors.LIGHT_GRAY}
                marginTop={5}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.HELP_AND_SUPPORT}
        component={HelpAndSupport}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabStyle}>
              {focused ? (
                <Image
                  source={require('assets/images/help-and-support-icon-2.png')}
                />
              ) : (
                <Image
                  source={require('assets/images/help-and-support-icon.png')}
                />
              )}
              <MyText
                text="Help"
                fontSize={14}
                fontFamily="medium"
                textColor={focused ? Colors.THEME_BLUE : Colors.LIGHT_GRAY}
                marginTop={5}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabStyle}>
              {focused ? (
                <Image source={require('assets/images/profile-icon-2.png')} />
              ) : (
                <Image source={require('assets/images/profile-icon.png')} />
              )}
              <MyText
                text="Profile"
                fontSize={14}
                fontFamily="medium"
                textColor={focused ? Colors.THEME_BLUE : Colors.LIGHT_GRAY}
                marginTop={5}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
