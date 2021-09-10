import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../../styles/MStyles'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { requestAServices } from '../../../apis/Api'
import ToolbarBack from '../../../common/ToolbarBack'
import { Context as AuthContext } from '../../../context/AuthContext'
import Colors from '../../../styles/Colors'
import LinearProgressDialog from '../../../common/LinearProgressDialog'

const TimeSlots = (props) => {

    const { timeSlots, serviceDates, service } = props.route.params
    const { state: { user } } = useContext(AuthContext)
    const [localData, setLocalData] = useState({ loading: false })

    const serverRequestForService = async () => {
        setLocalData({ ...localData, loading: true })
        requestAServices(user.user_id, service, localData.date, localData.time)
            .then(response => {
                if (response.status) {
                    setLocalData({
                        ...localData, loading: false, services: response.data.services
                    })
                    navigateToSuccess(response)
                } else {
                    setLocalData({ ...localData, error: response.message, loading: false })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, error: error.message })
            })
    }

    const onServiceRequestClicked = () => {
        if (!localData.date) {
            alert('Please select date')
        } else if (!localData.time) {
            alert('Please select time slot')
        } else {
            // alert("You have requested " + service.title)
            serverRequestForService()
        }
    }

    const navigateToSuccess = (response) => {
        props.navigation.navigate('servicesRequestSuccess', { response: response })
    }

    const DateItem = ({ item }) => {
        return (
            <View style={{ alignSelf: 'baseline' }}>
                <TouchableOpacity
                    onPress={() => setLocalData({ ...localData, date: item })}
                    style={[MStyles.cardView, { margin: 10 }, localData.date && (localData.date.date === item.date) ? { backgroundColor: Colors.primaryDark } : { backgroundColor: Colors.white }]}>
                    <Text style={[MStyles.txtDescriptionBold, { padding: 12 }, localData.date && (localData.date.date === item.date) ? { color: Colors.white } : { color: Colors.black }]}>{item.display_date}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const TimeSlotItem = ({ item }) => {
        return (
            <View >
                <TouchableOpacity
                    onPress={() => setLocalData({ ...localData, time: item })}
                    style={[MStyles.cardView, { margin: 10, alignSelf: 'baseline' }, localData.time && (localData.time.id === item.id) ? { backgroundColor: Colors.primaryDark } : { backgroundColor: Colors.white }]} >
                    <Text style={[MStyles.txtDescriptionBold, { padding: 12 }, localData.time && (localData.time.id === item.id) ? { color: Colors.white } : { color: Colors.black }]}>{item.time}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarBack {...props} title="Service Timing" />
            <LinearProgressDialog loading={localData.loading} />
            <View style={[MStyles.main]}>
                {/* {
                    localData.loading ?
                        <EmptyServicesList />
                        :
                        <> */}
                {
                    timeSlots &&
                    <>
                        <View style={[MStyles.main, { padding: 16 }]}>
                            <Text style={[MStyles.txtDescription, { textAlign: 'center' }]}>Please select date and time slot according to your availability.</Text>
                            <Text style={[MStyles.txtDescriptionBold, { marginTop: 16, marginBottom: 5 }]}>Select Date</Text>
                            <View >
                                <FlatList
                                    horizontal
                                    style={{ alignSelf: 'baseline' }}
                                    data={serviceDates}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={DateItem} />
                            </View>
                            <Text style={[MStyles.txtDescriptionBold, { marginTop: 12, marginBottom: 5 }]}>Select Time Slot</Text>
                            <FlatList
                                data={timeSlots}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={TimeSlotItem} />
                        </View>
                        <View style={[MStyles.horizontal]}>
                            <TouchableOpacity
                                onPress={onServiceRequestClicked}
                                style={[MStyles.horizontal, MStyles.center, { flex: 1, padding: 13, alignItems: "center", backgroundColor: Colors.primaryDark }]}>
                                <Text style={[MStyles.txtSubTitleSemiBold, { color: Colors.white }]}> Request </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
                {/* </>
                } */}
            </View>
        </SafeAreaView>
    )
}

export default TimeSlots