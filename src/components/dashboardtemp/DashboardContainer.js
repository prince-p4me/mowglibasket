import React, { useState, useEffect, useContext } from 'react'
import { Alert, Linking } from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarMain from '../../common/ToolbarMain'
import { SafeAreaView } from 'react-native-safe-area-context'
import { requestHome, requestHomeNew, requestHomeCopy } from '../../apis/Api'
import { Context as AuthContext } from '../../context/AuthContext'
import Dashboard from './Dashboard'
import Placeholder from './Placeholder'
import { getBuildNumber } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorView from "../../common/ErrorView";

const DashboardContainer = (props) => {

    // console.log('.........., dashboard')
    const { state: { user }, deleteUser } = useContext(AuthContext)
    const [localData, setLocalData] = useState({ loading: true })

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

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarMain {...props} />
            {
                localData.loading
                    ?
                    <Placeholder {...props} />
                    :
                    localData?.data
                        ?
                        <Dashboard
                            {...props}
                            homeData={localData.data.data.home_page_manager_data}
                            response={localData.data}
                            user={user}
                        />
                        :
                        <ErrorView message={localData.error} />
            }
        </SafeAreaView>
    )
}

export default DashboardContainer