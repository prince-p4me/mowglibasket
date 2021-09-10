import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MStyles from '../../styles/MStyles'
import Colors from '../../styles/Colors'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const EmptyLandingScreen = () => {

    const [animate, setAnimate] = useState(true)

    // useEffect(() => {
    //     setAnimate(true)
    // }, [])

    return (
        <View style={[MStyles.main, MStyles.center, { padding: 16 }]}>
            <ShimmerPlaceHolder style={styles.logo} />
            <ShimmerPlaceHolder style={styles.desc} />
            <ShimmerPlaceHolder style={styles.button} />
            <ShimmerPlaceHolder style={styles.desc} />
            <ShimmerPlaceHolder style={styles.button} />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: '20%',
        borderRadius: 100,
        aspectRatio: 1,
    },
    desc: {
        width: '55%',
        height: 15,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4,
        marginTop: 20,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: Colors.shimmerBack,
        borderRadius: 4,
        marginTop: 5,
    },


})

export default EmptyLandingScreen