import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import Login from './Login'
import Register from './Register'
import RNOtpVerify from 'react-native-otp-verify'
import { fcmService } from '../../fcm/FcmService'
import Icon from 'react-native-vector-icons/Ionicons'
import { Context as AuthContext } from '../../context/AuthContext'
import { Platform } from 'react-native'

const Auth = (props) => {

    const { state: { guest } } = useContext(AuthContext)
    const [keyHash, setKeyHash] = useState("")
    const [selected, setSelected] = useState(props?.route?.params?.isLogin ? 1 : 2)

    // log("Login params", JSON.stringify(props?.route?.params?.isLogin))

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

    const signInClick = () => {
        if (selected != 1) setSelected(1)
    }

    const signUpClick = () => {
        if (selected != 2) setSelected(2)
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <View style={[MStyles.authTabParent, MStyles.center, { paddingLeft: 16, paddingRight: 16 }]}>
                {
                    guest &&
                    <TouchableOpacity onPress={() => { props.navigation.navigate('home') }}>
                        <Icon name='arrow-back-outline' size={28} color={Colors.white} />
                    </TouchableOpacity>
                }
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => signUpClick()}>
                    <View style={selected == 2 ? MStyles.authTabSeleted : MStyles.authTab}>
                        <Text style={[MStyles.txtDescription, { color: Colors.white }]}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => signInClick()}>
                    <View style={selected == 1 ? MStyles.authTabSeleted : MStyles.authTab}>
                        <Text style={[MStyles.txtDescription, { color: Colors.white }]}>Sign In</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {selected == 1
                ? <Login {...props} keyhash={keyHash} setSelected={setSelected} />
                : <Register {...props} keyhash={keyHash} setSelected={setSelected} />}
        </SafeAreaView>
    )
}

export default Auth