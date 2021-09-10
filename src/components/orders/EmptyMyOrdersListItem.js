import React from 'react'
import { View, StyleSheet } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const EmptyMyOrdersListItem = (props) => {

    return (
        <View style={[MStyles.main]}>
            <View style={{ padding: 10 }}>
                <ShimmerPlaceHolder style={[style.text, { width: '50%' }]} />
                <ShimmerPlaceHolder style={[style.text, { width: '80%', marginTop: 5 }]} />
                <ShimmerPlaceHolder style={[style.text, { width: '30%', marginTop: 5 }]} />
            </View>
            <View style={[MStyles.divider]} />
        </View >
    )
}

const style = StyleSheet.create({
    text: {
        flex: 1,
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    }
})


export default EmptyMyOrdersListItem
