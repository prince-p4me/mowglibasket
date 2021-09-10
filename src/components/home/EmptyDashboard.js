import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet, FlatList } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const EmptyDashboard = (props) => {

    const dummyData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']

    const renderItem = ({ item }) => {
        return <ListItem />
    }

    const ListItem = () => {
        return (
            <View style={[{ padding: 0, flex: .5, margin: 5 }]}>
                <View style={[{ flex: 1 }]}>
                    <ShimmerPlaceHolder style={styles.image} />
                    <ShimmerPlaceHolder style={styles.title} />
                    <ShimmerPlaceHolder style={styles.subTitle} />
                </View>
            </View >
        )
    }

    const Header = () => {
        return (
            <View>
                <ShimmerPlaceHolder style={styles.banner} />
                <View style={styles.categories}>
                    <View style={{ flex: .33, aspectRatio: 9 / 10, }}>
                        <ShimmerPlaceHolder style={{ flex: 1, width: '100%', }} />
                        {/* <ShimmerPlaceHolder style={styles.categoryName} /> */}
                    </View>
                    {/* <View style={styles.catDivider} /> */}
                    <View style={{ flex: .33, aspectRatio: 9 / 10, marginHorizontal:5}}>
                        <ShimmerPlaceHolder style={{ flex: 1, width: '100%', }} />
                        {/* <ShimmerPlaceHolder style={styles.categoryName} /> */}
                    </View>
                    <View style={{ flex: .33, aspectRatio: 9 / 10,}}>
                        <ShimmerPlaceHolder style={{ flex: 1, width: '100%', }} />
                        {/* <ShimmerPlaceHolder style={styles.categoryName} /> */}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 5, marginBottom: 10 }}>
                    <ShimmerPlaceHolder style={[styles.desc, { width: '40%' }]} />
                    <ShimmerPlaceHolder style={[styles.desc, { width: '25%', height: 20 }]} />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <View style={[MStyles.main]}>
                <FlatList
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ paddingHorizontal: 5 }}
                    data={dummyData}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={Header}
                    renderItem={renderItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 120,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4,
    },
    desc: {
        width: '25%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    catDivider: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.dividerColor
    },
    categories: {
        // flex: 1,
        // width:'100%',
        backgroundColor: Colors.white,
        // borderColor: Colors.dividerColor,
        // borderWidth: 1,
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    categoryName: {
        alignSelf: 'center',
        height: 15,
        width: '60%',
        marginBottom: 5,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 4
    },
    image: {
        backgroundColor: '#ebebeb',
        overflow: 'hidden',
        width: '100%',
        height: 150,
        borderRadius: 4
    },
    title: {
        backgroundColor: '#ebebeb',
        overflow: 'hidden',
        width: '60%',
        height: 15,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 4
    },
    subTitle: {
        backgroundColor: '#ebebeb',
        overflow: 'hidden',
        width: '90%',
        height: 15,
        marginTop: 5,
        marginTop: 5,
        alignSelf: 'center',
        borderRadius: 4
    }

})

export default EmptyDashboard