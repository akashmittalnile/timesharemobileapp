import { Colors, Constant } from 'global/Index';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    outerView: {
        width: '100%',
        zIndex: 999,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10,
        // paddingHorizontal: 10
    },
    dropdown: {
        height: 50,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
    dropDownContainerStyle: {
        height: 400,
        backgroundColor: '#fff',
        borderColor: 'transparent',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5,
        // zIndex:999,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#8F93A0',
        fontWeight: '400'
    },
    itemTextStyle: {
        fontSize: 14,
        color: '#455A64',
        fontWeight: '400'
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#455A64',
        fontWeight: '400'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})