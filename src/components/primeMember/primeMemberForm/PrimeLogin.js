import React, { useState, useEffect, useContext } from 'react'
import {
    SafeAreaView, View, TouchableOpacity,
    TextInput, ScrollView, Text, Platform
} from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import RNOtpVerify from 'react-native-otp-verify'
import { fcmService } from '../../../fcm/FcmService'
import Icon from 'react-native-vector-icons/Ionicons'
import { Context as AuthContext } from '../../../context/AuthContext'
import LinearProgressDialog from '../../../common/LinearProgressDialog'
import * as Animatable from 'react-native-animatable';
import { requestLogin } from '../../../apis/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PrimeLogin = (props) => {

    const { state: { guest }, updateGuest } = useContext(AuthContext)
    const [keyhash, setKeyHash] = useState("")

    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (Platform.OS == 'android')
            getHash()
        fcmService.getDeviceToken()
        return () => {
            fcmService.unsubscribe()
        }
    }, [])

    const getHash = () => {
        RNOtpVerify.getHash()
            .then(result => {
                setKeyHash(result[0])
            })
            .catch(error => {
            })
    }

    const onLoginClick = () => {
        if (loading)
            return
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regPhone = /^[0]?[6789]\d{9}$/;
        if (username == undefined) { alert("Please enter your name") } else
            if (!reg.test(username) && !regPhone.test(username)) { alert("Please enter a valid email or phone number") } else
                serverRequestForLogin()
    }

    const serverRequestForLogin = async () => {
        // return
        setLoading(true)
        let fcmToken = await AsyncStorage.getItem('@fcmToken')
        if (!fcmToken) fcmToken = 'abc'
        requestLogin(username, fcmToken, keyhash, (Platform.OS == "ios") ? "ios" : "android")
            .then(response => {
                if (response.status) {
                    navigateToOTP(response.data, response.message)
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

    const navigateToOTP = (user, message) => {
        props.navigation.navigate("primeMemberFormOTP", { user, message })
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <LinearProgressDialog loading={loading} />
            <View style={[MStyles.authTabParent, MStyles.center, { paddingLeft: 16, paddingRight: 16 }]}>
                {
                    guest &&
                    <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                        <Icon name='arrow-back-outline' size={28} color={Colors.white} />
                    </TouchableOpacity>
                }
                <View style={{ flex: 1 }} />
                <View style={MStyles.authTabSeleted}>
                    <Text style={[MStyles.txtDescription, { color: Colors.white }]}>Sign In</Text>
                </View>
            </View>
            <ScrollView
                keyboardShouldPersistTaps='always'
                contentContainerStyle={{ flexGrow: 1 }}  >
                <Animatable.View
                    animation='fadeInUp'
                    duration={500}
                    style={[MStyles.authHeader, { justifyContent: 'flex-end' }]}>
                    <Text style={[MStyles.txtTitle, { color: Colors.white }]}> Welcome Back,</Text>
                    <Text style={[MStyles.txtDescription, { color: Colors.white, marginTop: 5 }]} > Sign in to continue </Text>
                </Animatable.View>
                <Animatable.View
                    animation='fadeInUpBig'
                    duration={500}
                    style={[MStyles.authFooter]}>
                    <Text style={[MStyles.txtSubTitleSemiBold]}> Email or phone number </Text>
                    <TextInput
                        style={MStyles.textInput}
                        placeholder="Enter email or phone number"
                        multiline={false}
                        keyboardType='email-address'
                        returnKeyType='go'
                        autoCapitalize='none'
                        onChangeText={(txt) => setUsername(txt)}
                        onSubmitEditing={() => onLoginClick()} />

                    <TouchableOpacity activeOpacity={0.7} style={MStyles.buttonParent} onPress={() => onLoginClick()}>
                        <Text style={MStyles.themeButton}>Login Using OTP</Text>
                    </TouchableOpacity>

                    <Text style={[MStyles.txtDescriptionBold, { margin: 16, color: Colors.black, textAlign: 'center' }]}>Don't have account?
                        <Text style={[MStyles.txtDescriptionBold, { color: Colors.black }]} onPress={() => { props.navigation.pop() }}> Sign Up </Text>
                    </Text>

                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PrimeLogin