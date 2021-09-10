import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import ToolbarDetail from '../../common/ToolbarDetail'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import Ionicon from 'react-native-vector-icons/Ionicons'
import ErrorView from '../../common/ErrorView'
import ProgressDialog from '../../common/ProgressDialog'
import { requestProductDetail, requestAddToCart, requestUpdateCart, requestRemoveFromCart, requestAddToCartVariations } from '../../apis/Api'
import ProductVariations from './ProductVariations'
import { Context as CartContext } from '../../context/CartContext'
import { RUPEES, SHIMMER_SPEED } from '../../common/Constants'
import Shimmer from 'react-native-shimmer'
import FastImage from 'react-native-fast-image'
import ProductDetailsImageItem from './ProductDetailsImageItem'
import ProductDetailsShimmer from './ProductDetailsShimmer'

const ProductDetails = (props) => {

    let user
    const { state: { cart }, updateCartAndTotal, clearCart } = useContext(CartContext)
    const [required, setRequired] = useState({ cartItem: null, productImage: null, selection: [], productDetail: null })
    const [localData, setLocalData] = useState({ loading: false, imageLoading: false })

    useEffect(() => {
        serverRequestForProductDetails()
    }, [])

    useEffect(() => {
        updateUI()
    }, [cart, required.productDetail])

    const updateUI = async () => {
        if (!required.productDetail || !required.productDetail.product_gallery_images)
            return
        let image;
        if (required.productDetail.product_gallery_images) {
            image = required.productDetail.product_gallery_images[0].image;
        }
        setRequired({ ...required, cartItem: null, productImage: image })
        if (localData.variation) {
            findVariation()
        } else
            if (cart && cart.length > 0)
                cart.map((cartItem) => {
                    if (cartItem.product_id == required.productDetail.product_id) {
                        setRequired({ ...required, cartItem: cartItem })
                        return;
                    }
                })
        setTimeout(() => {
            if (required.productDetail && required.productDetail.attributes && required.productDetail.attributes[0].variables && !localData.variation)
                doSelection(0, required.productDetail.attributes[0].variables[0])
        }, 500);
    }

    const findVariation = () => {
        if (!required.productDetail) return
        if (!required.productDetail.variations) return
        if (!cart || cart.length == 0) return
        let found = false;
        cart.map((cartItem) => {
            if (cartItem.product_id == required.productDetail.product_id) {
                if (required.productDetail.variations) {
                    if (localData.variation && localData.variation.veriation_id == cartItem.variation_id) {
                        found = true;
                        setRequired({ ...required, cartItem: cartItem })
                        return
                    }
                } else {
                    found = true;
                    setRequired({ ...required, cartItem: cartItem })
                }
                return;
            }
        })
        if (!found) {
            setRequired({ ...required, cartItem: null })
        }
    }

    const serverRequestForProductDetails = async () => {
        if (localData.loading)
            return
        setLocalData({ ...localData, loading: true })
        requestProductDetail(props.route.params)
            .then(response => {
                if (response.status) {
                    let image, itemCart;
                    if (response.data.product_gallery_images) {
                        image = response.data.product_gallery_images[0].image;
                    }
                    if (cart && cart.length > 0)
                        cart.map((cartItem) => {
                            if (cartItem.product_id == response.data.product_id) {
                                itemCart = cartItem;
                                return;
                            }
                        })
                    // initial state saved empty array
                    let emptyArray = []
                    if (response.data.attributes)
                        response.data.attributes.map((item, index) => {
                            emptyArray[index] = ""
                        })
                    setLocalData({ ...localData, loading: false })
                    setRequired({
                        ...required,
                        productImage: image,
                        selection: emptyArray,
                        productDetail: response.data,
                        cartItem: itemCart
                    })

                } else {
                    setLocalData({ ...localData, loading: false, error: response.message })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, error: error.message })
            })
    }

    const serverRequestForAddToCart = async (productId, quantity) => {
        if (localData.updating)
            return
        requestAddToCart(productId, 0, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                }
                setLocalData({ ...localData, updating: false })
            })
            .catch(error => {
                setLocalData({ ...localData, updating: false })
            })
    }

    const serverRequestForUpdateCart = async (key, quantity) => {
        if (localData.updating)
            return
        requestUpdateCart(key, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                }
                setLocalData({ ...localData, updating: false })
            })
            .catch(error => {
                setLocalData({ ...localData, updating: false })
            })
    }

    const serverRequestForAddToCartVariations = async (productId, variationId, quantity) => {
        if (localData.updating)
            return
        requestAddToCartVariations(productId, variationId, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                }
                setLocalData({ ...localData, updating: false })
            })
            .catch(error => {
                setLocalData({ ...localData, updating: false })
            })
    }

    const serverRequestForRemoveFromCart = async (productId) => {
        if (localData.updating)
            return
        requestRemoveFromCart(productId)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                    clearCart()
                }
                setLocalData({ ...localData, updating: false })
            })
            .catch(error => {
                setLocalData({ ...localData, updating: false })
            })
    }

    useEffect(() => {
        if (localData.variation)
            findVariation()
    }, [localData.variation])

    useEffect(() => {

        if (!required.productDetail) return
        if (!required.productDetail.variations) return

        let findMatch = false

        for (let index = 0; index < required.productDetail.variations.length; index++) {
            const elementVariation = required.productDetail.variations[index];
            for (let j = 0; j < required.selection.length; j++) {
                let element = required.selection[j];
                if (element) {
                    if (elementVariation.attribute_summary.includes(element)) {
                        findMatch = true
                    } else {
                        findMatch = false
                        break
                    }
                } else {
                    findMatch = false
                    break
                }
            }
            if (findMatch) {
                setLocalData({ ...localData, variation: elementVariation })
                break
            }
        }
        if (!findMatch)
            setLocalData({ ...localData, variation: null })

    }, [required.selection])

    const doSelection = (mapIndex, item) => {
        if (required.selection.length > mapIndex) {
            let newList = required.selection.map((myitem, index) => {
                if (mapIndex == index) {
                    return item.label
                } else {
                    return myitem
                }
            })
            setRequired({ ...required, selection: newList })
        }
        else {
            let toBeAdd = item.label
            setRequired({ ...required, selection: { ...selection, toBeAdd } })
        }

    }

    const renderItem = ({ item }) => {
        return <ProductDetailsImageItem
            {...props}
            item={item}
            setRequired={setRequired}
            required={required} />
    }

    return (
        <SafeAreaView style={MStyles.mainAuth}>
            <ToolbarDetail {...props} cart={cart} />
            {/* <ProgressDialog loading={localData.loading} /> */}

            {localData.loading ? <ProductDetailsShimmer /> :

                <View style={MStyles.main}>
                    {
                        required.productDetail
                            ?
                            <>
                                <ScrollView style={[MStyles.main]}>
                                    <View style={[MStyles.main, {
                                        padding: 10,
                                    }]}>

                                        <Text style={[MStyles.txtTitle, { marginTop: 2 }]}>{required.productDetail.product_name}</Text>
                                        {
                                            required.productDetail.attributes == undefined
                                                ?
                                                <>
                                                    <View style={[MStyles.horizontal, { alignItems: 'center', marginTop: 5 }]}>
                                                        <Text style={MStyles.productQuntity, { color: Colors.black }}>
                                                            {RUPEES} {required.productDetail.attributes == undefined ? required.productDetail.sale_price ? required.productDetail.sale_price : required.productDetail.regular_price : required.productDetail.regular_price}
                                                        </Text>
                                                        {required.productDetail.sale_price ?
                                                            <>
                                                                {/* <Text style={[MStyles.productQuntity, { fontSize: 12 }]}> MRP :</Text> */}
                                                                <Text style={[MStyles.productQuntity, { textDecorationLine: 'line-through', fontSize: 12 }]}>
                                                                    {RUPEES} {required.productDetail.regular_price}
                                                                </Text>
                                                            </> : null
                                                        }
                                                        {required.productDetail.discount_percentage &&
                                                            <Text style={MStyles.discountText}>{required.productDetail.discount_percentage}% Off</Text>
                                                        }
                                                    </View>
                                                    <Text style={[MStyles.productQuntity, { fontSize: 11 }]}>(Inclusive of all Taxes)</Text>
                                                </>
                                                :
                                                null
                                        }
                                        <View style={{ marginTop: 10 }}>
                                            <Shimmer
                                                tilt={45}
                                                animating={localData.imageLoading}
                                                pauseDuration={SHIMMER_SPEED}
                                                opacity={localData.imageLoading ? 0.3 : 1}
                                                intensity={.3}
                                                highlightLength={1}>
                                                <FastImage
                                                    source={{ uri: required.productImage }}
                                                    style={{ width: '100%', height: undefined, aspectRatio: required.productDetail.product_gallery_images[0].image_width / required.productDetail.product_gallery_images[0].image_height, backgroundColor: Colors.shimmerBack }}
                                                    onLoadStart={() => setLocalData({ ...localData, imageLoading: true })}
                                                    onLoadEnd={() => setLocalData({ ...localData, imageLoading: false })}
                                                />
                                            </Shimmer>
                                        </View>
                                        {required.productDetail.product_gallery_images.length == 1 ? null :
                                            <FlatList
                                                data={required.productDetail.product_gallery_images}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                style={{ marginTop: 10 }}
                                                renderItem={renderItem}
                                                keyExtractor={(item) => item.image}
                                            />}
                                    </View>
                                    {
                                        (required.productDetail.attributes && localData.variation) ?
                                            <View style={{ paddingHorizontal: 15 }}>
                                                <View style={[MStyles.horizontal, { alignItems: 'center', marginTop: 5 }]}>
                                                    <Text style={MStyles.productQuntity, { color: Colors.black }}>
                                                        {RUPEES} {localData.variation.sale_price ? localData.variation.sale_price : localData.variation.regular_price}
                                                    </Text>
                                                    {localData.variation.sale_price &&
                                                        <>
                                                            <Text style={[MStyles.productQuntity, { textDecorationLine: 'line-through', fontSize: 12 }]}>
                                                                {RUPEES} {localData.variation.regular_price}
                                                            </Text>
                                                        </>
                                                    }
                                                    {
                                                        localData.variation.discount_percentage &&
                                                        <Text style={MStyles.discountText}>{localData.variation.discount_percentage}% Off</Text>
                                                    }
                                                </View>
                                                <Text style={[MStyles.productQuntity, { fontSize: 14 }]}>(Inclusive of all Taxes)</Text>
                                            </View>
                                            :
                                            !required.productDetail.attributes ?
                                                null :
                                                <View style={{ paddingHorizontal: 15 }}>
                                                    <Text style={[MStyles.productQuntity]}>Please select a variation from below to see details</Text>
                                                </View>
                                    }
                                    {
                                        required.productDetail.attributes ?
                                            required.productDetail.attributes.map((mapItem, mapIndex) => {
                                                return <ProductVariations
                                                    mapIndex={mapIndex}
                                                    mapItem={mapItem}
                                                    required={required}
                                                    doSelection={doSelection}
                                                    key={mapIndex.toString()}
                                                />
                                            })
                                            : null
                                    }
                                    {required.productDetail.description &&
                                        <>
                                            <View style={[MStyles.divider, { height: 16, marginTop: 16 }]} />
                                            <View style={{ padding: 16 }}>
                                                <Text style={[MStyles.txtTitle, { fontWeight: 'normal' }]}>About this product</Text>
                                                <Text style={[MStyles.productQuntity, { marginTop: 5 }]}>{required.productDetail.description}</Text>
                                            </View>
                                        </>
                                    }
                                    <View style={[MStyles.divider, { height: 16, marginTop: 16 }]} />
                                    {
                                        required.productDetail.brands ?
                                            <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('productList', { type: "cat", filter: 0, id: required.productDetail.categories.category_id })}>
                                                <View style={[MStyles.horizontal, { alignItems: 'center', padding: 15 }]}>
                                                    <Text style={[MStyles.txtSubTitle, { flex: 1, fontWeight: 'normal', paddingEnd: 10 }]}>VIEW MORE PRODUCT FROM {required.productDetail.categories.category_name} </Text>
                                                    <Ionicon name='ios-arrow-forward' size={30} />
                                                </View>
                                            </TouchableOpacity>
                                            : null
                                    }
                                </ScrollView>
                                {localData.variation != undefined && localData.variation.stock_status === 'outofstock' ?
                                    <View style={[MStyles.horizontal]}>
                                        <View style={[MStyles.horizontal, MStyles.center, { flex: 1, padding: 16, alignItems: "center", backgroundColor: 'red' }]}>
                                            <Text style={[MStyles.txtSubTitleSemiBold, { color: Colors.white }]}> Currently out of stock </Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={[MStyles.horizontal,
                                    { minHeight: 50, borderTopColor: Colors.dividerColor, borderTopWidth: 1 },
                                    required.cartItem ? { backgroundColor: Colors.white } : { backgroundColor: Colors.assent }]}>
                                        {
                                            required.cartItem ?

                                                <View style={[MStyles.horizontal, MStyles.center, { flex: 1 }]}>
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
                                                        activeOpacity={0.7}
                                                        style={[MStyles.buttonAdd, { borderColor: Colors.primaryDark }]}>
                                                        <Ionicon name="md-remove" color={Colors.primaryDark} size={18} />
                                                    </TouchableOpacity>
                                                    <View style={[MStyles.center, { paddingHorizontal: 16 }]}>
                                                        <Text style={[MStyles.txtDescription]}>
                                                            {required.cartItem.quantity}
                                                        </Text>
                                                        {
                                                            localData.updating ?
                                                                <ActivityIndicator size='small' color={Colors.black} style={{ position: 'absolute' }} />
                                                                : null
                                                        }
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => {
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
                                                        }}
                                                        activeOpacity={0.7}
                                                        style={[MStyles.buttonAdd, { borderColor: Colors.primaryDark }]}>
                                                        <Ionicon name="md-add" color={Colors.primaryDark} size={18} />
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <TouchableOpacity
                                                    onPress={() => {
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
                                                    activeOpacity={0.7}
                                                    style={{ backgroundColor: Colors.primary, width: '100%', padding: 10 }}>
                                                    {
                                                        localData.updating ?
                                                            <ActivityIndicator size='small' color={Colors.black} style={{ alignSelf: 'center', padding: 3 }} />
                                                            :
                                                            <Text style={MStyles.themeButtonSmall} > ADD TO CART </Text>
                                                    }
                                                </TouchableOpacity>
                                        }
                                    </View>
                                }
                            </>
                            : localData.error ? <ErrorView message={localData.error} /> : null
                    }
                </View>
            }
        </SafeAreaView>
    )
}

export default ProductDetails