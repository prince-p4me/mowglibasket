import React, { useState, useEffect, useContext } from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarCart from '../../common/ToolbarCart'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors'
import CartItem from './CartItem'
import {
    requestCart, requestUpdateCart,
    requestRemoveFromCart, requestClearCart
} from '../../apis/Api'
import { Context as CartContext } from '../../context/CartContext'
import { Context as AuthContext } from '../../context/AuthContext'
import { RUPEES } from '../../common/Constants'
import EmptyList from '../empty/EmptyList'
import { Platform, UIManager } from 'react-native'

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}
const Cart = (props) => {

    const { state: { cart, cartTotal }, updateCartAndTotal, clearCart } = useContext(CartContext)
    const { state: { user } } = useContext(AuthContext)

    const { navigation } = props
    const [localData, setLocalData] = useState({})

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLocalData({ ...localData, error: null, loading: true })
            serverRequestForCart()
        })
        return unsubscribe
    }, [navigation])

    const serverRequestForCart = async () => {
        if (localData.loading)
            return
        requestCart()
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                    setLocalData({ ...localData, loading: false, minimum_cart_total: response.minimum_cart_total })
                } else {
                    clearCart()
                    setLocalData({ ...localData, error: response.message, loading: false })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, error: error.message })
            })
    }

    const serverRequestForUpdateQuantity = async (key, quantity) => {
        if (localData.updatingItemId)
            return
        requestUpdateCart(key, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                    updateItemId(null)
                } else {
                    setLocalData({ ...localData, updatingItemId: null, error: response.message })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, updatingItemId: null, error: error.message })
            })
    }

    const serverRequestForDeleteFromCart = async (productkey) => {
        if (localData.updatingItemId)
            return
        requestRemoveFromCart(productkey)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                    updateItemId(null)
                } else {
                    clearCart()
                    setLocalData({ ...localData, updatingItemId: null, error: response.message })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, updatingItemId: null, error: error.message })
            })
    }

    const serverRequestForClearCart = async () => {
        if (localData.loading)
            return
        setLocalData({ ...localData, loading: true })
        requestClearCart()
            .then(response => {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                if (response.status) {
                    clearCart()
                    setLocalData({ ...localData, loading: false })
                } else {
                    clearCart()
                    setLocalData({ ...localData, loading: false, error: response.message })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, error: error.message })
            })
    }

    const updateItemId = (id) => {
        setLocalData({ ...localData, updatingItemId: id })
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>

            <ToolbarCart {...props}
                data={cart}
                navigation={navigation}
                title="Your Cart"
                clearCart={serverRequestForClearCart} />

            <View style={[MStyles.mainGray]}>
                {
                    localData.loading
                        ?
                        <EmptyList />
                        :
                        <>
                            {
                                cart && cart.length > 0 ?
                                    <>
                                        <FlatList
                                            data={cart}
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={(item) => item.key}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <CartItem {...props}
                                                        item={item}
                                                        updateQuantity={serverRequestForUpdateQuantity}
                                                        removeFromCart={serverRequestForDeleteFromCart}
                                                        updatingItemId={localData.updatingItemId}
                                                        setUpdateItemId={updateItemId}
                                                    />
                                                )
                                            }}
                                        />
                                        <View style={[MStyles.divider]} />
                                        <View style={[MStyles.horizontal, MStyles.center, { backgroundColor: Colors.white, padding: 10 }]}>
                                            <Text style={[MStyles.txtSubTitle, { flex: 1, color: Colors.black }]}> {RUPEES} {cartTotal}</Text>
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                style={[MStyles.buttonSmallParent, { marginTop: 0, marginHorizontal: 0 }]}
                                                onPress={() => {
                                                    if (user) {
                                                        // if (localData.minimum_cart_total && (localData.minimum_cart_total > parseFloat(cartTotal))) {
                                                        //     alert('Minimum cart value should be ' + localData.minimum_cart_total + ' to checkout.')
                                                        // } else {
                                                            navigation.navigate('chooseDelivery')
                                                        // }
                                                    } else {
                                                        navigation.navigate('authentication', { from: 'cart' })
                                                    }
                                                }} >
                                                <Text style={MStyles.themeButtonSmall} > PROCEED WITH THIS ORDER </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    : localData.error ?
                                        <>
                                            <View style={[MStyles.main, MStyles.center]}>
                                                <Text style={[MStyles.txtDescription]}> Your cart is empty </Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        navigation.navigate('home')
                                                    }}
                                                    activeOpacity={0.7}
                                                    style={MStyles.buttonSmallParent} >
                                                    <Text style={MStyles.themeButtonSmall}>Shop now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                        : null
                            }
                        </>
                }
            </View>
        </SafeAreaView>
    )
}

export default Cart