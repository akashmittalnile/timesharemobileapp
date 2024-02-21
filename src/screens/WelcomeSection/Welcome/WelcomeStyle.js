import {Constant, Colors} from 'global/Index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
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
    bottom: 50,
  },
  logoStyle: {
    marginBottom: 30,
    height: 176,
    width: 175,
  },
  loginStyle: {
    marginBottom: 10,
  },
});
