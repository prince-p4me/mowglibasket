import React from 'react'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { View, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const ProductDetailsShimmer = ({ item }) => {


    const ProductItem = (props) => {
        return (
            <View style={{
                ...MStyles.cardView,
                margin: 10,
                padding: 10,
                width: Dimensions.get('screen').width / 2.5
            }}>
                <View>
                    <View>
                        <View style={{ maxWidth: '100%', aspectRatio: 1 }}>
                            <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: 4 }} />
                        </View>
                    </View>
                    <ShimmerPlaceHolder style={{ width: 60, height: 20, borderRadius: 4, marginTop: 10 }} />
                    <ShimmerPlaceHolder style={{ width: "100%", height: 12, borderRadius: 4, marginTop: 10 }} />
                    <ShimmerPlaceHolder style={{ width: "100%", height: 12, borderRadius: 4, marginTop: 5 }} />
                    <ShimmerPlaceHolder style={{ width: "70%", height: 12, borderRadius: 4, marginTop: 5 }} />
                    <ShimmerPlaceHolder style={{ width: 40, height: 15, borderRadius: 4, marginTop: 10 }} />
                    <ShimmerPlaceHolder style={{ width: "100%", height: 40, borderRadius: 4, marginTop: 10 }} />
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={[MStyles.main]}>
            <ShimmerPlaceHolder style={[{ width: '100%', height: 300 }]} />
            <View style={{ paddingHorizontal: 16 }}>
                <ShimmerPlaceHolder style={[styles.title, { width: '40%', marginTop: 10 }]} />
                <ShimmerPlaceHolder style={[styles.title, { width: '90%', marginTop: 10 }]} />
                <ShimmerPlaceHolder style={{ width: '60%', height: 15, borderRadius: 4, marginTop: 10 }} />
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={{ flex: 1 }}>
                        <ShimmerPlaceHolder style={{ width: '45%', height: 15, borderRadius: 4, marginTop: 10 }} />
                        <ShimmerPlaceHolder style={{ width: '50%', height: 12, borderRadius: 4, marginTop: 8 }} />
                    </View>
                    <ShimmerPlaceHolder style={{ width: '30%', height: 25, borderRadius: 4, marginTop: 8 }} />
                </View>
            </View>
            <View style={{ ...MStyles.divider, height: 16, marginTop: 16 }} />
            <View>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                    <ShimmerPlaceHolder style={{ width: '70%', height: 20,marginBottom:5, borderRadius: 4 }} />
                    {/* <ShimmerPlaceHolder style={{ width: '15%', height: 25, borderRadius: 4 }} /> */}
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={["", "", "", "", ""]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => <ProductItem />} />
            </View>
            {/* <View style={{ paddingHorizontal: 16 }}>
                <View style={[MStyles.horizontal, { justifyContent: 'space-between' }]}>
                    <ShimmerPlaceHolder style={{ width: '30%', height: 40, borderRadius: 4, marginTop: 15 }} />
                    <ShimmerPlaceHolder style={{ width: '30%', height: 40, borderRadius: 4, marginTop: 15 }} />
                    <ShimmerPlaceHolder style={{ width: '30%', height: 40, borderRadius: 4, marginTop: 15 }} />
                </View>
                <ShimmerPlaceHolder style={{ width: '60%', height: 20, borderRadius: 4, marginTop: 20 }} />
                <ShimmerPlaceHolder style={{ width: '100%', height: 12, borderRadius: 4, marginTop: 15 }} />
                <ShimmerPlaceHolder style={{ width: '100%', height: 12, borderRadius: 4, marginTop: 5 }} />
                <ShimmerPlaceHolder style={{ width: '100%', height: 12, borderRadius: 4, marginTop: 5 }} />
                <ShimmerPlaceHolder style={{ width: '100%', height: 12, borderRadius: 4, marginTop: 5 }} />
                <ShimmerPlaceHolder style={{ width: '100%', height: 12, borderRadius: 4, marginTop: 5 }} />
                <ShimmerPlaceHolder style={{ width: '50%', height: 12, borderRadius: 4, marginTop: 5, marginBottom: 65 }} />
            </View> */}

            <View style={[MStyles.divider]} />
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    title: {
        width: '95%',
        height: 20,
        borderRadius: 4,
    },
    image: {
        width: 70,
        height: 70,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4,
    },
    text: {
        width: '100%',
        height: 15,
        borderRadius: 4
    },
    desc: {
        width: '25%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    addButtonContainer: {
        width: '25%',
    },
    addButton: {
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    }
})

export default ProductDetailsShimmer