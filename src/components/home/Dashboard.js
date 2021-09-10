import React, { memo, useState, useEffect, useContext } from 'react'
import {
    View, TouchableOpacity, TextInput, Text,
    FlatList, StyleSheet, RefreshControl,
    Linking, Alert, Platform
} from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarMain from '../../common/ToolbarMain'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors'
import {
    requestHome, requestAddToCart,
    requestUpdateCart, requestRemoveFromCart
} from '../../apis/Api'
import { Context as CartContext } from '../../context/CartContext'
import { getBuildNumber } from 'react-native-device-info';
import Fruits from './Fruits'
import Deals from './Deals'
import ProductItem from './ProductItem'
import { Context as AuthContext } from '../../context/AuthContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EmptyDashboard from './EmptyDashboard'

const Dashboard = (props) => {

    const { state: { cart, data }, updateHomeAndCartData, updateCartAndTotal, clearCart } = useContext(CartContext)
    const { state: { user }, deleteUser } = useContext(AuthContext)

    const [localData, setLocalData] = useState({
        loading: false,
        error: null,
        updatingItemId: null
    })

    useEffect(() => {
        serverRequestForHomeData()
    }, [])

    const serverRequestForHomeData = async () => {
        if (localData.loading)
            return
        setLocalData({ ...localData, loading: true, error: null })
        requestHome(user ? user.user_id : null)
            .then(response => {
                if (response.status) {
                    setReceivedData(response)
                    setLocalData({ ...localData, loading: false })
                    if (response.data.session_status == 0) {
                        onSessionExpired()
                    } else {
                        setReceivedData(response)
                        if (Platform.OS == 'android')
                            askForUpdate(response.data.app_version_code)
                        // askForUpdate(6)
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

    const setReceivedData = async (response) => {
        updateHomeAndCartData(response.data, response.data.cart_data)
    }

    const serverRequestForAddToCart = async (productId, variationId, quantity) => {
        if (localData.updatingItemId !== null)
            return
        requestAddToCart(productId, variationId, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                    alert(response.message)
                }
                setLocalData({ ...localData, updatingItemId: null })
            })
            .catch(error => {
                setLocalData({ ...localData, updatingItemId: null })
                alert(error.message)
            })
    }

    const serverRequestForUpdateQuantity = async (key, quantity) => {
        if (localData.updatingItemId)
            return
        requestUpdateCart(key, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                    alert(response.message)
                }
                setLocalData({ ...localData, updatingItemId: null })

            })
            .catch(error => {
                setLocalData({ ...localData, updatingItemId: null })
                alert(error.message)
            })
    }

    const serverRequestForRemoveFromCart = async (key) => {
        if (localData.updatingItemId)
            return
        requestRemoveFromCart(key)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                    clearCart()
                }
                setLocalData({ ...localData, updatingItemId: null })
            })
            .catch(error => {
                setLocalData({ ...localData, updatingItemId: null })
            })
    }

    const updateItemId = (id) => {
        setLocalData({ ...localData, updatingItemId: id })
    }

    const pullToRefresh = () => {
        serverRequestForHomeData()
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

    function Header() {
        return <Deals
            {...props}
            cart={cart}
            data={data}
            loading={localData.loading}
            addToCart={serverRequestForAddToCart}
            updateQuantity={serverRequestForUpdateQuantity}
            removeFromCart={serverRequestForRemoveFromCart}
            updatingItemId={localData.updatingItemId}
            setUpdateItemId={updateItemId}
        />
    }

    function Footer() {
        return <Fruits
            {...props}
            cart={cart}
            data={data}
            loading={localData.loading}
            addToCart={serverRequestForAddToCart}
            updateQuantity={serverRequestForUpdateQuantity}
            removeFromCart={serverRequestForRemoveFromCart}
            updatingItemId={localData.updatingItemId}
            setUpdateItemId={updateItemId}
        />
    }

    function ListItem({ item, index }) {
        return <ProductItem
            {...props}
            index={index}
            item={item}
            cart={cart}
            loading={localData.loading}
            addToCart={serverRequestForAddToCart}
            updateQuantity={serverRequestForUpdateQuantity}
            removeFromCart={serverRequestForRemoveFromCart}
            updatingItemId={localData.updatingItemId}
            setUpdateItemId={updateItemId} />
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarMain {...props} />
            <View style={[MStyles.main]} >
                {
                    localData.loading
                        ?
                        <EmptyDashboard />
                        :
                        <>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                props.navigation.navigate('search')
                            }} >
                                <View style={[MStyles.homeSearch, { justifyContent: 'flex-end' }]}>
                                    <TextInput
                                        style={[MStyles.homeSearchInput]}
                                        placeholder='Search for products'
                                        pointerEvents={"none"}
                                        editable={false} />
                                    <Ionicons
                                        name='md-search'
                                        size={24} color={Colors.dividerColor}
                                        style={{ position: 'absolute', paddingRight: 16, paddingBottom: 10 }} />
                                </View>
                            </TouchableOpacity>

                            {
                                data
                                    ?
                                    <FlatList
                                        data={data.vegetables_products.products}
                                        keyExtractor={(item, index) => item.id}
                                        columnWrapperStyle={{ paddingHorizontal: 5 }}
                                        refreshControl={<RefreshControl refreshing={false} onRefresh={pullToRefresh} />}
                                        ListHeaderComponent={Header}
                                        ListFooterComponent={Footer}
                                        showsVerticalScrollIndicator={false}
                                        numColumns={2}
                                        renderItem={ListItem}
                                    />
                                    : (localData.error !== null && localData.error !== undefined)
                                        ?
                                        <View style={[MStyles.main, MStyles.center]}>
                                            <Text style={[MStyles.txtSubTitle]}>
                                                {localData.error}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (localData.loading == false &&
                                                        (localData.updatingItemId == null
                                                            || localData.updatingItemId == undefined))
                                                        serverRequestForHomeData()
                                                }}
                                                style={[MStyles.buttonSmallParent]}>
                                                <Text style={MStyles.themeButtonSmall}> Refresh </Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        null

                            }
                        </>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    deliveryCard: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: Colors.white,
        elevation: 3,
    },
    deliveryText: {
        ...MStyles.txtDescription,
        marginLeft: 8,
        color: '#585858'
    },
    categories: {
        flex: 1,
        backgroundColor: Colors.dividerColorLight,
        borderColor: Colors.dividerColor,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10
    },
    catDivider: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.dividerColor
    },
    slideRight: {
        width: 50,
        height: 50,
        backgroundColor: Colors.transparentArrow,
        borderRadius: 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default memo(Dashboard)