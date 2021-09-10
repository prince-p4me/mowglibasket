import React, { useState, useContext, useEffect } from 'react'
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Context as AuthContext } from '../../../context/AuthContext'
import ToolbarBack from '../../../common/ToolbarBack'
import { RUPEES } from '../../../common/Constants';
import { requestPrimeCheckoutDetails, requestPrimeCheckoutpaymentDetails, requestUpdatePrimePaymentResponse } from '../../../apis/Api'
import EmptyPrimeMembershipCheckout from './EmptyPrimeMembershipCheckout'
import RazorpayCheckout from 'react-native-razorpay';

const PrimeMembershipCheckout = (props) => {

    const { selectedAddress } = props.route.params
    const { state: { user, guest }, updateGuest, updateUser } = useContext(AuthContext)
    const [data, setData] = useState({})

    useEffect(() => {
        serverRequestForDetails()
    }, [])

    const serverRequestForDetails = async () => {
        setData({ ...data, loading: true })
        requestPrimeCheckoutDetails(user.user_id)
            .then(response => {
                if (response.status) {
                    setData({ ...data, loading: false, data: response.data })
                } else {
                    setData({ ...data, loading: false })
                }
            })
            .catch(error => {
                setData({ ...data, loading: false, error: error.message })
            })
    }

    const serverRequestForPaymentDetails = async () => {
        setData({ ...data, loading: true })
        requestPrimeCheckoutpaymentDetails(user.user_id)
            .then(response => {
                if (response.status) {
                    setData({ ...data, loading: false, paymentParams: response.data })
                    completeRazorPayPayment(response.data)
                } else {
                    setData({ ...data, loading: false })
                }
            })
            .catch(error => {
                setData({ ...data, loading: false, error: error.message })
            })
    }

    const completeRazorPayPayment = (checkoutData) => {
        let options = checkoutData.payment_details
        RazorpayCheckout.open(options).then((data) => {
            serverRequestForUpdatePaymentResponse(true, data, checkoutData)
        }).catch((error) => {
            serverRequestForUpdatePaymentResponse(false, error, checkoutData)
        });
    }

    const serverRequestForUpdatePaymentResponse = (status, paymentResponse, checkoutData) => {
        setData({ ...data, loading: true })
        requestUpdatePrimePaymentResponse(user.user_id, status, checkoutData, paymentResponse, selectedAddress)
            .then(response => {
                if (response.status) {
                    setData({ ...data, loading: false })
                    // props.navigation.navigate("success", { data: response })
                    navigateToSuccess(response)
                } else {
                    setData({ ...data, loading: false })
                    alert(response.message)
                }
            })
            .catch(error => {
                setData({ ...data, loading: false })
                alert(error.message)
            })
    }

    const completePayment = () => {
        serverRequestForPaymentDetails()
    }

    const navigateToSuccess = (response) => {
        AsyncStorage.setItem('@user', JSON.stringify(response.data.user_data))
        updateUser(response.data.user_data)
        props.navigation.navigate('membershipSuccess', { response: response })
    }

    return (
        <SafeAreaView style={[MStyles.main, MStyles.center, { flex: 1 }]}>
            {/* <ProgressDialog loading={loading} /> */}
            <ToolbarBack title='Complete Payment' {...props} />

            <ScrollView
                keyboardShouldPersistTaps='always'
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ width: '100%' }}  >
                {
                    data.loading
                        ?
                        <EmptyPrimeMembershipCheckout />
                        :
                        // <Animatable.View
                        //     animation='fadeInUpBig'
                        //     duration={500}
                        //     style={[MStyles.main]}>
                        data.data && <>
                            <View style={{ padding: 0 }}>
                                <Text style={[MStyles.txtDescriptionBold, { padding: 20, fontSize: 18, textAlign: 'center' }]}>Member Details</Text>

                                <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 16 }]}>
                                    <Text style={[MStyles.txtDescriptionBold]}>Name</Text>
                                    <Text style={[MStyles.txtDescription]}>{user.first_name} </Text>
                                </View>
                                <View style={[MStyles.divider]} />
                                <View style={[MStyles.horizontal, { padding: 16, justifyContent: 'space-between' }]}>
                                    <Text style={[MStyles.txtDescriptionBold]}>Phone</Text>
                                    <Text style={[MStyles.txtDescription]}>{user.phone} </Text>
                                </View>
                                <View style={[MStyles.divider]} />
                                <View style={[MStyles.horizontal, { padding: 16, justifyContent: 'space-between' }]}>
                                    <Text style={[MStyles.txtDescriptionBold]}>Email</Text>
                                    <Text style={[MStyles.txtDescription]}>{user.user_email} </Text>
                                </View>
                                <View style={[MStyles.divider]} />
                                <Text style={[MStyles.txtDescriptionBold, { padding: 20, fontSize: 18, textAlign: 'center' }]}>Membership Details</Text>
                                {/* <View style={[MStyles.divider]} /> */}
                                <View style={[MStyles.horizontal, { padding: 16, justifyContent: 'space-between' }]}>
                                    <Text style={[MStyles.txtDescriptionBold]}>Duration</Text>
                                    <Text style={[MStyles.txtDescription]}> {data.data.membership_duration}</Text>
                                </View>
                                <View style={[MStyles.divider]} />
                                <View style={[MStyles.horizontal, { padding: 16, justifyContent: 'space-between' }]}>
                                    <Text style={[MStyles.txtDescriptionBold]}>Renewal Date</Text>
                                    <Text style={[MStyles.txtDescription]}> {data.data.membership_expiry}</Text>
                                </View>
                                <View style={[MStyles.divider]} />
                                <View style={[MStyles.horizontal, { padding: 16, justifyContent: 'space-between' }]}>
                                    <Text style={[MStyles.txtDescriptionBold]}>Fees</Text>
                                    <Text style={[MStyles.txtDescriptionBold]}>{RUPEES} {data.data.membership_price}</Text>
                                </View>
                                <View style={[MStyles.divider]} />
                                <View style={[{ padding: 16 }]}>
                                    <Text style={[MStyles.txtDescriptionBold]}>Registered Service Address</Text>
                                    <Text style={[MStyles.txtDescription, { flex: 1, marginTop: 5 }]}>{selectedAddress.display_address}</Text>
                                </View>
                                {data.data.description &&
                                    <>
                                        <View style={[MStyles.divider]} />
                                        <Text style={[MStyles.txtDescription, { marginTop: 16, marginHorizontal: 16, color: Colors.textGray, textAlign: 'center' }]}>{data.data.description}</Text>
                                    </>}
                            </View>
                            <View style={{ padding: 16 }}>
                                <TouchableOpacity style={[MStyles.buttonParent, { marginTop: 0 }]} onPress={completePayment}>
                                    <Text style={MStyles.themeButton}>Make Payment</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    // </Animatable.View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default PrimeMembershipCheckout