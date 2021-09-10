// import React from 'react'
// import { View, TouchableOpacity, Text, FlatList, Image, StyleSheet } from 'react-native'
// import MStyles from '../../styles/MStyles'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import EvilIcons from 'react-native-vector-icons/EvilIcons'
// import Colors from '../../styles/Colors'
// import ToolbarBack from '../../common/ToolbarBack'
// import ProgressDialog from '../../common/ProgressDialog'
// import CheckBox from '@react-native-community/checkbox'
// import ErrorView from '../../common/ErrorView'
// import CouponCodeDialog from './CouponCodeDialog'
// import PointsRedeemDialog from './PointsRedeemDialog'
// import { RUPEES } from '../../common/Constants'

// const EmptyCheckout = (props) => {

//     const Header = () => {
//         return (
//             <View>
//                 <View style={[{ backgroundColor: Colors.white, padding: 10 }]}>
//                     <View style={[MStyles.horizontal, { flex: 1, alignItems: 'center' }]}>
//                         <View style={[MStyles.horizontal, MStyles.center, { flex: 1, backgroundColor: Colors.white, }]}>
//                             <View style={[style.text, { flex: 1 }]} />

//                             <View style={MStyles.themeButtonSmall} />
//                         </View>
//                     </View>
//                     <View style={[style.text, { marginTop: 10, paddingHorizontal: 5 }]} />
//                 </View>

//                 <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 10 }]} />

//                 <View style={MStyles.dividerDrawer} />
//                 <View style={styles.couponView}>
//                     <View style={[MStyles.horizontal, { alignItems: 'center' }]}>
//                         <View style={{ width: 25, height: 25, backgroundColor: Colors.shimmerBack }} />
//                         <Text style={[MStyles.txtSubTitle, { flex: 1, marginStart: 8 }]}>Avail Coupon Discount</Text>
//                         <TouchableOpacity
//                             onPress={() => { setCouponVisibility(true) }}
//                             style={[MStyles.buttonSmallParent, styles.buttonCoupon, { marginTop: 0 }]}>
//                             <Text style={MStyles.themeButtonSmall}>Apply Coupon</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={[MStyles.dividerDrawer]} />

//                 {
//                     (localData.data && !(localData.data.referral_points == '0' || localData.data.referral_points == 0)) &&
//                     <>
//                         <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 10 }]} />
//                         <View style={styles.couponView}>
//                             {(!localData.data.referral_discount_label || localData.data.referral_discount_label === '') ?
//                                 <View>
//                                     <View style={MStyles.horizontal}>
//                                         <Image
//                                             source={require('../../images/reward_points.png')}
//                                             style={{ width: 18, height: 18 }}
//                                             resizeMode='contain' />
//                                         <Text style={[MStyles.txtDescriptionBold, { marginBottom: 10, marginStart: 10 }]}>You have {localData.data.referral_points} points.</Text>
//                                     </View>
//                                     <Text style={[MStyles.txtDescription, { color: Colors.textGray }]}>If you want to redeem your points click on redeem points.</Text>
//                                     <TouchableOpacity
//                                         onPress={() => { setPointsVisibility(true) }}
//                                         style={[MStyles.buttonSmallParent, styles.buttonCoupon]}>
//                                         <Text style={MStyles.themeButtonSmall}>Redeem Points</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 :
//                                 <View >
//                                     <Text style={MStyles.txtDescription}>{localData.data.referral_discount_label}</Text>
//                                     <View style={[styles.couponEnterView, { marginTop: 10 }]}>
//                                         <Text style={[MStyles.txtSubTitle, styles.couponText]}>
//                                             {localData.data.coupon_name}  (Discount - {RUPEES} {localData.data.discount})
//                                 </Text>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 setLocalData({ ...localData, loading: true })
//                                                 serverRequestForCheckoutParams()
//                                             }}
//                                             style={[MStyles.buttonSmallParent, styles.removeCoupon]}>
//                                             <Text style={MStyles.themeButtonSmall}>Remove</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                             }
//                         </View>
//                     </>
//                 }

//                 <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 10 }]}>
//                     <View style={MStyles.horizontal}>
//                         <Image
//                             style={{ width: 25, tintColor: 'green' }}
//                             resizeMode='contain'
//                             source={require('../../images/cart.png')} />
//                         <Text style={[MStyles.txtSubTitle, { marginStart: 8 }]}>Cart</Text>
//                     </View>
//                     <Text style={[MStyles.txtDescription]}>{cart.length} Items</Text>
//                 </View>

//             </View>
//         )
//     }

//     const CartItems = ({ item }) => {
//         return (
//             <View style={[MStyles.main]}>
//                 <View style={[MStyles.horizontal, { padding: 16 }]}>
//                     <Image source={{ uri: item.image }}
//                         style={{ width: 100, height: 100 }} />
//                     <View style={{ padding: 10, flex: 1 }}>
//                         <Text style={[MStyles.productTitle]}>{item.product_name}</Text>
//                         <Text style={[MStyles.productQuntity, { marginTop: 5 }]}>Quantity : {item.quantity}</Text>
//                         <Text style={[MStyles.productTitle, { marginTop: 5, flex: 1 }]}>{RUPEES} {item.total}</Text>
//                     </View>
//                 </View>
//                 <View style={[MStyles.divider]} />
//             </View>
//         )
//     }

