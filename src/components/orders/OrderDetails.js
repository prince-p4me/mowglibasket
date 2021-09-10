import React, { useState, useEffect } from 'react'
import {
    SafeAreaView, StyleSheet, View, Text, Image,
    FlatList, Linking, TouchableOpacity
} from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import ToolbarBack from '../../common/ToolbarBack'
import { requestOrderDetails } from '../../apis/Api'
import { RUPEES } from '../../common/Constants'
import OrderDetailsProductItem from './OrderDetailsProductItem'
import EmptyOrderDetails from './EmptyOrderDetails'

const OrderDetails = (props) => {

    const pay = [{
        label: 'Cash on Delivery',
        value: 'cod',
        description: 'This is desc'
    },
    {
        label: 'RazorPay',
        value: 'razorpay',
        description: 'This is desc'
    }]

    const { orderId } = props.route.params

    const [data, setData] = useState({})
    const [payment, setPayment] = useState();
    const [codPrice, setCodPrice] = useState();

    useEffect(() => {
        serverRequestForOrderDetails()
    }, [])

    const serverRequestForOrderDetails = async () => {

        if (data.loading) return

        setData({ ...data, loading: true })
        //TODO
        // requestOrderDetails(orderId)
        requestOrderDetails(orderId)
            .then(response => {
                if (response.status) {
                    setData({ ...data, orderDetail: response.data, loading: false })

                } else {
                    setData({ ...data, error: response.message, loading: false })
                }
            })
            .catch(error => {
                setData({ ...data, loading: false, error: error.message })
            })
    }

    const submitCod = () => {
    }

    const Header = () => {
        return (
            <>
                <View style={[{ paddingHorizontal: 16 }]}>
                    <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                        <Text style={[MStyles.txtDescriptionBold]}>{data.orderDetail.service_id ? "Request" : "Order"} Status</Text>
                        <Text style={[MStyles.txtDescription]}>{data.orderDetail.order_status}</Text>
                    </View>
                    <View style={[MStyles.divider]} />
                    <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                        <Text style={[MStyles.txtDescriptionBold]}>{data.orderDetail.service_id ? "Request" : "Order"} ID</Text>
                        <Text style={[MStyles.txtDescription]}>#{data.orderDetail.order_id}</Text>
                    </View>
                    {data.orderDetail.service_id &&
                        <>
                            {/* <View style={[MStyles.divider]} />
                            <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                                <Text style={[MStyles.txtDescription]}>Service ID</Text>
                                <Text style={[MStyles.txtDescription]}>#{data.orderDetail.service_id}</Text>
                            </View> */}
                            <View style={[MStyles.divider]} />
                            <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                                <Text style={[MStyles.txtDescriptionBold]}>Service</Text>
                                <Text style={[MStyles.txtDescription]}>{data.orderDetail.service_title}</Text>
                            </View>
                        </>
                    }
                    <View style={[MStyles.divider]} />
                    <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                        <Text style={[MStyles.txtDescriptionBold]}>{data.orderDetail.service_id ? "Request" : "Order"} Date</Text>
                        <Text style={[MStyles.txtDescription]}>{data.orderDetail.order_date}</Text>
                    </View>
                    {
                        data.orderDetail.subtotal &&
                        <>
                            <View style={[MStyles.divider]} />
                            <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                                <Text style={[MStyles.txtDescriptionBold]}>Order Subtotal</Text>
                                <Text style={[MStyles.txtDescription]}>{RUPEES} {data.orderDetail.subtotal}</Text>
                            </View>
                        </>
                    }
                    {
                        data.orderDetail.used_coupon &&
                        <>
                            <View style={[MStyles.divider]} />
                            <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                                <Text style={[MStyles.txtDescriptionBold]}>Discount ({data.orderDetail.used_coupon})</Text>
                                <Text style={[MStyles.txtDescription]}>{RUPEES} {data.orderDetail.discount}</Text>
                            </View>
                        </>
                    }
                    {
                        data.orderDetail.referral_discount_label &&
                        <>
                            <View style={[MStyles.divider]} />
                            <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                                <Text style={[MStyles.txtDescriptionBold, { marginEnd: 5 }]}>{data.orderDetail.referral_discount_label}</Text>
                                <Text style={[MStyles.txtDescription]}>- {RUPEES} {data.orderDetail.redeem_amount}</Text>
                            </View>
                        </>
                    }
                    {
                        data.orderDetail.delivery_charge &&
                        <><View style={[MStyles.divider]} />
                            <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                                <Text style={[MStyles.txtDescriptionBold]}>{data.orderDetail.delivery_charge.label}</Text>
                                <Text style={[MStyles.txtDescription]}>{RUPEES} {data.orderDetail.delivery_charge.cost}</Text>
                            </View>
                        </>
                    }
                    {
                        (!data.orderDetail.service_id || data.orderDetail.service_id == '12693') &&
                        <>
                            <View style={[MStyles.divider]} />
                            <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                                <Text style={[MStyles.txtDescriptionBold]}>Order Total</Text>
                                <View style={MStyles.horizontal}>
                                    <Text style={[MStyles.txtDescription]}>{RUPEES} {data.orderDetail.total} </Text>
                                    {!data.orderDetail.service_id && <Text style={[MStyles.txtDescription]}>({data.orderDetail.total_items} items)</Text>}
                                </View>
                            </View>
                        </>
                    }
                </View>
                { data.orderDetail.order_otp &&
                    <>
                        <View style={[MStyles.divider]} />
                        <View style={[{ padding: 16, alignItems: 'center' }]}>
                            <Text style={[MStyles.txtTitleSmall]}>Delivery OTP</Text>
                            <Text style={[MStyles.txtSubTitle, { fontSize: 20, marginTop: 5 }]}>{data.orderDetail.order_otp}</Text>
                            <Text style={[MStyles.txtDescription, { marginTop: 5, textAlign: 'center' }]}>Share this OTP with {data.orderDetail.service_id ? "service" : "delivery"} boy once you receive your {data.orderDetail.service_id ? "service" : "order"} successfully</Text>
                        </View>
                    </>
                }
                <View style={[MStyles.divider]} />
                <View style={[{ padding: 16 }]}>
                    {data.orderDetail.payment_method &&
                        <>
                            <Text style={[MStyles.txtSubTitle, { fontWeight: 'normal' }]}>Payment Method</Text>
                            <Text style={[MStyles.txtDescription, { marginTop: 5 }]}>{data.orderDetail.payment_method}</Text>
                        </>
                    }
                    <Text style={[MStyles.txtSubTitle, data.orderDetail.payment_method && { marginTop: 16 }]}>{data.orderDetail.service_id ? "Service" : "Delivery"} Address</Text>
                    <Text style={[MStyles.txtDescription, { marginTop: 5 }]}>{data.orderDetail.address.display_address}</Text>
                    <View style={[MStyles.horizontal, { alignItems: 'center' }]}>
                        <Text style={[MStyles.txtDescriptionBold]}>Phone number: </Text>
                        <Text style={[MStyles.txtDescription]}>{data.orderDetail.mobile}</Text>
                    </View>
                </View>
                <View style={[MStyles.divider]} />
            </>
        )
    }

    const Footer = () => {
        return (
            <>
                <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${data.orderDetail.contact_info.number}`)}
                    style={[MStyles.horizontal,
                    { marginTop: 16, padding: 16, justifyContent: 'space-between', backgroundColor: Colors.primaryDark }]}>
                    <Text style={[MStyles.txtDescription,
                    { textAlign: 'center', color: Colors.white }]}>{data.orderDetail.contact_info.message}</Text>
                </TouchableOpacity>
            </>
        )
    }

    const renderItem = ({ item }) => {
        return <OrderDetailsProductItem {...props} item={item} />
    }

    return (
        <SafeAreaView style={[MStyles.mainGray]} >
            <ToolbarBack {...props} title="Order Details" />
            {/* <ProgressDialog loading={loading} /> */}
            <View style={[MStyles.main]}>
                {
                    data.loading ?
                        <EmptyOrderDetails />
                        :
                        data.orderDetail &&
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data.orderDetail ? data.orderDetail.products : []}
                            ListHeaderComponent={() => <Header />}
                            renderItem={renderItem}
                            keyExtractor={(item) => JSON.stringify(item.product_id)}
                            ListFooterComponent={() => <Footer />}
                        // ListEmptyComponent={() => { data.error && <ErrorView message={data.error} /> }}
                        />
                }
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    timeSlot: {
        paddingHorizontal: 16,
        paddingVertical: 7,
        backgroundColor: Colors.white,
        borderRadius: 5,
        marginHorizontal: 8,
        marginBottom: 16,
        alignSelf: 'baseline'
    },
    timeSlotSelcted: {
        paddingHorizontal: 16,
        paddingVertical: 7,
        backgroundColor: Colors.primaryDark,
        borderRadius: 5,
        marginHorizontal: 8,
        marginBottom: 16,
        alignSelf: 'baseline'
    },
    paymentTitle: {
        ...MStyles.productTitle,
        margin: 16,
        marginLeft: 20
    },
    paymentDetails: {
        ...MStyles.productTitle,
        paddingHorizontal: 16,
        paddingVertical: 8,
        // backgroundColor: '#f5f5f5'
    },
    deliveryTitle: {
        justifyContent: 'space-between',
        padding: 10
    },
    whiteDivider: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.white
    },
    deliveryText: {
        ...MStyles.txtDescription,
        fontSize: 14,
    },
    deliveryCard: {
        flexDirection: 'row',
        margin: 5,
        padding: 10,
        backgroundColor: Colors.white,
        elevation: 3,
    },
    deliveryText: {
        ...MStyles.txtDescription,
        marginLeft: 8,
        color: '#585858'
    },
    couponView: {
        backgroundColor: Colors.white,
        padding: 10
    },
    couponEnterView: {
        flexDirection: 'row',
        backgroundColor: Colors.white
    },
    couponInput: {
        ...MStyles.textInput,
        marginTop: 10,
        backgroundColor: Colors.dividerColorLight,
        flex: 1
    },
    buttonCoupon: {
        alignSelf: 'baseline',
        alignSelf: 'center',
        marginLeft: 10
    },
    couponText: {
        alignSelf: 'center',
        flex: 1,
        color: Colors.textGray
    },
    removeCoupon: {
        marginTop: 0
    },
})
export default OrderDetails