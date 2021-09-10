import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import Colors from '../styles/Colors'
import { ProgressBar } from '@react-native-community/progress-bar-android';

const LinearProgressDialog = ({ loading }) => {
    return (
        <Modal visible={loading} transparent animationType='fade'>
            <View style={[styles.main]} >
                <ProgressBar
                    styleAttr="Horizontal"
                    indeterminate={true}
                    color={Colors.primaryDarkButton}
                    animating={true}
                    style={{ marginTop: -6 }} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.transparent,
    },
    dialog: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default LinearProgressDialog