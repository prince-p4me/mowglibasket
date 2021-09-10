import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Dashboard from '../components/home/Dashboard'
import Cart from '../components/cart/Cart';
// import Offers from '../components/offers/Offers'
import { Image } from 'react-native';
import Colors from '../styles/Colors';
import { Context as CartContext } from '../context/CartContext'
import Vegetable from '../components/Vegetables/Vegetable';
import Fruits from '../components/fruits/Fruits';
// import Grocery from '../components/grocery/categories/Grocery';
import Grocery from '../contents/grocery/categories/Grocery';
// import DashboardContainer from '../components/dashboard/DashboardContainer';
import DashboardContainer from '../components/dashboardtemp/DashboardContainer';
// import DashboardContainer from '../components/dashboard/DashboardContainer'
// import Dashboard from '../components/home/Dashboard'

const Tabs = (props) => {

    const { state: { cart } } = useContext(CartContext)
    const { navigation } = props

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        })
        return unsubscribe
    }, [navigation])

    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            headerMode='none'
            options={{ safeAreaInsets: { top: 0 }, headerShown: false }}
            tabBarOptions={{
                activeTintColor: Colors.primaryDark,
            }}>
            <Tab.Screen name='home' component={DashboardContainer}
                options={{
                    tabBarLabel: 'Home', tabBarIcon: ({ size, color }) => (
                        <Image source={require('../images/home.png')}
                            style={{ tintColor: color }} />
                    )
                }} />
            <Tab.Screen name='vegetable' component={Vegetable}
                options={{
                    tabBarLabel: 'Vegetable', tabBarIcon: ({ size, color }) => (
                        <Image source={require('../images/vegetables.png')} style={{ tintColor: color }} />
                    )
                }} />
            <Tab.Screen name='fruits' component={Fruits}
                options={{
                    tabBarLabel: 'Fruits', tabBarIcon: ({ size, color }) => (
                        <Image source={require('../images/fruits.png')} style={{ tintColor: color }} />
                    )
                }} />
            <Tab.Screen name='grocery' component={Grocery}
                options={{
                    tabBarLabel: 'Grocery', tabBarIcon: ({ size, color }) => (
                        <Image source={require('../images/groceries.png')} style={{ tintColor: color }} />
                    )
                }} />
            <Tab.Screen name='cart' component={Cart}
                options={{
                    tabBarVisible: false,
                    tabBarLabel: 'Cart', tabBarIcon: ({ size, color }) => (
                        <View>
                            <Image source={require('../images/cart.png')}
                                style={{ tintColor: color }}
                            />
                            {cart && cart.length != 0 ?
                                <View style={{
                                    position: 'absolute', width: 15, height: 15,
                                    justifyContent: 'center', alignItems: 'center',
                                    borderRadius: 7.5, backgroundColor: Colors.primaryDark,
                                    bottom: 10, left: 10
                                }}>
                                    <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 10 }}>
                                        {cart.length}
                                    </Text>
                                </View>
                                : null}
                        </View>
                    )
                }} />
        </Tab.Navigator>
    )
}

export default Tabs