import {Constant, Colors} from 'global/Index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.THEME_BLUE,
    width: '90%',
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 6,
  },
});
