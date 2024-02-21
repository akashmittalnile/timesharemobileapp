//react components
import React from 'react';
//stack
import {createStackNavigator} from '@react-navigation/stack';
//global
import {ScreenNames} from '../../global/Index';
//screens
import Splash from 'screens/WelcomeSection/Splash/Splash';
import Welcome from 'screens/WelcomeSection/Welcome/Welcome';
import Signup1 from 'screens/WelcomeSection/Signup1/Signup1';
import Signup2 from 'screens/WelcomeSection/Signup2/Signup2';
import SignIn from 'screens/WelcomeSection/SignIn/SignIn';
import TimesharePoint from 'screens/UserSection/TimesharePoint/TimesharePoint';
import RentYourPoints from 'screens/UserSection/RentYourPoints/RentYourPoints';
import GetInTouch from 'screens/UserSection/GetInTouch/GetInTouch';
import ReviewTimesharePoint from 'screens/UserSection/ReviewTimesharePoint/ReviewTimesharePoint';
import SignContract from 'screens/UserSection/SignContract/SignContract';
import AboutUs from 'screens/UserSection/AboutUs/AboutUs';
import BottomTab from 'navigation/BottomTab/BottomTab';
import Notifications from 'screens/UserSection/Notification/Notifications';
import SubmitNewQuery from 'screens/UserSection/SubmitNewQuery/SubmitNewQuery';
import ViewContracts from '../../screens/UserSection/ViewContracts/ViewContracts';
import ViewContractPDF from 'screens/UserSection/ViewContractPDF/ViewContractPDF';
import SideMenuLinks from 'screens/UserSection/SideMenuLinks/SideMenuLinks';
import TrainingVideos from 'screens/UserSection/TrainingVideos/TrainingVideos';
import EditProfile from 'screens/UserSection/EditProfile/EditProfile';
import NoConnection from 'screens/UserSection/NoConnection/NoConnection';
import BlugreenContract from '../../screens/UserSection/ViewContracts/BlugreenContract';
import DiamondContract from '../../screens/UserSection/ViewContracts/DiamondContract';
import HolydayInContract from '../../screens/UserSection/ViewContracts/HolydayInContract.js';
import LawrenceContract from '../../screens/UserSection/ViewContracts/LawrenceContract';
import ClubWyndhamContract from '../../screens/UserSection/ViewContracts/ClubWyndhamContract';
import WorldmarkContract from '../../screens/UserSection/ViewContracts/WorldmarkContract';

import MarriottContract from '../../screens/UserSection/ViewContracts/MarriottContract';
import StarwoodContract from '../../screens/UserSection/ViewContracts/StarwoodContract';
import ViewRejectedContracts from '../../screens/UserSection/ViewContracts/ViewRejectedContracts';

const MainStack = () => {
  //variables
  const Stack = createStackNavigator();
  const initialRouteName = ScreenNames.HOME;
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      // initialRouteName={initialRouteName}
      >
      <Stack.Screen name={ScreenNames.SPLASH} component={Splash} />
      <Stack.Screen name={ScreenNames.WELCOME} component={Welcome} />
      <Stack.Screen name={ScreenNames.SIGN_UP_1} component={Signup1} />
      <Stack.Screen name={ScreenNames.SIGN_UP_2} component={Signup2} />
      <Stack.Screen name={ScreenNames.SIGN_IN} component={SignIn} />
      <Stack.Screen name={ScreenNames.BOTTOM_TAB} component={BottomTab} />
      <Stack.Screen
        name={ScreenNames.TIMESHARE_POINT}
        component={TimesharePoint}
      />
      <Stack.Screen
        name={ScreenNames.RENT_YOUR_POINTS}
        component={RentYourPoints}
      />
      <Stack.Screen name={ScreenNames.GET_IN_TOUCH} component={GetInTouch} />
      <Stack.Screen
        name={ScreenNames.REVIEW_POINTS}
        component={ReviewTimesharePoint}
      />
      <Stack.Screen name={ScreenNames.SIGN_CONTRACT} component={SignContract} />
      <Stack.Screen name={ScreenNames.ABOUT_US} component={AboutUs} />
      <Stack.Screen
        name={ScreenNames.NOTIFICATIONS}
        component={Notifications}
      />
      <Stack.Screen
        name={ScreenNames.SUBMIT_NEW_QUERY}
        component={SubmitNewQuery}
      />
      <Stack.Screen
        name={ScreenNames.VIEW_CONTRACTS}
        component={ViewContracts}
      />
      <Stack.Screen
        name={ScreenNames.ViewRejectedContracts}
        component={ViewRejectedContracts}
      />
      
      <Stack.Screen
        name={ScreenNames.BLUEGREEN_CONTRACT}
        component={BlugreenContract}
      />
      <Stack.Screen
        name={ScreenNames.DIMOND_CONTRACT}
        component={DiamondContract}
      />
      <Stack.Screen
        name={ScreenNames.HOLYDAYIN_CONTRACT}
        component={HolydayInContract}
      />
      <Stack.Screen
        name={ScreenNames.LAWRENCE_CONTRACT}
        component={LawrenceContract}
      />
      <Stack.Screen
        name={ScreenNames.CLUBWYNDHAM_CONTRACT}
        component={ClubWyndhamContract}
      />
      <Stack.Screen
        name={ScreenNames.WORLDMARK_CONTRACT}
        component={WorldmarkContract}
      />
      <Stack.Screen
        name={ScreenNames.MARRIOT_CONTRACT}
        component={MarriottContract}
      />
      <Stack.Screen
        name={ScreenNames.STARWOOD_CONTRACT}
        component={StarwoodContract}
      />
      <Stack.Screen
        name={ScreenNames.VIEW_CONTRACT_PDF}
        component={ViewContractPDF}
      />
      <Stack.Screen
        name={ScreenNames.SIDE_MENU_LINKS}
        component={SideMenuLinks}
      />
      <Stack.Screen
        name={ScreenNames.TRAINING_VIDEOS}
        component={TrainingVideos}
      />
      <Stack.Screen name={ScreenNames.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={ScreenNames.NO_CONNECTION} component={NoConnection} />
    </Stack.Navigator>
  );
};

export default MainStack;
