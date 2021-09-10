import React, { useState, useContext } from 'react'
import {
    TouchableOpacity, Text, TextInput,
    ScrollView, View, KeyboardAvoidingView, Platform
} from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import * as Animatable from 'react-native-animatable';
import CheckBox from '@react-native-community/checkbox'
import { requestRegister, requestSettings } from '../../apis/Api'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearProgressDialog from '../../common/LinearProgressDialog'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Context as AuthContext } from '../../context/AuthContext'

const Register = (props) => {

    const { state: { guest }, updateGuest } = useContext(AuthContext)

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [checked, setChecked] = useState(false);
    const [code, setCode] = useState();
    const [refereChecked, setReferChecked] = useState(true);
    const [refereLabel, setRefereLabel] = useState('If you will not enter referral code then you will not get reward points on sign up');

    // const [userData, setUserData] = useState(false)
    const [loading, setLoading] = useState(false)

    const serverRequestForSettings = async () => {
        setLoading(true)
        requestSettings()
            .then(async response => {
                setLoading(false)
                if (response.status) {
                    await AsyncStorage.setItem("@referralText", response.data.signup_checkbox_label)
                    setRefereLabel(response.data.signup_checkbox_label)
                } else {
                    alert(response.message)
                }
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
    }

    const onSignUpClick = () => {

        if (loading)
            return

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regPhone = /^[0]?[6789]\d{9}$/;
        if (name == undefined) { alert("Please enter your name") } else
            if (email == undefined) { alert("Please enter your email") } else
                if (!reg.test(email)) { alert("Please enter a valid email") } else
                    if (phone == undefined) { alert("Please enter your phone number") } else
                        if (!regPhone.test(phone)) { alert("Please enter valid phone number") } else
                            if (!code && refereChecked == false) { alert("Please agree with our reward points condition") } else
                                if (!checked) { alert("Please agree to our terms & conditions and privacy policy") } else
                                    serverRequestForRegistration()
    }

    const serverRequestForRegistration = async () => {
        setLoading(true)
        let fcmToken = await AsyncStorage.getItem('@fcmToken')
        if (!fcmToken) fcmToken = 'abc'
        requestRegister(name, email, phone, fcmToken, props.keyhash, (Platform.OS == "ios") ? "ios" : "android", code)
            .then(response => {
                if (response.status) {
                    // setUserData(response.data)
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
                style={[MStyles.mainAuth]}
                behavior={Platform.OS === "ios" ? "padding" : "height"} >
                <ScrollView
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={{ flexGrow: 1 }}  >
                    <Animatable.View animation='fadeInUp' duration={500}
                        // <View
                        style={[MStyles.authHeader, { justifyContent: 'flex-end' }]}>
                        <Text style={[MStyles.txtTitle, { color: Colors.white }]}> Hey, get on board</Text>
                        <Text style={[MStyles.txtDescription, { color: Colors.white, marginTop: 5 }]} > Sign up to continue </Text>
                    </Animatable.View>
                    <Animatable.View animation='fadeInUpBig' duration={500}
                        // <Animatable.View
                        style={[MStyles.authFooter]}>
                        <Text style={[MStyles.txtDescription]}> Name </Text>
                        <TextInput onChangeText={(txt) => setName(txt)} returnKeyType="next" style={MStyles.textInput} placeholder="Enter your full name here" multiline={false} maxLength={100} />
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}> Email Address </Text>
                        <TextInput onChangeText={(txt) => setEmail(txt)} returnKeyType="next" style={MStyles.textInput} placeholder="Enter your email address" multiline={false} keyboardType='email-address' maxLength={100} autoCapitalize='none' />
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}> Phone Number </Text>
                        <TextInput onChangeText={(txt) => setPhone(txt)} returnKeyType="next" style={MStyles.textInput} placeholder="Enter your phone number" multiline={false} keyboardType='phone-pad' maxLength={10} />
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}> Referral Code </Text>
                        <TextInput onChangeText={(txt) => setCode(txt)} returnKeyType="done" style={MStyles.textInput} placeholder="Enter referral code" multiline={false} keyboardType='phone-pad' maxLength={10} />

                        {/* <TouchableOpacity activeOpacity={0.5} onPress={() => setReferChecked(!refereChecked)}>
                            <View style={[MStyles.horizontal, { marginTop: 16 }]}>
                                <CheckBox
                                    value={refereChecked}
                                    boxType='square'
                                    onFillColor={Colors.primaryDark}
                                    tintColor={Colors.primaryDark}
                                    onTintColor={Colors.primaryDark}
                                    onCheckColor={Colors.white}
                                    disabled={true}
                                    style={{ height: 15, width: 15, marginTop: 3 }}
                                    animationDuration={0.2}
                                    tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />
                                <Text style={[MStyles.txtDescription, { marginLeft: 16, color: Colors.textGray }]}>
                                    {refereLabel}
                                </Text>
                            </View>
                        </TouchableOpacity> */}

                        <TouchableOpacity activeOpacity={0.5} onPress={() => setChecked(!checked)}>
                            <View style={[MStyles.horizontal, { marginTop: 16 }]}>
                                <CheckBox
                                    value={checked}
                                    boxType='square'
                                    onFillColor={Colors.primaryDark}
                                    tintColor={Colors.primaryDark}
                                    onTintColor={Colors.primaryDark}
                                    onCheckColor={Colors.white}
                                    disabled={true}
                                    style={{ height: 15, width: 15, marginTop: 3 }}
                                    animationDuration={0.2}
                                    tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />
                                <Text style={[MStyles.txtDescription, { marginLeft: 16, color: Colors.textGray }]}>By signing up you agree with our
                             <Text style={[MStyles.txtDescription, { color: Colors.primaryDark }]} onPress={() => { props.navigation.navigate('terms') }}> terms & conditions </Text>
                             and
                            <Text style={[MStyles.txtDescription, { color: Colors.primaryDark }]} onPress={() => { props.navigation.navigate('policy') }}> privacy policy </Text>
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} style={MStyles.buttonParent} onPress={() => onSignUpClick()}>
                            <Text style={MStyles.themeButton}>SIGN UP</Text>
                        </TouchableOpacity>

                        <Text style={[MStyles.txtDescriptionBold, { margin: 16, marginTop: 20, color: Colors.textGray, textAlign: 'center' }]}>Already have an account?
                            <Text style={[MStyles.txtDescriptionBold, { color: Colors.primaryDark, textDecorationLine: 'underline' }]} onPress={() => { props.setSelected(1) }}> Sign In </Text>
                        </Text>

                        {!guest &&
                            <>
                                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, marginTop: 20 }} >
                                    <View style={MStyles.dividerDrawer} />
                                    <Text style={[MStyles.txtDescriptionBold, { backgroundColor: Colors.white, position: 'absolute', padding: 10 }]}>OR</Text>
                                </View>
                                <Text style={[MStyles.txtDescription, { color: Colors.textGray, textAlign: 'center', margin: 16 }]}>If you don't want to register, you still can browse our application as guest.</Text>
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

export default Register