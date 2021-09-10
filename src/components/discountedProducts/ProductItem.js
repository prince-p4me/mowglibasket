import React, { memo, useEffect, useState } from 'react'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { Context as ClickContext } from '../../context/ClickContext'
import ProductVariationDialog from './ProductVariationDialog'
import { RUPEES, SHIMMER_SPEED } from '../../common/Constants'
import Shimmer from 'react-native-shimmer'

const ProductItem = (props) => {

    const { item, loading, refreshing, isLoadingMore, cart,
        addToCart, updateQuantity, removeFromCart, setUpdateItemId, updatingItemId } = props

    const [localData, setLocalData] = useState({ visibility: false, quantity: 0, presentInCart: false, key: null, imageLoading: false })
    const [selectedVariation, setSelectedVariation] = useState()

    // const { state: { clicked }, setClicked, setAsyncClicked } = useContext(ClickContext)
    // const [data, setData] = useState({ quantity: 0, presentInCart: false, key: null })
    // const [visibility, setVisibility] = useState(false)
    // const [variationDataList, setVariationDataList] = useState()

    useEffect(() => {
        if (item.product_type === 'variable' && item.variations)
            setSelectedVariation(item.variations[0])
        // setLocalData({ ...localData, selectedVariation: item.variations[0] })
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
        // setVisibility(true)
        setLocalData({ ...localData, visibility: true, variationDataList: item.variations })
        // setVariationDataList(item.variations)
    }

    const onSelect = (item) => {
        // setVisibility(false)
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
                activeOpacity={0.5}
                onPress={() => {
                    if (loading || refreshing || isLoadingMore)
                        return
                    // if (!clicked) {
                    props.navigation.navigate('productDetail', item.id)
                    // setClicked()
                    // }
                }}>
                <View style={[MStyles.horizontal, {
                    paddingHorizontal: 10,
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
                        {
                            (item.discount_percentage || (item.product_type === 'variable' && selectedVariation && selectedVariation.discount_percentage)) ?
                                <View style={[MStyles.circle, MStyles.center, { position: 'absolute' }]}>
                                    <Text style={[MStyles.txtDiscount]}>
                                        {(item.product_type === 'variable' && selectedVariation) ? selectedVariation.discount_percentage : item.discount_percentage}%
                                        </Text>
                                    <Text style={[MStyles.txtDiscount]}>off</Text>
                                </View>
                                : null
                        }
                    </View>

                    <View style={{ padding: 10, flex: 1 }}>

                        <Text style={[MStyles.productTitle, { fontWeight: '500', marginTop: 5 }]}>{item.name}</Text>
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
                        <View style={[MStyles.horizontal, { alignItems: 'center' }]}>
                            <View style={{ flex: 1 }}>
                                {
                                    (item.sale_price || (selectedVariation && selectedVariation.sale_price))
                                        ?
                                        <View style={[MStyles.horizontal, , { marginTop: 5 }]}>
                                            {/* <Text style={[MStyles.productQuntity, { fontSize: 12 }]}>MRP : </Text> */}
                                            <Text style={[MStyles.productQuntity, { textDecorationLine: 'line-through', fontSize: 12 }]}>
                                                {RUPEES} {selectedVariation ? selectedVariation.regular_price : item.regular_price}
                                            </Text>
                                        </View>
                                        :
                                        null
                                }
                                <Text style={[MStyles.productTitle, { fontWeight: '600', flex: 1 }]}>
                                    {RUPEES} {selectedVariation ? (selectedVariation.sale_price ? selectedVariation.sale_price : selectedVariation.regular_price) : item.sale_price ? item.sale_price : item.regular_price}
                                </Text>
                            </View>

                            {cart ?
                                !localData.presentInCart ?
                                    (updatingItemId && updatingItemId === item.id) ?
                                        <ActivityIndicator
                                            size='small'
                                            color={Colors.primaryDark}
                                            style={{ marginTop: 10 }} />
                                        :
                                        <TouchableOpacity
                                            onPress={() => {
                                                // if (!clicked) {
                                                // props.navigation.navigate('productDetail', item.id)
                                                if (item.product_type === 'simple') {
                                                    // setAsyncClicked()
                                                    setUpdateItemId(item.id)
                                                    addToCart(item.id, 0, 1)
                                                } else {
                                                    // setAsyncClicked()
                                                    setUpdateItemId(item.id)
                                                    addToCart(item.id, selectedVariation.veriation_id, 1)
                                                    // props.navigation.navigate("productDetail", item.id)
                                                }
                                                // }
                                            }}
                                            activeOpacity={0.5}
                                            style={[MStyles.buttonSmallParent,
                                            { marginTop: 10, alignSelf: 'baseline', alignSelf: 'flex-end' }]}>
                                            {
                                                <Text style={[MStyles.themeButtonSmall]} >Add</Text>
                                            }
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
                                            <Ionicons name="md-remove" color={Colors.primaryDark} size={18} />
                                        </TouchableOpacity>
                                        <View style={[MStyles.center, { paddingHorizontal: 16 }]}>
                                            <Text style={[MStyles.txtDescription]}>{localData.quantity}</Text>
                                            {updatingItemId === item.id &&
                                                <ActivityIndicator size='small' color={Colors.primaryDark} style={{ position: 'absolute' }} />
                                            }
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // if (!clicked) {
                                                // setAsyncClicked()
                                                setUpdateItemId(item.id)
                                                updateQuantity(localData.key, localData.quantity + 1)
                                                // }
                                            }}
                                            activeOpacity={0.5}
                                            style={[MStyles.buttonAdd]}>
                                            <Ionicons name="md-add" color={Colors.primaryDark} size={18} />
                                        </TouchableOpacity>
                                    </View>
                                : null
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
            <View style={[MStyles.divider]} />
        </View>
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
    }
})

export default memo(ProductItem)