import React from 'react'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { View, StyleSheet ,ScrollView} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const ProductDetailsShimmer = ({ item }) => {

    return (
        <ScrollView style={[MStyles.main, { padding: 16 }]}>
            <ShimmerPlaceHolder style={styles.title} />
            <ShimmerPlaceHolder style={[styles.title, { width: '40%', marginTop: 10 }]} />
            <ShimmerPlaceHolder style={{ width: '30%', height: 12, borderRadius: 4, marginTop: 10 }} />
            <ShimmerPlaceHolder style={{ width: '30%', height: 12, borderRadius: 4, marginTop: 5 }} />
            <ShimmerPlaceHolder style={[{ width: '100%', height: 300, borderRadius: 4, marginTop: 10 }]} />
            <ShimmerPlaceHolder style={{ width: '45%', height: 12, borderRadius: 4, marginTop: 10 }} />
            <ShimmerPlaceHolder style={{ width: '45%', height: 12, borderRadius: 4, marginTop: 5 }} />
            <ShimmerPlaceHolder style={{ width: '30%', height: 20, borderRadius: 4, marginTop: 15 }} />

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
            <ShimmerPlaceHolder style={{ width: '50%', height: 12, borderRadius: 4, marginTop: 5, marginBottom:65 }} />

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