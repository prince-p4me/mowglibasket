import React, { useState, useEffect, memo } from 'react'
import {
    View, TouchableOpacity, Text,
    StyleSheet, Dimensions, ActivityIndicator
} from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { RUPEES } from '../../../common/Constants'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { alertStockLimit, log } from '../../../common/Utils'
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const ProductItem = (props) => {

    const {
        item,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        updatingItemId,
        setUpdateItemId,
        showVariationDialog,
        navigateToProductDetails
    } = props;

    const [localData, setLocalData] = useState({ visibility: false, quantity: 0, presentInCart: false, key: null, imageLoading: false })
    const [selectedVariation, setSelectedVariation] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (item.product_type === 'variable' && item.variations)
            setSelectedVariation(item.variations[0])
    }, [])

    useEffect(() => {
        setLocalData({ ...localData, quantity: 0, presentInCart: false, key: null })
        if (cart)
            cart.map((cartItem) => {
                if (cartItem.product_id == item.id && item.product_type !== 'variable') {
                    setLocalData({ ...localData, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
                    return;
                } else if (cartItem.product_id == item.id && item.product_type === 'variable' && selectedVariation && cartItem.variation_id === selectedVariation?.veriation_id) {
                    setLocalData({ ...localData, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
                }
            })
    }, [cart, selectedVariation])

    // log(" in stock ", JSON.stringify(item))


    return (
        // <View style={{flex:.5}}>
        <View style={styles.itemContainer}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => navigateToProductDetails(item)}
                    activeOpacity={0.5}
                    style={{ flex: 1 }}>
                    {
                        loading &&
                        <View style={{ width: '100%', aspectRatio: 1 }}>
                            <ShimmerPlaceHolder
                                style={{ width: '100%', height: '100%' }} />
                        </View>
                    }
                    <FastImage
                        source={{ uri: item.image }}
                        style={{ width: loading ? 0 : '100%', maxHeight: 180, aspectRatio: (item.image_width == 0 ? 1 : item.image_width) / (item.image_height == 0 ? 1 : item.image_height) }}
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)} />
                    {
                        (item.discount_percentage || (item.product_type === 'variable' && selectedVariation && selectedVariation.discount_percentage)) &&
                        <Text style={styles.discount}>
                            {(item.product_type === 'variable' && selectedVariation) ? selectedVariation.discount_percentage : item.discount_percentage}% OFF
                        </Text>
                    }
                </TouchableOpacity>

                <View>
                    <View style={{ flex: 1 }}>

                        <TouchableOpacity
                            onPress={() => navigateToProductDetails(item)}
                            activeOpacity={0.5}>
                            <View style={{ ...MStyles.horizontal, marginTop: 5 }}>
                                {
                                    (item.sale_price || (selectedVariation && selectedVariation.sale_price)) &&
                                    <Text style={[styles.salePrice]}>{RUPEES} {selectedVariation ? (selectedVariation.sale_price ? selectedVariation.sale_price : selectedVariation.regular_price) : item.sale_price ? item.sale_price : item.regular_price}</Text>
                                }
                                <Text style={[!(item.sale_price || (selectedVariation && selectedVariation.sale_price)) ? styles.salePrice : styles.mrp]}>{RUPEES} {selectedVariation ? selectedVariation.regular_price : item.regular_price}</Text>
                            </View>

                            <Text style={styles.title}>{item.name}</Text>
                        </TouchableOpacity>
                        {
                            (item.product_type === 'variable') &&
                            <TouchableOpacity
                                style={styles.variationContainer}
                                onPress={showVariationDialog} >
                                <Text style={[MStyles.txtDescription, { flex: 1 }]}>{selectedVariation ? selectedVariation.name : item.name}</Text>
                                <FastImage
                                    tintColor={Colors.textGray}
                                    style={{ width: 12, height: 12 }}
                                    source={require('../../../images/down_arrow.png')} />
                            </TouchableOpacity>
                        }

                    </View>

                    <View style={{ height: 40 }}>
                        {
                            cart && !localData.presentInCart ?
                                (updatingItemId && updatingItemId === item.id) ?
                                    <ActivityIndicator
                                        size='small'
                                        color={Colors.primaryDark}
                                        style={{ marginTop: 15 }} />
                                    :
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            if (item.stock_quantity < 1) {
                                                alertStockLimit(item.stock_quantity)
                                                return
                                            }
                                            if (item.product_type === 'simple') {
                                                // setUpdateItemId(item.id)
                                                addToCart(item.id, 0, 1)
                                            } else {
                                                // setUpdateItemId(item.id)
                                                addToCart(item.id, selectedVariation?.veriation_id, 1)
                                            }
                                        }}>
                                        <View style={{
                                            ...MStyles.buttonSmallParent,
                                            width: '100%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingLeft: 0,
                                            paddingRight: 0
                                        }}>
                                            <Text style={styles.button}>ADD</Text>
                                            <View style={{
                                                backgroundColor: Colors.primaryDarkButton,
                                                borderBottomRightRadius: 4,
                                                borderTopRightRadius: 4,
                                                padding: 5
                                            }}>
                                                <Ionicons name="md-add"
                                                    color={Colors.white}
                                                    size={18}
                                                    style={{ alignSelf: 'center' }} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                :
                                <View style={[MStyles.horizontal, MStyles.center, { marginTop: 12 }]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // if (!clicked) {
                                            // setAsyncClicked()
                                            if (localData.quantity == 1) {
                                                // setUpdateItemId(item.id)
                                                removeFromCart(item.id, localData.key)
                                            } else {
                                                // setUpdateItemId(item.id)
                                                updateQuantity(item.id, localData.key, localData.quantity - 1)
                                            }
                                            // }
                                        }}
                                        activeOpacity={0.5}
                                        style={[MStyles.buttonAdd]}>
                                        <Ionicons name="md-remove" color={Colors.white} size={18} />
                                    </TouchableOpacity>
                                    <View style={[MStyles.center, { flex: 1 }]}>
                                        <Text style={[MStyles.txtDescription]}>{localData.quantity}</Text>
                                        {updatingItemId === item.id &&
                                            <ActivityIndicator size='small' color={Colors.primaryDark} style={{ position: 'absolute' }} />
                                        }
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (localData.quantity < item.stock_quantity) {
                                                // if (!clicked) {
                                                // setAsyncClicked()
                                                // setUpdateItemId(item.id)
                                                updateQuantity(item.id, localData.key, localData.quantity + 1)
                                                // }
                                            } else {
                                                alertStockLimit(item.stock_quantity)
                                            }
                                        }}
                                        activeOpacity={0.5}
                                        style={[MStyles.buttonAdd]}>
                                        <Ionicons name="md-add" color={Colors.white} size={18} />
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                </View>
            </View>
        </View >
        // </View>
    )
}

const styles = StyleSheet.create({

    itemContainer: {
        ...MStyles.cardView,
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 10,
        width: Dimensions.get('screen').width / 2.5
    },
    button: {
        // ...MStyles.buttonSmallParent,
        ...MStyles.txtDescription,
        color: Colors.white,
        textAlign: 'center',
        // padding: 5,
        flex: 1
    },
    salePrice: {
        ...MStyles.txtDescriptionBold,
        fontSize: 16
    },
    mrp: {
        ...MStyles.txtDescription,
        color: Colors.textDarkGray,
        fontSize: 12,
        textDecorationLine: 'line-through',
        alignSelf: 'flex-end',
        marginBottom: 2,
        marginStart: 5
    },
    title: {
        ...MStyles.txtDescription,
        marginTop: 5,
        // flex: 1
    },
    weight: {
        ...MStyles.txtDescription,
        color: Colors.textDarkGray,
        marginTop: 5,
    },
    discount: {
        ...MStyles.txtDescription,
        fontSize: 12,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'green',
        borderRadius: 4,
        // alignSelf:'baseline',
        position: 'absolute',
        color: Colors.white
    },
    variationContainer: {
        // flex: 1,
        borderColor: Colors.dividerColor,
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default memo(ProductItem)