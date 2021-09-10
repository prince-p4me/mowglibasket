import React, { useState, memo } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
// import { Platform, UIManager, LayoutAnimation } from 'react-native'
import { log } from '../../../common/Utils'
import FastImage from 'react-native-fast-image'
import { BORDER_RADIUS } from '../../../common/Constants'

import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

// if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }
const OffItems = ({ item, navigateSubcategories }) => {
    const [loading, setLoading] = useState(false)

    log("sub category offers item view", "rendring...")

    return (
        <TouchableOpacity
            onPress={() => navigateSubcategories(item)}
            activeOpacity={0.9}
            style={styles.itemContainer}>
            {
                loading &&
                <View style={{
                    width: '100%',
                    aspectRatio: item.image_width / item.image_height,
                    backgroundColor: Colors.white,
                    borderTopLeftRadius: BORDER_RADIUS,
                    borderTopRightRadius: BORDER_RADIUS,
                }}                >
                    <ShimmerPlaceHolder
                        style={{
                            width: '100%', height: '100%',
                            borderTopLeftRadius: BORDER_RADIUS,
                            borderTopRightRadius: BORDER_RADIUS,
                        }} />
                </View>
            }
            <FastImage
                source={{ uri: item.category_image }}
                style={{
                    width: loading ? 0 : '100%',
                    aspectRatio: item.image_width / item.image_height,
                    backgroundColor: Colors.white,
                    borderTopLeftRadius: BORDER_RADIUS,
                    borderTopRightRadius: BORDER_RADIUS,
                }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)} />
            <View style={{ marginHorizontal: 5, marginVertical: 10 }}>
                <Text style={styles.title}>{item.category_name}</Text>
                <Text style={styles.upTo}>Up to</Text>
                <Text style={styles.discount}>{item.discount}% off</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        margin: 5,
        borderRadius: BORDER_RADIUS,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: '#C94B63',
        backgroundColor: '#C94B63'
    },
    title: {
        ...MStyles.txtDescription,
        fontSize: 12,
        color: Colors.white,
        textAlign: 'center',
    },
    upTo: {
        ...MStyles.txtDescription,
        fontSize: 14,
        color: Colors.white,
        textAlign: 'center',
    },
    discount: {
        ...MStyles.txtDescriptionBold,
        fontSize: 16,
        color: Colors.white,
        textAlign: 'center',
    }
})


export default memo(OffItems)