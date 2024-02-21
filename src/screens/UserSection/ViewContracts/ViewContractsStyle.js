import {Colors} from 'global/Index';
import {StyleSheet} from 'react-native';
import {width} from '../../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  mainView: {
    paddingHorizontal: 20,
    backgroundColor: '#F3EFEE',
    height: 1150,
  },
  textViewContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  circle: {
    height: 7,
    width: 7,
    backgroundColor: '#fff',
    borderRadius: 5,
    position: 'absolute',
    left: 0,
    top: 22,
  },

  inputContainer: {
    width: '70%',
    marginLeft: 22,
  },
  textInput: {
    borderBottomWidth: 0.5, // Set the bottom border width
    borderBottomColor: 'black', // Set the bottom border color
    fontSize: 14,

    flex: 1,
  },
  textInputStyle: {
    backgroundColor: null,
    borderWidth: 0,
    borderColor: null,
    borderRadius: 10,
    borderBottomWidth: 0.5,
    width: '80%',
    marginLeft: 15,
    marginTop: -10,
    paddingBottom: -20,
    height: 20,
    marginTop: 12,
  },
  textInputStyle1: {
    width: '50%',
    marginLeft: 10,
  },
  textInputStyle2: {
    width: '20%',
    marginLeft: 10,
  },
  textInputStyle3: {
    width: '80%',
    marginLeft: 10,
   
    
  },
  textInputStyle4: {
    width: '80%',
    marginLeft: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  textInputStyle5: {
    width: '60%',
    marginLeft: 10,
    
    
  },
  textInputStyle6:{
    width: '70%',
    marginLeft: -5,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paymentMethodRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
    },
  },
});
