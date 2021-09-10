import React from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native"
import { HEADER_HEIGHT } from './Constants'
import Colors from '../styles/Colors'
import MStyles from '../styles/MStyles'

const ToolbarDetail = (props) => {
    return (
        <SafeAreaView style={[MStyles.horizontal, {
            height: HEADER_HEIGHT,
            width: '100%',
            backgroundColor: Colors.primaryDark,
            alignItems: 'center'
        }]}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { props.navigation.goBack() }}>
                    <Image source={require('../images/back.png')} style={{ tintColor: Colors.white }} />
                </TouchableOpacity>
            </View>
            <View style={[MStyles.horizontal]}>
                <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { props.navigation.navigate('search') }}>
                    <Image source={require('../images/search.png')} style={{ tintColor: Colors.white }} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { props.navigation.navigate('cart') }}>
                    <Image source={require('../images/cart.png')} style={{ tintColor: Colors.white }} />
                    {props.cart && props.cart.length != 0 ?
                        <View style={{
                            position: 'absolute', width: 15, height: 15,
                            justifyContent: 'center', alignItems: 'center',
                            borderRadius: 7.5, backgroundColor: Colors.white,
                            top: 10, right: 10
                        }}>
                            <Text style={MStyles.textCount}>
                                {props.cart.length}
                            </Text>
                        </View>
                        : null}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export default ToolbarDetail