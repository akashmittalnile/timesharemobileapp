import {Colors} from 'global/Index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  flagNumberView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50,
    borderRadius: 10,
    shadowColor: '#0089CF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 2,
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
