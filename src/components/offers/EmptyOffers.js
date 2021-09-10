import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../styles/MStyles'
import { View, FlatList, StyleSheet } from 'react-native'

import Colors from '../../styles/Colors'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const EmptyOffers = (props) => {

    const dummyData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']

    const renderItem = ({ item }) => {
        return (
            <View style={[MStyles.main]}>
                <View style={[MStyles.horizontal]}>
                    <ShimmerPlaceHolder style={styles.image} />
                    {/* <View style={{ padding: 10, flex: 1 }}>
                        <ShimmerPlaceHolder style={styles.text} />
                        <ShimmerPlaceHolder style={[styles.text, { marginTop: 5, width: '55%' }]} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <ShimmerPlaceHolder style={styles.desc} />
                            <ShimmerPlaceHolder style={[styles.desc, { marginTop: 10 }]} />
                        </View>
                    </View> */}
                </View>
                {/* <View style={[MStyles.divider]} /> */}
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
                    renderItem={renderItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 120,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4,
        marginBottom: 2
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

export default EmptyOffers