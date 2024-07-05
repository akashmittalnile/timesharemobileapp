import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  navigatorStyle: {
    height: Platform.OS === 'android' ? 70 : 50,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabStyle: {
    alignItems: 'center',
  },
});
