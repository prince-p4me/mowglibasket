import React, { useEffect, useState } from 'react'
import Login from '../../components/login/Login'
import RNOtpVerify from 'react-native-otp-verify'

const Login = (props) => {
    const [otp, setOTP] = useState()
    const [keyHash, setKeyHash] = useState()
    useEffect(() => {
        getHash()
        // startListenForOTP()
        // return(()=>RNOtpVerify.removeListener())
    }, [])

    const getHash = () => {
        RNOtpVerify.getHash()
            .then(result => {
                setKeyHash(result)
            })
            .catch(error => {
            })
    }

    // const startListenForOTP = () => RNOtpVerify.getOtp().then(p => RNOtpVerify.addListener(otpHandler)).catch(p => {})

    // const otpHandler = (message) => {
    //     const otp = /(\d{4})/g.exec(message)[1];
    //     setOTP(otp);
    //     RNOtpVerify.removeListener();
    //     Keyboard.dismiss();
    // }



    return (
        <Login {...props} hash={keyHash} />
    )
}

export default Login