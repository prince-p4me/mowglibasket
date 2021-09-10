import React from "react";
import { View,  FlatList, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image";
import MStyles from "../../../styles/MStyles";
import GroceryItem from "./GroceryItem";
import ToolbarTabs from '../../../common/ToolbarTabs'

const Grocery = (props) => {

    const { myState, navigation, cart } = props

    const Header = (props) => {
        return (
            <View>
                {
                    myState.data && myState.data.banner &&
                    <TouchableOpacity onPress={() => { }}>
                        <FastImage
                            source={myState.data.banner}
                            style={{ aspectRatio: myState.data.image_width / myState.data.image_height, width: '100%', height: undefined }}
                            resizeMode='contain' />
                    </TouchableOpacity>
                }
            </View>
        )
    }

    return (
        <View style={MStyles.main}>
            <ToolbarTabs {...props} cart={cart} />

            <FlatList
                data={myState.data.categories}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{ marginHorizontal: 6 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={Header}
                numColumns={3}
                renderItem={({ item, index }) => <GroceryItem item={item} {...props} />} />
        </View>
    )
}

export default Grocery