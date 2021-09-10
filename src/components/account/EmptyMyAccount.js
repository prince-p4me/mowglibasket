import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const EmptyMyAccount = () => {
    return (
        <SafeAreaView style={[MStyles.mainAuth]}>
            <View style={[MStyles.main]}>
                <View style={{ padding: 16 }}>

                    <ShimmerPlaceHolder style={[style.desc, { marginBottom: 16, width: '40%', alignSelf: 'center', height: 20 }]} />

                    <ShimmerPlaceHolder style={[style.desc, { width: '30%' }]} />
                    <ShimmerPlaceHolder style={[style.desc, { width: '70%', marginTop: 5 }]} />
                    <ShimmerPlaceHolder style={[style.desc, { width: '40%', marginTop: 5 }]} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, }}>
                        <ShimmerPlaceHolder style={[style.desc, { width: '70%' }]} />
                        <ShimmerPlaceHolder style={[style.desc, { width: '20%' }]} />
                    </View>

                    <ShimmerPlaceHolder style={[style.desc, { marginTop: 5, width: '40%', alignSelf: 'center' }]} />
                    <ShimmerPlaceHolder style={[style.desc, { marginTop: 8, width: '100%', alignSelf: 'center' }]} />
                    <ShimmerPlaceHolder style={[style.desc, { marginTop: 8, width: '100%', alignSelf: 'center' }]} />
                    <ShimmerPlaceHolder style={[style.desc, { marginTop: 8, width: '60%', alignSelf: 'center' }]} />
                    <ShimmerPlaceHolder style={[style.desc, { marginTop: 12, width: '100%', height: 45 }]} />


                    <View style={[MStyles.mainGray, { marginTop: 20 }]}>
                        <View style={[MStyles.divider]} />
                        <View style={style.iconTextContainer}>
                            <ShimmerPlaceHolder style={[style.iconContainer]} />
                            <ShimmerPlaceHolder style={[style.desc, { width: '50%', marginLeft: 10 }]} />
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={style.iconTextContainer}>
                            <ShimmerPlaceHolder style={[style.iconContainer]} />
                            <ShimmerPlaceHolder style={[style.desc, { width: '50%', marginLeft: 10 }]} />
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={style.iconTextContainer}>
                            <ShimmerPlaceHolder style={[style.iconContainer]} />
                            <ShimmerPlaceHolder style={[style.desc, { width: '50%', marginLeft: 10 }]} />
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={style.iconTextContainer}>
                            <ShimmerPlaceHolder style={[style.iconContainer]} />
                            <ShimmerPlaceHolder style={[style.desc, { width: '50%', marginLeft: 10 }]} />
                        </View>
                        <View style={[MStyles.divider]} />
                        <View style={style.iconTextContainer}>
                            <ShimmerPlaceHolder style={[style.iconContainer]} />
                            <ShimmerPlaceHolder style={[style.desc, { width: '50%', marginLeft: 10 }]} />
                        </View>
                        <View style={[MStyles.divider]} />
                    </View>
                </View>
            </View>
        </SafeAreaView >
    )
}

const style = StyleSheet.create({
    desc: {
        width: '25%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4
    },
    iconTextContainer: {
        ...MStyles.main,
        ...MStyles.horizontal,
        paddingHorizontal: 16,
        paddingVertical: 25,
        alignItems: 'center'
    },
    iconContainer: {
        width: 15,
        height: 15,
        borderRadius: 50
    }
})

export default EmptyMyAccount