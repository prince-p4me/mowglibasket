import React, { useEffect, useState } from 'react'
import OTP from '../../components/login/OTP'
import RNOtpVerify from 'react-native-otp-verify'
import { Keyboard } from 'react-native'

const OTP = (props) => {
    const [otp, setOTP] = useState()
    // const [keyHash, setKeyHash] = useState()
    useEffect(() => {
        // getHash()
        startListenForOTP()
        return (() => RNOtpVerify.removeListener(otpHandler))
    }, [])

    // const getHash = () => {
    //     RNOtpVerify.getHash()
    //         .then(result => {
    //             setKeyHash(result)
    //         })
    //         .catch(error => {})
    // }

    const startListenForOTP = () => RNOtpVerify.getOtp().then(p => RNOtpVerify.addListener(otpHandler)).catch(p => {
    })

    const otpHandler = (message) => {
        const otp = /(\d{4})/g.exec(message)[1];
        setOTP(otp);
        RNOtpVerify.removeListener();
        Keyboard.dismiss();
    }

    return (
        <OTP {...props} otp={otp} />
    )
}

export default OTP