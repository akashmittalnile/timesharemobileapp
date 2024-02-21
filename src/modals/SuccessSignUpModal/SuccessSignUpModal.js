//import : react components
import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
//import : custom components
import MyText from 'components/MyText/MyText';
//import : globals
import { Colors, Constant, MyIcon, ScreenNames } from 'global/Index';
//import : styles
import { styles } from './SuccessSignUpModalStyle';
import MyButton from 'components/MyButton/MyButton';

const SuccessSignUpModal = ({
    visible,
    setVisibility,
}) => {
    //variables : navigation
    const navigation = useNavigation();
    const myTextInput = useRef()
    //function : navigation function
    //function : modal function
    const closeModal = () => {
        setVisibility(false);
    };
    //UI
    return (
        <Modal
            isVisible={visible}
            swipeDirection="down"
            onBackdropPress={() => setVisibility(false)}
            onSwipeComplete={e => {
                setVisibility(false);
            }}
            scrollTo={() => { }}
            scrollOffset={1}
            propagateSwipe={true}
            coverScreen={false}
            backdropColor="transparent"
            style={styles.modal}>
            <View style={styles.modalContent}>
                <Image source={require('assets/images/successful-img.png')} style={styles.mainImg} />
                <MyText text='Great!' fontSize={24} fontFamily='medium' textColor={Colors.THEME_BLUE} style={{ marginTop: 5 }} />
                <MyText text={`You Have Successfully Signed Up With\nTimeshare Simplified!`} fontSize={14} fontFamily='medium' textColor={Colors.THEME_GRAY} textAlign='center' style={{ marginTop: 10, marginBottom: 20 }} />
                <MyButton text={'Sign In'}
                    onPress={() => { }}
                    style={styles.buttonStyle}
                    iconStyle={{ marginRight: 10 }}
                />
            </View>
        </Modal>
    );
};

export default SuccessSignUpModal;