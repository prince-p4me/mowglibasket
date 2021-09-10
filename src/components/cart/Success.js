import React, { useEffect } from 'react'
import {
    View, Text, Image, TouchableOpacity,
    StyleSheet, BackHandler
} from 'react-native'
import Colors from '../../styles/Colors'
import { StackActions } from '@react-navigation/native'
import MStyles from '../../styles/MStyles'

const Success = (props) => {

    const { order_id } = props.route.params.data.data
    const { message } = props.route.params.data

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handelBackPress)
        return () => BackHandler.removeEventListener('hardwareBackPress', handelBackPress);
    }, [])

    const handelBackPress = () => {
        return true
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primaryDark }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
                <Image
                    source={require('../../images/success.png')}
                    style={{ width: '15%', height: '10%', resizeMode: 'center' }}
                    resizeMode='center'
                />
                <Text style={styles.congr}>Congratulations!</Text>
                <Text style={styles.message}>{message}</Text>

                <Text style={[styles.message, { marginTop: 30 }]}>Order ID:</Text>
                <Text style={[styles.orderId, { marginTop: 0 }]}>{order_id}</Text>

                <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            // props.navigation.navigate('home', { screen: 'home' })
                            props.navigation.pop()
                            props.navigation.dispatch({
                                ...StackActions.replace('home',
                                    { screen: 'home' })
                            })
                            props.navigation.navigate('orderDetails', { orderId: order_id })
                            // props.navigation.naviagte('')
                        }}
                        activeOpacity={0.5}
                        style={{
                            borderRadius: 50,
                            borderColor: Colors.textGray,
                            backgroundColor: Colors.primaryDark,
                            width: '80%',
                            padding: 10
                        }} >
                        <Text style={[styles.buttonText, { color: Colors.white }]}>View Order Detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('home', { screen: 'home' })
                        }}
                        activeOpacity={0.5}
                        style={{
                            borderRadius: 50,
                            borderColor: Colors.textGray,
                            backgroundColor: Colors.primaryDark,
                            width: '80%',
                            padding: 10,
                            marginTop: 10
                        }} >
                        <Text style={[styles.buttonText, { color: Colors.white }]}>Continue Shopping</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 5,
        borderRadius: 7,
        width: '100%'
    },
    cardView: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { height: 5 },
        elevation: 4
    },
    message: {
        ...MStyles.txtDescription,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        color: Colors.black
    },
    buttonText: {
        ...MStyles.txtDescription,
        fontSize: 14,
        textAlign: 'center',
        color: Colors.primaryDark
    },
    congr: {
        ...MStyles.txtDescription,
        paddingHorizontal: 16,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        color: 'green'
    },
    orderId: {
        ...MStyles.txtDescription,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        color: Colors.primaryDark
    }
})

export default Success