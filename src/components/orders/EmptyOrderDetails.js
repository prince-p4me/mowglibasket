import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SHIMMER_SPEED } from '../../common/Constants'
import { View, ScrollView, StyleSheet } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import Shimmer from 'react-native-shimmer'

const EmptyOrderDetails = () => {
    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <ScrollView style={[MStyles.main]}>
                <View >
                    <View style={{ padding: 16 }}>
                        <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                            <View style={{ width: '40%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                            <View style={{ width: '25%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                            <View style={{ width: '40%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                            <View style={{ width: '25%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                            <View style={{ width: '40%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                            <View style={{ width: '25%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                            <View style={{ width: '40%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                            <View style={{ width: '25%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                            <View style={{ width: '40%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                            <View style={{ width: '25%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={[MStyles.horizontal, { paddingVertical: 16, justifyContent: 'space-between' }]}>
                            <View style={{ width: '40%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                            <View style={{ width: '25%' }}>
                                <Shimmer
                                    tilt={45}
                                    animating={true}
                                    pauseDuration={SHIMMER_SPEED}
                                    opacity={0.3}
                                    intensity={.3}
                                    highlightLength={1}>
                                    <View style={[style.desc]} />
                                </Shimmer>
                            </View>
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />
                    <View style={[{ padding: 16 }]}>
                        <View style={{ width: '45%' }}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={[style.desc]} />
                            </Shimmer>
                        </View>
                        <View style={{ width: '30%', marginTop: 5 }}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={[style.desc]} />
                            </Shimmer>
                        </View>

                        <View style={{ width: '45%', marginTop: 16 }}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={[style.desc]} />
                            </Shimmer>
                        </View>
                        <View style={{ width: '100%', marginTop: 5 }}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={[style.desc]} />
                            </Shimmer>
                        </View>
                        <View style={{ width: '100%', marginTop: 5 }}>
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={[style.desc]} />
                            </Shimmer>
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />

                    <View style={[MStyles.horizontal, { padding: 16 }]}>
                        <View >
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.image} />
                            </Shimmer>
                        </View>
                        <View style={{ paddingLeft: 12, flex: 1 }}>
                            <View >
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
                            <View style={{ marginTop: 5, width: '50%' }}>
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
                            <View style={{ marginTop: 5, width: '25%' }}>
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
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />

                    <View style={[MStyles.horizontal, { padding: 16 }]}>
                        <View >
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.image} />
                            </Shimmer>
                        </View>
                        <View style={{ paddingLeft: 12, flex: 1 }}>
                            <View >
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
                            <View style={{ marginTop: 5, width: '50%' }}>
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
                            <View style={{ marginTop: 5, width: '25%' }}>
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
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />

                    <View style={[MStyles.horizontal, { padding: 16 }]}>
                        <View >
                            <Shimmer
                                tilt={45}
                                animating={true}
                                pauseDuration={SHIMMER_SPEED}
                                opacity={0.3}
                                intensity={.3}
                                highlightLength={1}>
                                <View style={style.image} />
                            </Shimmer>
                        </View>
                        <View style={{ paddingLeft: 12, flex: 1 }}>
                            <View >
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
                            <View style={{ marginTop: 5, width: '50%' }}>
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
                            <View style={{ marginTop: 5, width: '25%' }}>
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
                        </View>
                    </View>
                    <View style={[MStyles.divider]} />


                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const style = StyleSheet.create({
    desc: {
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },

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
    addButtonContainer: {
        width: '25%',
    },
    addButton: {
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    }
})

export default EmptyOrderDetails