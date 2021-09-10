import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import ToolbarDetail from '../../../common/ToolbarDetail'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import Ionicon from 'react-native-vector-icons/Ionicons'
import ErrorView from '../../../common/ErrorView'
import LinearProgressDialog from '../../../common/LinearProgressDialog'
import { requestProductDetail, requestAddToCart, requestUpdateCart, requestRemoveFromCart, requestAddToCartVariations } from '../../../apis/Api'
import ProductVariations from '../ProductVariations'
import { Context as CartContext } from '../../../context/CartContext'
import { RUPEES, SHIMMER_SPEED } from '../../../common/Constants'
import Shimmer from 'react-native-shimmer'
import FastImage from 'react-native-fast-image'
import ProductDetailsImageItem from './ProductDetailsImageItem'
import ProductDetailsShimmer from './ProductDetailsShimmer'
import ProductDetailsNew from './ProductDetailsNew'
import CategoryProductsContainer from '../../dashboardtemp/categoryProducts/CategoryProductsContainer'
import { log } from '../../../common/Utils'


const ProductDetails = (props) => {

    log("-- ProductDetails -", JSON.stringify(props.route.params))
    // let  productId = props.route.params
    const { state: { cart }, updateCartAndTotal, clearCart } = useContext(CartContext)
    const [required, setRequired] = useState({ cartItem: null, productImage: null, selection: [], productDetail: null })
    const [localData, setLocalData] = useState({ loading: false, imageLoading: false })
    const [productId, setProductId] = useState(props.route.params)

    useEffect(() => {
        serverRequestForProductDetails(productId)
    }, [productId])

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

    const serverRequestForProductDetails = async (productId) => {
        if (localData.loading)
            return
        setLocalData({ ...localData, loading: true })
        // requestProductDetail(props.route.params)
        requestProductDetail(productId)
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

    const navigateToProductList = (id, title) => {
        props.navigation.navigate('productList', { type: 'cat', id: id, title: title })
    }

    const navigateToProductDetails = (item) => {
        // props.navigation.navigate('productDetail', item.id)
        setProductId(item.id)
    }

    return (
        <SafeAreaView style={MStyles.mainAuth}>

            <ToolbarDetail {...props} cart={cart} />

            {/* <ProductDetailsShimmer /> */}

            { localData.loading ? <ProductDetailsShimmer /> :
                <View style={MStyles.main}>
                    {
                        required.productDetail
                            ?
                            <ScrollView
                             style={[MStyles.main]}
                             showsVerticalScrollIndicator={false}>

                                <ProductDetailsNew
                                    {...props}
                                    cart={cart}
                                    updateCartAndTotal={updateCartAndTotal}
                                    clearCart={clearCart}
                                    required={required}
                                    setRequired={setRequired}
                                    localData={localData}
                                    setLocalData={setLocalData}
                                    serverRequestForProductDetails={serverRequestForProductDetails}
                                    serverRequestForAddToCart={serverRequestForAddToCart}
                                    serverRequestForUpdateCart={serverRequestForUpdateCart}
                                    serverRequestForAddToCartVariations={serverRequestForAddToCartVariations}
                                    serverRequestForRemoveFromCart={serverRequestForRemoveFromCart}
                                    doSelection={doSelection} />

                                {required?.productDetail?.related_data &&
                                    <>
                                        <View style={[MStyles.divider, { height: 10 }]} />
                                        <CategoryProductsContainer
                                            item={required.productDetail.related_data}
                                            navigateToProductList={navigateToProductList}
                                            hideViewAll={true}
                                            navigateToProductDetails={navigateToProductDetails} />
                                    </>
                                }
                                {required?.productDetail?.popular_data &&
                                    <>
                                        <View style={[MStyles.divider, { height: 10, marginTop: 5 }]} />
                                        <CategoryProductsContainer
                                            item={required.productDetail.popular_data}
                                            navigateToProductList={navigateToProductList}
                                            hideViewAll={true}
                                            navigateToProductDetails={navigateToProductDetails} />
                                    </>
                                }
                            </ScrollView>
                            : localData.error ? <ErrorView message={localData.error} /> : null
                    }
                </View>
            }
        </SafeAreaView>
    )
}

export default ProductDetails