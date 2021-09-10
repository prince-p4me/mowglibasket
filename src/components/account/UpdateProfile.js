import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarBack from '../../common/ToolbarBack'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CheckBox from '@react-native-community/checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearProgressDialog from '../../common/LinearProgressDialog'
import DatePickerDialog from '../../common/DatePickerDialog'
import ErrorView from '../../common/ErrorView'
import { requestUserDetails, requestUpdateUserDetails } from '../../apis/Api'
import Moment from 'moment'
import { MAX_INPUT_LENGTH } from '../../common/Constants'

const UpdateProfile = (props) => {

    const [localData, setLocalData] = useState({ checked: false, modalVisible: false })
    const [user, setUser] = useState()
    // const [serverDate, setServerDate] = useState()
    // const [modalVisible, setModalVisible] = useState(false)

    // const [displayDate, setDisplayDate] = useState()
    // const [checked, setChecked] = useState(false);
    // const [loading, setLoading] = useState()
    // const [firstName, setFirstName] = useState()
    // const [lastName, setLastName] = useState()
    // const [error, setError] = useState()

    // const [phone, setPhone] = useState()
    // const [email, setEmail] = useState()

    useEffect(() => {
        serverRequestForAccountDetails()
    }, [])

    const serverRequestForAccountDetails = async () => {
        if (localData.loading)
            return

        // setLoading(true)
        setLocalData({ ...localData, loading: true })
        let temp = await AsyncStorage.getItem("@user")
        let user = JSON.parse(temp)

        requestUserDetails(user.user_id)
            .then(response => {
                if (response.status) {

                    setLocalData({
                        ...localData, firstName: response.data.first_name, lastName: response.data.last_name, loading: false,
                        checked: response.data.email_subscription == "1"
                    })
                    // setFirstName(response.data.first_name)
                    // setLastName(response.data.last_name)
                    // setPhone(response.data.phone)
                    // setEmail(response.data.user_email)
                    // setChecked(response.data.email_subscription == "1")
                    setUser(response.data)
                    if (response.data.user_dob) {
                        // setDisplayDate(response.data.user_dob)
                        Moment.locale('en');
                        setLocalData({ ...localData, displayDate: response.data.user_dob, loading: false })
                    }

                } else {
                    // alert(response.message)
                    // setError(response.message)
                    setLocalData({ ...localData, loading: false, error: response.message })
                }
                // setLoading(false)
            })
            .catch(error => {
                // setLoading(false)
                setLocalData({ ...localData, loading: false, error: error.message })
                // alert(response.message)
                // setError(error.message)
            })
    }

    const hideDatePicker = () => {
        // setModalVisible(false)
        setLocalData({ ...localData, modalVisible: false })
    }

    const setDisplay = (newDate) => {
        // setDisplayDate(newDate)
        setLocalData({ ...localData, displayDate: newDate })
    }

    const setServerDates = (newDate) => {
        // setServerDate(newDate);
        setLocalData({ ...localData, serverDate: newDate })
    }

    const onUpdateClick = () => {
        if (localData.loading)
            return
        if (!localData.firstName && !localData.firstName.trim()) { alert("Please enter your first name") } else
            if (!localData.lastName) { alert("Please enter your last name") } else
                if (!localData.displayDate && !localData.serverDate) { alert("Please select your date of birth") } else
                    serverRequestForUpdateAccount()
    }

    const serverRequestForUpdateAccount = async () => {
        if (localData.loading)
            return
        // setLoading(true)
        setLocalData({ ...localData, loading: true })
        requestUpdateUserDetails(user.user_id, localData.firstName, localData.lastName, localData.serverDate, localData.checked ? "1" : "0")
            .then(response => {
                if (response.status) {
                    AsyncStorage.setItem("@user", JSON.stringify(response.data))
                    setUser(response.data)

                    setTimeout(() => {
                        alert(response.message);
                    }, 500);
                    setLocalData({ ...localData, loading: false })
                } else {
                    // alert(response.message)
                    // setError(response.message)
                    setLocalData({ ...localData, loading: false, error: response.message })
                }
                // setLoading(false)
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, error: error.message })
                // setLoading(false)
                // alert(response.message)
                // setError(error.message)
            })
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarBack {...props} title={props.route.params.title} />
            <LinearProgressDialog loading={localData.loading} />
            <DatePickerDialog
                setServerDate={setServerDates}
                visibility={localData.modalVisible}
                hideDatePicker={hideDatePicker}
                setDisplayDate={setDisplay} />

            <View style={[MStyles.main]}>
                {user ?
                    <>
                        <ScrollView
                            keyboardShouldPersistTaps='always'
                        >
                            <View style={[MStyles.main, { padding: 16 }]}>
                                {/* <View style={[MStyles.horizontal]}>
                                    <View style={[{ flex: .5, marginRight: 8 }]}>
                                        <Text style={[MStyles.txtSubTitle]}> Enter First Name </Text>
                                        <TextInput
                                            style={MStyles.textInput}
                                            placeholder="Enter first name"
                                            multiline={false}
                                            value={firstName}
                                            maxLength={MAX_INPUT_LENGTH}
                                            onChangeText={(txt) => {
                                                setFirstName(txt)
                                            }} />
                                    </View>
                                    <View style={[{ flex: .5, marginLeft: 8 }]}>
                                        <Text style={[MStyles.txtSubTitle]}> Enter Last Name </Text>
                                        <TextInput
                                            style={MStyles.textInput}
                                            placeholder="Enter last name"
                                            multiline={false}
                                            value={lastName}
                                            maxLength={MAX_INPUT_LENGTH}
                                            onChangeText={(txt) => setLastName(txt)} />
                                    </View>
                                </View> */}

                                <Text style={[MStyles.txtSubTitle]}> Enter First Name </Text>
                                <TextInput
                                    style={MStyles.textInput}
                                    placeholder="Enter first name"
                                    multiline={false}
                                    value={localData.firstName}
                                    maxLength={MAX_INPUT_LENGTH}
                                    onChangeText={(txt) => {
                                        // setFirstName(txt)
                                        setLocalData({ ...localData, firstName: txt })
                                    }} />

                                <Text style={[MStyles.txtSubTitle, { marginTop: 16 }]}> Enter Last Name </Text>
                                <TextInput
                                    style={MStyles.textInput}
                                    placeholder="Enter last name"
                                    multiline={false}
                                    value={localData.lastName}
                                    maxLength={MAX_INPUT_LENGTH}
                                    onChangeText={(txt) =>
                                    // setLastName(txt)
                                    { setLocalData({ ...localData, lastName: txt }) }
                                    } />
                                <Text style={[MStyles.txtSubTitle, { marginTop: 16 }]}> Phone Number </Text>
                                <TextInput style={[MStyles.textInput, user.phone ? { backgroundColor: "#eeeeee" } : {}]} placeholder="Enter number" multiline={false} editable={false} keyboardType='phone-pad' maxLength={10}
                                    value={user.phone}
                                    onChangeText={(txt) => setPhone(txt)} />
                                <Text style={[MStyles.txtSubTitle, { marginTop: 16 }]}> Email Address </Text>
                                <TextInput style={[MStyles.textInput, user.user_email ? { backgroundColor: "#eeeeee" } : {}]} placeholder="Enter email" multiline={false} editable={false} keyboardType='email-address'
                                    value={user.user_email}
                                    onChangeText={(txt) => setEmail(txt)} />

                                <Text style={[MStyles.txtSubTitle, { marginTop: 16 }]}> Date Of Birth </Text>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                    if (!user.user_dob)
                                        // setModalVisible(!modalVisible)
                                        setLocalData({ ...localData, modalVisible: !localData.modalVisible })
                                }} >
                                    <View style={[MStyles.horizontal, { justifyContent: 'flex-end', alignItems: 'flex-end' }]}>
                                        <TextInput style={[MStyles.textInput, { flex: 1 }, user.user_dob ? { backgroundColor: "#eeeeee" } : {}]} editable={false} placeholder="Date of Birth (MM/DD/YYYY)"
                                            value={localData.displayDate} />
                                        <AntDesign name='calendar' size={24} style={{ position: 'absolute', padding: 8 }} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.5} onPress={() =>
                                    // setChecked(!checked)
                                    setLocalData({ ...localData, checked: !localData.checked })
                                }>
                                    <View style={[MStyles.horizontal, { marginTop: 20 }]}>
                                        <CheckBox
                                            disabled={true}
                                            value={localData.checked}
                                            boxType='square'
                                            onFillColor={Colors.primaryDark}
                                            tintColor={Colors.primaryDark}
                                            onTintColor={Colors.primaryDark}
                                            onCheckColor={Colors.white}
                                            style={{ height: 15, width: 15, marginTop: 5 }}
                                            animationDuration={0.2}
                                            tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />
                                        <Text style={[MStyles.txtDescription, { marginLeft: 16, color: Colors.textGray }]}>
                                            Send me emails on promotions, offers and services
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[{ backgroundColor: Colors.primaryDark }]}
                            onPress={() => onUpdateClick()}>
                            <Text style={MStyles.themeButton}>UPDATE</Text>
                        </TouchableOpacity>
                    </>
                    : localData.error ? <ErrorView message={localData.error} /> : null}
            </View>
        </SafeAreaView >
    )
}

export default UpdateProfile