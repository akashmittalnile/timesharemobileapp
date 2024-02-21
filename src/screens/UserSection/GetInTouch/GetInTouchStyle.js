import {Colors, Constant} from 'global/Index';
import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FBFBFB'
  },
  mainView: {
    padding: 20,
    marginTop: -50,
  },
  homebg: {
    width: width,
    height: 247,
  },
  emptyContainer: {
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: 10,
    paddingVertical: 10,
    paddingBottom: 15,
    shadowColor: Colors.THEME_GRAY,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  buttonStyle: {
    marginTop: 20,
    alignSelf: 'center',
    // marginBottom: 15,
    width: '100%',
    height: 54,
  },
  logo: {
    marginTop: -70,
    marginLeft: 5,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateWithIconRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  iconView:{
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  }
});