//     const Footer = ({ data, setTimeSelected, setPayment }) => {
//         return (
//             <>
//                 {
//                     data.time_slot &&
//                     <>
//                         <View style={[MStyles.horizontal, styles.deliveryTitle]}>
//                             <Text style={[MStyles.productTitle]}>Please choose a time for delivery</Text>
//                         </View>
//                         <FlatList
//                             horizontal
//                             data={data.time_slot}
//                             showsVerticalScrollIndicator={false}
//                             showsHorizontalScrollIndicator={false}
//                             keyExtractor={(item) => item.value}
//                             renderItem={({ item, index }) => {
//                                 return (
//                                     <TouchableOpacity
//                                         onPress={() => setTimeSelected(item.value)}
//                                         activeOpacity={0.5}>
//                                         <View style={[timeSelected == item.value ? styles.timeSlotSelcted : styles.timeSlot]}>
//                                             <Text style={[MStyles.productTitle, timeSelected == item.value ? { color: Colors.white } : { color: Colors.black }]}>{item.label}</Text>
//                                         </View>
//                                     </TouchableOpacity>
//                                 )
//                             }}
//                         />
//                     </>
//                 }

//                 {
//                     localData.data.delivery_charge_desc &&
//                     <>
//                         <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 8 }]} />
//                         <View style={[MStyles.dividerDrawer]} />
//                         <View style={[MStyles.horizontal, { paddingHorizontal: 10, paddingVertical: 16, justifyContent: 'center', backgroundColor: Colors.white }]}>
//                             <Text style={[MStyles.txtDescription, { textAlign: 'center', color: Colors.textGray }]}>{localData.data.delivery_charge_desc}</Text>
//                         </View>
//                     </>
//                 }
//                 {
//                     localData.data.delivery_charge &&
//                     <>
//                         <View style={[MStyles.dividerDrawer]} />
//                         <View style={[MStyles.horizontal, { paddingHorizontal: 10, paddingVertical: 16, justifyContent: 'space-between', backgroundColor: Colors.white }]}>
//                             <Text style={[MStyles.txtSubTitle, { fontSize: 14 }]}>{localData.data.delivery_charge.label}</Text>
//                             <Text style={[MStyles.txtDescription]}>{RUPEES} {localData.data.delivery_charge.cost}</Text>
//                         </View>
//                     </>
//                 }

//                 <FlatList
//                     data={data.payment_methods}
//                     showsVerticalScrollIndicator={false}
//                     keyExtractor={(item) => item.value}
//                     ListHeaderComponent={() => {
//                         return (
//                             <>
//                                 <View style={MStyles.divider} />
//                                 <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 10 }]}>
//                                     <Text style={[MStyles.txtSubTitle]}>Please Select a Payment Method</Text>
//                                 </View>
//                             </>
//                         )
//                     }}
//                     renderItem={({ item, index }) => {
//                         return (
//                             <>
//                                 <View style={MStyles.divider} />
//                                 <TouchableOpacity
//                                     onPress={() => { setPayment(item.value) }}
//                                     activeOpacity={0.5}>
//                                     <View style={[MStyles.horizontal, { backgroundColor: Colors.paymentTitleBack, alignItems: 'center' }]} >
//                                         <CheckBox
//                                             value={payment === item.value}
//                                             boxType='square'
//                                             onFillColor={Colors.primaryDark}
//                                             tintColor={Colors.primaryDark}
//                                             onTintColor={Colors.primaryDark}
//                                             onCheckColor={Colors.white}
//                                             style={{ height: 15, width: 15, marginTop: 3, marginStart: 12 }}
//                                             animationDuration={0.2}
//                                             tintColors={{ true: Colors.primaryDark, false: Colors.textGray }} />
//                                         {
//                                             item.value == 'cod'
//                                                 ?
//                                                 <>
//                                                     <Image source={require('../../images/cod.png')}
//                                                         style={[{ marginVertical: 16, marginStart: 20, alignSelf: 'baseline' }]} />
//                                                     <Text style={[styles.paymentTitle, { margin: 0, marginLeft: 5 }]}>{item.label}</Text>

//                                                 </>
//                                                 :
//                                                 item.value == 'razorpay'
//                                                     ?
//                                                     <>
//                                                         <Image source={require('../../images/razorpay.png')}
//                                                             style={[{ marginVertical: 16, marginStart: 20, alignSelf: 'baseline' }]} />
//                                                         <View >
//                                                             <Text style={[styles.paymentTitle, { margin: 0, marginLeft: 5 }]}>{item.label}</Text>
//                                                             <Text style={[MStyles.txtDescription, { marginLeft: 5, color: '#5c5c5c', fontSize: 12 }]}>Cards, Netbanking, Wallet & UPI</Text>
//                                                         </View>
//                                                     </>
//                                                     :
//                                                     <Text style={[styles.paymentTitle]}>{item.label}</Text>
//                                         }
//                                     </View>
//                                 </TouchableOpacity>
//                                 {
//                                     payment === item.value
//                                         ? <View >
//                                             <Text style={styles.paymentDetails}>{item.description}</Text>
//                                         </View>
//                                         : null
//                                 }
//                             </>
//                         )
//                     }}
//                     ListFooterComponent={() => <View style={{ marginVertical: 30 }} />}
//                 />
//             </>
//         )
//     }

