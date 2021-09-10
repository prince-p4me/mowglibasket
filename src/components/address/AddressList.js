import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import CheckBox from '@react-native-community/checkbox'
import { requestAddressList, requestDeleteAddress } from '../../apis/Api'
import LinearProgressDialog from '../../common/LinearProgressDialog'
import ToolbarBack from '../../common/ToolbarBack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Alert } from 'react-native'
import EmptyAddressList from './EmptyAddressList'

const AddressList = (props) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [data, setData] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedAddress, setSelectedAddress] = useState()

    useEffect(() => {
        // setError(null)
        // setLoading(true)
        // serverRequestForAddressList()
        const unsubscribe = props.navigation.addListener('focus', () => {
            // setLoading(true)
            serverRequestForAddressList()
        })
        return unsubscribe
    }, [])

    const serverRequestForAddressList = async () => {
        if (loading) return
        setLoading(true)
        let userData = await AsyncStorage.getItem('@user')
        let user = JSON.parse(userData)
        requestAddressList(user.user_id)
            .then(response => {
                if (response.status) {
                    setData(response.data)
                    setSelectedAddress(response.data[0])
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
                    setError(response.message)
                    alert(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setError(error.message)
            })
    }

    const Header = () => {
        return (
            <View style={[MStyles.horizontal, { alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10 }]}>
                <Text style={[MStyles.txtDescriptionBold]}>SAVED ADDRESSES</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => { props.navigation.navigate('areaList') }}>
                    <View style={[MStyles.horizontal, MStyles.center]}>
                        <Ionicons name='ios-add' size={24} color={Colors.primaryDark} />
                        <Text style={[MStyles.txtDescription, { color: Colors.primaryDark }]}>ADD NEW ADDRESS</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={[MStyles.mainGray]}>
            <ToolbarBack {...props} title="Address" />
            <View style={[MStyles.divider, { backgroundColor: Colors.primaryDark }]} />
            <LinearProgressDialog loading={loading} />
            {
                loading ? <EmptyAddressList /> :
                    <>
                        {data ?
                            <>
                                <FlatList
                                    data={data}
                                    ListHeaderComponent={() => <Header />}
                                    keyExtractor={(item, index) => JSON.stringify(item.id)}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                setSelectedIndex(index)
                                                setSelectedAddress(item)
                                            }} >
                                                <View style={[MStyles.main, { marginVertical: 10, paddingVertical: 16, paddingHorizontal: 8, }]}>
                                                    <View style={[MStyles.horizontal]}>
                                                        <CheckBox
                                                            value={(selectedIndex == index)}
                                                            disabled={true}
                                                            boxType='square'
                                                            onFillColor={Colors.primaryDark}
                                                            tintColor={Colors.primaryDark}
                                                            onTintColor={Colors.primaryDark}
                                                            onCheckColor={Colors.white}
                                                            style={{ height: 20, width: 20, marginVertical: 3 }}
                                                            animationDuration={0.2}
                                                            tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />

                                                        <View style={{ flex: 1, marginLeft: 16 }}>
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
                                                            onPress={() => { props.navigation.navigate('editAddress', { id: item.id, defaultAddress: index === 0, data: item }) }} >
                                                            <EvilIcons name='pencil' size={30} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            activeOpacity={0.5}
                                                            style={{ padding: 10 }}
                                                            onPress={() => { deleteAddress(item.id) }}>
                                                            <AntDesign name='delete' size={20} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <Text style={[MStyles.txtDescription, { marginHorizontal: 40 }]}>
                                                        {item.address}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    ListFooterComponent={() => {
                                        return (
                                            <>
                                                {
                                                    !data || data.length < 1 ?
                                                        <Text style={[MStyles.txtDescription, { textAlign: 'center', padding: 30 }]}>
                                                            {error}
                                                        </Text>
                                                        : null
                                                }
                                            </>
                                        )
                                    }}
                                />
                            </>
                            : error ? <ErrorView message={error} /> : null
                        }
                    </>
            }
        </SafeAreaView>
    )
}

export default AddressList