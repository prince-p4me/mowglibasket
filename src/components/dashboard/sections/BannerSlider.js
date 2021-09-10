import React, { useEffect, createRef, memo } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import FastImage from 'react-native-fast-image'
// import { useNavigation } from '@react-navigation/native'
// import { Context as CartContext } from '../../../context/CartContext'
import { log } from '../../../common/Utils'
import { HOME_DIVIDER_MARGIN } from '../../../common/Constants'

const DashboardHeader = (props) => {
    log("banner view slider view", "rendring...")
    // const navigation = useNavigation()
    const { data,onBannerClick } = props
    let index = 0
    let clickable = true
    const pager = createRef()

    useEffect(() => {

        // const unsubscribe = props.navigation.addListener('focus', () => {
        setTimeout(() => {
            //         if (pager != null && pager.current != null) {
            //             // setIndex(0)
            startSliding()
            //         }
        }, 1000);
        // })
        // return unsubscribe.unsubscribe
    }, [])

    const startSliding = () => {
        const id = setInterval(() => {
            if (!clickable) return
            if (data && index == data.length - 1 && clickable) {
                if (pager && pager.current && clickable) {
                    pager.current.setPage(0)
                }
                index = 0;
            } else {
                if (pager && pager.current && clickable) {
                    pager.current.setPage(index + 1)
                }
                index = index + 1;
            }
        }, 4000)
    }

    // function onBannerClick(item) {
    //     // if (!clickable) {
    //     //     return
    //     // }
    //     // if (!item.type) return
    //     // if (item.type === 'category') {
    //     //     if (item.have_subcategories) {
    //     //         props.navigation.navigate('subcategories', { id: item.id, })
    //     //     } else {
    //     //         props.navigation.navigate('productList', { type: 'cat', id: item.id })
    //     //     }
    //     // } else if (item.type === 'brand') {
    //     //     props.navigation.navigate('productList', { type: 'brand', id: item.id })
    //     // } else if (item.type === 'product') {
    //     //     props.navigation.navigate('productDetail', item.id)
    //     // }
    // }

    const onPageSelected = (event) => {
        index = event.nativeEvent.position
    }

    return (
        <View style={{ flex: 1, marginBottom: HOME_DIVIDER_MARGIN }}>
            {
                data ?
                    <ViewPager
                        ref={pager}
                        onPageSelected={onPageSelected}
                        style={[styles.viewpager, { aspectRatio: data[0].image_width / data[0].image_height }]}
                        orientation='horizontal'
                        transitionStyle='scroll'
                        initialPage={index}
                        onPageScroll={event => {
                            let position = event.nativeEvent.offset
                            clickable = position == 0 || position == 1
                        }}>
                        {
                            data.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index.toString()}
                                        style={styles.item}
                                        onPress={() => onBannerClick(item)}    >
                                        <FastImage
                                            key={index.toString()}
                                            source={{ uri: item.image }}
                                            style={[styles.image, { aspectRatio: item.image_width / item.image_height }]}
                                            // style={[styles.image, { aspectRatio: 9 / 3 }]}
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                    </ViewPager>
                    : null}
        </View>
    )
}

const styles = StyleSheet.create({
    viewpager: {
        flex: 1,
        width: '100%',
        // height: 150,
        maxHeight: 400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dcdcdc50'
    },
    item: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        // minHeight: 100
    }
})

export default memo(DashboardHeader)