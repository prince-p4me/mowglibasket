import React from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native"
import { HEADER_HEIGHT } from './Constants'
import Colors from '../styles/Colors'
import MStyles from '../styles/MStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'


const ToolbarTabs = (props) => {
    return (
        <SafeAreaView style={[MStyles.horizontal, {
            height: HEADER_HEIGHT,
            width: '100%',
            backgroundColor: Colors.primaryDark,
            alignItems: 'center'
        }]}>
            <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { props.navigation.toggleDrawer() }}>
                <Ionicons name="md-menu" color={Colors.white} size={32} />
            </TouchableOpacity>
            {/* <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { props.navigation.goBack() }}>
                    <Image source={require('../images/back.png')} style={{ tintColor: Colors.white }} />
                </TouchableOpacity> */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    props.title &&
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[MStyles.txtToolbarTitle, { color: Colors.white }]}>{props.title} </Text>
                    </View>
                }
                {
                    !props.title && <Image
                        source={require('../images/home_logo.png')}
                        style={{
                            width: '100%',
                            height: 35,
                            position: 'absolute',
                            tintColor: Colors.white,
                            alignSelf: 'center',
                            resizeMode: 'contain',
                        }} />
                }
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

export default ToolbarTabs