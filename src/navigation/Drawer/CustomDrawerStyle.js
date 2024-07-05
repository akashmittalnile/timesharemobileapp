import {Colors} from 'global/Index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // color: Colors.LITE_GREY,
    backgroundColor: 'white',
  },
  mainView: {
    padding: 20,
  },
  logoCloseView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logoImageStyle: {
    height: 70,
    width: 70,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
    borderRadius: 5,
  },
  profileCardView: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
    backgroundColor: Colors.WHITE,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  profileImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 100,
    alignSelf: 'center',
  },
  imageNameView: {
    // alignItems: 'center',
  },
  driverTextView: {
    backgroundColor: Colors.HEADER_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 4,
    marginTop: -10,
    width: '90%',
    alignSelf: 'center',
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchView: {
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.THEME_ORANGE,
    height: 80,
    marginTop: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoImage: {width: 127, height: 127, borderRadius: 50},
  crossImage: {width: 46, height: 46, marginRight: 10},
  menuContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginTop: 25,
    width: '100%',
  },
  menuImage: {width: 20, height: 18},
  image: {width: '100%', height: '100%', borderRadius: 50},
  iconImage: {width: 34, height: 34, borderRadius: 34/2},
  menuLabel: {
    color: Colors.THEME_GRAY,
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 10,
    fontWeight: '500',
  },
  arrowImage: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 1,
    right: 0,
  },
  socialMediaContainer: {
    backgroundColor: '#E7F3FF',
    height: 95,
    padding: 20,
  },
  followText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.BLACK,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.LIGHT_GRAY,
    padding: 20,
  },
});
