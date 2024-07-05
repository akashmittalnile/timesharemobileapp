import {Constant, Colors} from 'global/Index';
import {StyleSheet} from 'react-native';
import { width } from '../../../global/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    paddingHorizontal: 20,
  },
  gradientStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  absoluteView: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
  },
  logoStyle: {
    marginBottom: 50,
  },
  loginStyle: {
    // marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    width: '100%',
    marginTop: 30,
  },
  horizontalLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%',alignSelf:'center'
  },
  line: {
    height: 0.5,
    width: '45%',
    backgroundColor: 'black',
  },
  buttonStyle: {
    // marginTop: 10,
    marginBottom: 15,
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
  },
  already: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  searchbar: {
    description: {
      // fontWeight: 'bold',
      color: Colors.BLACK,
      // color: '#455A64',
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
    row: {
      backgroundColor: '#cbe2f2',
      // borderColor:Colors.HEADER_YELLOW,
      // borderWidth:1
    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      // top: 50,
      // width: width - 10,
      borderWidth: 0,
      marginTop: 5,
    },
    textInput: {
      marginLeft: 0,
      paddingHorizontal: 20,
      marginRight: 0,
      height: 100,
      color: Colors.BLACK,
      // color: '#455A64',
      fontSize: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      fontFamily: 'bold',
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.5,
      // shadowRadius: 2,
      // elevation: 2,
    },
    listView: {
      // backgroundColor: 'red',
      // backgroundColor: 'rgba(192,192,192,0.9)',
      // top: 23,
    },
  },
  imageViewStyle: {
    width: 110,
    height: 110,
    position: 'absolute',
    right: width / 2 - 20 - 41,
  },
  deleteButtonStyle: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    padding: 5,
    right: 5,
    top: 5,
  },
  addButtonStyle: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    padding: 5,
    right: 5,
    bottom: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 45
  },
  backView: {
    width: 38.5,
    height: 37.64,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logo: {
    width: 110,
    height: 110,
    position: 'absolute',
    right: width / 2 - 20 - 41,
    // alignSelf: 'center'
  },
});
