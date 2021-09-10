import React, { useState, createRef } from 'react'
import { View, FlatList } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { log } from '../../../common/Utils'
import ProductImage from './ProductImage'

const DATA = [
    {
        "image": "https://www.mowglibasket.com/wp-content/uploads/2021/02/spring-onion-500x500-1.jpg",
        "image_width": 500,
        "image_height": 500
    },
    {
        "image": "https://www.mowglibasket.com/wp-content/uploads/2021/02/spring-onion-500x500-1.jpg",
        "image_width": 500,
        "image_height": 500
    },
    {
        "image": "https://www.mowglibasket.com/wp-content/uploads/2021/02/spring-onion-500x500-1.jpg",
        "image_width": 500,
        "image_height": 500
    },
];

const ProductImageSlider = (props) => {

    const imageListRef = createRef();
    const indicatorListRef = createRef();
    const { required } = props
    log("-- ProductImageSlider -", required.productDetail.product_gallery_images.length)
    const [indexs, setIndex] = useState(0)

    const renderIndicatorItem = ({ item, index }) => {
        return (
            <View>
                <View style={[{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 3,
                    marginVertical: 10
                }, indexs == index ?
                    { backgroundColor: Colors.primary } :
                    { backgroundColor: Colors.dividerColor }]} />
            </View>
        )
    }

    const renderImageItem = ({ item }) => <ProductImage item={item} />

    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        console.log('scrolled to page ', pageNum);
        setIndex(pageNum)
    }

    return (
        <View style={[MStyles.main]}>
            <FlatList
                ref={imageListRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={required.productDetail.product_gallery_images}
                // data={DATA}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => index.toString()}
                style={{ width: '100%', aspectRatio: required.productDetail.product_gallery_images[0].image_width / required.productDetail.product_gallery_images[0].image_height }}
                // style={{ width: '100%', aspectRatio: 1 }}
                onMomentumScrollEnd={onScrollEnd}
            />
            {
                required.productDetail.product_gallery_images.length > 1 &&
                <View style={MStyles.center}>
                    <FlatList
                        ref={indicatorListRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={DATA}
                        renderItem={renderIndicatorItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            }
        </View>
    )
}


export default ProductImageSlider