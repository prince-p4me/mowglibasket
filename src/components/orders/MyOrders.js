import React, { useState, useEffect } from 'react'
import {
    SafeAreaView, View, Text, 
    TouchableOpacity, RefreshControl, FlatList, 
} from 'react-native'
import ToolbarBack from '../../common/ToolbarBack'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { requestMyOrders } from '../../apis/Api'
import ErrorView from '../../common/ErrorView'
import EmptyMyOrders from './EmptyMyOrders'
import EmptyMyOrdersListItem from './EmptyMyOrdersListItem'
import AsyncStorage  from '@react-native-async-storage/async-storage'
// "processing",
// "on-hold",
// "completed",
// "cancelled",
// "refunded",   //We have this status also but we are not using it.
// "failed",    //There no any case for this status
const MyOrders = (props) => {

    const [localData, setLocalData] = useState({ loading: false, isLoadingMore: false, refreshing: false })
    const [page, setPage] = useState(1);
    let tempPage = 1
    const { navigation } = props

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            serverRequestForMyOrders(1, true, localData.refreshing, localData.isLoadingMore)
        })
        return unsubscribe
    }, [navigation])

    const serverRequestForMyOrders = async (pageNo, load, refresh, isLoadMore) => {

        if (localData.loading || localData.isLoadingMore || localData.refreshing)
            return

        if (load) setLocalData({ ...localData, loading: true })
        if (refresh) setLocalData({ ...localData, refreshing: true })
        if (isLoadMore) setLocalData({ ...localData, refreshing: true })

        let temp = await AsyncStorage.getItem("@user")
        let user = JSON.parse(temp)
        requestMyOrders(user.user_id, pageNo)
            // requestMyOrders(173, pageNo)
            .then(response => {
                if (response.status) {
                    if (tempPage == 1) {
                        setLocalData({ ...localData, orders: response.data, totalPage: response.total_page_count, loading: false, refreshing: false, isLoadingMore: false })
                    } else {
                        let allOrders = localData.orders;
                        localData.orders.push(...response.data)
                        setLocalData({ ...localData, orders: allOrders, totalPage: response.total_page_count, loading: false, refreshing: false, isLoadingMore: false })
                    }
                } else {
                    setLocalData({ ...localData, loading: false, refreshing: false, isLoadingMore: false, error: response.message })
                }
            })
            .catch(error => {
                setLocalData({ ...localData, loading: false, refreshing: false, isLoadingMore: false, error: error.message })
            })
    }

    const pullTorefresh = () => {
        tempPage = 1
        setPage(1)
        setLocalData({ ...localData, orders: [] })
        serverRequestForMyOrders(1, localData.loading, true, localData.isLoadingMore)
    }

    const loadMore = () => {
        let newPage = page + 1;
        tempPage = newPage
        setLocalData({ ...localData, isLoadingMore: true })
        serverRequestForMyOrders(newPage, localData.loading, localData.refreshing, true)
        setPage(newPage)
    }

    const onOrderClicked = (item) => {
        if (item && item.service_id && item.service_id == '12693' && item.order_status == "Pending payment") {
            props.navigation.navigate('amountToPay', { item: item })
        } else {
            props.navigation.navigate('orderDetails', { orderId: item.order_id })
        }
    }

    const OrderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => onOrderClicked(item)}>
                    <View style={[MStyles.main, MStyles.horizontal, { padding: 12 }]}>
                        <View style={[MStyles.main]}>
                            <Text style={[MStyles.productTitle]}>{item.service_id ? "Request" : "Order"} Id : #{item.order_id}</Text>
                            <Text style={[MStyles.productQuntity, { marginTop: 5 }]}>{item.service_id ? "Requested" : "Ordered"} on {item.order_date}</Text>
                            <View style={[
                                (item.order_status === "Delivered") ? MStyles.completed :
                                    (item.order_status === "Dispatched" || item.order_status === "Processing") ? MStyles.processing :
                                        (item.order_status === "Pending payment" || item.order_status === "On Hold") ? MStyles.pending :
                                            (item.order_status === "Cancelled" || item.order_status === "Failed" || item.order_status === "Refunded") ? MStyles.cancelled : null
                                , { marginTop: 8 }]}>
                                <Text style={[
                                    MStyles.txtDescription,
                                    (item.order_status === "Delivered") ? { color: Colors.white } :
                                        (item.order_status === "Dispatched" || item.order_status === "Processing") ? { color: Colors.processingText } :
                                            (item.order_status === "Pending payment" || item.order_status === "On Hold") ? { color: Colors.pendingText } :
                                                (item.order_status === "Cancelled" || item.order_status === "Failed" || item.order_status === "Refunded") ? { color: Colors.white } :
                                                    { color: Colors.white }
                                ]}>{item.order_status}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={MStyles.divider} />
            </View>
        )
    }

    return (
        <SafeAreaView style={MStyles.mainAuth}>
            <View style={MStyles.main}>
                <ToolbarBack {...props} title="My Orders" />
                {localData.loading
                    ?
                    <EmptyMyOrders />
                    :
                    <>
                        {
                            localData.orders ?
                                <FlatList
                                    data={localData.orders}
                                    keyExtractor={(item) => JSON.stringify(item.order_id)}
                                    renderItem={OrderItem}
                                    refreshControl={<RefreshControl refreshing={localData.refreshing} onRefresh={() => pullTorefresh()} />}
                                    onEndReached={() => {
                                        if (localData.totalPage > page) {
                                            loadMore()
                                        }
                                    }}
                                    ListFooterComponent={() => {
                                        // if (localData.isLoadingMore) return <ActivityIndicator size='large' color={Colors.primaryDark} />
                                        if (localData.isLoadingMore) return <EmptyMyOrdersListItem />
                                        else return null
                                    }}
                                    onEndReachedThreshold={.03}
                                />
                                : localData.error ? <ErrorView message={localData.error} /> : null
                        }
                    </>
                }
            </View>
        </SafeAreaView>
    )
}

export default MyOrders