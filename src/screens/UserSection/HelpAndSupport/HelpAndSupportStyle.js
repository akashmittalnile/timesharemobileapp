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
  homebg: {
    width: width,
    height: 247,
    marginTop: -5,
  },
  newQueryContainer: {
    width: width * 0.9,
    height: 151,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonStyle: {
    marginTop: 10,
    // marginBottom: 15,
    // width: '100%',
    width: width * 0.39,
    height: 34,
  },
  img: {
    height: 78,
    width: 78,
    borderRadius: 78 / 2,
    position: 'absolute',
    top: 25,
    left: 25,
  },
  queryContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: Colors.THEME_GRAY,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  queryIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7F3FF',
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
  answerContainer: {
    width: '100%',
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#E7F3FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 10
  },
  answerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10
  },
  adminIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
});
