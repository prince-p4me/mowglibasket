import React, { useState, useEffect, createRef, useContext, memo } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import FastImage from 'react-native-fast-image'
import { Context as CartContext } from '../../context/CartContext'

const DashboardHeader = (props) => {

    const { state: { data } } = useContext(CartContext)
    const [index, setIndex] = useState(-1)
    let clickable = true
    const pager = createRef()

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setTimeout(() => {
                if (pager != null && pager.current != null) {
                    setIndex(0)
                }
            }, 1000);
        })
        return unsubscribe.unsubscribe
    }, [])

    useEffect(() => {
        const id = setInterval(() => {
            if (!clickable) return
            if (data.banners && index == data.banners.length - 1 && clickable) {
                if (pager && pager.current && clickable) {
                    pager.current.setPage(0)
                }
                setIndex(0)
            } else {
                if (pager && pager.current && clickable) {
                    pager.current.setPage(index + 1)
                }
                setIndex(index + 1)
            }
        }, 4000)
        return () => clearInterval(id);
    }, [index])

    const onPageSelected = (event) => {
        // debugger
        // tempIndex = event.nativeEvent.position
        // setIndex(temp)
    }

    const onBannerClick = (item) => {
        if (!clickable) {
            return
        }
        if (!item.type) return
        if (item.type === 'category') {
            if (item.have_subcategories) {
                props.navigation.navigate('subcategories', { id: item.id, })
            } else {
                props.navigation.navigate('productList', { type: 'cat', id: item.id })
            }
        } else if (item.type === 'brand') {
            props.navigation.navigate('productList', { type: 'brand', id: item.id })
        } else if (item.type === 'product') {
            props.navigation.navigate('productDetail', item.id)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {(data && data.banners) ?
                <ViewPager
                    onPageSelected={onPageSelected}
                    ref={pager}
                    style={[styles.viewpager, { aspectRatio: data.banners[0].image_width / data.banners[0].image_height }]}
                    orientation='horizontal'
                    transitionStyle='scroll'
                    initialPage={index}
                    onPageScroll={event => {
                        let position = event.nativeEvent.offset
                        clickable = position == 0 || position == 1
                    }}
                >
                    {
                        data.banners.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.item}
                                    onPress={() => onBannerClick(item)}    >
                                    <FastImage
                                        key={index.toString()}
                                        source={{ uri: item.image }}
                                        style={[styles.image, { aspectRatio: item.image_width / item.image_height }]}
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