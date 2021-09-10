import React, { useState, useContext } from 'react'
import {
    TouchableOpacity, Text, View, TextInput,
    ScrollView, KeyboardAvoidingView
} from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import * as Animatable from 'react-native-animatable';
import { requestLogin } from '../../apis/Api'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearProgressDialog from '../../common/LinearProgressDialog'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Context as AuthContext } from '../../context/AuthContext'

const Login = (props) => {

    const { state: { guest }, updateGuest } = useContext(AuthContext)

    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false)

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
        requestLogin(username, fcmToken, props.keyhash, (Platform.OS == "ios") ? "ios" : "android")
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
        props.navigation.navigate("otp", { user, message })
    }

    const continueAsGuest = () => {
        updateGuest()
        props.navigation.navigate("landingScreen")
    }

    return (
        <SafeAreaView style={[MStyles.center, { flex: 1 }]}>
            <LinearProgressDialog loading={loading} />
            <KeyboardAvoidingView
                style={[MStyles.mainAuth, { width: '100%' }]}
                behavior={Platform.OS === "ios" ? "padding" : "height"} >
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

                        <Text style={[MStyles.txtDescriptionBold, { margin: 16, marginTop: 20, color: Colors.textGray, textAlign: 'center' }]}>Don't have account?
                            <Text style={[MStyles.txtDescriptionBold, { color: Colors.primaryDark, textDecorationLine: 'underline' }]} onPress={() => { props.setSelected(2) }}> Sign Up </Text>
                        </Text>

                        {!guest &&
                            <>
                                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, marginTop: 20 }} >
                                    <View style={MStyles.dividerDrawer} />
                                    <Text style={[MStyles.txtDescriptionBold, { backgroundColor: Colors.white, position: 'absolute', padding: 10 }]}>OR</Text>
                                </View>
                                <Text style={[MStyles.txtDescription, { color: Colors.textGray, textAlign: 'center', margin: 16 }]}>If you don't want to login, you still can browse our application as guest.</Text>
                                <TouchableOpacity onPress={continueAsGuest}>
                                    <Text style={[MStyles.txtDescriptionBold, { color: Colors.black, textAlign: 'center', textDecorationLine: 'underline' }]}>Continue as Guest</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </Animatable.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login