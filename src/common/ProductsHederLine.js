import React from 'react'
import { View, Text } from 'react-native'
import MStyles from '../styles/MStyles'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../styles/Colors'

const ProductsHeaderLine = () => {

    return (
        <View>
            <View style={{
                ...MStyles.horizontal, padding: 10,
                backgroundColor: Colors.white, alignItems: 'center'
            }}>
                <Icon name='time-outline' size={15} />
                <Text style={[MStyles.txtDescription,
                { marginLeft: 5, fontSize: 12 }]}>Your order will be delivered by tomorrow till 6 PM</Text>
            </View>
            <View style={MStyles.dividerDrawer} />
        </View>
    )
}

export default ProductsHeaderLine