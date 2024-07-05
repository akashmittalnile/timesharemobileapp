import { Colors, Constant } from 'global/Index';
import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB'
  },
  mainView: {
    padding: 20,
  },
  homebg: {
    width: width,
    height: 591,
  },
  buttonStyle: {
    marginTop: 20,
    alignSelf: 'center',
    // marginBottom: 15,
    width: '100%',
    height: 54
  },
});
