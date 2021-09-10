import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native"
import ToolbarTabs from '../../../common/ToolbarTabs'
import MStyles from "../../../styles/MStyles";
import Colors from "../../../styles/Colors";
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
import { shimmerList } from '../../../common/Dummy'

const GroceryShimmer = (props) => {

    const { myState, navigation, cart } = props

    const Header = (props) => {
        return (
            <View>
                {
                    // <TouchableOpacity onPress={() => { }}>
                    //     <FastImage
                    //         source={myState.data.banner}
                    //         style={{ aspectRatio: myState.data.image_width / myState.data.image_height, width: '100%', height: undefined }}
                    //         resizeMode='contain' />
                    // </TouchableOpacity>
                }
            </View>
        )
    }

    const GroceryItem = ({ item, navigation }) => {
        const [data, setData] = useState({ imageLoading: false })
        return (
            <View style={[{ padding: 0, marginTop: 3, flex: 1 }]}>
                <View style={styles.itemContainer}>

                    <View>
                        <ShimmerPlaceHolder
                            style={[{
                                aspectRatio: 1,
                                minHeight: 70,
                                borderRadius: 4
                            }]}
                        />
                    </View>
                    <ShimmerPlaceHolder
                        style={[{
                            width: '70%',
                            height: 12,
                            marginTop: 8,
                            borderRadius: 4
                        }]} />
                </View>
            </View>
        )
    }

    return (
        <View style={MStyles.main}>
            <ToolbarTabs {...props} cart={cart} />

            <FlatList
                data={shimmerList}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{ paddingHorizontal: 5 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={Header}
                numColumns={3}
                renderItem={({ item, index }) => <GroceryItem item={item} {...props} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        ...MStyles.cardView,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        paddingVertical: 8,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 6,
        marginVertical: 4
    },
    titleContainer: {
        ...MStyles.categoryNameHome,
        marginTop: 5,
        color: Colors.black,
        fontWeight: '500',
        textAlign: 'center'
    }
})


export default GroceryShimmer