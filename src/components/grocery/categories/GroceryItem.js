import React, { useState } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native"
import FastImage from "react-native-fast-image";
import MStyles from "../../../styles/MStyles";
import Colors from "../../../styles/Colors";
import Shimmer from "react-native-shimmer";

const GroceryItem = ({ item, navigation }) => {
    const [data, setData] = useState({ imageLoading: false })
    return (
        <View style={[{ padding: 0, marginTop: 3, flex: .33 }]}>
            <TouchableHighlight
                underlayColor={Colors.shimmerBack}
                activeOpacity={0.5}
                style={styles.itemContainer}
                onPress={() => {
                    // console.log(item.have_sub_cat)
                    if (item.have_sub_cat) {
                        navigation.navigate('subCategories', { id: item.category_id, title: item.category_name })
                    } else {
                        navigation.navigate('productList', { type: 'cat', id: item.category_id, title: item.category_name })
                    }
                }}>
                <>
                    <Shimmer
                        tilt={45}
                        animating={data.imageLoading}
                        pauseDuration={500}
                        opacity={data.imageLoading ? 0.3 : 1}
                        intensity={.3}>
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
                    </Shimmer>
                    <Text style={styles.titleContainer}>
                        {item.category_name}
                    </Text>
                </>
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
        paddingVertical: 8,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 6,
        marginVertical: 4
    },
    titleContainer: {
        ...MStyles.categoryNameHome,
        marginTop: 5,
        color: Colors.black,
        fontWeight: '500',
        textAlign: 'center'
    }
})

export default GroceryItem