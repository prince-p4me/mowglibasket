import React, { useState, memo } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import MStyles from '../../../styles/MStyles'
// import { Platform, UIManager, LayoutAnimation } from 'react-native'
import FastImage from 'react-native-fast-image'
import { BORDER_RADIUS, HOME_DIVIDER_MARGIN } from '../../../common/Constants'

import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { log } from '../../../common/Utils'
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

// if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const ParentCategories = (props) => {

    log("parent 3 categories view", "rendring...")

    const [loading, setLoading] = useState({ first: false, second: false, third: false })
    const { data, navigateToGrocery,
        navigateToFruits, navigateToVegetables } = props


    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={navigateToFruits}
                style={{ ...styles.categoryContainer, marginLeft: 10 }}>
                {
                    loading.first &&
                    <View style={{
                        ...styles.image,
                        aspectRatio: data[0].image_width / data[0].image_height,
                    }} >
                        <ShimmerPlaceHolder
                            style={{ width: '100%', height: '100%' }} />
                    </View>
                }
                <FastImage
                    source={{ uri: data[0].category_image }}
                    style={{
                        ...styles.image, width: loading.first ? 0 : '90%',
                        aspectRatio: data[0].image_width / data[0].image_height,
                    }}
                    onLoadStart={() => setLoading({ ...loading, first: true })}
                    onLoadEnd={() => setLoading({ ...loading, first: false })}
                />
                <Text style={styles.title}>{data[0].category_name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={navigateToVegetables}
                style={{ ...styles.categoryContainer, marginHorizontal: 10 }}>
                {
                    loading.second &&
                    <View style={{
                        ...styles.image,
                        aspectRatio: data[1].image_width / data[1].image_height,
                    }} >
                        <ShimmerPlaceHolder
                            style={{ width: '100%', height: '100%' }} />
                    </View>
                }
                <FastImage
                    source={{ uri: data[1].category_image }}
                    style={{
                        ...styles.image, width: loading.second ? 0 : '90%',
                        aspectRatio: data[1].image_width / data[1].image_height,
                    }}
                    onLoadStart={() => setLoading({ ...loading, second: true })}
                    onLoadEnd={() => setLoading({ ...loading, second: false })} />
                <Text style={styles.title}>{data[1].category_name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={navigateToGrocery}
                style={{ ...styles.categoryContainer, marginRight: 10 }}>
                {
                    loading.third &&
                    <View style={{
                        ...styles.image,
                        aspectRatio: data[2].image_width / data[2].image_height,
                    }} >
                        <ShimmerPlaceHolder
                            style={{ width: '100%', height: '100%' }} />
                    </View>
                }
                <FastImage
                    source={{ uri: data[2].category_image }}
                    style={{
                        ...styles.image, width: loading.third ? 0 : '90%',
                        aspectRatio: data[2].image_width / data[2].image_height,
                    }}
                    onLoadStart={() => setLoading({ ...loading, third: true })}
                    onLoadEnd={() => setLoading({ ...loading, third: false })}
                />
                <Text style={styles.title}>{data[2].category_name}</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 8,
        marginBottom: HOME_DIVIDER_MARGIN
    },
    categoryContainer: {
        flex: 1,
        backgroundColor: '#FFEEE6',
        borderColor: '#E7D6CF',
        borderWidth: 2,
        borderRadius: BORDER_RADIUS,
        alignItems: 'center'
    },
    image: {
        width: '90%',
        backgroundColor: '#FFEEE6',
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        marginTop: 5
    },
    title: {
        ...MStyles.txtDescriptionBold,
        fontSize: 12,
        textAlignVertical: 'center',
        textAlign: 'center',
        backgroundColor: '#E7D6CF',
        flex: 1,
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    }
})

export default memo(ParentCategories)