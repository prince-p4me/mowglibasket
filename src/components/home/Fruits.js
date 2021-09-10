import React, { memo } from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import MStyles from '../../styles/MStyles'
import ProductItem from './ProductItem'

const ProductsFruits = (props) => {

    const {
        navigation,
        cart,
        data,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        updatingItemId,
        setUpdateItemId
    } = props

    function FruitsListItem({ item, index }) {
        return (
            <ProductItem
                {...props}
                item={item}
                cart={cart}
                loading={loading}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                updatingItemId={updatingItemId}
                setUpdateItemId={setUpdateItemId} />
        )
    }

    return (
        <View style={[MStyles.main]} >
            {/* <Text style={[MStyles.txtSubTitle, { padding: 10, fontSize: 18 }]}>{data.fruits_products.title}</Text> */}
            <View style={[MStyles.horizontal, {
                justifyContent: 'space-between',
                marginHorizontal: 10,
                alignItems: 'center'
            }]}>
                <Text style={[MStyles.txtSubTitle, {
                    fontSize: 18,
                    marginTop: 16,
                    marginBottom: 10
                }]
                }>{data.fruits_products.title}</Text>
                < TouchableOpacity
                    onPress={() => {
                        // if (!clicked) {
                        // setClicked()
                        // props.navigation.navigate('productList', { type: 'cat', id: data.fruits_products.category_id })
                        navigation.navigate('fruits')
                        // }
                    }}
                    activeOpacity={0.5}
                    style={[MStyles.buttonSmallParent, { alignSelf: 'baseline' }]}>
                    <Text style={[MStyles.themeButtonSmall, { fontSize: 12, padding: 0 }]} >View all</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={data.fruits_products.products}
                keyExtractor={(item, index) => item.id}
                columnWrapperStyle={{ paddingHorizontal: 5 }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={FruitsListItem}
            />
        </View>
    )
}
// export default ProductsFruits
export default memo(ProductsFruits)