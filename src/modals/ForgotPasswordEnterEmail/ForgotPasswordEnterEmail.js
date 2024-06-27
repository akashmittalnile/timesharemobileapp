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
import useKeyboard from '../../components/useKeyboard';

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
    const isKeyboardOpen = useKeyboard();
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
                <MyText text='Forgot Password?' fontSize={22} fontFamily='medium' textColor={Colors.THEME_BLUE} style={{ marginTop: 5 }} />
                <MyText text={`Please Enter Your Registered Email ID`} fontSize={14} fontFamily='medium' textColor={Colors.THEME_GRAY} textAlign='center' style={{ marginTop: 10,marginButtom:10 }} />
                <MyText text={`We will send a 4 digit OTP on your registered email id`} fontSize={12} textColor={'#BCBBB7'} textAlign='center' style={{ marginTop: 10 }} />
                <MyTextInput
                    placeholder={'Email Address'}
                    value={forgotEmail}
                    setValue={setForgotEmail}
                    isIcon
                    icon={require('assets/images/email-icon.png')}
                    // onSubmitEditing={() => passwordRef.current.focus()}
                />
                <MyButton text={'Reset password'}
                    onPress={handleNext}
                    style={styles.buttonStyle}
                />
                {isKeyboardOpen ?
                <View style={{width:100,height:250}}  />
                : null
                }
                

              
            </View>
        </Modal>
    );
};

export default ForgotPasswordEnterEmail;