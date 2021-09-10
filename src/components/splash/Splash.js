import React, { useEffect, useContext } from 'react';
import { SafeAreaView, Image } from 'react-native'
import MStyles from '../../styles/MStyles'
import { Context as AuthContext } from '../../context/AuthContext'

const Splash = () => {

    const { updateSplashLoaded } = useContext(AuthContext)

    useEffect(() => {
        setTimeout(() => {
            updateSplashLoaded()
        }, 4000)
    }, [])

    return (
        <SafeAreaView style={[MStyles.main, MStyles.center]}>
            <Image
                resizeMode='contain'
                source={require('../../images/splash_logo.png')}
                style={{ width: "80%", }}
            />
        </SafeAreaView>
    )
}

export default Splash
