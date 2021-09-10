import React, { useState, useContext } from 'react'
import {
    TouchableOpacity, Text, View,
    TextInput, ScrollView, KeyboardAvoidingView,
    StyleSheet
} from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import * as Animatable from 'react-native-animatable';
import { requestLogin } from '../../apis/Api'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearProgressDialog from '../../common/LinearProgressDialog'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Context as AuthContext } from '../../context/AuthContext'
import ToolbarBack from '../../common/ToolbarBack';
import Icon from 'react-native-vector-icons/Ionicons'

const WriteUs = (props) => {

    // const { state: { user } } = useContext(AuthContext)

    const [reason, setReason] = useState();
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false)

    // const onLoginClick = () => {
    //     if (loading)
    //         return
    //     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     const regPhone = /^[0]?[6789]\d{9}$/;
    //     if (username == undefined) { alert("Please enter your name") } else
    //         if (!reg.test(username) && !regPhone.test(username)) { alert("Please enter a valid email or phone number") } else
    //             serverRequestForLogin()
    // }

    // const serverRequestForLogin = async () => {
    //     // return
    //     setLoading(true)
    //     let fcmToken = await AsyncStorage.getItem('@fcmToken')
    //     if (!fcmToken) fcmToken = 'abc'
    //     requestLogin(username, fcmToken, props.keyhash, (Platform.OS == "ios") ? "ios" : "android")
    //         .then(response => {
    //             if (response.status) {
    //                 // navigateToOTP(response.data, response.message)
    //             } else {
    //                 alert(response.message)
    //             }
    //             setLoading(false)
    //         })
    //         .catch(error => {
    //             setLoading(false)
    //             alert(error.message)
    //         })
    // }


    return (
        <SafeAreaView style={[MStyles.center, { flex: 1 }]}>
            <LinearProgressDialog loading={loading} />
            <ToolbarBack {...props} title='Write Us' />
            <KeyboardAvoidingView
                style={[MStyles.main, { width: '100%' }]}
                behavior={Platform.OS === "ios" ? "padding" : "height"} >
                <ScrollView
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={{ flexGrow: 1 }}  >
                    <View style={{ padding: 16 }}>
                        <Text style={[MStyles.txtSubTitleSemiBold]}> Email or phone number </Text>
                        {/* <TextInput
                            style={[MStyles.textInput]}
                            placeholder="Enter email or phone number"
                            multiline={false}
                            keyboardType='email-address'
                            returnKeyType='go'
                            autoCapitalize='none'
                            // onChangeText={(txt) => setUsername(txt)}
                            onSubmitEditing={() => { }} /> */}

                        <View style={[MStyles.cardView, MStyles.horizontal,
                        { alignItems: 'center', marginTop: 10 }]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Select topic"
                            />
                            <Icon name='chevron-down' size={24} style={{ margin: 10 }} />
                        </View>

                        <TextInput
                            style={styles.inputMessage}
                            placeholder="Type message here"
                            multiline={true}
                            numberOfLines={5}
                        />

                        <TouchableOpacity activeOpacity={0.7} style={MStyles.buttonParent} onPress={() => onLoginClick()}>
                            <Text style={MStyles.themeButton}>Login Using OTP</Text>
                        </TouchableOpacity>
                        <Text style={[MStyles.txtDescriptionBold, { margin: 16, marginTop: 20, color: Colors.textGray, textAlign: 'center' }]}>Don't have account?
                            <Text style={[MStyles.txtDescriptionBold, { color: Colors.primaryDark, textDecorationLine: 'underline' }]} onPress={() => { props.setSelected(2) }}> Sign Up </Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {/* {loading ? <ActivityIndicator size='large' style={{ position: 'absolute' }} /> : null} */}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    input: {
        ...MStyles.txtDescription,
        // ...MStyles.cardView,
        // borderColor: Colors.textDarkGray,
        // borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flex: 1
    },
    inputMessage: {
        ...MStyles.txtDescription,
        ...MStyles.cardView,
        // borderColor: Colors.textDarkGray,
        // borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flex: 1,
        marginTop:16,
        textAlignVertical:'top'
    }
})

export default WriteUs