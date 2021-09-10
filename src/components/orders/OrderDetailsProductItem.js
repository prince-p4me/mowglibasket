import React, { useState } from 'react'
import { View, Text } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import Shimmer from 'react-native-shimmer'
import FastImage from 'react-native-fast-image'
import { SHIMMER_SPEED } from '../../common/Constants'

const OrderDetailsProductItem = (props) => {

    const { item } = props
    const [data, setData] = useState({ imageLoading: false })

    return (
        <>
            <View style={[MStyles.main, MStyles.horizontal, { padding: 12 }]}>
                <Shimmer
                    tilt={45}
                    animating={data.imageLoading}
                    pauseDuration={SHIMMER_SPEED}
                    opacity={data.imageLoading ? 0.3 : 1}
                    intensity={.3}
                    highlightLength={1}>
                    <FastImage source={{ uri: item.product_image }}
                        style={[{ aspectRatio: item.image_width / item.image_height, width: 100, backgroundColor: Colors.shimmerBack }]}
                        onLoadStart={() => setData({ ...data, imageLoading: true })}
                        onLoadEnd={() => setData({ ...data, imageLoading: false })} />
                </Shimmer>
                <View style={[MStyles.main, { marginLeft: 12 }]}>
                    <Text style={[MStyles.productTitle]}>{item.product_name}</Text>
                    <Text style={[MStyles.productQuntity, { marginTop: 5 }]}>Qty : {item.attributes && item.attributes[0].value+" x "}{item.product_quantity}</Text>
                    <Text style={[MStyles.txtDescription, { marginTop: 5 }]}>Rs {item.product_price}</Text>
                </View>
            </View>
            <View style={MStyles.divider} />
        </>
    )
}

export default OrderDetailsProductItem