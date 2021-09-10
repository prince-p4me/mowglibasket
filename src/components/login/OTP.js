import React, { useState, useRef, useEffect, useContext } from 'react'
import {
    View, TouchableOpacity, Text, TextInput,
    ScrollView, Keyboard
} from 'react-native'
import MStyles from '../../styles/MStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../../styles/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { requestSubmitOtp, requestResendOtp } from '../../apis/Api'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearProgressDialog from '../../common/LinearProgressDialog'

import RNOtpVerify from 'react-native-otp-verify'
import { Context as AuthContext } from '../../context/AuthContext'
import { Platform } from 'react-native'

const RESEND_OTP_TIME_LIMIT = 60; // 60 secs

const OTP = (props) => {

    const { state: { guest }, updateUser } = useContext(AuthContext)

    const { user_id } = props.route.params.user;
    const { phone } = props.route.params.user;
    const { message } = props.route.params;
    let resentOtpTimerInterval
    const [otpArray, setOtpArray] = useState(['', '', '', '']);
    const [attemptsRemaining, setAttemptsRemaining] = useState(3);
    // const [userData, setUserData] = useState(false)
    const [loading, setLoading] = useState(false)
    // in secs, if value is greater than 0 then button will be disabled
    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(RESEND_OTP_TIME_LIMIT);
    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);
    const thirdInputRef = useRef(null);
    const fourthInputRef = useRef(null);

    useEffect(() => {
        if (Platform.OS == 'android') {
            startListeningForOtp()
            return RNOtpVerify.removeListener()
        }
    }, [])

    const startListeningForOtp = () =>
        RNOtpVerify.getOtp()
            // .then(p => RNOtpVerify.addListener(otpHandler))
            .then(p => RNOtpVerify.addListener(message => {
                try {
                    if (message) {
                        const messageLine = message.split('\n')
                        const words = messageLine[0].split(' ')
                        const otp = words[words.length - 1]
                        if (otp && otp.length == 4) {
                            const array = otp.toString().split('')
                            array.map((item, index) => {
                                const otpArrayCopy = array.concat();
                                otpArrayCopy[index] = item;
                                setOtpArray(otpArrayCopy);
                            })
                            serverRequestForOTPVerify(otp)
                        }
                    }
                } catch (error) {
                    // console.warn("Error aa gyi")
                }
            }))
            .catch(p => {
            });

    useEffect(() => {
        startResentOtpTimer()
        return () => {
            if (resentOtpTimerInterval) {
                clearInterval(resentOtpTimerInterval)
            }
        }
    }, [resendButtonDisabledTime])

    const startResentOtpTimer = () => {
        if (resentOtpTimerInterval) {
            clearInterval(resentOtpTimerInterval)
        }
        resentOtpTimerInterval = setInterval(() => {
            if (resendButtonDisabledTime <= 0) {
                clearInterval(resentOtpTimerInterval)
            } else {
                setResendButtonDisabledTime(resendButtonDisabledTime - 1)
            }
        }, 1000)
    }

    const onResendOTPClicked = () => {
        if (firstInputRef) {
            setOtpArray(['', '', '', ''])
            // firstInputRef.current.focus()
            setAttemptsRemaining(attemptsRemaining - 1)
        }
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT)
        startResentOtpTimer()
        // API CAll here
        serverRequestForResendOTP()
    }

    const onVerifyClick = () => {

        if (loading)
            return
        let otp = true;
        let otpString = ''
        otpArray.map((item, index) => {
            if (item === '') {
                if (otp)
                    alert("Please enter a valid OTP");
                otp = false;
                return
            }
            otpString = otpString + item
        })

        if (otpString.length == 4)
            serverRequestForOTPVerify(otpString)
    }

    const serverRequestForOTPVerify = (otp) => {
        setLoading(true)
        requestSubmitOtp(user_id, otp)
            .then(response => {
                setLoading(false)

                if (response.status) {
                    AsyncStorage.setItem('@user', JSON.stringify(response.data.user_info))
                    updateUser(response.data.user_info)
                    if (guest) {
                        // props.navigation.navigate("cart")
                        props.navigation.pop(2)
                        props.navigation.navigate("drawer",
                            {
                                screen: 'main',
                                params: { screen: 'home', params: { screen: 'cart' } }
                            })
                    } else {
                        props.navigation.pop(2)
                        props.navigation.navigate("landingScreen")
                    }
                    // crashlytics().setUserId(user_id)
                    if (Platform.OS == 'android')
                        RNOtpVerify.removeListener()
                } else {
                    alert(response.message)
                }
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
    }

    const serverRequestForResendOTP = () => {
        setLoading(true)
        requestResendOtp(user_id)
            .then(response => {
                if (response.status) {
                    alert(response.message)
                } else {
                    alert(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
    }

    // only backspace key press event is fired on Android
    // to have consistency, using this event just to detect backspace key press and
    // onOtpChange for other digits press
    const onOtpKeyPress = index => {

        return ({ nativeEvent: { key: value } }) => {
            // auto focus to previous InputText if value is blank and existing value is also blank
            if ((value === 'Backspace' || value === 'backspace') && otpArray[index] === '') {
                if (index === 1) {
                    firstInputRef.current.focus();
                } else if (index === 2) {
                    secondInputRef.current.focus();
                } else if (index === 3) {
                    thirdInputRef.current.focus();
                } else if (index === 4) {
                    Keyboard.dismiss()
                }

                /**
                 * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
                 * doing this thing for us
                 * todo check this behaviour on ios
                 */
                // if (isAndroid && index > 0) {
                //   const otpArrayCopy = otpArray.concat();
                //   otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
                //   setOtpArray(otpArrayCopy);
                // }
            }
        }
    }

    const onOtpChange = index => {
        return value => {
            if (isNaN(Number(value))) {
                // do nothing when a non digit is pressed
                return;
            }
            const otpArrayCopy = otpArray.concat();
            otpArrayCopy[index] = value;
            setOtpArray(otpArrayCopy);

            // auto focus to next InputText if value is not blank
            if (value !== '') {
                if (index === 0) {
                    secondInputRef.current.focus();
                } else if (index === 1) {
                    thirdInputRef.current.focus();
                } else if (index === 2) {
                    fourthInputRef.current.focus();
                }
            }
        };
    }

    return (
        <View style={[MStyles.center, { flex: 1 }]}>
            <LinearProgressDialog loading={loading} />
            <SafeAreaView style={[MStyles.mainAuth, { width: '100%' }]}>
                <View style={[MStyles.authTabParent, MStyles.center]}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.goBack()} style={{ padding: 6 }}>
                            <SimpleLineIcons name='arrow-left' size={24} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={[MStyles.main, { backgroundColor: Colors.primaryDark }]}>
                    <View
                        style={[MStyles.authHeader, { justifyContent: 'flex-end' }]}>
                        <Text style={[MStyles.txtTitle, { color: Colors.white }]}>Verification code</Text>
                        <Text style={[MStyles.txtDescription, { color: Colors.white, marginTop: 5 }]} >
                            {message}
                        </Text>
                    </View>
                    <View style={[MStyles.authFooter]}>
                        <View style={[MStyles.horizontal, MStyles.center, { marginTop: 20 }]}>
                            {
                                [firstInputRef, secondInputRef, thirdInputRef, fourthInputRef]
                                    .map((inputRef, index) => (
                                        <TextInput
                                            style={MStyles.textInputOTP}
                                            multiline={false}
                                            maxLength={1}
                                            keyboardType='number-pad'
                                            value={otpArray[index]}
                                            // autoFocus={index === 0 ? true : undefined}
                                            ref={inputRef}
                                            key={index}
                                            onKeyPress={onOtpKeyPress(index)}
                                            onChangeText={onOtpChange(index)}
                                        />
                                    ))
                            }
                        </View>

                        <TouchableOpacity activeOpacity={0.7} style={MStyles.buttonParent} onPress={() => onVerifyClick()}>
                            <Text style={MStyles.themeButton}>Verify OTP</Text>
                        </TouchableOpacity>

                        <View style={[MStyles.center, { marginTop: 20 }]}>
                            {resendButtonDisabledTime > 0
                                ?
                                <Text style={MStyles.txtDescription}>Resend OTP in {resendButtonDisabledTime} </Text>
                                :
                                attemptsRemaining > 0
                                    ?
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => onResendOTPClicked()}>
                                        <Text style={[MStyles.txtSubTitle, { color: Colors.primaryDark }]}>Resend OTP</Text>
                                    </TouchableOpacity>
                                    : null
                            }
                            <Text style={[MStyles.txtDescription, { marginTop: 5 }]}>({attemptsRemaining || 0} Attemps Remaining)</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default OTP