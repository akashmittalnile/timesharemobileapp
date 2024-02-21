import {Colors} from 'global/Index';
import {StyleSheet} from 'react-native';
import {height} from '../../global/Constant';

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // justifyContent: 'center',
    alignItems: 'center',
    // bottom: 20,
  },
  modalContent: {
    width: '90%',
    // height: 396,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    // paddingBottom: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#545454',
    bottom: 20,
  },
  buttonStyle: {
    // marginTop: 10,
    marginBottom: 15,
    alignSelf: 'center',
    width: '100%',
  },
  longText: {
    color: Colors.THEME_GRAY,
    fontSize: 14,
    lineHeight: 20,
    // width: '90%',
    // textAlign: 'center',
    marginBottom: 10,
  },
  resultsView: {
    backgroundColor: Colors.LIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
