import React from 'react'
import { SafeAreaView, Text, Image, TouchableOpacity, Alert } from "react-native"
import { HEADER_HEIGHT } from './Constants'
import Colors from '../styles/Colors'
import MStyles from '../styles/MStyles'

const ToolbarCart = (props) => {

    const { title, clearCart, navigation, data } = props

    const confirm = () => {

        if (!data || !(data.length > 0)) {
            return
        }

        Alert.alert(
            "",
            "Do you want to remove all items from your cart?",
            [
                {
                    text: "Cancel",
                    onPress: () => { }
                },
                {
                    text: 'Remove',
                    onPress: () => {
                        clearCart()
                    }
                }
            ]
        )
    }

    return (
        <SafeAreaView style={[MStyles.horizontal, MStyles.center, {
            height: HEADER_HEIGHT,
            width: '100%',
            backgroundColor: Colors.primaryDark,
            alignItems: 'center'
        }]}>
            <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { navigation.goBack() }}>
                <Image source={require('../images/back.png')} style={{ tintColor: Colors.white }} />
            </TouchableOpacity>
            <Text style={[MStyles.txtToolbarTitle, { flex: 1, color: Colors.white }]}> {title} </Text>
            <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { props.navigation.navigate('search') }}>
                <Image source={require('../images/search.png')} style={{ tintColor: Colors.white }} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{ padding: 16 }}
                onPress={confirm}>
                <Image source={require('../images/delete.png')} style={{ tintColor: Colors.white }} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ToolbarCart