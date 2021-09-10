import React, { useState } from 'react'
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

const CategoryItem = ({ item, navigateSubcategories }) => {

    log("sub category item view", "rendring...")

    const [loading, setLoading] = useState(false)

    return (
        <View
            underlayColor={Colors.black}
            style={{ flex: .34, }}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => { navigateSubcategories(item) }}
                style={{ flex: 1 }}>
                <View style={styles.itemContainer}>
                    <View style={{
                        width: '100%',
                        // aspectRatio: 20 / 17,
                        aspectRatio: item.image_width / item.image_height,
                        backgroundColor: Colors.dividerColorLight,
                        // backgroundColor: Colors.white,
                        borderTopLeftRadius: BORDER_RADIUS,
                        borderTopRightRadius: BORDER_RADIUS,
                        borderBottomLeftRadius: BORDER_RADIUS,
                        borderBottomRightRadius: BORDER_RADIUS,
                        // alignItems: 'center',
                        // justifyContent: 'center'
                    }}>
                        {loading &&
                            <View style={{
                                width: '100%', height: '100%',
                                borderTopLeftRadius: BORDER_RADIUS,
                                borderTopRightRadius: BORDER_RADIUS,
                            }}>
                                <ShimmerPlaceHolder
                                    style={{
                                        width: '100%', height: '100%',
                                        borderTopLeftRadius: BORDER_RADIUS,
                                        borderTopRightRadius: BORDER_RADIUS,
                                    }}
                                />
                            </View>
                        }
                        <FastImage
                            source={{ uri: item.category_image }}
                            style={{
                                // width: '100%', height: loading ? 0 : '100%',
                                width: loading ? 0 : '100%',
                                aspectRatio: item.image_width / item.image_height,
                                borderTopLeftRadius: BORDER_RADIUS,
                                borderTopRightRadius: BORDER_RADIUS,
                                // margin: 5,
                                // margin:10
                            }}
                            // resizeMode='contain'
                            onLoadStart={() => setLoading(true)}
                            onLoadEnd={() => setLoading(false)} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#FC5002', '#FE730F', '#FC5002']}
                            style={{
                                // marginHorizontal: 5,
                                width: '85%',
                                height: '100%',
                                position: 'absolute',
                                alignSelf: 'center'
                                // borderBottomLeftRadius: BORDER_RADIUS,
                                // borderBottomRightRadius: BORDER_RADIUS
                            }} />
                        <Text style={styles.title}>{item.category_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    itemContainer: {
        flex: 1,
        margin: 5,
        // aspectRatio: 9 / 11,
        borderRadius: BORDER_RADIUS,
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: '#FB3806',
        backgroundColor: '#FB3806'

        // borderColor: '#000',
        // backgroundColor: '#000'
    },
    title: {
        ...MStyles.txtDescriptionBold,
        fontSize: 12,
        color: Colors.white,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginHorizontal: 5,
        minHeight: 40
    }

})

export default CategoryItem