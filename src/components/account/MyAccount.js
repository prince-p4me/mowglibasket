import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Alert, Share } from 'react-native'
import MStyles from '../../styles/MStyles'
import ToolbarBack from '../../common/ToolbarBack'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors'
import { Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { requestMyAccountDetails } from '../../apis/Api'
import ErrorView from '../../common/ErrorView'
import { Context as AuthContext } from '../../context/AuthContext'
import EmptyMyAccount from './EmptyMyAccount'

const MyAccount = (props) => {

    const { state: { user }, updateUser, deleteUser } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        serverRequestForAccountDetails()
    }, [])

    const serverRequestForAccountDetails = async () => {
        if (loading)
            return
        setLoading(true)
        requestMyAccountDetails(user.user_id)
            .then(response => {
                if (response.status) {
                    updateUser(response.data)
                    AsyncStorage.setItem("@user", JSON.stringify(response.data))
                } else {
                    setError(response.message)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setError(error.message)
            })
    }

    const logoutConfirm = () => {

        Alert.alert(
            "Logout",
            "Do you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => { }
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        deleteUser()
                        AsyncStorage.removeItem('@user')
                        props.navigation.navigate('home')
                    }
                }
            ]
        )
    }

    const shareApp = async () => {

        try {
            const result = await Share.share({
                message: 'Download Mowgli Basket from below URL and use my refferal code : ' + user.referral_code + ' \nhttps://play.google.com/store/apps/details?id=com.mowglibasket',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <View style={[MStyles.mainGray]}>
                <ToolbarBack {...props} title="Mowgli Basket" />
                {
                    loading
                        ?
                        <EmptyMyAccount />
                        :
                        <>
                            {
                                user ?
                                    <>
                                        <Text style={[MStyles.txtTitle, { backgroundColor: Colors.white, padding: 16, textAlign: 'center' }]}>My Account</Text>
                                        <ScrollView style={[MStyles.mainGray]}>
                                            <View style={[MStyles.mainAuth]}>
                                                <View style={[MStyles.horizontal, { padding: 16 }]}>
                                                    <View style={[{ flex: 1 }]}>
                                                        <Text style={[MStyles.txtSubTitleSemiBold, { color: Colors.white }]}>
                                                            {user.first_name}
                                                        </Text>
                                                        <Text style={[MStyles.txtSubTitleSemiBold, { color: Colors.white, marginTop: 5 }]}>
                                                            {user.user_email}
                                                        </Text>
                                                        <Text style={[MStyles.txtSubTitleSemiBold, { color: Colors.white, marginTop: 5 }]}>
                                                            {user.phone}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        activeOpacity={0.7}
                                                        onPress={() => props.navigation.navigate('updateProfile', { title: 'Update Profile' })} >
                                                        <Image source={require('../../images/pencil.png')} style={{ tintColor: Colors.white, padding: 10 }} />
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    user.display_address ?
                                                        <View style={[MStyles.horizontal, { flex: 1, padding: 16, margin: 16, backgroundColor: Colors.myAccount, borderRadius: 3, alignItems: 'center' }]}>
                                                            <Image source={require('../../images/pin.png')} style={{ tintColor: Colors.white, width: 18, height: 18 }} />
                                                            <Text style={[MStyles.txtSubTitleSemiBold], { flex: 1, color: Colors.white }}> {user.display_address}</Text>
                                                            <TouchableOpacity
                                                                onPress={() => props.navigation.navigate('addressList')}
                                                                activeOpacity={0.7}
                                                                style={[MStyles.cardView, { borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5 }]}>
                                                                <Text style={MStyles.txtDescription}>Change</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        : null
                                                }
                                            </View>
                                            {user.referral_code &&
                                                <>
                                                    <View style={{ backgroundColor: Colors.white, padding: 12, alignItems: 'center' }}>
                                                        <Text style={[MStyles.txtSubTitle, { color: Colors.black }]}>
                                                            REFERRALS
                                                        </Text>
                                                        <Text style={[MStyles.txtSubTitleSemiBold, { color: Colors.black, marginTop: 5, textAlign: 'center' }]}>
                                                            {user.referral_desc}
                                                        </Text>
                                                        <Text style={[MStyles.txtSubTitle, { color: Colors.black, marginTop: 5, fontSize: 20 }]}>
                                                            {user.referral_code}
                                                        </Text>
                                                        <TouchableOpacity activeOpacity={0.7} style={[MStyles.buttonParent, { marginTop: 5 }]} onPress={shareApp}>
                                                            <Text style={MStyles.themeButton}>INVITE AND EARN</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[MStyles.divider]} />
                                                </>
                                            }
                                            <View style={[MStyles.mainGray]}>
                                                {user.referral_points &&
                                                    <>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
                                                            <View style={[MStyles.main, MStyles.horizontal, { padding: 16, alignItems: 'center', justifyContent: 'space-between' }]}>
                                                                <Image source={require('../../images/reward_points.png')} style={{ width: 22, height: 22 }} />
                                                                <Text style={[MStyles.txtSubTitleSemiBold, { flex: 1, marginStart: 10 }]}> Points Earned  </Text>
                                                                <Text style={[MStyles.txtSubTitleSemiBold, { marginStart: 10 }]}> {user.referral_points}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <View style={[MStyles.divider]} />
                                                    </>
                                                }
                                                <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('myOrders')}>
                                                    <View style={[MStyles.main, MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                                        <Image source={require('../../images/order.png')} />
                                                        <Text style={[MStyles.txtSubTitleSemiBold, { flex: 1, marginStart: 10 }]}> My Order </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={[MStyles.divider]} />
                                                <TouchableOpacity activeOpacity={0.5}
                                                    onPress={() => props.navigation.navigate('addressList')}>
                                                    <View style={[MStyles.main, MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                                        <Image source={require('../../images/pin.png')} />
                                                        <Text style={[MStyles.txtSubTitleSemiBold, { flex: 1, marginStart: 10 }]}> My Delivery Address </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={[MStyles.divider]} />
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    onPress={() => props.navigation.navigate('notifications')}>
                                                    <View style={[MStyles.main, MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                                        <Image source={require('../../images/notification.png')} />
                                                        <Text style={[MStyles.txtSubTitleSemiBold, { flex: 1, marginStart: 10 }]}> Notifications </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={[MStyles.divider]} />
                                                <TouchableOpacity activeOpacity={0.5} onPress={() => logoutConfirm()}>
                                                    <View style={[MStyles.main, MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                                        <Image source={require('../../images/logout.png')} />
                                                        <Text style={[MStyles.txtSubTitleSemiBold, { flex: 1, marginStart: 10 }]}> Logout </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={[MStyles.divider]} />
                                            </View>



                                        </ScrollView>
                                    </>
                                    : error ? <ErrorView message={error} /> : null
                            }
                        </>
                }
            </View>
        </SafeAreaView>
    )
}


export default MyAccount