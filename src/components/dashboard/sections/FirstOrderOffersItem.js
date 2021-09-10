import React, { useState, memo } from 'react'
import { View, Dimensions } from 'react-native'
import { Platform, UIManager, LayoutAnimation } from 'react-native'
import { BORDER_RADIUS, HOME_DIVIDER_MARGIN } from '../../../common/Constants'
import FastImage from 'react-native-fast-image'
const { width } = Dimensions.get('window')

import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { log } from '../../../common/Utils'
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const FirstOrderOffersItem = ({ item }) => {

    const [loading, setLoading] = useState(false)

    log("first order offer item view", "rendring...")
    return (
        <View
            style={{
                width: (width / 3) - 15,
                // aspectRatio: (item.image_width / item.image_height),
                // height: 60,
                // minHeight:57,
                marginHorizontal: 5,
                borderRadius: BORDER_RADIUS,
                borderWidth: 1,
                borderColor: '#E7D6CF',
            }}>
            {loading &&
                <View style={{
                    width: '100%',
                    aspectRatio: item.image_width / item.image_height,
                    borderRadius: BORDER_RADIUS,
                }}>
                    <ShimmerPlaceHolder
                        style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS, }} />
                </View>
            }
            <FastImage
                source={{ uri: item.category_image }}
                style={{
                    width: loading ? 0 : '100%',
                    aspectRatio: item.image_width / item.image_height,
                    borderRadius: 8,
                }}
                resizeMode='contain'
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            />
        </View>
    )
}

export default memo(FirstOrderOffersItem)