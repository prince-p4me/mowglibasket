import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import FastImage from 'react-native-fast-image'
import { BANNER_RATIO, SHIMMER_SPEED } from '../../common/Constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Context as ClickContext } from '../../context/ClickContext'
import Shimmer from 'react-native-shimmer'

const OfferItem = (props) => {

    const { item } = props

    const { state: { clicked }, setClicked } = useContext(ClickContext)
    const [data, setData] = useState({ imageLoading: false })


    const onBannerClick = () => {
        if (!item.type) return

        if (item.type === 'category') {
            // props.navigation.navigate('subcategories', { id: item.id, })
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
        <View>
            <View style={[MStyles.mainGray]}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        if (!clicked) {
                            setClicked()
                            onBannerClick(item)
                        }
                    }} >
                    <Shimmer
                        tilt={45}
                        animating={data.imageLoading}
                        pauseDuration={SHIMMER_SPEED}
                        opacity={data.imageLoading ? 0.3 : 1}
                        intensity={.3}
                        highlightLength={1}>
                        <FastImage
                            source={{ uri: item.image }}
                            style={{ width: '100%', height: undefined, aspectRatio: item.image_width && item.image_height ? item.image_width / item.image_height : BANNER_RATIO, backgroundColor: Colors.shimmerBack }}
                            onLoadStart={() => setData({ ...data, imageLoading: true })}
                            onLoadEnd={() => setData({ ...data, imageLoading: false })}
                        />
                    </Shimmer>
                </TouchableOpacity>
            </View>
            <View style={{ height: 1, width: '100%', marginBottom: 10 }} />
        </View>
    )
}

export default OfferItem