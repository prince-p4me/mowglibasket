import React, { memo, useEffect, useState } from 'react'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import {
    View, Text, TouchableOpacity,
    ActivityIndicator, StyleSheet
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { Context as ClickContext } from '../../context/ClickContext'
import ProductVariationDialog from './ProductVariationDialog'
import { RUPEES, SHIMMER_SPEED } from '../../common/Constants'
import Shimmer from 'react-native-shimmer'
import { alertStockLimit } from '../../common/Utils'

const ProductItem = (props) => {

    const { item, loading, refreshing, isLoadingMore, cart,
        addToCart, updateQuantity, removeFromCart, setUpdateItemId, updatingItemId } = props

    const [localData, setLocalData] = useState({ visibility: false, quantity: 0, presentInCart: false, key: null, imageLoading: false })
    const [selectedVariation, setSelectedVariation] = useState()

    useEffect(() => {
        if (item.product_type === 'variable' && item.variations)
            setSelectedVariation(item.variations[0])
    }, [])

    useEffect(() => {
        // setData({ ...data, quantity: 0, presentInCart: false, key: null })
        setLocalData({ ...localData, quantity: 0, presentInCart: false, key: null })
        if (cart)
            cart.map((cartItem) => {
                if (cartItem.product_id == item.id && item.product_type !== 'variable') {
                    // setData({ ...data, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
                    setLocalData({ ...localData, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
                    return;
                } else if (cartItem.product_id == item.id && item.product_type === 'variable' && selectedVariation && cartItem.variation_id === selectedVariation.veriation_id) {
                    // setData({ ...data, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
                    setLocalData({ ...localData, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
                }
            })
    }, [cart, selectedVariation])

    const showVariationDialog = () => {
        setLocalData({ ...localData, visibility: true, variationDataList: item.variations })
    }

    const onSelect = (item) => {
        setLocalData({ ...localData, visibility: false })
        setSelectedVariation(item)
    }

    return (
        <View style={[MStyles.main]}>
            <ProductVariationDialog
                visibility={localData.visibility}
                data={localData.variationDataList}
                onSelect={onSelect}
                selectedVariation={selectedVariation}
            />
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (loading || refreshing || isLoadingMore)
                        return
                    props.navigation.navigate('productDetail', item.id)
                }}
                style={[MStyles.cardView, { marginHorizontal: 10, marginVertical: 7 }]}>
                <View style={[MStyles.horizontal, {
                    // paddingHorizontal: 10,
                    paddingVertical: 5
                }]}>
                    <View style={{ padding: 10 }}>
                        <Shimmer
                            tilt={45}
                            animating={localData.imageLoading}
                            pauseDuration={SHIMMER_SPEED}
                            opacity={localData.imageLoading ? 0.3 : 1}
                            intensity={.3}
                            highlightLength={1}>
                            <FastImage source={{ uri: item.image }}
                                style={[{ width: 100, height: 100 }, { backgroundColor: Colors.shimmerBack }]}
                                // style={[{ width: 100, height: 100, margin: 10 }, { backgroundColor: Colors.shimmerBack }]}
                                onLoadStart={() => setLocalData({ ...localData, imageLoading: true })}
                                onLoadEnd={() => setLocalData({ ...localData, imageLoading: false })}
                            />
                        </Shimmer>
                    </View>

                    <View style={{ paddingVertical: 10, paddingRight: 10, flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', flex: 1 }}>
                            <FastImage
                                source={require('../../images/pocket.png')}
                                style={{ width: 15, height: 15, marginBottom: 5, marginRight: 5 }} />
                            <Text style={[MStyles.txtSubTitle,
                            { marginEnd: 8, fontSize: 18, color: Colors.primaryDarkButton }]}>
                                {RUPEES} {selectedVariation ? (selectedVariation.sale_price ? selectedVariation.sale_price : selectedVariation.regular_price) : item.sale_price ? item.sale_price : item.regular_price}
                            </Text>
                            {
                                (item.sale_price || (selectedVariation && selectedVariation.sale_price))
                                    ?
                                    <View style={[MStyles.horizontal]}>
                                        <Text style={[MStyles.productQuntity, { textDecorationLine: 'line-through', fontSize: 16 }]}>
                                            {RUPEES} {selectedVariation ? selectedVariation.regular_price : item.regular_price}
                                        </Text>
                                    </View>
                                    :
                                    null
                            }

                            {
                                (item.discount_percentage || (item.product_type === 'variable' && selectedVariation && selectedVariation.discount_percentage)) ?
                                    <View style={[MStyles.center,
                                    {
                                        backgroundColor: Colors.assent,
                                        borderRadius: 4,
                                        paddingHorizontal: 5,
                                        paddingVertical: 2,
                                        flexDirection: 'row',
                                        marginStart: 8
                                    }]}>
                                        <Text style={[MStyles.txtDiscount]}>{(item.product_type === 'variable' && selectedVariation) ? selectedVariation.discount_percentage : item.discount_percentage}%</Text>
                                        <Text style={[MStyles.txtDiscount]}> off</Text>
                                    </View>
                                    : null
                            }

                        </View>

                        <Text style={[MStyles.txtDescription, { color: Colors.textGray, marginTop: 5, fontSize: 12 }]}>Inclusive of all taxes</Text>
                        <Text style={[MStyles.productTitle, { color: Colors.lightBlack, marginTop: 5 }]}>{item.name}</Text>
                        {
                            (item.product_type === 'variable') &&
                            <TouchableOpacity
                                style={styles.variationContainer}
                                onPress={showVariationDialog} >
                                <Text style={[MStyles.txtDescription, { flex: 1 }]}>{selectedVariation ? selectedVariation.name : item.name}</Text>
                                <FastImage
                                    tintColor={Colors.textGray}
                                    style={{ width: 12, height: 12 }}
                                    source={require('../../images/down_arrow.png')} />
                            </TouchableOpacity>
                        }
                        <View style={[MStyles.horizontal,
                        { justifyContent: 'flex-end', height: 40, marginTop: 10 }]}>
                            {cart ?
                                !localData.presentInCart ?
                                    (updatingItemId && updatingItemId === item.id) ?
                                        <ActivityIndicator
                                            size='small'
                                            color={Colors.primaryDark}
                                            style={{ marginRight: 35, marginTop: 10 }}
                                        />
                                        :
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (item.stock_quantity < 1) {
                                                    // alert('Available in stock is ' + item.stock_quantity)
                                                    alertStockLimit(item.stock_quantity)
                                                    return
                                                }
                                                if (item.product_type === 'simple') {
                                                    setUpdateItemId(item.id)
                                                    addToCart(item.id, 0, 1)
                                                } else {
                                                    setUpdateItemId(item.id)
                                                    addToCart(item.id, selectedVariation.veriation_id, 1)
                                                }
                                            }}
                                            activeOpacity={0.9}
                                            style={[{ maxWidth: 150 }]}>
                                            <View style={{
                                                ...MStyles.buttonSmallParent,
                                                width: '100%',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingLeft: 0,
                                                paddingRight: 0,
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
                                    <View style={[MStyles.horizontal, MStyles.center, { marginTop: 10 }]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // if (!clicked) {
                                                // setAsyncClicked()
                                                if (localData.quantity == 1) {
                                                    setUpdateItemId(item.id)
                                                    removeFromCart(localData.key)
                                                } else {
                                                    setUpdateItemId(item.id)
                                                    updateQuantity(localData.key, localData.quantity - 1)
                                                }
                                                // }
                                            }}
                                            activeOpacity={0.5}
                                            style={[MStyles.buttonAdd]}>
                                            <Ionicons name="md-remove" color={Colors.white} size={18} />
                                        </TouchableOpacity>
                                        <View style={[MStyles.center, { paddingHorizontal: 16 }]}>
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
                                                    setUpdateItemId(item.id)
                                                    updateQuantity(localData.key, localData.quantity + 1)
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
                                : null
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        </View >
    )
}

const styles = StyleSheet.create({
    variationContainer: {
        flex: 1,
        borderColor: Colors.dividerColor,
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        // ...MStyles.buttonSmallParent,
        ...MStyles.txtDescription,
        color: Colors.white,
        textAlign: 'center',
        // padding: 5,
        flex: 1
    },
})

export default memo(ProductItem)