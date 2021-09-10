import React from 'react'
import { View, FlatList, Dimensions } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { Platform, UIManager } from 'react-native'
import { ScrollView } from 'react-native'
import SearchHeader from '../home/SearchHeader'
import { BORDER_RADIUS } from '../../common/Constants'
import LinearGradient from 'react-native-linear-gradient'

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}
const Placeholder = (props) => {
    const DATA = ["", "", "", "", "", "", "", "", "", "", "", ""]
 
    const ShopByCategory = () => {
        return (
            <View style={{ flex: 1 }}>
                <ShimmerPlaceHolder style={{ width: '70%', height: 15, borderRadius: 4, paddingVertical: 5, paddingHorizontal: 10, marginTop: 10 }} />

                {/* <Text style={{ ...MStyles.txtDescriptionBold, fontSize: 18, textAlignVertical: 'center', flex: 1, paddingVertical: 5, paddingHorizontal: 10, marginTop: 10 }}>First Order Offers</Text> */}
                <FlatList
                    data={["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => <View style={{
                        flex: 1,
                        margin: 5,
                        aspectRatio: 9 / 11,
                        borderRadius: BORDER_RADIUS,
                    }}>
                        <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                    </View>}
                    numColumns={3}
                    columnWrapperStyle={{ paddingHorizontal: 5 }}
                />

                <View style={{ width: '100%', aspectRatio: 7 / 3, backgroundColor: Colors.dividerColor, marginTop: 16 }}>
                    <ShimmerPlaceHolder style={{ width: '100%', height: '100%' }} />
                </View>
            </View>
        )
    }

    const ProductItem = (props) => {
        return (
            <View style={{
                ...MStyles.cardView,
                margin: 10,
                padding: 10,
                width: Dimensions.get('screen').width / 2
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

    const OffersGrid = () => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={["", "", "", ""]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => <View style={{
                        flex: 1,
                        margin: 5,
                        aspectRatio: 9 / 10,
                    }}>
                        <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />

                    </View>}
                    numColumns={2}
                    columnWrapperStyle={{ paddingHorizontal: 5 }}
                    style={{ marginTop: 10 }}
                />
                <View style={{ width: '100%', height: 15, backgroundColor: Colors.dividerColor, marginTop: 16 }} />
            </View>
        )
    }

    const OffList = () => {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    data={["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => <View style={{
                        flex: 1,
                        margin: 5,
                        aspectRatio: 9 / 12,
                        borderRadius: BORDER_RADIUS,
                    }}>
                        <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                    </View>}
                    numColumns={3}
                    columnWrapperStyle={{ paddingHorizontal: 5 }} />
            </View>
        )
    }

    const CategoryOffers = () => {
        return (
            <View style={{ backgroundColor: Colors.dividerColorLight, marginVertical: 16 }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={["BUY 1 GET 1 FREE", "UNDER 49 STORE", "MIN 30% OFF"]}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ backgroundColor: MStyles.dividerColor, paddingVertical: 16, paddingHorizontal: 5 }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                width: Dimensions.get('screen').width / 3,
                                aspectRatio: 1,
                                marginHorizontal: 3,
                                borderRadius: BORDER_RADIUS,
                            }}>
                                <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                            </View>
                        )
                    }}
                />

            </View>
        )
    }

    return (
        <View style={[MStyles.main]}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={MStyles.main}>
                <SearchHeader {...props} />

                <View style={{ width: '100%', aspectRatio: 7 / 3, }}>
                    <ShimmerPlaceHolder style={{ width: '100%', height: '100%' }} />
                </View>

                <View style={{ width: '100%', aspectRatio: 10 / 1.5, marginTop: 5 }}>
                    <ShimmerPlaceHolder style={{ width: '100%', height: '100%' }} />
                </View>

                <View style={{ width: '100%', margintop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: 1, aspectRatio: 4 / 5, marginLeft: 10, marginVertical: 10, borderRadius: BORDER_RADIUS }}>
                        <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                    </View>
                    <View style={{ flex: 1, aspectRatio: 4 / 5, margin: 10, borderRadius: BORDER_RADIUS }}>
                        <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                    </View>
                    <View style={{ flex: 1, aspectRatio: 4 / 5, marginRight: 10, marginVertical: 10, borderRadius: BORDER_RADIUS }}>
                        <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                    </View>
                </View>

                <View style={{ flex: 1, aspectRatio: 10 / 3, marginHorizontal: 10, borderRadius: BORDER_RADIUS }}>
                    <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                </View>

                <View style={{ width: '45%', height: 20, margin: 10, marginTop: 20, borderRadius: BORDER_RADIUS }}>
                    <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: 4 }} />
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 10 }}>
                    <View style={{ flex: .3, aspectRatio: 5 / 3, borderRadius: BORDER_RADIUS }}>
                        <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                    </View>
                    <View style={{ flex: .3, aspectRatio: 5 / 3, marginHorizontal: 10, borderRadius: BORDER_RADIUS }}>
                        <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                    </View>
                    <View style={{ flex: .3, aspectRatio: 5 / 3, borderRadius: BORDER_RADIUS }}>
                        <ShimmerPlaceHolder style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
                    </View>
                </View>

                <View>
                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                        <ShimmerPlaceHolder style={{ width: '70%', height: 20, borderRadius: 4 }} />
                        <ShimmerPlaceHolder style={{ width: '15%', height: 25, borderRadius: 4 }} />
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={["", "", "", "", ""]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={() => <ProductItem {...props} />} />
                </View>

                {/* <ScrollView
                    horizontal
                    contentContainerStyle={MStyles.main}>
                    <ShopByCategory />
                </ScrollView>

                <ScrollView
                    horizontal
                    contentContainerStyle={MStyles.main}>
                    <OffersGrid />
                </ScrollView>

                <View>
                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                        <ShimmerPlaceHolder style={{ width: '70%', height: 20, borderRadius: 4 }} />
                        <ShimmerPlaceHolder style={{ width: '15%', height: 25, borderRadius: 4 }} />
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={["", "", "", "", ""]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={() => <ProductItem {...props} />} />
                </View>

                <ScrollView
                    horizontal
                    contentContainerStyle={MStyles.main}>
                    <OffList />
                </ScrollView>

                <CategoryOffers />

                <View>
                    <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                        <ShimmerPlaceHolder style={{ width: '70%', height: 20, borderRadius: 4 }} />
                        <ShimmerPlaceHolder style={{ width: '15%', height: 25, borderRadius: 4 }} />
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={["", "", "", "", ""]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={() => <ProductItem {...props} />} />
                </View> */}
            </ScrollView>
        </View>
    )
}

export default Placeholder