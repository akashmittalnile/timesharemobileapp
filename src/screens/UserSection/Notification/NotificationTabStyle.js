import {Colors} from 'global/Index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.WHITE,
    marginVertical: 5,
  },
  notificationContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    height: 'auto',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: 64,
    width: 64,
    borderRadius: 64,
  },
  textContainer: {paddingHorizontal: 10, width: '90%'},
  headerText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.THEME_GRAY,
    paddingVertical: 3,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.LIGHT_GRAY,
    paddingVertical: 3,
  },
  buttonContainer: {
    height: 44,
    width: 132,
    backgroundColor: Colors.THEME_BLUE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.WHITE,
    justifyContent: 'center',
  },
});
