import React, { memo, useRef } from 'react'
import {
    View, TouchableOpacity, Text,
    FlatList, StyleSheet, Image
} from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import DashboardHeader from './DashboardHeader'
import ProductItemSlider from './ProductItemSlider'
import CategoryTabs from './CategoryTabs'

const Deals = (props) => {

    const {
        cart,
        data,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        updatingItemId,
        setUpdateItemId

    } = props

    let dealsList = useRef('dealsList')
    let currentStepIndex = 0

    const scrollDeals = () => {
        if (currentStepIndex < data.sale_products.products.length - 1) {
            dealsList.scrollToIndex({ index: currentStepIndex + 1 })
        } else {
            dealsList.scrollToIndex({ index: 0 })
        }
    }

    const onFlatlistViewableItemChanged = ({ viewableItems, changed }) => {
        if (viewableItems.length == 1) {
            currentStepIndex = viewableItems[0].index
        } else if (viewableItems.length == 3) {
            currentStepIndex = viewableItems[0].index
        } else {
            currentStepIndex = viewableItems[viewableItems.length - 1].index
        }
    }

    return (
        < >
            {/* {data && <SearchHeader {...props} data={data} />} */}

            {data && data.banners &&
                <View style={{ marginVertical: 5 }}>
                    <DashboardHeader
                        {...props}
                        sliderData={data.banners} />
                </View>
            }

            {/* {data && data.banners &&
                <View style={{ marginVertical: 5 }}>
                    <DashboardHeader
                        {...props}
                        sliderData={data.banners} />
                </View>
            } */}

            {data &&
                <CategoryTabs
                    {...props}
                    banner={data.top_banner}
                    data={data} />
            }

            {data.sale_products &&
                <>
                    <Text style={[MStyles.txtSubTitle, { padding: 10, fontSize: 18 }]}>{data.sale_products.title}</Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <FlatList
                            ref={(ref) => (dealsList = ref)}
                            horizontal
                            data={data.sale_products.products}
                            onViewableItemsChanged={onFlatlistViewableItemChanged}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <ProductItemSlider
                                        {...props}
                                        item={item}
                                        cart={cart}
                                        data={data}
                                        loading={loading}
                                        addToCart={addToCart}
                                        updateQuantity={updateQuantity}
                                        removeFromCart={removeFromCart}
                                        loading={loading}
                                        updatingItemId={updatingItemId}
                                        setUpdateItemId={setUpdateItemId} />
                                )
                            }}
                        />
                        <TouchableOpacity style={styles.slideRight}
                            onPress={scrollDeals}>
                            <Image source={require('../../images/right_arrow.png')} />
                        </TouchableOpacity>
                    </View>
                </>
            }

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
                }>Vegetables</Text>
                < TouchableOpacity
                    onPress={() => {
                        // if (!clicked) {
                        // setClicked()
                        props.navigation.navigate('vegetable')
                        // }
                    }}
                    activeOpacity={0.5}
                    style={[MStyles.buttonSmallParent, { alignSelf: 'baseline' }]}>
                    <Text style={[MStyles.themeButtonSmall, { fontSize: 12, padding: 0 }]} >View all</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    slideRight: {
        width: 50,
        height: 50,
        backgroundColor: Colors.transparentArrow,
        borderRadius: 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default memo(Deals)