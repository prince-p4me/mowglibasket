import React, { useState } from 'react'
import MStyles from '../../styles/MStyles'
import { View, Text, TouchableOpacity } from 'react-native'
import Colors from '../../styles/Colors'
import Shimmer from 'react-native-shimmer'
import FastImage from 'react-native-fast-image'
import { SHIMMER_SPEED } from '../../common/Constants'

const NotificationsItem = (props) => {

    const { item, notificationClicked } = props

    const [data, setData] = useState({ imageLoading: false })

    return (

        <View style={MStyles.main}>
            <TouchableOpacity onPress={() => { notificationClicked(item) }}    >
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    {
                        item.image ?
                            <Shimmer
                                tilt={45}
                                animating={data.imageLoading}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={data.imageLoading ? 0.3 : 1}
                                intensity={.3}
                                highlightLength={1}>
                                <FastImage
                                    source={{ uri: item.image }}
                                    resizeMode='cover'
                                    style={[{ aspectRatio: item.image_width / item.image_height, width: 100 }, { backgroundColor: Colors.shimmerBack }]}
                                    onLoadStart={() => setData({ ...data, imageLoading: true })}
                                    onLoadEnd={() => setData({ ...data, imageLoading: false })}
                                />
                            </Shimmer>
                            : null
                    }
                    <View style={{ paddingHorizontal: 15, paddingBottom: 15, marginEnd: 15, width: '80%' }}>
                        <Text style={[MStyles.productTitle, { marginTop: 5 }]}>{item.title}</Text>
                        {
                            item.description ?
                                <Text style={[MStyles.txtDescription, { color: Colors.textGray, marginTop: 3 }]}>{item.description}</Text>
                                : null
                        }
                        <Text style={[MStyles.txtDescription, { fontSize: 12, color: Colors.textGray }]}>{item.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={[MStyles.divider]} />
        </View>
    )
}

export default NotificationsItem