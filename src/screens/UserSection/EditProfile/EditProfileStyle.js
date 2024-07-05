import {Colors, Constant} from 'global/Index';
import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainView: {
    padding: 20,
    marginTop: -120,
  },
  imageViewStyle: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
    borderRadius: 120 / 2,
    // marginTop: 70,
  },
  addButtonStyle: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    padding: 5,
    right: 5,
    bottom: 5,
  },
  deleteButtonStyle: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    padding: 5,
    right: 5,
    top: 5,
  },
  buttonStyle: {
    marginTop: 40,
    alignSelf: 'center',
    width: '100%',
    height: 60,
  },
});
