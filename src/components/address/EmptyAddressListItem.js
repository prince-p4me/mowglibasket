import React, { memo } from 'react'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import { View, StyleSheet } from 'react-native'
import Shimmer from 'react-native-shimmer'
import { SHIMMER_SPEED } from '../../common/Constants'

const EmptyAddressListItem = ({ item }) => {

    return (
        <View style={[MStyles.main]}>
            <View style={[{ padding: 16 }]}>
                <Shimmer
                    tilt={45}
                    animating={true}
                    pauseDuration={SHIMMER_SPEED}
                    opacity={0.3}
                    intensity={.3}
                    style={{ marginTop: 10 }}
                    highlightLength={1}>
                    <View style={style.text} />
                </Shimmer>
                <Shimmer
                    tilt={45}
                    animating={true}
                    pauseDuration={SHIMMER_SPEED}
                    opacity={0.3}
                    intensity={.3}
                    style={{ marginTop: 10 }}
                    highlightLength={1}>
                    <View style={style.text} />
                </Shimmer>
                <View style={{width:'50%'}}>
                    <Shimmer
                        tilt={45}
                        animating={true}
                        pauseDuration={SHIMMER_SPEED}
                        opacity={0.3}
                        intensity={.3}
                        style={{ marginTop: 10 }}
                        highlightLength={1}>
                        <View style={style.desc} />
                    </Shimmer>
                </View>
            </View>
            <View style={[MStyles.divider]} />
        </View >
    )
}

const style = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    text: {
        flex: 1,
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    desc: {
        width: '50%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
})

export default memo(EmptyAddressListItem)