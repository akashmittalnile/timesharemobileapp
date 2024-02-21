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
import { styles } from './ForgotPasswordEnterEmailStyle';
import MyButton from 'components/MyButton/MyButton';
import MyTextInput from '../../components/MyTextInput/MyTextInput';

const ForgotPasswordEnterEmail = ({
    visible,
    setVisibility,
    forgotEmail,
    setForgotEmail,
    handleNext
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
                <MyText text='Forgot Password?' fontSize={24} fontFamily='medium' textColor={Colors.THEME_BLUE} style={{ marginTop: 5 }} />
                <MyText text={`Please Enter Your Registered Email ID`} fontSize={14} fontFamily='medium' textColor={Colors.THEME_GRAY} textAlign='center' style={{ marginTop: 5 }} />
                <MyText text={`We Will Send An 4 Digit OTP In Your Registered Email ID`} fontSize={12} textColor={'#BCBBB7'} textAlign='center' style={{ marginTop: 5 }} />
                <MyTextInput
                    placeholder={'Email Address'}
                    value={forgotEmail}
                    setValue={setForgotEmail}
                    isIcon
                    icon={require('assets/images/email-icon.png')}
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
                <MyButton text={'Reset password'}
                    onPress={handleNext}
                    style={styles.buttonStyle}
                />
            </View>
        </Modal>
    );
};

export default ForgotPasswordEnterEmail;