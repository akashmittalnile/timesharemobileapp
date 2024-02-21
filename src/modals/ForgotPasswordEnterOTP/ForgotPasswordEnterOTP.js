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
import { styles } from './ForgotPasswordEnterOTPStyle';
import MyButton from 'components/MyButton/MyButton';
import MyTextInput from '../../components/MyTextInput/MyTextInput';

const ForgotPasswordEnterOTP = ({
    visible,
    setVisibility,
    openNewPasswordModal,
    firstCode,
    secondCode,
    thirdCode,
    forthCode,
    setFirstCode,
    setSecondCode,
    setThirdCode,
    setForthCode,
    firstCodeRef,
    secondCodeRef,
    thirdCodeRef,
    forthCodeRef,
    errorMessage2,
    setErrorMessage2
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
                <MyText text={`Please Enter 4 Digit OTP Received In Your Registered Email ID`} fontSize={12} textColor={'#BCBBB7'} textAlign='center' style={{ marginTop: 5 }} />
                <View style={styles.flexRowView}>
                    <TextInput
                        placeholder=""
                        ref={firstCodeRef}
                        value={firstCode}
                        onTouchStart={() => {
                            errorMessage2 ? setErrorMessage2('') : null
                        }
                        }
                        maxLength={1}
                        keyboardType="number-pad"
                        onChangeText={text => {
                            setFirstCode(text);
                            if (text.length == 1) {
                                secondCodeRef.current.focus();
                            } else {
                                firstCodeRef.current.focus();
                            }
                        }}
                        onSubmitEditing={() => secondCodeRef.current.focus()}
                        style={{
                            ...styles.textInputStyle,
                            // borderTopLeftRadius: 20,
                            // borderBottomLeftRadius: 20,
                            color: Colors.THEME_GRAY,
                            borderWidth: firstCode == '' ? 1 : 1,
                            borderColor: firstCode == '' ? '#D9D9D9' : Colors.THEME_BLUE,
                        }}
                    />
                    <TextInput
                        ref={secondCodeRef}
                        value={secondCode}
                        onTouchStart={() => {
                            errorMessage2 ? setErrorMessage2('') : null
                        }
                        }
                        placeholder={''}
                        placeholderTextColor={
                            secondCode == '' ? Colors.BLACK : Colors.WHITE
                        }
                        maxLength={1}
                        keyboardType="number-pad"
                        onChangeText={text => {
                            setSecondCode(text);
                            if (text.length == 1) {
                                thirdCodeRef.current.focus();
                            } else {
                                firstCodeRef.current.focus();
                            }
                        }}
                        onSubmitEditing={() => thirdCodeRef.current.focus()}
                        style={{
                            ...styles.textInputStyle,
                            color: Colors.THEME_GRAY,
                            borderWidth: secondCode == '' ? 1 : 1,
                            borderColor: secondCode == '' ? '#D9D9D9' : Colors.THEME_BLUE,
                        }}
                    />
                    <TextInput
                        ref={thirdCodeRef}
                        value={thirdCode}
                        onTouchStart={() => {
                            errorMessage2 ? setErrorMessage2('') : null
                        }
                        }
                        placeholder={''}
                        placeholderTextColor={
                            thirdCode == '' ? Colors.BLACK : Colors.WHITE
                        }
                        maxLength={1}
                        keyboardType="number-pad"
                        onChangeText={text => {
                            setThirdCode(text);
                            if (text.length == 1) {
                                forthCodeRef.current.focus();
                            } else {
                                secondCodeRef.current.focus();
                            }
                        }}
                        onSubmitEditing={() => forthCodeRef.current.focus()}
                        style={{
                            ...styles.textInputStyle,
                            color: Colors.THEME_GRAY,
                            borderWidth: thirdCode == '' ? 1 : 1,
                            borderColor: thirdCode == '' ? '#D9D9D9' : Colors.THEME_BLUE,
                        }}
                    />
                    <TextInput
                        ref={forthCodeRef}
                        value={forthCode}
                        placeholder=""
                        onTouchStart={() => {
                            errorMessage2 ? setErrorMessage2('') : null
                        }
                        }
                        placeholderTextColor={
                            forthCode == '' ? Colors.BLACK : Colors.WHITE
                        }
                        maxLength={1}
                        keyboardType="number-pad"
                        onChangeText={text => {
                            setForthCode(text);
                            if (text.length == 1) {
                                Keyboard.dismiss();
                            } else {
                                thirdCodeRef.current.focus();
                            }
                        }}
                        style={{
                            ...styles.textInputStyle,
                            // borderTopRightRadius: 20,
                            // borderBottomRightRadius: 20,
                            color: Colors.THEME_GRAY,
                            borderWidth: forthCode == '' ? 1 : 1,
                            borderColor: forthCode == '' ? '#D9D9D9' : Colors.THEME_BLUE,
                        }}
                    />
                </View>
                {errorMessage2 ? (
                    <MyText
                        text={errorMessage2}
                        // fontFamily="bold"
                        textColor={'red'}
                        fontSize={14}
                        textAlign="center"
                    // marginBottom={10}
                    />
                ) : null}
                <MyButton text={'Validated OTP'}
                    onPress={openNewPasswordModal}
                    style={styles.buttonStyle}
                />
            </View>
        </Modal>
    );
};

export default ForgotPasswordEnterOTP;