import { Colors } from 'global/Index';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.THEME_ORANGE,
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 2,
  },
  profileImageStyle: {
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: 20
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft:-50
  },
  logoView: {
    backgroundColor: 'white',
    width: 73,
    height: 56,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
