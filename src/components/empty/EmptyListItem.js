import React, { memo } from 'react'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { View, StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const EmptyListItem = ({ item }) => {

    return (
        <View style={[MStyles.main]}>
            <View style={[MStyles.horizontal, MStyles.cardView,
            {
                // paddingHorizontal: 12,
                marginHorizontal: 10,
                marginVertical: 7
            }]}>
                <ShimmerPlaceHolder style={styles.image} />
                <View style={{ padding: 10, flex: 1 }}>
                    <ShimmerPlaceHolder style={styles.text} />
                    <ShimmerPlaceHolder style={[styles.text, { marginTop: 5, width: '55%' }]} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <ShimmerPlaceHolder style={styles.desc} />
                        <ShimmerPlaceHolder style={[styles.desc, { marginTop: 10 }]} />
                    </View>
                </View>
            </View>
            {/* <View style={[MStyles.divider]} /> */}
        </View >
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4,
        margin: 10
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

export default memo(EmptyListItem)