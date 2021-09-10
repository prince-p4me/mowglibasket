import React, { useState, useEffect, useContext } from 'react'
import {
    TouchableOpacity, View, Text, Image,
    ScrollView, StyleSheet
} from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as AuthContext } from '../../../context/AuthContext'
import { requestSettings } from '../../../apis/Api'
// import EmptyLandingScreen from './EmptyLandingScreen'
import ToolbarBack from "../../../common/ToolbarBack";

const PrimeLoginSignUpInfo = (props) => {

    const { state: { user }, updateGuest } = useContext(AuthContext)
    const { navigation } = props
    const [data, setData] = useState({ loading: false, have_request: 0 })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setData({ ...data, loading: true })
            serverRequestForSettings()
        })
        return unsubscribe
    }, [navigation])

    const serverRequestForSettings = async () => {
        setData({ ...data, loading: true })
        requestSettings(user ? user.user_id : null)
            .then(async response => {
                // setLoading(false)
                if (response.status) {
                    setData({ ...data, loading: false, settings: response.data })
                } else {
                    setData({ ...data, loading: false })
                    alert(response.message)
                }
            })
            .catch(error => {
                setData({ ...data, loading: false })
                alert(error.message)
            })
    }

    const navigateToLogin = () => {
        props.navigation.pop()
        props.navigation.navigate("primeLogin")
    }
    const navigateToSignUp = () => {
        props.navigation.pop()
        props.navigation.navigate("addressType")
    }

    const requestAService = () => {
        // if (!user || (user && !user.prime_membership_id))
        //     props.navigation.navigate("addressType")
        // else
        // props.navigation.navigate("services")
    }

    const ViewServiceRequest = () => {
        props.navigation.navigate("drawer", { screen: 'main', params: { screen: 'myOrders' } })
    }

    return (
        <SafeAreaView style={[{ flex: 1 }]}>
            <View style={[MStyles.main, MStyles.center, { width: '100%' }]} >
                {/* <ProgressDialog loading={data.loading} /> */}
                <ToolbarBack {...props} title='Sign In / Sign Up' />

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    style={{ width: '100%' }}>
                    <>
                        {/* {data.loading
                            ? <EmptyLandingScreen />
                            : */}
                        <View style={[MStyles.main, MStyles.center, { alignSelf: 'center', width: '80%' }]} >

                            <Image
                                resizeMode='contain'
                                source={require('../../../images/splash_logo.png')}
                                style={{ width: '50%', height: undefined, aspectRatio: 1 }} />
                            <Text style={[MStyles.txtDescriptionBold, { textAlign: 'center', fontSize: 22 }]}>Prime Member?</Text>
                            <Text style={[MStyles.txtDescription, { textAlign: 'center' }]}>If you are already registred as prime member with us then sign in.</Text>
                            <TouchableOpacity activeOpacity={0.7}
                                style={[style.buttonParent, { padding: 0, marginTop: 16 }]}
                                onPress={navigateToLogin} >
                                <Text style={style.themeButton} > SIGN IN </Text>
                            </TouchableOpacity>

                            <View style={[MStyles.center, { width: '100%', marginVertical: 30 }]}>
                                <View style={MStyles.dividerDrawer} />
                                <Text style={[MStyles.txtDescriptionBold, { backgroundColor: Colors.white, position: 'absolute', paddingHorizontal: 16 }]}> OR </Text>
                            </View>

                            <Text style={[MStyles.txtDescription, { textAlign: 'center' }]}>If you are not registered as prime member then sign up.</Text>
                            <TouchableOpacity activeOpacity={0.7}
                                style={[style.buttonParent, { padding: 0, marginTop: 16 }]}
                                onPress={navigateToSignUp} >
                                <Text style={style.themeButton} > SIGN UP </Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                style={[style.buttonParent]}
                                onPress={requestAService}>
                                <Image
                                    resizeMode='contain'
                                    source={require('../../../images/request_service.png')}
                                    style={{ tintColor: 'white' }} />
                                <Text style={[style.themeButton]}>Sign In</Text>
                            </TouchableOpacity> */}
                        </View>
                        {/* } */}
                    </>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    buttonParent: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.primaryDark,
        overflow: 'visible'
    },
    themeButton: {
        textAlign: 'center',
        color: Colors.black,
        fontSize: 14,
        width: '100%',
        paddingVertical: 4,
        fontFamily: 'OpenSans-Bold'
    },
})

export default PrimeLoginSignUpInfo