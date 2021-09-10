import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../styles/MStyles'
import { View, FlatList, Text,  RefreshControl, TouchableOpacity } from 'react-native'
import ToolbarProductList from '../../common/ToolbarProductList'
import Colors from '../../styles/Colors'
import { requestProductList, requestAddToCart, requestUpdateCart, requestRemoveFromCart } from '../../apis/Api'
import ErrorView from '../../common/ErrorView'
import ProductItem from './ProductItem'
// import { Context as FilterContext } from '../../context/FilterContext'
import { Context as CartContext } from '../../context/CartContext'
// import { Context as ClickContext } from '../../context/ClickContext'
import EmptyList from '../empty/EmptyList'
import EmptyListItem from '../empty/EmptyListItem'
import { Platform, UIManager } from 'react-native'
import { log } from '../../common/Utils'

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const DiscountedProductList = (props) => {

    //  for API request : "type":"cat"/"brand"/"search"  "filter": 0/1
    // const { state: { clicked }, setClicked, setClickFree } = useContext(ClickContext)
    // const { state, clearFilter, filtered } = useContext(FilterContext)
    const { state: { cart }, updateCartAndTotal, clearCart } = useContext(CartContext)
    const {  id, searchKeyword, item } = props.route.params

    const [data, setData] = useState({
        loading: false,
        error: '',
        products: null,
        isLoadingMore: false,
        page: 1,
        refreshing: false,
        totalPage: 0,
        totalItems: 0,
        updatingItemId: 0
    })

    log("details data", JSON.stringify(props))

    // let alter = false;
    // useEffect(() => {
    //     setTimeout(() => {
    //         checkForUpdates()
    //     }, 200)
    // }, [state.updated])
    // const checkForUpdates = () => {
    //     if (state.updated) {
    //         filtered(false)
    //         alter = true
    //         setData({ ...data, products: null, page: 1 })
    //         serverRequestForProducts(1, true, false, false)
    //     }
    // }

    useEffect(() => {
        // clearFilter()
        // setData({ ...data, products: null })
        serverRequestForProducts(1, true, false, false)
        // return (() => { clearFilter() })
    }, [])

    const updateItemId = (id) => {
        setData({ ...data, updatingItemId: id })
    }

    const pullTorefresh = () => {
        if (data.refreshing)
            return
        // clearFilter()
        serverRequestForProducts(1, false, false, true)
    }

    const loadMore = () => {
        if (data.isLoadingMore)
            return
        let newPage = data.page + 1;
        serverRequestForProducts(newPage, false, true, false)
    }

    const serverRequestForProducts = async (pageNo, loading, isLoadingMore, refreshing) => {

        setData({
            ...data, loading, refreshing, isLoadingMore, page: pageNo,
            products: pageNo == 1 ? null : data.products
        })

        let jsonRequest = {}
        jsonRequest.type = 'cat'
        jsonRequest.page_no = pageNo
        // jsonRequest.term_id = 0
        jsonRequest.filter = 1
        jsonRequest.brand_ids = []

        if (item.type == 'fix') {
            jsonRequest.min_price = 0
            jsonRequest.max_price = item.price
        }

        if (item.type == 'percent') {
            jsonRequest.discount = item.value
        }

        // if (alter) {
        //     if (!state.filter ||
        //         (state.filter.brands.length == 0
        //             && state.filter.minPrice === ''
        //             && state.filter.maxPrice === ''
        //             && state.filter.sortBy === '')) {
        //         jsonRequest.filter = 0
        //     } else {
        //         jsonRequest.filter = alter ? 1 : 0
        //         jsonRequest.brand_ids = state.filter.brands
        //         jsonRequest.min_price = state.filter.minPrice
        //         jsonRequest.max_price = state.filter.maxPrice
        //         jsonRequest.sort_by = state.filter.sortBy
        //     }
        // } else {
        //     if (!state.filter ||
        //         (state.filter.brands.length == 0
        //             && state.filter.minPrice === ''
        //             && state.filter.maxPrice === ''
        //             && state.filter.sortBy === '')) {
        //         jsonRequest.filter = 0
        //     } else {
        //         jsonRequest.filter = alter ? 1 : 0
        //         jsonRequest.brand_ids = state.filter.brands
        //         jsonRequest.min_price = state.filter.minPrice
        //         jsonRequest.max_price = state.filter.maxPrice
        //         jsonRequest.sort_by = state.filter.sortBy
        //     }
        //     // jsonRequest.filter = 0
        // }

        requestProductList(jsonRequest)
            .then(response => {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
                if (response.status) {
                    if (pageNo == 1) {
                        setData({
                            ...data,
                            loading: false,
                            isLoadingMore: false,
                            refreshing: false,
                            products: response.data,
                            totalPage: response.total_page_count,
                            totalItems: response.total_items,
                            page: pageNo
                        })
                    } else {
                        let allProducts = data.products;
                        allProducts.push(...response.data)
                        setData({
                            ...data,
                            loading: false,
                            isLoadingMore: false,
                            refreshing: false,
                            products: allProducts,
                            totalPage: response.total_page_count,
                            totalItems: response.total_items,
                            page: pageNo
                        })
                    }
                } else {
                    setData({
                        ...data,
                        loading: false,
                        isLoadingMore: false,
                        refreshing: false,
                        error: response.message,
                    })
                }
            })
            .catch(error => {
                setData({
                    ...data,
                    loading: false,
                    isLoadingMore: false,
                    refreshing: false,
                    error: error.message,
                })
            })
    }

    const serverRequestForAddToCart = async (productId, variationId, quantity) => {

        if (data.updatingItemId)
            return

        requestAddToCart(productId, variationId, quantity)
            .then(response => {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                }
                // setClickFree()
                setData({ ...data, updatingItemId: null })
            })
            .catch(error => {
                // setClickFree()
                setData({ ...data, updatingItemId: null })
            })
    }

    const serverRequestForUpdateQuantity = async (key, quantity) => {
        if (data.updatingItemId)
            return
        requestUpdateCart(key, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                }
                // setClickFree()
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                setData({ ...data, updatingItemId: null })
            })
            .catch(error => {
                // setClickFree()
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                setData({ ...data, updatingItemId: null })
            })
    }

    const serverRequestForDeleteFromCart = async (productkey) => {
        if (data.updatingItemId)
            return
        requestRemoveFromCart(productkey)
            .then(response => {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                    setData({ ...data, updatingItemId: null })
                } else {
                    clearCart()
                    setData({ ...data, updatingItemId: null, error: response.message })
                }
                // setClickFree()
            })
            .catch(error => {
                // setClickFree()
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                setData({ ...data, updatingItemId: null, error: error.message })
            })
    }


    const Header = (props) => {
        return (
            <View>
                <View style={[MStyles.horizontal, { paddingHorizontal: 5, marginVertical: 5, alignItems: 'center', justifyContent: 'space-between' }]}>
                    <Text style={[MStyles.txtDescription]}>{data.totalItems} Items</Text>

                    {/* <TouchableOpacity activeOpacity={0.5}
                        onPress={() => {
                            // if (!clicked) {
                            props.navigation.navigate('filter', { type, id, searchKeyword })
                            // setClicked()
                            // }
                        }}
                        style={[MStyles.cardView, MStyles.center, { borderRadius: 5, padding: 5 }]}
                    >
                        <View style={[MStyles.horizontal]}>
                            <Image source={require('../../images/filter.png')}
                                style={{ width: 20, height: 20 }} />
                            <Text style={[MStyles.txtDescription]}> Filter</Text>
                        </View>
                    </TouchableOpacity>
            */}
                </View>
            </View >
        )
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarProductList {...props} title="Mowgli Basket" cart={cart} />
            <View style={[MStyles.mainGray]}>
                {/* <ProgressDialog loading={loading} /> */}

                {data.loading ? <EmptyList />
                    :
                    <>
                        {
                            data.products ?
                                <>
                                    < FlatList
                                        showsVerticalScrollIndicator={false}
                                        ListHeaderComponent={() => <Header {...props} totalItems={data.totalItems} />}
                                        data={data.products}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) =>
                                            <ProductItem
                                                {...props}
                                                cart={cart}
                                                item={item}
                                                addToCart={serverRequestForAddToCart}
                                                updateQuantity={serverRequestForUpdateQuantity}
                                                removeFromCart={serverRequestForDeleteFromCart}
                                                loading={data.loading}
                                                refreshing={data.refreshing}
                                                isLoadingMore={data.isLoadingMore}
                                                updatingItemId={data.updatingItemId}
                                                setUpdateItemId={updateItemId}
                                            />
                                        }
                                        refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={() => pullTorefresh()} />}
                                        onEndReached={() => {
                                            if (data.totalPage > data.page) {
                                                loadMore()
                                            }
                                        }}
                                        ListFooterComponent={() => {
                                            if (data.isLoadingMore) return <EmptyListItem />
                                            else return null
                                        }}
                                        onEndReachedThreshold={.3}
                                    />
                                    {
                                        cart && cart.length > 0 &&
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            onPress={() => {
                                                // if (!clicked) {
                                                props.navigation.navigate('cart')
                                                // setClicked()
                                                // }
                                            }} >

                                            <View style={[MStyles.horizontal]}>
                                                <View style={[MStyles.horizontal, MStyles.center, { flex: 1, padding: 13, alignItems: "center", backgroundColor: Colors.primaryDark }]}>
                                                    <Text style={[MStyles.txtSubTitleSemiBold, { color: Colors.white }]}> PROCEED TO CART </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </>
                                : data.error ? <ErrorView message={data.error} /> : null
                        }
                    </>
                }

            </View>
        </SafeAreaView >
    )
}

export default DiscountedProductList