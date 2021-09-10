import React, { useState, memo, useContext, useEffect } from 'react'
import { View } from 'react-native'
import { requestAddToCart, requestUpdateCart, requestRemoveFromCart } from '../../../apis/Api'
import { Context as CartContext } from '../../../context/CartContext'
import { Platform, UIManager, LayoutAnimation } from 'react-native'
import ProductVariationDialog from '../../products/ProductVariationDialog'
import { log } from '../../../common/Utils'
import ProductItem from './ProductItem'

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const ProductItemContainer = (props) => {

    const { state: { cart, data }, updateHomeAndCartData,
        updateCartAndTotal, clearCart } = useContext(CartContext)

    const { item, response, navigateToProductDetails } = props

    const [localData, setLocalData] = useState({
        visibility: false,
        quantity: 0, presentInCart: false, key: null, imageLoading: false
    })

    const [selectedVariation, setSelectedVariation] = useState()

    useEffect(() => {
        // log("Working here---- ",!cart)
        if (!cart) {
            // log("Working here---- ",!data)
            if (!data) {
                // log("Working here---- data updated")
                // updateCartAndTotal(response.data.cart_data)
                updateHomeAndCartData(response.data, response.data.cart_data)
            }
        }
    }, [])

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

    return (
        <View>
            <ProductVariationDialog
                visibility={localData.visibility}
                data={localData.variationDataList}
                onSelect={onSelect}
                selectedVariation={selectedVariation} />
            <ProductItem
                cart={cart}
                item={item}
                navigateToProductDetails={navigateToProductDetails}
                addToCart={serverRequestForAddToCart}
                updateQuantity={serverRequestForUpdateQuantity}
                removeFromCart={serverRequestForDeleteFromCart}
                updatingItemId={localData.updatingItemId}
                setUpdateItemId={updateItemId}
                showVariationDialog={showVariationDialog} />
        </View>
    )
}

export default memo(ProductItemContainer)