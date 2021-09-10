import React, { useState, memo } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { Platform, UIManager } from 'react-native'
import FastImage from 'react-native-fast-image'
import { BORDER_RADIUS } from '../../../common/Constants'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { log } from '../../../common/Utils'
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}
const OfferGridItem = ({ item, navigateSubcategories }) => {

    log("Four categories item view", "rendring...")

    const [loading, setLoading] = useState(false)

    return (
        <TouchableOpacity
            onPress={() => navigateSubcategories(item)}
            activeOpacity={0.97}
            style={styles.itemContainer}>
            <Text style={styles.title}>{item.category_name}</Text>
            <View style={{
                width: '100%',
                aspectRatio: 20 / 17,
                backgroundColor: Colors.white,
                borderTopLeftRadius: BORDER_RADIUS,
                borderTopRightRadius: BORDER_RADIUS,
                borderBottomLeftRadius: BORDER_RADIUS,
                borderBottomRightRadius: BORDER_RADIUS,
            }}>
                <Text style={styles.discount}>UP TO {item.discount}% OFF</Text>
                {loading &&
                    <View style={{
                        width: '60%',
                        aspectRatio: item.image_width / item.image_height,
                        borderRadius: BORDER_RADIUS,
                        alignSelf: 'center'
                    }}>
                        <ShimmerPlaceHolder
                            style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS, }} />
                    </View>
                }

                <FastImage
                    source={{ uri: item.category_image }}
                    style={{
                        width: loading ? 0 : '60%',
                        aspectRatio: item.image_width / item.image_height,
                        borderRadius: BORDER_RADIUS,
                        alignSelf: 'center'
                    }}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    itemContainer: {
        flex: 1,
        margin: 5,
        aspectRatio: 9 / 10,
        borderRadius: BORDER_RADIUS,
        borderWidth: 2,
        borderColor: '#1B4074',
        backgroundColor: '#1B4074'
        // borderColor: '#000',
        // backgroundColor: '#000'
    },
    title: {
        ...MStyles.txtDescriptionBold,
        fontSize: 16,
        color: Colors.white,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginHorizontal: 5
    },
    discount: {
        ...MStyles.txtDescriptionBold,
        fontSize: 16,
        color: Colors.assent,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 5,
        marginTop: 2,
    }

})

export default OfferGridItem
// export default memo(OfferGridItem)