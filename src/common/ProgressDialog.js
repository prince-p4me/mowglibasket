import React from 'react'
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import Colors from '../styles/Colors'

const ProgressDialog = ({ loading }) => {
    return (
        <Modal visible={loading} transparent animationType='fade'>
            <View style={[styles.main]} >
                <View style={[styles.dialog]}>
                    <ActivityIndicator size='large' color={Colors.primaryDark} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.transparent,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialog: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20
    }
})

export default ProgressDialog