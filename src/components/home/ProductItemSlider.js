import React, { memo, useState, useEffect } from 'react'
import {
    View, Text, TouchableOpacity,
    ActivityIndicator, StyleSheet, Dimensions
} from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { Context as ClickContext } from '../../context/ClickContext'
import ProductVariationDialog from '../products/ProductVariationDialog'
import { RUPEES } from '../../common/Constants'

const ProductItemSlider = (props) => {

    // const { state: { clicked }, setClicked, setAsyncClicked, setClickFree } = useContext(ClickContext)
    const { item, loading, cart,
        addToCart, updateQuantity, removeFromCart, setUpdateItemId, updatingItemId } = props

    const [data, setData] = useState({
        quantity: 0,
        presentInCart: false,
        key: null,
        visibility: false,
        // selectedVariation:null
        // variationDataList:null
        selectedVariation: item && item.variations && item.variations[0]
    })

    // const [visibility, setVisibility] = useState(false)
    // const [selectedVariation, setSelectedVariation] = useState()
    // const [variationDataList, setVariationDataList] = useState()
    const windowWidth = Dimensions.get('window').width;
    // const windowHeight = Dimensions.get('window').height;

    // useEffect(() => {
    //     if (item.product_type === 'variable' && item.variations) {
    //         // setSelectedVariation(item.variations[0])
    //         setData({ ...data, visibility: false, selectedVariation: item.variations[0] })
    //     }
    // }, [])

    useEffect(() => {
        if (data.quantity !== 0 && data.presentInCart !== false && data.key !== null)
            setData({ ...data, quantity: 0, presentInCart: false, key: null })
        if (cart) {
            cart.map((cartItem) => {
                if (cartItem.product_id == item.id && item.product_type !== 'variable') {
                    setData({ ...data, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
                    return;
                } else if (cartItem.product_id == item.id && item.product_type === 'variable' && data.selectedVariation && cartItem.variation_id === data.selectedVariation.veriation_id) {
                    setData({ ...data, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
                    return;
                }
            })
        }
    }, [cart, data.selectedVariation])

    const showVariationDialog = () => {
        // setVisibility(true)
        // setVariationDataList(item.variations)
        setData({ ...data, visibility: true, variationDataList: item.variations })
    }

    const onSelect = (item) => {
        // setVisibility(false)
        // setSelectedVariation(item)
        setData({ ...data, visibility: false, selectedVariation: item })
    }

    return (
        <View style={[{ padding: 0, width: windowWidth / 2 }]}>
            <ProductVariationDialog
                visibility={data.visibility}
                data={data.variationDataList}
                onSelect={onSelect}
                selectedVariation={data.selectedVariation} />

            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                    // if (loading)
                    // return
                    // if (!clicked) {
                    //     setClicked()
                    if ((updatingItemId == null || updatingItemId === undefined) && loading === false) {
                        props.navigation.navigate('productDetail', item.id)
                    }
                    // }
                }}>
                <View style={[MStyles.cardView, { flex: 1, backgroundColor: Colors.white, marginBottom: 5, paddingBottom: 10, alignItems: 'center', justifyContent: 'center', margin: 5 }]}>
                    <FastImage
                        source={{ uri: item.image }}
                        style={{ width: '100%', aspectRatio: 1 }}
                        resizeMode='cover' />
                    <Text style={[MStyles.productTitle, { flex: 1, marginTop: 5, textAlign: 'center', paddingHorizontal: 10, }]}>{item.name}</Text>

                    {
                        (item.product_type === 'variable') &&
                        <TouchableOpacity
                            style={[styles.variationContainer, { flex: 0, marginHorizontal: 10 }]}
                            onPress={showVariationDialog} >
                            <Text style={[MStyles.txtDescription, { flex: 1 }]}>{data.selectedVariation ? data.selectedVariation.attribute_summary : item.attribute_summary}</Text>
                            <FastImage
                                tintColor={Colors.textGray}
                                style={{ width: 12, height: 12 }}
                                source={require('../../images/down_arrow.png')} />
                        </TouchableOpacity>
                    }

                    <View style={[MStyles.horizontal, , { marginTop: 5 }]}>
                        {/* <Text style={MStyles.productQuntity}>MRP : </Text> */}
                        {(item.sale_price || (data.selectedVariation && data.selectedVariation.sale_price)) ?
                            <>
                                <Text style={[MStyles.productQuntity, { textDecorationLine: 'line-through' }]}>{RUPEES} {data.selectedVariation ? data.selectedVariation.regular_price : item.regular_price} </Text>
                                <Text style={[MStyles.productQuntity, { color: Colors.black, fontWeight: '500' }]}> {RUPEES} {data.selectedVariation ? data.selectedVariation.sale_price : item.sale_price} </Text>
                            </>
                            :
                            <Text style={[MStyles.productQuntity, { color: Colors.black, fontWeight: '500' }]}> {RUPEES} {data.selectedVariation ? data.selectedVariation.regular_price : item.regular_price}</Text>
                        }
                    </View>
                    <>
                        {cart ?
                            !data.presentInCart ?
                                (updatingItemId && updatingItemId === item.id) ?
                                    <ActivityIndicator
                                        size='small'
                                        color={Colors.primaryDark}
                                        style={{ paddingTop: 15 }} />
                                    :
                                    < TouchableOpacity
                                        onPress={() => {
                                            // if (!clicked) {
                                            if ((updatingItemId == null || updatingItemId === undefined) && loading === false) {
                                                if (item.product_type === 'simple') {
                                                    // setAsyncClicked()
                                                    setUpdateItemId(item.id)
                                                    addToCart(item.id, 1)
                                                } else {
                                                    // setClicked()
                                                    // props.navigation.navigate("productDetail", item.id)
                                                    // setAsyncClicked()
                                                    setUpdateItemId(item.id)
                                                    addToCart(item.id, data.selectedVariation.veriation_id, 1)
                                                }
                                            }
                                            // }
                                        }}
                                        activeOpacity={0.5}
                                        style={MStyles.buttonSmallParent}>
                                        {
                                            <Text style={MStyles.themeButtonSmall} >Add</Text>
                                        }
                                    </TouchableOpacity>
                                :
                                <View style={[MStyles.horizontal, MStyles.center, { marginTop: 10 }]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // if (!clicked) {
                                            // setAsyncClicked()
                                            if ((updatingItemId == null || updatingItemId === undefined) && loading === false) {
                                                if (data.quantity == 1) {
                                                    setUpdateItemId(item.id)
                                                    removeFromCart(data.key)
                                                } else {
                                                    setUpdateItemId(item.id)
                                                    updateQuantity(data.key, data.quantity - 1)
                                                }
                                            }
                                            // }
                                        }}
                                        activeOpacity={0.5}
                                        style={[MStyles.buttonAdd]}>
                                        <Ionicons name="md-remove" color={Colors.primaryDark} size={18} />
                                    </TouchableOpacity>
                                    <View style={[MStyles.center, { paddingHorizontal: 16 }]}>
                                        <Text style={[MStyles.txtDescription]}>{data.quantity}</Text>
                                        {updatingItemId === item.id &&
                                            <ActivityIndicator
                                                size='small'
                                                color={Colors.primaryDark}
                                                style={{ position: 'absolute' }} />
                                        }
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // if (!clicked) {
                                            // setClicked()
                                            if ((updatingItemId == null || updatingItemId === undefined) && loading === false) {
                                                setUpdateItemId(item.id)
                                                updateQuantity(data.key, data.quantity + 1)
                                            }
                                            // }
                                        }}
                                        activeOpacity={0.5}
                                        style={[MStyles.buttonAdd]}>
                                        <Ionicons name="md-add" color={Colors.primaryDark} size={18} />
                                    </TouchableOpacity>
                                </View>
                            : null
                        }
                    </>
                </View>
            </TouchableOpacity>
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
    }
})

export default memo(ProductItemSlider)