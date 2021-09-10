import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import ToolbarBack from '../../../common/ToolbarBack'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearProgressDialog from '../../../common/LinearProgressDialog'
import ErrorView from '../../../common/ErrorView'
import { requestPrimeTermsAndConditions } from '../../../apis/Api'
import CheckBox from '@react-native-community/checkbox'
import { requestRegister } from '../../../apis/Api'
import { Context as AuthContext } from '../../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PrimeTerms = (props) => {

    const { name, email, phone, code, keyHash } = props.route.params
    const [loading, setLoading] = useState()
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [checked, setChecked] = useState(false);
    const { state: { user, guest }, updateGuest } = useContext(AuthContext)

    useEffect(() => {
        if (loading) return
        setLoading(true)
        requestPrimeTermsAndConditions()
            .then(response => {
                if (response.status) {
                    setData(response.data)
                } else {
                    alert(response.message)
                    setError(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
                setError(error.message)
            })
    }, [])

    const onSignUpClick = () => {

        if (user) {
            if (!checked)
                alert("Please agree to our terms & conditions")
            else
                navigateToAddressSelect()
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
                            if (!checked) { alert("Please agree to our terms & conditions") } else
                                serverRequestForRegistration()
        // navigateToTerms()
    }

    const serverRequestForRegistration = async () => {
        setLoading(true)
        let fcmToken = await AsyncStorage.getItem('@fcmToken')
        if (!fcmToken) fcmToken = 'abc'
        requestRegister(name, email, phone, fcmToken, props.keyhash, (Platform.OS == "ios") ? "ios" : "android", code)
            .then(response => {
                setLoading(false)
                if (response.status) {
                    navigateToOTP(response.data, response.message)
                } else {
                    alert(response.message)
                }
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
    }

    const navigateToOTP = (user, message) => {
        props.navigation.pop()
        props.navigation.navigate("primeMemberFormOTP", { user, message })
    }
    const navigateToAddressSelect = () => {
        props.navigation.pop()
        props.navigation.navigate("selectHomeAddress")
    }
    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarBack {...props} title={data ? data.post_title : ""} />
            <LinearProgressDialog loading={loading} />
            <View style={[MStyles.main]}>
                {
                    data ?
                        <ScrollView>
                            <View>
                                <Text style={[MStyles.txtDescriptionBold, { paddingHorizontal: 16, paddingTop: 16 }]}>
                                    Please read our prime membership terms and conditions carefully. Scroll down and accept our terms and conditions to complete sign up process. 
                                </Text>
                                <Text style={[MStyles.txtDescription, { paddingHorizontal: 16, paddingTop: 16 }]}>
                                    {data.post_content}
                                </Text>

                                <TouchableOpacity onPress={() => setChecked(!checked)}>
                                    <View style={[MStyles.horizontal, { marginTop: 16, marginEnd: 16 }]}>
                                        <CheckBox
                                            value={checked}
                                            boxType='square'
                                            onFillColor={Colors.primaryDark}
                                            tintColor={Colors.primaryDark}
                                            onTintColor={Colors.primaryDark}
                                            onCheckColor={Colors.white}
                                            disabled={true}
                                            style={{ height: 15, width: 15, marginTop: 3, marginLeft: 10 }}
                                            animationDuration={0.2}
                                            tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />
                                        <Text style={[MStyles.txtDescription, { marginLeft: 16, color: Colors.textGray }]}>Agree with our terms & conditions</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={[{ width: '100%', padding: 16 }]} onPress={onSignUpClick}>
                                    <TouchableOpacity style={[MStyles.buttonParent, { width: undefined, flex: 1, marginTop: 0 }]} onPress={onSignUpClick}>
                                        <Text style={MStyles.themeButton}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                        :
                        error ? <ErrorView message={error} /> : null}
            </View>
        </SafeAreaView>
    )
}

export default PrimeTerms