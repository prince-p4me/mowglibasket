import React, { useState, useContext } from 'react'
import {
    SafeAreaView, StyleSheet, View, Text, Image,
    TouchableOpacity
} from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import ToolbarBack from '../../../common/ToolbarBack'
import {
    requestReadeemPointsAtServiceCheckout,
    requestServiceCheckoutPaymentParams,
    requestOrderAndPaymentDetails,
    requestServicePaymentResponseUpdate
} from '../../../apis/Api'
import { RUPEES } from '../../../common/Constants'
import { ScrollView } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay'
import CheckBox from '@react-native-community/checkbox'
import PointsRedeemDialog from '../../checkout/PointsRedeemDialog'
import LinearProgressDialog from '../../../common/LinearProgressDialog'
import { Context as AuthContext } from '../../../context/AuthContext'

const PaymentCheckout = (props) => {

    const { amount, item, response } = props.route.params
    const [data, setData] = useState({ loading: false, data: response.data })
    const [payment, setPayment] = useState();
    const [pointsVisibility, setPointsVisibility] = useState(false);
    const { state: { user } } = useContext(AuthContext)

    const completePayment = () => {
        if (!payment) {
            alert('Please choose a payment method')
            return
        }
        // if (payment == 'cod') {
        // } else {
        // }
        serverRequestForCompletePayment()
    }

    const serverRequestForCompletePayment = async () => {

        if (data.loading) return

        setData({ ...data, loading: true })
        requestServiceCheckoutPaymentParams(user.user_id, item.order_id, item.service_id, data.data && data.data.cart_total ? data.data.cart_total : amount, payment, data.data.discount)
            .then(response => {
                if (response.status) {
                    setData({ ...data, loading: false })
                    if (payment === "razorpay") {
                        completeOnlinePayment(response.data)
                    } else if (payment === "cod") {
                        props.navigation.pop(2)
                        props.navigation.navigate('orderDetails', { orderId: item.order_id })
                    }
                } else {
                    setData({ ...data, error: response.message, loading: false })
                    alert(response.message)
                }
            })
            .catch(error => {
                setData({ ...data, loading: false, error: error.message })
                alert(error.message)
            })
    }

    const onApplyPointsClick = async (points) => {
        if (!points) {
            alert('Please enter coupon code')
            return
        }
        setPointsVisibility(false)
        setData({ ...data, loading: true })
        requestReadeemPointsAtServiceCheckout(user.user_id, item.order_id, points, amount)
            .then(response => {
                if (response.status) {
                    setData({ ...data, data: response.data, loading: false })
                } else {
                    alert(response.message)
                    setData({ ...data, loading: false })
                }
            })
            .catch(error => {
                setData({ ...data, loading: false })
                alert(error.message)
            })
    }

    const serverRequestForRemoveRefferralDiscount = async () => {
        // setLoading(true)
        setData({ ...data, loading: true })
        requestOrderAndPaymentDetails(user.user_id, item.order_id)
            .then(response => {
                if (response.status) {
                    // navigatePaymentCheckout(response)
                    setData({ ...data, loading: false, data: response.data })
                } else {
                    setData({ ...data, loading: false })
                    alert(response.message)
                }
                // setLoading(false)
            })
            .catch(error => {
                // setLoading(false)
                setData({ ...data, loading: false })
                alert(error.message)
            })
    }

    const completeOnlinePayment = (checkoutData) => {
        let options = checkoutData.payment_details
        RazorpayCheckout.open(options).then((data) => {
            serverRequestForUpdatePaymentResponse(true, data)
        }).catch((error) => {
            serverRequestForUpdatePaymentResponse(false, error)
        });
    }

    const serverRequestForUpdatePaymentResponse = (status, paymentResponse) => {
        setData({ ...data, loading: true })
        requestServicePaymentResponseUpdate(user.user_id, status, item.order_id, paymentResponse)
            .then(response => {
                if (response.status) {
                    setData({ ...data, loading: false })
                    props.navigation.pop(2)
                    props.navigation.navigate("success", { data: response })
                }
                else {
                    setData({ ...data, loading: false })
                    alert(response.message)
                }
            })
            .catch(error => {
                setData({ ...data, loading: false })
                alert(error.message)
            })
    }

    return (
        <SafeAreaView style={[MStyles.mainGray]} >
            <ToolbarBack {...props} title="Payment Checkout" />
            <LinearProgressDialog loading={data.loading} />
            <PointsRedeemDialog
                visibility={pointsVisibility}
                onSubmit={onApplyPointsClick}
                setVisibility={setPointsVisibility} />

            <View style={[MStyles.main]}>
                <ScrollView>
                    <View style={[{ paddingHorizontal: 16 }]}>
                        <View style={[MStyles.divider]} />
                        <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                            <Text style={[MStyles.txtDescription]}>Request ID</Text>
                            <Text style={[MStyles.txtDescription]}>#{item.order_id}</Text>
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                            <Text style={[MStyles.txtDescription]}>Request Date</Text>
                            <Text style={[MStyles.txtDescription]}>{item.order_date}</Text>
                        </View>
                        {
                            data.data.discount &&
                            <>
                                <View style={[MStyles.divider]} />
                                <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                                    <Text style={[MStyles.txtDescription]}>Subtotal</Text>
                                    <Text style={[MStyles.txtDescription]}>{RUPEES} {data.data && data.data.cart_sub_total ? data.data.cart_sub_total : amount}</Text>
                                </View>
                            </>
                        }
                        <View style={[MStyles.divider]} />
                        <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                            <Text style={[MStyles.txtDescription]}>Total</Text>
                            <Text style={[MStyles.txtDescription]}>{RUPEES}
                                {(data.data && data.data.cart_total) ? data.data.cart_total : amount}
                                {/* {data.data.cart_total} */}
                            </Text>
                        </View>
                    </View>
                    {
                        (!(data.data.referral_points == '0' || data.data.referral_points == 0)) &&
                        <>
                            <View style={[MStyles.dividerDrawer, { justifyContent: 'space-between', padding: 10 }]} />
                            <View style={styles.couponView}>
                                {(!data.data.referral_discount_label) ?
                                    <View>
                                        <View style={MStyles.horizontal}>
                                            <Image
                                                source={require('../../../images/reward_points.png')}
                                                style={{ width: 18, height: 18 }}
                                                resizeMode='contain' />
                                            <View style={[{ marginStart: 10 }]}>
                                                <Text style={[MStyles.txtDescriptionBold]}>{data.data.referral_title}</Text>
                                                <Text style={[MStyles.txtDescriptionBold, { color: Colors.textDarkGray }]}>{data.data.referral_desc}</Text>
                                            </View>
                                        </View>
                                        {/* <Text style={[MStyles.txtDescription, { color: Colors.textGray }]}>If you want to redeem your points click on redeem points.</Text> */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                onApplyPointsClick(data.data.referral_points)
                                                // setPointsVisibility(true)
                                            }}
                                            style={[MStyles.buttonSmallParent, styles.buttonCoupon]}>
                                            <Text style={MStyles.themeButtonSmall}>Redeem Points</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View >
                                        <Text style={MStyles.txtDescription}>{data.data.referral_discount_label}</Text>
                                        <View style={[styles.couponEnterView, { marginTop: 10 }]}>
                                            <Text style={[MStyles.txtSubTitle, styles.couponText]}>
                                                {/* {data.data.coupon_name} */}
                                                  (Discount - {RUPEES} {data.data.discount})
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    serverRequestForRemoveRefferralDiscount()
                                                }}
                                                style={[MStyles.buttonSmallParent, styles.removeCoupon]}>
                                                <Text style={MStyles.themeButtonSmall}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </View>
                            <View style={[MStyles.dividerDrawer, { justifyContent: 'space-between', padding: 10 }]} />
                        </>
                    }
                    <View style={{ flex: 1 }} />
                    <>
                        <View style={MStyles.divider} />
                        <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 10 }]}>
                            <Text style={[MStyles.txtSubTitle]}>Please Select a Payment Method</Text>
                        </View>
                    </>
                    <View style={[{ marginBottom: 40 }]}>
                        {
                            data.data.payment_methods.map((item, index) => {
                                return (
                                    <View key={index.toString()}>
                                        <View style={MStyles.divider} key={index.toString()} />
                                        <TouchableOpacity
                                            onPress={() => {
                                                setPayment(item.value)
                                            }}
                                            activeOpacity={0.5}>
                                            <View style={[MStyles.horizontal, { backgroundColor: Colors.paymentTitleBack, alignItems: 'center' }]} >
                                                <CheckBox
                                                    value={payment === item.value}
                                                    boxType='square'
                                                    onFillColor={Colors.primaryDark}
                                                    tintColor={Colors.primaryDark}
                                                    onTintColor={Colors.primaryDark}
                                                    onCheckColor={Colors.white}
                                                    style={{ height: 15, width: 15, marginTop: 3, marginStart: 12 }}
                                                    animationDuration={0.2}
                                                    tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />
                                                {
                                                    item.value == 'cod'
                                                        ?
                                                        <>
                                                            <Image source={require('../../../images/cod.png')}
                                                                style={[{ marginVertical: 16, marginStart: 20, alignSelf: 'baseline' }]} />
                                                            <Text style={[styles.paymentTitle, { margin: 0, marginLeft: 5 }]}>{item.label}</Text>
                                                        </>
                                                        :
                                                        item.value == 'razorpay'
                                                            ?
                                                            <>
                                                                <Image source={require('../../../images/razorpay.png')}
                                                                    style={[{ marginVertical: 16, marginStart: 20, alignSelf: 'baseline' }]} />
                                                                <View >
                                                                    <Text style={[styles.paymentTitle, { margin: 0, marginLeft: 5 }]}>{item.label}</Text>
                                                                    <Text style={[MStyles.txtDescription, { marginLeft: 5, color: '#5c5c5c', fontSize: 12 }]}>Cards, Netbanking, Wallet & UPI</Text>
                                                                </View>
                                                            </>
                                                            :
                                                            <Text style={[styles.paymentTitle]}>{item.label}</Text>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            payment == item.value && item.value == 'razorpay' &&
                                            < View >
                                                <Text style={[styles.paymentDetails, { flex: 1 }]}>{item.description}</Text>
                                                <View style={MStyles.dividerDrawer} />
                                            </View>
                                        }
                                    </View>
                                )
                            })
                        }
                        <View style={{ width: '100%' }}>
                            <TouchableOpacity
                                style={[MStyles.buttonParent, { marginTop: 16, margin: 16, width: undefined }]}
                                onPress={completePayment}>
                                <Text style={MStyles.themeButton}>Complete Payment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView >
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

export default PaymentCheckout