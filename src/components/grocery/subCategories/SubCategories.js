import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image";
import MStyles from "../../../styles/MStyles";
import SubCategoryItem from "./SubCategoryItem";
import ToolbarBack from '../../../common/ToolbarBack'

const SubCategories = (props) => {

    const { myState, navigation, cart, title } = props

    const Header = () => {
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
            {/* <ToolbarTabs {...props} cart={cart} title={title} /> */}
            <ToolbarBack {...props} title={title} cart={cart} />

            <FlatList
                data={myState.data.categories}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{ paddingHorizontal: 5 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={Header}
                numColumns={2}
                renderItem={({ item, index }) => <SubCategoryItem item={item} {...props} />} />
        </View>
    )
}

export default SubCategories