import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Auth from '../components/login/Auth'
import OTP from '../components/login/OTP'
import Terms from '../components/login/Terms'
import Policy from '../components/login/Policy'
import { Context as AuthContext } from '../context/AuthContext'

const AuthScreens = (props) => {


    const { state: { user}, updateUser } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            props.navigation.pop()
            props.navigation.navigate('landingScreen')
        }
    }, [])

    const AuthStack = createStackNavigator()

    return (
        <AuthStack.Navigator headerMode='none'>
            <AuthStack.Screen name="auth" component={Auth} options={{ headerShown: false }} />
            <AuthStack.Screen name="terms" component={Terms} options={{ headerShown: false }} />
            <AuthStack.Screen name="policy" component={Policy} options={{ headerShown: false }} />
            <AuthStack.Screen name="otp" component={OTP} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
}

export default AuthScreens