import React, { useState, useEffect } from 'react'
import {
    SafeAreaView, KeyboardAvoidingView,
    StyleSheet, View, FlatList, TouchableOpacity, Text
} from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarBack from '../../common/ToolbarBack'
import { requestAreaList } from '../../apis/Api'
import LinearProgressDialog from '../../common/LinearProgressDialog'
import AreaList from './AreaList'

const AreaListContainer = (props) => {

    const [localData, setLocalData] = useState({ loading: false, areaList: [], refreshing: false })

    useEffect(() => {
        serverRequestForAreaList()
    }, [])

    const serverRequestForAreaList = async () => {
        if (localData.loading) return
        setLocalData({ ...localData, loading: true })
        requestAreaList()
            .then(response => {
                if (response.status) {
                    setLocalData({ ...localData, loading: false, areaList: response.data, refreshing: false })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, error: error.message, refreshing: false })
            })
    }


    const navigateToAddAddress = (item) => {
        props.navigation.pop()
        props.navigation.navigate("addAddress", { addressData: item })
    }
    const onRefreshClick = () => {
        // setError(null)
        setLocalData({ ...localData, error: null, refreshing: true })
        serverRequestForAreaList()
    }

    return (
        <View style={[MStyles.main]}>
            <LinearProgressDialog loading={localData.loading} />
            <ToolbarBack {...props} title='Select Your Area' />
            {localData.areaList ?
                <AreaList
                    localData={localData}
                    refreshing={localData.refreshing}
                    navigateToAddAddress={navigateToAddAddress}
                    onRefreshClick={onRefreshClick}
                />
                :
                <View style={[MStyles.main, MStyles.center]}>
                    {localData.loading ? null :
                        <>
                            <Text style={[MStyles.txtSubTitle, { marginTop: 30 }]}>
                                {localData.error}
                            </Text>
                            <TouchableOpacity
                                onPress={onRefreshClick}
                                style={[MStyles.buttonSmallParent]}>
                                <Text style={MStyles.themeButtonSmall}> Refresh </Text>
                            </TouchableOpacity>
                        </>
                    }
                </View>
            }

        </View>
    )
}

export default AreaListContainer