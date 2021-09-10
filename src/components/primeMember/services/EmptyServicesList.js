import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MStyles from '../../../styles/MStyles'
import { View, FlatList, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)


const EmptyServicesList = (props) => {

    const data = ['', '', '', '', '', '', '', '', '', '', '', '', '']

    const renderItem = ({ item, index }) => {
        return (
            <View style={MStyles.main}>
                <View style={[MStyles.cardView, { marginHorizontal: 5, flex: 1 }]}>
                    <View style={[{ flex: 1 }]}>
                        <ShimmerPlaceHolder style={styles.image} />
                        <ShimmerPlaceHolder style={styles.text} />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <View style={[MStyles.main]}>
                <FlatList
                    numColumns={2}
                    style={{ marginVertical: 5 }}
                    columnWrapperStyle={{ paddingVertical: 5, paddingHorizontal: 5, justifyContent: 'space-around' }}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        // flex: 1,
        width:'100%',
        height: 80,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    text: {
        width: '70%',
        height: 15,
        borderRadius: 4,
        margin: 16,
        alignSelf: 'center'
    }
})

export default EmptyServicesList