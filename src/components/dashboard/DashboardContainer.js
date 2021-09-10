import React, { useState, useEffect, useContext } from 'react'
import { Text, Alert, Linking } from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarMain from '../../common/ToolbarMain'
import { SafeAreaView } from 'react-native-safe-area-context'
import { requestHomeCopy } from '../../apis/Api'
// import { Context as CartContext } from '../../context/CartContext'
import { Context as AuthContext } from '../../context/AuthContext'
// import { Platform, UIManager, LayoutAnimation } from 'react-native'
import Dashboard from './Dashboard'
import Placeholder from './Placeholder'
import DataUpdater from './DataUpdater'
import { log } from '../../common/Utils'
import { getBuildNumber } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage'

// if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const DashboardContainer = (props) => {

    // const { state: {
    //     // cart,
    //     data,
    //     //   cartTotal 
    // }, updateHomeAndCartData, updateCartAndTotal, clearCart } = useContext(CartContext)
    const { state: { user }, deleteUser } = useContext(AuthContext)
    const [localData, setLocalData] = useState({ loading: true })

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setLocalData({ ...localData, error: null, loading: true })
    //         serverRequestForCart()
    //     })
    //     return unsubscribe
    // }, [navigation])

    useEffect(() => {
        serverRequestForHomeData()
    }, [])

    const serverRequestForHomeData = async () => {
        // if (localData.loading)
        //     return
        // setLocalData({ ...localData, loading: true, error: null })
        requestHomeCopy(user ? user.user_id : null)
            .then(response => {
                if (response.status) {
                    // setReceivedData(response)
                    // dataUpdater(response)
                    setLocalData({ ...localData, loading: false, data: response })
                    if (response.data.session_status == 0) {
                        onSessionExpired()
                    } else {
                        if (Platform.OS == 'android')
                            askForUpdate(response.data?.app_version_code)
                    }
                } else {
                    setLocalData({ ...localData, loading: false, error: response.message })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, error: error.message })
            })
    }

    log("Home", JSON.stringify(localData))
    const onSessionExpired = () => {
        Alert.alert(
            "Session expired",
            "Your session has expired. Please login again to continue.",
            [
                // {
                //     text: "Cancel",
                //     onPress: () => { }
                // },
                {
                    text: 'Login',
                    onPress: async () => {
                        deleteUser()
                        AsyncStorage.removeItem('@user')
                    }
                }
            ],
            { cancelable: false }
        )
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

    // const setReceivedData = async (response) => {
    //     // await AsyncStorage.setItem('@user', JSON.stringify(response.data.user_info))
    //     updateHomeAndCartData(response.data, response.data.cart_data)
    // }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarMain {...props} />
            <DataUpdater response={localData?.data} />
            {
                localData.loading ?
                    <Placeholder {...props} /> :
                    localData?.data
                        ?
                        <Dashboard
                            {...props}
                            homeData={localData.data.data.home_page_manager_data}
                            user={user}
                        />
                        : <Text>Data Empty</Text>
            }
        </SafeAreaView>
    )
}

export default DashboardContainer