import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../styles/MStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../styles/Colors'
import CheckBox from '@react-native-community/checkbox'
import ToolbarBack from '../../common/ToolbarBack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { requestAddressList, requestDeleteAddress } from '../../apis/Api'
import { Alert } from 'react-native'
import { Context as AddressContext } from '../../context/AddressContext'
import { Context as ClickContext } from '../../context/ClickContext'
import EmptyAddressList from './EmptyAddressList'

const SelectHomeAddress = (props) => {

    const { state: { clicked }, setClicked, setAsyncClicked, setClickFree } = useContext(ClickContext)
    const { selectDeliveryAddress } = useContext(AddressContext)
    const [error, setError] = useState()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedAddress, setSelectedAddress] = useState()

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            serverRequestForAddressList()
        })
        return unsubscribe
    }, [])

    const serverRequestForAddressList = async () => {
        // if (loading) return
        setLoading(true)
        let userData = await AsyncStorage.getItem('@user')
        let user = JSON.parse(userData)
        requestAddressList(user.user_id)
            .then(response => {
                if (response.status) {
                    setData(response.data)
                    setSelectedAddress(response.data[0])
                    setError(null)
                } else {
                    setError(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setError(error.message)
            })
    }

    const deleteAddress = (id) => {
        Alert.alert("Confirm", "This address will be deleted",
            [
                {
                    text: 'Cancel',
                    onPress: () => { }
                }
                ,
                {
                    text: "Delete",
                    onPress: () => { serverRequestForDeleteAddress(id) }
                }
            ])
    }

    const serverRequestForDeleteAddress = async (id) => {

        if (loading) return
        setLoading(true)

        let userData = await AsyncStorage.getItem('@user')
        let user = JSON.parse(userData)

        requestDeleteAddress(user.user_id, id)
            .then(response => {
                if (response.status) {
                    setData(response.data)
                    setSelectedAddress(response.data[0])
                } else {
                    // setError(response.message)
                    alert(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                // setError(error.message)
                alert(error.message)
            })
    }

    const onAddNewAddressClick = () => {
        if (!clicked) {
            setClicked()
            props.navigation.navigate('areaList')
        }
    }

    const onPayNowClick = () => {
        if (!selectedAddress) {
            if (data && data.length() > 0)
                alert('please select your address')
            else
                alert('please add your address')
        }
        props.navigation.navigate('membershipCheckout', { selectedAddress: selectedAddress })
    }

    const Header = () => {
        return (
            <View style={[{ alignItems: 'center', paddingHorizontal: 16, padding: 10 }]}>

                {error ?
                    <Text style={[MStyles.txtDescription, { textAlign: 'center', padding: 20, color: Colors.textGray }]}
                    >No saved address found, please add a new address.
                    </Text>
                    : null}
                {/* <Text style={[MStyles.txtDescriptionBold]}>SAVED ADDRESSES</Text> */}
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={onAddNewAddressClick}
                    style={style.buttonParent}
                >
                    <View style={[MStyles.horizontal, MStyles.center, { alignSelf: 'center' }]}>
                        <Ionicons name='ios-add' size={24} color={Colors.black} />
                        <Text style={[MStyles.txtDescriptionBold, { fontWeight: '500', color: Colors.black }]}>ADD NEW ADDRESS</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={[MStyles.mainGray]}>
            <ToolbarBack {...props} title="Select Property Address" />
            {/* <ProgressDialog loading={loading} /> */}
            {
                loading
                    ?
                    <EmptyAddressList />
                    :
                    <>
                        {
                            data ?
                                <>
                                    <FlatList
                                        data={data}
                                        keyExtractor={(item, index) => JSON.stringify(item.id)}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    onPress={() => {
                                                        if (!clicked) {
                                                            setClicked()
                                                            setSelectedIndex(index)
                                                            setSelectedAddress(item)
                                                        }
                                                        // props.navigation.navigate('deliveryOption')
                                                    }} >
                                                    <View style={[MStyles.main, { marginVertical: 10, paddingVertical: 16, paddingHorizontal: 8, }]}>
                                                        <View style={[MStyles.horizontal]}>
                                                            <CheckBox
                                                                value={(selectedIndex == index)}
                                                                disabled={true}
                                                                boxType='square'
                                                                // lineWidth={3}
                                                                // onValueChange={updateOne}
                                                                onFillColor={Colors.primaryDark}
                                                                tintColor={Colors.primaryDark}
                                                                onTintColor={Colors.primaryDark}
                                                                onCheckColor={Colors.white}
                                                                style={{ height: 20, width: 20, marginVertical: 3 }}
                                                                animationDuration={0.2}
                                                                tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />
                                                            <View style={{ flex: 1, marginLeft: 10 }}>
                                                                <Text style={[MStyles.txtSubTitle, { color: Colors.black }]}>
                                                                    {item.first_name} {item.last_name}
                                                                </Text>
                                                                <Text style={[MStyles.txtSubTitleSemiBold, { color: Colors.black }]}>
                                                                    {item.display_address}
                                                                </Text>
                                                            </View>
                                                            <TouchableOpacity
                                                                activeOpacity={0.5}
                                                                style={{ padding: 10 }}
                                                                onPress={() => {
                                                                    if (!clicked) {
                                                                        setClicked()
                                                                        props.navigation.navigate('editAddress', { id: item.id, defaultAddress: index === 0, data: item })
                                                                    }
                                                                }} >
                                                                <EvilIcons name='pencil' size={30} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                activeOpacity={0.5}
                                                                style={{ padding: 10 }}
                                                                onPress={() => {
                                                                    if (!clicked) {
                                                                        setClicked()
                                                                        deleteAddress(item.id)
                                                                    }
                                                                }}>
                                                                <AntDesign name='delete' size={18} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <Text style={[MStyles.txtDescription, { marginHorizontal: 40 }]}>
                                                            {item.address}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                    <TouchableOpacity onPress={onPayNowClick} >
                                        {data.length ?
                                            <View style={[MStyles.horizontal]}>
                                                <View style={[MStyles.horizontal, MStyles.center, { flex: 1, padding: 13, alignItems: "center", backgroundColor: Colors.primaryDark }]}>
                                                    <Text style={[MStyles.txtSubTitleSemiBold, { color: Colors.white }]}> Next </Text>
                                                </View>
                                            </View> : null}
                                    </TouchableOpacity>
                                </>
                                : <Header />
                        }
                    </>
            }
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

export default SelectHomeAddress