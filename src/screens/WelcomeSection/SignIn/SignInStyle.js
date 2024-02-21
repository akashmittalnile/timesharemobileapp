import {Constant, Colors} from 'global/Index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    paddingHorizontal: 20,
    width:'95%',alignSelf:'center'
  },
  gradientStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  absoluteView: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
  },
  logoStyle: {
    marginBottom: 50,
  },
  loginStyle: {
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'center',
    width: '100%',
  },
  horizontalLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    width: '90%',alignSelf:'center'
  },
  line: {
    height: 0.5,
    width: '45%',
    backgroundColor: 'black',
  },
  buttonStyle: {
    // marginTop: 10,
    marginBottom: 15,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  already: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
