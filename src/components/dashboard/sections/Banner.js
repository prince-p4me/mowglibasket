import React, { useState, memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Platform, UIManager, LayoutAnimation } from 'react-native'
import { log } from '../../../common/Utils'
import FastImage from 'react-native-fast-image'
import { HOME_DIVIDER_MARGIN } from '../../../common/Constants'

import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const Banner = (props) => {

    log("banner view", "rendring...")

    const [imageLoading, setImageLoading] = useState(false)

    const { data, onBannerClick } = props

    return (
        <TouchableOpacity
            onPress={() => onBannerClick(data)}
            style={[{ flex: 1, marginBottom: HOME_DIVIDER_MARGIN }, data.type == 'service' && { marginHorizontal: 10 }]}>
            {imageLoading &&
                <View style={{ width: '100%', aspectRatio: data.image_width / data.image_height }} >
                    <ShimmerPlaceHolder
                        style={{ width: '100%', height: '100%' }} />
                </View>
            }
            <FastImage
                source={{ uri: data.banner }}
                style={[{
                    width: imageLoading ? 0 : '100%', aspectRatio: data.image_width / data.image_height,
                }]}
                resizeMode='cover'
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
            />
        </TouchableOpacity>
    )
}

export default memo(Banner)