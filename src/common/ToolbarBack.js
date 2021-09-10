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
            <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50 }}>
                <Text style={[MStyles.txtToolbarTitle, { color: Colors.white, textAlign: 'center' }]}> {props.title} </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { props.navigation.pop() }}>
                <Image source={require('../images/back.png')} style={{ tintColor: Colors.white }} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ToolbarBack