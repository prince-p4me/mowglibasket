import React from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native"
import { HEADER_HEIGHT } from './Constants'
import Colors from '../styles/Colors'
import MStyles from '../styles/MStyles'

const ToolbarBack = (props) => {

    return (
        <SafeAreaView style={[MStyles.horizontal, {
            height: undefined,
            minHeight: HEADER_HEIGHT,
            width: '100%',
            backgroundColor: Colors.primaryDark,
            alignItems: 'center'
        }]}>

            <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { props.navigation.pop() }}>
                <Image source={require('../images/back.png')} style={{ tintColor: Colors.white }} />
            </TouchableOpacity>
            <View style={{
                flex: 1,
                // width: '100%', position: 'absolute',
                justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50
            }}>
                <Text style={[MStyles.txtToolbarTitle, { color: Colors.white, textAlign: 'center' }]}> {props.title? `Best of ${props.title}`:''} </Text>
            </View>
            <View style={[MStyles.horizontal]}>
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

export default ToolbarBack