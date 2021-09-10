import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../styles/Colors'
import MStyles from '../../styles/MStyles'
import { View, FlatList, StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const EmptyAddressList = (props) => {

    const dummyData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']

    const EmptyAddressListItem = ({ item }) => {

        return (
            <View style={[MStyles.main]}>
                <View style={[{ padding: 16 }]}>
                    <ShimmerPlaceHolder style={styles.text} />
                    <ShimmerPlaceHolder style={styles.text2} />
                    <ShimmerPlaceHolder style={styles.text3} />
                </View>
                <View style={[MStyles.divider]} />
            </View >
        )
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <View style={[MStyles.mainGray]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={dummyData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={EmptyAddressListItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    text: {
        width: '100%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    text2: {
        width: '100%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4,
        marginTop: 5
    },
    text3: {
        width: '50%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4,
        marginTop: 5
    },
    desc: {
        width: '50%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
})

export default EmptyAddressList