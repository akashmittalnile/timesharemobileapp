import {Constant, Colors} from 'global/Index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  mainView: {
    paddingHorizontal: 20,
  },
  logoStyle: {
    marginBottom: 50,
  },
  loginStyle: {
    marginBottom: 10,
    alignSelf: 'center',
    width: '90%',
  },
  horizontalLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  line: {
    height: 1,
    width: '42%',
    backgroundColor: 'white',
  },
  buttonStyle: {
    // marginTop: 10,
    marginBottom: 15,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  whiteBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: Colors.THEME_GRAY,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 60,
    width: '90%',
  },
  iconContainer: {
    width: 57,
    height: 57,
    borderRadius: 57 / 2,
    marginTop: -57 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31577C',
    alignSelf: 'center',
  },
  iconView: {
    width: 41,
    height: 41,
    borderRadius: 41 / 2,
    // marginTop: -41 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.THEME_BLUE,
    // alignSelf: 'center'
  },
  dateWithIconRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  deleteContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
