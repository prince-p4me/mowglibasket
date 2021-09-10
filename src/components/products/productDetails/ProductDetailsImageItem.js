import React, { useState, } from 'react'
import { TouchableOpacity } from 'react-native'
import Colors from '../../../styles/Colors'
import { SHIMMER_SPEED } from '../../../common/Constants'
import Shimmer from 'react-native-shimmer'
import FastImage from 'react-native-fast-image'

const ProductDetailsImageItem = (props) => {

    const { item, required, setRequired } = props
    const [localData, setLocalData] = useState({ loading: false, imageLoading: false })

    return (
        <TouchableOpacity
            onPress={() => setRequired({ ...required, productImage: item.image })}
            style={{ marginRight: 10 }}>
            <Shimmer
                tilt={45}
                animating={localData.imageLoading}
                pauseDuration={SHIMMER_SPEED}
                opacity={localData.imageLoading ? 0.3 : 1}
                intensity={.3}
                highlightLength={1}>
                <FastImage source={{ uri: item.image }}
                    style={{ width: 100, height: 100, marginRight: 10, backgroundColor: Colors.shimmerBack }}
                    onLoadStart={() => setLocalData({ ...localData, imageLoading: true })}
                    onLoadEnd={() => setLocalData({ ...localData, imageLoading: false })} />
            </Shimmer>
        </TouchableOpacity>
    )
}


export default ProductDetailsImageItem