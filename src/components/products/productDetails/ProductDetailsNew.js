import React from 'react'
import {
    StyleSheet, View, Text, TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import ProductVariations from '../ProductVariations'
import { RUPEES } from '../../../common/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import CategoryProductsContainer from '../dashboardtemp/CategoryProductsContainer'
import ProductImageSlider from './ProductImageSlider'
import { alertStockLimit, log } from '../../../common/Utils'

const ProductDetailsNew = (props) => {

    log("-- ProductDetailsNew -", "------")

    const {
        cart,
        required,
        localData,
        setLocalData,
        serverRequestForAddToCart,
        serverRequestForUpdateCart,
        serverRequestForAddToCartVariations,
        serverRequestForRemoveFromCart,
        doSelection
    } = props

    const navigateToProductList = (id, title) => {
        props.navigation.navigate('productList', { type: 'cat', id: id, title: title })
    }

    return (
        <View >
            <ProductImageSlider required={required} />
            <View style={MStyles.divider} />
            <View style={[MStyles.main, { padding: 12 }]}>
                {
                    required.productDetail.discount_percentage &&
                    <Text style={[MStyles.discountText, { marginHorizontal: 0, marginBottom: 8 }]}>{required.productDetail.discount_percentage}% OFF</Text>
                }
                {
                    required.productDetail.attributes && localData.variation && localData.variation.discount_percentage &&
                    <Text style={[MStyles.discountText, { marginHorizontal: 0, marginBottom: 8 }]}>{localData.variation.discount_percentage}% Off</Text>
                }
                <Text style={[MStyles.txtTitle, { color: Colors.lightBlack, fontSize: 16 }]}>{required.productDetail.product_name}</Text>
                <View style={MStyles.horizontal}>
                    <View style={{ flex: 1 }}>
                        {
                            required.productDetail.attributes == undefined
                                ?
                                <>
                                    {
                                        required.productDetail.sale_price ?
                                            <View style={[MStyles.horizontal, { marginTop: 8 }]}>
                                                <Text style={[MStyles.productQuntity]}>Product MRP : </Text>
                                                <Text style={[MStyles.productQuntity, { textDecorationLine: 'line-through' }]}>
                                                    {RUPEES} {required.productDetail.regular_price}
                                                </Text>
                                            </View> : null
                                    }
                                    <View style={[MStyles.horizontal, { alignItems: 'center', marginTop: 8 }]}>
                                        <Text style={[MStyles.productQuntity, { color: Colors.black, fontSize: 15 }]}>Selling Price : </Text>
                                        <Text style={[MStyles.txtDescriptionBold, { color: Colors.black, fontSize: 15 }]}>
                                            {RUPEES} {required.productDetail.attributes == undefined ? required.productDetail.sale_price ? required.productDetail.sale_price : required.productDetail.regular_price : required.productDetail.regular_price}
                                        </Text>
                                    </View>
                                    <Text style={[MStyles.productQuntity, { fontSize: 11, marginTop: 5 }]}>(Inclusive of all Taxes)</Text>
                                </>
                                :
                                null
                        }
                        {
                            (required.productDetail.attributes && localData.variation)
                                ?
                                <View style={{ paddingTop: 5 }}>
                                    {
                                        localData.variation.sale_price &&
                                        <View style={[MStyles.horizontal, { marginTop: 5 }]}>
                                            <Text style={[MStyles.productQuntity, { fontSize: 13 }]}>Product MRP : </Text>
                                            <Text style={[MStyles.productQuntity, { textDecorationLine: 'line-through', fontSize: 13 }]}>
                                                {RUPEES} {localData.variation.regular_price}
                                            </Text>
                                        </View>
                                    }
                                    <View style={[MStyles.horizontal, { alignItems: 'center', marginTop: 5 }]}>
                                        <Text style={[MStyles.productQuntity, { color: Colors.black }]}>Selling Price : </Text>
                                        <Text style={[MStyles.txtDescriptionBold, { color: Colors.black }]}>
                                            {RUPEES} {localData.variation.sale_price ? localData.variation.sale_price : localData.variation.regular_price}
                                        </Text>
                                    </View>
                                    <Text style={[MStyles.productQuntity, { fontSize: 12, marginTop: 5 }]}>(Inclusive of all Taxes)</Text>
                                </View>
                                :
                                !required.productDetail.attributes ?
                                    null :
                                    <View style={{ marginRight: 10, marginTop: 5 }}>
                                        <Text style={[MStyles.productQuntity]}>Please select a variation from below to see details</Text>
                                    </View>
                        }
                    </View>

                    <View style={[MStyles.horizontal,
                    {
                        justifyContent: 'flex-end', alignSelf: 'flex-end',
                        height: 40, flex: .4,
                        marginTop: 5
                    }]}>
                        {cart ?
                            !required.cartItem ?
                                (localData.updating) ?
                                    <ActivityIndicator
                                        size='small'
                                        color={Colors.primaryDark}
                                        style={{ marginRight: 35, marginTop: 5 }} />
                                    :
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (required.stock_quantity < 1) {
                                                // alert('Available in stock is ' + required.stock_quantity)
                                                alertStockLimit(required.stock_quantity)
                                                return
                                            }
                                            if (required.productDetail.attributes == undefined) {
                                                setLocalData({ ...localData, updating: true })
                                                serverRequestForAddToCart(required.productDetail.product_id, 1)
                                            } else {
                                                if (localData.variation && localData.variation.veriation_id != undefined) {
                                                    setLocalData({ ...localData, updating: true })
                                                    serverRequestForAddToCartVariations(required.productDetail.product_id, localData.variation.veriation_id, 1)
                                                } else {
                                                    alert("Please select product variation", localData.variation)
                                                }
                                            }
                                        }}
                                        activeOpacity={0.9}
                                        style={[{ flex: 1, maxWidth: 150, marginTop: 5 }]}>

                                        <View style={{
                                            ...MStyles.buttonSmallParent,
                                            width: '100%',
                                            // flex:1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            marginTop: 0
                                        }}>
                                            <Text style={[styles.button, { paddingHorizontal: 10 }]}>ADD</Text>
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
                                <View style={[MStyles.horizontal, MStyles.center]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (required.cartItem && required.cartItem.quantity > 1) {
                                                if (localData.variation && localData.variation.veriation_id != undefined) {
                                                    serverRequestForUpdateCart(required.cartItem.key, required.cartItem.quantity - 1)
                                                    setLocalData({ ...localData, updating: true })
                                                } else {
                                                    setLocalData({ ...localData, updating: true })
                                                    serverRequestForUpdateCart(required.cartItem.key, required.cartItem.quantity - 1)
                                                }
                                            } else {
                                                setLocalData({ ...localData, updating: true })
                                                serverRequestForRemoveFromCart(required.cartItem.key)
                                            }
                                        }}
                                        activeOpacity={0.5}
                                        style={[MStyles.buttonAdd]}>
                                        <Ionicons name="md-remove" color={Colors.white} size={18} />
                                    </TouchableOpacity>
                                    <View style={[MStyles.center, { paddingHorizontal: 16 }]}>
                                        <Text style={[MStyles.txtDescription]}>{required.cartItem.quantity}</Text>
                                        {localData.updating &&
                                            <ActivityIndicator size='small' color={Colors.primaryDark} style={{ position: 'absolute' }} />
                                        }
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (required.cartItem.quantity < required.stock_quantity) {
                                                if (required.productDetail.attributes == undefined) {
                                                    serverRequestForUpdateCart(required.cartItem.key, required.cartItem.quantity + 1)
                                                    setLocalData({ ...localData, updating: true })
                                                } else {
                                                    if (localData.variation && localData.variation.veriation_id != undefined) {
                                                        serverRequestForUpdateCart(required.cartItem.key, required.cartItem.quantity + 1)
                                                        setLocalData({ ...localData, updating: true })
                                                    } else {
                                                        alert("Please select product variation", localData.variation)
                                                    }
                                                }
                                            } else {
                                                alertStockLimit(required.stock_quantity)
                                                // alert('Available in stock is ' + required.stock_quantity)
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
            <View style={MStyles.divider} />
            {
                required.productDetail.attributes ?
                    <View style={[MStyles.main, { padding: 12 }]}>
                        {
                            required.productDetail.attributes.map((mapItem, mapIndex) => {
                                return <ProductVariations
                                    mapIndex={mapIndex}
                                    mapItem={mapItem}
                                    required={required}
                                    doSelection={doSelection}
                                    key={mapIndex.toString()}
                                />
                            })
                        }
                    </View>
                    : null
            }
            {required.productDetail.description ?
                <>
                    <View style={[MStyles.divider, { height: 10 }]} />
                    <View style={{ padding: 12 }}>
                        <Text style={[MStyles.txtTitle, { fontWeight: 'normal' }]}>About this product</Text>
                        <Text style={[MStyles.productQuntity, { marginTop: 5 }]}>{required.productDetail.description}</Text>
                    </View>
                </> : null
            }
            {/* <View style={[MStyles.divider, { height: 16, marginTop: 16 }]} /> */}
            {/* {
                                        required.productDetail.brands ?
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                onPress={() => props.navigation.navigate('productList', { type: "cat", filter: 0, id: required.productDetail.categories.category_id })}>
                                                <View style={[MStyles.horizontal, { alignItems: 'center', padding: 15 }]}>
                                                    <Text style={[MStyles.txtSubTitle, { flex: 1, fontWeight: 'normal', paddingEnd: 10 }]}>VIEW MORE PRODUCT FROM {required.productDetail.categories.category_name} </Text>
                                                    <Ionicon name='ios-arrow-forward' size={30} />
                                                </View>
                                            </TouchableOpacity>
                                            : null
                                    } */}

            {/* <CategoryProductsContainer
                                        item={item}
                                        navigateToProductList={navigateToProductList} />
                                    <CategoryProductsContainer
                                        item={item}
                                        navigateToProductList={navigateToProductList} /> */}
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

export default ProductDetailsNew