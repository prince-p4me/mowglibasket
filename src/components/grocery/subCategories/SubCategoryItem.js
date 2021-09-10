import React, { useState } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native"
import FastImage from "react-native-fast-image";
import MStyles from "../../../styles/MStyles";
import Colors from "../../../styles/Colors";
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const SubCategoryItem = ({ item, navigation }) => {

    // const { item } = props

    const [data, setData] = useState({ imageLoading: false })

    return (
        <View style={[{ padding: 0, marginTop: 3, flex: .5 }]}>
            <TouchableHighlight
                underlayColor={Colors.shimmerBack}
                activeOpacity={0.5}
                style={styles.itemContainer}
                onPress={() => {
                    if (item.have_sub_cat) {
                        navigation.navigate('subCategories', { id: item.category_id, title: item.category_name })
                    } else {
                        navigation.navigate('productList', { type: 'cat', id: item.category_id, title: item.category_name })
                    }
                }}>
                <View style={{ alignItems: 'center' }}>
                    <ShimmerPlaceHolder
                        visible={!data.imageLoading}
                        style={[{
                            aspectRatio: item.image_width / item.image_height,
                            minHeight: 80,
                            borderRadius: 4
                        }]}>
                        <FastImage source={{ uri: item.category_image }}
                            style={[{
                                aspectRatio: item.image_width / item.image_height,
                                minHeight: 70,
                            }, data.imageLoading ?
                                { backgroundColor: Colors.shimmerBack } :
                                { backgroundColor: Colors.white }
                            ]}
                            resizeMode='contain'
                            onLoadStart={() => setData({ ...data, imageLoading: true })}
                            onLoadEnd={() => setData({ ...data, imageLoading: false })} />
                    </ShimmerPlaceHolder>
                    <Text style={styles.titleContainer}>
                        {item.category_name}
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        ...MStyles.cardView,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 7
        // aspectRatio:1
    },
    titleContainer: {
        ...MStyles.categoryNameHome,
        marginTop: 5,
        color: Colors.black,
        fontWeight: '500',
        textAlign: 'center'
    }
})

export default SubCategoryItem