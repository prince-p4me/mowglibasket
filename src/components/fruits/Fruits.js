import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../styles/MStyles'
import {
    View, FlatList, Text, TextInput,
    Image, RefreshControl, TouchableOpacity
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

const Fruits = (props) => {

    const { state, clearFilter, filtered } = useContext(FilterContext)
    const { state: { data, cart }, clearCart, updateCartAndTotal } = useContext(CartContext)
    const [MyState, setMyState] = useState({ totalItems: 0, totalPage: 0, refreshing: false, updatingItemId: 0, isLoadingMore: false })
    const [page, setPage] = useState(1);
    let alter = false, tempPage = 1, type = 'cat', searchKeyword = '';
    let id = '2035';

    useEffect(() => {

        tempPage = 1
        clearFilter()
        setMyState({ ...MyState, products: null })
        serverRequestForProducts(1, true, false, false)
    }, [])

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
            setMyState({ ...MyState, products: null })
            serverRequestForProducts(1, true, false, false)
        }
    }

    const serverRequestForProducts = async (pageNo, loading, isLoadingMore, refreshing) => {

        if (refreshing || loading) setMyState({ ...MyState, loading: true })
        if (isLoadingMore) setMyState({ ...MyState, isLoadingMore: true })

        let jsonRequest = {}
        jsonRequest.type = type
        jsonRequest.page_no = pageNo

        if (type === "search") {
            jsonRequest.keyword = searchKeyword
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
                jsonRequest.filter = 1
                jsonRequest.brand_ids = state.filter.brands
                jsonRequest.min_price = state.filter.minPrice
                jsonRequest.max_price = state.filter.maxPrice
                jsonRequest.sort_by = state.filter.sortBy
            }
        }

        requestProductList(jsonRequest)
            .then(response => {
                if (response.status) {
                    if (tempPage == 1) {
                        setMyState({
                            ...MyState, products: response.data, totalPage: response.total_page_count,
                            totalItems: response.total_items, refreshing: false, loading: false, error: null
                        })
                    } else {
                        let allProducts = MyState.products;
                        allProducts.push(...response.data)
                        setMyState({
                            ...MyState, products: allProducts, totalPage: response.total_page_count,
                            totalItems: response.total_items, refreshing: false, loading: false, error: null
                        })
                    }
                } else {
                    setMyState({ ...MyState, products: null, error: response.message, refreshing: false, loading: false, isLoadingMore: false })
                }
            })
            .catch(error => {
                setMyState({ ...MyState, refreshing: false, loading: false, isLoadingMore: false, error: error.message })
            })
    }

    const serverRequestForAddToCart = async (productId, variationId, quantity) => {
        if (MyState.updatingItemId)
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
        if (MyState.updatingItemId)
            return
        requestUpdateCart(key, quantity)
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

    const serverRequestForDeleteFromCart = async (productkey) => {
        if (MyState.updatingItemId)
            return
        requestRemoveFromCart(productkey)
            .then(response => {
                if (response.status) {
                    updateCartAndTotal(response.data, response.cart_total)
                } else {
                    clearCart()
                    setMyState({ ...MyState, error: response.message })
                }
                updateItemId(null)
            })
            .catch(error => {
                updateItemId(null)
                setMyState({ ...MyState, error: error.message })
            })
    }

    const updateItemId = (id) => {
        setMyState({ ...MyState, updatingItemId: id })
    }

    const pullTorefresh = () => {
        if (MyState.refreshing)
            return
        tempPage = 1
        // setRefreshing(true)
        setPage(1)
        setMyState({ ...MyState, products: null })
        // setProducts(null)
        serverRequestForProducts(1, false, false, true)
    }

    const loadMore = () => {
        if (MyState.isLoadingMore)
            return
        let newPage = page + 1;
        tempPage = newPage
        // setLoadingMore(true)
        serverRequestForProducts(newPage, false, true, false)
        setPage(newPage)
        setMyState({ ...MyState, isLoadingMore: true })
    }

    const Header = (props) => {
        // const { totalItems } = props
        return (
            <View>
                <View style={[MStyles.horizontal, { paddingHorizontal: 5, marginVertical: 5, alignItems: 'center', justifyContent: 'space-between' }]}>
                    <Text style={[MStyles.txtDescription]}>{MyState.totalItems} {ITEMS_FOUND}</Text>

                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => {
                            // if (!clicked) {
                            props.navigation.navigate('filter', { type, id, searchKeyword: '' })
                            //     setClicked()
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
                    MyState.loading
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
                            {MyState.products ?
                                <>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        ListHeaderComponent={() => <Header {...props} totalItems={MyState.totalItems} />}
                                        data={MyState.products}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) =>
                                            <ProductItem
                                                {...props}
                                                cart={cart}
                                                item={item}
                                                addToCart={serverRequestForAddToCart}
                                                updateQuantity={serverRequestForUpdateQuantity}
                                                removeFromCart={serverRequestForDeleteFromCart}
                                                loading={MyState.loading}
                                                refreshing={MyState.refreshing}
                                                isLoadingMore={MyState.isLoadingMore}
                                                updatingItemId={MyState.updatingItemId}
                                                setUpdateItemId={updateItemId}
                                            />
                                        }
                                        refreshControl={<RefreshControl refreshing={MyState.refreshing} onRefresh={() => pullTorefresh()} />}
                                        onEndReached={({ distanceFromEnd }) => {
                                            if (MyState.totalPage > page) {
                                                loadMore()
                                            }
                                        }}
                                        ListFooterComponent={() => {
                                            // if (MyState.isLoadingMore) return <ActivityIndicator size='large' color={Colors.primaryDark} />
                                            if (MyState.isLoadingMore) return <EmptyListItem />
                                            else return null
                                        }}
                                        onEndReachedThreshold={.03}
                                        ListEmptyComponent={() => <ErrorView message={MyState.error} />}
                                    />
                                    {
                                        cart && cart.length > 0 &&
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            onPress={() => {
                                                // if (!clicked) {
                                                props.navigation.navigate('cart')
                                                //     setClicked()
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
                                : MyState.error ? <ErrorView message={MyState.error} /> : null}
                        </>
                }
            </View>
        </SafeAreaView>
    )
}

export default Fruits