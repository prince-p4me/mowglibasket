import React, { memo } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { RUPEES } from '../../common/Constants'
import { alertStockLimit } from '../../common/Utils'

const CartItem = (props) => {

    const { item, updateQuantity, removeFromCart, setUpdateItemId, updatingItemId } = props

    return (
        <View style={[MStyles.main]}>
            <View style={[MStyles.horizontal, { padding: 16 }]}>
                <FastImage
                    source={{ uri: item.image }}
                    style={{ width: 100, height: 100 }} />
                <View style={{ padding: 10, flex: 1 }}>
                    <Text style={[MStyles.productTitle, { fontWeight: '500' }]}>
                        {item.product_name}
                    </Text>
                    <View style={[MStyles.horizontal, { marginTop: 5 }]}>
                        <Text style={[MStyles.productTitle, { fontWeight: '600', flex: 1 }]}>
                            {RUPEES} {item.total}
                        </Text>
                        <View style={[MStyles.horizontal, MStyles.center, { marginTop: 5 }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.quantity > 1) {
                                        setUpdateItemId(item.key)
                                        updateQuantity(item.key, item.quantity - 1)
                                    } else {
                                        setUpdateItemId(item.key)
                                        removeFromCart(item.key)
                                    }
                                }}
                                activeOpacity={0.7}
                                style={[MStyles.buttonAdd]}>
                                <Ionicon name="md-remove" color={Colors.white} size={18} />
                            </TouchableOpacity>
                            <View style={[MStyles.center, { paddingHorizontal: 16 }]}>
                                <Text style={[MStyles.txtDescription]}>{item.quantity}</Text>
                                {(updatingItemId && updatingItemId === item.key) ?
                                    <ActivityIndicator size='small' color={Colors.primaryDark} style={{ position: 'absolute' }} />
                                    : null
                                }
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.quantity < item.stock_quantity) {
                                        setUpdateItemId(item.key)
                                        updateQuantity(item.key, item.quantity + 1)

                                    } else {
                                        alertStockLimit(item.stock_quantity)

                                    }
                                }}
                                activeOpacity={0.7}
                                style={[MStyles.buttonAdd]}>
                                <Ionicon name="md-add" color={Colors.white} size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[MStyles.divider]} />
        </View>
    )
}

export default memo(CartItem)