import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../styles/MStyles'
import {
    View, FlatList, Text, TextInput, Image,
    RefreshControl, TouchableOpacity
} from 'react-native'
import ToolbarTabs from '../../common/ToolbarTabs'
import Colors from '../../styles/Colors'
import {
    requestProductList, requestAddToCart,
    requestUpdateCart, requestRemoveFromCart
} from '../../apis/Api'
import ErrorView from '../../common/ErrorView'
import ProductItem from '../products/ProductItem'
import { Context as FilterContext } from '../../context/FilterContext'
import { Context as CartContext } from '../../context/CartContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EmptyList from '../empty/EmptyList'
import EmptyListItem from '../empty/EmptyListItem'
import ProductsHeaderLine from '../../common/ProductsHederLine'
import { ITEMS_FOUND } from '../../common/Constants'

const Vegetable = (props) => {

    const { state, clearFilter, filtered } = useContext(FilterContext)
    const { state: { data, cart }, updateCartAndTotal, clearCart } = useContext(CartContext)
    const [myState, setMyState] = useState({ isLoadingMore: false, refreshing: false, searchKeyword: '' })
    const [page, setPage] = useState(1);
    let alter = false, tempPage = 1, type = 'cat';
    let id = '2034';

    useEffect(() => {
        setTimeout(() => {
            checkForUpdates()
        }, 200)
    }, [state.updated])

    const checkForUpdates = () => {
        if (state.updated) {
            filtered(false)
            alter = true
            tempPage = 1
            setPage(1)
            setMyState({ ...myState, products: null })
            serverRequestForProducts(1, true, false, false)
        }
    }

    useEffect(() => {
        tempPage = 1
        clearFilter()
        setMyState({ ...myState, products: null })
        serverRequestForProducts(1, true, false, false)
    }, [])

    const serverRequestForProducts = async (pageNo, loading, isLoadingMore, refreshing) => {

        if (refreshing || loading) setMyState({ ...myState, loading: true })
        if (isLoadingMore) setMyState({ ...myState, isLoadingMore: true })

        let jsonRequest = {}
        // "type":"cat"/"brand"/"search"  "filter": 0/1

        jsonRequest.type = type
        jsonRequest.page_no = pageNo

        if (type === "search") {
            jsonRequest.keyword = myState.searchKeyword
        } else {
            jsonRequest.term_id = id
        }

        if (alter) {
            if (!state.filter ||
                (state.filter.brands.length == 0
                    && state.filter.minPrice === ''
                    && state.filter.maxPrice === ''
                    && state.filter.sortBy === '')) {
                jsonRequest.filter = 0
            } else {
                jsonRequest.filter = alter ? 1 : 0
                jsonRequest.brand_ids = state.filter.brands
                jsonRequest.min_price = state.filter.minPrice
                jsonRequest.max_price = state.filter.maxPrice
                jsonRequest.sort_by = state.filter.sortBy
            }
        } else {
            if (!state.filter ||
                (state.filter.brands.length == 0
                    && state.filter.minPrice === ''
                    && state.filter.maxPrice === ''
                    && state.filter.sortBy === '')) {
                jsonRequest.filter = 0
            } else {
                // jsonRequest.filter = alter ? 1 : 0
                jsonRequest.filter = 1
                jsonRequest.brand_ids = state.filter.brands
                jsonRequest.min_price = state.filter.minPrice
                jsonRequest.max_price = state.filter.maxPrice
                jsonRequest.sort_by = state.filter.sortBy
            }
            // jsonRequest.filter = 0
        }

        requestProductList(jsonRequest)
            .then(response => {
                if (response.status) {
                    if (tempPage == 1) {
                        setMyState({
                            ...myState, products: response.data, loading: false, isLoadingMore: false, refreshing: false, totalPage: response.total_page_count,
                            totalItems: response.total_items
                        })
                    } else {
                        let allProducts = myState.products;
                        allProducts.push(...response.data)
                        setMyState({
                            ...myState, products: allProducts, loading: false, isLoadingMore: false, refreshing: false, totalPage: response.total_page_count,
                            totalItems: response.total_items
                        })
                    }

                } else {
                    setMyState({ ...myState, products: null, error: response.message, isLoadingMore: false, refreshing: false, loading: false })
                }
            })
            .catch(error => {
                setMyState({ ...myState, loading: false, error: error.message, isLoadingMore: false, refreshing: false })
            })
    }

    const serverRequestForAddToCart = async (productId, variationId, quantity) => {
        if (myState.updatingItemId)
            return
        requestAddToCart(productId, variationId, quantity)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                }
                updateItemId(null)
            })
            .catch(error => {
                updateItemId(null)
            })
    }

    const serverRequestForUpdateQuantity = async (key, quantity) => {
        if (myState.updatingItemId)
            return
        requestUpdateCart(key, quantity)
            .then(response => {
                if (response.status) {
                    // updateCart(response.data)
                    // updateTotal(response.cart_total)
                    updateCartAndTotal(response.data, response.cart_total)
                    // updateTotal()
                } else {
                    // setError(response.message)
                }
                // setClickFree()
                updateItemId(null)
            })
            .catch(error => {
                updateItemId(null)
            })
    }

    const serverRequestForDeleteFromCart = async (productkey) => {
        if (myState.updatingItemId)
            return
        requestRemoveFromCart(productkey)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                    clearCart()
                    setMyState({ ...myState, error: response.message })
                }
                updateItemId(null)
            })
            .catch(error => {
                updateItemId(null)
                setMyState({ ...myState, error: response.message })
            })
    }

    const updateItemId = (id) => {
        setMyState({ ...myState, updatingItemId: id })
    }

    const pullTorefresh = () => {

        if (myState.refreshing)
            return
        tempPage = 1
        setPage(1)
        setMyState({ ...myState, products: null })
        serverRequestForProducts(1, false, false, true)
    }

    const loadMore = () => {
        if (myState.isLoadingMore)
            return
        let newPage = page + 1;
        tempPage = newPage
        serverRequestForProducts(newPage, false, true, false)
        setPage(newPage)
    }

    const Header = (props) => {
        return (
            <View>
                <View style={[MStyles.horizontal, { paddingHorizontal: 5, marginVertical: 5, alignItems: 'center', justifyContent: 'space-between' }]}>
                    <Text style={[MStyles.txtDescription]}>{myState.totalItems} {ITEMS_FOUND}</Text>

                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => {
                            props.navigation.navigate('filter', { type, id, searchKeyword: '' })
                        }}
                        style={[MStyles.cardView, MStyles.center, { borderRadius: 5, padding: 5 }]}
                    >
                        <View style={[MStyles.horizontal]}>
                            <Image source={require('../../images/filter.png')}
                                style={{ width: 20, height: 20 }} />
                            <Text style={[MStyles.txtDescription]}> Filter</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ProductsHeaderLine />
            </View >
        )
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ToolbarTabs {...props} cart={cart} />
            <View style={[MStyles.mainGray]}>
                {
                    myState.loading
                        ?
                        <EmptyList />
                        :
                        <>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                props.navigation.navigate('search')
                            }} >
                                <View style={[MStyles.homeSearch, { justifyContent: 'flex-end' }]}>
                                    <TextInput
                                        style={[MStyles.homeSearchInput]}
                                        placeholder='Search for products'
                                        pointerEvents={"none"}
                                        editable={false} />
                                    <Ionicons
                                        name='md-search'
                                        size={24} color={Colors.dividerColor}
                                        style={{ position: 'absolute', paddingRight: 16, paddingBottom: 10 }} />
                                </View>
                            </TouchableOpacity>
                            {myState.products ?
                                <>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        ListHeaderComponent={() => <Header {...props} />}
                                        data={myState.products}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) =>
                                            <ProductItem
                                                {...props}
                                                cart={cart}
                                                item={item}
                                                addToCart={serverRequestForAddToCart}
                                                updateQuantity={serverRequestForUpdateQuantity}
                                                removeFromCart={serverRequestForDeleteFromCart}
                                                loading={myState.loading}
                                                refreshing={myState.refreshing}
                                                isLoadingMore={myState.isLoadingMore}
                                                updatingItemId={myState.updatingItemId}
                                                setUpdateItemId={updateItemId}
                                            />
                                        }
                                        refreshControl={<RefreshControl refreshing={myState.refreshing} onRefresh={() => pullTorefresh()} />}
                                        onEndReached={({ distanceFromEnd }) => {
                                            if (myState.totalPage > page) {
                                                loadMore()
                                            }
                                        }}
                                        ListFooterComponent={() => {
                                            // if (myState.isLoadingMore) return <ActivityIndicator size='large' color={Colors.primaryDark} />
                                            if (myState.isLoadingMore) return <EmptyListItem />
                                            else return null
                                        }}
                                        onEndReachedThreshold={.03}
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
                                : myState.error ? <ErrorView message={myState.error} /> : null}
                        </>
                }
            </View>
        </SafeAreaView>
    )
}

export default Vegetable