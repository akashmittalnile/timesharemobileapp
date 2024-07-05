import { Colors } from 'global/Index';
import { StyleSheet } from 'react-native';
import { height } from '../../global/Constant';

export const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        // height: 396,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#545454'
    },
    buttonStyle: {
        // marginTop: 10,
        marginBottom: 15,
        alignSelf: 'center',
        width: '100%',
    },
    mainImg: {
        width: '100%',
        height: 202,
        borderRadius: 10
    }
});
