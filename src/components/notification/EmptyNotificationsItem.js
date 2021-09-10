import React, { memo } from 'react'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { View, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const EmptyNotificationsItem = ({ item }) => {

    return (
        <View style={[MStyles.main]}>
            <View style={[MStyles.horizontal, { paddingHorizontal: 12 }]}>
                <ShimmerPlaceHolder style={[style.image, { margin: 10 }]} />
                <View style={{ paddingLeft: 10, flex: 1 }}>
                    <ShimmerPlaceHolder style={[style.desc, { width: '70%', marginTop: 10 }]} />
                    <ShimmerPlaceHolder style={[style.desc, { width: '100%', marginTop: 5 }]} />
                    <ShimmerPlaceHolder style={[style.desc, { width: '40%', marginTop: 5 }]} />
                </View>
            </View>
            <View style={[MStyles.divider]} />
        </View >
    )
}

const style = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    desc: {
        width: '25%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
})

export default memo(EmptyNotificationsItem)