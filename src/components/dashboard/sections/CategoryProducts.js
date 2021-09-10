import React, { memo } from 'react'
import { View, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
// import { Platform, UIManager, LayoutAnimation } from 'react-native'
import { log } from '../../../common/Utils'
import ProductItem from './ProductItem'

// import LinearGradient from 'react-native-linear-gradient'
// import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
// const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

// if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const CategoryProducts = (props) => {

    log("category products view", "rendring...")

    const { data, cart, item, addToCart, updateQuantity, removeFromCart,
        updatingItemId, setUpdateItemId, showVariationDialog,
        navigateToProductList
    } = props

    const RenderItem = ({ item, index }) =>
        <ProductItem
            item={item}
            cart={cart}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            updatingItemId={updatingItemId}
            setUpdateItemId={setUpdateItemId}
            showVariationDialog={showVariationDialog}
        />


    return (
        <View>
            <View style={{
                marginTop: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10
            }}>
                <Text
                    style={{
                        ...MStyles.txtDescriptionBold,
                        fontSize: 18,
                        textAlignVertical: 'center'
                    }}>{item.section_title}</Text>
                <TouchableOpacity onPress={() => navigateToProductList(item.category_id, item.section_title)}>
                    <Text style={{ ...MStyles.txtDescription, fontSize: 12, textAlignVertical: 'center', paddingHorizontal: 10, padding: 5, color: 'red', borderColor: Colors.dividerColor, borderRadius: 4, borderWidth: 1 }}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.products_data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={RenderItem} />
            {/* <ScrollView horizontal>
                {item.products_data.map((item, index) => <RenderItem item={item} index={index} />)}
            </ScrollView> */}
        </View>
    )
}

export default memo(CategoryProducts)