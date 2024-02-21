import {Colors} from 'global/Index';
import {StyleSheet} from 'react-native';
import {height, width} from '../../global/Constant';

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '90%',
    // height: 396,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    // paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#545454',
    bottom: 20,
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    width: '90%',
  },
  longText: {
    color: Colors.THEME_GRAY,
    fontSize: 14,
    lineHeight: 20,
    // width: '90%',
    textAlign: 'center',
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
  btnStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E7F3FF',
    width: '90%',
    height: 60,
    borderRadius: 10,
    // marginBottom: 15,
    marginTop: 15,
    shadowColor: '#0084FF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  tickView: {
    backgroundColor: 'rgba(12, 138, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
  },
  termRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    marginBottom: 10,
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    width: '43%',
  },
  btnContainerStyle: {
    flexDirection: 'row',
    gap: 15,
    top: 10,
  },
});
