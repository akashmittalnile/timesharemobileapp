import { Colors, Constant } from 'global/Index';
import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB'
  },
  mainView: {
    padding: 20,
    marginTop: -50
  },
  homebg: {
    width: width,
    height: 247,
  },
  emptyContainer: {
    backgroundColor: 'white',
    width: width * 0.9,
    height: 78,
    borderRadius: 10,
    shadowColor: Colors.THEME_GRAY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  buttonStyle: {
    marginTop: 20,
    alignSelf: 'center',
    // marginBottom: 15,
    width: '100%',
    height: 54
  },
  logo: {
    marginTop: -70,
    marginLeft: 5
  },
  pointContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginRight: 20,
    width: width * 0.60,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#D9D9D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  selectedPoint: {
    borderWidth: 1,
    borderColor: Colors.THEME_BLUE
  },
  tickView: {
    backgroundColor: 'rgba(12, 138, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    position: 'absolute',
    left: width * 0.60 - 10,

  }
});
