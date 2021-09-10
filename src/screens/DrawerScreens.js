import React, { useEffect } from 'react';
import { Alert } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import { connect } from 'react-redux'
// import { updateSplashLoad } from '../redux/splash/SplashData'
// import { updateUserData } from '../redux/auth/LoginData'
import Terms from '../components/login/Terms'
import Policy from '../components/login/Policy'
import UpdateProfile from '../components/account/UpdateProfile'
import Subcategories from '../components/categories/SubCategories';
import DrawerMenu from '../components/drawer/DrawerMenu'
import ProductList from '../components/products/ProductList';
import MyAccount from '../components/account/MyAccount';
import MyOrders from '../components/orders/MyOrders';
import OrderDetails from '../components/orders/OrderDetails';
// import AddressList from '../components/address/AddressList'
// import AddAddress from '../components/address/AddAddress'
// import EditAddress from '../components/address/EditAddress'
// import AreaList from '../components/address/AreaList'
// import ChooseDeliveryAddress from '../components/address/ChooseDeliveryAddress'
import DeliveryOptions from '../components/checkout/DeliveryOptions'
import Notifications from '../components/notification/Notifications'
import Filter from '../components/filter/Filter'
import Tabs from './Tabs'
import Success from '../components/cart/Success'
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification"
import DirectBankTransferSuccess from '../components/cart/DirectBankTranferSuccess'
import Search from '../components/search/Search'
import Auth from './Auth'
import SubCategories from '../contents/grocery/subCategories/SubCategories';
import CustomerSupport from '../components/customerSupport/CustomerSupport';
import WriteUs from '../components/customerSupport/WriteUs';

const HomeStack = createStackNavigator()

const HomeScreens = (props) => {
    return (
        <HomeStack.Navigator headerMode='none'>
            <HomeStack.Screen name="home" headerMode='none'
                options={{ headerShown: false, safeAreaInsets: { top: 0 } }} >
                {props => <Tabs {...props} />}
            </HomeStack.Screen>
            <HomeStack.Screen name="myAccount" component={MyAccount} />
            <HomeStack.Screen name="updateProfile" component={UpdateProfile} />
            <HomeStack.Screen name="myOrders" component={MyOrders} />
            <HomeStack.Screen name="orderDetails" component={OrderDetails} />
            {/* <HomeStack.Screen name="addressList" component={AddressList} />
            <HomeStack.Screen name="areaList" component={AreaList} />
            <HomeStack.Screen name="addAddress" component={AddAddress} />
            <HomeStack.Screen name="editAddress" component={EditAddress} />
            <HomeStack.Screen name="chooseDelivery" component={ChooseDeliveryAddress} /> */}
            <HomeStack.Screen name="deliveryOption" component={DeliveryOptions} />
            <HomeStack.Screen name="subcategories" component={Subcategories} />
            <HomeStack.Screen name="productList" component={ProductList} />
            <HomeStack.Screen name="subCategories" component={SubCategories} />
            <HomeStack.Screen name="notifications" component={Notifications} />
            <HomeStack.Screen name="filter" component={Filter} />
            <HomeStack.Screen name="success" component={Success} />
            <HomeStack.Screen name="dbtsuccess" component={DirectBankTransferSuccess} />
            <HomeStack.Screen name="terms" component={Terms} />
            <HomeStack.Screen name="policy" component={Policy} />
            <HomeStack.Screen name="search" component={Search} />
            <HomeStack.Screen name="auth" component={Auth} />
            <HomeStack.Screen name="customerSupport" component={CustomerSupport} />
            <HomeStack.Screen name="writeUs" component={WriteUs} />
        </HomeStack.Navigator>
    )
}

const DrawerScreens = (props) => {
    
    useEffect(() => {
        // Assume a message-notification contains a "type" property 
        // in the data payload of the screen to open
        messaging().onNotificationOpenedApp(remoteMessage => {
            PushNotification.cancelAllLocalNotifications()
            if (remoteMessage.data.type === "notification") {
                props.navigation.navigate('main', { screen: 'notifications' })
            } else if (remoteMessage.data.type === "offer") {
                props.navigation.navigate('main', { screen: 'home', params: { screen: 'offers' } })
            } else if (remoteMessage.data.type === "order") {
                // props.navigation.navigate('main', { screen: 'home', params: { screen: 'offers' } })
                props.navigation.navigate('orderDetails', { orderId: remoteMessage.data.order_id })
            }
            // navigation.navigate(remoteMessage.data.type);
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {

                    PushNotification.cancelAllLocalNotifications()
                    if (remoteMessage.data.type === "notification") {
                        props.navigation.navigate('main', { screen: 'notifications' })
                    } else if (remoteMessage.data.type === "offer") {
                        props.navigation.navigate('main',
                            { screen: 'home', params: { screen: 'offers' } })
                    } else if (remoteMessage.data.type === "order") {
                        props.navigation.navigate('orderDetails', { orderId: remoteMessage.data.order_id })
                        // props.navigation.navigate('main',
                        //     { screen: 'home', params: { screen: 'offers' } })
                    }
                    // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
                // setLoading(false);
            });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
           
            // PushNotification.localNotification({
            //     title: 'Testing',
            //     message: 'You pushed the notification button!'
            // })
            
            Alert.alert("New notification received",
                remoteMessage.notification.title,
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                            PushNotification.cancelAllLocalNotifications()
                        }
                    },
                    {
                        text: "Open",
                        onPress: () => {
                            PushNotification.cancelAllLocalNotifications()
                            if (remoteMessage.data.type === "notification") {
                                props.navigation.navigate('main', { screen: 'notifications' })
                            } else if (remoteMessage.data.type === "offer") {
                                props.navigation.navigate('main',
                                    { screen: 'home', params: { screen: 'offers' } })
                            } else if (remoteMessage.data.type === "order") {
                                props.navigation.navigate('orderDetails', { orderId: remoteMessage.data.order_id })
                                // props.navigation.navigate('main',
                                //     { screen: 'home', params: { screen: 'offers' } })
                            }
                        }
                    }
                ]
            )

        });

        return unsubscribe
    }, []);

    const DrawerStack = createDrawerNavigator()
    return (
        <DrawerStack.Navigator drawerContent={props => <DrawerMenu {...props} />} >
            <DrawerStack.Screen name="main" >
                {props => <HomeScreens {...props} />}
            </DrawerStack.Screen>
        </DrawerStack.Navigator>
    )
}

// const mapToProps = (state) => {
//     return {
//         user: state.loginReducer.user,
//     }
// }

// const updateProps = (state) => {
//     return {
//         updateSplash: (update) => state(updateSplashLoad(update)),
//         updateUser: (user) => state(updateUserData(user))
//     }
// }

// export default connect(mapToProps, updateProps)(DrawerScreens)
export default DrawerScreens