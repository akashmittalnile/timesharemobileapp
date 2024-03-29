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
import { styles } from './ForgotPasswordEnterNewPasswordStyle';
import MyButton from 'components/MyButton/MyButton';
import MyTextInput from '../../components/MyTextInput/MyTextInput';

const ForgotPasswordEnterNewPassword = ({
    visible,
    changePass,
    setVisibility,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordRef
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
                <MyText text='Change Password' fontSize={24} fontFamily='medium' textColor={Colors.THEME_BLUE} style={{ marginTop: 5 }} />
                <MyText text={`Please Create New Login Password`} fontSize={12} textColor={'#BCBBB7'} textAlign='center' style={{ marginTop: 5 }} />
                <MyTextInput
                    placeholder={'New Password'}
                    value={newPassword}
                    setValue={setNewPassword}
                    isIcon
                    icon={require('assets/images/password-icon.png')}
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                // style={{ marginVertical: 0, marginBottom: 10, marginTop: 10 }}
                />
                <MyTextInput
                    inputRef={confirmPasswordRef}
                    placeholder={'Confirm Password'}
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    isIcon
                    icon={require('assets/images/confirm-password.png')}
                    style={{ marginVertical: 0, marginBottom: 15 }}
                />
                <MyButton text={'Reset password'}
                    onPress={changePass}
                    style={styles.buttonStyle}
                />
            </View>
        </Modal>
    );
};

export default ForgotPasswordEnterNewPassword;