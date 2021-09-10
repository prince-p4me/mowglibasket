import React, { useState } from 'react'
import MStyles from '../../../styles/MStyles'
import { View, Text, TouchableOpacity } from 'react-native'
import Colors from '../../../styles/Colors'
import Shimmer from 'react-native-shimmer'
import FastImage from 'react-native-fast-image'
import { SHIMMER_SPEED } from '../../../common/Constants'

const ServicesItem = (props) => {

    const { item, onServiceClicked } = props

    const [data, setData] = useState({ imageLoading: false })

    return (
        <View style={{ paddingHorizontal: 5, flex: 1 }}>
            <TouchableOpacity
                onPress={() => {
                    onServiceClicked(item)
                }}
                style={[MStyles.cardView]}>
                <View style={[{ flex: 1 }]}>
                    <Shimmer
                        tilt={45}
                        animating={false}
                        pauseDuration={SHIMMER_SPEED}
                        opacity={data.imageLoading ? 0.3 : 1}
                        intensity={.3}
                        highlightLength={1}>
                        <FastImage
                            source={{ uri: item.image }}
                            style={[{ flex: 1, aspectRatio: item.image_width / item.image_height },
                            data.imageLoading ? { backgroundColor: Colors.shimmerBack } : null,
                            { borderTopLeftRadius: 3, borderTopRightRadius: 3 }
                            ]}
                            onLoadStart={() => setData({ ...data, imageLoading: true })}
                            onLoadEnd={() => setData({ ...data, imageLoading: false })}
                        />
                    </Shimmer>

                    <Text style={[MStyles.txtDescriptionBold, { flex: 1, textAlign: 'center', padding: 12 }]}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ServicesItem