//     return (
//         <SafeAreaView style={[MStyles.mainAuth]}>
//             <ToolbarBack {...props} title="Checkout" />
//             <ProgressDialog loading={localData.loading} />
//             <CouponCodeDialog
//                 visibility={couponVisibility}
//                 onSubmit={onApplyCouponClick}
//                 setVisibility={setCouponVisibility} />
//             <PointsRedeemDialog
//                 visibility={pointsVisibility}
//                 onSubmit={onApplyPointsClick}
//                 setVisibility={setPointsVisibility} />
//             <View style={[MStyles.mainGray]}>
//                 {localData.data ?
//                     <>
//                         <FlatList
//                             data={localData.data.cart_data}
//                             showsVerticalScrollIndicator={false}
//                             keyExtractor={(item) => item.key}
//                             ListHeaderComponent={Header}
//                             renderItem={({ item, index }) => <CartItems item={item} />}
//                             ListFooterComponent={() => <Footer data={localData.data} setTimeSelected={setTimeSelected} setPayment={setPayment} />}
//                         />
//                         <View style={[MStyles.divider]} />
//                         <View style={[MStyles.horizontal, MStyles.center, { backgroundColor: Colors.white, padding: 10 }]}>
//                             <Text style={[MStyles.txtSubTitle, { flex: 1, color: Colors.black }]}>
//                                 {RUPEES} {localData.data.cart_total}
//                             </Text>
//                             <TouchableOpacity
//                                 activeOpacity={0.7}
//                                 style={[MStyles.buttonSmallParent, { marginTop: 0, marginHorizontal: 0 }]}
//                                 onPress={() => { onCheckoutClicked() }} >
//                                 <Text style={MStyles.themeButtonSmall} > PROCEED TO PAY </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </>
//                     : localData.error ? <ErrorView message={localData.error} /> : null}
//             </View>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     timeSlot: {
//         paddingHorizontal: 16,
//         paddingVertical: 7,
//         backgroundColor: Colors.white,
//         borderRadius: 5,
//         marginHorizontal: 8,
//         marginBottom: 16,
//         alignSelf: 'baseline'
//     },
//     timeSlotSelcted: {
//         paddingHorizontal: 16,
//         paddingVertical: 7,
//         backgroundColor: Colors.primaryDark,
//         borderRadius: 5,
//         marginHorizontal: 8,
//         marginBottom: 16,
//         alignSelf: 'baseline'
//     },
//     paymentTitle: {
//         ...MStyles.productTitle,
//         margin: 16,
//         marginLeft: 20
//     },
//     paymentDetails: {
//         ...MStyles.productTitle,
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         backgroundColor: '#f5f5f5'
//     },
//     deliveryTitle: {
//         justifyContent: 'space-between',
//         padding: 10
//     },
//     whiteDivider: {
//         height: 1,
//         width: '100%',
//         backgroundColor: Colors.white
//     },
//     deliveryText: {
//         ...MStyles.txtDescription,
//         fontSize: 14,
//     },
//     deliveryCard: {
//         flexDirection: 'row',
//         margin: 5,
//         padding: 10,
//         backgroundColor: Colors.white,
//         elevation: 3,
//     },
//     deliveryText: {
//         ...MStyles.txtDescription,
//         marginLeft: 8,
//         color: '#585858'
//     },
//     couponView: {
//         backgroundColor: Colors.white,
//         padding: 10
//     },
//     couponEnterView: {
//         flexDirection: 'row',
//         backgroundColor: Colors.white
//     },
//     couponInput: {
//         ...MStyles.textInput,
//         marginTop: 10,
//         backgroundColor: Colors.dividerColorLight,
//         flex: 1
//     },
//     buttonCoupon: {
//         alignSelf: 'baseline',
//         alignSelf: 'center',
//         marginLeft: 10
//     },
//     couponText: {
//         alignSelf: 'center',
//         flex: 1,
//         color: Colors.textGray
//     },
//     removeCoupon: {
//         marginTop: 0
//     },
// })


// const style = StyleSheet.create({
//     image: {
//         width: 60,
//         height: 60,
//         backgroundColor: Colors.shimmerBack,
//         borderRadius: 4
//     },
//     text: {
//         flex: 1,
//         height: 15,
//         backgroundColor: Colors.shimmerBack,
//         borderRadius: 4
//     },
//     desc: {
//         width: '25%',
//         height: 15,
//         backgroundColor: Colors.shimmerBack,
//         borderRadius: 4
//     },
//     addButtonContainer: {
//         width: '25%',
//     },
//     addButton: {
//         height: 15,
//         backgroundColor: Colors.shimmerBack,
//         borderRadius: 4
//     }
// })



// export default EmptyCheckout