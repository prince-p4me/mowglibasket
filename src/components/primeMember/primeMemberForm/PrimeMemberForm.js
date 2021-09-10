import React, { useState, useContext, useEffect } from 'react'
import { TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearProgressDialog from '../../../common/LinearProgressDialog'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Context as AuthContext } from '../../../context/AuthContext'
import ToolbarBack from '../../../common/ToolbarBack'
import { COLOR_DISABLED } from '../../../common/Constants';
import { requestRegister, requestSettings } from '../../../apis/Api'
import { Platform } from 'react-native'
import RNOtpVerify from 'react-native-otp-verify'

const PrimeMemberForm = (props) => {

    const { state: { user, guest }, updateGuest } = useContext(AuthContext)

    // const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState(user ? user.first_name : null);
    const [email, setEmail] = useState(user ? user.user_email : null);
    const [phone, setPhone] = useState(user ? user.phone : null);
    const [code, setCode] = useState();
    const [keyHash, setKeyHash] = useState("")
    const [label, setLabel] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.first_name)
            setEmail(user.user_email)
            setPhone(user.phone)
        }
    }, [user])

    useEffect(() => {
        if (Platform.OS == 'android')
            getHash()
        serverRequestForSettings()
    }, [])

    const serverRequestForSettings = async () => {
        setLoading(true)
        requestSettings()
            .then(async response => {
                setLoading(false)
                if (response.status) {
                    setLabel(response.data.membership_desc_text)
                } else {
                    alert(response.message)
                }
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
    }

    const getHash = () => {
        RNOtpVerify.getHash()
            .then(result => {
                setKeyHash(result[0])
            })
            .catch(error => {
            })
    }

    const onSignUpClick = () => {

        if (user) {
            navigateToTerms()
            return
        }

        if (loading)
            return

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regPhone = /^[0]?[6789]\d{9}$/;
        if (name == undefined) { alert("Please enter your name") } else
            if (email == undefined) { alert("Please enter your email") } else
                if (!reg.test(email)) { alert("Please enter a valid email") } else
                    if (phone == undefined) { alert("Please enter your phone number") } else
                        if (!regPhone.test(phone)) { alert("Please enter valid phone number") } else
                            // if (code && refereChecked == false) { alert("Please agree with our reward points condition") } else
                            // if (!checked) { alert("Please agree to our conditions and privacy policy") } else
                            // serverRequestForRegistration()
                            navigateToTerms()
    }

    const navigateToTerms = () => {
        props.navigation.navigate("primeTerms", { name, email, phone, code, keyHash })
    }

    const serverRequestForRegistration = async () => {
        setLoading(true)
        let fcmToken = await AsyncStorage.getItem('@fcmToken')
        if (!fcmToken) fcmToken = 'abc'
        requestRegister(name, email, phone, fcmToken, props.keyhash, (Platform.OS == "ios") ? "ios" : "android", code)
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

    const navigateToAddressSelect = () => {
        props.navigation.navigate("selectHomeAddress")
    }

    const navigateToLogin = () => {
        props.navigation.navigate("primeLogin")
    }

    return (
        <SafeAreaView style={[MStyles.main, MStyles.center, { flex: 1 }]}>
            <LinearProgressDialog loading={loading} />
            <ToolbarBack title='Member Detail' {...props} />

            <ScrollView
                keyboardShouldPersistTaps='always'
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ width: '100%', padding: 16 }}  >
                <Animatable.View
                    animation='fadeInUpBig'
                    duration={500}
                    style={[MStyles.main]}>

                    {label && <Text style={[MStyles.txtDescriptionBold, { marginVertical: 16, color: Colors.black, textAlign: 'center' }]}>{label}</Text>}
                    <View style={[user ? { backgroundColor: COLOR_DISABLED, padding: 12 } : null]}>
                        <Text style={[MStyles.txtDescription]}> Name </Text>
                        <TextInput
                            value={name}
                            editable={user ? false : true}
                            onChangeText={(txt) => setName(txt)}
                            returnKeyType="next"
                            style={MStyles.textInput}
                            placeholder="Enter your full name here"
                            autoCapitalize='words'
                            multiline={false}
                            maxLength={100} />
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}> Email Address </Text>
                        <TextInput
                            editable={user ? false : true}
                            value={email}
                            onChangeText={(txt) => setEmail(txt)}
                            returnKeyType="next"
                            style={MStyles.textInput}
                            placeholder="Enter your email address"
                            multiline={false}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            maxLength={100} />
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}> Phone Number </Text>
                        <TextInput
                            value={phone}
                            editable={user ? false : true}
                            onChangeText={(txt) => setPhone(txt)}
                            returnKeyType="next"
                            style={MStyles.textInput}
                            placeholder="Enter your phone number"
                            multiline={false}
                            keyboardType='phone-pad'
                            maxLength={10} />
                        {!user && <>
                            <Text style={[MStyles.txtDescription, { marginTop: 16 }]}> Referral Code </Text>
                            <TextInput
                                value={code}
                                onChangeText={(txt) => setCode(txt)}
                                returnKeyType="done"
                                style={MStyles.textInput}
                                placeholder="Enter referral code"
                                multiline={false}
                                keyboardType='phone-pad'
                                maxLength={10} />
                        </>}
                    </View>

                    <TouchableOpacity activeOpacity={0.7} style={MStyles.buttonParent} onPress={onSignUpClick}>
                        <Text style={MStyles.themeButton}>Continue</Text>
                    </TouchableOpacity>

                    {!user &&
                        <Text style={[MStyles.txtDescription, { color: Colors.textGray, textAlign: 'center', marginTop: 30 }]}>Already have account?
                            <Text style={[MStyles.txtDescription, { color: Colors.primaryDark }]} onPress={navigateToLogin}> Sign In </Text>
                        </Text>
                    }
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PrimeMemberForm