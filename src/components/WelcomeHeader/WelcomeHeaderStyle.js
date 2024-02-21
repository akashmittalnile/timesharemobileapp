import {Constant, Colors} from 'global/Index';
import {StyleSheet} from 'react-native';
import {width} from '../../global/Constant';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 20,
    marginTop: 60,
  },
  backView: {
    width: 38.5,
    height: 37.64,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logo: {
    width: 110,
    height: 110,
    position: 'absolute',
    right: width / 2 - 20 - 41,
    // alignSelf: 'center'
  },
});
