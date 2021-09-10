import React, { memo } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import FastImage from 'react-native-fast-image'

const CategoryTabs = (props) => {

    const { navigation, banner, data } = props

    const onBannerClick = (item) => {
        if (item || !item.type) return
        if (item.type === 'category') {
            if (item.have_subcategories) {
                navigation.navigate('subcategories', { id: item.id, })
            } else {
                navigation.navigate('productList', { type: 'cat', id: item.id })
            }
        } else if (item.type === 'brand') {
            navigation.navigate('productList', { type: 'brand', id: item.id })
        } else if (item.type === 'product') {
            navigation.navigate('productDetail', item.id)
        }
    }

    return (
        <>
            {
                banner &&
                <TouchableOpacity onPress={() => { onBannerClick(banner) }}>
                    <FastImage
                        source={{ uri: banner.image }}
                        style={{
                            // aspectRatio: banner.image_width / banner.image_height,
                            width: '100%',
                            height: undefined,
                            marginTop: 1
                        }}
                        resizeMode='contain' />
                </TouchableOpacity>
            }
            <View style={styles.categories}>
                <TouchableOpacity
                    style={[MStyles.cardView, { flex: .31, padding: 5 }]}
                    onPress={() => {
                        // if (!clicked) {
                        // setClicked()
                        navigation.navigate('fruits')

                        // }
                    }}>
                    <FastImage
                        source={{ uri: data.product_categories[0].image }}
                        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                        resizeMode='contain' />
                    <Text style={[MStyles.txtDescriptionBold, { flex: 1, marginTop: 5, textAlign: 'center', paddingHorizontal: 10 }]}>{data.product_categories[0].name}</Text>
                </TouchableOpacity>
                {/* <View style={styles.catDivider} /> */}
                {/* <View style={{ margin: 5 }} /> */}
                <TouchableOpacity
                    style={[MStyles.cardView, { flex: .31, padding: 5 }]}
                    onPress={() => {
                        // if (!clicked) {
                        // setClicked()
                        navigation.navigate('vegetable')
                        // }
                    }}>
                    <FastImage source={{ uri: data.product_categories[1].image }}
                        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                        resizeMode='contain' />
                    <Text style={[MStyles.txtDescriptionBold, { flex: 1, marginTop: 5, textAlign: 'center' }]}>{data.product_categories[1].name}</Text>
                </TouchableOpacity>
                {/* <View style={styles.catDivider} /> */}
                <TouchableOpacity
                    style={[MStyles.cardView, { flex: .31, padding: 5 }]}
                    onPress={() => {
                        // if (!clicked) {
                        // setClicked()
                        navigation.navigate('grocery')
                        // }
                    }}>
                    <FastImage source={{ uri: data.product_categories[2].image }}
                        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                        resizeMode='contain' />
                    <Text style={[MStyles.txtDescriptionBold, { flex: 1, marginTop: 5, textAlign: 'center' }]}>{data.product_categories[2].name}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    catDivider: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.dividerColor
    },
    categories: {
        // flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        // borderColor: Colors.dividerColor,
        // borderWidth: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10
    },

})


export default memo(CategoryTabs)