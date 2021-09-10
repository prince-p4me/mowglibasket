import React from 'react'
import { SafeAreaView, Text } from "react-native";
import { HEADER_HEIGHT } from '../../common/Constants'
import Colors from '../../styles/Colors';
import MStyles from '../../styles/MStyles';

const LoginHeader = () => {

    return (
        <SafeAreaView style={{
            height: HEADER_HEIGHT,
            width: '100%',
            backgroundColor: Colors.primaryDark,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={[MStyles.txtTitle, { color: Colors.white }]}> Login </Text>
        </SafeAreaView>
    )

}

export default LoginHeader