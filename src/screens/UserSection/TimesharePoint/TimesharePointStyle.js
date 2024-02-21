import {Colors, Constant} from 'global/Index';
import {Platform, StyleSheet} from 'react-native';
import {width} from '../../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainView: {
    padding: 20,
  },
  bg: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  instantOfferContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    shadowColor: Colors.THEME_BLUE,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  logo: {
    marginTop: -70,
  },
  buttonStyle: {
    // marginTop: 10,
    // marginBottom: 15,
    alignSelf: 'center',
    width: '100%',
  },
});
