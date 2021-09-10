import React, { useContext } from 'react'
import {
    View, Text, Alert, Share, TouchableOpacity,
    SafeAreaView, ScrollView, Platform
} from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { Image } from 'react-native'
import { Context as CartContext } from '../../context/CartContext'
import { Context as AuthContext } from '../../context/AuthContext'
import { getVersion } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { log } from '../../common/Utils'
import Rate, { AndroidMarket } from 'react-native-rate'

const DrawerMenu = ({ ...props }) => {

    const ICON_SPACE = 12;
    const ICON_SIZE = 15;

    const { state: { data } } = useContext(CartContext)
    const { state: { user }, deleteUser } = useContext(AuthContext)

    log("Drawer is visible ", (data?.menu.address == undefined || data?.menu.address == ''))
    log("Value * ", data?.menu.address)

    const shareApp = async () => {

        let message = user ?
            'Download Mowgli Basket from below URL and use my refferal code : ' + user.referral_code + ' \nhttps://play.google.com/store/apps/details?id=com.mowglibasket'
            :
            'Download Mowgli Basket from below URL \nhttps://play.google.com/store/apps/details?id=com.mowglibasket'

        try {
            const result = await Share.share({
                message: message,
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
    }

    const rateApp = () => {
        const options = {
            AppleAppID: "1539907095",
            GooglePackageName: "com.mowglibasket",
            OtherAndroidURL: "https://play.google.com/store/apps/details?id=com.mowglibasket",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: false,
            openAppStoreIfInAppFails: true
        }
        Rate.rate(options, success => {
            if (success) {
                // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                // this.setState({ rated: true })
            }
        })
    }

    const requestAService = () => {
        // if (!user || (user && !user.prime_membership_id))
        //     props.navigation.navigate("addressType")
        // else
        props.navigation.navigate("services")
    }

    const navigateToScreen = (screen) => {
        if (user) {
            props.navigation.navigate(screen)
        } else {
            props.navigation.navigate('auth', { screen: 'auth', params: { isLogin: true } })
        }
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
                        // props.navigation.navigate('home')
                    }
                }
            ]
        )
    }

    return (
        <SafeAreaView style={MStyles.mainAuth}>
            <ScrollView style={MStyles.main}
                showsVerticalScrollIndicator={false}>
                {(
                    data && data.menu != undefined
                    // && data.menu.product_categories != undefined
                ) ?
                    <>
                        <Text style={[MStyles.txtTitle, { backgroundColor: Colors.primaryDark, color: Colors.white, padding: 16 }]}>
                            {user ? "Hello, " + user.first_name : "Hello, Guest"}
                        </Text>
                        {
                            user && user.referral_code &&
                            <View style={[MStyles.horizontal, { backgroundColor: Colors.primaryDark }]}>
                                <Text style={[MStyles.txtSubTitle,
                                {
                                    flex: 1,
                                    backgroundColor: Colors.primaryDark,
                                    color: Colors.white,
                                    paddingHorizontal: 16,
                                    paddingTop: 4,
                                    paddingBottom: 16
                                }]}>
                                    Your Referral Code - {user.referral_code}
                                </Text>
                                <TouchableOpacity
                                    style={{ padding: 16 }}
                                    onPress={shareApp}>
                                    <Image source={require('../../images/share.png')} tintColor={Colors.white} />
                                </TouchableOpacity>
                            </View>
                        }
                        {
                            (data?.menu.address != '') ?
                                <TouchableOpacity onPress={() => props.navigation.navigate('addressList')} >
                                    <View style={[MStyles.horizontal, { padding: 16 }]}>
                                        <Image source={require('../../images/pin.png')}
                                            style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                        <Text style={[MStyles.txtDrawerMenu, { flex: 1, marginHorizontal: ICON_SPACE }]}>
                                            {data.menu.address}
                                        </Text>
                                        <Image source={require('../../images/pencil.png')} style={{ tintColor: Colors.primaryDark }} />
                                    </View>
                                </TouchableOpacity> : null
                        }
                        <View style={[MStyles.dividerDrawer]} />
                        <View style={[MStyles.horizontal, { justifyContent: 'space-evenly' }]}>
                            <TouchableOpacity
                                style={{ flex: .5 }}
                                onPress={() => props.navigation.navigate('home', { screen: 'home' })}>
                                <View style={[{ paddingHorizontal: 8, paddingVertical: 8, ...MStyles.center }]}>
                                    <Image source={require('../../images/drawer/shopping_bag.png')}
                                        style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                    <Text style={[MStyles.txtDrawerMenu, { textAlign: 'center', marginTop: 8 }]}>Shop Now</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={[{ width: 1, height: '100%', backgroundColor: Colors.dividerColorLight }]} />
                            <TouchableOpacity
                                style={{ flex: .5 }}
                                onPress={requestAService}>
                                <View style={[{ paddingHorizontal: 8, paddingVertical: 8, ...MStyles.center }]}>
                                    <Image source={require('../../images/drawer/service.png')}
                                        style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                    <Text style={[MStyles.txtDrawerMenu, { textAlign: 'center', marginTop: 8 }]}>Request a Service</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[MStyles.dividerDrawer]} />
                        <TouchableOpacity onPress={() => navigateToScreen('myAccount')}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image source={require('../../images/drawer/profile.png')}
                                    style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                <Text style={[MStyles.txtDrawerMenu, { paddingHorizontal: ICON_SPACE }]}>{user ? "My Profile" : "Login"}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[MStyles.dividerDrawer]} />
                        <TouchableOpacity onPress={() => user && navigateToScreen('myOrders')}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image
                                    source={require('../../images/drawer/orders.png')}
                                    style={[{ width: ICON_SIZE, height: ICON_SIZE },
                                    !user ? { tintColor: Colors.textDarkGray } : { tintColor: Colors.black }]} />
                                <Text style={[MStyles.txtDrawerMenu,
                                { paddingHorizontal: ICON_SPACE },
                                !user ? { color: Colors.textDarkGray } : { color: Colors.black }]}>My Orders</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[MStyles.dividerDrawer]} />
                        <TouchableOpacity onPress={() => user && navigateToScreen('notifications')}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image source={require('../../images/drawer/notification.png')}
                                    style={[{ width: ICON_SIZE, height: ICON_SIZE },
                                    !user ? { tintColor: Colors.textDarkGray } : { tintColor: Colors.black }]} />
                                <Text style={[MStyles.txtDrawerMenu,
                                { paddingHorizontal: ICON_SPACE },
                                !user ? { color: Colors.textDarkGray } : { color: Colors.black }]}>Notifications</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[MStyles.dividerDrawer]} />
                        <TouchableOpacity onPress={() => user && navigateToScreen('myAccount')}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image source={require('../../images/drawer/reward_points.png')}
                                    style={[{ width: ICON_SIZE, height: ICON_SIZE },
                                    !user ? { tintColor: Colors.textDarkGray } : { tintColor: Colors.black }]} />
                                <Text style={[MStyles.txtDrawerMenu,
                                { paddingHorizontal: ICON_SPACE },
                                !user ? { color: Colors.textDarkGray } : { color: Colors.black }]}>Reward Points</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[{ backgroundColor: Colors.dividerColor }]} >
                            <Text style={[MStyles.txtDrawerMenu, { padding: ICON_SPACE }]}>Other</Text>
                        </View>

                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('customerSupport')}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image source={require('../../images/drawer/customer_support.png')}
                                    style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                <Text style={[MStyles.txtDrawerMenu, { paddingHorizontal: ICON_SPACE }]}>Customer Support</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[MStyles.dividerDrawer]} /> */}

                        <TouchableOpacity onPress={rateApp}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image source={require('../../images/drawer/rateus.png')}
                                    style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                <Text style={[MStyles.txtDrawerMenu, { paddingHorizontal: ICON_SPACE }]}>Rate Us</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[MStyles.dividerDrawer]} />

                        <TouchableOpacity onPress={shareApp}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image source={require('../../images/drawer/share.png')}
                                    style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                <Text style={[MStyles.txtDrawerMenu, { paddingHorizontal: ICON_SPACE }]}>Share</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[MStyles.dividerDrawer]} />

                        <TouchableOpacity onPress={() => props.navigation.navigate('policy')}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image source={require('../../images/drawer/privacy.png')}
                                    style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                <Text style={[MStyles.txtDrawerMenu, { paddingHorizontal: ICON_SPACE }]}>Privacy Policy</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[MStyles.dividerDrawer]} />

                        <TouchableOpacity onPress={() => props.navigation.navigate('terms')}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image source={require('../../images/drawer/terms.png')}
                                    style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                <Text style={[MStyles.txtDrawerMenu, { paddingHorizontal: ICON_SPACE }]}>Term & Conditions</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[MStyles.dividerDrawer]} />

                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('policy')}>
                            <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                <Image source={require('../../images/drawer/m.png')}
                                    style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                <Text style={[MStyles.txtDrawerMenu, { paddingHorizontal: ICON_SPACE }]}>About Us</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[MStyles.dividerDrawer]} /> */}

                        {
                            user &&
                            <>
                                <TouchableOpacity onPress={logoutConfirm}>
                                    <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                        <Image source={require('../../images/drawer/logout.png')}
                                            style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                        <Text style={[MStyles.txtDrawerMenu, { paddingHorizontal: ICON_SPACE }]}>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={[MStyles.dividerDrawer]} />
                            </>
                        }
                        {
                            Platform.OS == 'android' &&
                            <>
                                <View style={[MStyles.horizontal, { padding: 16, alignItems: 'center' }]}>
                                    <Image source={require('../../images/drawer/version.png')}
                                        style={{ width: ICON_SIZE, height: ICON_SIZE }} />
                                    <View style={MStyles.horizontal}>
                                        <Text style={[MStyles.txtDrawerMenu, { paddingHorizontal: ICON_SPACE }]}>About This Release</Text>
                                        <Text style={[MStyles.txtDrawerMenu, { marginStart: 16, fontSize: 12, color: Colors.textDarkGray }]}>v{getVersion()}</Text>
                                    </View>
                                </View>
                                <View style={[MStyles.dividerDrawer]} />

                                {/* <Text style={[MStyles.txtDescriptionBold, { color: Colors.textGray, fontSize: 12, padding: 16, flex: 1, textAlign: 'center' }]}>
                                    Version {getVersion()}</Text> */}
                                {/* <View style={[MStyles.dividerDrawer]} /> */}
                            </>
                        }
                    </>
                    : null
                }
            </ScrollView>
        </SafeAreaView>
    )
}


export default DrawerMenu