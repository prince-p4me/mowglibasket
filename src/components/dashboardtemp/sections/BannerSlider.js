import React, { useEffect, createRef, memo } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useIsFocused } from '@react-navigation/native'

const DashboardHeader = (props) => {

    const { data, onBannerClick } = props
    let index = 0;
    const flatListRef = createRef();
    let isFoucused = useIsFocused();

    useEffect(() => {
        if (isFoucused)
            startScrolling()
    }, [isFoucused])

    const startScrolling = () => {
        setTimeout(() => {
            if (isFoucused)
                if (flatListRef != null && flatListRef.current != null) {
                    if ((data.length - 1) == index)
                        index = 0
                    else
                        index += 1;
                    flatListRef.current.scrollToIndex({ animated: true, index: index })
                    startScrolling()
                }
        }, 4000);
    }

    return (
        <View style={{ flex: 1, marginBottom: 5 }}>
            {data &&
                <FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                        });
                      }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
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
                    }}
                    style={{ width: '100%', aspectRatio: data[0].image_width / data[0].image_height }}
                    scrollToIndex={index}
                />
            }
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