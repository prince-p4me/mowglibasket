import React from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native"
import { HEADER_HEIGHT } from './Constants'
import Colors from '../styles/Colors'
import MStyles from '../styles/MStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'

// if(Platform.OS === 'ios'){
Ionicons.loadFont()
// }

const ToolbarMain = (props) => {
    const { title } = props

    return (
        <SafeAreaView style={[MStyles.horizontal, {
            height: HEADER_HEIGHT,
            width: '100%',
            backgroundColor: Colors.primaryDark,
            alignItems: 'center'
        }]}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{ padding: 16 }}
                onPress={() => { props.navigation.toggleDrawer() }}>
                <Ionicons name="md-menu" color={Colors.white} size={32} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    title &&
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[MStyles.txtToolbarTitle, { color: Colors.white }]}>{title}</Text>
                    </View>
                }
                {
                    !title && <Image
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
                <TouchableOpacity activeOpacity={0.7} style={{ padding: 16 }} onPress={() => { props.navigation.navigate('notifications') }}>
                    <Image source={require('../images/notification.png')} style={{ tintColor: Colors.white }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ToolbarMain