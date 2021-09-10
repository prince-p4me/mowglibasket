import React from 'react'
import { View, Text } from 'react-native'
import MStyles from '../styles/MStyles'

const ErrorView = (props) => {
    return (
        <View style={[MStyles.main, MStyles.center]}>
            <Text style={[MStyles.txtSubTitle]}>
                {props.message}
            </Text>
        </View>
    )
}

export default ErrorView