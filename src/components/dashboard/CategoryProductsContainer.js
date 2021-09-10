import React, { useState, memo, useContext } from 'react'
import { View } from 'react-native'
import { requestAddToCart, requestUpdateCart, requestRemoveFromCart } from '../../apis/Api'
import { Context as CartContext } from '../../context/CartContext'
import { Platform, UIManager, LayoutAnimation } from 'react-native'
import CategoryProducts from './sections/CategoryProducts'
import ProductVariationDialog from '../products/ProductVariationDialog'
import { log } from '../../common/Utils'

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}
const CategoryProductsContainer = (props) => {

    const { state: { cart, data, cartTotal }, updateCartAndTotal, clearCart } = useContext(CartContext)
    const { item, key,
        //  clearCart,
        user, navigateToProductList } = props
    const [localData, setLocalData] = useState({ visibility: false, quantity: 0, presentInCart: false, key: null, imageLoading: false })
    const [selectedVariation, setSelectedVariation] = useState()

    // useEffect(() => {
    //     if (item.product_type === 'variable' && item.variations)
    //         setSelectedVariation(item.variations[0])
    //     // setLocalData({ ...localData, selectedVariation: item.variations[0] })
    // }, [])

    // useEffect(() => {
    //     // setData({ ...data, quantity: 0, presentInCart: false, key: null })
    //     setLocalData({ ...localData, quantity: 0, presentInCart: false, key: null })
    //     if (cart)
    //         cart.map((cartItem) => {
    //             if (cartItem.product_id == item.id && item.product_type !== 'variable') {
    //                 // setData({ ...data, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
    //                 setLocalData({ ...localData, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
    //                 return;
    //             } else if (cartItem.product_id == item.id && item.product_type === 'variable' && selectedVariation && cartItem.variation_id === selectedVariation.veriation_id) {
    //                 // setData({ ...data, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
    //                 setLocalData({ ...localData, quantity: cartItem.quantity, presentInCart: true, key: cartItem.key })
    //             }
    //         })
    // }, [cart, selectedVariation])

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

    const serverRequestForAddToCart = async (productId, variationId, quantity) => {
        log("Working----", !localData.updatingItemId)
        if (localData.updatingItemId)
            return
        updateItemId(productId)
        requestAddToCart(productId, variationId, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                    alert(response.message)
                }
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                setLocalData({ ...localData, updatingItemId: null })
            })
            .catch(error => {
                setLocalData({ ...localData, updatingItemId: null })
                alert(error.message)
            })
    }

    const serverRequestForUpdateQuantity = async (productId, key, quantity) => {
        if (localData.updatingItemId)
            return
        updateItemId(productId)
        requestUpdateCart(key, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                    updateItemId(null)
                } else {
                    setLocalData({ ...localData, updatingItemId: null, error: response.message })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, updatingItemId: null, error: error.message })
            })
    }

    const serverRequestForDeleteFromCart = async (productId, productkey) => {
        if (localData.updatingItemId)
            return
        updateItemId(productId)
        requestRemoveFromCart(productkey)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
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

    const updateItemId = (id) => {
        setLocalData({ ...localData, updatingItemId: id })
    }

    log("category products container view", "rendring...")

    return (
        <View>
            <ProductVariationDialog
                visibility={localData.visibility}
                data={localData.variationDataList}
                onSelect={onSelect}
                selectedVariation={selectedVariation}
            />
            <CategoryProducts
                cart={cart}
                item={item}
                addToCart={serverRequestForAddToCart}
                updateQuantity={serverRequestForUpdateQuantity}
                removeFromCart={serverRequestForDeleteFromCart}
                updatingItemId={localData.updatingItemId}
                setUpdateItemId={updateItemId}
                showVariationDialog={showVariationDialog}
                navigateToProductList={navigateToProductList}
            />
        </View>
    )
}

export default memo(CategoryProductsContainer)