import React, { useState, useRef, useEffect, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import ToolbarBack from '../../common/ToolbarBack'
import LinearProgressDialog from '../../common/LinearProgressDialog'
// import StateSelector from './StateSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckBox from '@react-native-community/checkbox'
import AddressOnMapModel from './AddressOnMapModel'
import { COLOR_DISABLED } from '../../common/Constants'
import { Context as AuthContext } from '../../context/AuthContext'

const AddressForm = (props) => {

    let { editHouseNo, editLandmark, editFirstName,
        editLastName, editPhone, editCity, editPin } = useRef()
    const { loading, onSubmit, area, address, setAddress, defaultAddress } = props
    const { state: { user }, updateUser, deleteUser } = useContext(AuthContext)

    const [checked, setChecked] = useState(defaultAddress);
    // const [user, setUser] = useState()
    const [mapVisibility, setMapVisibility] = useState(false)
    const [locationOnMap, setLocationOnMap] = useState()

    useEffect(() => {
        // getUser()
        const tempAddress = address
        if (!tempAddress.first_name || tempAddress.first_name === '') {
            tempAddress.first_name = user.first_name
        }
        if (!tempAddress.last_name || tempAddress.last_name === '') {
            tempAddress.last_name = user.last_name
        }
        setAddress({ ...tempAddress, default: defaultAddress ? 1 : 0 })
    }, [])

    // const getUser = async () => {
    //     // let data = await AsyncStorage.getItem('@user')
    //     // let userData = JSON.parse(data)
    //     // setUser(userData)
    // }

    const onLocationGet = (location) => {
        setMapVisibility(false)
        setLocationOnMap(location)
    }

    return (
        <SafeAreaView style={[MStyles.main]}>
            <KeyboardAvoidingView style={[MStyles.main]}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <ToolbarBack {...props} />
                <LinearProgressDialog loading={loading} />
                <AddressOnMapModel
                    visibility={mapVisibility}
                    setVisibility={setMapVisibility}
                    pincode={area ? area.pincode : address.pincode}
                    area={area ? area : address}
                    onLocationGet={onLocationGet} />

                <ScrollView
                    keyboardShouldPersistTaps='always'
                    style={[MStyles.main, { padding: 16 }]}>

                    {/* {
                        (area && (area.area_name.includes('Rangoli Garden') || area.area_name.includes('Rangoli Greens')))
                            ?
                            null
                            :
                            (address && (address.area_name.includes('Rangoli Garden') || address.area_name.includes('Rangoli Greens')))
                                ?
                                null
                                :
                                <View style={{ paddingBottom: 20 }}>

                                    <Text style={[MStyles.txtDescription, { padding: 13, color: Colors.black, textAlign: 'center' }]}>
                                        To deliver your order we need correct location please locate your location on map
                    </Text>

                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={[MStyles.cardView, MStyles.horizontal, MStyles.center, { alignSelf: 'baseline', alignSelf: 'center' }]}
                                        onPress={() => { setMapVisibility(!mapVisibility) }}>

                                        <Image source={require('../../images/google_map.png')} style={{ marginStart: 16 }} />
                                        <Text style={[MStyles.txtDescription, { padding: 13, color: Colors.black }]}>Click here to locate on MAP</Text>
                                    </TouchableOpacity>

                                </View>
                    } */}

                    <Text style={[MStyles.txtDescription, { marginTop: 20 }]}>First Name *</Text>
                    <TextInput
                        value={address.first_name
                            // !== '' ? address.first_name : user ? user.first_name : null
                        }
                        ref={editFirstName}
                        style={MStyles.textInput}
                        placeholder="First Name"
                        multiline={false}
                        returnKeyType='next'
                        onChangeText={txt => setAddress({ ...address, first_name: txt })}
                        onSubmitEditing={() => editLastName.focus()} />
                    <Text style={[MStyles.txtDescription, { marginTop: 16 }]}>Last Name </Text>
                    <TextInput
                        value={address.last_name
                            // !== '' ? address.last_name : user ? user.last_name : null
                        }
                        ref={input => editLastName = input}
                        style={MStyles.textInput}
                        placeholder="Last Name"
                        returnKeyType='next'
                        multiline={false}
                        onChangeText={txt => setAddress({ ...address, last_name: txt })}
                        onSubmitEditing={() => editHouseNo.focus()} />
                    <Text style={[MStyles.txtDescription, { marginTop: 16 }]}>House Number, Apartment *</Text>
                    <TextInput
                        value={address.address_1}
                        ref={input => editHouseNo = input}
                        style={MStyles.textInput}
                        placeholder="House Number, Apartment"
                        returnKeyType='next'
                        multiline={false}
                        onChangeText={txt => setAddress({ ...address, address_1: txt })}
                        onSubmitEditing={() => editLandmark.focus()} />
                    <Text style={[MStyles.txtDescription, { marginTop: 16 }]}>Landmark </Text>
                    <TextInput
                        value={address.address_2}
                        ref={input => editLandmark = input}
                        style={MStyles.textInput}
                        placeholder="Landmark"
                        returnKeyType='done'
                        multiline={false}
                        onChangeText={txt => setAddress({ ...address, address_2: txt })}
                        onSubmitEditing={() => editCity.focus()} />

                    <View style={{ backgroundColor: COLOR_DISABLED }}>
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}>  Area </Text>
                        <TextInput
                            value={area ? area.area_name : address.area_name}
                            ref={input => editCity = input}
                            style={MStyles.textInput}
                            placeholder="Area"
                            returnKeyType='next'
                            editable={false}
                            multiline={false}
                            onChangeText={txt => setAddress({ ...address, city: txt })}
                            onSubmitEditing={() => editPin.focus()} />
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}>  City </Text>
                        <TextInput
                            value={area ? area.city : address.city}
                            ref={input => editCity = input}
                            style={MStyles.textInput}
                            placeholder="City"
                            returnKeyType='next'
                            editable={false}
                            multiline={false}
                            onChangeText={txt => setAddress({ ...address, city: txt })}
                            onSubmitEditing={() => editPin.focus()} />
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}>  State </Text>
                        <TouchableOpacity
                            activeOpacity={0.5}                        >
                            <TextInput
                                style={MStyles.textInput}
                                value={area ? area.state : address ? address.state ? address.state : '' : ''}
                                placeholder="State"
                                returnKeyType='next'
                                editable={false}
                                onSubmitEditing={() => editLastName.focus()} />
                        </TouchableOpacity>
                        <Text style={[MStyles.txtDescription, { marginTop: 16 }]}>  Pincode </Text>
                        <TextInput
                            value={area ? area.pincode : address.postcode}
                            ref={input => editPin = input}
                            style={[MStyles.textInput]}
                            placeholder="Pincode"
                            multiline={false}
                            returnKeyType='done'
                            editable={false}
                            keyboardType='number-pad'
                            maxLength={6}
                            onChangeText={txt => setAddress({ ...address, postcode: txt })}
                        // onSubmitEditing={() => editPhone.focus()} 
                        />
                    </View>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        setAddress({ ...address, default: checked ? 0 : 1 })
                        setChecked(!checked)
                    }}>
                        <View style={[MStyles.horizontal, { marginTop: 16, marginBottom: 50 }]}>
                            <CheckBox
                                value={checked}
                                boxType='square'
                                onFillColor={Colors.primaryDark}
                                tintColor={Colors.primaryDark}
                                onTintColor={Colors.primaryDark}
                                onCheckColor={Colors.white}
                                style={{ height: 15, width: 15, marginTop: 3 }}
                                animationDuration={0.2}
                                disabled={true}
                                tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />
                            <Text style={[MStyles.txtDescription, { marginLeft: 20, flex: 1, color: Colors.textGray }]}>
                                Set this address as my default delivery address
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* <Text style={[MStyles.txtSubTitle, { marginTop: 16 }]}>Mobile Number </Text>
                    <TextInput
                        value={address.mobile}
                        ref={input => editPhone = input}
                        style={[MStyles.textInput, { marginBottom: 30 }]}
                        placeholder="Mobile Number"
                        multiline={false}
                        keyboardType='phone-pad'
                        onChangeText={txt => setAddress({ ...address, mobile: txt })}
                        maxLength={10} /> */}

                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[{ backgroundColor: Colors.primaryDark }]}
                    onPress={() => { onSubmit(address, locationOnMap, checked ? 1 : 0) }}>
                    <Text style={[MStyles.themeButton, { padding: 13 }]}>{props.title}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

AddressForm.defaultProps = {
    address: {
        id: "",
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        area_name: "",
        country: "",
        state_code: "",
        country_code: "",
        display_address: "",
        default: 0
    }
}

export default AddressForm