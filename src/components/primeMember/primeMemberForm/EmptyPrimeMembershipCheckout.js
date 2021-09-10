import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import MStyles from '../../../styles/MStyles'
import Colors from '../../../styles/Colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import Shimmer from 'react-native-shimmer'
import { SHIMMER_SPEED } from '../../../common/Constants'

const EmptyPrimeMembershipCheckout = (props) => {

    return (
        <SafeAreaView style={[MStyles.main, MStyles.center, { flex: 1 }]}>
            <ScrollView style={[MStyles.main, { width: '100%' }]}  >
                <View style={[MStyles.main, { width: '100%' }]}>
                    <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 16 }]}>
                        <View style={[{ width: '35%' }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.text} />
                            </Shimmer>
                        </View>
                        <View style={[{ width: '25%' }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.desc} />
                            </Shimmer>
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />

                    <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 16 }]}>
                        <View style={[{ width: '25%' }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.text} />
                            </Shimmer>
                        </View>
                        <View style={[{ width: '35%' }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.desc} />
                            </Shimmer>
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />

                    <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 16 }]}>
                        <View style={[{ width: '35%' }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.text} />
                            </Shimmer>
                        </View>
                        <View style={[{ width: '25%' }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.desc} />
                            </Shimmer>
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />

                    <View style={[MStyles.horizontal, { justifyContent: 'space-between', padding: 16 }]}>
                        <View style={[{ width: '25%' }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.text} />
                            </Shimmer>
                        </View>
                        <View style={[{ width: '35%' }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.desc} />
                            </Shimmer>
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />

                    <View style={{ padding: 16 }}>
                        <View style={[{ width: '35%' }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.text} />
                            </Shimmer>
                        </View>
                        <View style={[{ width: '100%', marginTop: 5 }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.desc} />
                            </Shimmer>
                        </View>
                        <View style={[{ width: '50%', marginTop: 5 }]}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.desc} />
                            </Shimmer>
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />
                </View>

                <View style={[{ width: '100%', padding: 16 }]}>
                    <Shimmer
                        tilt={45}
                        animating={true}
                        pauseDuration={SHIMMER_SPEED}
                        opacity={0.3}
                        intensity={.3}
                        highlightLength={1}>
                        <View style={[style.text, { height: 50 }]} />
                    </Shimmer>
                </View>

            </ScrollView>
        </SafeAreaView >
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
        width: '25%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    addButtonContainer: {
        width: '25%',
    },
    addButton: {
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    }
})


export default EmptyPrimeMembershipCheckout