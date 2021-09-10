import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../../styles/MStyles'
import { View, FlatList, RefreshControl, Alert } from 'react-native'
import LinearProgressDialog from '../../../common/LinearProgressDialog'
import { requestServicesList, requestAServices } from '../../../apis/Api'
import ErrorView from '../../../common/ErrorView'
import ToolbarBack from '../../../common/ToolbarBack'
import ServicesItem from './ServicesItem'
import { Context as AuthContext } from '../../../context/AuthContext'
import EmptyServicesList from './EmptyServicesList'

const ServicesList = (props) => {

    const { state: { user } } = useContext(AuthContext)
    const [localData, setLocalData] = useState({ loading: false, refreshing: false, progress: false })

    useEffect(() => {
        serverRequestForServices()
    }, [])

    const serverRequestForServices = async () => {
        setLocalData({ ...localData, loading: true })
        requestServicesList(user ? user.user_id : null)
            .then(response => {
                if (response.status) {
                    setLocalData({
                        ...localData, loading: false, refreshing: false, services: response.data.services, data: response.data
                    })
                } else {
                    setLocalData({ ...localData, error: response.message, loading: false, refreshing: false, })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, error: error.message, refreshing: false })
            })
    }

    const serverRequestForAService = async (service) => {
        setLocalData({ ...localData, progress: true })
        requestAServices(user.user_id, service)
            .then(response => {
                if (response.status) {
                    setLocalData({ ...localData, progress: false })
                    navigateToSuccess(response)
                } else {
                    setLocalData({ ...localData, error: response.message, progress: false })
                    alert(response.message)
                }
            })
            .catch(error => {
                setLocalData({ ...localData, progress: false, error: error.message })
                alert(error.message)
            })
    }

    const pullTorefresh = () => {
        setLocalData({ ...localData, refreshing: true, services: null })
        serverRequestForServices()
    }

    const onServiceClicked = (service) => {
        if (user && !user.prime_membership_id)
            props.navigation.navigate("addressType")
        else if (!user || (user && !user.prime_membership_id))
            props.navigation.navigate("primLoginSignUpInfo")
        else
            if (service.id == '12693') {
                props.navigation.navigate('timeSlots',
                    {
                        timeSlots: localData.data.service_time_slot,
                        serviceDates: localData.data.service_date,
                        service: service
                    })
            } else {
                confirm(service)
            }
    }

    const confirm = (service) => {
        Alert.alert(
            "",
            "Do you want to request this service?",
            [
                {
                    text: "Cancel",
                    onPress: () => { }
                },
                {
                    text: 'Request',
                    onPress: () => {
                        serverRequestForAService(service)
                    }
                }
            ]
        )
    }

    const navigateToSuccess = (response) => {
        props.navigation.navigate('servicesRequestSuccess', { response: response })
    }

    const renderItem = ({ item }) => {
        return <ServicesItem
            {...props}
            item={item}
            loading={localData.loading}
            refreshing={localData.refreshing}
            isLoadingMore={localData.isLoadingMore}
            onServiceClicked={onServiceClicked} />
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarBack {...props} title="Select a Service" />
            <View style={[MStyles.main]}>
                <LinearProgressDialog loading={localData.progress} />
                {localData.loading ?
                    <EmptyServicesList />
                    : <>
                        {localData.services ?
                            <FlatList
                                numColumns={2}
                                style={{ marginVertical: 5 }}
                                columnWrapperStyle={{ paddingVertical: 5, paddingHorizontal: 5, justifyContent: 'space-around' }}
                                showsVerticalScrollIndicator={false}
                                data={localData.services}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                refreshControl={<RefreshControl refreshing={localData.refreshing} onRefresh={() => pullTorefresh()} />}
                            />
                            : localData.error ? <ErrorView message={localData.error} /> : null
                        }
                    </>
                }
            </View>
        </SafeAreaView>
    )
}

export default ServicesList