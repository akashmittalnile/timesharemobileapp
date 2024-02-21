import {StyleSheet} from 'react-native';
import {Colors} from 'global/Index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // color: Colors.WHITE,
  },
  mainView: {
    paddingHorizontal: 20,
  },
  bannerImage: {
    height: 247,
    marginBottom: '5%',
  },
  image: {width: '100%', height: '100%', marginTop: -12},
  fixedContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    height: 151,
    marginHorizontal: 20,
    top: -90,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 3,
    zIndex: 2,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.THEME_GRAY,
    paddingVertical: 3,
  },
  subheaderText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.THEME_GRAY,
    paddingVertical: 3,
  },
  descriptionInput: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: Colors.THEME_GRAY,
    height: 141,
    marginTop: 15,
  },
  loginStyle: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    width: '100%',
  },
  bottomLogo: {
    height: 110,
    width: 110,
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  touchContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 151,
    borderRadius: 10,
    shadowColor: Colors.THEME_BLUE,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
});
