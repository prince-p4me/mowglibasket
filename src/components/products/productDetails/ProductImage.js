import React, { useState } from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { log } from '../../../common/Utils';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const ProductImage = (props) => {
    const { item } = props;
    const [loading, setLoading] = useState(false)

    // log("image ", JSON.stringify(item))

    return (
        <View>
            {
                loading &&
                <View style={{ width: '100%', aspectRatio: item.image_width / item.image_height }}>
                    <ShimmerPlaceHolder style={{ width: '100%', height: '100%' }} />
                </View>
            }
            <FastImage
                source={{ uri: item.image }}
                style={{
                    width: loading ? 1 : '100%',
                    height:'100%',
                    aspectRatio: item.image_width / item.image_height
                }}
                onLoadStart={() => {
                    log("Loading start")
                    setLoading(true)
                }}
                onLoadEnd={() => {
                    log("Loading Ended")
                    setLoading(false)
                }} 
                onError={()=>{
                    log("ERROR AA GYI")
                }}
                />
        </View>
    )
}

export default ProductImage