import React, { useState, useEffect, useContext } from 'react'
import {
    TouchableOpacity, View, Text, Image,
    ScrollView, StyleSheet, Alert, Linking, Platform
} from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as AuthContext } from '../../context/AuthContext'
import { requestSettings } from '../../apis/Api'
import EmptyLandingScreen from './EmptyLandingScreen'
import { getBuildNumber } from 'react-native-device-info';

const LandingScreen = (props) => {

    const { state: { user }, updateGuest } = useContext(AuthContext)
    const { navigation } = props
    const [data, setData] = useState({ loading: false, have_request: 0 })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (user) {
                setData({ ...data, loading: true })
                serverRequestForSettings()
            }
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
                    if (Platform.OS == 'android')
                        askForUpdate(response.data?.app_version_code)
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

    const navigateToDasboard = () => {
        props.navigation.navigate("drawer")
    }

    const requestAService = () => {
        props.navigation.navigate("services")
    }

    const ViewServiceRequest = () => {
        props.navigation.navigate("drawer", { screen: 'main', params: { screen: 'myOrders' } })
    }

    const askForUpdate = async (app_version_code) => {

        const buildNumber = await getBuildNumber()

        if (buildNumber < app_version_code) {
            Alert.alert(
                "Update",
                "A new version of application is available on play store. Please update application to continue",
                [
                    {
                        text: 'Update',
                        onPress: () => {
                            Linking.openURL("https://play.google.com/store/apps/details?id=com.mowglibasket&hl=en")
                        }
                    }
                ],
                { cancelable: false }
            )
        }
    }

    return (
        <SafeAreaView style={[{ flex: 1 }]}>
            <View style={[MStyles.main, MStyles.center, { width: '100%' }]} >
                {/* <ProgressDialog loading={data.loading} /> */}
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    style={{ width: '100%' }}>
                    <>
                        {data.loading
                            ? <EmptyLandingScreen />
                            :
                            <View style={[MStyles.main, MStyles.center, { alignSelf: 'center', width: '80%' }]} >
                                <Image
                                    resizeMode='contain'
                                    source={require('../../images/splash_logo.png')}
                                    style={{ width: '50%', height: undefined, aspectRatio: 1 }} />
                                <Text style={[MStyles.txtDescriptionBold, { color: Colors.textDarkGray, marginTop: 10, textAlign: 'center' }]}>Want to purchase fruits and vegetables and grocery?</Text>
                                <TouchableOpacity
                                    style={[style.buttonParent, { marginTop: 10 }]}
                                    onPress={navigateToDasboard}>
                                    <Image
                                        resizeMode='contain'
                                        source={require('../../images/cart.png')}
                                        style={{ tintColor: 'white', width: 30, height: 30 }} />
                                    <Text style={[style.themeButton]}>BUY FRUITS, VEGETABLES & GROCERY</Text>
                                </TouchableOpacity>
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, backgroundColor: 'red' }} >
                                    <View style={[MStyles.dividerDrawer]} />
                                    <Text style={[MStyles.txtDescriptionBold, { backgroundColor: Colors.white, position: 'absolute', padding: 10 }]}>OR</Text>
                                </View>
                                <Text style={[MStyles.txtDescriptionBold, { color: Colors.textDarkGray, textAlign: 'center', margin: 10, marginTop: 20 }]}>Want to avail our services?</Text>
                                <TouchableOpacity
                                    style={[style.buttonParent, { marginTop: 0 }]}
                                    onPress={requestAService}>
                                    <Image
                                        resizeMode='contain'
                                        source={require('../../images/request_service.png')}
                                        style={{ tintColor: 'white', width: 30, height: 30 }} />
                                    <Text style={[style.themeButton]}>REQUEST A SERVICE</Text>
                                </TouchableOpacity>
                                {
                                    data.settings && data.settings.have_request == 1 &&
                                    <TouchableOpacity
                                        style={[style.buttonParent]}
                                        onPress={ViewServiceRequest}>
                                        <Image
                                            resizeMode='contain'
                                            source={require('../../images/request_service.png')}
                                            style={{ tintColor: 'white', width: 30, height: 30 }} />
                                        <Text style={[style.themeButton]}>VIEW SERVICE REQUESTS</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        }
                    </>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    buttonParent: {
        width: '100%',
        alignItems: 'center',
        // flexDirection: 'row',
        marginTop: 20,
        // padding: 15,
        padding: 8,
        borderRadius: 5,
        backgroundColor: Colors.primaryDark,
        shadowColor: Colors.black,
        overflow: "visible",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    themeButton: {
        color: Colors.white,
        fontSize: 16,
        marginStart: 15,
        fontFamily: 'OpenSans-Bold',
        marginTop: 5,
        textAlign: 'center'
    },
})

export default LandingScreen