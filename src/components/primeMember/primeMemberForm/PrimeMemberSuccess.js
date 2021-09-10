import React, { useEffect } from 'react'
import {
    View, Text, Image, TouchableOpacity,
    StyleSheet, BackHandler
} from 'react-native'
import Colors from '../../../styles/Colors'
import {  StackActions } from '@react-navigation/native'
import MStyles from '../../../styles/MStyles'

const PrimeMemberSuccess = (props) => {


    const { response } = props.route.params
    // const order_id = '987765'
    // const message = 'You become a prime member\nnow you have access to our services'

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
                    source={require('../../../images/success.png')}
                    style={{ width: '15%', height: '10%', resizeMode: 'center' }}
                    resizeMode='center'
                />
                <Text style={styles.congr}>Congratulations!</Text>
                <Text style={styles.message}>{response.message}</Text>

                <Text style={[styles.message, { marginTop: 30 }]}>Your Membership ID</Text>
                <Text style={[styles.orderId, { marginTop: 0 }]}>{response.data.user_data.prime_membership_id}</Text>

                <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.pop(3)
                            props.navigation.navigate('services')
                        }}
                        activeOpacity={0.5}
                        style={{
                            borderRadius: 50,
                            borderColor: Colors.textGray,
                            backgroundColor: Colors.primaryDark,
                            width: '80%',
                            padding: 10
                        }} >
                        <Text style={[styles.buttonText, { color: Colors.white }]}>Request a Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.pop(3)
                            props.navigation.dispatch({
                                ...StackActions.replace('drawer',
                                    { screen: 'home' })
                            })
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
                        <Text style={[styles.buttonText, { color: Colors.white }]}>Make a Purchase</Text>
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

export default PrimeMemberSuccess